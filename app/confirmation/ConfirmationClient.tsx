"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  PhoneCall,
  Truck,
  PackageCheck,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CreditCard,
  Mail,
  MapPin,
  Lock,
} from "lucide-react";
import { Lang } from "@/lib/content";
import { event as trackFbEvent } from "@/lib/fpixel";

export function ConfirmationClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const langParam = searchParams.get("lang") as Lang | null;
  const lang: Lang = langParam === "en" ? "en" : "ar";

  const isArabic = lang === "ar";
  const direction = isArabic ? "rtl" : "ltr";

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("stepprs_last_order");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setOrder(parsed);
          trackFbEvent("Purchase", {
            content_name: "Confort Pro Insoles",
            content_type: "product",
            value: parsed.total || (parsed.currency === "DH" ? 299 : 49.99),
            currency: parsed.currency === "DH" ? "MAD" : "USD",
            order_id: parsed.id || orderId || "",
            num_items: parsed.qty || 1,
          });
        } catch (e) {}
      }
    }
  }, [orderId]);

  const isPaid = order?.paymentStatus === "paid" || order?.paymentMethod === "stripe" || order?.paymentMethod === "paypal";
  const isStripe = order?.paymentMethod === "stripe";
  const isPaypal = order?.paymentMethod === "paypal";

  const whatsappNumber = "212600000000";
  const waMessage = isArabic
    ? `السلام عليكم، قمت بتأكيد طلبي رقم #${orderId || ""} بخصوص فرشات التدليك والأكيوبريسور الطبية. المرجو تأكيد موعد وتتبع الشحنة.`
    : `Hello, I placed order #${orderId || ""} for the Medical Acupressure Massage Insoles. Please confirm the delivery & tracking status.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div
      dir={direction}
      className={`min-h-screen bg-slate-100/70 py-8 px-4 flex items-center justify-center ${
        isArabic ? "font-arabic" : "font-sans"
      }`}
    >
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Top Celebration Glow */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500" />

        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-bounceSmall shadow-lg shadow-emerald-500/10 border-2 border-emerald-200">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1.5 rounded-full border border-emerald-300 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            {isPaid
              ? (isArabic ? "تم الدفع وتأكيد طلبكم بنجاح !" : "Payment & Order Confirmed !")
              : (isArabic ? "تم تسجيل طلبكم بنجاح !" : "Order Confirmed Successfully !")}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-2 leading-tight">
          {isArabic ? "شكراً جزيلاً على ثقتكم بنا" : "Thank you for your order !"}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-5 font-medium">
          {isPaid
            ? (isArabic
                ? "لقد تم استلام دفعتكم بأمان وتأكيد الطلب. سنقوم بتجهيز شحنتكم وإرسالها في أقرب وقت."
                : "Your payment was processed securely and your order is confirmed. Our warehouse team is preparing your package for express dispatch.")
            : (isArabic
                ? "لقد تم استلام طلبك بنجاح. سيتصل بك فريق خدمة العملاء لتأكيد موعد التوصيل وعنوانك."
                : "We have safely received your order. Our team will verify your details and dispatch your package promptly.")}
        </p>

        {/* Email Tracking Notification */}
        {order?.customer?.email && (
          <div className="mb-5 p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <span>
              {isArabic
                ? `تم إرسال إيصال الدفع ورابط التتبع إلى : ${order.customer.email}`
                : `Order invoice & tracking updates sent to : ${order.customer.email}`}
            </span>
          </div>
        )}

        {/* Order ID Pill */}
        {orderId && (
          <div className="bg-slate-50 rounded-2xl py-2.5 px-4 inline-flex items-center gap-2 mb-6 border-2 border-slate-200">
            <span className="text-xs text-slate-500 font-bold">
              {isArabic ? "رقم الطلب : " : "Order Reference : "}
            </span>
            <span className="text-xs font-black text-slate-900 font-mono tracking-wider bg-slate-200 px-2.5 py-0.5 rounded-md">
              {orderId}
            </span>
          </div>
        )}

        {/* Order Recap */}
        {order && (
          <div className="bg-slate-50/90 rounded-3xl p-5 border-2 border-slate-200 text-left mb-6" style={{ textAlign: isArabic ? "right" : "left" }}>
            <h3 className="font-extrabold text-slate-900 text-sm mb-3 flex items-center gap-2 border-b border-slate-200 pb-2">
              <PackageCheck className="w-4 h-4 text-emerald-600" />
              <span>{isArabic ? "تفاصيل وملخص طلبك :" : "Order Summary :"}</span>
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600 font-medium">
              <div className="flex justify-between items-center">
                <span>{isArabic ? "المنتج :" : "Product :"}</span>
                <span className="font-black text-slate-900">
                  {isArabic ? "فرشات التدليك الطبية (Confort Pro Orthotics)" : "Medical Acupressure Insoles (Confort Pro)"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>{isArabic ? "الباقة :" : "Pack :"}</span>
                <span className="font-bold text-slate-800">{order.pack}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>{isArabic ? "اللون والمقاس :" : "Color & Size :"}</span>
                <span className="font-bold text-slate-800">{String(order.color).toUpperCase()} • {order.size}</span>
              </div>

              {/* Payment Method Badge */}
              <div className="flex justify-between items-center">
                <span>{isArabic ? "طريقة الدفع :" : "Payment Method :"}</span>
                <span className="font-black px-2.5 py-0.5 rounded-md text-xs bg-slate-200 text-slate-800 flex items-center gap-1.5">
                  {isStripe && (
                    <>
                      <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                      <span>{order.cardBrand || "Card"} {order.cardLast4 ? `•••• ${order.cardLast4}` : "(Stripe)"}</span>
                    </>
                  )}
                  {isPaypal && (
                    <>
                      <span className="text-[#0070BA] font-black italic">P</span>
                      <span>PayPal</span>
                    </>
                  )}
                  {!isStripe && !isPaypal && (
                    <>
                      <Truck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isArabic ? "الدفع عند الاستلام (COD)" : "Cash on Delivery (COD)"}</span>
                    </>
                  )}
                </span>
              </div>

              {/* Payment Status Badge */}
              <div className="flex justify-between items-center">
                <span>{isArabic ? "حالة الدفع :" : "Payment Status :"}</span>
                <span className={`font-black px-2.5 py-0.5 rounded-md text-xs ${
                  isPaid ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-amber-100 text-amber-800 border border-amber-300"
                }`}>
                  {isPaid
                    ? (isArabic ? "🟢 تم الدفع بنجاح" : "🟢 Paid & Verified")
                    : (isArabic ? "🟡 في انتظار الدفع عند الاستلام" : "🟡 Pending Cash On Delivery")}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between items-center">
                <span>{isArabic ? "مصاريف التوصيل :" : "Shipping :"}</span>
                <span className="font-black text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                  {order.shippingFee === 0
                    ? (isArabic ? "شحن مجاني 🎉" : "FREE Express Shipping 🎉")
                    : (isArabic ? "30 درهم" : "30 DH")}
                </span>
              </div>

              {/* Customer Info */}
              <div className="flex justify-between items-center">
                <span>{isArabic ? "الاسم والهاتف :" : "Customer :"}</span>
                <span className="font-bold text-slate-800">{order.customer?.fullName} ({order.customer?.phone})</span>
              </div>

              <div className="flex justify-between items-center">
                <span>{isArabic ? "وجهة التوصيل :" : "Destination :"}</span>
                <span className="font-bold text-slate-800">
                  {order.customer?.city}, {order.customer?.countryName || order.customer?.country || "Morocco"}
                </span>
              </div>

              {/* Total */}
              <div className="border-t-2 border-dashed border-slate-300 pt-3 flex justify-between items-center text-sm font-black text-slate-900">
                <span>
                  {isPaid
                    ? (isArabic ? "المبلغ المدفوع :" : "Total Paid :")
                    : (isArabic ? "المبلغ النهائي للدفع عند الاستلام :" : "Total Net to Pay Upon Delivery (COD) :")}
                </span>
                <span className="text-emerald-700 text-lg font-black">
                  {order.currency === "USD" ? `$${Number(order.total).toFixed(2)} USD` : `${order.total} DH`}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Direct Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mb-5 py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
        >
          <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span>{isArabic ? "تواصل معنا عبر واتساب لتتبع الشحنة" : "Track Order Status on WhatsApp"}</span>
        </a>

        {/* 3 Step Process */}
        <div className="grid grid-cols-3 gap-2 text-center mb-6 pt-1">
          <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/80 flex flex-col items-center">
            {isPaid ? <CreditCard className="w-5 h-5 text-emerald-600 mb-1.5" /> : <PhoneCall className="w-5 h-5 text-emerald-600 mb-1.5" />}
            <span className="text-xs font-black text-slate-900">
              {isPaid
                ? (isArabic ? "1. الدفع مؤكد" : "1. Verified")
                : (isArabic ? "1. اتصال هاتفي" : "1. Phone Call")}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {isPaid
                ? (isArabic ? "معاملة آمنة" : "100% Secured")
                : (isArabic ? "لتأكيد العنوان" : "Address confirm")}
            </span>
          </div>

          <div className="bg-sky-50/70 p-3 rounded-2xl border border-sky-200/80 flex flex-col items-center">
            <Truck className="w-5 h-5 text-sky-600 mb-1.5" />
            <span className="text-xs font-black text-slate-900">
              {isArabic ? "2. إرسال الطرد" : "2. Dispatch"}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {isArabic ? "شحن سريع" : "Express shipping"}
            </span>
          </div>

          <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/80 flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-amber-600 mb-1.5" />
            <span className="text-xs font-black text-slate-900">
              {isArabic ? "3. الاستلام" : "3. Delivery"}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {isPaid
                ? (isArabic ? "إلى باب منزلك" : "To your door")
                : (isArabic ? "الدفع عند الاستلام" : "Pay at door")}
            </span>
          </div>
        </div>

        {/* Return Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-extrabold transition-all"
        >
          {isArabic ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{isArabic ? "العودة إلى الصفحة الرئيسية" : "Back to Home Page"}</span>
        </Link>
      </div>
    </div>
  );
}
