import React from "react";
import { XCircle, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import { Lang, CONTENT } from "@/lib/content";

interface BeforeAfterSectionProps {
  lang: Lang;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ lang }) => {
  const t = CONTENT[lang];

  return (
    <section className="w-full py-10 px-4 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-rose-700 bg-rose-100/80 px-3.5 py-1.5 rounded-full border border-rose-200 mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>{lang === "ar" ? "قبل وبعد" : "Before vs After"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {t.differenceTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-medium">
            {t.differenceSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Before Box */}
          <div className="bg-rose-50/70 border-2 border-rose-200 rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-black text-sm border-b border-rose-200 pb-2.5">
              <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>{t.beforeTitle}</span>
            </div>
            <ul className="space-y-2.5">
              {t.beforePoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-rose-950 font-medium leading-relaxed">
                  <span className="w-4 h-4 rounded-full bg-rose-200 text-rose-700 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">✕</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After Box */}
          <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-black text-sm border-b border-emerald-200 pb-2.5">
              <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{t.afterTitle}</span>
            </div>
            <ul className="space-y-2.5">
              {t.afterPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-emerald-950 font-bold leading-relaxed">
                  <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-800 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
