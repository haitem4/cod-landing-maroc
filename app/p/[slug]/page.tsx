import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, getAllProductSlugs } from "@/lib/products";
import { Header } from "@/components/Header";
import { Gallery } from "@/components/Gallery";
import { ProblemSolution } from "@/components/ProblemSolution";
import { DemoSection } from "@/components/DemoSection";
import { Benefits } from "@/components/Benefits";
import { Reviews } from "@/components/Reviews";
import { OrderSection } from "@/components/OrderSection";
import { TrustBadges } from "@/components/TrustBadges";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { StickyCTA } from "@/components/StickyCTA";
import { FacebookPixel } from "@/components/FacebookPixel";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Star } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Produit non trouvé" };

  return {
    title: `${product.title} | Paiement à la Livraison Maroc`,
    description: product.subtitle,
    openGraph: {
      title: product.title,
      description: product.subtitle,
      images: [{ url: product.heroImage, width: 800, height: 800, alt: product.title }],
    },
  };
}

export default function ProductLandingPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const isArabic = product.lang === "ar";
  const direction = isArabic ? "rtl" : "ltr";
  const defaultOffer = product.offers.find((o) => o.default) || product.offers[0];
  const lowestPrice = Math.min(...product.offers.map((o) => o.price));
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.heroImage];

  const themeStyles = {
    "--color-primary": product.theme.primary,
    "--color-primary-hover": product.theme.primary,
    "--color-primary-light": `${product.theme.primary}15`,
    "--color-accent": product.theme.accent,
    "--color-accent-hover": product.theme.accent,
    "--color-accent-light": `${product.theme.accent}15`,
    "--color-background": product.theme.background,
    "--color-text": product.theme.text,
  } as React.CSSProperties;

  return (
    <div
      dir={direction}
      lang={product.lang}
      style={themeStyles}
      className={`min-h-screen bg-white text-pageText selection:bg-primary selection:text-white ${
        isArabic ? "font-arabic" : "font-sans"
      }`}
    >
      {/* 0. Pixel Facebook */}
      <FacebookPixel
        pixelId={product.pixelId}
        productTitle={product.title}
        price={defaultOffer?.price || 0}
      />

      {/* 1. Header minimal & Bandeau promo */}
      <Header
        logoText={product.logoText}
        badgeHeader={product.badgeHeader}
        isArabic={isArabic}
      />

      {/* 2. Galerie en haut + Titre + Prix (Style Existing Clothes) */}
      <section className="w-full pt-3 pb-6 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-4">
            <Gallery images={images} title={product.title} />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-800">4.9/5</span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">
              {isArabic ? "+250 تقييم إيجابي بالمغرب" : "+250 avis vérifiés au Maroc"}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug mb-2">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 py-2 border-y border-slate-100 mb-3">
            <div className="text-2xl sm:text-3xl font-black text-primary">
              {lowestPrice} {product.currency}
            </div>
            {defaultOffer?.originalPrice && (
              <div className="text-sm sm:text-base text-slate-400 line-through font-semibold">
                {defaultOffer.originalPrice} {product.currency}
              </div>
            )}
            <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-1 rounded-md">
              {isArabic ? "تخفيض خاص" : "Promotion"}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.subtitle}
          </p>
        </div>
      </section>

      {/* 3. FORMULAIRE DE COMMANDE DIRECT (Wrapped in Suspense) */}
      <Suspense fallback={<div className="p-8 text-center text-slate-400">Chargement du formulaire...</div>}>
        <OrderSection product={product} />
      </Suspense>

      {/* 4. Badges de réassurance */}
      <TrustBadges badges={product.trustBadges} isArabic={isArabic} />

      {/* 5. Problème & Solution */}
      <ProblemSolution problem={product.problem} isArabic={isArabic} />

      {/* 6. Démonstration visuelle */}
      <DemoSection
        videoOrGif={product.videoOrGif}
        title={product.title}
        isArabic={isArabic}
      />

      {/* 7. Bénéfices & Caractéristiques */}
      <Benefits benefits={product.benefits} isArabic={isArabic} />

      {/* 8. Avis clients */}
      <Reviews reviews={product.reviews} isArabic={isArabic} />

      {/* 9. FAQ */}
      <FAQ faq={product.faq} isArabic={isArabic} />

      {/* 10. Footer */}
      <Footer
        guaranteeText={product.guaranteeText}
        logoText={product.logoText}
        isArabic={isArabic}
      />

      {/* 11. WhatsApp Floating Contact Button */}
      <WhatsAppButton
        whatsappNumber={product.whatsappNumber || "212600000000"}
        productTitle={product.title}
        isArabic={isArabic}
      />

      {/* 12. Sticky CTA mobile */}
      <StickyCTA
        price={lowestPrice}
        currency={product.currency}
        ctaText={product.ctaText}
        isArabic={isArabic}
      />
    </div>
  );
}
