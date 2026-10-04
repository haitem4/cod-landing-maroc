import React from "react";
import { Truck } from "lucide-react";

interface HeaderProps {
  logoText?: string;
  badgeHeader?: string;
  isArabic?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  logoText = "BOUTIQUE OFFICIELLE",
  badgeHeader,
  isArabic = false,
}) => {
  return (
    <header className="w-full bg-white border-b border-slate-100 shadow-sm sticky top-0 z-40">
      {badgeHeader && (
        <div className="bg-primary text-white text-xs md:text-sm font-bold py-2 px-3 text-center transition-colors">
          <p className="animate-pulse flex items-center justify-center gap-2">
            <span>{badgeHeader}</span>
          </p>
        </div>
      )}
      <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-extrabold text-base shadow-sm">
            {logoText.charAt(0)}
          </div>
          <span className="font-extrabold text-base tracking-tight text-slate-800">
            {logoText}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <Truck className="w-3.5 h-3.5" />
          <span>{isArabic ? "توصيل سريع 24/48h" : "Livraison 24h/48h"}</span>
        </div>
      </div>
    </header>
  );
};
