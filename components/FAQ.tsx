"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQItem } from "@/lib/types";

interface FAQProps {
  faq: FAQItem[];
  isArabic?: boolean;
}

export const FAQ: React.FC<FAQProps> = ({ faq, isArabic = false }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faq || faq.length === 0) return null;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-10 md:py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isArabic ? "الأسئلة الشائعة" : "Questions Fréquentes"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">
            {isArabic ? "كل ما تحتاج معرفته قبل الطلب" : "Foire Aux Questions"}
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faq.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-primary transition-colors focus:outline-none"
                  style={{ textAlign: isArabic ? "right" : "left" }}
                >
                  <span className="leading-snug">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p className="mt-3">{item.a}</p>
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
