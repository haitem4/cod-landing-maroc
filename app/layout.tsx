import type { Metadata, Viewport } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { FacebookPixel } from "@/components/FacebookPixel";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Semelles Orthopédiques d'Acupression | Confort Pro Europe",
  description:
    "Soulagement immédiat des douleurs de pieds, voûte plantaire et aponévrosite. Livraison express offerte en Europe & paiement 100% sécurisé par Carte Bancaire et PayPal.",
  openGraph: {
    title: "Semelles Orthopédiques d'Acupression - Confort Pro Europe",
    description: "Confort supérieur et absorption des micro-chocs à chaque pas. Découpe facile adaptable à toutes vos chaussures.",
    images: [
      {
        url: "/images/orange_clean.webp",
        width: 800,
        height: 800,
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ea580c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${cairo.variable}`}>
      <body className="min-h-screen antialiased bg-slate-100 text-slate-900 selection:bg-orange-500 selection:text-white">
        <FacebookPixel />
        {children}
      </body>
    </html>
  );
}
