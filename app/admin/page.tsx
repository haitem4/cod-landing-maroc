"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Palette,
  Plus,
  Trash2,
  ExternalLink,
  Save,
  CheckCircle2,
  Package,
  Sparkles,
  Phone,
  Layers,
  Download,
} from "lucide-react";
import { ProductConfig, OfferItem, BenefitItem, ReviewItem, FAQItem } from "@/lib/types";

// Palette Presets for Quick Selection
const COLOR_PRESETS = [
  { name: "Rouge Chaud (COD Express)", primary: "#dc2626", accent: "#f97316", background: "#ffffff", text: "#0f172a" },
  { name: "Bleu Pro & Tech", primary: "#0284c7", accent: "#0d9488", background: "#f8fafc", text: "#0f172a" },
  { name: "Vert Émeraude & Nature", primary: "#059669", accent: "#10b981", background: "#ffffff", text: "#064e3b" },
  { name: "Orange Énergie & Vente", primary: "#ea580c", accent: "#f59e0b", background: "#fffbeb", text: "#1c1917" },
  { name: "Violet Luxe & Beauté", primary: "#7c3aed", accent: "#db2777", background: "#faf5ff", text: "#1e1b4b" },
  { name: "Noir & Or Premium", primary: "#d97706", accent: "#b45309", background: "#0f172a", text: "#ffffff" },
];

const DEFAULT_DEMO_PRODUCTS: ProductConfig[] = [
  {
    slug: "produit-a",
    lang: "ar",
    theme: { primary: "#dc2626", accent: "#f97316", background: "#ffffff", text: "#0f172a" },
    title: "مفرمة اللحم والخضار الكهربائية 4 في 1 الفولاذية الأصلية",
    subtitle: "وفري 80% من وقتك في المطبخ! فرم اللحوم، تقطيع الخضار، طحن المكسرات وإعداد الصلصات.",
    heroImage: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80"],
    offers: [
      { qty: 1, price: 249, originalPrice: 399, label: "قطعة واحدة (عرض التجربة)", badge: "توفير 150 درهم", default: false },
      { qty: 2, price: 399, originalPrice: 798, label: "قطعتين (عرض العائلة)", badge: "⭐ الأكثر طلباً", default: true }
    ],
    currency: "درهم",
    trustBadges: ["الدفع عند الاستلام", "توصيل مجاني بكازا (30 درهم باقي المدن)"],
    problem: { title: "المعاناة مع التقطيع اليدوي", points: ["ضياع الوقت", "جروح اليدين"] },
    benefits: [{ icon: "Zap", title: "قوة 1000 واط", text: "فرم فوري وسريع" }],
    reviews: [{ name: "فاطمة الزهراء", city: "الدار البيضاء", rating: 5, text: "ممتازة جداً" }],
    faq: [{ q: "كيف يتم الدفع؟", a: "نقداً عند الاستلام" }],
    cities: ["الدار البيضاء", "الرباط", "مراكش", "طنجة"]
  },
  {
    slug: "produit-b",
    lang: "fr",
    theme: { primary: "#0284c7", accent: "#0d9488", background: "#f8fafc", text: "#0f172a" },
    title: "Nettoyeur Haute Pression Sans Fil Pro 48V Max",
    subtitle: "Lavez votre voiture, terrasse, tapis et façades sans prise électrique ni tuyau encombrant.",
    heroImage: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&auto=format&fit=crop&q=80"],
    offers: [
      { qty: 1, price: 349, originalPrice: 599, label: "Pack Solo (1 Batterie)", badge: "Économie 250 DH", default: false },
      { qty: 2, price: 549, originalPrice: 1098, label: "Pack Pro (2 Batteries)", badge: "⭐ Meilleur Choix", default: true }
    ],
    currency: "DH",
    trustBadges: ["Paiement à la livraison", "Livraison Gratuite à Casa (30 DH Hors Casa)"],
    problem: { title: "Tuyaux lourds et lavages chers", points: ["Gaspillage d'eau", "Perte de temps"] },
    benefits: [{ icon: "Gauge", title: "Pression 45 Bars", text: "Nettoyage ultra puissant" }],
    reviews: [{ name: "Karim Benani", city: "Casablanca", rating: 5, text: "Super pression !" }],
    faq: [{ q: "Comment payer ?", a: "En espèces à la livraison" }],
    cities: ["Casablanca", "Rabat", "Marrakech", "Tanger"]
  }
];

export default function AdminPage() {
  const [products, setProducts] = useState<ProductConfig[]>(DEFAULT_DEMO_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"list" | "create">("create");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [downloadJson, setDownloadJson] = useState<{ slug: string; data: string } | null>(null);

  // Form State
  const [slug, setSlug] = useState("");
  const [lang, setLang] = useState<"ar" | "fr">("ar");
  const [theme, setTheme] = useState({
    primary: "#dc2626",
    accent: "#f97316",
    background: "#ffffff",
    text: "#0f172a",
  });
  const [logoText, setLogoText] = useState("متجر النخبة المغربي");
  const [badgeHeader, setBadgeHeader] = useState("🔥 توصيل بالمجان في كازا (30 درهم لباقي المدن) - الدفع عند الاستلام");
  const [whatsappNumber, setWhatsappNumber] = useState("0600000000");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [heroImage, setHeroImage] = useState("https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80");
  const [gallery, setGallery] = useState<string[]>([
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80",
  ]);
  const [videoOrGif, setVideoOrGif] = useState("");
  const [pixelId, setPixelId] = useState("");

  // Problem / Solution
  const [problemTitle, setProblemTitle] = useState("هل تعاني من المشاكل التالية مع الطرق التقليدية؟");
  const [problemPoints, setProblemPoints] = useState<string[]>([
    "ضياع الوقت والجهد بدون نتائج مرضية",
    "المنتجات المقلدة التي تتعطل بسرعة",
  ]);
  const [solutionTitle, setSolutionTitle] = useState("الحل المثالي والنهائي مع منتجنا الأصلي !");
  const [solutionPoints, setSolutionPoints] = useState<string[]>([
    "جودة أصلية 100% تدوم طويلاً",
    "سهولة تامة في الاستخدام ونتائج فورية",
  ]);

  // Benefits
  const [benefits, setBenefits] = useState<BenefitItem[]>([
    { icon: "Zap", title: "قوة وسرعة استثنائية", text: "أداء عالي يوفر عليك الكثير من الوقت والجهد يومياً." },
    { icon: "ShieldCheck", title: "جودة أصلية ومضمونة", text: "مصنوع من مواد ممتازة مقاومة للاستخدام المكثف." },
  ]);

  // Offers
  const [offers, setOffers] = useState<OfferItem[]>([
    { qty: 1, price: 199, originalPrice: 299, label: "قطعة واحدة (عرض التجربة)", badge: "توفير 100 درهم", default: false },
    { qty: 2, price: 349, originalPrice: 598, label: "قطعتين (عرض العائلة المفضل)", badge: "⭐ الأكثر طلباً", default: true },
  ]);

  // Reviews
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      name: "فاطمة الزهراء",
      city: "الدار البيضاء",
      rating: 5,
      text: "منتج رائع جداً والتوصيل كان سريعاً في أقل من 24 ساعة. شكراً جزيلاً لكم!",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
  ]);

  // FAQ
  const [faq, setFaq] = useState<FAQItem[]>([
    {
      q: "كيف تتم عملية الشراء والدفع؟",
      a: "تقوم فقط بملء الاستمارة وسنتصل بك لتأكيد طلبك. الدفع نقداً عند استلام ومعاينة المنتج.",
    },
    {
      q: "كم هي مصاريف ومدة التوصيل؟",
      a: "التوصيل مجاني في الدار البيضاء و30 درهم لباقي المدن. يستغرق التوصيل بين 24 إلى 48 ساعة فقط.",
    },
  ]);

  // Fetch existing products
  const loadProducts = async () => {
    try {
      setLoading(true);
      // Check localStorage first
      let localProducts: ProductConfig[] = [];
      if (typeof window !== "undefined") {
        try {
          localProducts = JSON.parse(localStorage.getItem("cod_custom_products") || "[]");
        } catch (e) {}
      }

      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.products) {
            setProducts([...data.products, ...localProducts.filter(lp => !data.products.some((dp: any) => dp.slug === lp.slug))]);
            return;
          }
        }
      } catch (err) {
        // Fallback for static GitHub Pages
      }

      setProducts([...DEFAULT_DEMO_PRODUCTS, ...localProducts]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const applyPreset = (preset: typeof COLOR_PRESETS[0]) => {
    setTheme({
      primary: preset.primary,
      accent: preset.accent,
      background: preset.background,
      text: preset.text,
    });
  };

  const addGalleryImage = () => setGallery([...gallery, ""]);
  const updateGalleryImage = (idx: number, val: string) => {
    const updated = [...gallery];
    updated[idx] = val;
    setGallery(updated);
  };
  const removeGalleryImage = (idx: number) => setGallery(gallery.filter((_, i) => i !== idx));

  const addOffer = () => {
    setOffers([
      ...offers,
      { qty: offers.length + 1, price: 199 * (offers.length + 1) - 50, label: `${offers.length + 1} قطع`, default: false },
    ]);
  };
  const removeOffer = (idx: number) => setOffers(offers.filter((_, i) => i !== idx));

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    setDownloadJson(null);

    try {
      const sanitizedSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, "-");
      const payload: ProductConfig = {
        slug: sanitizedSlug,
        lang,
        theme,
        logoText,
        badgeHeader,
        whatsappNumber,
        title,
        subtitle,
        heroImage: heroImage || gallery[0],
        gallery: gallery.filter((g) => g.trim().length > 0),
        videoOrGif: videoOrGif || undefined,
        pixelId: pixelId || undefined,
        problem: {
          title: problemTitle,
          points: problemPoints.filter((p) => p.trim().length > 0),
          solutionTitle,
          solutionPoints: solutionPoints.filter((p) => p.trim().length > 0),
        },
        benefits,
        offers,
        currency: lang === "ar" ? "درهم" : "DH",
        trustBadges:
          lang === "ar"
            ? ["الدفع عند الاستلام بعد المعاينة", "توصيل مجاني بكازا (30 درهم باقي المدن)", "ضمان استبدال 7 أيام", "منتج أصلي 100%"]
            : ["Paiement à la livraison après vérification", "Livraison Gratuite à Casa (30 DH Hors Casa)", "Garantie satisfait 7 jours", "Produit 100% Authentique"],
        reviews,
        faq,
        cities:
          lang === "ar"
            ? ["الدار البيضاء", "الرباط", "مراكش", "طنجة", "فاس", "أكادير", "مكناس", "وجدة", "القنيطرة", "تطوان", "تمارة", "سلا", "مدينة أخرى"]
            : ["Casablanca", "Rabat", "Marrakech", "Tanger", "Fès", "Agadir", "Meknès", "Oujda", "Kénitra", "Tétouan", "Salé", "Autre ville"],
      };

      // Try saving to server API if available
      try {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setSuccessMessage(payload.slug);
            loadProducts();
            setSaving(false);
            return;
          }
        }
      } catch (apiErr) {
        // Fallback for static mode
      }

      // Save locally in localStorage for static deployment
      if (typeof window !== "undefined") {
        try {
          const existing: ProductConfig[] = JSON.parse(localStorage.getItem("cod_custom_products") || "[]");
          const filtered = existing.filter((p) => p.slug !== payload.slug);
          filtered.unshift(payload);
          localStorage.setItem("cod_custom_products", JSON.stringify(filtered));
        } catch (e) {}
      }

      setDownloadJson({ slug: sanitizedSlug, data: JSON.stringify(payload, null, 2) });
      setSuccessMessage(payload.slug);
      loadProducts();
    } catch (err: any) {
      setErrorMessage(err.message || "Erreur interne");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (productSlug: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la landing page "${productSlug}" ?`)) return;

    try {
      if (typeof window !== "undefined") {
        const existing: ProductConfig[] = JSON.parse(localStorage.getItem("cod_custom_products") || "[]");
        const filtered = existing.filter((p) => p.slug !== productSlug);
        localStorage.setItem("cod_custom_products", JSON.stringify(filtered));
      }
      await fetch(`/api/products?slug=${productSlug}`, { method: "DELETE" }).catch(() => {});
      loadProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const triggerDownload = (fileName: string, jsonContent: string) => {
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Back-Office E-commerce COD Maroc</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Gestionnaire de Landing Pages
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Créez un nouveau produit, choisissez vos couleurs et configurez votre WhatsApp de contact.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveTab("create")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "create"
                  ? "bg-rose-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter un Produit</span>
            </button>
            <button
              onClick={() => setActiveTab("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "list"
                  ? "bg-rose-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Voir les Pages ({products.length})</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex flex-wrap items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">Configuration générée avec succès !</p>
                <p className="text-xs text-emerald-300/80">Page : /p/{successMessage}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {downloadJson && (
                <button
                  type="button"
                  onClick={() => triggerDownload(downloadJson.slug, downloadJson.data)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 shadow"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Télécharger {downloadJson.slug}.json</span>
                </button>
              )}
              <Link
                href={`/p/${successMessage}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition-all"
              >
                <span>Voir la Démo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            {errorMessage}
          </div>
        )}

        {/* TAB 1: PRODUCT CREATION FORM */}
        {activeTab === "create" && (
          <form onSubmit={handleSaveProduct} className="space-y-8">
            {/* 1. THEME & COLOR PICKER */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
                <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Personnalisation des Couleurs & Thème</h2>
                  <p className="text-xs text-slate-400">Sélectionnez une palette ou choisissez vos couleurs précises.</p>
                </div>
              </div>

              {/* Presets */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Palettes Prédéfinies (1-Clic) :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {COLOR_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applyPreset(p)}
                      className="p-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-left transition-all group"
                    >
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-4 h-4 rounded-full shadow" style={{ backgroundColor: p.primary }} />
                        <div className="w-3 h-3 rounded-full shadow" style={{ backgroundColor: p.accent }} />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white block leading-tight">
                        {p.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Couleur Primaire (Boutons, Prix)</label>
                  <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-700">
                    <input
                      type="color"
                      value={theme.primary}
                      onChange={(e) => setTheme({ ...theme, primary: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={theme.primary}
                      onChange={(e) => setTheme({ ...theme, primary: e.target.value })}
                      className="bg-transparent text-xs font-mono text-white focus:outline-none w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Couleur Accent (Badges, Éléments)</label>
                  <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-700">
                    <input
                      type="color"
                      value={theme.accent}
                      onChange={(e) => setTheme({ ...theme, accent: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={theme.accent}
                      onChange={(e) => setTheme({ ...theme, accent: e.target.value })}
                      className="bg-transparent text-xs font-mono text-white focus:outline-none w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Couleur de Fond (Page)</label>
                  <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-700">
                    <input
                      type="color"
                      value={theme.background}
                      onChange={(e) => setTheme({ ...theme, background: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={theme.background}
                      onChange={(e) => setTheme({ ...theme, background: e.target.value })}
                      className="bg-transparent text-xs font-mono text-white focus:outline-none w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Couleur du Texte</label>
                  <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-700">
                    <input
                      type="color"
                      value={theme.text}
                      onChange={(e) => setTheme({ ...theme, text: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={theme.text}
                      onChange={(e) => setTheme({ ...theme, text: e.target.value })}
                      className="bg-transparent text-xs font-mono text-white focus:outline-none w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. GENERAL INFO SECTION & WHATSAPP */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
                <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Informations Générales & WhatsApp</h2>
                  <p className="text-xs text-slate-400">URL, Titres, Numéro WhatsApp et Pixel Facebook.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Slug de la page (URL : /p/[slug]) *
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="ex: hachoir-pro-maroc"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Langue & Direction</label>
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as "ar" | "fr")}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="ar">Arabe (العربية - RTL)</option>
                    <option value="fr">Français (LTR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#25D366] mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Numéro WhatsApp de Contact *</span>
                  </label>
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="ex: 0612345678 ou 212612345678"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-emerald-600/40 text-sm text-white focus:outline-none focus:border-[#25D366] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">ID Facebook Pixel</label>
                  <input
                    type="text"
                    value={pixelId}
                    onChange={(e) => setPixelId(e.target.value)}
                    placeholder="ex: 987654321098765"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-500 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">Titre du Produit *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="ex: مفرمة اللحم والخضار الكهربائية 4 في 1 الأصلية"
                    dir={lang === "ar" ? "rtl" : "ltr"}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-500 font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">Sous-titre / Description Courte</label>
                  <textarea
                    rows={2}
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="ex: وفري 80% من وقتك في المطبخ مع المحرك الجبار 1000 واط..."
                    dir={lang === "ar" ? "rtl" : "ltr"}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
            </div>

            {/* 3. MEDIA & GALLERY */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-400" />
                  <span>Galerie Photos & Démo</span>
                </h2>
                <button
                  type="button"
                  onClick={addGalleryImage}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter une image</span>
                </button>
              </div>

              <div className="space-y-3">
                {gallery.map((img, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="url"
                      value={img}
                      onChange={(e) => updateGalleryImage(idx, e.target.value)}
                      placeholder={`URL de l'image ${idx + 1}`}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                    />
                    {gallery.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="p-2.5 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 4. OFFERS BUILDER */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">Offres & Prix (Packs)</h2>
                  <p className="text-xs text-slate-400">1pc, 2pcs, 3pcs avec prix barrés.</p>
                </div>
                <button
                  type="button"
                  onClick={addOffer}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter une offre</span>
                </button>
              </div>

              <div className="space-y-3">
                {offers.map((offer, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-700 grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Quantité</label>
                      <input
                        type="number"
                        min="1"
                        value={offer.qty}
                        onChange={(e) => {
                          const updated = [...offers];
                          updated[idx].qty = Number(e.target.value);
                          setOffers(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Prix (DH)</label>
                      <input
                        type="number"
                        value={offer.price}
                        onChange={(e) => {
                          const updated = [...offers];
                          updated[idx].price = Number(e.target.value);
                          setOffers(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white font-bold text-rose-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Libellé du Pack</label>
                      <input
                        type="text"
                        value={offer.label}
                        onChange={(e) => {
                          const updated = [...offers];
                          updated[idx].label = e.target.value;
                          setOffers(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2">
                      <label className="flex items-center gap-1 text-[11px] text-slate-300 cursor-pointer">
                        <input
                          type="radio"
                          name="defaultOffer"
                          checked={offer.default || false}
                          onChange={() => {
                            const updated = offers.map((o, i) => ({ ...o, default: i === idx }));
                            setOffers(updated);
                          }}
                        />
                        <span>Par défaut</span>
                      </label>

                      {offers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeOffer(idx)}
                          className="p-2 rounded-lg text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SAVE BUTTON */}
            <div className="sticky bottom-4 z-30 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-2xl flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Prêt à publier votre landing page ?
              </span>
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white font-extrabold text-sm shadow-xl flex items-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Génération en cours..." : "Générer la Landing Page"}</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: PRODUCT LIST */}
        {activeTab === "list" && (
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-4">
              <Package className="w-5 h-5 text-rose-400" />
              <span>Toutes les Landing Pages Actives ({products.length})</span>
            </h2>

            {loading ? (
              <p className="text-sm text-slate-400">Chargement des produits...</p>
            ) : products.length === 0 ? (
              <p className="text-sm text-slate-400">Aucun produit configuré.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div
                    key={p.slug}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-700 flex flex-col justify-between space-y-4 hover:border-slate-500 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {p.lang === "ar" ? "العربية (RTL)" : "Français (LTR)"}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: p.theme.primary }} />
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.theme.accent }} />
                        </div>
                      </div>

                      <h3 className="font-extrabold text-white text-base line-clamp-1">{p.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.subtitle}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                      <span className="text-xs font-mono text-slate-500">/p/{p.slug}</span>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/p/${p.slug}`}
                          target="_blank"
                          className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1 shadow"
                        >
                          <span>Voir la page</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(p.slug)}
                          className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
