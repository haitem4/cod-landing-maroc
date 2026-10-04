import type { Metadata, Viewport } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

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
  title: "Boutique Officielle - Paiement à la Livraison",
  description: "Commandez facilement avec paiement à la livraison partout au Maroc. Livraison rapide et garantie satisfaite.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${cairo.variable}`}>
      <body className="min-h-screen antialiased bg-slate-50 text-slate-900 selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
