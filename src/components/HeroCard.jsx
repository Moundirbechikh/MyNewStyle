import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; 
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  {
    id: 1,
    nameKey: "bestseller_1_name", 
    catKey: "bestseller_1_cat", // Ex: T-Shirt Homme
    // Image de T-shirt
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    nameKey: "bestseller_2_name", 
    catKey: "bestseller_2_cat", // Ex: Hoodie Femme
    // Image de Hoodie
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    nameKey: "bestseller_3_name", 
    catKey: "bestseller_3_cat", // Ex: Pantalon Homme
    // Image de Pantalon
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop"
  }
];

function HeroCard() {
  const { t } = useTranslation(); 
  const [currentIndex, setCurrentIndex] = useState(0);

  // Changement automatique toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentItem = items[currentIndex];

  return (
    <div className="bg-white/95 backdrop-blur-md px-5 pt-5 w-96 h-[75vh] max-h-[700px] flex flex-col rounded-tl-[3rem] rtl:rounded-tl-none rtl:rounded-tr-[3rem] shadow-2xl border-t border-l rtl:border-l-0 rtl:border-r border-white/40 pointer-events-auto">
      
      {/* Zone Image : Prend tout l'espace disponible (flex-1) */}
      <div className="flex-1 w-full bg-gray-100 rounded-tl-[2rem] rtl:rounded-tl-none rtl:rounded-tr-[2rem] rounded-br-[1rem] rtl:rounded-br-none rtl:rounded-bl-[1rem] overflow-hidden relative shadow-inner">
        {items.map((item, index) => (
          <img
            key={item.id}
            src={item.image}
            alt={t(item.nameKey)} 
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Zone Contenu (Sans description, avec transitions de texte) */}
      <div className="mt-6 px-2 pb-5 flex flex-col gap-4">
        
        {/* AnimatePresence permet d'animer l'élément qui sort et celui qui entre */}
        <div className="h-14 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <p className="font-clean text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">
                {t(currentItem.catKey)} 
              </p>
              <h3 className="font-clean font-bold text-gray-900 text-xl mt-1">
                {t(currentItem.nameKey)} 
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bouton "Voir plus" */}
        <button className="w-full py-3.5 border border-[#1b2a4a] text-[#1b2a4a] text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#1b2a4a] hover:text-white transition-colors duration-300 font-clean flex items-center justify-center gap-2 whitespace-nowrap">
          {t('btn_see_more')} 
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180 transition-transform">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
      
    </div>
  );
}

export default HeroCard;