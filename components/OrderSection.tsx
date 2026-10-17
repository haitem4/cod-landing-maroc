"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Truck,
  AlertCircle,
  Loader2,
  Lock,
  Sparkles,
  CheckCircle2,
  User,
  Phone,
  MapPin,
  Flame,
  Scissors,
  Gift,
} from "lucide-react";
import {
  Lang,
  CONTENT,
  COLOR_OPTIONS,
  SIZES,
  BUNDLE_OFFERS,
  MOROCCAN_CITIES,
} from "@/lib/content";
import {
  isCasablanca,
  getShippingFee,
  validateOrderForm,
  formatMoroccanPhone,
} from "@/lib/validation";

interface OrderSectionProps {
  lang: Lang;
  selectedColor: string;
  onSelectColor: (colorId: string) => void;
}

export const OrderSection: React.FC<OrderSectionProps> = ({
  lang,
  selectedColor,
  onSelectColor,
}) => {
  const router = useRouter();
  const t = CONTENT[lang];

  const [selectedOfferIndex, setSelectedOfferIndex] = useState<number>(1); // Default to 2 pairs (Most popular)
  const [selectedSize, setSelectedSize] = useState<string>(SIZES[2].label); // EU 39-40
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: MOROCCAN_CITIES[0],
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const currentOffer = BUNDLE_OFFERS[selectedOfferIndex] || BUNDLE_OFFERS[0];
  const shippingFee = getShippingFee(formData.city);
  const totalAmount = currentOffer.price + shippingFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setServerError(null);
    const validation = validateOrderForm(formData, lang);

    if (!validation.isValid) {
      setErrors(validation.errors);
      const firstKey = Object.keys(validation.errors)[0];
      const el = document.getElementById(`field-${firstKey}`);
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const orderId = `CFP-${Date.now().toString().slice(-4)}${randomSuffix.toString().slice(-4)}`;

      const orderPayload = {
        id: orderId,
        createdAt: new Date().toISOString(),
        product: lang === "ar" ? "فرشات التدليك الطبية (Confort Pro)" : "Medical Acupressure Insoles (Confort Pro)",
        color: selectedColor,
        size: selectedSize,
        pack: lang === "ar" ? currentOffer.labelAr : currentOffer.labelEn,
        qty: currentOffer.qty,
        unitPrice: currentOffer.price,
        shippingFee: shippingFee,
        total: totalAmount,
        currency: "DH",
        customer: {
          fullName: formData.fullName.trim(),
          phone: formatMoroccanPhone(formData.phone.trim()),
          city: formData.city,
          address: formData.address.trim(),
        },
      };

      if (typeof window !== "undefined") {
        sessionStorage.setItem("stepprs_last_order", JSON.stringify(orderPayload));
        try {
          const prev = JSON.parse(localStorage.getItem("stepprs_orders") || "[]");
          prev.unshift(orderPayload);
          localStorage.setItem("stepprs_orders", JSON.stringify(prev));
        } catch (e) {}
      }

      router.push(`/confirmation?orderId=${orderId}&lang=${lang}`);
    } catch (err: any) {
      console.error(err);
      setServerError(
        lang === "ar"
          ? "عذراً، حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى."
          : "An error occurred while submitting your order. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-section" className="w-full py-6 md:py-8 space-y-6">
      {/* 1. COLOR SELECTOR */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200/90 shadow-sm space-y-3">
        <label className="block text-xs sm:text-sm font-black text-slate-900">
          {t.colorTitle}
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {COLOR_OPTIONS.map((col) => {
            const isSelected = selectedColor === col.id;
            return (
              <button
                key={col.id}
                type="button"
                onClick={() => onSelectColor(col.id)}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all text-center select-none ${
                  isSelected
                    ? "border-orange-600 bg-orange-50/70 ring-4 ring-orange-500/15 shadow-sm scale-102"
                    : "border-slate-200 bg-slate-50/60 hover:border-slate-300"
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full shadow-inner border-2 border-white"
                  style={{ backgroundColor: col.hex }}
                />
                <span className="text-xs font-black text-slate-900 leading-tight">
                  {lang === "ar" ? col.nameAr : col.nameEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SHOE SIZE SELECTOR */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs sm:text-sm font-black text-slate-900">
            {t.sizeTitle}
          </label>
          <span className="text-[11px] text-orange-700 font-bold bg-orange-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Scissors className="w-3 h-3" />
            <span>Trim-to-fit</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SIZES.map((sz, idx) => {
            const isSelected = selectedSize === sz.label;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedSize(sz.label)}
                className={`py-2 px-3 rounded-xl border-2 text-xs font-black transition-all ${
                  isSelected
                    ? "border-orange-600 bg-orange-600 text-white shadow-sm"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800"
                }`}
              >
                {sz.label}
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
          {t.sizeHint}
        </p>
      </div>

      {/* 3. BUNDLE OFFERS STACK */}
      <div className="space-y-3">
        <label className="block text-xs sm:text-sm font-black text-slate-900 px-1">
          {t.offersTitle}
        </label>

        <div className="space-y-3">
          {BUNDLE_OFFERS.map((offer, idx) => {
            const isSelected = selectedOfferIndex === idx;
            const unitPrice = Math.round(offer.price / offer.qty);

            return (
              <div
                key={idx}
                onClick={() => setSelectedOfferIndex(idx)}
                className={`relative cursor-pointer rounded-3xl p-4 transition-all duration-200 border-2 select-none ${
                  isSelected
                    ? "border-orange-600 bg-orange-50/50 ring-4 ring-orange-500/15 shadow-md scale-[1.01]"
                    : "border-slate-200 bg-white hover:border-slate-300 shadow-xs"
                }`}
              >
                {/* Badge ribbon */}
                {(offer.badgeAr || offer.badgeEn) && (
                  <div
                    className={`absolute -top-3 ${
                      lang === "ar" ? "left-4" : "right-4"
                    } bg-gradient-to-r from-orange-600 to-amber-600 text-white text-[11px] font-black py-0.5 px-3 rounded-full shadow-md flex items-center gap-1`}
                  >
                    <Sparkles className="w-3 h-3 text-amber-200" />
                    <span>{lang === "ar" ? offer.badgeAr : offer.badgeEn}</span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all flex-shrink-0 ${
                        isSelected
                          ? "border-orange-600 bg-orange-600 text-white shadow-xs"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>

                    <div>
                      <h4 className="font-black text-slate-900 text-xs sm:text-sm leading-snug">
                        {lang === "ar" ? offer.labelAr : offer.labelEn}
                      </h4>
                      <p className="text-[11px] text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
                        <Gift className="w-3 h-3 text-emerald-600" />
                        <span>{lang === "ar" ? offer.saveAr : offer.saveEn}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-xl sm:text-2xl font-black text-orange-600 leading-tight">
                      {offer.price} <span className="text-xs font-bold text-slate-800">DH</span>
                    </div>
                    <div className="text-xs text-slate-400 line-through font-bold">
                      {offer.originalPrice} DH
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. MOROCCAN EXPRESS COD CHECKOUT FORM */}
      <form
        id="order-form"
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border-2 border-slate-200/90 p-5 sm:p-7 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600" />

        <div className="text-center mb-6 pt-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-orange-700 bg-orange-100/80 px-3.5 py-1.5 rounded-full border border-orange-200 mb-2">
            <Flame className="w-4 h-4 text-orange-600 fill-orange-600 animate-pulse" />
            <span>{t.orderSectionTitle}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
            {t.orderSectionSubtitle}
          </h3>
        </div>

        {serverError && (
          <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
            <span>{serverError}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="field-fullName" className="block text-xs font-black text-slate-800 mb-1.5">
              {t.fullNameLabel}
            </label>
            <div className="relative">
              <div className={`absolute top-1/2 -translate-y-1/2 ${lang === "ar" ? "right-3.5" : "left-3.5"} text-slate-400 pointer-events-none`}>
                <User className="w-4 h-4" />
              </div>
              <input
                id="field-fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder={t.fullNamePlaceholder}
                className={`w-full ${lang === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"} py-3 rounded-2xl border text-sm font-semibold focus:outline-none focus:ring-4 transition-all ${
                  errors.fullName
                    ? "border-rose-400 bg-rose-50/40 focus:ring-rose-200"
                    : "border-slate-300 focus:border-orange-600 focus:ring-orange-500/15 bg-slate-50/50 hover:bg-white"
                }`}
              />
            </div>
            {errors.fullName && <p className="mt-1.5 text-xs text-rose-600 font-bold">{errors.fullName}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="field-phone" className="block text-xs font-black text-slate-800 mb-1.5">
              {t.phoneLabel}
            </label>
            <div className="relative">
              <div className={`absolute top-1/2 -translate-y-1/2 ${lang === "ar" ? "right-3.5" : "left-3.5"} text-slate-400 pointer-events-none flex items-center gap-1`}>
                <Phone className="w-4 h-4" />
                <span className="text-xs">🇲🇦</span>
              </div>
              <input
                id="field-phone"
                type="tel"
                inputMode="numeric"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={t.phonePlaceholder}
                dir="ltr"
                className={`w-full ${lang === "ar" ? "pr-14 pl-4" : "pl-14 pr-4"} py-3 rounded-2xl border text-sm font-bold tracking-wider focus:outline-none focus:ring-4 transition-all ${
                  errors.phone
                    ? "border-rose-400 bg-rose-50/40 focus:ring-rose-200"
                    : "border-slate-300 focus:border-orange-600 focus:ring-orange-500/15 bg-slate-50/50 hover:bg-white"
                }`}
              />
            </div>
            {errors.phone && <p className="mt-1.5 text-xs text-rose-600 font-bold">{errors.phone}</p>}
          </div>

          {/* City Selection */}
          <div>
            <label htmlFor="field-city" className="block text-xs font-black text-slate-800 mb-1.5">
              {t.cityLabel}
            </label>
            <div className="relative">
              <div className={`absolute top-1/2 -translate-y-1/2 ${lang === "ar" ? "right-3.5" : "left-3.5"} text-slate-400 pointer-events-none`}>
                <MapPin className="w-4 h-4" />
              </div>
              <select
                id="field-city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full ${lang === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"} py-3 rounded-2xl border border-slate-300 bg-slate-50/50 hover:bg-white text-sm font-black text-slate-800 focus:outline-none focus:ring-4 focus:border-orange-600 focus:ring-orange-500/15`}
              >
                {MOROCCAN_CITIES.map((c, idx) => {
                  const isCasa = isCasablanca(c);
                  return (
                    <option key={idx} value={c}>
                      {c} {isCasa ? (lang === "ar" ? "(توصيل بالمجان 0 درهم)" : "(Free Delivery 0 DH)") : (lang === "ar" ? "(توصيل 30 درهم)" : "(Shipping 30 DH)")}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Full Delivery Address */}
          <div>
            <label htmlFor="field-address" className="block text-xs font-black text-slate-800 mb-1.5">
              {t.addressLabel}
            </label>
            <textarea
              id="field-address"
              rows={2}
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder={t.addressPlaceholder}
              className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-4 transition-all ${
                errors.address
                  ? "border-rose-400 bg-rose-50/40 focus:ring-rose-200"
                  : "border-slate-300 focus:border-orange-600 focus:ring-orange-500/15 bg-slate-50/50 hover:bg-white"
              }`}
            />
            {errors.address && <p className="mt-1.5 text-xs text-rose-600 font-bold">{errors.address}</p>}
          </div>
        </div>

        {/* LIVE COD ORDER RECAP */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-50/90 border-2 border-slate-200 space-y-2.5">
          <div className="flex justify-between items-center text-xs text-slate-600 font-bold">
            <span>{lang === "ar" ? "سعر العرض المختار :" : "Selected Offer Price :"}</span>
            <span className="font-black text-slate-900">{currentOffer.price} DH</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-600 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-slate-500" />
              <span>{t.shippingLabel}</span>
            </span>
            <span className={`font-black px-2.5 py-0.5 rounded-md text-xs ${
              shippingFee === 0
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "bg-amber-100 text-amber-900 border border-amber-300"
            }`}>
              {shippingFee === 0 ? t.shippingFreeCasa : t.shippingOther}
            </span>
          </div>

          <div className="border-t-2 border-dashed border-slate-300 pt-3 flex justify-between items-center">
            <div>
              <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight">
                {t.totalLabel}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">
                {lang === "ar" ? "الدفع نقداً بعد فحص ومعاينة الطرد" : "Pay cash after inspecting your parcel"}
              </span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-orange-600">
              {totalAmount} <span className="text-base font-bold text-slate-800">DH</span>
            </span>
          </div>
        </div>

        {/* MAIN CTA SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-6 py-4 px-6 rounded-2xl text-white font-black text-base sm:text-lg shadow-xl shadow-orange-600/30 transition-all flex items-center justify-center gap-2 select-none ${
            isSubmitting
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700 active:scale-[0.98] cta-pulse cursor-pointer"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{lang === "ar" ? "جاري تسجيل طلبكم بأمان..." : "Securing your order..."}</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              <span>{t.ctaButton}</span>
            </>
          )}
        </button>

        {/* Security reassurance */}
        <div className="mt-3.5 flex items-center justify-center gap-2 text-xs text-slate-600 font-bold text-center">
          <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{t.ctaSubtext}</span>
        </div>
      </form>
    </section>
  );
};
