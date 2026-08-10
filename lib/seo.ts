import type { Listing } from "./types";
import { imgFor } from "./utils";

/* ---------------------------------------------------------------
   Central SEO constants + structured-data (JSON-LD) builders.
   Keep the canonical origin here in sync with metadataBase.
---------------------------------------------------------------- */

export const SITE_URL = "https://www.moneymultiplyglobal.com";
export const SITE_NAME = "Money Multiply";
export const LEGAL_NAME = "Money Multiply Trading and Consultant Private Limited";
export const SITE_TAGLINE = "The Land Bankers & Traders";
export const OG_IMAGE = "/images/logo-mark.png";

export const CONTACT = {
  phone: "+919911176822",
  email: "info@moneymultiplyglobal.com",
  whatsapp: "https://wa.me/919911176822",
};

export const ADDRESS = {
  street: "B-128, First Floor, Sector-2",
  locality: "Noida",
  region: "Uttar Pradesh",
  district: "Gautam Buddha Nagar",
  postalCode: "201301",
  country: "IN",
};

/** Keywords used across the site (kept tight; Google ignores the tag but
 *  it feeds our own OG/meta and some non-Google engines). */
export const SITE_KEYWORDS = [
  "fractional land",
  "land banking India",
  "fractional land ownership",
  "land investment Noida",
  "Greater Noida real estate",
  "plotted development investment",
  "fractional real estate",
  "fractional property investment",
  "land bank marketplace",
  "Money Multiply",
];

/** Absolute URL for a site-relative path. */
export function abs(path: string): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return SITE_URL + (path.startsWith("/") ? path : "/" + path);
}

/** Best absolute image URL for a listing's social preview.
 *  Falls back to the brand mark for SVG/data-URL artwork. */
export function ogImageFor(l: Listing): string {
  const src = imgFor(l);
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/")) return abs(src);
  return abs(OG_IMAGE); // data:/SVG motifs don't render as OG images
}

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Organisation entity — emitted site-wide. */
export function organizationLd(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": SITE_URL + "/#organization",
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: abs("/images/logo-mark.png"),
    image: abs(OG_IMAGE),
    description:
      "A luxury land-banking and fractional-investment marketplace offering fractional ownership of title-clear land and Grade-A developments across the Greater Noida growth corridor.",
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    areaServed: "IN",
    sameAs: [
      "https://www.instagram.com/moneymultiplyglobal",
      "https://x.com/moneymultiply26",
      "https://www.facebook.com/share/1DhC9vUsG2/",
      "https://www.linkedin.com/company/money-multiply-global/",
    ],
  };
}

/** Website entity + on-site search action. */
export function websiteLd(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_URL + "/#website",
    url: SITE_URL,
    name: SITE_NAME,
    description: `${SITE_NAME} — ${SITE_TAGLINE}. Fractional land-banking marketplace.`,
    publisher: { "@id": SITE_URL + "/#organization" },
    inLanguage: "en-IN",
  };
}

/** Product / real-estate listing entity for a single opportunity. */
export function listingLd(l: Listing): Record<string, any> {
  const url = `${SITE_URL}/property/${l.id}`;
  const roiMatch = (l.roi || "").match(/([0-9.]+)/);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": url + "#product",
    name: l.title,
    category: l.cat,
    description: l.desc || `${l.title} — a fractional land-banking opportunity in ${l.loc}.`,
    image: ogImageFor(l),
    url,
    brand: { "@type": "Brand", name: SITE_NAME },
    ...(l.size ? { size: l.size } : {}),
    additionalProperty: [
      l.loc && { "@type": "PropertyValue", name: "Location", value: l.loc },
      l.tenure && { "@type": "PropertyValue", name: "Tenure", value: l.tenure },
      roiMatch && { "@type": "PropertyValue", name: "Target ROI", value: l.roi },
    ].filter(Boolean),
    offers: {
      "@type": "Offer",
      price: l.token,
      priceCurrency: "INR",
      availability:
        l.sold >= l.units ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      url,
      seller: { "@id": SITE_URL + "/#organization" },
    },
  };
}

/** Breadcrumb trail Home → Marketplace → Listing. */
export function breadcrumbLd(l: Listing): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Marketplace", item: SITE_URL + "/#marketplace" },
      { "@type": "ListItem", position: 3, name: l.title, item: `${SITE_URL}/property/${l.id}` },
    ],
  };
}
