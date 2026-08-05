import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${SITE_TAGLINE}`,
    short_name: SITE_NAME,
    description:
      "A luxury land-banking and fractional-investment marketplace. Own verified fractions of title-clear land across the Greater Noida growth corridor.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f0c",
    theme_color: "#0a0f0c",
    icons: [
      { src: "/images/MM_Icon.png", sizes: "any", type: "image/png" },
      { src: "/images/MM_Icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
