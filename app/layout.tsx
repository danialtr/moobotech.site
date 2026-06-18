import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cafe } from "@/lib/menu";

export const metadata: Metadata = {
  title: `${cafe.name} | منوی دیجیتال`,
  description: cafe.description,
  keywords: ["کافه", "منو", "قهوه", "اسپرسو", "کافی شاپ", "menu", "cafe", "coffee"],
  openGraph: {
    title: `${cafe.name} — منوی کافه`,
    description: cafe.tagline,
    type: "website",
    locale: "fa_IR",
  },
};

export const viewport: Viewport = {
  themeColor: "#160d09",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="grain antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
