import type { Metadata } from "next";
import { SEED } from "@/lib/data";
import { getListings, getListing } from "@/lib/listings-server";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import Fab from "@/components/Fab";
import InvestModal from "@/components/InvestModal";
import AdminModal from "@/components/AdminModal";
import AssociateModal from "@/components/AssociateModal";
import Toast from "@/components/Toast";
import Effects from "@/components/Effects";
import ProductDetail from "@/components/property/ProductDetail";
import JsonLd from "@/components/seo/JsonLd";
import { ogImageFor, listingLd, breadcrumbLd, SITE_KEYWORDS } from "@/lib/seo";

export async function generateStaticParams() {
  try {
    const listings = await getListings();
    return listings.map((l) => ({ id: l.id }));
  } catch {
    return SEED.map((l) => ({ id: l.id }));
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  let l = SEED.find((x) => x.id === id) || null;
  try {
    l = (await getListing(id)) || l;
  } catch {}
  if (!l) return { title: "Opportunity", robots: { index: false } };

  const canonical = `/property/${l.id}`;
  const description =
    (l.desc?.trim()?.slice(0, 158) ||
      `${l.title} — a tokenised land-banking opportunity in ${l.loc}. Fractional tokens from ₹${l.token.toLocaleString("en-IN")}.`);
  const image = ogImageFor(l);

  return {
    title: `${l.title} — ${l.loc}`,
    description,
    keywords: [l.title, l.loc, l.cat, "tokenised land", "fractional ownership", ...SITE_KEYWORDS],
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: `${l.title} — Money Multiply`,
      description,
      url: canonical,
      images: [{ url: image, alt: l.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${l.title} — Money Multiply`,
      description,
      images: [image],
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let l = SEED.find((x) => x.id === id) || null;
  try {
    l = (await getListing(id)) || l;
  } catch {}
  return (
    <>
      {l && <JsonLd data={[listingLd(l), breadcrumbLd(l)]} />}
      <Header />
      <main>
        <ProductDetail id={id} />
      </main>
      <SiteFooter />
      <Fab />
      <InvestModal />
      <AdminModal />
      <AssociateModal />
      <Toast />
      <Effects />
    </>
  );
}
