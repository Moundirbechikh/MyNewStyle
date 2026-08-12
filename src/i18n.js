import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navbar
      "nav_home": "Home",
      "nav_shop": "Shop",
      "nav_new": "New Arrivals",
      "nav_categories": "Categories",
      "nav_about": "About",
      "nav_contact": "Contact",
      
      // Hero
      "hero_title": "Wear Your Confidence.",
      "hero_desc": "Discover premium t-shirts, hoodies, and pants designed for everyday comfort and timeless style.",
      "btn_shop": "Shop Now",
      "btn_explore": "Explore Collection",
      
      // HeroCard (Best Sellers)
      "bestseller_1_name": "Premium Blank Tee",
      "bestseller_1_cat": "Men's T-Shirt",
      "bestseller_2_name": "Signature Cozy Hoodie",
      "bestseller_2_cat": "Women's Hoodie",
      "bestseller_3_name": "Tailored Cargo Pants",
      "bestseller_3_cat": "Men's Pants",
      "btn_see_more": "See more",

      // Shop By Category Section (Mis à jour)
      "sec_category_title": "Our Entire Collection",
      "sec_category_desc": "Essentials for every wardrobe",
      "btn_view_all": "View all",
      "cat_tshirts": "T-Shirts",
      "cat_hoodies": "Hoodies",
      "cat_pants": "Pants",
      "btn_cat_explore": "Explore",

      // Why Us Section
      "sec_why_badge": "THE MYNEWSTYLE EXPERIENCE",
      "sec_why_title": "Why Order With Us?",
      "sec_why_desc": "We combine premium craftsmanship, timeless cuts, and seamless delivery to offer you unmatched confidence.",
      
      "why_1_title": "Premium Fabrics",
      "why_1_desc": "100% heavyweight breathable cotton and high-grade finishes built to withstand daily wear and washing.",
      "why_2_title": "Perfect Tailored Fit",
      "why_2_desc": "Designed to drape naturally on your body, giving you effortless elegance and comfort all day long.",
      "why_3_title": "Fast & Safe Shipping",
      "why_3_desc": "Quick order processing and direct delivery straight to your doorstep with real-time tracking updates.",
      "why_4_title": "Guaranteed Satisfaction",
      "why_4_desc": "Easy exchanges and a dedicated customer service team ready to assist you whenever you need.",

      // Reviews Section
      "sec_reviews_title": "What Our Customers Say",
      "rev_1_name": "James D.",
      "rev_1_role": "Verified Buyer",
      "rev_1_text": "The quality of these basics is unprecedented. The heavyweight tee has become my everyday go-to.",
      "rev_2_name": "Sarah M.",
      "rev_2_role": "Verified Buyer",
      "rev_2_text": "I'm obsessed with the tailored fit of the pants. They are so comfortable yet look incredibly chic.",
      "rev_3_name": "Michael R.",
      "rev_3_role": "Verified Buyer",
      "rev_3_text": "Minimalist perfection. The signature hoodie is the most comfortable piece of clothing I own.",

      // 3D Card & Buttons (Textes originaux + Nouveaux ajouts)
      "card_3d_front_text": "Pure elegance, tailored to elevate your everyday life.",
      "card_3d_back_title": "Our Collection",
      "card_3d_back_text": "Discover numerous exclusive items and explore our latest online catalog.",
      "btn_see_more_3d": "See More",
      
      "card_women_front": "Women",
      "card_women_back_title": "Women's Collection",
      "card_women_back_desc": "Discover our exclusive selection of oversized hoodies, premium t-shirts, and trendy pants, available in a wide range of colors.",
      "card_men_front": "Men",
      "card_men_back_title": "Men's Collection",
      "card_men_back_desc": "Explore our range of urban wear: comfortable hoodies, essential t-shirts, and stylish pants, available in multiple colors.",
      "mobile_desc": "Discover our hoodies, t-shirts, and pants available in a wide range of colors.",

      // Footer
      "footer_desc": "Elevating your everyday wardrobe with premium essentials and timeless aesthetics.",
      "footer_links": "Quick Links",
      "footer_order_title": "Direct Order",
      "footer_order_desc": "All orders are handled directly by our team to ensure a personalized experience.",
      "footer_phone": "Phone / WhatsApp",
      "footer_email": "Customer Support (Email)",
      "footer_terms": "Terms of Service",
      "footer_privacy": "Privacy Policy",
      "footer_rights": "© 2026 MyNewStyle. All rights reserved.",
      
      // --- Shop Section & Filtres ---
      "shop_title": "Explore Our Collection",
      "shop_desc": "Find the perfect pieces with our precision filtering system.",
      "filter_adv": "Advanced Filters",
      "filter_reset": "Reset",
      "filter_search": "Search",
      "filter_search_placeholder": "Item name...",
      "filter_gender": "Gender",
      "filter_all": "All",
      "filter_men": "Men",
      "filter_women": "Women",
      "filter_unisex": "Unisex",
      "filter_category": "Category",
      "filter_cat_all": "All categories",
      "filter_price_max": "Max Price",
      "filter_size": "Size",
      "filter_size_all": "All",
      "shop_empty": "No items match your search criteria.",

      // --- Product Card ---
      "prod_stock": "Stock",
      "prod_out_of_stock": "Out of stock",
      "prod_add_cart": "Add to cart",
      "prod_unavailable": "Unavailable"
    }
  },
  fr: {
    translation: {
      // Navbar
      "nav_home": "Accueil",
      "nav_shop": "Boutique",
      "nav_new": "Nouveautés",
      "nav_categories": "Catégories",
      "nav_about": "À Propos",
      "nav_contact": "Contact",
      
      // Hero
      "hero_title": "Portez Votre Confiance.",
      "hero_desc": "Découvrez des t-shirts, sweats à capuche et pantalons haut de gamme conçus pour le confort quotidien et un style intemporel.",
      "btn_shop": "Acheter",
      "btn_explore": "Explorer la Collection",
      
      // HeroCard (Best Sellers)
      "bestseller_1_name": "T-shirt Vierge Premium",
      "bestseller_1_cat": "T-shirt Homme",
      "bestseller_2_name": "Hoodie Confort Signature",
      "bestseller_2_cat": "Sweat à capuche Femme",
      "bestseller_3_name": "Pantalon Cargo Ajusté",
      "bestseller_3_cat": "Pantalon Homme",
      "btn_see_more": "Voir plus",

      // Shop By Category Section (Mis à jour)
      "sec_category_title": "L'intégralité de nos articles",
      "sec_category_desc": "Les essentiels pour chaque garde-robe",
      "btn_view_all": "Voir tout",
      "cat_tshirts": "T-Shirts",
      "cat_hoodies": "Sweats à capuche",
      "cat_pants": "Pantalons",
      "btn_cat_explore": "Explorer",

      // Why Us Section
      "sec_why_badge": "L'EXPÉRIENCE MYNEWSTYLE",
      "sec_why_title": "Pourquoi Commander Chez Nous ?",
      "sec_why_desc": "Nous associons finitions de qualité, coupes intemporelles et livraison rapide pour vous garantir une satisfaction totale.",
      
      "why_1_title": "Tissus Haut de Gamme",
      "why_1_desc": "100% coton épais et respirant, conçu avec des finitions durables pour résister au temps et aux lavages.",
      "why_2_title": "Coupe & Confort Parfaits",
      "why_2_desc": "Pensé pour épouser naturellement votre silhouette avec une élégance et une aisance naturelles au quotidien.",
      "why_3_title": "Livraison Rapide & Sûre",
      "why_3_desc": "Traitement prioritaire et expédition directe à votre porte avec un suivi clair de votre commande.",
      "why_4_title": "Satisfaction Garantie",
      "why_4_desc": "Échanges simplifiés et service client réactif toujours à votre écoute pour vous accompagner.",

      // Reviews Section
      "sec_reviews_title": "Ce Que Nos Clients Disent",
      "rev_1_name": "James D.",
      "rev_1_role": "Acheteur Vérifié",
      "rev_1_text": "La qualité de ces basiques est sans précédent. Le t-shirt épais est devenu mon incontournable.",
      "rev_2_name": "Sarah M.",
      "rev_2_role": "Acheteuse Vérifiée",
      "rev_2_text": "Je suis obsédée par la coupe parfaite des pantalons. Ils sont incroyablement confortables tout en restant chics.",
      "rev_3_name": "Michael R.",
      "rev_3_role": "Acheteur Vérifié",
      "rev_3_text": "La perfection minimaliste. Le hoodie signature est la pièce la plus confortable que je possède.",

      // 3D Card & Buttons (Textes originaux + Nouveaux ajouts)
      "card_3d_front_text": "L'élégance à l'état pur, taillée pour sublimer votre quotidien.",
      "card_3d_back_title": "Notre Collection",
      "card_3d_back_text": "Découvrez de nombreux articles exclusifs et explorez notre tout dernier catalogue en ligne.",
      "btn_see_more_3d": "Voir Plus",
      
      "card_women_front": "Femme",
      "card_women_back_title": "Collection Femme",
      "card_women_back_desc": "Découvrez notre sélection exclusive de hoodies oversize, t-shirts premium et pantalons tendance, disponibles dans une large gamme de couleurs.",
      "card_men_front": "Homme",
      "card_men_back_title": "Collection Homme",
      "card_men_back_desc": "Explorez notre gamme de vêtements urbains : hoodies confortables, t-shirts essentiels et pantalons stylés, déclinés dans de multiples coloris.",
      "mobile_desc": "Découvrez nos hoodies, t-shirts et pantalons disponibles dans une large gamme de couleurs.",

      // Footer
      "footer_desc": "Élever votre garde-robe quotidienne avec des essentiels premium et une esthétique intemporelle.",
      "footer_links": "Liens Rapides",
      "footer_order_title": "Commander Directement",
      "footer_order_desc": "Toutes nos commandes sont traitées directement par notre équipe pour vous assurer une expérience sur mesure.",
      "footer_phone": "Téléphone / WhatsApp",
      "footer_email": "Support Client (E-mail)",
      "footer_terms": "Conditions d'utilisation",
      "footer_privacy": "Politique de confidentialité",
      "footer_rights": "© 2026 MyNewStyle. Tous droits réservés.",
      
      // --- Shop Section & Filtres ---
      "shop_title": "Explorer notre Collection",
      "shop_desc": "Trouvez les pièces idéales grâce à notre système de filtrage de précision.",
      "filter_adv": "Filtres Avancés",
      "filter_reset": "Réinitialiser",
      "filter_search": "Rechercher",
      "filter_search_placeholder": "Nom de l'article...",
      "filter_gender": "Genre / Sexe",
      "filter_all": "Tous",
      "filter_men": "Homme",
      "filter_women": "Femme",
      "filter_unisex": "Unisexe",
      "filter_category": "Catégorie",
      "filter_cat_all": "Toutes les catégories",
      "filter_price_max": "Prix Max",
      "filter_size": "Taille",
      "filter_size_all": "Toutes",
      "shop_empty": "Aucun article ne correspond à vos critères de recherche.",

      // --- Product Card ---
      "prod_stock": "Stock",
      "prod_out_of_stock": "Rupture",
      "prod_add_cart": "Ajouter au panier",
      "prod_unavailable": "Indisponible"
    }
  },
  ar: {
    translation: {
      // Navbar
      "nav_home": "الرئيسية",
      "nav_shop": "المتجر",
      "nav_new": "وصل حديثاً",
      "nav_categories": "الأقسام",
      "nav_about": "من نحن",
      "nav_contact": "اتصل بنا",
      
      // Hero
      "hero_title": "ارتدِ ثقتك.",
      "hero_desc": "اكتشف قمصان، سترات وسراويل عالية الجودة مصممة للراحة اليومية والأناقة الدائمة.",
      "btn_shop": "تسوق الآن",
      "btn_explore": "اكتشف التشكيلة",
      
      // HeroCard (Best Sellers)
      "bestseller_1_name": "تي شيرت سادة فاخر",
      "bestseller_1_cat": "تي شيرت رجالي",
      "bestseller_2_name": "سترة مريحة مميزة",
      "bestseller_2_cat": "سترة نسائية",
      "bestseller_3_name": "سروال كارغو مفصل",
      "bestseller_3_cat": "سروال رجالي",
      "btn_see_more": "رؤية المزيد",

      // Shop By Category Section (Mis à jour)
      "sec_category_title": "جميع منتجاتنا",
      "sec_category_desc": "أساسيات لكل خزانة ملابس",
      "btn_view_all": "عرض الكل",
      "cat_tshirts": "تي شيرتات",
      "cat_hoodies": "سترات",
      "cat_pants": "سراويل",
      "btn_cat_explore": "اكتشف",

      // Why Us Section
      "sec_why_badge": "تجربة MYNEWSTYLE",
      "sec_why_title": "لماذا تطلب منا؟",
      "sec_why_desc": "نحن نجمع بين الحرفية العالية، القصات الدائمة والتوصيل السلس لنقدم لك ثقة لا مثيل لها.",
      
      "why_1_title": "أقمشة فاخرة",
      "why_1_desc": "قطن 100% ثقيل الوزن وقابل للتنفس بلمسات نهائية عالية الجودة لتحمل الاستخدام والغسيل اليومي.",
      "why_2_title": "قصة مفصلة مثالية",
      "why_2_desc": "مصممة لتنسدل بشكل طبيعي على جسمك، مما يمنحك أناقة وراحة طوال اليوم.",
      "why_3_title": "شحن سريع وآمن",
      "why_3_desc": "معالجة سريعة للطلبات وتوصيل مباشر إلى باب منزلك مع تحديثات تتبع في الوقت الفعلي.",
      "why_4_title": "رضا مضمون",
      "why_4_desc": "استبدال سهل وفريق خدمة عملاء مخصص جاهز لمساعدتك وقتما تشاء.",

      // Reviews Section
      "sec_reviews_title": "ماذا يقول عملاؤنا",
      "rev_1_name": "جيمس د.",
      "rev_1_role": "مشتري معتمد",
      "rev_1_text": "جودة هذه الأساسيات غير مسبوقة. أصبح التي شيرت الثقيل هو خياري اليومي.",
      "rev_2_name": "سارة م.",
      "rev_2_role": "مشتري معتمد",
      "rev_2_text": "أنا مهووسة بالقصة المثالية للسراويل. إنها مريحة للغاية وتبدو أنيقة جداً.",
      "rev_3_name": "مايكل ر.",
      "rev_3_role": "مشتري معتمد",
      "rev_3_text": "الكمال البسيط. السترة المميزة هي أكثر قطعة ملابس مريحة أمتلكها.",

      // 3D Card & Buttons (Textes originaux + Nouveaux ajouts)
      "card_3d_front_text": "أناقة خالصة، مصممة للارتقاء بحياتك اليومية.",
      "card_3d_back_title": "تشكيلتنا",
      "card_3d_back_text": "اكتشف العديد من العناصر الحصرية وتصفح أحدث كتالوج عبر الإنترنت.",
      "btn_see_more_3d": "رؤية المزيد",
      
      "card_women_front": "نساء",
      "card_women_back_title": "تشكيلة النساء",
      "card_women_back_desc": "اكتشف تشكيلتنا الحصرية من السترات الفضفاضة، والقمصان الفاخرة، والسراويل العصرية، متوفرة بمجموعة واسعة من الألوان.",
      "card_men_front": "رجال",
      "card_men_back_title": "تشكيلة الرجال",
      "card_men_back_desc": "اكتشف مجموعتنا من الملابس الحضرية: سترات مريحة، قمصان أساسية وسراويل أنيقة، متوفرة بألوان متعددة.",
      "mobile_desc": "اكتشف ستراتنا، قمصاننا وسراويلنا المتوفرة بمجموعة واسعة من الألوان.",

      // Footer
      "footer_desc": "الارتقاء بخزانة ملابسك اليومية بأساسيات فاخرة وجماليات دائمة.",
      "footer_links": "روابط سريعة",
      "footer_order_title": "طلب مباشر",
      "footer_order_desc": "تتم معالجة جميع الطلبات مباشرة من قبل فريقنا لضمان تجربة مخصصة.",
      "footer_phone": "الهاتف / واتساب",
      "footer_email": "دعم العملاء (البريد الإلكتروني)",
      "footer_terms": "شروط الخدمة",
      "footer_privacy": "سياسة الخصوصية",
      "footer_rights": "© 2026 MyNewStyle. جميع الحقوق محفوظة.",
      
      // --- Shop Section & Filtres ---
      "shop_title": "اكتشف تشكيلتنا",
      "shop_desc": "ابحث عن القطع المثالية باستخدام نظام التصفية الدقيق الخاص بنا.",
      "filter_adv": "عوامل تصفية متقدمة",
      "filter_reset": "إعادة تعيين",
      "filter_search": "بحث",
      "filter_search_placeholder": "اسم العنصر...",
      "filter_gender": "الجنس",
      "filter_all": "الكل",
      "filter_men": "رجال",
      "filter_women": "نساء",
      "filter_unisex": "للجنسين",
      "filter_category": "القسم",
      "filter_cat_all": "جميع الأقسام",
      "filter_price_max": "الحد الأقصى للسعر",
      "filter_size": "المقاس",
      "filter_size_all": "الكل",
      "shop_empty": "لا توجد عناصر تطابق معايير البحث الخاصة بك.",

      // --- Product Card ---
      "prod_stock": "المخزون",
      "prod_out_of_stock": "نفد المخزون",
      "prod_add_cart": "أضف إلى السلة",
      "prod_unavailable": "غير متوفر"
    }
  }
};

i18n
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    resources,
    fallbackLng: 'en',
    debug: false, 
    interpolation: {
      escapeValue: false, 
    }
  });

// Gestion automatique de la direction (RTL/LTR)
i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = i18n.dir(lng);
  document.documentElement.lang = lng;
});

export default i18n;