export type Lang = "ar" | "en";

export interface BundleOffer {
  qty: number;
  price: number; // Moroccan Dirham (MAD)
  originalPrice: number;
  priceUsd: number; // International USD ($)
  originalPriceUsd: number;
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
    price: 199,
    originalPrice: 349,
    priceUsd: 29.99,
    originalPriceUsd: 49.99,
    labelAr: "زوج واحد (1 Paire - عرض التجربة)",
    labelEn: "1 Pair (Starter Pack)",
    badgeAr: "توفير 35%",
    badgeEn: "SAVE 35%",
    saveAr: "وفر 150 درهم + شحن مجاني",
    saveEn: "Save $20.00 + FREE Shipping + Free eBook",
    isPopular: false,
  },
  {
    qty: 2,
    price: 299,
    originalPrice: 698,
    priceUsd: 49.99,
    originalPriceUsd: 99.98,
    labelAr: "زوجين (2 Paires - الأكثر طلباً)",
    labelEn: "2 Pairs (Most Popular Pack)",
    badgeAr: "🔥 الأكثر طلباً - خصم 45%",
    badgeEn: "🔥 Most Popular - SAVE 45%",
    saveAr: "وفر 400 درهم (149 درهم للزوج) + كتاب مجاني",
    saveEn: "Save $50.00 ($24.99/pair) + FREE Shipping",
    isPopular: true,
  },
  {
    qty: 3,
    price: 399,
    originalPrice: 1047,
    priceUsd: 69.99,
    originalPriceUsd: 149.97,
    labelAr: "3 أزواج (3 Paires - العرض العائلي)",
    labelEn: "3 Pairs (Family Value Pack)",
    badgeAr: "وفر 55%",
    badgeEn: "SAVE 55%",
    saveAr: "وفر 650 درهم (133 درهم للزوج) + كتاب مجاني",
    saveEn: "Save $80.00 ($23.33/pair) + FREE Shipping",
    isPopular: false,
  },
  {
    qty: 5,
    price: 599,
    originalPrice: 1745,
    priceUsd: 99.99,
    originalPriceUsd: 249.95,
    labelAr: "5 أزواج (5 Paires - أفضل قيمة توفير)",
    labelEn: "5 Pairs (Best Value Pack)",
    badgeAr: "💥 خصم 60% أقصى توفير",
    badgeEn: "💥 Best Value - SAVE 60%",
    saveAr: "وفر 1146 درهم (119 درهم للزوج) + كتاب مجاني",
    saveEn: "Save $150.00 ($19.99/pair) + FREE Shipping",
    isPopular: false,
  },
];

export const MOROCCAN_CITIES = [
  "الدار البيضاء (Casablanca)",
  "الرباط (Rabat)",
  "سلا (Salé)",
  "مراكش (Marrakech)",
  "فاس (Fès)",
  "طنجة (Tanger)",
  "أكادير (Agadir)",
  "مكناس (Meknès)",
  "وجدة (Oujda)",
  "القنيطرة (Kénitra)",
  "تطوان (Tétouan)",
  "تمارة (Témara)",
  "المحمدية (Mohammédia)",
  "الجديدة (El Jadida)",
  "بني ملال (Béni Mellal)",
  "آسفي (Safi)",
  "الناظور (Nador)",
  "خريبكة (Khouribga)",
  "سطات (Settat)",
  "برشيد (Berrechid)",
  "العيون (Laâyoune)",
  "الداخلة (Dakhla)",
  "مدينة أخرى (Autre Ville)",
];

export const CONTENT = {
  ar: {
    announcement: "🔥 تخفيض عالمي حصري يصل إلى 60% • شحن دولي سريع ومجاني • دفع آمن عبر Stripe و PayPal 🎁",
    brandTitle: "فرشات التدليك الطبية المريحة",
    brandSubtitle: "الفرشات الطبية المبتكرة بنقاط الأكيوبريسور ودعم تقوس القدم",
    ratingText: "تقييم 4.8 / 5 | أكثر من 88,000 زبون راضٍ حول العالم",
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
    orderSectionTitle: "إتمام الطلب بأمان • شحن دولي سريع ومجاني",
    orderSectionSubtitle: "الدفع ببطاقة الائتمان (Stripe) أو PayPal أو الدفع عند الاستلام بالمغرب",
    countryLabel: "الدولة / وجهة الشحن *",
    fullNameLabel: "الاسم الكامل (الاسم والنسب) *",
    fullNamePlaceholder: "مثال: يوسف التازي",
    emailLabel: "البريد الإلكتروني (لتتبع الشحنة وإيصال الدفع) *",
    emailPlaceholder: "name@example.com",
    phoneLabel: "رقم الهاتف للتواصل *",
    phonePlaceholder: "XX XX XX XX XX",
    cityLabel: "المدينة *",
    addressLabel: "عنوان التوصيل بالتفصيل *",
    addressPlaceholder: "الشارع، رقم المنزل، الرمز البريدي...",
    stateZipLabel: "الرمز البريدي / الولاية",
    shippingFreeCasa: "مجاني بالدار البيضاء (0 درهم) 🎉",
    shippingOther: "+30 درهم (خارج الدار البيضاء)",
    shippingWorldwideFree: "شحن دولي سريع ومجاني ✈️ (0$)",
    shippingLabel: "مصاريف التوصيل :",
    totalLabel: "المجموع الإجمالي :",
    ctaButton: "تأكيد الطلب بأمان الآن",
    ctaSubtext: "🔒 معاملة مشفرة بأمان 256-Bit SSL • متوافق مع معايير PCI-DSS و 3D Secure",
    whatsappBtn: "تواصل عبر واتساب لمتابعة طلبك",

    // Payment methods
    paymentMethodTitle: "اختر طريقة الدفع الآمنة :",
    stripeCardTab: "بطاقة بنكية (Stripe)",
    paypalTab: "باي بال (PayPal)",
    codTab: "الدفع عند الاستلام (COD بالمغرب)",
    cardNumberLabel: "رقم البطاقة الائتمانية *",
    cardExpiryLabel: "تاريخ الانتهاء (MM/YY) *",
    cardCvcLabel: "رمز الأمان (CVC) *",
    cardHolderLabel: "اسم صاحب البطاقة كما هو مكتوب *",

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
    ebookValue: "بقيمة 150 درهم ($20 USD) - مجاناً تماماً مع طلبك اليوم",

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
        q: "هل تدعم الدفع الآمن دولياً عبر بطاقات الائتمان و PayPal؟",
        a: "نعم بكل تأكيد! نوفر خيارات دفع آمنة 100% ومحمية بتشفير 256-Bit SSL عبر Stripe (Visa, Mastercard, Amex, Apple Pay) و PayPal مع حماية المشتري، بالإضافة إلى خيار الدفع عند الاستلام لزبائننا داخل المغرب.",
      },
      {
        q: "كم تدوم الفرشات وكيف أنظفها؟",
        a: "تدوم لأكثر من 12 شهراً مع الاستخدام اليومي بفضل متانة خاماتها. يمكنك غسلها بسهولة يدوياً بالماء والصابون وتركها تجف طبيعياً.",
      },
      {
        q: "ما هي سياسة الاسترجاع والضمان؟",
        a: "نحن واثقون تماماً من جودة منتجنا! نقدم ضمان استرجاع الأموال لمدة 30 يوماً إن لم تلاحظ تحسناً حقيقياً في راحتك اليومية.",
      },
    ],
  },

  en: {
    announcement: "🔥 Worldwide Exclusive: Up to 60% OFF • FREE Express Shipping • 100% Secure Checkout with Stripe & PayPal 🎁",
    brandTitle: "Acupressure Orthotic Insoles",
    brandSubtitle: "Medical-grade acupressure massage insoles with reinforced arch support",
    ratingText: "Rated 4.8 / 5 | Over 88,000 satisfied customers worldwide",
    heroTitle: "End Foot, Heel & Lower Back Pain With Every Step You Take!",
    heroDesc: "Walking shouldn't be painful. Our breakthrough acupressure nodes and ergonomic arch support absorb brutal concrete shocks, improve circulation, and deliver instant relief from plantar fasciitis, heel spurs, and all-day standing fatigue.",
    quickBullets: [
      "✔ Instant relief from plantar fasciitis & heel spurs",
      "✔ Podiatrist recommended arch support & acupressure nodes",
      "✔ Trimmable cut-to-fit design fits sneakers, boots, and dress shoes",
    ],
    colorTitle: "Select Insole Color :",
    sizeTitle: "Select Shoe Size :",
    sizeHint: "✂️ Trimmable edges on back. Simply cut with scissors for a custom fit.",
    offersTitle: "Bundle Offers (Choose your pack) :",
    orderSectionTitle: "Fast & Secure Checkout • FREE Express Shipping",
    orderSectionSubtitle: "Pay securely with Credit / Debit Card (Stripe), PayPal, or Cash on Delivery (Morocco)",
    countryLabel: "Country / Destination *",
    fullNameLabel: "Full Name *",
    fullNamePlaceholder: "e.g. John Miller",
    emailLabel: "Email Address (for order tracking & instant receipt) *",
    emailPlaceholder: "john@example.com",
    phoneLabel: "Phone Number *",
    phonePlaceholder: "Phone number with area code",
    cityLabel: "City *",
    addressLabel: "Delivery Street Address *",
    addressPlaceholder: "Street, Apartment, Suite, Postal / ZIP Code...",
    stateZipLabel: "State / Province / ZIP Code",
    shippingFreeCasa: "FREE in Casablanca (0 DH) 🎉",
    shippingOther: "+30 DH (Outside Casablanca)",
    shippingWorldwideFree: "FREE Worldwide Express Shipping ✈️ ($0.00)",
    shippingLabel: "Shipping Fee :",
    totalLabel: "Total Amount :",
    ctaButton: "Complete Secure Order Now",
    ctaSubtext: "🔒 256-Bit Bank-Grade SSL Encryption • PCI-DSS Level 1 & 3D Secure 2.0 Protection",
    whatsappBtn: "Contact on WhatsApp for fast support",

    // Payment methods
    paymentMethodTitle: "Select Secure Payment Method :",
    stripeCardTab: "Credit / Debit Card (Stripe)",
    paypalTab: "PayPal",
    codTab: "Cash on Delivery (Morocco)",
    cardNumberLabel: "Card Number *",
    cardExpiryLabel: "Expiration (MM/YY) *",
    cardCvcLabel: "Security Code (CVC) *",
    cardHolderLabel: "Cardholder Name *",

    // Security Badges
    securityBadgeSSL: "256-Bit Bank-Grade SSL Encryption",
    securityBadgePCI: "PCI-DSS Level 1 & 3D Secure 2.0 Certified",
    securityBadgeGuarantee: "30-Day Money-Back Guarantee & Buyer Protection",
    
    // Before / After
    differenceTitle: "The Real Difference: Experience The Transformation",
    differenceSubtitle: "Step into a brighter, pain-free future and rediscover the joy of walking.",
    beforeTitle: "With Normal Standard Insoles :",
    beforePoints: [
      "Sharp, throbbing heel pain every morning when taking first steps",
      "Exhausted, aching feet and swollen ankles after work shifts",
      "Cheap foam that flattens in weeks with zero arch support",
      "Sweaty feet and bad odors due to lack of breathability",
    ],
    afterTitle: "With Our Medical Massage Insoles :",
    afterPoints: [
      "Acupressure nodes stimulate circulation and relieve tension instantly",
      "Deep 3D arch support redistributes pressure evenly off the heels",
      "Shock-absorbing base protects knees, hips, and spine on concrete",
      "Breathable, moisture-wicking top layer keeps feet cool all day",
    ],

    // Target Audience
    audienceTitle: "Built For All Purposes & Every Lifestyle",
    audienceList: [
      { role: "Nurses & Healthcare Staff", desc: "All-day soothing relief during grueling 12-hour shifts on hard hospital floors." },
      { role: "Construction & Warehouse", desc: "Maximum shock absorption inside heavy steel-toe work boots on concrete." },
      { role: "Runners & Athletes", desc: "Adds a spring to each step, improves gait alignment, and speeds recovery." },
      { role: "Daily Life & Walking", desc: "Better posture, spine alignment, and effortless pain-free daily steps." },
    ],

    // Clinical Stats
    statsTitle: "The Future Is Foot Pain-Free",
    statsSubtitle: "Results according to clinical & consumer studies on over 1,000 users :",
    stats: [
      { percent: "95%", label: "Reduced Foot Pain", desc: "Arch support & cushioning significantly relieve heel & plantar pain" },
      { percent: "94%", label: "Improved Comfort", desc: "All-day comfort with every step, minimizing daily fatigue" },
      { percent: "90%", label: "Reduced Injury Risk", desc: "Deep shock absorption protects ankles, knees, and back" },
    ],

    // Comparison Table
    comparisonTitle: "What Makes These Insoles So Special Compared to Others?",
    compHeaders: { feature: "Feature", us: "Pro Acupressure Insoles", them: "Standard Insoles" },
    compRows: [
      { feature: "Active Acupressure Massage Nodes", us: "Yes, built-in", them: "None" },
      { feature: "Targeted Arch Support for Plantar Fasciitis", us: "Deep 3D support", them: "Flat & useless" },
      { feature: "Impact Shock Absorption on Concrete", us: "High-grade cushion", them: "Weak foam" },
      { feature: "Anti-Odor & Breathable Ventilation", us: "Moisture-wicking", them: "Traps sweat" },
      { feature: "Lifespan & Washable", us: "12+ months", them: "Fails in weeks" },
      { feature: "Trimmable With Scissors to Any Shoe", us: "Clear cut lines", them: "Hard to resize" },
    ],

    // Doctor
    doctorTag: "Podiatrist & Orthopedic Recommendation",
    doctorName: "Dr. Thomas Schneider, DPM",
    doctorRole: "Board-Certified Foot & Ankle Specialist",
    doctorQuote: "Having treated thousands of patients suffering from plantar fasciitis and debilitating heel pain, I consistently recommend these orthotic massage insoles. The anatomical contour relieves strain on the plantar fascia band while redistributing ground reaction forces away from the heel.",

    // Bonus eBook
    ebookTitle: "Free Bonus Gift With Every Order ! 🎁",
    ebookSubtitle: "Complete Digital Guide: Foot Health Mastery & Pain-Free Living eBook",
    ebookValue: "Valued at $20.00 USD - 100% Free with your order today",

    // FAQ
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Will these insoles fit my shoes?",
        a: "Yes! They feature clear trimmable guideline marks on the back. Simply place your current insole on top as a guide and trim with scissors. Fits sizes EU 35 to 46 in sneakers, work boots, and casual shoes.",
      },
      {
        q: "Can they help my plantar fasciitis & heel spurs?",
        a: "Yes, absolutely! The deep arch support elevates the plantar fascia band, distributing your body weight across the entire foot bed instead of concentrating stress on the heel bone.",
      },
      {
        q: "Do you support secure international payments with Stripe and PayPal?",
        a: "Yes! We accept all major Credit and Debit Cards (Visa, MasterCard, American Express) via Stripe with 256-Bit SSL encryption and 3D Secure 2.0, as well as PayPal with PayPal Buyer Protection. We also offer Cash on Delivery for orders inside Morocco.",
      },
      {
        q: "How long do they last and how do I clean them?",
        a: "With daily wear, they are engineered to maintain their cushioning and support for over 12 months. They are easily washable by hand with mild soap and water.",
      },
      {
        q: "What is your satisfaction guarantee policy?",
        a: "We offer a 100% 30-Day Money-Back Guarantee. If you are not completely satisfied with the comfort and relief, contact us for an exchange or full refund.",
      },
    ],
  },
};

export const REVIEWS: Review[] = [
  {
    name: "مروان التازي (Marouane Tazi)",
    city: "الدار البيضاء (Casablanca)",
    rating: 5,
    roleAr: "عامل مستودع (9 ساعات وقوف)",
    roleEn: "Warehouse Worker (9h standing)",
    dateAr: "منذ يومين",
    dateEn: "2 days ago",
    textAr: "خدام فـ dépôt كنبقا واقف 9 دالسوايع نهار كامل فصباط السيكيريتي. هاد الفرشات بدلو ليا حياتي من أول نهار! مبقيتش كنحس بداك الحريق فالكعب فاش كنرجع للدار. أحسن استثمار درتو لصحتي.",
    textEn: "I spend 9 hours on concrete floors in steel toe boots. These insoles have incredible shock absorption. By hour 8 I used to limp from heel pain, now I walk home completely pain-free. Best money I ever spent.",
  },
  {
    name: "Sarah Jenkins",
    city: "London, United Kingdom",
    rating: 5,
    roleAr: "ممرضة بمستشفى (12 ساعة عمل)",
    roleEn: "ICU Registered Nurse (12h shifts)",
    dateAr: "منذ 3 أيام",
    dateEn: "3 days ago",
    textAr: "أنا ممرضة، كنت كنعاني بزاف من آلام أسفل الظهر والرجلين بسباب الجري والوقوف فالمستشفى. جربت بزاف دالفرشات العادية ولكن هاد النوع هو النمرة واحد! راحة فورية وخفة فالرجلين.",
    textEn: "As an ICU nurse doing 12-hour shifts on hard linoleum hospital floors, my feet and arches were on fire. The moment I placed these into my shoes, the arch support was life-changing. Zero heel throbbing and fast international shipping!",
  },
  {
    name: "David Miller",
    city: "New York, USA",
    rating: 5,
    roleAr: "رياضي وعداء",
    roleEn: "Marathon Runner & Fitness",
    dateAr: "منذ 5 أيام",
    dateEn: "5 days ago",
    textAr: "سلعة ممتازة ومطابقة تماماً، قصيتها على مقاس سبيدري ديالي 43 وجات لاصقة. والتوصيل فكازا كان فـ 24 ساعة والدفع حتى شفت السلعة عاد خلصت. شكراً لكم!",
    textEn: "Suffered from persistent plantar fasciitis for 8 months. Ordered the 3-pair bundle with PayPal checkout. Within 48 hours of wearing them, the morning heel stabbing sensation was 90% gone. Outstanding quality!",
  },
];
