import React from "react";
import { Award, ShieldCheck, HeartPulse } from "lucide-react";
import { Lang, CONTENT } from "@/lib/content";

interface ClinicalStatsProps {
  lang: Lang;
}

export const ClinicalStats: React.FC<ClinicalStatsProps> = ({ lang }) => {
  const t = CONTENT[lang];

  return (
    <section className="w-full py-10 px-4 bg-gradient-to-b from-orange-50/70 via-amber-50/40 to-white border-b border-orange-100">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-orange-700 bg-orange-100/80 px-3.5 py-1.5 rounded-full border border-orange-200 mb-2">
            <Award className="w-4 h-4 text-orange-600" />
            <span>{lang === "ar" ? "دراسات وتجارب سريرية" : "Clinical Proof"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {t.statsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            {t.statsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {t.stats.map((st, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-3.5 sm:p-4 border-2 border-orange-200/80 shadow-sm flex flex-col items-center text-center transition-all hover:scale-102"
            >
              <span className="text-2xl sm:text-3xl font-black text-orange-600 leading-none mb-1">
                {st.percent}
              </span>
              <span className="text-xs font-black text-slate-900 leading-tight mb-1">
                {st.label}
              </span>
              <span className="text-[10px] text-slate-500 font-medium leading-tight">
                {st.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
