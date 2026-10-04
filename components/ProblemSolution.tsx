import React from "react";
import { XCircle, CheckCircle2 } from "lucide-react";
import { ProblemSection } from "@/lib/types";

interface ProblemSolutionProps {
  problem: ProblemSection;
  isArabic?: boolean;
}

export const ProblemSolution: React.FC<ProblemSolutionProps> = ({
  problem,
  isArabic = false,
}) => {
  if (!problem) return null;

  return (
    <section className="w-full py-10 md:py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            {isArabic ? "المشكلة والحل" : "Avant vs Après"}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-3 mb-2">
            {problem.title}
          </h2>
          {problem.subtitle && (
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              {problem.subtitle}
            </p>
          )}
        </div>

        {/* Dual Grid Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Pain Points (Red Box) */}
          <div className="bg-red-50/70 border-2 border-red-200/80 rounded-2xl p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-red-700 font-bold text-base md:text-lg">
              <XCircle className="w-6 h-6 flex-shrink-0 text-red-500" />
              <span>{isArabic ? "المعاناة مع الطرق التقليدية :" : "Avec les méthodes classiques :"}</span>
            </div>
            <ul className="space-y-3">
              {problem.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-700">
                  <span className="text-red-500 font-bold text-base leading-none">✕</span>
                  <span className="leading-snug">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution (Green / Accent Box) */}
          <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-emerald-800 font-bold text-base md:text-lg">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-emerald-600" />
              <span>{problem.solutionTitle || (isArabic ? "الحل مع هذا المنتج :" : "Avec notre solution :")}</span>
            </div>
            <ul className="space-y-3">
              {(problem.solutionPoints || problem.points).map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-800 font-medium">
                  <span className="text-emerald-600 font-bold text-base leading-none">✓</span>
                  <span className="leading-snug">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
