import React from "react";
import Image from "next/image";
import { Stethoscope } from "lucide-react";
import { Lang, CONTENT, PRODUCT_IMAGES } from "@/lib/content";

interface DoctorSectionProps {
  lang: Lang;
}

export const DoctorSection: React.FC<DoctorSectionProps> = ({ lang }) => {
  const t = CONTENT[lang];

  return (
    <section className="w-full py-10 px-4 bg-gradient-to-tr from-sky-50/50 via-white to-sky-50/30 border-b border-sky-100">
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-5 sm:p-6 border-2 border-sky-200/90 shadow-md space-y-4">
        <div className="flex items-center gap-2 text-sky-800 text-xs font-black uppercase tracking-wider">
          <Stethoscope className="w-4 h-4 text-sky-600" />
          <span>{t.doctorTag}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-sky-300 flex-shrink-0 shadow-sm bg-slate-100">
            <Image
              src={PRODUCT_IMAGES.doctor}
              alt={t.doctorName}
              fill
              sizes="100px"
              className="object-cover"
            />
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <blockquote className="text-xs sm:text-sm text-slate-700 italic font-medium leading-relaxed">
              "{t.doctorQuote}"
            </blockquote>

            <div className="pt-1">
              <h4 className="text-xs sm:text-sm font-black text-slate-900">
                {t.doctorName}
              </h4>
              <p className="text-[11px] text-sky-700 font-bold">
                {t.doctorRole}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
