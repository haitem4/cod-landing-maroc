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
  // Moroccan phone: starts with 05, 06 or 07 followed by 8 digits
  return /^0[5-7]\d{8}$/.test(cleaned);
}

export function validateOrderForm(
  data: { fullName: string; phone: string; address: string; city: string },
  lang: "ar" | "en"
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName =
      lang === "ar"
        ? "يرجى إدخال الاسم الكامل (الاسم والنسب)"
        : "Please enter your full name (at least 3 characters)";
  }

  if (!data.phone || data.phone.trim().length === 0) {
    errors.phone =
      lang === "ar"
        ? "يرجى إدخال رقم الهاتف للتواصل"
        : "Please enter your phone number for delivery confirmation";
  } else if (!isValidMoroccanPhone(data.phone)) {
    errors.phone =
      lang === "ar"
        ? "يرجى إدخال رقم هاتف مغربي صحيح (مثال: 0612345678)"
        : "Please enter a valid Moroccan phone number (e.g. 0612345678)";
  }

  if (!data.address || data.address.trim().length < 5) {
    errors.address =
      lang === "ar"
        ? "يرجى إدخال عنوان التوصيل بالتفصيل (الحي، الشارع...)"
        : "Please enter your full delivery address";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
