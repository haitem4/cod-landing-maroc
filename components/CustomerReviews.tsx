import React from "react";
import Image from "next/image";
import { Star, CheckCircle, ThumbsUp, MessageSquareQuote } from "lucide-react";
import { Lang, REVIEWS } from "@/lib/content";

interface CustomerReviewsProps {
  lang: Lang;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ lang }) => {
  return (
    <section className="w-full py-10 px-4 bg-white border-b border-slate-100">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-amber-700 bg-amber-100/80 px-3.5 py-1.5 rounded-full border border-amber-300 mb-2">
            <MessageSquareQuote className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === "ar" ? "تجارب حقيقية وموثقة" : "Customer Reviews"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {lang === "ar" ? "ماذا يقول زبناؤنا بعد استخدام الفرشات الطبية المريحة؟" : "Look At How Others Are Loving Their Confort Pro Insoles"}
          </h2>

          {/* Aggregate score */}
          <div className="mt-3 inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-black text-slate-900">4.8 / 5</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{lang === "ar" ? "88,552+ تقييم إيجابي" : "88,552+ Reviews"}</span>
            </span>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="space-y-3.5">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>{lang === "ar" ? "شراء مؤكد وموثق" : "Achat Vérifié"}</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic">
                "{lang === "ar" ? rev.textAr : rev.textEn}"
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-slate-200/80">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black text-xs flex items-center justify-center shadow-xs flex-shrink-0">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">{rev.name}</h4>
                  <p className="text-[11px] text-slate-500 font-bold">
                    {lang === "ar" ? rev.roleAr : rev.roleEn} • {lang === "ar" ? rev.dateAr : rev.dateEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
