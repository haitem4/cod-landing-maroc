"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
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
            value: parsed.total || 49.99,
            currency: "EUR",
            order_id: parsed.id || orderId || "",
            num_items: parsed.qty || 1,
          });
        } catch (e) {}
      }
    }
  }, [orderId]);

  const isStripe = order?.paymentMethod === "stripe";
  const isPaypal = order?.paymentMethod === "paypal";

  const supportNumber = "33600000000";
  const waMessage = isArabic
    ? `السلام عليكم، قمت بتأكيد طلبي رقم #${orderId || ""} بخصوص فرشات التدليك والأكيوبريسور الطبية. المرجو تأكيد موعد وتتبع الشحنة.`
    : `Bonjour, j'ai passé la commande #${orderId || ""} pour les Semelles Orthopédiques Confort Pro. Merci de me confirmer le lien de suivi.`;
  const whatsappUrl = `https://wa.me/${supportNumber}?text=${encodeURIComponent(waMessage)}`;

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
            {isArabic ? "تم الدفع وتأكيد طلبكم بنجاح !" : "Paiement Validé & Commande Confirmée !"}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-2 leading-tight">
          {isArabic ? "شكراً جزيلاً على ثقتكم بنا" : "Merci pour votre commande !"}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-5 font-medium">
          {isArabic
            ? "لقد تم استلام دفعتكم بأمان وتأكيد الطلب. سنقوم بتجهيز شحنتكم وإرسالها في أقرب وقت مع رقم التتبع."
            : "Votre paiement a été traité avec succès et votre commande est validée. Notre équipe logistique prépare votre colis pour une expédition express."}
        </p>

        {/* Email Tracking Notification */}
        {order?.customer?.email && (
          <div className="mb-5 p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <span>
              {isArabic
                ? `تم إرسال إيصال الدفع ورابط التتبع إلى : ${order.customer.email}`
                : `Facture acquittée et lien de suivi expédiés à : ${order.customer.email}`}
            </span>
          </div>
        )}

        {/* Order ID Pill */}
        {orderId && (
          <div className="bg-slate-50 rounded-2xl py-2.5 px-4 inline-flex items-center gap-2 mb-6 border-2 border-slate-200">
            <span className="text-xs text-slate-500 font-bold">
              {isArabic ? "رقم الطلب : " : "Référence Commande : "}
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
              <span>{isArabic ? "ملخص وتفاصيل الطلب :" : "Récapitulatif de la Commande :"}</span>
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600 font-medium">
              <div className="flex justify-between items-center">
                <span>{isArabic ? "المنتج :" : "Produit :"}</span>
                <span className="font-black text-slate-900">
                  {isArabic ? "فرشات التدليك الطبية (Confort Pro Orthotics)" : "Semelles Orthopédiques Acupression Pro"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>{isArabic ? "الباقة :" : "Pack Sélectionné :"}</span>
                <span className="font-bold text-slate-800">{order.pack}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>{isArabic ? "اللون والمقاس :" : "Couleur & Pointure :"}</span>
                <span className="font-bold text-slate-800">{String(order.color).toUpperCase()} • {order.size}</span>
              </div>

              {/* Payment Method Badge */}
              <div className="flex justify-between items-center">
                <span>{isArabic ? "طريقة الدفع :" : "Moyen de Paiement :"}</span>
                <span className="font-black px-2.5 py-0.5 rounded-md text-xs bg-slate-200 text-slate-800 flex items-center gap-1.5">
                  {isPaypal ? (
                    <>
                      <span className="text-[#0070BA] font-black italic">P</span>
                      <span>PayPal (Protection Achats)</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                      <span>Carte Bancaire ({order.cardBrand || "Visa/MC/Amex"} {order.cardLast4 ? `•••• ${order.cardLast4}` : ""})</span>
                    </>
                  )}
                </span>
              </div>

              {/* Payment Status Badge */}
              <div className="flex justify-between items-center">
                <span>{isArabic ? "حالة الدفع :" : "Statut du Paiement :"}</span>
                <span className="font-black px-2.5 py-0.5 rounded-md text-xs bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {isArabic ? "🟢 مدفوع ومؤكد بنجاح" : "🟢 Payé & Vérifié (3D Secure)"}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between items-center">
                <span>{isArabic ? "مصاريف التوصيل :" : "Frais de Livraison :"}</span>
                <span className="font-black text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                  {isArabic ? "شحن مجاني في أوروبا ✈️ (0,00 €)" : "Gratuite en Europe ✈️ (0,00 €)"}
                </span>
              </div>

              {/* Customer Info */}
              <div className="flex justify-between items-center">
                <span>{isArabic ? "العميل والهاتف :" : "Destinataire :"}</span>
                <span className="font-bold text-slate-800">{order.customer?.fullName} ({order.customer?.phone})</span>
              </div>

              <div className="flex justify-between items-center">
                <span>{isArabic ? "وجهة التوصيل :" : "Adresse de Livraison :"}</span>
                <span className="font-bold text-slate-800">
                  {order.customer?.address ? `${order.customer.address}, ` : ""}{order.customer?.city}, {order.customer?.countryName || order.customer?.country || "France"}
                </span>
              </div>

              {/* Total */}
              <div className="border-t-2 border-dashed border-slate-300 pt-3 flex justify-between items-center text-sm font-black text-slate-900">
                <span>{isArabic ? "المبلغ الإجمالي المدفوع :" : "Montant Total Réglé :"}</span>
                <span className="text-emerald-700 text-lg font-black">
                  {Number(order.total || 49.99).toFixed(2).replace(".", ",")} €
                </span>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Support Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mb-5 py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
        >
          <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span>{isArabic ? "تواصل معنا عبر واتساب للمساعدة والتتبع" : "Contacter le Support Client sur WhatsApp"}</span>
        </a>

        {/* 3 Step Process */}
        <div className="grid grid-cols-3 gap-2 text-center mb-6 pt-1">
          <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/80 flex flex-col items-center">
            <CreditCard className="w-5 h-5 text-emerald-600 mb-1.5" />
            <span className="text-xs font-black text-slate-900">
              {isArabic ? "1. الدفع مؤكد" : "1. Paiement Validé"}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {isArabic ? "معاملة آمنة" : "100% Sécurisé"}
            </span>
          </div>

          <div className="bg-sky-50/70 p-3 rounded-2xl border border-sky-200/80 flex flex-col items-center">
            <Truck className="w-5 h-5 text-sky-600 mb-1.5" />
            <span className="text-xs font-black text-slate-900">
              {isArabic ? "2. إرسال الطرد" : "2. Expédition 24h"}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {isArabic ? "شحن سريع" : "Express Europe"}
            </span>
          </div>

          <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/80 flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-amber-600 mb-1.5" />
            <span className="text-xs font-black text-slate-900">
              {isArabic ? "3. الاستلام" : "3. Livraison"}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {isArabic ? "إلى باب منزلك" : "À votre domicile"}
            </span>
          </div>
        </div>

        {/* Return Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-extrabold transition-all"
        >
          {isArabic ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{isArabic ? "العودة إلى المتجر" : "Retour à la Boutique"}</span>
        </Link>
      </div>
    </div>
  );
}
