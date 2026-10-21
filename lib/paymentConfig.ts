/**
 * European & International Payment Configuration
 * -------------------------------------------------------------
 * Target Market: Europe & Worldwide
 * Supported Online Payments:
 * - Carte Bancaire / Credit & Debit Cards (Visa, Mastercard, American Express) via Stripe
 * - PayPal (PayPal Smart Buttons, PayPal Wallet, Pay Later)
 * - Security: PCI-DSS Level 1 & 256-Bit SSL Encryption, 3D Secure 2.0 (PSD2 Ready)
 * -------------------------------------------------------------
 */

export type PaymentMethod = "stripe" | "paypal";

export interface CountryOption {
  code: string;
  nameEn: string;
  nameAr: string;
  dialCode: string;
  flag: string;
  currency: "EUR" | "GBP" | "USD";
}

export const PAYMENT_CONFIG = {
  // Stripe Public Key (pk_live_... or pk_test_...)
  stripePublishableKey:
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51MockStripeKey1234567890",

  // Stripe Payment Links (optional 1-click hosted checkout)
  stripePaymentLinks: {
    1: process.env.NEXT_PUBLIC_STRIPE_LINK_1_PAIR || "",
    2: process.env.NEXT_PUBLIC_STRIPE_LINK_2_PAIRS || "",
    3: process.env.NEXT_PUBLIC_STRIPE_LINK_3_PAIRS || "",
    5: process.env.NEXT_PUBLIC_STRIPE_LINK_5_PAIRS || "",
  },

  // PayPal Client ID (Live or Sandbox 'sb')
  paypalClientId:
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb",

  // Primary store currency for Europe
  currency: "EUR",
  currencySymbol: "€",

  // 3 Global Card Networks (Visa, Mastercard, American Express)
  supportedNetworks: ["Visa", "Mastercard", "American Express"],

  // Security standards
  encryption: "Chiffrement SSL 256-Bit Haute Sécurité",
  compliance: "Conforme PCI-DSS Level 1 & 3D Secure 2.0 (PSD2)",
  buyerProtection: "Garantie Satisfait ou Remboursé 30 Jours & Protection Achats PayPal",
};

export const INTERNATIONAL_COUNTRIES: CountryOption[] = [
  { code: "FR", nameEn: "France", nameAr: "فرنسا", dialCode: "+33", flag: "🇫🇷", currency: "EUR" },
  { code: "BE", nameEn: "Belgique", nameAr: "بلجيكا", dialCode: "+32", flag: "🇧🇪", currency: "EUR" },
  { code: "CH", nameEn: "Suisse", nameAr: "سويسرا", dialCode: "+41", flag: "🇨🇭", currency: "EUR" },
  { code: "DE", nameEn: "Allemagne", nameAr: "ألمانيا", dialCode: "+49", flag: "🇩🇪", currency: "EUR" },
  { code: "ES", nameEn: "Espagne", nameAr: "إسبانيا", dialCode: "+34", flag: "🇪🇸", currency: "EUR" },
  { code: "IT", nameEn: "Italie", nameAr: "إيطاليا", dialCode: "+39", flag: "🇮🇹", currency: "EUR" },
  { code: "GB", nameEn: "Royaume-Uni", nameAr: "المملكة المتحدة", dialCode: "+44", flag: "🇬🇧", currency: "GBP" },
  { code: "NL", nameEn: "Pays-Bas", nameAr: "هولندا", dialCode: "+31", flag: "🇳🇱", currency: "EUR" },
  { code: "LU", nameEn: "Luxembourg", nameAr: "لوكسمبورغ", dialCode: "+352", flag: "🇱🇺", currency: "EUR" },
  { code: "PT", nameEn: "Portugal", nameAr: "البرتغال", dialCode: "+351", flag: "🇵🇹", currency: "EUR" },
  { code: "AT", nameEn: "Autriche", nameAr: "النمسا", dialCode: "+43", flag: "🇦🇹", currency: "EUR" },
  { code: "IE", nameEn: "Irlande", nameAr: "أيرلندا", dialCode: "+353", flag: "🇮🇪", currency: "EUR" },
  { code: "SE", nameEn: "Suède", nameAr: "السويد", dialCode: "+46", flag: "🇸🇪", currency: "EUR" },
  { code: "DK", nameEn: "Danemark", nameAr: "الدنمارك", dialCode: "+45", flag: "🇩🇰", currency: "EUR" },
  { code: "US", nameEn: "États-Unis", nameAr: "الولايات المتحدة", dialCode: "+1", flag: "🇺🇸", currency: "USD" },
  { code: "CA", nameEn: "Canada", nameAr: "كندا", dialCode: "+1", flag: "🇨🇦", currency: "USD" },
  { code: "OTHER", nameEn: "Autre pays (Europe & Monde)", nameAr: "دولة أخرى (أوروبا والعالم)", dialCode: "+", flag: "🌍", currency: "EUR" },
];
