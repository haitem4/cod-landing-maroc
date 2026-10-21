export type Lang = "ar" | "en";

export interface BundleOffer {
  qty: number;
  price: number; // EUR (€)
  originalPrice: number;
  labelAr: string;
  labelEn: string;
  badgeAr?: string;
  badgeEn?: string;
  saveAr: string;
  saveEn: string;
  isPopular?: boolean;
}

export interface Review {
  name: string;
  city: string;
  rating: number;
  textAr: string;
  textEn: string;
  roleAr: string;
  roleEn: string;
  dateAr: string;
  dateEn: string;
  photo?: string;
}

export interface FAQItem {
  qAr: string;
  qEn: string;
  aAr: string;
  aEn: string;
}

export const getAssetPath = (path: string): string => {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  let base = process.env.NEXT_PUBLIC_BASE_PATH;
  if (!base && typeof window !== "undefined") {
    if (window.location.pathname.startsWith("/cod-landing-maroc")) {
      base = "/cod-landing-maroc";
    }
  }
  if (!base && process.env.NODE_ENV === "production") {
    base = "/cod-landing-maroc";
  }

  const cleanBase = base ? (base.endsWith("/") ? base.slice(0, -1) : base) : "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
};

export const PRODUCT_IMAGES = {
  orangeHero: getAssetPath("/images/orange_clean.webp"),
  blackHero: getAssetPath("/images/black_clean.webp"),
  greyHero: getAssetPath("/images/grey_clean.webp"),
  features: getAssetPath("/images/features_clean.webp"),
  benefits: getAssetPath("/images/benefits.webp"),
  clinical: getAssetPath("/images/clinical_clean.webp"),
  comparison: getAssetPath("/images/comparison_clean.webp"),
  howToUse: getAssetPath("/images/howToUse_clean.webp"),
  doctor: getAssetPath("/images/doctor_clean.webp"),
  ebook: getAssetPath("/images/ebook_clean.jpg"),
};

export const COLOR_OPTIONS = [
  { id: "orange", nameAr: "البرتقالي الأصلي", nameEn: "Signature Orange", hex: "#ea580c", image: PRODUCT_IMAGES.orangeHero },
  { id: "black", nameAr: "الأسود الأنيق", nameEn: "Classic Black", hex: "#1e293b", image: PRODUCT_IMAGES.blackHero },
  { id: "grey", nameAr: "الرمادي العصري", nameEn: "Modern Grey", hex: "#64748b", image: PRODUCT_IMAGES.greyHero },
];

export const SIZES = [
  { label: "EU 35-36 | UK 4 | US 5.5", cm: "23.5 cm" },
  { label: "EU 37-38 | UK 5 | US 7", cm: "24.5 cm" },
  { label: "EU 39-40 | UK 6 | US 8.5", cm: "25.5 cm" },
  { label: "EU 41-42 | UK 7 | US 9.5", cm: "26.5 cm" },
  { label: "EU 43-44 | UK 8 | US 10.5", cm: "27.5 cm" },
  { label: "EU 45-46 | UK 9 | US 12", cm: "28.5 cm" },
];

export const BUNDLE_OFFERS: BundleOffer[] = [
  {
    qty: 1,
    price: 29.99,
    originalPrice: 49.99,
    labelAr: "زوج واحد (1 Paire - عرض التجربة)",
    labelEn: "1 Paire (Pack Découverte)",
    badgeAr: "توفير 40%",
    badgeEn: "ÉCONOMISEZ 40%",
    saveAr: "وفر 20.00 € + شحن مجاني + كتاب إلكتروني",
    saveEn: "Économisez 20,00 € + Livraison Gratuite + E-book",
    isPopular: false,
  },
  {
    qty: 2,
    price: 49.99,
    originalPrice: 99.98,
    labelAr: "زوجين (2 Paires - الأكثر طلباً)",
    labelEn: "2 Paires (Le Plus Populaire)",
    badgeAr: "🔥 الأكثر طلباً - خصم 50%",
    badgeEn: "🔥 Plus Populaire - ÉCONOMISEZ 50%",
    saveAr: "وفر 50.00 € (24.99 € للزوج) + شحن مجاني",
    saveEn: "Économisez 50,00 € (24,99 €/paire) + Livraison Gratuite",
    isPopular: true,
  },
  {
    qty: 3,
    price: 69.99,
    originalPrice: 149.97,
    labelAr: "3 أزواج (3 Paires - العرض العائلي)",
    labelEn: "3 Paires (Pack Famille Confort)",
    badgeAr: "وفر 55%",
    badgeEn: "ÉCONOMISEZ 55%",
    saveAr: "وفر 80.00 € (23.33 € للزوج) + شحن مجاني",
    saveEn: "Économisez 80,00 € (23,33 €/paire) + Livraison Gratuite",
    isPopular: false,
  },
  {
    qty: 5,
    price: 99.99,
    originalPrice: 249.95,
    labelAr: "5 أزواج (5 Paires - أفضل قيمة توفير)",
    labelEn: "5 Paires (Pack Sérénité Maxi-Éco)",
    badgeAr: "💥 خصم 60% أقصى توفير",
    badgeEn: "💥 Meilleure Offre - ÉCONOMISEZ 60%",
    saveAr: "وفر 150.00 € (19.99 € للزوج) + شحن مجاني",
    saveEn: "Économisez 150,00 € (19,99 €/paire) + Livraison Gratuite",
    isPopular: false,
  },
];

export const CONTENT = {
  ar: {
    announcement: "🔥 عرض خاص بأوروبا: خصم يصل إلى 60% • شحن سريع ومجاني داخل أوروبا • دفع آمن عبر البطاقة البنكية و PayPal 🎁",
    brandTitle: "فرشات التدليك الطبية المريحة",
    brandSubtitle: "الفرشات الطبية المبتكرة بنقاط الأكيوبريسور ودعم تقوس القدم",
    ratingText: "تقييم 4.8 / 5 | أكثر من 88,000 زبون راضٍ في أوروبا والعالم",
    heroTitle: "استرجع متعة المشي والوقوف بدون ألم في القدمين والظهر!",
    heroDesc: "كل خطوة لا يجب أن تكون عذاباً! تقنية نقاط الأكيوبريسور المدمجة ودعم تقوس القدم الطبي تمتص الصدمات، تنشط الدورة الدموية، وتمنحك راحة فورية من الشوكة العظمية (Fasciite Plantaire) وتعب العمل والوقوف الطويل.",
    quickBullets: [
      "✔ راحة فورية وتخفيف الآلام من أول يوم",
      "✔ دعم مقوس طبي وموصى به من أطباء العظام",
      "✔ تلائم جميع أنواع الأحذية مع خطوط قص سهلة بالمقص",
    ],
    colorTitle: "اختر لونك المفضل :",
    sizeTitle: "اختر المقاس :",
    sizeHint: "✂️ يمكنك قصها وتعديلها بسهولة بالمقص لتلائم حذاءك بالضبط.",
    offersTitle: "العروض الخاصة (اختر الباقة المناسبة لك) :",
    orderSectionTitle: "طلب سريع وآمن • شحن سريع ومجاني داخل أوروبا",
    orderSectionSubtitle: "الدفع ببطاقة الائتمان (Visa, Mastercard, Amex) أو PayPal",
    countryLabel: "الدولة / وجهة الشحن *",
    fullNameLabel: "الاسم الكامل (الاسم والنسب) *",
    fullNamePlaceholder: "مثال: يوسف التازي",
    emailLabel: "البريد الإلكتروني (لتتبع الشحنة وإيصال الدفع) *",
    emailPlaceholder: "name@example.com",
    phoneLabel: "رقم الهاتف للتواصل *",
    phonePlaceholder: "XX XX XX XX XX",
    cityLabel: "المدينة *",
    addressLabel: "عنوان التوصيل بالتفصيل *",
    addressPlaceholder: "الشارع، رقم المبنى، الرمز البريدي...",
    stateZipLabel: "الرمز البريدي / الولاية *",
    shippingWorldwideFree: "شحن سريع ومجاني في أوروبا ✈️ (0,00 €)",
    shippingLabel: "مصاريف التوصيل :",
    totalLabel: "المجموع الإجمالي :",
    ctaButton: "تأكيد الطلب بأمان الآن",
    ctaSubtext: "🔒 معاملة مشفرة بأمان 256-Bit SSL • متوافق مع معايير PCI-DSS و 3D Secure",
    whatsappBtn: "تواصل عبر واتساب لمتابعة طلبك",

    // Payment methods
    paymentMethodTitle: "اختر طريقة الدفع الآمنة :",
    stripeCardTab: "بطاقة بنكية (Visa, Mastercard, Amex)",
    paypalTab: "باي بال (PayPal)",
    cardNumberLabel: "رقم البطاقة البنكية *",
    cardExpiryLabel: "تاريخ الانتهاء (MM/YY) *",
    cardCvcLabel: "رمز الأمان (CVC) *",
    cardHolderLabel: "اسم صاحب البطاقة كما هو مكتوب *",
    cardBanksNotice: "البطاقات المقبولة: Visa و Mastercard و American Express • محمي بنظام 3D Secure 2.0",

    // Security Badges
    securityBadgeSSL: "تشفير بنكي 256-Bit SSL",
    securityBadgePCI: "معتمد PCI-DSS Level 1 & 3D Secure 2.0",
    securityBadgeGuarantee: "ضمان استرجاع الأموال 30 يوماً & حماية المشتري",
    
    // Before / After
    differenceTitle: "الفرق الحقيقي مع فرشات التدليك الطبية المبتكرة",
    differenceSubtitle: "عش التحول بنفسك واكتشف متعة الخطوات الخفيفة بدون أي ألم.",
    beforeTitle: "مع الفرشات العادية والتقليدية :",
    beforePoints: [
      "آلام حادة ومزعجة في الكعب عند الاستيقاظ والمشي",
      "تعب شديد وثقل في الساقين والركبتين بعد ساعات العمل",
      "إسفنج عادي يفقد سماكته ولا يوفر أي دعم لتقوس القدم",
      "تعرق روائح غير مرغوبة لعدم وجود تهوية مناسبة",
    ],
    afterTitle: "مع فرشاتنا الطبية المبتكرة :",
    afterPoints: [
      "نقاط أكيوبريسور تنشط الدورة الدموية وتزيل التشنجات فورياً",
      "دعم مقوس ثلاثي الأبعاد يعيد التوازن ويحمي العمود الفقري",
      "امتصاص فائق للصدمات يحمي المفاصل على الأرضيات الصلبة",
      "نسيج مسامي مقاوم للبكتيريا والتعرق لانتعاش يدوم طوال اليوم",
    ],

    // Target Audience
    audienceTitle: "مصممة خصيصاً لجميع احتياجاتك اليومية",
    audienceList: [
      { role: "الأطقم الطبية والممرضون", desc: "راحة استثنائية أثناء نوبات العمل والوقوف الطويل لأكثر من 12 ساعة." },
      { role: "أصحاب المهن الشاقة والعمال", desc: "امتصاص صدمات قوي يحمي المفاصل داخل أحذية السلامة والعمل الثقيلة." },
      { role: "الرياضيون والعداؤون", desc: "مرونة وانطلاقة مع كل خطوة لتقليل إجهاد الأوتار وتسريع الاستشفاء." },
      { role: "المشي والتسوق اليومي", desc: "تحسين وضعية الجسم واستعادة طاقة ونشاط المشي بدون أي تعب." },
    ],

    // Clinical Stats
    statsTitle: "المستقبل خالٍ من آلام القدمين والمفاصل",
    statsSubtitle: "نتائج مثبتة سريرياً واستهلاكياً على أكثر من 1,000 مستخدم :",
    stats: [
      { percent: "95%", label: "تخفيف فوري للآلام", desc: "تحسن ملموس في آلام كعب القدم والشوكة العظمية" },
      { percent: "94%", label: "راحة فائقة مضاعفة", desc: "طاقة ونشاط طوال اليوم مع تقليل التعب العضلي" },
      { percent: "90%", label: "حماية من الإصابات", desc: "امتصاص الصدمات يقلل الإجهاد عن الركبتين والمفاصل" },
    ],

    // Comparison Table
    comparisonTitle: "ما الذي يجعل هذه الفرشات فريدة مقارنة بالفرشات الأخرى؟",
    compHeaders: { feature: "المعيار", us: "فرشات التدليك الطبية (Pro)", them: "الفرشات العادية" },
    compRows: [
      { feature: "تدليك مستمر بنقاط الأكيوبريسور", us: "نعم مدمج", them: "غير موجود" },
      { feature: "دعم طبي فعال لتقوس القدم والشوكة العظمية", us: "دعم ثلاثي الأبعاد", them: "مسطحة بدون دعم" },
      { feature: "امتصاص الصدمات على الأرضيات الصلبة", us: "قاعدة سيليكون ممتصة", them: "إسفنج ضعيف" },
      { feature: "نسيج مسامي مضاد للروائح والتعرق", us: "تهوية ممتازة", them: "تسبب التعرق" },
      { feature: "العمر الافتراضي وقابلية الغسل", us: "أكثر من 12 شهراً", them: "تتلف في أسابيع" },
      { feature: "سهولة القص بالمقص لتناسب أي حذاء", us: "خطوط قص مرنة", them: "صعبة التعديل" },
    ],

    // Doctor
    doctorTag: "توصية أطباء العظام والقدم",
    doctorName: "د. توماس شنايدر (Dr. Thomas Schneider)",
    doctorRole: "أخصائي معتمد في طب وجراحة القدم والعمود الفقري",
    doctorQuote: "بصفتي أخصائي قدم عاينت مئات الحالات من آلام الفاسيت بلانتير والتهاب الأوتار، أوصي بشدة بهاته الفرشات الطبية. تصميمها الهندسي يوفر دعماً استثنائياً لقوس القدم، مما يوزع الضغط بالتساوي ويخفف الإجهاد عن الأوتار وأسفل الظهر. إنها استثمار حقيقي في صحة مشيتك.",

    // Bonus eBook
    ebookTitle: "هدية مجانية مع كل طلب ! 🎁",
    ebookSubtitle: "كتاب إلكتروني شامل: دليل العناية بالقدمين والخطوات الصحية بدون ألم (Foot Health Mastery)",
    ebookValue: "بقيمة 20.00 € - مجاناً تماماً مع طلبك اليوم",

    // FAQ
    faqTitle: "الأسئلة الشائعة حول الفرشات الطبية المريحة",
    faqs: [
      {
        q: "هل تناسب مقاس حذائي الصغير أو الكبير؟",
        a: "نعم بكل تأكيد! تحتوي الفرشات على خطوط قص إرشادية واضحة في الخلف. يمكنك وضع فرشة حذائك القديمة فوقها، وقص الزوائد بالمقص بكل سهولة لتناسب مقاسك بالضبط من 36 حتى 46.",
      },
      {
        q: "هل تساعد فعلاً في علاج آلام الشوكة العظمية (Fasciite Plantaire)؟",
        a: "نعم، بفضل التصميم المقوس الطبي الذي يرفع قوس القدم ويحرر الكعب من الضغط المباشر، إضافة لنقاط الأكيوبريسور التي تحفز التدفق الدموي وتخفف التهاب الأنسجة.",
      },
      {
        q: "ما هي طرق الدفع الآمنة المتاحة؟",
        a: "نوفر وسائل دفع آمنة 100% عبر بطاقات الائتمان العالمية الثلاث: Visa و Mastercard و American Express عبر بوابة Stripe المشفرة بتشفير 256-Bit SSL و 3D Secure 2.0، بالإضافة إلى خيار الدفع عبر PayPal مع حماية المشتري الكاملة.",
      },
      {
        q: "ما هي مدة وتكاليف التوصيل في أوروبا؟",
        a: "التوصيل السريع مجاني تماماً 100% في جميع دول أوروبا (فرنسا، بلجيكا، سويسرا، إلخ). يتم تجهيز وإرسال الطلب في غضون 24-48 ساعة مع رقم تتبع فوري عبر البريد الإلكتروني.",
      },
      {
        q: "ما هي سياسة الاسترجاع والضمان؟",
        a: "نحن واثقون تماماً من جودة منتجنا! نقدم ضمان استرجاع الأموال لمدة 30 يوماً إن لم تلاحظ تحسناً حقيقياً في راحتك اليومية.",
      },
    ],
  },

  en: {
    announcement: "🔥 Offre Spéciale Europe : Jusqu'à -60% • Livraison Express Gratuite en Europe • Paiement 100% Sécurisé (Carte Bancaire & PayPal) 🎁",
    brandTitle: "Semelles Orthopédiques d'Acupression",
    brandSubtitle: "Semelles médicales de massage par acupression avec soutien renforcé de la voûte plantaire",
    ratingText: "Noté 4.8 / 5 | Plus de 88 000 clients satisfaits en Europe",
    heroTitle: "Dites Adieu aux Douleurs de Pieds, Talons et Dos à Chaque Pas !",
    heroDesc: "Marcher ne devrait plus être une souffrance. Grâce aux points d'acupression intégrés et au soutien ergonomique de la voûte plantaire, absorbez les chocs sur sol dur, relancez la circulation et soulagez instantanément l'aponévrosite plantaire et la fatigue.",
    quickBullets: [
      "✔ Soulagement immédiat de l'aponévrosite plantaire et épine calcanéenne",
      "✔ Soutien anatomique recommandé par les podologues & ostéopathes",
      "✔ Découpage facile aux ciseaux pour s'adapter à toutes vos chaussures",
    ],
    colorTitle: "Choisissez votre couleur :",
    sizeTitle: "Sélectionnez votre pointure :",
    sizeHint: "✂️ Lignes de guidage au dos. Découpez facilement avec des ciseaux pour un ajustement sur mesure.",
    offersTitle: "Offres Spéciales (Sélectionnez votre pack) :",
    orderSectionTitle: "Commande Rapide & Sécurisée • Livraison Express Gratuite en Europe",
    orderSectionSubtitle: "Paiement en ligne sécurisé par Carte Bancaire (Visa, Mastercard, Amex) ou PayPal",
    countryLabel: "Pays de livraison *",
    fullNameLabel: "Nom et Prénom *",
    fullNamePlaceholder: "Ex: Thomas Dubois",
    emailLabel: "Adresse Email (pour le suivi du colis et la facture) *",
    emailPlaceholder: "thomas.dubois@example.com",
    phoneLabel: "Numéro de Téléphone *",
    phonePlaceholder: "06 12 34 56 78",
    cityLabel: "Ville *",
    addressLabel: "Adresse de Livraison *",
    addressPlaceholder: "Numéro, Rue, Bâtiment, Appartement...",
    stateZipLabel: "Code Postal / Département *",
    shippingWorldwideFree: "Livraison Express Gratuite en Europe ✈️ (0,00 €)",
    shippingLabel: "Frais de Livraison :",
    totalLabel: "Total TTC à payer :",
    ctaButton: "Valider ma commande en toute sécurité",
    ctaSubtext: "🔒 Transaction 100% sécurisée • Chiffrement bancaire SSL 256-Bit • Conforme PCI-DSS Level 1 & 3D Secure 2.0",
    whatsappBtn: "Contacter le support client sur WhatsApp",

    // Payment methods
    paymentMethodTitle: "Choisissez votre mode de paiement sécurisé :",
    stripeCardTab: "Carte Bancaire (Visa, Mastercard, Amex)",
    paypalTab: "PayPal",
    cardNumberLabel: "Numéro de Carte Bancaire *",
    cardExpiryLabel: "Date d'Expiration (MM/AA) *",
    cardCvcLabel: "Code de Sécurité (CVC / CVV) *",
    cardHolderLabel: "Nom du Titulaire de la Carte *",
    cardBanksNotice: "Cartes acceptées : Visa, Mastercard, American Express • Protégé par 3D Secure 2.0",

    // Security Badges
    securityBadgeSSL: "Chiffrement Bancaire SSL 256-Bit",
    securityBadgePCI: "Certifié PCI-DSS Level 1 & 3D Secure 2.0",
    securityBadgeGuarantee: "Garantie 30 Jours Satisfait ou Remboursé",
    
    // Before / After
    differenceTitle: "La Vraie Différence : Découvrez la Transformation",
    differenceSubtitle: "Retrouvez des pas légers, dynamiques et sans aucune douleur au quotidien.",
    beforeTitle: "Avec des semelles ordinaires :",
    beforePoints: [
      "Douleurs aiguës et lancinantes au talon dès les premiers pas du matin",
      "Pieds brûlants, chevilles gonflées et fatigue musculaire après le travail",
      "Mousse basique qui s'écrase rapidement sans aucun soutien de voûte",
      "Transpiration et odeurs désagréables par manque de ventilation",
    ],
    afterTitle: "Avec nos semelles médicales de massage :",
    afterPoints: [
      "Noeuds d'acupression massants qui stimulent le flux sanguin instantanément",
      "Soutien anatomique 3D qui redistribue la pression loin du talon",
      "Amorti haute densité protégeant les articulations sur sols bétonnés et durs",
      "Tissu respirant et anti-odeurs garantissant une fraîcheur toute la journée",
    ],

    // Target Audience
    audienceTitle: "Idéales pour Tous Vos Besoins Quotidiens",
    audienceList: [
      { role: "Personnel Médical & Soignants", desc: "Confort absolu pendant les gardes debout de plus de 12 heures sur sols durs." },
      { role: "BTP, Artisans & Logistique", desc: "Absorption maximale des chocs dans les chaussures de sécurité lourdes." },
      { role: "Sportifs, Marcheurs & Running", desc: "Propulsion dynamique et récupération musculaire accélérée." },
      { role: "Marche Quotidienne & Ville", desc: "Amélioration de la posture corporelle et soulagement des lombaires." },
    ],

    // Clinical Stats
    statsTitle: "Un Avenir Sans Douleur aux Pieds",
    statsSubtitle: "Résultats mesurés auprès de plus de 1 000 utilisateurs quotidiens :",
    stats: [
      { percent: "95%", label: "Douleur Réduite", desc: "Soulagement notable dès les premières 48h sur l'aponévrosite" },
      { percent: "94%", label: "Confort Supérieur", desc: "Moins de fatigue musculaire en fin de journée de travail" },
      { percent: "90%", label: "Protection Articulaire", desc: "Amorti des chocs protégeant genoux, hanches et colonne" },
    ],

    // Comparison Table
    comparisonTitle: "Pourquoi Choisir Nos Semelles Médicales ?",
    compHeaders: { feature: "Critère", us: "Semelles Acupression Pro", them: "Semelles Standards" },
    compRows: [
      { feature: "Noeuds d'acupression massants", us: "Oui, intégrés", them: "Aucun" },
      { feature: "Soutien anatomique de la voûte", us: "Soutien 3D médical", them: "Plat et inefficace" },
      { feature: "Absorption des chocs sur sol dur", us: "Coussin gel & EVA", them: "Mousse basique" },
      { feature: "Tissu respirant anti-odeurs", us: "Respirant & anti-bactérien", them: "Retient la transpiration" },
      { feature: "Durée de vie & lavable", us: "Plus de 12 mois", them: "S'affaisse en quelques semaines" },
      { feature: "Découpage facile aux ciseaux", us: "Lignes précises", them: "Difficile à ajuster" },
    ],

    // Doctor
    doctorTag: "Recommandation Podologique & Orthopédique",
    doctorName: "Dr. Thomas Schneider",
    doctorRole: "Chirurgien Podologue Spécialiste du Pied et de la Cheville",
    doctorQuote: "Après avoir examiné des centaines de patients souffrant de fasciite plantaire et de douleurs chroniques du talon, je recommande vivement ces semelles orthopédiques. Leur contour anatomique soulage la tension sur le fascia plantaire tout en absorbant les micro-chocs sur sol dur.",

    // Bonus eBook
    ebookTitle: "Cadeau Exclusif Offert avec Votre Commande ! 🎁",
    ebookSubtitle: "Guide Numérique Complet : Retrouver des Pieds en Pleine Santé & Vivre Sans Douleur",
    ebookValue: "Valeur de 20,00 € - 100% Offert aujourd'hui avec votre commande",

    // FAQ
    faqTitle: "Foire Aux Questions",
    faqs: [
      {
        q: "Ces semelles s'adaptent-elles à toutes les chaussures ?",
        a: "Oui, parfaitement ! Elles disposent de lignes de guidage claires au dos. Posez simplement votre semelle actuelle dessus et découpez l'excédent avec des ciseaux. Convient aux pointures 35 à 46 pour baskets, chaussures de sécurité, de ville ou de marche.",
      },
      {
        q: "Sont-elles efficaces pour l'aponévrosite plantaire et l'épine de Lenoir ?",
        a: "Absolument. Le soutien ergonomique de la voûte plantaire soulage l'étirement du fascia plantaire et retire la pression directe sur le talon, tandis que les zones d'acupression stimulent la micro-circulation pour apaiser l'inflammation.",
      },
      {
        q: "Quels sont les modes de paiement sécurisés acceptés ?",
        a: "Nous acceptons les trois réseaux mondiaux de cartes bancaires : Visa, Mastercard et American Express via la plateforme sécurisée Stripe (chiffrement SSL 256-Bit et 3D Secure 2.0), ainsi que PayPal avec la Garantie Protection des Achats.",
      },
      {
        q: "Quels sont les délais et modalités de livraison en Europe ?",
        a: "La livraison express est 100% offerte et gratuite dans toute l'Europe (France, Belgique, Suisse, Luxembourg, etc.). Vos colis sont expédiés sous 24h avec un numéro de suivi envoyé directement à votre adresse email.",
      },
      {
        q: "Quelle est votre politique de garantie satisfait ou remboursé ?",
        a: "Nous sommes convaincus de l'efficacité de nos semelles. Vous bénéficiez d'une garantie satisfait ou remboursé de 30 jours. Si vous ne ressentez pas un réel soulagement, contactez-nous pour un échange ou un remboursement complet.",
      },
    ],
  },
};

export const REVIEWS: Review[] = [
  {
    name: "Thomas Dubois",
    city: "Paris, France",
    rating: 5,
    roleAr: "عامل مستودع (9 ساعات وقوف)",
    roleEn: "Responsable Logistique (9h debout/jour)",
    dateAr: "منذ يومين",
    dateEn: "Il y a 2 jours",
    textAr: "أعمل في مستودع وأقضي 9 ساعات واقفاً. هذه الفرشات غيرت حياتي تماماً! راحة فورية واختفاء لآلام الكعب.",
    textEn: "Je passe 9 heures par jour sur du béton en chaussures de sécurité. Ces semelles ont changé mes journées ! Dès le premier jour, je n'avais plus cette douleur lancinante au talon en rentrant le soir. Excellent produit.",
  },
  {
    name: "Sarah Jenkins",
    city: "Bruxelles, Belgique",
    rating: 5,
    roleAr: "ممرضة بمستشفى (12 ساعة عمل)",
    roleEn: "Infirmière Hospitalière (gardes de 12h)",
    dateAr: "منذ 3 أيام",
    dateEn: "Il y a 3 jours",
    textAr: "أنا ممرضة وأعاني من الوقوف الطويل. دعم ممتاز لتقوس القدم وخفة حقيقية في المشي.",
    textEn: "En tant qu'infirmière faisant des gardes de 12 heures, mes pieds étaient en feu à chaque fin de service. Le maintien de la voûte plantaire est bluffant. Zéro douleur au réveil et livraison très rapide en Belgique !",
  },
  {
    name: "Alexandre Meyer",
    city: "Genève, Suisse",
    rating: 5,
    roleAr: "رياضي وعداء",
    roleEn: "Marathonien & Coach Sportif",
    dateAr: "منذ 5 أيام",
    dateEn: "Il y a 5 jours",
    textAr: "جودة استثنائية، قصيتها لمقاسي 43 واستقرت بشكل مثالي في حذائي. أنصح بها بشدة.",
    textEn: "Je souffrais d'un début d'aponévrosite suite à des entraînements de course à pied. Découpées en pointure 43, elles s'insèrent parfaitement dans mes baskets. Paiement par carte rapide et sécurisé, je recommande !",
  },
];
