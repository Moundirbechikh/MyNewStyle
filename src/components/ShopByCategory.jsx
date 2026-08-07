import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import shirt from '../assets/T-shirt.png';
import hoodie from '../assets/Hoodie.png';
import pants from '../assets/Pantalon.png';

function ShopByCategory() {
  const { t } = useTranslation();

  // Liste des catégories avec des visuels minimalistes et épurés
  const categories = [
    {
      id: 1,
      titleKey: "cat_tshirts",
      image: shirt,
      link: "/category/tshirts"
    },
    {
      id: 2,
      titleKey: "cat_hoodies",
      image: hoodie,
      link: "/category/hoodies"
    },
    {
      id: 3,
      titleKey: "cat_pants",
      image: pants,
      link: "/category/pants"
    }
  ];

  // Fonction pour générer une animation de glissement vers le haut avec un délai personnalisé
  const fadeUp = (delay) => ({
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, delay: delay, ease: "easeOut" } 
    }
  });

  return (
    // Fond beige chaud identique au thème du Hero
    // overflow-hidden évite l'apparition de barres de défilement pendant l'animation
    <section className="bg-[#f5f2eb]/70 py-20 px-6 md:px-16 lg:px-20 transition-colors duration-300 overflow-hidden">
      
      {/* motion.div conteneur qui détecte le scroll (whileInView) */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // L'animation se déclenche quand 10% de la section est visible (une seule fois)
        className="max-w-7xl mx-auto"
      >
        
        {/* En-tête de la section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          
          {/* Titre et description : Apparaît en premier (délai 0) */}
          <motion.div variants={fadeUp(0)}>
            <h2 className="text-4xl md:text-5xl rtl:text-4xl rtl:md:text-5xl text-[#161f33] font-clean tracking-tighter">
              {t('sec_category_title')}
            </h2>
            <p className="text-gray-600 text-base md:text-lg rtl:text-lg font-clean mt-2">
              {t('sec_category_desc')}
            </p>
          </motion.div>
          
          {/* Bouton "View All" : Apparaît en tout dernier (délai 0.8s) */}
          <motion.a 
            href="/categories" 
            variants={fadeUp(0.8)}
            className="group inline-flex items-center gap-2 text-sm rtl:text-base font-semibold text-[#1b2a4a] hover:opacity-75 transition-all font-clean tracking-wider uppercase"
          >
            {t('btn_view_all')}
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </motion.a>
        </div>

        {/* Grille des cartes stylisées à l'identique de HeroCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div 
              key={cat.id} 
              // Calcul dynamique du délai : Carte 1 = 0.2s, Carte 2 = 0.4s, Carte 3 = 0.6s
              variants={fadeUp(0.2 + (index * 0.2))} 
              className="group bg-white/95 backdrop-blur-md p-5 flex flex-col rounded-tl-[3rem] rtl:rounded-tl-none rtl:rounded-tr-[3rem] rounded-br-[1.5rem] rtl:rounded-br-none rtl:rounded-bl-[1.5rem] shadow-xl hover:shadow-2xl border-t border-l rtl:border-l-0 rtl:border-r border-white/60 transition-all duration-500 pointer-events-auto"
            >
              {/* Zone Image : identique au conteneur de HeroCard */}
              <div className="h-[350px] w-full bg-gray-100 rounded-tl-[2rem] rtl:rounded-tl-none rtl:rounded-tr-[2rem] rounded-br-[1rem] rtl:rounded-br-none rtl:rounded-bl-[1rem] overflow-hidden relative">
                <img 
                  src={cat.image} 
                  alt={t(cat.titleKey)} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </div>

              {/* Zone Contenu : Titre & Bouton uniquement */}
              <div className="mt-6 px-1 pb-1 flex flex-col gap-4">
                <h3 className="font-clean font-bold text-gray-900 text-2xl rtl:text-3xl transition-all duration-500">
                  {t(cat.titleKey)}
                </h3>

                <a 
                  href={cat.link}
                  className="w-full py-3.5 border border-[#1b2a4a] text-[#1b2a4a] text-xs rtl:text-sm font-bold uppercase tracking-widest rounded-full hover:bg-[#1b2a4a] hover:text-white transition-all duration-300 font-clean flex items-center justify-center gap-2 whitespace-nowrap shadow-sm hover:shadow-md"
                >
                  {t('btn_cat_explore')}
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="rtl:rotate-180"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}

export default ShopByCategory;