"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, ArrowDown } from "lucide-react";
import { Lang } from "@/lib/content";

interface StickyCTAProps {
  lang: Lang;
  price: number;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({ lang, price }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const orderForm = document.getElementById("order-form") || document.getElementById("order-section");
    if (!orderForm) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    observer.observe(orderForm);
    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("order-section") || document.getElementById("order-form");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t-2 border-slate-200 shadow-[0_-8px_25px_rgba(0,0,0,0.15)] transition-all animate-in slide-in-from-bottom">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] text-emerald-700 font-extrabold flex items-center gap-1 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {lang === "ar" ? "الدفع عند الاستلام" : "Cash On Delivery"}
          </span>
          <span className="text-xl font-black text-orange-600 leading-tight">
            {price} <span className="text-xs font-bold text-slate-800">DH</span>
          </span>
        </div>

        <button
          type="button"
          onClick={scrollToForm}
          className="cta-pulse flex-1 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-black text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-lg shadow-orange-600/30 flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{lang === "ar" ? "اطلب الآن (الدفع عند الاستلام)" : "ORDER NOW (COD)"}</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </div>
  );
};
