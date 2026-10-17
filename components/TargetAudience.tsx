import React from "react";
import { Stethoscope, HardHat, Zap, Footprints, Sparkles } from "lucide-react";
import { Lang, CONTENT } from "@/lib/content";

interface TargetAudienceProps {
  lang: Lang;
}

export const TargetAudience: React.FC<TargetAudienceProps> = ({ lang }) => {
  const t = CONTENT[lang];
  const icons = [Stethoscope, HardHat, Zap, Footprints];

  return (
    <section className="w-full py-10 px-4 bg-white border-b border-slate-100">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-orange-700 bg-orange-100/80 px-3.5 py-1.5 rounded-full border border-orange-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>{lang === "ar" ? "لكل أسلوب حياة" : "Built For All Purposes"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {t.audienceTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {t.audienceList.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="p-4 rounded-3xl bg-slate-50 border-2 border-slate-200/80 hover:border-orange-500/40 hover:bg-orange-50/20 transition-all flex items-start gap-3.5"
              >
                <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Icon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                    {item.role}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
