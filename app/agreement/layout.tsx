import type { Metadata } from "next";

// Personalised, authenticated legal documents — never index.
export const metadata: Metadata = {
  title: "Your Agreement",
  robots: { index: false, follow: false },
};

export default function AgreementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
