import React from "react";
import {
  Zap,
  ShieldCheck,
  Clock,
  Sparkles,
  BatteryCharging,
  Gauge,
  Droplets,
  PackageCheck,
  Award,
  CheckCircle,
  HeartHandshake,
  LucideIcon,
} from "lucide-react";
import { BenefitItem } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  ShieldCheck,
  Clock,
  Sparkles,
  BatteryCharging,
  Gauge,
  Droplets,
  PackageCheck,
  Award,
  CheckCircle,
  HeartHandshake,
};

interface BenefitsProps {
  benefits: BenefitItem[];
  isArabic?: boolean;
}

export const Benefits: React.FC<BenefitsProps> = ({
  benefits,
  isArabic = false,
}) => {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section className="w-full py-10 md:py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            {isArabic ? "لماذا يفضلنا زبناؤنا ؟" : "Pourquoi Nous Choisir ?"}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-3 mb-2">
            {isArabic ? "مزايا استثنائية تجعل حياتك أسهل" : "Les Avantages Qui Font la Différence"}
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {benefits.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
