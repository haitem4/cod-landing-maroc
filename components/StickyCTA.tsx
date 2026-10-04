"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, ArrowDown } from "lucide-react";

interface StickyCTAProps {
  price: number;
  currency: string;
  ctaText?: string;
  isArabic?: boolean;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({
  price,
  currency,
  ctaText,
  isArabic = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Observe the order form
    const orderForm = document.getElementById("order-form") || document.getElementById("order-section");
    if (!orderForm) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If order form is intersecting (visible on screen), hide the sticky CTA
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(orderForm);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("order-section") || document.getElementById("order-form");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-8px_20px_rgba(0,0,0,0.12)] transition-all duration-300 animate-in slide-in-from-bottom">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Price Info */}
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            {isArabic ? "توصيل بالمجان" : "Livraison Gratuite"}
          </span>
          <span className="text-lg font-extrabold text-primary leading-tight">
            {price} {currency}
          </span>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={scrollToForm}
          className="cta-pulse flex-1 bg-primary hover:bg-primary-hover active:scale-95 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform"
        >
          <Sparkles className="w-4 h-4" />
          <span>{ctaText || (isArabic ? "اطلب الآن (الدفع عند الاستلام)" : "Commander Maintenant")}</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </div>
  );
};
