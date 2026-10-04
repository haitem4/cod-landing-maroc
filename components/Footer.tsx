import React from "react";
import { ShieldCheck, Truck, Clock } from "lucide-react";

interface FooterProps {
  guaranteeText?: string;
  logoText?: string;
  isArabic?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  guaranteeText,
  logoText = "BOUTIQUE OFFICIELLE",
  isArabic = false,
}) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 py-10 pb-28 md:pb-10 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {guaranteeText && (
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-amber-400 font-bold text-sm mb-2">
              <ShieldCheck className="w-5 h-5" />
              <span>{isArabic ? "ضمان الرضا 100%" : "Garantie 100% Sérénité"}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {guaranteeText}
            </p>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-primary text-white font-bold text-sm flex items-center justify-center">
            {logoText.charAt(0)}
          </div>
          <span className="text-white font-extrabold text-base tracking-tight">
            {logoText}
          </span>
        </div>

        <p className="text-xs text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
          {isArabic
            ? "جميع الحقوق محفوظة © 2026. المنصة المغربية الرائدة في التجارة الإلكترونية والدفع عند الاستلام."
            : "Tous droits réservés © 2026. Spécialiste du e-commerce et de la livraison express avec paiement à la réception."}
        </p>

        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-medium">
          <span>{isArabic ? "توصيل 24/48 ساعة" : "Livraison 24/48h"}</span>
          <span>•</span>
          <span>{isArabic ? "الدفع عند الاستلام" : "Paiement à la livraison"}</span>
          <span>•</span>
          <span>{isArabic ? "خدمة زبناء 7/7" : "Support Client 7j/7"}</span>
        </div>
      </div>
    </footer>
  );
};
