"use client";

import React from "react";
import { Lang } from "@/lib/content";
import { 
  Zap, 
  ShieldCheck, 
  Activity, 
  Scissors, 
  Truck, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Sparkles,
  CreditCard,
  Lock
} from "lucide-react";

interface FiveReasonsSectionProps {
  lang: Lang;
}

export const FiveReasonsSection: React.FC<FiveReasonsSectionProps> = ({ lang }) => {
  const isAr = lang === "ar";

  const reasons = [
    {
      num: "01",
      icon: Zap,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-200",
      badgeAr: "راحة فورية من أول يوم",
      badgeEn: "Soulagement Immédiat Dès le Premier Pas",
      titleAr: "تخفيف فوري لآلام القدمين والظهر",
      titleEn: "Soulagement Instantané des Pieds et du Dos",
      descAr: "تصميم طبي متطور يمتص الصدمات ويستهدف نقاط الألم الحساسة، مما يخفف آلام الشوكة العظمية (Épine calcanéenne) والتهاب اللفافة الأخمصية (Fasciite plantaire) بشكل فوري.",
      descEn: "Conception biomécanique avancée qui absorbe jusqu'à 90% des chocs sur sol dur, soulageant immédiatement l'aponévrosite plantaire, l'épine calcanéenne et la fatigue musculaire.",
    },
    {
      num: "02",
      icon: ShieldCheck,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-200",
      badgeAr: "تصحيح الوضعية والمشي",
      badgeEn: "Alignement Postural & Voûte Plantaire",
      titleAr: "دعم مقوس ثلاثي الأبعاد (3D Arch Support)",
      titleEn: "Soutien Ergonomique 3D de la Voûte",
      descAr: "تقنية بيوميكانيكية ترفع وتدعم قوس القدم إلى زاويته الطبيعية، لمنع تسطح القدمين وتوزيع وزن الجسم بتوازن يريح الركبتين ومفاصل الورك والعمود الفقري.",
      descEn: "La courbure ergonomique stabilise l'arche médiane, évitant l'affaissement du pied et redistribuant la pression pour protéger vos genoux, hanches et colonne vertébrale.",
    },
    {
      num: "03",
      icon: Activity,
      iconColor: "text-rose-500",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-200",
      badgeAr: "مكافحة التورم والإرهاق",
      badgeEn: "Active la Micro-Circulation",
      titleAr: "تدليك مستمر وتنشيط الدورة الدموية",
      titleEn: "Noeuds d'Acupression Massants Actifs",
      descAr: "حبيبات التدليك الاستراتيجية تحفز باطن القدم مع كل خطوة، مما يعزز تدفق الدم ويقضي نهائياً على ثقل وتشنج الساقين وتورم القدمين بعد ساعات العمل الطويلة.",
      descEn: "Des picots d'acupression massent délicatement vos terminaisons nerveuses à chaque foulée, relançant la circulation pour éliminer les jambes lourdes après de longues heures debout.",
    },
    {
      num: "04",
      icon: Scissors,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-200",
      badgeAr: "مقاسات من 35 إلى 46",
      badgeEn: "Découpe Facile du 35 au 46",
      titleAr: "قص مخصص وتوافق تام مع كل الأحذية",
      titleEn: "Ajustement Universel Sur-Mesure",
      descAr: "خطوط مقاسات دقيقة مطبوعة على الجهة السفلية تتيح قص الفرشة بالمقص بدقة فائقة. تلائم الأحذية الرياضية، أحذية العمل الكلاسيكية، والأحذية العسكرية وأحذية السلامة.",
      descEn: "Des lignes de découpe précises au dos permettent un ajustement parfait aux ciseaux pour toutes vos chaussures de sécurité, baskets de running, bottes ou chaussures de ville.",
    },
    {
      num: "05",
      icon: Truck,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-200",
      badgeAr: "شحن مجاني + دفع آمن 100%",
      badgeEn: "Livraison Gratuite Europe + Garantie 30j",
      titleAr: "شحن سريع ومجاني في أوروبا ودفع إلكتروني آمن",
      titleEn: "Livraison Express Offerte en Europe & Paiement Sécurisé",
      descAr: "شحن سريع ومجاني لجميع دول أوروبا (فرنسا، بلجيكا، سويسرا...). دفع إلكتروني آمن 100% عبر بطاقات الائتمان العالمية Visa و Mastercard و American Express أو PayPal مع ضمان استرجاع 30 يوماً.",
      descEn: "Expédition express 24-48h 100% gratuite dans toute l'Europe (France, Belgique, Suisse, Luxembourg...). Paiement en ligne hautement sécurisé par Carte Bancaire (Visa, Mastercard, Amex) ou PayPal avec garantie satisfait ou remboursé 30 jours.",
    },
  ];

  const scrollToOrder = () => {
    const el = document.getElementById("order-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-8 px-4 bg-gradient-to-b from-white via-orange-50/40 to-white border-b border-slate-100">
      <div className="max-w-xl mx-auto space-y-5">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-orange-700 bg-orange-100/90 px-3 py-1.5 rounded-full border border-orange-300">
            <Sparkles className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
            <span>{isAr ? "لماذا يختارها الآلاف في أوروبا؟" : "Adopté par plus de 88 000 clients en Europe"}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {isAr
              ? "5 أسباب تجعل هذه الفرشات الطبية خيارك الأمثل لراحة يومية تدوم"
              : "5 Raisons de Choisir nos Semelles Médicales Confort Pro"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto">
            {isAr
              ? "حل جذري ومثبت علمياً لمشاكل الوقوف الطويل، آلام الكعب والشوكة العظمية"
              : "Une solution biomécanique validée contre la fatigue de la station debout et les douleurs au talon"}
          </p>
        </div>

        {/* 5 Reasons Stack */}
        <div className="space-y-3 pt-1">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white border border-slate-200/90 hover:border-orange-300 rounded-2xl p-4 sm:p-5 shadow-xs transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start gap-3.5">
                  {/* Left Badge / Icon Container */}
                  <div
                    className={`w-11 h-11 rounded-xl ${r.bgColor} border ${r.borderColor} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105`}
                  >
                    <Icon className={`w-5 h-5 ${r.iconColor}`} />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-[11px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/70">
                        {isAr ? r.badgeAr : r.badgeEn}
                      </span>
                      <span className="text-xs font-black text-slate-400">
                        #{r.num}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                      {isAr ? r.titleAr : r.titleEn}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                      {isAr ? r.descAr : r.descEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call-to-Action to scroll directly to the offers */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={scrollToOrder}
            className="w-full group bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black py-3.5 px-6 rounded-2xl shadow-lg shadow-orange-600/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
          >
            <span>{isAr ? "استفد من العرض الحصري الآن (تخفيض حتى 60%)" : "Profiter de l'offre spéciale (Jusqu'à -60%)"}</span>
            {isAr ? (
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("hero-product");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full mt-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl border border-slate-300/80 transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{isAr ? "معاينة صور المنتج ومواصفاته بالتفصيل ↓" : "Voir les photos et caractéristiques du produit ↓"}</span>
          </button>
          <div className="mt-2 flex items-center justify-center gap-4 text-[11px] text-slate-500 font-bold">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              {isAr ? "دفع آمن 100%" : "Paiement 100% Sécurisé"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              {isAr ? "توصيل سريع مجاني في أوروبا" : "Livraison Gratuite en Europe"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              {isAr ? "كتاب إلكتروني مجاني 🎁" : "E-book Offert 🎁"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
