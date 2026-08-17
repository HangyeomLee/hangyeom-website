import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
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

const displayFont = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hangyeom-website.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hangyeom Christian Lee — Full-stack developer",
    template: "%s — Hangyeom Christian Lee",
  },
  description:
    "I'm a Systems Design Engineering student at Waterloo. I build web systems people rely on for work, including a wholesale store I built alone and still maintain, and I've done computer vision work in Busan and on a facial analysis SDK.",
  openGraph: {
    type: "website",
    siteName: "Hangyeom Christian Lee",
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
