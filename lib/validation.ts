export function isCasablanca(city: string): boolean {
  if (!city) return false;
  const normalized = city.trim().toLowerCase();
  return (
    normalized.includes("casa") ||
    normalized.includes("casablanca") ||
    city.includes("الدار البيضاء") ||
    city.includes("كازا")
  );
}

export function getShippingFee(city: string): number {
  return isCasablanca(city) ? 0 : 30;
}

export function formatMoroccanPhone(phone: string): string {
  let cleaned = phone.replace(/[\s\-\.\(\)]/g, "");
  if (cleaned.startsWith("+212")) {
    cleaned = "0" + cleaned.slice(4);
  } else if (cleaned.startsWith("212")) {
    cleaned = "0" + cleaned.slice(3);
  }
  return cleaned;
}

export function isValidMoroccanPhone(phone: string): boolean {
  const cleaned = formatMoroccanPhone(phone);
  return /^0[5-7]\d{8}$/.test(cleaned);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidInternationalPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\.\(\)\+]/g, "");
  return cleaned.length >= 7 && cleaned.length <= 15;
}

export function detectCardBrand(number: string): "visa" | "mastercard" | "amex" | "discover" | "unknown" {
  const cleaned = number.replace(/\D/g, "");
  if (/^4/.test(cleaned)) return "visa";
  if (/^5[1-5]|^2[2-7]/.test(cleaned)) return "mastercard";
  if (/^3[47]/.test(cleaned)) return "amex";
  if (/^6(?:011|5)/.test(cleaned)) return "discover";
  return "unknown";
}

export function formatCardNumber(value: string): string {
  const cleaned = value.replace(/\D/g, "").slice(0, 16);
  const parts = cleaned.match(/.{1,4}/g);
  return parts ? parts.join(" ") : cleaned;
}

export function formatCardExpiry(value: string): string {
  const cleaned = value.replace(/\D/g, "").slice(0, 4);
  if (cleaned.length >= 3) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  }
  return cleaned;
}

export function validateCardNumber(number: string): boolean {
  const cleaned = number.replace(/\D/g, "");
  if (cleaned.length < 13 || cleaned.length > 19) return false;
  // Luhn Algorithm check
  let sum = 0;
  let alternate = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let n = parseInt(cleaned.charAt(i), 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n = (n % 10) + 1;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

export function validateExpiry(expiry: string): boolean {
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
  const [mm, yy] = expiry.split("/").map((n) => parseInt(n, 10));
  if (mm < 1 || mm > 12) return false;
  const now = new Date();
  const currentYear = parseInt(now.getFullYear().toString().slice(-2), 10);
  const currentMonth = now.getMonth() + 1;
  if (yy < currentYear) return false;
  if (yy === currentYear && mm < currentMonth) return false;
  return true;
}

export function validateOrderForm(
  data: {
    fullName: string;
    phone: string;
    email?: string;
    address: string;
    city: string;
    country?: string;
  },
  lang: "ar" | "en"
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName =
      lang === "ar"
        ? "يرجى إدخال الاسم الكامل"
        : "Please enter your full name (at least 3 characters)";
  }

  if (data.email !== undefined && (!data.email || !isValidEmail(data.email))) {
    errors.email =
      lang === "ar"
        ? "يرجى إدخال بريد إلكتروني صحيح لاستلام الفاتورة وتتبع الشحنة"
        : "Please enter a valid email address for tracking & payment receipt";
  }

  if (!data.phone || data.phone.trim().length === 0) {
    errors.phone =
      lang === "ar"
        ? "يرجى إدخال رقم الهاتف للتواصل"
        : "Veuillez renseigner votre numéro de téléphone";
  } else if (!isValidInternationalPhone(data.phone)) {
    errors.phone =
      lang === "ar"
        ? "يرجى إدخال رقم هاتف صحيح للتواصل"
        : "Veuillez renseigner un numéro de téléphone valide";
  }

  if (!data.address || data.address.trim().length < 5) {
    errors.address =
      lang === "ar"
        ? "يرجى إدخال عنوان التوصيل بالتفصيل"
        : "Please enter your full delivery address";
  }

  if (!data.city || data.city.trim().length < 2) {
    errors.city =
      lang === "ar"
        ? "يرجى إدخال اسم المدينة"
        : "Please enter your city";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
