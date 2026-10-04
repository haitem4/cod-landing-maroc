import React from "react";
import Image from "next/image";
import { Star, CheckCircle, MessageSquareQuote } from "lucide-react";
import { ReviewItem } from "@/lib/types";

interface ReviewsProps {
  reviews: ReviewItem[];
  isArabic?: boolean;
}

export const Reviews: React.FC<ReviewsProps> = ({
  reviews,
  isArabic = false,
}) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="w-full py-10 md:py-14 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>{isArabic ? "آراء زبنائنا الكرام" : "Témoignages Clients Vérifiés"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">
            {isArabic ? "ماذا يقول عملاؤنا في المغرب عن هذا المنتج؟" : "Ce que nos clients au Maroc en pensent"}
          </h2>
          <div className="flex items-center justify-center gap-1 mt-2 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
            <span className="text-xs font-bold text-slate-700 ml-1">
              (4.9/5 sur {reviews.length * 150}+ avis)
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                  "{rev.text}"
                </p>
              </div>

              {/* Reviewer Profile */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                {rev.photo ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-slate-300">
                    <Image
                      src={rev.photo}
                      alt={rev.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                    {rev.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {rev.city} • {isArabic ? "مشتري مؤكد" : "Achat Vérifié"}
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
