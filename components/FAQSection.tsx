"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Lang, CONTENT } from "@/lib/content";

interface FAQSectionProps {
  lang: Lang;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang }) => {
  const t = CONTENT[lang];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="w-full py-10 px-4 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-orange-700 bg-orange-100/80 px-3.5 py-1.5 rounded-full border border-orange-200 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
            <span>{lang === "ar" ? "الأسئلة الشائعة" : "FAQ"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {t.faqTitle}
          </h2>
        </div>

        <div className="space-y-3">
          {t.faqs.map((f, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-orange-500/40 ring-4 ring-orange-500/10 shadow-md"
                    : "bg-white/80 border-slate-200 hover:border-slate-300 shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 font-black text-xs sm:text-sm text-slate-900 hover:text-orange-600 transition-colors focus:outline-none select-none text-left"
                  style={{ textAlign: lang === "ar" ? "right" : "left" }}
                >
                  <span className="leading-snug">{f.q}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                    isOpen ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    <p className="pt-3 font-medium">{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
