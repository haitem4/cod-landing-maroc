"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Package,
  Search,
  Filter,
  Download,
  Plus,
  RefreshCw,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  RotateCcw,
  TrendingUp,
  DollarSign,
  ArrowLeft,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  Eye,
  X,
  FileSpreadsheet,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface OrderItem {
  id: string;
  createdAt: string;
  product: string;
  color: string;
  size: string;
  pack: string;
  qty: number;
  unitPrice: number;
  shippingFee: number;
  total: number;
  currency: string;
  status: string;
  paymentMethod?: string;
  paymentStatus?: string;
  transactionId?: string;
  cardBrand?: string;
  cardLast4?: string;
  notes?: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    country?: string;
    countryName?: string;
    city: string;
    address: string;
    postalCode?: string;
  };
}

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; border: string; dot: string; lightBg: string }
> = {
  "🟡 Nouveau": {
    label: "Nouveau",
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
    dot: "bg-amber-500",
    lightBg: "bg-amber-500/10",
  },
  "📞 Contacté": {
    label: "Contacté",
    bg: "bg-orange-50",
    text: "text-orange-800",
    border: "border-orange-200",
    dot: "bg-orange-500",
    lightBg: "bg-orange-500/10",
  },
  "🔵 Confirmé": {
    label: "Confirmé",
    bg: "bg-blue-50",
    text: "text-blue-800",
    border: "border-blue-200",
    dot: "bg-blue-500",
    lightBg: "bg-blue-500/10",
  },
  "🚚 En cours d'expédition": {
    label: "En expédition",
    bg: "bg-indigo-50",
    text: "text-indigo-800",
    border: "border-indigo-200",
    dot: "bg-indigo-500",
    lightBg: "bg-indigo-500/10",
  },
  "🟢 Livré / Payé": {
    label: "Livré / Payé",
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    lightBg: "bg-emerald-500/10",
  },
  "🔴 Annulé": {
    label: "Annulé",
    bg: "bg-rose-50",
    text: "text-rose-800",
    border: "border-rose-200",
    dot: "bg-rose-500",
    lightBg: "bg-rose-500/10",
  },
  "🔁 Retour": {
    label: "Retour",
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
    dot: "bg-slate-500",
    lightBg: "bg-slate-500/10",
  },
};

const STATUS_KEYS = Object.keys(STATUS_CONFIG);

const INITIAL_DEMO_ORDERS: OrderItem[] = [
  {
    id: "EUR-8491",
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    product: "Semelles Orthopédiques Acupression Pro",
    color: "orange",
    size: "EU 41-42",
    pack: "2 Paires (Le Plus Populaire)",
    qty: 2,
    unitPrice: 49.99,
    shippingFee: 0,
    total: 49.99,
    currency: "EUR",
    paymentMethod: "stripe",
    paymentStatus: "paid",
    transactionId: "ch_3Pq1v8Lkd9wZ",
    cardBrand: "VISA",
    cardLast4: "4242",
    status: "🔵 Confirmé",
    notes: "Paiement 3D Secure validé. Colis préparé pour envoi rapide",
    customer: {
      fullName: "Thomas Dubois",
      phone: "+33 6 12 34 56 78",
      email: "thomas.dubois@email.fr",
      country: "FR",
      countryName: "France",
      city: "Paris",
      address: "14 Rue du Faubourg Saint-Honoré",
      postalCode: "75008",
    },
  },
  {
    id: "EUR-7822",
    createdAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    product: "Semelles Orthopédiques Acupression Pro",
    color: "black",
    size: "EU 39-40",
    pack: "3 Paires (Pack Famille Confort)",
    qty: 3,
    unitPrice: 69.99,
    shippingFee: 0,
    total: 69.99,
    currency: "EUR",
    paymentMethod: "paypal",
    paymentStatus: "paid",
    transactionId: "PAYID-MN68910QZ",
    status: "🚚 En cours d'expédition",
    notes: "Numéro de suivi DHL Express: DHL-88492019EU",
    customer: {
      fullName: "Sarah Jenkins",
      phone: "+32 470 12 34 56",
      email: "sarah.jenkins@gmail.com",
      country: "BE",
      countryName: "Belgique",
      city: "Bruxelles",
      address: "Avenue Louise 204",
      postalCode: "1050",
    },
  },
  {
    id: "EUR-6219",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    product: "Semelles Orthopédiques Acupression Pro",
    color: "grey",
    size: "EU 43-44",
    pack: "1 Paire (Pack Découverte)",
    qty: 1,
    unitPrice: 29.99,
    shippingFee: 0,
    total: 29.99,
    currency: "EUR",
    paymentMethod: "stripe",
    paymentStatus: "paid",
    transactionId: "ch_9841NqAmex001",
    cardBrand: "AMEX",
    cardLast4: "0005",
    status: "🟢 Livré / Payé",
    notes: "Livraison effectuée avec succès au domicile",
    customer: {
      fullName: "Alexandre Meyer",
      phone: "+41 79 123 45 67",
      email: "alex.meyer@swissmail.ch",
      country: "CH",
      countryName: "Suisse",
      city: "Genève",
      address: "Rue du Rhône 42",
      postalCode: "1204",
    },
  },
  {
    id: "EUR-5140",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    product: "Semelles Orthopédiques Acupression Pro",
    color: "orange",
    size: "EU 37-38",
    pack: "5 Paires (Pack Sérénité Maxi-Éco)",
    qty: 5,
    unitPrice: 99.99,
    shippingFee: 0,
    total: 99.99,
    currency: "EUR",
    paymentMethod: "stripe",
    paymentStatus: "paid",
    transactionId: "ch_7718Mc91823",
    cardBrand: "MASTERCARD",
    cardLast4: "5555",
    status: "🟢 Livré / Payé",
    notes: "Avis client vérifié 5 étoiles laissé en ligne",
    customer: {
      fullName: "Lucas Martin",
      phone: "+33 6 98 76 54 32",
      email: "lucas.martin@orange.fr",
      country: "FR",
      countryName: "France",
      city: "Lyon",
      address: "18 Place Bellecour",
      postalCode: "69002",
    },
  },
  {
    id: "EUR-4910",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    product: "Semelles Orthopédiques Acupression Pro",
    color: "black",
    size: "EU 41-42",
    pack: "2 Paires (Le Plus Populaire)",
    qty: 2,
    unitPrice: 49.99,
    shippingFee: 0,
    total: 49.99,
    currency: "EUR",
    paymentMethod: "paypal",
    paymentStatus: "paid",
    transactionId: "PAYID-PL994821",
    status: "🟡 Nouveau",
    notes: "Commande récente payée par PayPal",
    customer: {
      fullName: "Sophie Bernard",
      phone: "+33 6 11 22 33 44",
      email: "sophie.bernard@gmail.com",
      country: "FR",
      countryName: "France",
      city: "Bordeaux",
      address: "5 Cours de l'Intendance",
      postalCode: "33000",
    },
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusTab, setSelectedStatusTab] = useState("Tous");
  const [selectedCity, setSelectedCity] = useState("Toutes les villes");
  const [activeOrderModal, setActiveOrderModal] = useState<OrderItem | null>(null);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger depuis le localStorage ou initialiser
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("stepprs_orders");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setOrders(
              parsed.map((ord: any) => ({
                ...ord,
                status: ord.status || "🟡 Nouveau",
              }))
            );
          } else {
            setOrders(INITIAL_DEMO_ORDERS);
            localStorage.setItem("stepprs_orders", JSON.stringify(INITIAL_DEMO_ORDERS));
          }
        } else {
          setOrders(INITIAL_DEMO_ORDERS);
          localStorage.setItem("stepprs_orders", JSON.stringify(INITIAL_DEMO_ORDERS));
        }
      } catch (err) {
        console.error(err);
        setOrders(INITIAL_DEMO_ORDERS);
      }
      setIsLoaded(true);
    }
  }, []);

  // Mettre à jour le statut d'une commande
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) => {
      const updated = prev.map((ord) =>
        ord.id === orderId ? { ...ord, status: newStatus } : ord
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("stepprs_orders", JSON.stringify(updated));
      }
      if (activeOrderModal && activeOrderModal.id === orderId) {
        setActiveOrderModal((curr) => (curr ? { ...curr, status: newStatus } : null));
      }
      return updated;
    });
  };

  // Mettre à jour les notes
  const updateOrderNotes = (orderId: string, notes: string) => {
    setOrders((prev) => {
      const updated = prev.map((ord) =>
        ord.id === orderId ? { ...ord, notes } : ord
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("stepprs_orders", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Supprimer une commande
  const deleteOrder = (orderId: string) => {
    if (confirm(`Confirmez-vous la suppression de la commande #${orderId} ?`)) {
      setOrders((prev) => {
        const updated = prev.filter((ord) => ord.id !== orderId);
        if (typeof window !== "undefined") {
          localStorage.setItem("stepprs_orders", JSON.stringify(updated));
        }
        return updated;
      });
      if (activeOrderModal?.id === orderId) {
        setActiveOrderModal(null);
      }
    }
  };

  // Copier le récapitulatif pour le livreur
  const copyForDelivery = (order: OrderItem) => {
    const text = `📦 COMMANDE #${order.id}\n👤 Client : ${order.customer?.fullName}\n📞 Tél : ${order.customer?.phone}\n📍 Destination : ${order.customer?.city}, ${order.customer?.countryName || order.customer?.country || 'Europe'}\n🏠 Adresse : ${order.customer?.address}\n👟 Produit : ${order.pack} (${order.color}, ${order.size})\n💰 Montant Total : ${Number(order.total).toFixed(2).replace('.', ',')} € (${order.paymentMethod ? order.paymentMethod.toUpperCase() : 'PAYÉ'})`;
    navigator.clipboard.writeText(text);
    setCopiedId(order.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export CSV compatible Excel & Google Sheets
  const exportToCSV = () => {
    if (orders.length === 0) {
      alert("Aucune commande à exporter.");
      return;
    }

    const headers = [
      "ID Commande",
      "Date & Heure",
      "Nom du Client",
      "Telephone",
      "Ville",
      "Adresse",
      "Offre / Pack",
      "Couleur",
      "Pointure",
      "Quantite",
      "Prix Total (€)",
      "Statut",
      "Notes & Suivi",
    ];

    const rows = orders.map((o) => [
      `"${o.id}"`,
      `"${new Date(o.createdAt).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" })}"`,
      `"${(o.customer?.fullName || "").replace(/"/g, '""')}"`,
      `"'${o.customer?.phone || ""}"`,
      `"${(o.customer?.city || "").replace(/"/g, '""')}"`,
      `"${(o.customer?.address || "").replace(/"/g, '""')}"`,
      `"${(o.pack || "").replace(/"/g, '""')}"`,
      `"${o.color || ""}"`,
      `"${o.size || ""}"`,
      `"${o.qty || 1}"`,
      `"${o.total || ""}"`,
      `"${o.status || "🟡 Nouveau"}"`,
      `"${(o.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "\uFEFF" +
      [headers.join(";"), ...rows.map((e) => e.join(";"))].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `Commandes_Confort_Pro_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Liste des villes uniques
  const citiesList = useMemo(() => {
    const set = new Set<string>();
    orders.forEach((o) => {
      if (o.customer?.city) set.add(o.customer.city);
    });
    return ["Toutes les villes", ...Array.from(set)];
  }, [orders]);

  // Filtrage
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (ord.customer?.fullName || "").toLowerCase().includes(q) ||
        (ord.customer?.phone || "").includes(q) ||
        (ord.customer?.city || "").toLowerCase().includes(q) ||
        ord.id.toLowerCase().includes(q);

      const matchesStatus =
        selectedStatusTab === "Tous" || ord.status === selectedStatusTab;

      const matchesCity =
        selectedCity === "Toutes les villes" || ord.customer?.city === selectedCity;

      return matchesSearch && matchesStatus && matchesCity;
    });
  }, [orders, searchQuery, selectedStatusTab, selectedCity]);

  // Statistiques calculées
  const totalRevenue = useMemo(
    () => orders.reduce((sum, ord) => sum + (Number(ord.total) || 0), 0),
    [orders]
  );
  const countNew = orders.filter((o) => (o.status || "").includes("Nouveau")).length;
  const countConfirmed = orders.filter((o) => (o.status || "").includes("Confirmé")).length;
  const countDelivered = orders.filter((o) => (o.status || "").includes("Livré")).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-orange-500 selection:text-white">
      {/* 1. TOP EXECUTIVE HEADER */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Brand info */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded-xl transition-all"
              title="Retour à la boutique"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black text-lg flex items-center justify-center shadow-md shadow-orange-500/20">
                C
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    CONFORT PRO
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                    <span>🇪🇺 Europe (Stripe / PayPal)</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Tableau de bord et gestion des commandes
                </p>
              </div>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>En direct</span>
            </div>

            <a
              href="https://docs.google.com/spreadsheets/d/1ZTZm3qWLxLCF-oHgwmet9g_Q0kB94272s51Oylyp6kY/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all"
              title="Ouvrir mon fichier Google Sheets"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span className="hidden sm:inline">Mon Google Sheet</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-slate-900 hover:bg-slate-800 active:scale-98 text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Exporter CSV</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Boutique</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* KPI METRICS ROW (Harmonious Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Total Orders */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Commandes
              </span>
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {orders.length}
              </span>
              <span className="text-xs font-semibold text-slate-500">commandes</span>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Chiffre d&apos;Affaires
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600">
                {totalRevenue.toFixed(2).replace(".", ",")}
              </span>
              <span className="text-xs font-bold text-slate-500">€</span>
            </div>
          </div>

          {/* Pending / New */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                À Confirmer (Nouveaux)
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-amber-600">
                {countNew}
              </span>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                Priorité
              </span>
            </div>
          </div>

          {/* Delivered & Confirmed */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Livrées / Encaissées
              </span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-indigo-600">
                {countDelivered}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                ({countConfirmed} confirmées)
              </span>
            </div>
          </div>
        </div>

        {/* 3. STATUS TABS FILTER (Harmonious horizontal scrollable pills) */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedStatusTab("Tous")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              selectedStatusTab === "Tous"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span>Toutes</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                selectedStatusTab === "Tous"
                  ? "bg-white/20 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {orders.length}
            </span>
          </button>

          {STATUS_KEYS.map((key) => {
            const cfg = STATUS_CONFIG[key];
            const isSelected = selectedStatusTab === key;
            const count = orders.filter((o) => (o.status || "🟡 Nouveau") === key).length;

            return (
              <button
                key={key}
                onClick={() => setSelectedStatusTab(key)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? `${cfg.bg} ${cfg.text} ${cfg.border} border shadow-xs`
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                <span>{cfg.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                    isSelected ? "bg-white/80" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 4. SEARCH & SECONDARY FILTERS BAR */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom, téléphone (ex: 06...), ville ou #ID..."
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-9 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-3 focus:ring-orange-500/10 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* City Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full md:w-auto bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              {citiesList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 5. HARMONIOUS ORDERS TABLE (Clean Notion/Shopify Design) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Table déroulant sans barre de défilement horizontale */}
          <div className="overflow-x-hidden max-h-[620px] overflow-y-auto relative">
            <table className="w-full text-left text-xs sm:text-sm border-collapse table-auto">
              <thead className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur-md shadow-xs">
                <tr className="text-slate-600 font-bold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-2 sm:px-3 text-center w-14">Réf.</th>
                  <th className="py-3 px-2 sm:px-3 w-20 sm:w-24">Date</th>
                  <th className="py-3 px-2 sm:px-3">Client & Contact</th>
                  <th className="py-3 px-2 sm:px-3">Destination</th>
                  <th className="py-3 px-2 sm:px-3">Pack & Choix</th>
                  <th className="py-3 px-2 sm:px-3 text-center w-20">Montant</th>
                  <th className="py-3 px-2 sm:px-3 text-center w-44">
                    Statut (Liste déroulante)
                  </th>
                  <th className="py-3 px-2 sm:px-3 text-right w-16">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center">
                      <div className="max-w-xs mx-auto space-y-2">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                          <Search className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-bold text-slate-700">
                          Aucune commande ne correspond
                        </p>
                        <p className="text-xs text-slate-500">
                          Essayez de réinitialiser la recherche ou le filtre de statut.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord, index) => {
                    const cfg = STATUS_CONFIG[ord.status] || STATUS_CONFIG["🟡 Nouveau"];

                    const waPhone = (ord.customer?.phone || "").replace(/[^0-9]/g, "");
                    const waInternational = waPhone.startsWith("0")
                      ? "212" + waPhone.slice(1)
                      : waPhone;
                    const waText = encodeURIComponent(
                      `السلام عليكم أخي / أختي ${ord.customer?.fullName || ""}. معكم مصلحة الزبناء بخصوص طلبكم رقم #${ord.id} لفرشات التدليك الطبية Confort Pro Europe. المرجو تأكيد العنوان وموعد التوصيل المناسب لكم.`
                    );
                    const waLink = `https://wa.me/${waInternational}?text=${waText}`;

                    const isCopied = copiedId === ord.id;

                    return (
                      <tr
                        key={ord.id}
                        className="hover:bg-slate-50/70 transition-colors group"
                      >
                        {/* ID */}
                        <td className="py-3 px-2 sm:px-3 text-center">
                          <button
                            onClick={() => setActiveOrderModal(ord)}
                            className="font-mono text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"
                          >
                            #{ord.id}
                          </button>
                        </td>

                        {/* Date */}
                        <td className="py-3 px-2 sm:px-3 text-slate-500 text-xs">
                          <div className="font-semibold text-slate-700">
                            {new Date(ord.createdAt).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {new Date(ord.createdAt).toLocaleTimeString("fr-FR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>

                        {/* Customer & Quick Contacts */}
                        <td className="py-3 px-2 sm:px-3">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 leading-tight">
                              {ord.customer?.fullName || "Client anonyme"}
                            </span>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="font-mono text-xs text-slate-600">
                                {ord.customer?.phone || "—"}
                              </span>

                              {ord.customer?.phone && (
                                <div className="flex items-center gap-1 ml-0.5">
                                  {/* Call button */}
                                  <a
                                    href={`tel:${ord.customer.phone}`}
                                    className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                                    title="Appeler"
                                  >
                                    <Phone className="w-3.5 h-3.5" />
                                  </a>

                                  {/* WhatsApp button */}
                                  <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 rounded-md text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition"
                                    title="Contacter sur WhatsApp"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Destination */}
                        <td className="py-3 px-2 sm:px-3 text-xs">
                          <span className="inline-block font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md mb-0.5">
                            {ord.customer?.countryName || ord.customer?.country
                              ? `${ord.customer?.city || ""}${ord.customer?.city ? ", " : ""}${ord.customer?.countryName || ord.customer?.country}`
                              : (ord.customer?.city || "—")}
                          </span>
                          <p className="text-slate-500 truncate max-w-[150px] sm:max-w-xs" title={ord.customer?.address}>
                            {ord.customer?.address || "—"}
                          </p>
                        </td>

                        {/* Product Choices */}
                        <td className="py-3 px-2 sm:px-3 text-xs">
                          <span className="font-semibold text-slate-900 block truncate max-w-[140px] sm:max-w-none">
                            {ord.pack}
                          </span>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                            <span className="capitalize">{ord.color}</span>
                            <span>•</span>
                            <span className="font-semibold text-slate-700">{ord.size}</span>
                          </div>
                        </td>

                        {/* Amount & Payment Method */}
                        <td className="py-3 px-2 sm:px-3 text-center whitespace-nowrap">
                          <div className="font-black text-slate-900 text-sm">
                            {`${Number(ord.total).toFixed(2).replace(".", ",")} €`}
                          </div>
                          {ord.paymentMethod && (
                            <span className={`inline-block text-[10px] font-black px-1.5 py-0.2 rounded mt-0.5 ${
                              ord.paymentMethod.toLowerCase() === "stripe"
                                ? "bg-blue-100 text-blue-800"
                                : ord.paymentMethod.toLowerCase() === "paypal"
                                ? "bg-sky-100 text-sky-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}>
                              {ord.paymentMethod.toUpperCase()}
                            </span>
                          )}
                        </td>

                        {/* Menu Déroulant interactif directement sur le tableau */}
                        <td className="py-3 px-2 sm:px-3 text-center">
                          <div className="relative inline-block text-left">
                            <button
                              type="button"
                              onClick={() =>
                                setActiveDropdownId(activeDropdownId === ord.id ? null : ord.id)
                              }
                              className={`inline-flex items-center justify-between gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold border shadow-xs transition-all cursor-pointer hover:shadow-sm active:scale-98 ${cfg.bg} ${cfg.text} ${cfg.border}`}
                            >
                              <div className="flex items-center gap-1.5 truncate">
                                <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                                <span className="truncate max-w-[95px] sm:max-w-none">{ord.status || "🟡 Nouveau"}</span>
                              </div>
                              <ChevronDown
                                className={`w-3.5 h-3.5 transition-transform duration-200 opacity-70 shrink-0 ${
                                  activeDropdownId === ord.id ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            {/* Menu Déroulant flottant sur le tableau */}
                            {activeDropdownId === ord.id && (
                              <>
                                <div
                                  className="fixed inset-0 z-30"
                                  onClick={() => setActiveDropdownId(null)}
                                />
                                <div
                                  className={`absolute left-1/2 -translate-x-1/2 w-48 sm:w-52 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100 ${
                                    index >= filteredOrders.length - 2
                                      ? "bottom-full mb-2"
                                      : "top-full mt-1.5"
                                  }`}
                                >
                                  <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                                    Changer le statut
                                  </div>
                                  {STATUS_KEYS.map((k) => {
                                    const itemCfg = STATUS_CONFIG[k];
                                    const isSelected = (ord.status || "🟡 Nouveau") === k;
                                    return (
                                      <button
                                        key={k}
                                        type="button"
                                        onClick={() => {
                                          updateOrderStatus(ord.id, k);
                                          setActiveDropdownId(null);
                                        }}
                                        className={`w-full px-3 py-2 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer text-left ${
                                          isSelected
                                            ? `${itemCfg.bg} ${itemCfg.text}`
                                            : "hover:bg-slate-50 text-slate-700"
                                        }`}
                                      >
                                        <div className="flex items-center gap-2">
                                          <span className={`w-2 h-2 rounded-full ${itemCfg.dot}`} />
                                          <span>{k}</span>
                                        </div>
                                        {isSelected && (
                                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-2 sm:px-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            {/* Copy delivery info */}
                            <button
                              onClick={() => copyForDelivery(ord)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                              title="Copier les infos pour le livreur"
                            >
                              {isCopied ? (
                                <Check className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>

                            {/* View modal */}
                            <button
                              onClick={() => setActiveOrderModal(ord)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition"
                              title="Voir les détails complets"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => deleteOrder(ord.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                              title="Supprimer la commande"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Bottom info bar */}
          <div className="bg-slate-50/70 p-3.5 px-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span>
              Affichage de <strong className="text-slate-700">{filteredOrders.length}</strong> sur{" "}
              <strong className="text-slate-700">{orders.length}</strong> commande(s)
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Toutes les modifications sont automatiquement sauvegardées</span>
            </div>
          </div>
        </div>
      </main>

      {/* 6. MODAL DÉTAILS DE COMMANDE & FICHE LIVREUR */}
      {activeOrderModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <span className="text-xs font-bold text-orange-600">
                  Détails de la Commande
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  #{activeOrderModal.id}
                </h3>
              </div>
              <button
                onClick={() => setActiveOrderModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs sm:text-sm">
              {/* Customer Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Informations Client & Destination
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Nom :</span>
                    <strong className="text-slate-900">{activeOrderModal.customer?.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Téléphone :</span>
                    <strong className="text-slate-900 font-mono">
                      {activeOrderModal.customer?.phone}
                    </strong>
                  </div>
                  {activeOrderModal.customer?.email && (
                    <div className="col-span-2">
                      <span className="text-slate-400 block text-[11px]">Email :</span>
                      <strong className="text-slate-900 font-mono">
                        {activeOrderModal.customer.email}
                      </strong>
                    </div>
                  )}
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[11px]">Destination & Adresse :</span>
                    <p className="text-slate-900 font-medium">
                      <span className="font-bold text-orange-600">
                        {activeOrderModal.customer?.countryName || activeOrderModal.customer?.country || "France"} • {activeOrderModal.customer?.city}
                      </span>{" "}
                      • {activeOrderModal.customer?.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items & Payment */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Contenu du Colis & Paiement
                  </span>
                  {activeOrderModal.paymentMethod && (
                    <span className="text-[11px] font-black px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      Paiement : {activeOrderModal.paymentMethod.toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center text-slate-900 font-medium">
                  <div>
                    <p className="font-bold">{activeOrderModal.pack}</p>
                    <p className="text-xs text-slate-500">
                      Couleur: {activeOrderModal.color} • Pointure: {activeOrderModal.size}
                    </p>
                    {activeOrderModal.transactionId && (
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Txn: {activeOrderModal.transactionId}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-emerald-600">
                      {`${Number(activeOrderModal.total).toFixed(2).replace(".", ",")} €`}
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      Livraison: {activeOrderModal.shippingFee === 0 ? "Gratuite en Europe" : `${activeOrderModal.shippingFee} €`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status and Notes */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Statut de la commande
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {STATUS_KEYS.map((k) => {
                    const cfg = STATUS_CONFIG[k];
                    const isSelected = activeOrderModal.status === k;
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => updateOrderStatus(activeOrderModal.id, k)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-left flex items-center gap-2 cursor-pointer ${
                          isSelected
                            ? `${cfg.bg} ${cfg.text} ${cfg.border} ring-2 ring-orange-500/20`
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                        <span className="truncate">{cfg.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Notes internes & Suivi colis
                </label>
                <textarea
                  rows={2}
                  value={activeOrderModal.notes || ""}
                  onChange={(e) => updateOrderNotes(activeOrderModal.id, e.target.value)}
                  placeholder="Ajouter une remarque (ex: rappeler à 18h, code suivi Ozon...)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => copyForDelivery(activeOrderModal)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-sm transition"
              >
                {copiedId === activeOrderModal.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copié pour le livreur !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copier la fiche livreur</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setActiveOrderModal(null)}
                className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-xs transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
