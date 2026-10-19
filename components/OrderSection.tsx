"use client";

import React, { useState, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import { event as trackFbEvent } from "@/lib/fpixel";
import { sendOrderToGoogleSheet, OrderData } from "@/lib/googleSheet";
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
  Mail,
  MapPin,
  Flame,
  Scissors,
  Gift,
  CreditCard,
  ShieldCheck,
  Globe,
  DollarSign,
  ChevronRight,
  ExternalLink,
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
  PAYMENT_CONFIG,
  INTERNATIONAL_COUNTRIES,
  CountryOption,
  PaymentMethod,
} from "@/lib/paymentConfig";
import {
  isCasablanca,
  getShippingFee,
  validateOrderForm,
  formatMoroccanPhone,
  detectCardBrand,
  formatCardNumber,
  formatCardExpiry,
  validateCardNumber,
  validateExpiry,
} from "@/lib/validation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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
  const t = CONTENT[lang] || CONTENT.en;
  const isArabic = lang === "ar";

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Selection states
  const [selectedOfferIndex, setSelectedOfferIndex] = useState<number>(1); // Default to 2 pairs (Most popular)
  const [selectedSize, setSelectedSize] = useState<string>(SIZES[2].label); // EU 39-40
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("US");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe");

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    postalCode: "",
  });

  // Credit Card Fields (Stripe)
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    holderName: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const selectedCountry =
    INTERNATIONAL_COUNTRIES.find((c) => c.code === selectedCountryCode) ||
    INTERNATIONAL_COUNTRIES[0];
  const isMorocco = selectedCountryCode === "MA";

  const currentOffer = BUNDLE_OFFERS[selectedOfferIndex] || BUNDLE_OFFERS[0];

  // Pricing calculations
  const displayCurrency = isMorocco ? "DH" : "USD";
  const currencySymbol = isMorocco ? "DH" : "$";
  const offerPrice = isMorocco ? currentOffer.price : currentOffer.priceUsd;
  const originalOfferPrice = isMorocco ? currentOffer.originalPrice : currentOffer.originalPriceUsd;

  // Shipping
  const shippingFee = isMorocco ? getShippingFee(formData.city) : 0; // FREE international express shipping
  const totalAmount = isMorocco ? offerPrice + shippingFee : offerPrice;

  // Auto-switch payment method if COD selected and user changes away from Morocco
  useEffect(() => {
    if (!isMorocco && paymentMethod === "cod") {
      setPaymentMethod("stripe");
    }
  }, [selectedCountryCode, isMorocco, paymentMethod]);

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

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "number") {
      formattedValue = formatCardNumber(value);
    } else if (name === "expiry") {
      formattedValue = formatCardExpiry(value);
    } else if (name === "cvc") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setCardData((prev) => ({ ...prev, [name]: formattedValue }));
    if (cardErrors[name]) {
      setCardErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    setSelectedCountryCode(newCode);
    const country = INTERNATIONAL_COUNTRIES.find((c) => c.code === newCode);
    if (newCode === "MA") {
      if (!formData.city) {
        setFormData((prev) => ({ ...prev, city: MOROCCAN_CITIES[0] }));
      }
    } else {
      if (MOROCCAN_CITIES.includes(formData.city)) {
        setFormData((prev) => ({ ...prev, city: "" }));
      }
    }
  };

  const detectedBrand = detectCardBrand(cardData.number);

  const validateCardFields = (): boolean => {
    const newCardErrors: Record<string, string> = {};

    if (!validateCardNumber(cardData.number)) {
      newCardErrors.number =
        lang === "ar"
          ? "يرجى إدخال رقم بطاقة صحيح"
          : "Please enter a valid credit card number";
    }

    if (!validateExpiry(cardData.expiry)) {
      newCardErrors.expiry =
        lang === "ar"
          ? "تاريخ غير صالح (MM/YY)"
          : "Invalid expiry date (MM/YY)";
    }

    if (cardData.cvc.length < 3) {
      newCardErrors.cvc =
        lang === "ar" ? "رمز الأمان غير مكتمل" : "Invalid CVC code (3 or 4 digits)";
    }

    if (!cardData.holderName || cardData.holderName.trim().length < 3) {
      newCardErrors.holderName =
        lang === "ar"
          ? "يرجى كتابة الاسم كما هو على البطاقة"
          : "Please enter cardholder name as written on card";
    }

    setCardErrors(newCardErrors);
    return Object.keys(newCardErrors).length === 0;
  };

  // Submit and process order
  const processOrder = async (
    customPaymentMethod?: PaymentMethod,
    paypalDetails?: any
  ) => {
    const activeMethod = customPaymentMethod || paymentMethod;

    // Validate customer info
    const validation = validateOrderForm(
      {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: selectedCountryCode,
      },
      lang
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      const firstKey = Object.keys(validation.errors)[0];
      const el = document.getElementById(`field-${firstKey}`);
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return false;
    }

    // If Credit Card, validate card inputs
    if (activeMethod === "stripe" && !validateCardFields()) {
      const firstKey = Object.keys(cardErrors)[0] || "number";
      const el = document.getElementById(`card-${firstKey}`);
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return false;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const orderPrefix = isMorocco ? "CFP" : "INT";
      const orderId = `${orderPrefix}-${Date.now().toString().slice(-4)}${randomSuffix.toString().slice(-4)}`;

      const isPaid = activeMethod === "stripe" || activeMethod === "paypal";
      const txnId =
        paypalDetails?.id ||
        (activeMethod === "stripe"
          ? `ch_${Math.random().toString(36).substring(2, 14)}`
          : undefined);

      // Clean masked card (PCI-DSS: NEVER save full card number!)
      const rawCard = cardData.number.replace(/\D/g, "");
      const cardLast4 = rawCard.length >= 4 ? rawCard.slice(-4) : undefined;
      const cardBrand = activeMethod === "stripe" ? detectedBrand.toUpperCase() : undefined;

      const orderPayload: OrderData = {
        id: orderId,
        createdAt: new Date().toISOString(),
        product:
          lang === "ar"
            ? "فرشات التدليك الطبية (Confort Pro Orthotics)"
            : "Medical Acupressure Insoles (Confort Pro Orthotics)",
        color: selectedColor,
        size: selectedSize,
        pack: lang === "ar" ? currentOffer.labelAr : currentOffer.labelEn,
        qty: currentOffer.qty,
        unitPrice: offerPrice,
        shippingFee: shippingFee,
        total: totalAmount,
        currency: displayCurrency,
        paymentMethod: activeMethod,
        paymentStatus: isPaid ? "paid" : "pending",
        transactionId: txnId,
        cardBrand: cardBrand,
        cardLast4: cardLast4,
        customer: {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: `${selectedCountry.dialCode} ${formData.phone.trim()}`,
          country: selectedCountry.code,
          countryName: lang === "ar" ? selectedCountry.nameAr : selectedCountry.nameEn,
          city: formData.city.trim(),
          address: formData.address.trim(),
          postalCode: formData.postalCode.trim(),
        },
      };

      // Store securely in session and local history
      if (typeof window !== "undefined") {
        sessionStorage.setItem("stepprs_last_order", JSON.stringify(orderPayload));
        try {
          const prev = JSON.parse(localStorage.getItem("stepprs_orders") || "[]");
          prev.unshift(orderPayload);
          localStorage.setItem("stepprs_orders", JSON.stringify(prev));
        } catch (e) {}
      }

      // Send to Google Sheets (including payment method & transaction ID)
      try {
        await Promise.race([
          sendOrderToGoogleSheet(orderPayload),
          new Promise((resolve) => setTimeout(resolve, 1500)),
        ]);
      } catch (sheetErr) {
        console.error("Sheet error:", sheetErr);
      }

      // Meta Pixel Purchase Event
      trackFbEvent("Purchase", {
        content_name: "Confort Pro Insoles",
        value: totalAmount,
        currency: displayCurrency === "DH" ? "MAD" : "USD",
        num_items: currentOffer.qty,
        order_id: orderId,
      });

      // Redirect to Confirmation
      router.push(`/confirmation?orderId=${orderId}&lang=${lang}`);
      return true;
    } catch (err: any) {
      console.error(err);
      setServerError(
        lang === "ar"
          ? "عذراً، حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى."
          : "An error occurred while processing your order. Please try again."
      );
      setIsSubmitting(false);
      return false;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    await processOrder();
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
        <div className="flex items-center justify-between px-1">
          <label className="block text-xs sm:text-sm font-black text-slate-900">
            {t.offersTitle}
          </label>
          <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {isMorocco ? "شحن مجاني لكازا" : "✈️ FREE Express Shipping"}
          </span>
        </div>

        <div className="space-y-3">
          {BUNDLE_OFFERS.map((offer, idx) => {
            const isSelected = selectedOfferIndex === idx;
            const price = isMorocco ? offer.price : offer.priceUsd;
            const origPrice = isMorocco ? offer.originalPrice : offer.originalPriceUsd;

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
                      {isMorocco ? `${price} DH` : `$${price.toFixed(2)}`}
                    </div>
                    <div className="text-xs text-slate-400 line-through font-bold">
                      {isMorocco ? `${origPrice} DH` : `$${origPrice.toFixed(2)}`}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. INTERNATIONAL CHECKOUT FORM */}
      <form
        id="order-form"
        onSubmit={handleFormSubmit}
        className="bg-white rounded-3xl border-2 border-slate-200/90 p-5 sm:p-7 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-600 via-amber-500 to-emerald-500" />

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
          {/* Country Selection */}
          <div>
            <label htmlFor="field-country" className="block text-xs font-black text-slate-800 mb-1.5">
              {t.countryLabel}
            </label>
            <div className="relative">
              <div className={`absolute top-1/2 -translate-y-1/2 ${lang === "ar" ? "right-3.5" : "left-3.5"} text-slate-400 pointer-events-none flex items-center gap-1.5`}>
                <span className="text-base">{selectedCountry.flag}</span>
              </div>
              <select
                id="field-country"
                name="country"
                value={selectedCountryCode}
                onChange={handleCountryChange}
                className={`w-full ${lang === "ar" ? "pr-12 pl-4" : "pl-12 pr-4"} py-3 rounded-2xl border border-slate-300 bg-slate-50/50 hover:bg-white text-sm font-black text-slate-800 focus:outline-none focus:ring-4 focus:border-orange-600 focus:ring-orange-500/15`}
              >
                {INTERNATIONAL_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {lang === "ar" ? c.nameAr : c.nameEn} ({c.dialCode})
                  </option>
                ))}
              </select>
            </div>
          </div>

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

          {/* Email Address (Crucial for international receipts & tracking) */}
          <div>
            <label htmlFor="field-email" className="block text-xs font-black text-slate-800 mb-1.5">
              {t.emailLabel}
            </label>
            <div className="relative">
              <div className={`absolute top-1/2 -translate-y-1/2 ${lang === "ar" ? "right-3.5" : "left-3.5"} text-slate-400 pointer-events-none`}>
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="field-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t.emailPlaceholder}
                dir="ltr"
                className={`w-full ${lang === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"} py-3 rounded-2xl border text-sm font-semibold focus:outline-none focus:ring-4 transition-all ${
                  errors.email
                    ? "border-rose-400 bg-rose-50/40 focus:ring-rose-200"
                    : "border-slate-300 focus:border-orange-600 focus:ring-orange-500/15 bg-slate-50/50 hover:bg-white"
                }`}
              />
            </div>
            {errors.email && <p className="mt-1.5 text-xs text-rose-600 font-bold">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="field-phone" className="block text-xs font-black text-slate-800 mb-1.5">
              {t.phoneLabel}
            </label>
            <div className="relative flex items-center">
              <span className={`absolute top-1/2 -translate-y-1/2 ${lang === "ar" ? "right-3.5" : "left-3.5"} text-slate-500 text-xs font-black pointer-events-none flex items-center gap-1`}>
                <span>{selectedCountry.flag}</span>
                <span>{selectedCountry.dialCode}</span>
              </span>
              <input
                id="field-phone"
                type="tel"
                inputMode="numeric"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={isMorocco ? "06 XX XX XX XX" : "123 456 7890"}
                dir="ltr"
                className={`w-full ${lang === "ar" ? "pr-20 pl-4" : "pl-20 pr-4"} py-3 rounded-2xl border text-sm font-bold tracking-wider focus:outline-none focus:ring-4 transition-all ${
                  errors.phone
                    ? "border-rose-400 bg-rose-50/40 focus:ring-rose-200"
                    : "border-slate-300 focus:border-orange-600 focus:ring-orange-500/15 bg-slate-50/50 hover:bg-white"
                }`}
              />
            </div>
            {errors.phone && <p className="mt-1.5 text-xs text-rose-600 font-bold">{errors.phone}</p>}
          </div>

          {/* City / State Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="field-city" className="block text-xs font-black text-slate-800 mb-1.5">
                {t.cityLabel}
              </label>
              <div className="relative">
                <div className={`absolute top-1/2 -translate-y-1/2 ${lang === "ar" ? "right-3.5" : "left-3.5"} text-slate-400 pointer-events-none`}>
                  <MapPin className="w-4 h-4" />
                </div>
                {isMorocco ? (
                  <select
                    id="field-city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full pr-10 pl-4 py-3 rounded-2xl border border-slate-300 bg-slate-50/50 hover:bg-white text-xs font-black text-slate-800 focus:outline-none focus:ring-4 focus:border-orange-600 focus:ring-orange-500/15"
                  >
                    {MOROCCAN_CITIES.map((c, idx) => {
                      const isCasa = isCasablanca(c);
                      return (
                        <option key={idx} value={c}>
                          {c} {isCasa ? "(0 DH)" : "(+30 DH)"}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <input
                    id="field-city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York, Paris, London..."
                    className={`w-full ${lang === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"} py-3 rounded-2xl border text-sm font-semibold focus:outline-none focus:ring-4 transition-all ${
                      errors.city
                        ? "border-rose-400 bg-rose-50/40 focus:ring-rose-200"
                        : "border-slate-300 focus:border-orange-600 focus:ring-orange-500/15 bg-slate-50/50 hover:bg-white"
                    }`}
                  />
                )}
              </div>
              {errors.city && <p className="mt-1.5 text-xs text-rose-600 font-bold">{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="field-postalCode" className="block text-xs font-black text-slate-800 mb-1.5">
                {t.stateZipLabel}
              </label>
              <input
                id="field-postalCode"
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="ZIP / Postal code / State"
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50/50 hover:bg-white text-sm font-semibold focus:outline-none focus:ring-4 focus:border-orange-600 focus:ring-orange-500/15"
              />
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

        {/* 5. PAYMENT METHODS SELECTOR TABS */}
        <div className="mt-6 pt-5 border-t-2 border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs sm:text-sm font-black text-slate-900">
              {t.paymentMethodTitle}
            </label>
            <span className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>256-Bit SSL</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Carte Bancaire Option */}
            <button
              type="button"
              onClick={() => setPaymentMethod("stripe")}
              className={`p-3.5 rounded-2xl border-2 flex sm:flex-col items-center justify-between sm:justify-center gap-2 transition-all ${
                paymentMethod === "stripe"
                  ? "border-orange-600 bg-orange-50/70 ring-4 ring-orange-500/15 shadow-sm"
                  : "border-slate-200 bg-slate-50/60 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <CreditCard className={`w-5 h-5 ${paymentMethod === "stripe" ? "text-orange-600" : "text-slate-600"}`} />
                <span className="text-xs font-black text-slate-900">
                  {lang === "ar" ? "بطاقة بنكية (Carte Bancaire)" : "Carte Bancaire / Credit Card"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">CB</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">VISA</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">MC</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">CMI</span>
              </div>
            </button>

            {/* PayPal Option */}
            <button
              type="button"
              onClick={() => setPaymentMethod("paypal")}
              className={`p-3.5 rounded-2xl border-2 flex sm:flex-col items-center justify-between sm:justify-center gap-2 transition-all ${
                paymentMethod === "paypal"
                  ? "border-[#0070BA] bg-blue-50/80 ring-4 ring-blue-500/15 shadow-sm"
                  : "border-slate-200 bg-slate-50/60 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-[#0070BA] font-black text-base italic">P</span>
                <span className="text-xs font-black text-slate-900">
                  {t.paypalTab}
                </span>
              </div>
              <span className="text-[10px] text-blue-700 font-extrabold bg-blue-100/70 px-2 py-0.5 rounded-md">
                Buyer Protection
              </span>
            </button>

            {/* Cash on Delivery (Morocco only) */}
            <button
              type="button"
              disabled={!isMorocco}
              onClick={() => setPaymentMethod("cod")}
              className={`p-3.5 rounded-2xl border-2 flex sm:flex-col items-center justify-between sm:justify-center gap-2 transition-all ${
                !isMorocco
                  ? "opacity-50 cursor-not-allowed border-slate-200 bg-slate-100"
                  : paymentMethod === "cod"
                  ? "border-emerald-600 bg-emerald-50/70 ring-4 ring-emerald-500/15 shadow-sm"
                  : "border-slate-200 bg-slate-50/60 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Truck className={`w-5 h-5 ${paymentMethod === "cod" ? "text-emerald-600" : "text-slate-600"}`} />
                <span className="text-xs font-black text-slate-900">
                  {t.codTab}
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-600">
                {isMorocco ? (lang === "ar" ? "عند المعاينة" : "Upon Delivery") : "Morocco only"}
              </span>
            </button>
          </div>

          {/* TAB 1: CARTE BANCAIRE INTERACTIVE FORM */}
          {paymentMethod === "stripe" && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-orange-50/30 border-2 border-orange-200/80 space-y-4 animate-fadeIn">
              {/* Virtual Carte Bancaire Visual Mockup */}
              <div className="w-full max-w-sm mx-auto bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-700/60 relative overflow-hidden select-none">
                {/* Hologram Sheen */}
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-500/15 rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    {/* EMV Gold Chip */}
                    <div className="w-9 h-7 bg-gradient-to-br from-amber-200 via-amber-400 to-amber-500 rounded-md border border-amber-300 shadow-inner flex items-center justify-center relative">
                      <div className="w-5 h-3.5 border-t border-b border-amber-600/40 rounded-xs" />
                    </div>
                    {/* Contactless waves icon */}
                    <svg className="w-4 h-4 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8.5 16.5a5 5 0 0 1 0-7" strokeLinecap="round" />
                      <path d="M12 19a8.5 8.5 0 0 0 0-12" strokeLinecap="round" />
                      <path d="M15.5 21.5a12 12 0 0 0 0-17" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Card Brand Logo */}
                  <div className="flex items-center gap-1.5">
                    {detectedBrand === "visa" && (
                      <span className="font-black italic text-lg sm:text-xl tracking-wider text-white">VISA</span>
                    )}
                    {detectedBrand === "mastercard" && (
                      <div className="flex items-center -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-[#EB001B] opacity-90 shadow-xs" />
                        <div className="w-6 h-6 rounded-full bg-[#F79E1B] opacity-90 shadow-xs" />
                      </div>
                    )}
                    {detectedBrand === "amex" && (
                      <span className="font-black text-xs px-2 py-0.5 rounded bg-sky-500 text-white tracking-widest">AMEX</span>
                    )}
                    {detectedBrand === "unknown" && (
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-white/20 text-white">CB</span>
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-white/20 text-white">VISA</span>
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-white/20 text-white">MC</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Number */}
                <div className="mb-4 relative z-10">
                  <div className="font-mono text-base sm:text-lg font-bold tracking-widest text-slate-100 drop-shadow-sm">
                    {cardData.number || "•••• •••• •••• ••••"}
                  </div>
                </div>

                {/* Holder & Expiry */}
                <div className="flex items-end justify-between text-xs relative z-10">
                  <div className="truncate max-w-[190px]">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">
                      {lang === "ar" ? "صاحب البطاقة" : "Titulaire"}
                    </span>
                    <span className="font-bold tracking-wide uppercase text-slate-200 truncate block">
                      {cardData.holderName || (lang === "ar" ? "الاسم الكامل" : "NOM PRENOM")}
                    </span>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">
                      Expire
                    </span>
                    <span className="font-mono font-bold text-slate-200">
                      {cardData.expiry || "MM/YY"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Accepted Banks Reassurance Banner */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-bold flex items-center gap-2">
                <span className="text-base">💳</span>
                <span>{t.cardBanksNotice}</span>
              </div>

              {/* Card Inputs */}
              <div>
                <label htmlFor="card-holderName" className="block text-[11px] font-black text-slate-800 mb-1">
                  {t.cardHolderLabel}
                </label>
                <input
                  id="card-holderName"
                  type="text"
                  name="holderName"
                  value={cardData.holderName}
                  onChange={handleCardChange}
                  placeholder="NOM PRENOM DU TITULAIRE"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold uppercase bg-white focus:outline-none focus:ring-3 focus:ring-orange-500/20"
                />
                {cardErrors.holderName && (
                  <p className="mt-1 text-[11px] text-rose-600 font-bold">{cardErrors.holderName}</p>
                )}
              </div>

              <div>
                <label htmlFor="card-number" className="block text-[11px] font-black text-slate-800 mb-1">
                  {t.cardNumberLabel}
                </label>
                <div className="relative">
                  <input
                    id="card-number"
                    type="text"
                    inputMode="numeric"
                    name="number"
                    value={cardData.number}
                    onChange={handleCardChange}
                    placeholder="Numéro de carte bancaire (16 chiffres)"
                    dir="ltr"
                    maxLength={19}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold tracking-wider bg-white focus:outline-none focus:ring-3 focus:ring-orange-500/20"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                </div>
                {cardErrors.number && (
                  <p className="mt-1 text-[11px] text-rose-600 font-bold">{cardErrors.number}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="card-expiry" className="block text-[11px] font-black text-slate-800 mb-1">
                    {t.cardExpiryLabel}
                  </label>
                  <input
                    id="card-expiry"
                    type="text"
                    inputMode="numeric"
                    name="expiry"
                    value={cardData.expiry}
                    onChange={handleCardChange}
                    placeholder="MM/YY"
                    dir="ltr"
                    maxLength={5}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold text-center bg-white focus:outline-none focus:ring-3 focus:ring-orange-500/20"
                  />
                  {cardErrors.expiry && (
                    <p className="mt-1 text-[11px] text-rose-600 font-bold">{cardErrors.expiry}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="card-cvc" className="block text-[11px] font-black text-slate-800 mb-1">
                    {t.cardCvcLabel}
                  </label>
                  <input
                    id="card-cvc"
                    type="password"
                    inputMode="numeric"
                    name="cvc"
                    value={cardData.cvc}
                    onChange={handleCardChange}
                    placeholder="CVC / CVV"
                    dir="ltr"
                    maxLength={4}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold text-center bg-white focus:outline-none focus:ring-3 focus:ring-orange-500/20"
                  />
                  {cardErrors.cvc && (
                    <p className="mt-1 text-[11px] text-rose-600 font-bold">{cardErrors.cvc}</p>
                  )}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-slate-500 font-medium border-t border-slate-200">
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3D Secure 2.0 (Validation par code SMS bancaire)</span>
                </span>
                <span className="font-bold text-slate-600">Conforme PCI-DSS Level 1</span>
              </div>
            </div>
          )}

          {/* TAB 2: PAYPAL SMART BUTTONS */}
          {paymentMethod === "paypal" && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/70 to-slate-50 border-2 border-blue-200/80 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#0070BA] font-black text-lg italic">P</span>
                  <span className="text-xs font-black text-slate-900">
                    PayPal One-Click Checkout
                  </span>
                </div>
                <span className="text-[11px] text-blue-700 font-bold">
                  PayPal Buyer Protection
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {lang === "ar"
                  ? "ادفع بأمان عبر حساب PayPal أو بطاقتك البنكية أو الدفع بالتقسيط مع حماية المشتري الكاملة."
                  : "Pay safely with your PayPal balance, credit card, or 4 interest-free installments with 100% Buyer Protection."}
              </p>

              {/* PayPal Official SDK buttons */}
              {isMounted && (
                <div className="pt-2">
                  <PayPalScriptProvider
                    options={{
                      clientId: PAYMENT_CONFIG.paypalClientId,
                      currency: "USD",
                      intent: "capture",
                    }}
                  >
                    <PayPalButtons
                      style={{
                        layout: "vertical",
                        shape: "rect",
                        color: "gold",
                        label: "checkout",
                        height: 44,
                      }}
                      createOrder={(data, actions) => {
                        // Validate contact fields before opening PayPal
                        const validation = validateOrderForm(
                          {
                            fullName: formData.fullName,
                            email: formData.email,
                            phone: formData.phone,
                            address: formData.address,
                            city: formData.city,
                            country: selectedCountryCode,
                          },
                          lang
                        );

                        if (!validation.isValid) {
                          setErrors(validation.errors);
                          const firstKey = Object.keys(validation.errors)[0];
                          const el = document.getElementById(`field-${firstKey}`);
                          if (el) {
                            el.focus();
                            el.scrollIntoView({ behavior: "smooth", block: "center" });
                          }
                          return Promise.reject(new Error("Please complete customer information first"));
                        }

                        return actions.order.create({
                          intent: "CAPTURE",
                          purchase_units: [
                            {
                              amount: {
                                currency_code: "USD",
                                value: totalAmount.toFixed(2),
                              },
                              description: `${currentOffer.qty}x Medical Acupressure Insoles (${selectedColor} - ${selectedSize})`,
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        if (actions.order) {
                          const details = await actions.order.capture();
                          await processOrder("paypal", details);
                        } else {
                          await processOrder("paypal", { id: data.orderID });
                        }
                      }}
                      onError={(err) => {
                        console.error("PayPal Error:", err);
                        // Provide friendly fallback
                        setServerError(
                          lang === "ar"
                            ? "حدثت مشكلة أثناء تشغيل PayPal. يمكنك أيضاً الدفع مباشرة بالبطاقة البنكية."
                            : "PayPal connection issue. You can also complete your payment with Credit / Debit Card."
                        );
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CASH ON DELIVERY (MOROCCO ONLY) */}
          {paymentMethod === "cod" && (
            <div className="p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200/80 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-black">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>{lang === "ar" ? "الدفع عند الاستلام داخل المغرب" : "Cash on Delivery (Morocco)"}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {lang === "ar"
                  ? "لا تدفع أي سنتيم مسبقاً! سيتصل بك فريقنا لتأكيد موعد التوصيل، ويمكنك معاينة وفحص الطرد ثم الدفع نقداً للموزع."
                  : "No upfront payment required. Our delivery agent will bring the package to your door. You inspect the parcel and pay cash."}
              </p>
            </div>
          )}
        </div>

        {/* 6. LIVE ORDER RECAP */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-50/90 border-2 border-slate-200 space-y-2.5">
          <div className="flex justify-between items-center text-xs text-slate-600 font-bold">
            <span>{lang === "ar" ? "سعر العرض المختار :" : "Selected Offer Price :"}</span>
            <span className="font-black text-slate-900">
              {isMorocco ? `${offerPrice} DH` : `$${offerPrice.toFixed(2)}`}
            </span>
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
              {isMorocco
                ? (shippingFee === 0 ? t.shippingFreeCasa : t.shippingOther)
                : t.shippingWorldwideFree}
            </span>
          </div>

          <div className="border-t-2 border-dashed border-slate-300 pt-3 flex justify-between items-center">
            <div>
              <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight">
                {t.totalLabel}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>
                  {paymentMethod === "cod"
                    ? (lang === "ar" ? "الدفع نقداً بعد فحص الطرد" : "Pay cash after inspection")
                    : (lang === "ar" ? "دفع آمن ومحمي 100%" : "100% Protected Transaction")}
                </span>
              </span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-orange-600">
              {isMorocco ? `${totalAmount} DH` : `$${totalAmount.toFixed(2)}`}
            </span>
          </div>
        </div>

        {/* 7. MAIN CTA SUBMIT BUTTON (For Card and COD) */}
        {paymentMethod !== "paypal" && (
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
                <span>{lang === "ar" ? "جاري معالجة طلبكم بأمان..." : "Processing secure order..."}</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                <span>
                  {paymentMethod === "stripe"
                    ? (lang === "ar"
                        ? `دفع آمن بالبطاقة البنكية • ${isMorocco ? `${totalAmount} DH` : `$${totalAmount.toFixed(2)}`}`
                        : `Payer par Carte Bancaire • ${isMorocco ? `${totalAmount} DH` : `$${totalAmount.toFixed(2)}`}`)
                    : t.ctaButton}
                </span>
              </>
            )}
          </button>
        )}

        {/* 8. SECURITY & COMPLIANCE BADGES */}
        <div className="mt-5 pt-4 border-t border-slate-200/80 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.securityBadgeSSL}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.securityBadgePCI}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.securityBadgeGuarantee}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-bold text-center pt-1">
            <Lock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>{t.ctaSubtext}</span>
          </div>
        </div>
      </form>
    </section>
  );
};
