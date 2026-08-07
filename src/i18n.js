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

      // Shop By Category Section
      "sec_category_title": "Shop by Category",
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

      // 3D Card & Buttons
      "card_3d_front_text": "Pure elegance, tailored to elevate your everyday life.",
      "card_3d_back_title": "Our Collection",
      "card_3d_back_text": "Discover numerous exclusive items and explore our latest online catalog.",
      "btn_see_more_3d": "See More",

      // Footer
      "footer_desc": "Elevating your everyday wardrobe with premium essentials and timeless aesthetics.",
      "footer_links": "Quick Links",
      "footer_order_title": "Direct Order",
      "footer_order_desc": "All orders are handled directly by our team to ensure a personalized experience.",
      "footer_phone": "Phone / WhatsApp",
      "footer_email": "Customer Support (Email)",
      "footer_terms": "Terms of Service",
      "footer_privacy": "Privacy Policy",
      "footer_rights": "© 2026 MyNewStyle. All rights reserved."
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

      // Shop By Category Section
      "sec_category_title": "Acheter par Catégorie",
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

      // 3D Card & Buttons
      "card_3d_front_text": "L'élégance à l'état pur, taillée pour sublimer votre quotidien.",
      "card_3d_back_title": "Notre Collection",
      "card_3d_back_text": "Découvrez de nombreux articles exclusifs et explorez notre tout dernier catalogue en ligne.",
      "btn_see_more_3d": "Voir Plus",

      // Footer
      "footer_desc": "Élever votre garde-robe quotidienne avec des essentiels premium et une esthétique intemporelle.",
      "footer_links": "Liens Rapides",
      "footer_order_title": "Commander Directement",
      "footer_order_desc": "Toutes nos commandes sont traitées directement par notre équipe pour vous assurer une expérience sur mesure.",
      "footer_phone": "Téléphone / WhatsApp",
      "footer_email": "Support Client (E-mail)",
      "footer_terms": "Conditions d'utilisation",
      "footer_privacy": "Politique de confidentialité",
      "footer_rights": "© 2026 MyNewStyle. Tous droits réservés."
    }
  },
  ar: {
    translation: {
      // Navbar
      "nav_home": "الرئيسية",
      "nav_shop": "المتجر",
      "nav_new": "وصلنا حديثاً",
      "nav_categories": "الفئات",
      "nav_about": "من نحن",
      "nav_contact": "اتصل بنا",
      
      // Hero
      "hero_title": "ارتدِ ثقتك.",
      "hero_desc": "اكتشف التيشيرتات، والهوديز، والبلاطين الفاخرة المصممة للراحة اليومية والأسلوب الخالد.",
      "btn_shop": "تسوق الآن",
      "btn_explore": "استكشف المجموعة",
      
      // HeroCard (Best Sellers)
      "bestseller_1_name": "تيشيرت سادة فاخر",
      "bestseller_1_cat": "تيشيرت رجالي",
      "bestseller_2_name": "هودي مريح مميز",
      "bestseller_2_cat": "هودي نسائي",
      "bestseller_3_name": "بنطلون كارغو مفصل",
      "bestseller_3_cat": "بنطلون رجالي",
      "btn_see_more": "عرض المزيد",

      // Shop By Category Section
      "sec_category_title": "تسوق حسب الفئة",
      "sec_category_desc": "أساسيات لكل خزانة ملابس",
      "btn_view_all": "عرض الكل",
      "cat_tshirts": "تيشيرتات",
      "cat_hoodies": "هوديز",
      "cat_pants": "بناطيل",
      "btn_cat_explore": "استكشف",

      // Why Us Section
      "sec_why_badge": "تجربة MYNEWSTYLE",
      "sec_why_title": "لماذا تشتري من متجرنا؟",
      "sec_why_desc": "نجمع بين جودة التصنيع العالية، والقصات الخالدة، والتوصيل السريع لنمنحك ثقة وأناقة لا مثيل لهما.",
      
      "why_1_title": "أقمشة فاخرة ممتازة",
      "why_1_desc": "قطن ثقيل 100% يدعم التهوية ومصمم بلمسات نهائية متينة ليدوم طويلاً.",
      "why_2_title": "قصة وتصميم مثاليان",
      "why_2_desc": "مصممة لتتناسب بسلاسة مع جسمك وتمنحك أناقة عفوية وراحة ممتدة طوال اليوم.",
      "why_3_title": "توصيل سريع وآمن",
      "why_3_desc": "شحن سريع ومباشر إلى باب منزلك مع إمكانية تتبع شحنتك وتحديثات مستمرة.",
      "why_4_title": "جودة ورضا مضمونان",
      "why_4_desc": "عملية استبدال سهلة وفريق خدمة عملاء مخصص في خدمتك في أي وقت.",

      // Reviews Section
      "sec_reviews_title": "ماذا يقول عملاؤنا",
      "rev_1_name": "جيمس د.",
      "rev_1_role": "مشتري موثق",
      "rev_1_text": "جودة هذه الأساسيات غير مسبوقة. أصبح التيشيرت الثقيل خياري اليومي.",
      "rev_2_name": "سارة م.",
      "rev_2_role": "مشترية موثقة",
      "rev_2_text": "أنا مهووسة بالقصة المثالية للبناطيل. مريحة جداً وأنيقة في نفس الوقت.",
      "rev_3_name": "مايكل ر.",
      "rev_3_role": "مشتري موثق",
      "rev_3_text": "الكمال البسيط. الهودي المميز هو القطعة الأكثر راحة لدي.",

      // 3D Card & Buttons
      "card_3d_front_text": "أناقة خالصة، مصممة لترتقي بحياتك اليومية.",
      "card_3d_back_title": "مجموعتنا",
      "card_3d_back_text": "اكتشف العديد من العناصر الحصرية وتصفح أحدث كتالوجاتنا عبر الإنترنت.",
      "btn_see_more_3d": "عرض المزيد",

      // Footer
      "footer_desc": "الارتقاء بخزانة ملابسك اليومية بأساسيات فاخرة وجماليات خالدة.",
      "footer_links": "روابط سريعة",
      "footer_order_title": "الطلب المباشر",
      "footer_order_desc": "يتم التعامل مع جميع طلباتنا مباشرة من قبل فريقنا لضمان تجربة مخصصة لك.",
      "footer_phone": "الهاتف / واتساب",
      "footer_email": "دعم العملاء (البريد الإلكتروني)",
      "footer_terms": "شروط الخدمة",
      "footer_privacy": "سياسة الخصوصية",
      "footer_rights": "© 2026 MyNewStyle. جميع الحقوق محفوظة."
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