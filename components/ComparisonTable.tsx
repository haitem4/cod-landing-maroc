import React from "react";
import { Check, X, ShieldCheck } from "lucide-react";
import { Lang, CONTENT } from "@/lib/content";

interface ComparisonTableProps {
  lang: Lang;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ lang }) => {
  const t = CONTENT[lang];

  return (
    <section className="w-full py-10 px-4 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-orange-700 bg-orange-100/80 px-3.5 py-1.5 rounded-full border border-orange-200 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
            <span>{lang === "ar" ? "المقارنة المباشرة" : "The Comparison"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {t.comparisonTitle}
          </h2>
        </div>

        <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-md overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-3 bg-slate-950 text-white p-3.5 text-center font-black text-xs sm:text-sm items-center">
            <div className="text-left font-bold text-slate-300 text-[11px] sm:text-xs">
              {t.compHeaders.feature}
            </div>
            <div className="bg-orange-600 py-1.5 px-2 rounded-xl text-white shadow-xs font-black text-xs">
              {t.compHeaders.us}
            </div>
            <div className="text-slate-400 font-semibold text-[11px] sm:text-xs">
              {t.compHeaders.them}
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100">
            {t.compRows.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-3 p-3.5 items-center text-center text-xs font-semibold ${
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                }`}
              >
                <div className="text-left text-slate-800 font-bold text-[11px] sm:text-xs leading-snug">
                  {row.feature}
                </div>

                <div className="flex justify-center items-center font-black text-emerald-800 bg-emerald-50/90 py-1 rounded-xl">
                  {row.us.includes("نعم") || row.us.includes("Yes") ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <span>{row.us}</span>
                  )}
                </div>

                <div className="flex justify-center items-center text-slate-400">
                  {row.them.includes("غير موجود") || row.them.includes("None") ? (
                    <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <span className="text-rose-600 font-medium">{row.them}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
