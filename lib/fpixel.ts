/**
 * Configuration Meta / Facebook Pixel
 * -------------------------------------------------------------
 * Option A (La plus simple) :
 *   Collez votre Pixel ID directement ici entre les guillemets :
 *   export const FB_PIXEL_ID = "123456789012345";
 * 
 * Option B (Variable d'environnement) :
 *   Définissez NEXT_PUBLIC_FACEBOOK_PIXEL_ID dans votre fichier .env.local
 *   ou dans les GitHub Secrets de votre repo.
 * -------------------------------------------------------------
 */
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "";

// Suivi standard de chaque page vue (PageView)
export const pageview = () => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "PageView");
  }
};

// Suivi des événements e-commerce (ViewContent, InitiateCheckout, Purchase, etc.)
export const event = (name: string, options: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", name, options);
  }
};
