"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ShieldCheck, Flame, CheckCircle2, Zap } from "lucide-react";
import { Lang, CONTENT, PRODUCT_IMAGES, COLOR_OPTIONS } from "@/lib/content";
import { Header } from "@/components/Header";
import { HeroGallery } from "@/components/HeroGallery";
import { OrderSection } from "@/components/OrderSection";
import { FiveReasonsSection } from "@/components/FiveReasonsSection";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { TargetAudience } from "@/components/TargetAudience";
import { ClinicalStats } from "@/components/ClinicalStats";
import { ComparisonTable } from "@/components/ComparisonTable";
import { DoctorSection } from "@/components/DoctorSection";
import { FreeEbookBanner } from "@/components/FreeEbookBanner";
import { CustomerReviews } from "@/components/CustomerReviews";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { StickyCTA } from "@/components/StickyCTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function ConfortProLandingPage() {
  const [lang, setLang] = useState<Lang>("ar");
  const [selectedColor, setSelectedColor] = useState<string>("orange");

  const t = CONTENT[lang];
  const isArabic = lang === "ar";
  const direction = isArabic ? "rtl" : "ltr";

  const toggleLanguage = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const currentColorObj = COLOR_OPTIONS.find((c) => c.id === selectedColor) || COLOR_OPTIONS[0];

  const galleryImages = [
    currentColorObj.image,
    PRODUCT_IMAGES.features,
    PRODUCT_IMAGES.benefits,
    PRODUCT_IMAGES.clinical,
    PRODUCT_IMAGES.comparison,
    PRODUCT_IMAGES.howToUse,
  ];

  return (
    <div className="min-h-screen bg-slate-200/60 flex justify-center selection:bg-orange-600 selection:text-white">
      {/* Centered Mobile-First Column on Desktop (Exact 480-550px Senior UX Container) */}
      <main
        dir={direction}
        lang={lang}
        className={`w-full max-w-xl bg-white shadow-2xl border-x border-slate-200 min-h-screen text-slate-900 ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        {/* 1. HEADER (Top announcement + Logo + Language Switcher AR/EN) */}
        <Header lang={lang} onToggleLang={toggleLanguage} />

        {/* 2. HERO PRODUCT ZONE */}
        <section className="w-full pt-4 pb-6 px-4 bg-white border-b border-slate-100 space-y-4">
          {/* Gallery with dynamic color image */}
          <HeroGallery
            images={galleryImages}
            title={t.brandTitle}
            lang={lang}
            activeImage={currentColorObj.image}
          />

          {/* Social Proof Star Score & Stock Urgency */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-black text-slate-900">4.8 / 5</span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] text-slate-600 font-bold">
                {t.ratingText}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              <Flame className="w-3.5 h-3.5 fill-rose-600 text-rose-600 animate-pulse" />
              <span>{lang === "ar" ? "باقي 6 قطع في المخزون" : "Only 6 Left in Stock"}</span>
            </div>
          </div>

          {/* Product Headline */}
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            {t.heroTitle}
          </h1>

          {/* Pricing Highlight */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200/90 flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-orange-600">
                199 <span className="text-sm font-bold text-slate-800">DH</span>
              </span>
              <span className="text-sm text-slate-400 line-through font-bold">
                349 DH
              </span>
            </div>

            <span className="bg-orange-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-xs animate-shimmer">
              {lang === "ar" ? "تخفيض -45%" : "SAVE 45%"}
            </span>
          </div>

          {/* Quick Hero Color Switcher */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-800">
                {lang === "ar" ? "اللون المحدد :" : "Color :"}
              </span>
              <span className="text-xs font-bold text-orange-600">
                {lang === "ar" ? currentColorObj.nameAr : currentColorObj.nameEn}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {COLOR_OPTIONS.map((col) => {
                const isSelected = selectedColor === col.id;
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => setSelectedColor(col.id)}
                    aria-label={col.nameEn}
                    className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                      isSelected
                        ? "border-orange-600 ring-2 ring-orange-500/40 scale-110 shadow-sm"
                        : "border-slate-300 opacity-70 hover:opacity-100 hover:scale-105"
                    }`}
                    style={{ backgroundColor: col.hex }}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white shadow-xs" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subtitle / Core Benefit */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {t.heroDesc}
          </p>

          {/* Quick Value Bullets */}
          <div className="space-y-2 pt-1">
            {t.quickBullets.map((bullet, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-emerald-50/70 border border-emerald-200 p-2.5 rounded-xl"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 2.5 FIVE REASONS TO BUY SECTION */}
        <FiveReasonsSection lang={lang} />

        {/* 3. ORDER SECTION (Color + Size + Bundle Stack + Moroccan COD Form) */}
        <div id="order-section" className="px-4 bg-slate-50/50">
          <OrderSection
            lang={lang}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />
        </div>

        {/* 4. THE CONFORT PRO DIFFERENCE (Before vs After) */}
        <BeforeAfterSection lang={lang} />

        {/* 5. TARGET AUDIENCE (Nurses, Construction, Athletes, Daily Walking) */}
        <TargetAudience lang={lang} />

        {/* 6. CLINICAL STATS (95% pain relief, 94% comfort, 90% injury prevention) */}
        <ClinicalStats lang={lang} />

        {/* 7. COMPARISON TABLE (Confort Pro vs Others) */}
        <ComparisonTable lang={lang} />

        {/* 8. DOCTOR RECOMMENDATION (Dr. Thomas Schneider Podiatrist) */}
        <DoctorSection lang={lang} />

        {/* 9. FREE EBOOK BONUS BANNER */}
        <FreeEbookBanner lang={lang} />

        {/* 10. VERIFIED CUSTOMER REVIEWS */}
        <CustomerReviews lang={lang} />

        {/* 11. FAQ ACCORDION */}
        <FAQSection lang={lang} />

        {/* 12. FOOTER */}
        <Footer lang={lang} />

        {/* 13. MOBILE STICKY BOTTOM BAR */}
        <StickyCTA lang={lang} price={199} />

        {/* 14. FLOATING WHATSAPP BUTTON */}
        <WhatsAppButton lang={lang} whatsappNumber="212600000000" />
      </main>
    </div>
  );
}
