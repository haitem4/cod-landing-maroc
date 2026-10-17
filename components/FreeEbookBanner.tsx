import React from "react";
import Image from "next/image";
import { Gift, BookOpen, CheckCircle } from "lucide-react";
import { Lang, CONTENT, PRODUCT_IMAGES } from "@/lib/content";

interface FreeEbookBannerProps {
  lang: Lang;
}

export const FreeEbookBanner: React.FC<FreeEbookBannerProps> = ({ lang }) => {
  const t = CONTENT[lang];

  return (
    <section className="w-full py-8 px-4 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white border-b border-orange-700">
      <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-5">
        <div className="relative w-28 h-36 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 border-2 border-white/40">
          <Image
            src={PRODUCT_IMAGES.ebook}
            alt="Free Foot Health Mastery eBook"
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>

        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full border border-white/30">
            <Gift className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.ebookTitle}</span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white leading-tight">
            {t.ebookSubtitle}
          </h3>

          <p className="text-xs text-orange-100 font-bold flex items-center justify-center sm:justify-start gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span>{t.ebookValue}</span>
          </p>
        </div>
      </div>
    </section>
  );
};
