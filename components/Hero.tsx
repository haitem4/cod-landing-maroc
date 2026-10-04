import React from "react";
import { Star, ShieldCheck, ArrowDown, Sparkles } from "lucide-react";
import { Gallery } from "./Gallery";
import { OfferItem } from "@/lib/types";

interface HeroProps {
  title: string;
  subtitle: string;
  gallery: string[];
  heroImage: string;
  offers: OfferItem[];
  currency: string;
  ctaText?: string;
  isArabic?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  gallery,
  heroImage,
  offers,
  currency,
  ctaText,
  isArabic = false,
}) => {
  const images = gallery && gallery.length > 0 ? gallery : [heroImage];
  const defaultOffer = offers.find((o) => o.default) || offers[0];
  const lowestPrice = Math.min(...offers.map((o) => o.price));

  return (
    <section className="w-full bg-white pt-4 pb-8 md:pt-8 md:pb-12 border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4">
        {/* Rating and Social Proof Header */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-700">4.9 / 5</span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs font-medium text-slate-500">
            {isArabic ? "+3,450 زبون راضٍ في المغرب" : "+3 450 clients satisfaits au Maroc"}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3 h-3" />
            {isArabic ? "منتج أصلي 100%" : "Produit 100% Authentique"}
          </span>
        </div>

        {/* Catchy Product Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight mb-3">
          {title}
        </h1>

        {/* Subtitle / Value Proposition */}
        <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6">
          {subtitle}
        </p>

        {/* Gallery */}
        <div className="mb-6">
          <Gallery images={images} title={title} />
        </div>

        {/* Price & Primary CTA Card */}
        <div className="bg-gradient-to-br from-slate-50 to-amber-50/40 p-4 md:p-6 rounded-2xl border-2 border-primary/20 shadow-sm text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            {defaultOffer?.originalPrice && (
              <span className="text-base md:text-lg text-slate-400 line-through font-semibold">
                {defaultOffer.originalPrice} {currency}
              </span>
            )}
            <div className="text-2xl md:text-3xl font-extrabold text-primary">
              {lowestPrice} {currency}
            </div>
            <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-1 rounded-full animate-bounceSmall">
              {isArabic ? "تخفيض محدود" : "Promotion Spéciale"}
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-4 font-medium">
            {isArabic
              ? "⚡ الكمية المتبقية في المستودع محدودة جداً لهذا الأسبوع"
              : "⚡ Stock limité disponible pour expédition immédiate"}
          </p>

          <a
            href="#order-section"
            className="cta-pulse w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-white text-base md:text-lg font-extrabold py-4 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all transform active:scale-95"
          >
            <Sparkles className="w-5 h-5" />
            <span>{ctaText || (isArabic ? "اضغط هنا للطلب والدفع عند الاستلام" : "Commander maintenant - Paiement à la réception")}</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
