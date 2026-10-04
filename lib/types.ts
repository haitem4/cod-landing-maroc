export interface ProductTheme {
  primary: string;
  accent: string;
  background: string;
  text: string;
}

export interface BenefitItem {
  icon: string;
  title: string;
  text: string;
}

export interface ReviewItem {
  name: string;
  city: string;
  rating: number;
  text: string;
  photo?: string;
  date?: string;
}

export interface OfferItem {
  qty: number;
  price: number;
  originalPrice?: number;
  label: string;
  badge?: string;
  default?: boolean;
  freeShipping?: boolean;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface ProblemSection {
  title: string;
  subtitle?: string;
  points: string[];
  solutionTitle?: string;
  solutionPoints?: string[];
}

export interface ProductConfig {
  slug: string;
  lang: "ar" | "fr";
  theme: ProductTheme;
  logoText?: string;
  badgeHeader?: string;
  whatsappNumber?: string;
  title: string;
  subtitle: string;
  heroImage: string;
  gallery: string[];
  videoOrGif?: string;
  problem: ProblemSection;
  benefits: BenefitItem[];
  reviews: ReviewItem[];
  offers: OfferItem[];
  currency: string;
  trustBadges: string[];
  faq: FAQItem[];
  pixelId?: string;
  cities: string[];
  guaranteeText?: string;
  ctaText?: string;
}

export interface OrderPayload {
  id?: string;
  createdAt: string;
  productSlug: string;
  productTitle: string;
  selectedOffer: {
    qty: number;
    price: number;
    label: string;
  };
  shippingFee: number;
  total: number;
  customer: {
    fullName: string;
    phone: string;
    city: string;
    address: string;
    notes?: string;
  };
  source?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    referrer?: string;
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}
