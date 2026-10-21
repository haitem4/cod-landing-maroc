"use client";

import React from "react";
import { Flame, Globe, Truck, ShieldCheck } from "lucide-react";
import { Lang, CONTENT } from "@/lib/content";

interface HeaderProps {
  lang: Lang;
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, onToggleLang }) => {
  const t = CONTENT[lang];

  return (
    <header className="w-full bg-white border-b border-slate-200/90 sticky top-0 z-40 shadow-sm">
      {/* 1. TOP TICKER ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white text-xs font-black py-2 px-3 text-center shadow-inner select-none">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <Flame className="w-4 h-4 text-amber-300 animate-pulse flex-shrink-0" />
          <span className="tracking-wide text-[11px] sm:text-xs">{t.announcement}</span>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-500/25">
            C
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base tracking-tight text-slate-900 leading-none">
              CONFORT<span className="text-orange-600 font-extrabold text-xs ml-1">PRO EUROPE</span>
            </span>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {lang === "ar" ? "المتجر الرسمي المعتمد بأوروبا 🇪🇺" : "Boutique Officielle Europe 🇪🇺"}
            </span>
          </div>
        </div>

        {/* Right side: Language Switcher Button & Delivery pill */}
        <div className="flex items-center gap-2">
          {/* Quick Language Toggle */}
          <button
            type="button"
            onClick={onToggleLang}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black py-1.5 px-3 rounded-full border border-slate-300 shadow-xs transition-transform active:scale-95 cursor-pointer"
            title={lang === "ar" ? "Passer en Français" : "التحويل إلى العربية"}
          >
            <Globe className="w-3.5 h-3.5 text-orange-600" />
            <span>{lang === "ar" ? "FR (Français)" : "العربية (AR)"}</span>
          </button>

          {/* Fast Delivery Pill */}
          <div className="hidden xs:flex items-center gap-1 text-[11px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
            <Truck className="w-3 h-3 text-emerald-600" />
            <span>24/48h</span>
          </div>
        </div>
      </div>
    </header>
  );
};
