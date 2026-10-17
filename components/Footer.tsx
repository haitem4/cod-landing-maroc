import React from "react";
import { ShieldCheck, Truck, Headphones, RotateCcw } from "lucide-react";
import { Lang } from "@/lib/content";

interface FooterProps {
  lang: Lang;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="w-full bg-slate-950 text-slate-300 py-12 pb-32 md:pb-12 border-t border-slate-800">
      <div className="max-w-xl mx-auto px-4 text-center space-y-6">
        {/* Guarantee Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-inner">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-black text-sm mb-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>{lang === "ar" ? "ضمان الرضا الذهبي 100%" : "100% Risk-Free Guarantee"}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            {lang === "ar"
              ? "جرب الفرشات الطبية بكل ثقة. إذا لم تشعر بالفرق والراحة في أول أسبوع، يمكنك التواصل معنا واسترجاع أموالك بكل سهولة."
              : "Try our acupressure insoles risk-free. If you do not experience noticeable comfort and pain relief, simply contact us for a full replacement or refund."}
          </p>
        </div>

        {/* Brand */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
            C
          </div>
          <span className="text-white font-black text-base tracking-tight">
            CONFORT<span className="text-orange-500 text-xs ml-1">PRO MAROC</span>
          </span>
        </div>

        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
          {lang === "ar"
            ? "جميع الحقوق محفوظة © 2026. المتجر الرسمي المعتمد للتسوق الآمن عبر الإنترنت والدفع عند الاستلام بالمغرب."
            : "All rights reserved © 2026. Official authorized online store with Cash On Delivery & fast shipping across Morocco."}
        </p>

        {/* Moroccan trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 font-bold">
          <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === "ar" ? "توصيل سريع 24/48h" : "Fast 24/48h Delivery"}</span>
          </span>

          <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === "ar" ? "معاينة قبل الدفع" : "Inspect Before Pay"}</span>
          </span>

          <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
            <Headphones className="w-3.5 h-3.5 text-sky-400" />
            <span>{lang === "ar" ? "خدمة زبناء 7/7" : "24/7 Support"}</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
