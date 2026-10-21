/**
 * Configuration & Envoi vers Google Sheets
 * -------------------------------------------------------------
 * Collez l'URL de votre Web App Google Apps Script ci-dessous :
 * Exemple : "https://script.google.com/macros/s/AKfycbx.../exec"
 */
export const GOOGLE_SHEET_DOC_URL =
  "https://docs.google.com/spreadsheets/d/1ZTZm3qWLxLCF-oHgwmet9g_Q0kB94272s51Oylyp6kY/edit";

export const GOOGLE_SPREADSHEET_ID =
  "1ZTZm3qWLxLCF-oHgwmet9g_Q0kB94272s51Oylyp6kY";

export const GOOGLE_SHEET_WEBAPP_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL || "";

export interface OrderData {
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
  paymentMethod?: string; // 'stripe' | 'paypal' | 'cod'
  paymentStatus?: string; // 'paid' | 'pending'
  transactionId?: string;
  cardBrand?: string;
  cardLast4?: string;
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

/**
 * Envoie la commande vers le Google Sheet via Google Apps Script Web App
 */
export async function sendOrderToGoogleSheet(order: OrderData): Promise<boolean> {
  if (!GOOGLE_SHEET_WEBAPP_URL) {
    console.warn("GOOGLE_SHEET_WEBAPP_URL n'est pas encore configuré.");
    return false;
  }

  try {
    const payload = {
      orderId: order.id,
      date: new Date().toLocaleString("fr-FR", {
        timeZone: "Africa/Casablanca",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      customerName: order.customer.fullName,
      email: order.customer.email || "",
      phone: order.customer.phone,
      country: order.customer.countryName || order.customer.country || "France",
      city: order.customer.city,
      address: order.customer.address,
      product: order.product,
      pack: order.pack,
      color: order.color,
      size: order.size,
      qty: order.qty,
      total: `${Number(order.total).toFixed(2).replace('.', ',')} ${order.currency}`,
      paymentMethod:
        order.paymentMethod?.toLowerCase() === "stripe"
          ? `CARTE BANCAIRE (${order.cardBrand || "VISA/MC/AMEX"})`
          : order.paymentMethod?.toUpperCase() || "PAYPAL",
      paymentStatus: order.paymentStatus === "paid" ? "🟢 Payé" : "🟡 En attente",
      transactionId: order.transactionId || "",
      status: order.paymentStatus === "paid" ? "🔵 Confirmé" : "🟡 Nouveau",
    };

    // Note: Utilisation de no-cors car Google Apps Script redirige (302) vers script.googleusercontent.com
    await fetch(GOOGLE_SHEET_WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (err) {
    console.error("Erreur lors de l'envoi vers Google Sheets:", err);
    return false;
  }
}
