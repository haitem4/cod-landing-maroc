import { ValidationResult } from "./types";

/**
 * Validates Moroccan phone numbers
 * Accepts:
 * - 06XXXXXXXX, 07XXXXXXXX, 05XXXXXXXX
 * - +2126XXXXXXXX, +2127XXXXXXXX, +2125XXXXXXXX
 * - 002126XXXXXXXX, 2126XXXXXXXX
 * - Spaces and hyphens allowed (will be cleaned)
 */
export function isValidMoroccanPhone(phone: string): boolean {
  if (!phone) return false;
  // Remove spaces, hyphens, parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  
  // Standard Moroccan mobile & landline regex
  // 0[5-7]\d{8} or (+212|00212|212)[5-7]\d{8}
  const moroccanPhoneRegex = /^(?:(?:\+?212|00212)?0?([5-7]\d{8}))$/;
  return moroccanPhoneRegex.test(cleaned);
}

export function formatMoroccanPhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  const match = cleaned.match(/^(?:(?:\+?212|00212)?0?)([5-7]\d{8})$/);
  if (match && match[1]) {
    return `0${match[1]}`;
  }
  return phone;
}

export interface FormFields {
  fullName: string;
  phone: string;
  city: string;
  address: string;
}

export function validateOrderForm(
  fields: FormFields,
  lang: "ar" | "fr" = "ar"
): ValidationResult {
  const errors: Record<string, string> = {};

  // Full Name
  if (!fields.fullName || fields.fullName.trim().length < 3) {
    errors.fullName =
      lang === "ar"
        ? "يرجى إدخال الاسم الكامل (3 أحرف على الأقل)"
        : "Veuillez entrer votre nom complet (3 caractères min.)";
  }

  // Phone
  if (!fields.phone || fields.phone.trim().length === 0) {
    errors.phone =
      lang === "ar"
        ? "يرجى إدخال رقم الهاتف للتواصل معك"
        : "Veuillez entrer votre numéro de téléphone";
  } else if (!isValidMoroccanPhone(fields.phone)) {
    errors.phone =
      lang === "ar"
        ? "رقم الهاتف غير صحيح (مثال: 0612345678 أو 0712345678)"
        : "Numéro de téléphone invalide (ex: 0612345678 ou 0712345678)";
  }

  // City
  if (!fields.city || fields.city.trim().length === 0) {
    errors.city =
      lang === "ar"
        ? "يرجى اختيار مدينتك"
        : "Veuillez sélectionner votre ville";
  }

  // Address
  if (!fields.address || fields.address.trim().length < 5) {
    errors.address =
      lang === "ar"
        ? "يرجى كتابة عنوان التوصيل بالتفصيل (الحي، الشارع...)"
        : "Veuillez préciser votre adresse de livraison complète";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
