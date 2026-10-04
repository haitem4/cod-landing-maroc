import React from "react";
import {
  Banknote,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Headphones,
  RefreshCw,
} from "lucide-react";

interface TrustBadgesProps {
  badges: string[];
  isArabic?: boolean;
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({
  badges,
  isArabic = false,
}) => {
  const icons = [Banknote, Truck, RefreshCw, ShieldCheck];

  return (
    <section className="w-full py-8 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {badges.map((badge, idx) => {
            const IconComponent = icons[idx % icons.length] || CheckCircle2;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center flex flex-col items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-xs md:text-sm font-bold text-slate-800 leading-snug">
                  {badge}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
