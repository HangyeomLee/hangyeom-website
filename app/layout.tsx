import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "react-image-crop/dist/ReactCrop.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CommandPalette } from "@/components/site/CommandPalette";
import styles from "@/components/site/site.module.css";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hangyeom-website.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hangyeom Lee — Full-Stack Engineer who builds production systems",
    template: "%s — Hangyeom Lee",
  },
  description:
    "Waterloo Systems Design Engineering student. I design and operate production backend systems — RLS-secured commerce infrastructure, Stripe payment pipelines, and on-prem ML serving — end to end, from architecture to deployment.",
  openGraph: {
    type: "website",
    siteName: "Hangyeom Lee",
    locale: "en_CA",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <SiteHeader />
        <div className={styles.pageBody}>{children}</div>
        <SiteFooter />
        <CommandPalette />
      </body>
    </html>
  );
}
