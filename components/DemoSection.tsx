import React from "react";
import Image from "next/image";
import { Play, Sparkles } from "lucide-react";

interface DemoSectionProps {
  videoOrGif?: string;
  title: string;
  isArabic?: boolean;
}

export const DemoSection: React.FC<DemoSectionProps> = ({
  videoOrGif,
  title,
  isArabic = false,
}) => {
  if (!videoOrGif) return null;

  return (
    <section className="w-full py-10 md:py-14 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isArabic ? "شاهد التجربة العملية" : "Démonstration en Direct"}</span>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
          {isArabic ? "سهولة الاستخدام وسرعة لا تصدق في ثوانٍ معدودة" : "Simplicité et efficacité redoutable en action"}
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto mb-6">
          {isArabic
            ? "تصميم هندسي متطور يلبي جميع احتياجاتك اليومية بدون أي مجهود."
            : "Conçu pour vous faire gagner un temps précieux avec des résultats impeccables à chaque utilisation."}
        </p>

        {/* Media Container */}
        <div className="relative max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 group">
          <Image
            src={videoOrGif}
            alt={`${title} demonstration`}
            fill
            sizes="(max-width: 768px) 100vw, 680px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex flex-col items-center justify-end p-4 text-white">
            <div className="bg-primary/90 backdrop-blur-sm text-white text-xs md:text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg mb-2">
              <Play className="w-4 h-4 fill-white" />
              <span>{isArabic ? "تجربة حقيقية ومضمونة" : "Qualité Supérieure Testée"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
