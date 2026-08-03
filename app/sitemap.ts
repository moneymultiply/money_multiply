import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getListings } from "@/lib/listings-server";
import { SEED } from "@/lib/data";
import type { Listing } from "@/lib/types";

// Revalidate the sitemap hourly so newly-added opportunities get indexed.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let listings: Listing[] = SEED;
  try {
    listings = await getListings();
  } catch {
    listings = SEED;
  }

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
  ];

  const listingEntries: MetadataRoute.Sitemap = listings.map((l) => ({
    url: `${SITE_URL}/property/${l.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...listingEntries];
}
