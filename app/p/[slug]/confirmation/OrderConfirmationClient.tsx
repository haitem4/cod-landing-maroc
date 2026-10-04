"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  PhoneCall,
  Truck,
  PackageCheck,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { OrderPayload } from "@/lib/types";

export function OrderConfirmationClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const orderId = searchParams.get("orderId");
  const slug = (params?.slug as string) || "produit-a";

  const [order, setOrder] = useState<OrderPayload | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("last_order");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setOrder(parsed);
        } catch (e) {
          console.error("Failed to parse order from session storage:", e);
        }
      }
    }
  }, []);

  const isArabic = slug === "produit-a" || order?.productSlug === "produit-a";
  const direction = isArabic ? "rtl" : "ltr";

  const whatsappNumber = "212600000000";
  const waMessage = isArabic
    ? `السلام عليكم، قمت بتأكيد طلبي رقم #${orderId || ""} بخصوص منتج ${order?.productTitle || ""}. المرجو تأكيد موعد التوصيل.`
    : `Bonjour, j'ai passé la commande #${orderId || ""} pour le produit ${order?.productTitle || ""}. Pouvez-vous me confirmer la date de livraison ?`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div
      dir={direction}
      className={`min-h-screen bg-slate-50 py-8 px-4 flex items-center justify-center ${
        isArabic ? "font-arabic" : "font-sans"
      }`}
    >
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounceSmall shadow-inner">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        {/* Title */}
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          {isArabic ? "تم تسجيل طلبك بنجاح !" : "Commande Confirmée avec Succès !"}
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-2">
          {isArabic ? "شكراً جزيلاً على ثقتكم بنا" : "Merci pour votre commande !"}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
          {isArabic
            ? "لقد تم استلام طلبك بنجاح. سيتصل بك مسؤول خدمة العملاء خلال ساعات قليلة لتأكيد العنوان وموعد التوصيل."
            : "Nous avons bien reçu votre demande. Notre équipe vous appellera dans les plus brefs délais pour confirmer l'adresse de livraison."}
        </p>

        {/* Order ID Badge */}
        {orderId && (
          <div className="bg-slate-100 rounded-xl py-2 px-4 inline-block mb-6 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">
              {isArabic ? "رقم الطلب : " : "N° de Commande : "}
            </span>
            <span className="text-xs font-bold text-slate-800 font-mono">
              {orderId}
            </span>
          </div>
        )}

        {/* Order Recap Box */}
        {order && (
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left mb-6" style={{ textAlign: isArabic ? "right" : "left" }}>
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2 border-b border-slate-200 pb-2">
              <PackageCheck className="w-4 h-4 text-emerald-600" />
              <span>{isArabic ? "تفاصيل طلبك :" : "Récapitulatif de la commande :"}</span>
            </h3>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{isArabic ? "المنتج :" : "Produit :"}</span>
                <span className="font-bold text-slate-800">{order.productTitle}</span>
              </div>
              <div className="flex justify-between">
                <span>{isArabic ? "العرض المختار :" : "Offre :"}</span>
                <span className="font-bold text-slate-800">{order.selectedOffer.label} ({order.selectedOffer.price} DH)</span>
              </div>
              <div className="flex justify-between">
                <span>{isArabic ? "مصاريف التوصيل :" : "Frais de livraison :"}</span>
                <span className="font-bold text-slate-800">
                  {order.shippingFee === 0
                    ? (isArabic ? "مجاني (الدار البيضاء)" : "Gratuit (Casablanca)")
                    : (isArabic ? "30 درهم (خارج الدار البيضاء)" : "30 DH (Hors Casablanca)")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{isArabic ? "الاسم :" : "Nom :"}</span>
                <span className="font-bold text-slate-800">{order.customer.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span>{isArabic ? "الهاتف :" : "Téléphone :"}</span>
                <span className="font-bold text-slate-800 font-mono" dir="ltr">{order.customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>{isArabic ? "المدينة والعنوان :" : "Ville & Adresse :"}</span>
                <span className="font-bold text-slate-800">{order.customer.city}, {order.customer.address}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-extrabold text-slate-900">
                <span>{isArabic ? "المبلغ النهائي للدفع عند الاستلام :" : "Total à payer à la livraison :"}</span>
                <span className="text-emerald-700 text-base">{order.total} DH</span>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Direct Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mb-4 py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-95"
        >
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span>{isArabic ? "تواصل معنا مباشرة عبر واتساب لمتابعة الطلب" : "Contacter sur WhatsApp pour le suivi"}</span>
        </a>

        {/* Next Steps */}
        <div className="grid grid-cols-3 gap-2 text-center mb-6 pt-2">
          <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 flex flex-col items-center">
            <PhoneCall className="w-5 h-5 text-emerald-600 mb-1" />
            <span className="text-[11px] font-bold text-slate-800">
              {isArabic ? "1. اتصال هاتفي" : "1. Appel"}
            </span>
            <span className="text-[10px] text-slate-500">
              {isArabic ? "لتأكيد العنوان" : "Confirmation"}
            </span>
          </div>

          <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 flex flex-col items-center">
            <Truck className="w-5 h-5 text-emerald-600 mb-1" />
            <span className="text-[11px] font-bold text-slate-800">
              {isArabic ? "2. إرسال الطرد" : "2. Expédition"}
            </span>
            <span className="text-[10px] text-slate-500">
              {isArabic ? "خلال 24-48 ساعة" : "24h - 48h"}
            </span>
          </div>

          <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
            <span className="text-[11px] font-bold text-slate-800">
              {isArabic ? "3. الدفع نقداً" : "3. Réception"}
            </span>
            <span className="text-[10px] text-slate-500">
              {isArabic ? "بعد المعاينة" : "Paiement cash"}
            </span>
          </div>
        </div>

        {/* Return Button */}
        <Link
          href={`/p/${slug}`}
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all"
        >
          {isArabic ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{isArabic ? "العودة إلى صفحة المنتج" : "Retour à la page produit"}</span>
        </Link>
      </div>
    </div>
  );
}
