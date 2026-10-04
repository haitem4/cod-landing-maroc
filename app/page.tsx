import React from "react";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  PlusCircle,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

export default function HomePage() {
  const products = getAllProducts();

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Top bar with Admin shortcut */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center font-bold text-white shadow">
              C
            </div>
            <span className="font-extrabold text-sm text-white tracking-wider">COD PLATFORM MAROC</span>
          </div>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white text-xs font-extrabold shadow-lg shadow-rose-600/20 transition-all transform active:scale-95"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Panneau Admin & Création</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plateforme Landing Pages COD Maroc 100% Modulaire</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Générateur de Landing Pages COD
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Un template unique, réutilisable à l'infini, ultra-optimisé pour les conversions sur mobile (Facebook / Instagram Ads) et le paiement à la livraison au Maroc.
          </p>
        </div>

        {/* Live Demo Products Showcase */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-rose-400" />
              <span>Landing Pages en ligne ({products.length}) :</span>
            </h2>

            <Link
              href="/admin"
              className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <span>+ Créer un nouveau produit</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => {
              const isArabic = product.lang === "ar";
              return (
                <div
                  key={product.slug}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-500 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          isArabic
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            : "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                        }`}
                      >
                        {isArabic ? "العربية (RTL)" : "Français (LTR)"}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        /p/{product.slug}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-white group-hover:text-rose-400 transition-colors">
                      {product.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>

                    <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {product.offers.length} Offres
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Paiement COD
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-700/60">
                    <Link
                      href={`/p/${product.slug}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white font-bold text-sm shadow-lg shadow-rose-600/20 transition-all transform active:scale-95"
                    >
                      <span>Ouvrir la Landing Page ({product.slug})</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How it works info card */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 md:p-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-400" />
            <span>Vous voulez ajouter un produit ou personnaliser les couleurs ?</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Rendez-vous directement sur la page admin <Link href="/admin" className="text-rose-400 font-bold underline">/admin</Link> pour configurer vos textes, vos packs de prix, et choisir vos couleurs avec aperçu direct en temps réel !
          </p>
        </div>
      </div>
    </main>
  );
}
