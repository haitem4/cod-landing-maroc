/**
 * International Payment & Security Configuration
 * -------------------------------------------------------------
 * Supports:
 * - Stripe (Credit/Debit Card, Visa, Mastercard, Amex, Apple Pay, Google Pay)
 * - PayPal (PayPal Smart Buttons, PayPal Wallet, Pay Later, Venmo)
 * - Optional Cash on Delivery (COD) for Morocco
 * - PCI-DSS Level 1 & 256-Bit SSL Encrypted Compliance
 * -------------------------------------------------------------
 */

export type PaymentMethod = "stripe" | "paypal" | "cod";

export interface CountryOption {
  code: string;
  nameEn: string;
  nameAr: string;
  dialCode: string;
  flag: string;
  currency: "USD" | "EUR" | "MAD" | "GBP";
}

export const PAYMENT_CONFIG = {
  // Stripe Public / Publishable Key (pk_live_... or pk_test_...)
  stripePublishableKey:
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51MockStripeKey1234567890",

  // Direct Stripe Payment Links (optional 1-click hosted checkout)
  stripePaymentLinks: {
    1: process.env.NEXT_PUBLIC_STRIPE_LINK_1_PAIR || "",
    2: process.env.NEXT_PUBLIC_STRIPE_LINK_2_PAIRS || "",
    3: process.env.NEXT_PUBLIC_STRIPE_LINK_3_PAIRS || "",
    5: process.env.NEXT_PUBLIC_STRIPE_LINK_5_PAIRS || "",
  },

  // PayPal Client ID (Live or Sandbox 'sb' / 'test')
  paypalClientId:
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb", // 'sb' enables PayPal sandbox buttons

  // Default international store currency
  currency: "USD",
  currencySymbol: "$",

  // Security standards
  encryption: "256-Bit SSL Bank-Grade Encryption",
  compliance: "PCI-DSS Level 1 Certified & 3D Secure 2.0 (PSD2 Ready)",
  buyerProtection: "30-Day 100% Money-Back Guarantee & PayPal Buyer Protection",
};

export const INTERNATIONAL_COUNTRIES: CountryOption[] = [
  { code: "US", nameEn: "United States", nameAr: "الولايات المتحدة", dialCode: "+1", flag: "🇺🇸", currency: "USD" },
  { code: "FR", nameEn: "France", nameAr: "فرنسا", dialCode: "+33", flag: "🇫🇷", currency: "EUR" },
  { code: "GB", nameEn: "United Kingdom", nameAr: "المملكة المتحدة", dialCode: "+44", flag: "🇬🇧", currency: "GBP" },
  { code: "CA", nameEn: "Canada", nameAr: "كندا", dialCode: "+1", flag: "🇨🇦", currency: "USD" },
  { code: "DE", nameEn: "Germany", nameAr: "ألمانيا", dialCode: "+49", flag: "🇩🇪", currency: "EUR" },
  { code: "ES", nameEn: "Spain", nameAr: "إسبانيا", dialCode: "+34", flag: "🇪🇸", currency: "EUR" },
  { code: "IT", nameEn: "Italy", nameAr: "إيطاليا", dialCode: "+39", flag: "🇮🇹", currency: "EUR" },
  { code: "BE", nameEn: "Belgium", nameAr: "بلجيكا", dialCode: "+32", flag: "🇧🇪", currency: "EUR" },
  { code: "CH", nameEn: "Switzerland", nameAr: "سويسرا", dialCode: "+41", flag: "🇨🇭", currency: "EUR" },
  { code: "NL", nameEn: "Netherlands", nameAr: "هولندا", dialCode: "+31", flag: "🇳🇱", currency: "EUR" },
  { code: "AU", nameEn: "Australia", nameAr: "أستراليا", dialCode: "+61", flag: "🇦🇺", currency: "USD" },
  { code: "AE", nameEn: "United Arab Emirates", nameAr: "الإمارات العربية المتحدة", dialCode: "+971", flag: "🇦🇪", currency: "USD" },
  { code: "SA", nameEn: "Saudi Arabia", nameAr: "المملكة العربية السعودية", dialCode: "+966", flag: "🇸🇦", currency: "USD" },
  { code: "QA", nameEn: "Qatar", nameAr: "قطر", dialCode: "+974", flag: "🇶🇦", currency: "USD" },
  { code: "KW", nameEn: "Kuwait", nameAr: "الكويت", dialCode: "+965", flag: "🇰🇼", currency: "USD" },
  { code: "MA", nameEn: "Morocco", nameAr: "المغرب", dialCode: "+212", flag: "🇲🇦", currency: "MAD" },
  { code: "OTHER", nameEn: "Other Country (Worldwide)", nameAr: "دولة أخرى (عالمي)", dialCode: "+", flag: "🌍", currency: "USD" },
];
