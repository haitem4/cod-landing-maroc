"use client";

import React, { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  Truck,
  AlertCircle,
  Loader2,
  Lock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { ProductConfig, OrderPayload } from "@/lib/types";
import { validateOrderForm, formatMoroccanPhone } from "@/lib/validation";
import { trackPixelEvent } from "@/lib/pixel";

export function isCasablanca(city: string): boolean {
  if (!city) return false;
  const normalized = city.trim().toLowerCase();
  return (
    normalized.includes("casa") ||
    normalized.includes("casablanca") ||
    city.includes("الدار البيضاء") ||
    city.includes("كازا")
  );
}

export function getShippingFee(city: string): number {
  return isCasablanca(city) ? 0 : 30;
}

interface OrderSectionProps {
  product: ProductConfig;
}

export const OrderSection: React.FC<OrderSectionProps> = ({ product }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isArabic = product.lang === "ar";

  const defaultOfferIdx = Math.max(
    0,
    product.offers.findIndex((o) => o.default)
  );
  const [selectedOfferIndex, setSelectedOfferIndex] = useState<number>(
    defaultOfferIdx >= 0 ? defaultOfferIdx : 0
  );

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: product.cities[0] || (isArabic ? "الدار البيضاء" : "Casablanca"),
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const hasInitiatedCheckout = useRef(false);

  const currentOffer = product.offers[selectedOfferIndex] || product.offers[0];
  const shippingFee = getShippingFee(formData.city);
  const totalAmount = currentOffer.price + shippingFee;

  const triggerInitiateCheckout = () => {
    if (!hasInitiatedCheckout.current) {
      hasInitiatedCheckout.current = true;
      trackPixelEvent("InitiateCheckout", {
        content_name: product.title,
        content_category: "COD Product",
        value: totalAmount,
        currency: "MAD",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    triggerInitiateCheckout();
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

  const handleOfferSelect = (idx: number) => {
    triggerInitiateCheckout();
    setSelectedOfferIndex(idx);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setServerError(null);
    const validation = validateOrderForm(formData, product.lang);

    if (!validation.isValid) {
      setErrors(validation.errors);
      const firstKey = Object.keys(validation.errors)[0];
      const el = document.getElementById(`field-${firstKey}`);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const utm: Record<string, string> = {};
      if (searchParams) {
        searchParams.forEach((value, key) => {
          if (key.startsWith("utm_") || key === "source" || key === "fbclid") {
            utm[key] = value;
          }
        });
      }

      // Generate Unique Order ID
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const generatedOrderId = `MA-${Date.now().toString().slice(-4)}${randomSuffix.toString().slice(-4)}`;

      const orderPayload: OrderPayload = {
        id: generatedOrderId,
        createdAt: new Date().toISOString(),
        productSlug: product.slug,
        productTitle: product.title,
        selectedOffer: {
          qty: currentOffer.qty,
          price: currentOffer.price,
          label: currentOffer.label,
        },
        shippingFee: shippingFee,
        total: totalAmount,
        customer: {
          fullName: formData.fullName.trim(),
          phone: formatMoroccanPhone(formData.phone.trim()),
          city: formData.city,
          address: formData.address.trim(),
        },
        source: {
          ...utm,
          referrer: typeof document !== "undefined" ? document.referrer : "",
        },
      };

      let finalOrderId = generatedOrderId;

      // Try server API if available, else handle client-side (for GitHub Pages static demo)
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.orderId) finalOrderId = data.orderId;
        }
      } catch (apiErr) {
        // Fallback for static hosting (GitHub Pages)
        console.log("[Static Mode] Storing order locally in browser:", orderPayload);
      }

      // Save order in session & local storage
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "last_order",
          JSON.stringify({ ...orderPayload, orderId: finalOrderId })
        );

        // Save to persistent demo orders list in localStorage
        try {
          const existing = JSON.parse(localStorage.getItem("cod_orders") || "[]");
          existing.unshift({ ...orderPayload, orderId: finalOrderId });
          localStorage.setItem("cod_orders", JSON.stringify(existing));
        } catch (e) {}
      }

      trackPixelEvent("Lead", {
        content_name: product.title,
        value: totalAmount,
        currency: "MAD",
        order_id: finalOrderId,
      });

      router.push(`/p/${product.slug}/confirmation?orderId=${finalOrderId}`);
    } catch (err: any) {
      console.error("Order submission error:", err);
      setServerError(
        err.message ||
          (isArabic
            ? "عذراً، حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى."
            : "Une erreur est survenue lors de l'envoi. Veuillez réessayer.")
      );
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="order-section"
      className="w-full py-6 md:py-10 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200"
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isArabic ? "طلب سريع - الدفع عند الاستلام" : "Commande Express - Paiement à la Livraison"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
            {isArabic ? "املأ معلوماتك وسنتصل بك لتأكيد الإرسال" : "Remplissez vos coordonnées pour commander"}
          </h2>
        </div>

        {/* 1. Sélection des offres */}
        <div className="mb-6">
          <div className="space-y-2.5">
            {product.offers.map((offer, idx) => {
              const isSelected = selectedOfferIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleOfferSelect(idx)}
                  className={`relative cursor-pointer rounded-2xl p-3.5 md:p-4 transition-all border-2 ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-300 shadow-sm"
                  }`}
                >
                  {offer.badge && (
                    <div
                      className={`absolute -top-2.5 ${
                        isArabic ? "left-3" : "right-3"
                      } bg-primary text-white text-[10px] font-extrabold py-0.5 px-2 rounded-full shadow-sm`}
                    >
                      {offer.badge}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center border-2 transition-all ${
                          isSelected
                            ? "border-primary bg-primary text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                          {offer.label}
                        </h4>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base sm:text-lg font-black text-primary">
                        {offer.price} {product.currency}
                      </div>
                      {offer.originalPrice && (
                        <div className="text-[11px] text-slate-400 line-through">
                          {offer.originalPrice} {product.currency}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Formulaire */}
        <form
          id="order-form"
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-slate-200 p-4 md:p-6 shadow-xl relative"
        >
          {serverError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          <div className="space-y-3.5">
            <div>
              <label htmlFor="field-fullName" className="block text-xs font-bold text-slate-700 mb-1">
                {isArabic ? "الاسم الكامل (الاسم والنسب) *" : "Nom et Prénom *"}
              </label>
              <input
                id="field-fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder={isArabic ? "مثال: فاطمة الزهراء العلمي" : "Ex: Karim Benani"}
                className={`w-full px-3.5 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.fullName
                    ? "border-red-400 bg-red-50/30"
                    : "border-slate-300 focus:border-primary focus:ring-primary/20 bg-slate-50/50"
                }`}
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-600 font-medium">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="field-phone" className="block text-xs font-bold text-slate-700 mb-1">
                {isArabic ? "رقم الهاتف للتواصل *" : "Numéro de Téléphone *"}
              </label>
              <input
                id="field-phone"
                type="tel"
                inputMode="numeric"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="06 XX XX XX XX"
                dir="ltr"
                className={`w-full px-3.5 py-3 rounded-xl border text-sm font-semibold tracking-wider focus:outline-none focus:ring-2 transition-all ${
                  errors.phone
                    ? "border-red-400 bg-red-50/30"
                    : "border-slate-300 focus:border-primary focus:ring-primary/20 bg-slate-50/50"
                }`}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="field-city" className="block text-xs font-bold text-slate-700 mb-1">
                {isArabic ? "المدينة *" : "Ville *"}
              </label>
              <select
                id="field-city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary/20"
              >
                {product.cities.map((city, idx) => (
                  <option key={idx} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="field-address" className="block text-xs font-bold text-slate-700 mb-1">
                {isArabic ? "عنوان التوصيل *" : "Adresse de livraison *"}
              </label>
              <textarea
                id="field-address"
                rows={2}
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder={isArabic ? "الحي، الشارع، رقم المنزل..." : "Quartier, Rue, N° d'appartement..."}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.address
                    ? "border-red-400 bg-red-50/30"
                    : "border-slate-300 focus:border-primary focus:ring-primary/20 bg-slate-50/50"
                }`}
              />
              {errors.address && <p className="mt-1 text-xs text-red-600 font-medium">{errors.address}</p>}
            </div>
          </div>

          {/* Récapitulatif avec règle de livraison Casa / Hors Casa */}
          <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex justify-between items-center text-xs text-slate-600 mb-1">
              <span>{isArabic ? "سعر العرض :" : "Prix de l'offre :"}</span>
              <span className="font-bold text-slate-800">{currentOffer.price} {product.currency}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
              <span>{isArabic ? "مصاريف التوصيل :" : "Frais de livraison :"}</span>
              <span className={`font-bold ${shippingFee === 0 ? "text-emerald-600" : "text-amber-700"}`}>
                {shippingFee === 0
                  ? (isArabic ? "مجاني (الدار البيضاء)" : "Gratuit (Casablanca)")
                  : (isArabic ? `+30 ${product.currency} (خارج الدار البيضاء)` : `+30 ${product.currency} (Hors Casablanca)`)}
              </span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
              <span className="text-sm font-extrabold text-slate-900">
                {isArabic ? "المجموع الكلي للدفع عند الاستلام :" : "Total à payer à la livraison :"}
              </span>
              <span className="text-xl font-black text-primary">
                {totalAmount} {product.currency}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-5 py-4 px-6 rounded-2xl text-white font-extrabold text-base shadow-xl transition-all flex items-center justify-center gap-2 ${
              isSubmitting
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary-hover active:scale-[0.98] cta-pulse"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{isArabic ? "جاري تسجيل طلبكم..." : "Enregistrement..."}</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>
                  {product.ctaText ||
                    (isArabic ? "تأكيد الطلب الآن (الدفع عند الاستلام)" : "Commander Maintenant")}
                </span>
              </>
            )}
          </button>

          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {isArabic
                ? "الدفع نقداً بعد استلام ومعاينة المنتج"
                : "Paiement en espèces à la livraison après vérification"}
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};
