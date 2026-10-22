import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  : "https://lseole-aqc5.vercel.app";

export const metadata: Metadata = {
  title: "DentalSEOHub | Premier Dental Marketing & SEO Directory",
  description: "Find and compare verified dental marketing agencies and SEO specialists. Data-driven practice growth, Google Maps rankings, and high-ticket patient acquisition.",
  metadataBase: new URL(baseUrl),
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "DentalSEOHub | Verified Dental Marketing & SEO Agency Directory",
    description: "Compare verified dental marketing agencies across top US metropolitan markets.",
    siteName: "DentalSEOHub",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
