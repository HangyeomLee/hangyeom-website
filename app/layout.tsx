import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "react-image-crop/dist/ReactCrop.css";

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

export const metadata = {
  title: "Hangyeom Lee — Full-Stack Engineer who ships live products",
  description:
    "Waterloo Systems Design Engineering student. I build and run a live e-commerce platform (Stripe, Shippo, Supabase) serving customers across Canada, plus applied-AI and backend systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body>
    </html>
  );
}
