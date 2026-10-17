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
  Sparkles
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
      badgeEn: "Instant Relief On First Step",
      titleAr: "تخفيف فوري لآلام القدمين والظهر",
      titleEn: "Instant Foot & Lower Back Pain Relief",
      descAr: "تصميم طبي متطور يمتص الصدمات ويستهدف نقاط الألم الحساسة، مما يخفف آلام الشوكة العظمية (Épine calcanéenne) والتهاب اللفافة الأخمصية (Fasciite plantaire) بشكل فوري.",
      descEn: "Advanced orthopedic design absorbs up to 90% of ground shock, relieving acute pain from heel spurs, plantar fasciitis, and lower spine fatigue immediately.",
    },
    {
      num: "02",
      icon: ShieldCheck,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-200",
      badgeAr: "تصحيح الوضعية والمشي",
      badgeEn: "Postural & Gait Alignment",
      titleAr: "دعم مقوس ثلاثي الأبعاد (3D Arch Support)",
      titleEn: "3D Ergonomic Arch Support",
      descAr: "تقنية بيوميكانيكية ترفع وتدعم قوس القدم إلى زاويته الطبيعية، لمنع تسطح القدمين وتوزيع وزن الجسم بتوازن يريح الركبتين ومفاصل الورك والعمود الفقري.",
      descEn: "Biomechanical curvature stabilizes the midfoot arch, preventing fallen arches and redistributing pressure to protect knees, hips, and back posture.",
    },
    {
      num: "03",
      icon: Activity,
      iconColor: "text-rose-500",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-200",
      badgeAr: "مكافحة التورم والإرهاق",
      badgeEn: "Eliminates Swelling & Fatigue",
      titleAr: "تدليك مستمر وتنشيط الدورة الدموية",
      titleEn: "Active Acupressure Circulation Nodes",
      descAr: "حبيبات التدليك الاستراتيجية تحفز باطن القدم مع كل خطوة، مما يعزز تدفق الدم ويقضي نهائياً على ثقل وتشنج الساقين وتورم القدمين بعد ساعات العمل الطويلة.",
      descEn: "Smart acupressure nodules micro-massage nerve endings with every stride, enhancing blood circulation and preventing legs from swelling after long shifts.",
    },
    {
      num: "04",
      icon: Scissors,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-200",
      badgeAr: "مقاسات من 35 إلى 46",
      badgeEn: "Fits All Sizes EU 35-46",
      titleAr: "قص مخصص وتوافق تام مع كل الأحذية",
      titleEn: "Universal Fit & Trim-To-Size Convenience",
      descAr: "خطوط مقاسات دقيقة مطبوعة على الجهة السفلية تتيح قص الفرشة بالمقص بدقة فائقة. تلائم الأحذية الرياضية، أحذية العمل الكلاسيكية، والأحذية العسكرية وأحذية السلامة.",
      descEn: "Precision guided cut lines make it effortless to trim for a glove-like fit in running shoes, formal leather shoes, boots, and industrial safety footwear.",
    },
    {
      num: "05",
      icon: Truck,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-200",
      badgeAr: "معاينة قبل الدفع + ضمان",
      badgeEn: "Inspect Before Paying + Guarantee",
      titleAr: "تسوق مغربي آمن 100%: الدفع عند الاستلام",
      titleEn: "100% Risk-Free Cash On Delivery in Morocco",
      descAr: "لا تدفع أي درهم مسبقاً! عاين طلبك وتأكد من الجودة والمقاس أمام موزع التوصيل في منزلك، مع توصيل سريع 24-48 ساعة لجميع مدن المغرب وضمان استبدال.",
      descEn: "Zero risk: inspect your order at your doorstep before handing over any payment. Fast 24-48h nationwide delivery across all Moroccan cities.",
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
            <span>{isAr ? "لماذا يختارها الآلاف في المغرب؟" : "Why 88,000+ Customers Love Us"}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {isAr
              ? "5 أسباب تجعل هذه الفرشات الطبية خيارك الأمثل لراحة يومية تدوم"
              : "5 Reasons Why These Insoles Are Your Ultimate Daily Comfort Upgrade"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto">
            {isAr
              ? "حل جذري ومثبت علمياً لمشاكل الوقوف الطويل، آلام الكعب والشوكة العظمية"
              : "A clinically proven, natural solution for standing all day, heel pain, and arch fatigue"}
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
            className="w-full group bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black py-3.5 px-6 rounded-2xl shadow-lg shadow-orange-600/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <span>{isAr ? "استفد من العرض الحصري الآن (تخفيض حتى 60%)" : "Claim Your Exclusive Discount (Up To 60% Off)"}</span>
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
            className="w-full mt-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl border border-slate-300/80 transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5"
          >
            <span>{isAr ? "معاينة صور المنتج ومواصفاته بالتفصيل ↓" : "View Product Photos & Full Specs ↓"}</span>
          </button>
          <div className="mt-2 flex items-center justify-center gap-4 text-[11px] text-slate-500 font-bold">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              {isAr ? "دفع عند الاستلام" : "Cash On Delivery"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              {isAr ? "توصيل سريع مجاني" : "Fast Free Shipping"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              {isAr ? "كتاب إلكتروني مجاني 🎁" : "Free Bonus eBook 🎁"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
