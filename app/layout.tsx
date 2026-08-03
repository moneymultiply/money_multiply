import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MarketplaceProvider } from "@/context/MarketplaceContext";
import { getListings } from "@/lib/listings-server";
import { SEED } from "@/lib/data";
import { SITE_URL, SITE_NAME, LEGAL_NAME, SITE_KEYWORDS, organizationLd, websiteLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import type { Listing } from "@/lib/types";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Money Multiply — The Land Bankers & Traders | Tokenised Land Marketplace",
    template: "%s | Money Multiply",
  },
  description:
    "A luxury land-banking and tokenised-investment marketplace. Own fractional tokens in title-clear land and Grade-A developments across the Greater Noida growth corridor. Investable from ₹5,00,000.",
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: LEGAL_NAME }],
  creator: SITE_NAME,
  publisher: LEGAL_NAME,
  category: "finance",
  alternates: { canonical: "/" },
  icons: { icon: "/images/MM_Icon.png", apple: "/images/MM_Icon.png" },
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: SITE_URL,
    title: "Money Multiply — The Land Bankers & Traders",
    description:
      "Own fractional tokens in title-clear land and Grade-A developments across the Greater Noida growth corridor. Investable from ₹5,00,000.",
    images: [{ url: "/images/logo-mark.png", width: 1536, height: 1024, alt: "Money Multiply" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Money Multiply — The Land Bankers & Traders",
    description: "Tokenised land-banking marketplace — fractional ownership from ₹5,00,000.",
    images: ["/images/logo-mark.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0f0c",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Server-render listings from Supabase; fall back to bundled seed if the
  // backend isn't reachable yet (e.g. schema not created).
  let initialListings: Listing[] = SEED;
  try {
    initialListings = await getListings();
  } catch {
    initialListings = SEED;
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400..600&family=Inter:wght@300;400;500;600;700&family=Spline+Sans+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <MarketplaceProvider initialListings={initialListings}>{children}</MarketplaceProvider>
      </body>
    </html>
  );
}
