"use client";

import React, { useState, useEffect } from "react";
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
  Edit,
} from "lucide-react";

export interface OrderItem {
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
  notes?: string;
  customer: {
    fullName: string;
    phone: string;
    city: string;
    address: string;
  };
}

const STATUS_LIST = [
  {
    id: "🟡 Nouveau",
    label: "🟡 Nouveau",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
  },
  {
    id: "📞 Contacté",
    label: "📞 Contacté",
    badgeClass: "bg-orange-100 text-orange-800 border-orange-300",
  },
  {
    id: "🔵 Confirmé",
    label: "🔵 Confirmé",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
  },
  {
    id: "🚚 En cours d'expédition",
    label: "🚚 En expédition",
    badgeClass: "bg-indigo-100 text-indigo-800 border-indigo-300",
  },
  {
    id: "🟢 Livré / Payé",
    label: "🟢 Livré / Payé",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    id: "🔴 Annulé",
    label: "🔴 Annulé",
    badgeClass: "bg-rose-100 text-rose-800 border-rose-300",
  },
  {
    id: "🔁 Retour",
    label: "🔁 Retour",
    badgeClass: "bg-slate-200 text-slate-800 border-slate-300",
  },
];

const INITIAL_DEMO_ORDERS: OrderItem[] = [
  {
    id: "CFP-8491",
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    product: "فرشات التدليك الطبية (Confort Pro)",
    color: "orange",
    size: "EU 41-42",
    pack: "عرض زوجين (الأكثر طلباً)",
    qty: 2,
    unitPrice: 279,
    shippingFee: 0,
    total: 279,
    currency: "DH",
    status: "🟡 Nouveau",
    customer: {
      fullName: "يوسف المنصوري",
      phone: "0661234567",
      city: "Casablanca",
      address: "حي المعاريف، زنقة 14، رقم 25",
    },
  },
  {
    id: "CFP-7822",
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    product: "فرشات التدليك الطبية (Confort Pro)",
    color: "blue",
    size: "EU 39-40",
    pack: "عرض 3 أزواج (توفير عائلي)",
    qty: 3,
    unitPrice: 359,
    shippingFee: 0,
    total: 359,
    currency: "DH",
    status: "🔵 Confirmé",
    customer: {
      fullName: "فاطمة الزهراء العمراني",
      phone: "0670987654",
      city: "Rabat",
      address: "حي أكدال، شارع فال ولد عمير، عمارة 8",
    },
  },
  {
    id: "CFP-6219",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    product: "فرشات التدليك الطبية (Confort Pro)",
    color: "green",
    size: "EU 43-44",
    pack: "عرض زوج واحد",
    qty: 1,
    unitPrice: 199,
    shippingFee: 20,
    total: 219,
    currency: "DH",
    status: "🚚 En cours d'expédition",
    customer: {
      fullName: "أحمد بنجلون",
      phone: "0665432109",
      city: "Marrakech",
      address: "حي جيليز، قرب مقهى النخيل",
    },
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("Tous");
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger les commandes depuis le localStorage
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
        console.error("Erreur lecture commandes:", err);
        setOrders(INITIAL_DEMO_ORDERS);
      }
      setIsLoaded(true);
    }
  }, []);

  // Sauvegarder les modifications
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) => {
      const updated = prev.map((ord) =>
        ord.id === orderId ? { ...ord, status: newStatus } : ord
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("stepprs_orders", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const deleteOrder = (orderId: string) => {
    if (confirm(`Confirmez-vous la suppression de la commande #${orderId} ?`)) {
      setOrders((prev) => {
        const updated = prev.filter((ord) => ord.id !== orderId);
        if (typeof window !== "undefined") {
          localStorage.setItem("stepprs_orders", JSON.stringify(updated));
        }
        return updated;
      });
    }
  };

  // Export CSV compatible Excel et Google Sheets
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
      "Prix Total (DH)",
      "Statut",
    ];

    const rows = orders.map((o) => [
      `"${o.id}"`,
      `"${new Date(o.createdAt).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" })}"`,
      `"${(o.customer?.fullName || "").replace(/"/g, '""')}"`,
      `"'${o.customer?.phone || ""}"`, // apostrophe pour préserver le 0
      `"${(o.customer?.city || "").replace(/"/g, '""')}"`,
      `"${(o.customer?.address || "").replace(/"/g, '""')}"`,
      `"${(o.pack || "").replace(/"/g, '""')}"`,
      `"${o.color || ""}"`,
      `"${o.size || ""}"`,
      `"${o.qty || 1}"`,
      `"${o.total || ""}"`,
      `"${o.status || "🟡 Nouveau"}"`,
    ]);

    const csvContent =
      "\uFEFF" + // BOM pour forcer UTF-8 dans Excel
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

  // Statistiques
  const totalRevenue = orders.reduce((sum, ord) => sum + (Number(ord.total) || 0), 0);
  const confirmedCount = orders.filter((o) => o.status === "🔵 Confirmé").length;
  const deliveredCount = orders.filter((o) => o.status === "🟢 Livré / Payé").length;

  // Filtrage
  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      (ord.customer?.fullName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ord.customer?.phone || "").includes(searchQuery) ||
      (ord.customer?.city || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === "Tous" || ord.status === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-orange-600 selection:text-white p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-800/90 border border-slate-700/80 p-5 rounded-3xl shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2.5 bg-slate-700/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-2xl transition"
              title="Retour au site"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Système En Direct
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                Tableau de Bord des Commandes
              </h1>
              <p className="text-xs text-slate-400">
                Gestion COD Maroc • Confort Pro (Stepprs)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={exportToCSV}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/25 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Exporter vers Excel / Sheets</span>
            </button>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-700/80 hover:bg-slate-700 text-slate-200 rounded-2xl font-bold text-xs transition"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden md:inline">Voir la boutique</span>
            </Link>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-slate-800/70 border border-slate-700/70 rounded-3xl p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Total Commandes
              </span>
              <Package className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {orders.length}
            </div>
            <span className="text-[11px] text-slate-400">Toutes les soumissions</span>
          </div>

          <div className="bg-slate-800/70 border border-slate-700/70 rounded-3xl p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Chiffre d&apos;Affaires
              </span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              {totalRevenue} <span className="text-sm font-bold text-slate-300">DH</span>
            </div>
            <span className="text-[11px] text-slate-400">Montant total brut</span>
          </div>

          <div className="bg-slate-800/70 border border-slate-700/70 rounded-3xl p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Confirmées
              </span>
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-400">
              {confirmedCount}
            </div>
            <span className="text-[11px] text-slate-400">Prêtes pour la livraison</span>
          </div>

          <div className="bg-slate-800/70 border border-slate-700/70 rounded-3xl p-4 sm:p-5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Livrées / Encaissées
              </span>
              <Truck className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-300">
              {deliveredCount}
            </div>
            <span className="text-[11px] text-slate-400">Livraison réussie</span>
          </div>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="bg-slate-800/70 border border-slate-700/70 rounded-3xl p-4 flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom, téléphone, ville ou #ID..."
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs sm:text-sm font-bold text-slate-200 rounded-2xl px-3 py-2.5 focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="Tous">Tous les statuts ({orders.length})</option>
              {STATUS_LIST.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.label} (
                  {orders.filter((o) => (o.status || "🟡 Nouveau") === st.id).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ORDERS TABLE - SPREADSHEET LOOK */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-950/90 text-slate-300 font-black border-b border-slate-700 uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 text-center">ID</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Téléphone</th>
                  <th className="py-3.5 px-4">Ville & Adresse</th>
                  <th className="py-3.5 px-4">Pack & Options</th>
                  <th className="py-3.5 px-4 text-center">Total</th>
                  <th className="py-3.5 px-4 text-center min-w-[200px]">
                    Statut (Liste déroulante)
                  </th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 font-medium">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="py-12 text-center text-slate-400 text-sm font-bold"
                    >
                      Aucune commande trouvée.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => {
                    const statusObj =
                      STATUS_LIST.find((s) => s.id === ord.status) || STATUS_LIST[0];

                    const waPhone = (ord.customer?.phone || "").replace(/[^0-9]/g, "");
                    const waInternational = waPhone.startsWith("0")
                      ? "212" + waPhone.slice(1)
                      : waPhone;
                    const waText = encodeURIComponent(
                      `السلام عليكم أخي / أختي ${ord.customer?.fullName || ""}. معكم مصلحة الزبناء بخصوص طلبكم رقم #${ord.id} لفرشات التدليك الطبية Confort Pro. المرجو تأكيد العنوان وموعد التوصيل.`
                    );
                    const waLink = `https://wa.me/${waInternational}?text=${waText}`;

                    return (
                      <tr
                        key={ord.id}
                        className="hover:bg-slate-700/30 transition-colors group"
                      >
                        {/* ID */}
                        <td className="py-3 px-4 text-center font-mono font-bold text-orange-400">
                          {ord.id}
                        </td>

                        {/* Date */}
                        <td className="py-3 px-4 text-slate-400 whitespace-nowrap text-xs">
                          {new Date(ord.createdAt).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                          <br />
                          <span className="text-[10px] text-slate-500">
                            {new Date(ord.createdAt).toLocaleTimeString("fr-FR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                          {ord.customer?.fullName || "—"}
                        </td>

                        {/* Phone with WhatsApp and Call buttons */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 font-mono text-slate-200">
                            <span>{ord.customer?.phone || "—"}</span>
                            {ord.customer?.phone && (
                              <div className="flex items-center gap-1 ml-1">
                                <a
                                  href={`tel:${ord.customer.phone}`}
                                  className="p-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition"
                                  title="Appeler"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-400 hover:text-white transition"
                                  title="Ouvrir WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* City & Address */}
                        <td className="py-3 px-4 max-w-xs text-xs">
                          <span className="font-bold text-amber-300">
                            {ord.customer?.city || "—"}
                          </span>
                          <p className="text-slate-400 truncate">
                            {ord.customer?.address || "—"}
                          </p>
                        </td>

                        {/* Product details */}
                        <td className="py-3 px-4 text-xs whitespace-nowrap">
                          <span className="font-bold text-white">{ord.pack}</span>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <span className="capitalize">Couleur: {ord.color}</span>
                            <span>•</span>
                            <span>{ord.size}</span>
                          </div>
                        </td>

                        {/* Total */}
                        <td className="py-3 px-4 text-center font-black text-emerald-400 whitespace-nowrap">
                          {ord.total} DH
                        </td>

                        {/* Status Select with exact requested colors */}
                        <td className="py-3 px-4 text-center">
                          <select
                            value={ord.status || "🟡 Nouveau"}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                            className={`w-full py-1.5 px-3 rounded-xl font-bold text-xs border-2 shadow-sm focus:outline-none transition-all cursor-pointer ${statusObj.badgeClass}`}
                          >
                            {STATUS_LIST.map((s) => (
                              <option
                                key={s.id}
                                value={s.id}
                                className="bg-slate-900 text-white font-medium py-1"
                              >
                                {s.label}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Delete action */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => deleteOrder(ord.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                            title="Supprimer la commande"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER */}
          <div className="bg-slate-950/70 p-4 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <span>
              Affichage de {filteredOrders.length} sur {orders.length} commande(s)
            </span>
            <span className="flex items-center gap-1.5">
              <span>💡 Cliquez sur la liste déroulante pour changer la couleur et l&apos;état</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
