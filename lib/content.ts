export type Lang = "ar" | "en";

export interface BundleOffer {
  qty: number;
  price: number;
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

export const PRODUCT_IMAGES = {
  orangeHero: "/images/orange_clean.webp",
  blackHero: "/images/black_clean.webp",
  greyHero: "/images/grey_clean.webp",
  features: "/images/features_clean.webp",
  benefits: "/images/benefits.webp",
  clinical: "/images/clinical_clean.webp",
  comparison: "/images/comparison_clean.webp",
  howToUse: "/images/howToUse_clean.webp",
  doctor: "/images/doctor_clean.webp",
  ebook: "/images/ebook_clean.jpg",
};

export const COLOR_OPTIONS = [
  { id: "orange", nameAr: "البرتقالي الأصلي", nameEn: "Signature Orange", hex: "#ea580c", image: PRODUCT_IMAGES.orangeHero },
  { id: "black", nameAr: "الأسود الأنيق", nameEn: "Classic Black", hex: "#1e293b", image: PRODUCT_IMAGES.blackHero },
  { id: "grey", nameAr: "الرمادي العصري", nameEn: "Modern Grey", hex: "#64748b", image: PRODUCT_IMAGES.greyHero },
];

export const SIZES = [
  { label: "EU 35-36 | UK 4", cm: "23.5 cm" },
  { label: "EU 37-38 | UK 5", cm: "24.5 cm" },
  { label: "EU 39-40 | UK 6", cm: "25.5 cm" },
  { label: "EU 41-42 | UK 7", cm: "26.5 cm" },
  { label: "EU 43-44 | UK 8", cm: "27.5 cm" },
  { label: "EU 45-46 | UK 9", cm: "28.5 cm" },
];

export const BUNDLE_OFFERS: BundleOffer[] = [
  {
    qty: 1,
    price: 199,
    originalPrice: 349,
    labelAr: "زوج واحد (1 Paire - عرض التجربة)",
    labelEn: "1 Pair (Starter Pack)",
    badgeAr: "توفير 35%",
    badgeEn: "SAVE 35%",
    saveAr: "وفر 150 درهم + كتاب مجاني",
    saveEn: "Save 150 DH + FREE eBook",
    isPopular: false,
  },
  {
    qty: 2,
    price: 299,
    originalPrice: 698,
    labelAr: "زوجين (2 Paires - الأكثر طلباً)",
    labelEn: "2 Pairs (Most Popular)",
    badgeAr: "🔥 الأكثر طلباً - خصم 45%",
    badgeEn: "🔥 Most Popular - SAVE 45%",
    saveAr: "وفر 400 درهم (149 درهم للزوج) + كتاب مجاني",
    saveEn: "Save 400 DH (149 DH each) + FREE eBook",
    isPopular: true,
  },
  {
    qty: 3,
    price: 399,
    originalPrice: 1047,
    labelAr: "3 أزواج (3 Paires - العرض العائلي)",
    labelEn: "3 Pairs (Family Value Pack)",
    badgeAr: "وفر 55%",
    badgeEn: "SAVE 55%",
    saveAr: "وفر 650 درهم (133 درهم للزوج) + كتاب مجاني",
    saveEn: "Save 650 DH (133 DH each) + FREE eBook",
    isPopular: false,
  },
  {
    qty: 5,
    price: 599,
    originalPrice: 1745,
    labelAr: "5 أزواج (5 Paires - أفضل قيمة توفير)",
    labelEn: "5 Pairs (Best Value Pack)",
    badgeAr: "💥 خصم 60% أقصى توفير",
    badgeEn: "💥 Best Value - SAVE 60%",
    saveAr: "وفر 1146 درهم (119 درهم للزوج) + كتاب مجاني",
    saveEn: "Save 1146 DH (119 DH each) + FREE eBook",
    isPopular: false,
  },
];

export const MOROCCAN_CITIES = [
  "الدار البيضاء (Casablanca)",
  "الرباط (Rabat)",
  "مراكش (Marrakech)",
  "طنجة (Tanger)",
  "فاس (Fès)",
  "أكادير (Agadir)",
  "مكناس (Meknès)",
  "وجدة (Oujda)",
  "القنيطرة (Kénitra)",
  "تطوان (Tétouan)",
  "تمارة (Témara)",
  "سلا (Salé)",
  "المحمدية (Mohammedia)",
  "الجديدة (El Jadida)",
  "بني ملال (Béni Mellal)",
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
    announcement: "🔥 تخفيض حصري يصل إلى 60% • شحن سريع والدفع عند الاستلام بالمغرب • كتاب إلكتروني مجاني 🎁",
    brandTitle: "فرشات التدليك الطبية المريحة",
    brandSubtitle: "الفرشات الطبية المبتكرة بنقاط الأكيوبريسور ودعم تقوس القدم",
    ratingText: "تقييم 4.8 / 5 | أكثر من 88,000 زبون راضٍ",
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
    orderSectionTitle: "طلب سريع • الدفع نقداً عند استلام ومعاينة المنتج",
    orderSectionSubtitle: "املأ معلوماتك وسنتصل بك لتأكيد الطلب وإرساله إلى باب منزلك",
    fullNameLabel: "الاسم الكامل (الاسم والنسب) *",
    fullNamePlaceholder: "مثال: يوسف التازي",
    phoneLabel: "رقم الهاتف للتواصل وتأكيد الإرسال *",
    phonePlaceholder: "06 XX XX XX XX",
    cityLabel: "المدينة *",
    addressLabel: "عنوان التوصيل بالتفصيل *",
    addressPlaceholder: "الحي، الشارع، رقم المنزل...",
    shippingFreeCasa: "مجاني بالدار البيضاء (0 درهم) 🎉",
    shippingOther: "+30 درهم (خارج الدار البيضاء)",
    shippingLabel: "مصاريف التوصيل :",
    totalLabel: "المجموع الكلي للدفع عند الاستلام :",
    ctaButton: "تأكيد الطلب الآن • الدفع عند الاستلام",
    ctaSubtext: "🔒 لا تدفع أي درهم مسبقاً • عاين المنتج وتأكد من جودته ثم ادفع نقداً",
    whatsappBtn: "تواصل عبر واتساب لمتابعة طلبك",
    
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
    ebookValue: "بقيمة 150 درهم - مجاناً تماماً مع طلبك اليوم",

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
        q: "هل تناسب أحذية العمل والأحذية الرياضية؟",
        a: "نعم، تصميمها الذكي يناسب الأحذية الرياضية (Sneakers)، أحذية السلامة والعمل، الأحذية الكلاسيكية، والأحذية اليومية دون أن تجعل حذاءك ضيقاً.",
      },
      {
        q: "كم تدوم الفرشات وكيف أنظفها؟",
        a: "تدوم لأكثر من 12 شهراً مع الاستخدام اليومي بفضل متانة خاماتها. يمكنك غسلها بسهولة يدوياً بالماء والصابون وتركها تجف طبيعياً.",
      },
      {
        q: "كيف يعمل الدفع والتوصيل بالمغرب؟",
        a: "لا تدفع أي درهم مسبقاً! تقوم فقط بملء الاستمارة برقم هاتفك ومدينتك، نتصل بك لتأكيد الطلب، ويصلك الموزع حتى باب بيتك خلال 24 إلى 48 ساعة مع إمكانية فحص الطرد قبل الدفع نقداً.",
      },
    ],
  },

  en: {
    announcement: "🔥 SAVE UP TO 60% • FAST COD SHIPPING IN MOROCCO • FREE FOOT HEALTH EBOOK 🎁",
    brandTitle: "Medical Acupressure Massage Insoles",
    brandSubtitle: "Orthopedic Acupressure & Arch Support Insoles",
    ratingText: "Excellent 4.8 | 88,552 Verified Reviews",
    heroTitle: "Every Step Shouldn't Hurt. Soothing Comfort & Pain Relief For Every Step!",
    heroDesc: "You wake up, put your feet on the floor, and feel it — that familiar ache that follows you through the whole day. Whether it's plantar fasciitis, tired arches, or long shifts, these medical acupressure insoles stimulate circulation, absorb impact, and relieve pain naturally.",
    quickBullets: [
      "✔ Instant relief from plantar fasciitis & heel spurs",
      "✔ Podiatrist recommended arch support & acupressure nodes",
      "✔ Trimmable cut-to-fit design fits sneakers, boots, and dress shoes",
    ],
    colorTitle: "Select Insole Color :",
    sizeTitle: "Select Shoe Size :",
    sizeHint: "✂️ Trimmable edges on back. Simply cut with scissors for a custom fit.",
    offersTitle: "Bundle Offers (Choose your pack) :",
    orderSectionTitle: "Express Order • Cash On Delivery in Morocco",
    orderSectionSubtitle: "Fill in your details below. We will call you to confirm and deliver right to your door.",
    fullNameLabel: "Full Name *",
    fullNamePlaceholder: "e.g. Karim Benani",
    phoneLabel: "Phone Number for delivery confirmation *",
    phonePlaceholder: "06 XX XX XX XX",
    cityLabel: "City *",
    addressLabel: "Full Delivery Address *",
    addressPlaceholder: "Street, District, Apartment / Building number...",
    shippingFreeCasa: "FREE in Casablanca (0 DH) 🎉",
    shippingOther: "+30 DH (Outside Casablanca)",
    shippingLabel: "Shipping Fee :",
    totalLabel: "Total Net to Pay Upon Delivery (COD) :",
    ctaButton: "ORDER NOW • CASH ON DELIVERY",
    ctaSubtext: "🔒 No upfront payment required • Inspect your package upon arrival then pay cash",
    whatsappBtn: "Contact on WhatsApp for fast support",
    
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
      { feature: "Easy Trim-To-Fit in any shoe", us: "Clear cut lines", them: "Hard to adjust" },
    ],

    // Doctor
    doctorTag: "Podiatrist Recommended",
    doctorName: "Dr. Thomas Schneider",
    doctorRole: "Certified Podiatrist & Foot Health Specialist",
    doctorQuote: "As a podiatrist with years of experience treating patients with foot conditions like flat feet and plantar fasciitis, I recommend these orthopedic acupressure insoles. The unique design provides targeted relief to the arches, helping to distribute pressure evenly and reduce strain on the plantar fascia. I confidently endorse them as an essential addition to your footwear.",

    // Bonus eBook
    ebookTitle: "FREE Exclusive eBook With Every Order! 🎁",
    ebookSubtitle: "Foot Health Mastery: Your Comprehensive Guide to Happy, Pain-Free Feet",
    ebookValue: "Worth 150 DH — Included 100% FREE with your order today",

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
        q: "How long do they last?",
        a: "With daily wear, they are engineered to maintain their cushioning and support for over 12 months. They are easily washable by hand with mild soap and water.",
      },
      {
        q: "How does Cash On Delivery (COD) work in Morocco?",
        a: "You do not pay anything online! Simply enter your name, phone number, and city. Our Moroccan team will call you to confirm your address, and our courier delivers within 24 to 48 hours. You inspect the parcel and pay cash upon delivery.",
      },
      {
        q: "What if I am not satisfied?",
        a: "We offer a 100% money-back satisfaction guarantee. If your feet don't feel significantly better, contact us on WhatsApp for a hassle-free exchange or refund.",
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
    name: "سناء الفاسي (Sanaa El Fassi)",
    city: "الرباط (Rabat)",
    rating: 5,
    roleAr: "ممرضة بمستشفى (12 ساعة عمل)",
    roleEn: "Hospital Nurse (12h shifts)",
    dateAr: "منذ 3 أيام",
    dateEn: "3 days ago",
    textAr: "أنا ممرضة، كنت كنعاني بزاف من آلام أسفل الظهر والرجلين بسباب الجري والوقوف فالمستشفى. جربت بزاف دالفرشات العادية ولكن هاد النوع هو النمرة واحد! راحة فورية وخفة فالرجلين.",
    textEn: "As a nurse doing 12-hour shifts, my feet used to be on fire. The moment I slipped these insoles in, the arch support was unbelievable. Zero heel pain and my lower back feels so much better.",
  },
  {
    name: "هشام العمراني (Hicham Amrani)",
    city: "مراكش (Marrakech)",
    rating: 5,
    roleAr: "رياضي وعداء",
    roleEn: "Runner & Fitness",
    dateAr: "منذ 5 أيام",
    dateEn: "5 days ago",
    textAr: "سلعة ممتازة ومطابقة تماماً، قصيتها على مقاس سبيدري ديالي 43 وجات لاصقة. والتوصيل فكازا كان فـ 24 ساعة والدفع حتى شفت السلعة عاد خلصت. شكراً لكم!",
    textEn: "I run 10k regularly and suffered from arch soreness. Trimmed them to size 43, fits like a glove. Fast delivery in Morocco and paid cash at the door. Highly recommend!",
  },
];
