import "./globals.css";

export const metadata = {
  title: "Hangyeom Lee | AI & Full-Stack Engineer",
  description:
    "Portfolio of Hangyeom Lee — University of Waterloo Systems Design Engineering student building production-minded AI and full-stack systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}