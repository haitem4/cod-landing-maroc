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
  title: "فرشات التدليك والأكيوبريسور الطبية بالمغرب | Confort Pro Maroc",
  description:
    "استرجع راحة خطواتك مع فرشات التدليك والأكيوبريسور الطبية المبتكرة. تخفيف فوري لآلام القدمين والشوكة العظمية وأسفل الظهر. الدفع عند الاستلام بالمغرب.",
  openGraph: {
    title: "فرشات التدليك الطبية المريحة - Confort Pro Maroc",
    description: "راحة فائقة وامتصاص فعال للصدمات لكل خطوة. تلائم جميع الأحذية.",
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
    <html lang="ar" className={`${inter.variable} ${cairo.variable}`}>
      <body className="min-h-screen antialiased bg-slate-100 text-slate-900 selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
