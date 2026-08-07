import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

function Reviews() {
  const { t } = useTranslation();
  const carouselRef = useRef(null);

  // Les 5 avis (le 4 et 5 reprennent les données du 2 et 1 pour la boucle)
  const reviewsData = [
    { id: 1, nameKey: "rev_1_name", roleKey: "rev_1_role", textKey: "rev_1_text", initials: "JD" },
    { id: 2, nameKey: "rev_2_name", roleKey: "rev_2_role", textKey: "rev_2_text", initials: "SM" },
    { id: 3, nameKey: "rev_3_name", roleKey: "rev_3_role", textKey: "rev_3_text", initials: "MR" },
    { id: 4, nameKey: "rev_2_name", roleKey: "rev_2_role", textKey: "rev_2_text", initials: "SM" },
    { id: 5, nameKey: "rev_1_name", roleKey: "rev_1_role", textKey: "rev_1_text", initials: "JD" }
  ];

  const [desktopReviews, setDesktopReviews] = useState(reviewsData);

  // 1. Intervalle Desktop : Décale le tableau pour créer la boucle infinie (Toutes les 4.5s)
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth >= 1024) {
        setDesktopReviews((prev) => {
          const newArr = [...prev];
          const first = newArr.shift(); // Retire le 1er élément
          newArr.push(first); // Le replace à la fin
          return newArr;
        });
      }
    }, 4500); 

    return () => clearInterval(interval);
  }, []);

  // 2. Intervalle Mobile : Scroll original (Toutes les 6s)
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 1024 && carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
        }
      }
    }, 6000); 

    return () => clearInterval(interval);
  }, []);

  const StarRating = () => (
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, index) => (
        <svg key={index} className="w-5 h-5 text-[#1b2a4a]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );

  // Fonction pour ne pas dupliquer le HTML de la carte
  const renderCardContent = (review) => (
    <>
      <div>
        <StarRating />
        <p className="text-gray-700 font-clean text-base lg:text-lg leading-relaxed italic mb-8">
          "{t(review.textKey)}"
        </p>
      </div>

      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
        <div className="w-12 h-12 shrink-0 bg-[#1b2a4a] rounded-full flex items-center justify-center text-white font-bold font-clean tracking-wider shadow-md">
          {review.initials}
        </div>
        
        <div className="flex flex-col">
          <span className="text-[#161f33] font-bold font-clean text-base">
            {t(review.nameKey)}
          </span>
          <span className="text-[#1b2a4a]/70 font-clean text-xs font-semibold uppercase tracking-wider mt-0.5">
            {t(review.roleKey)}
          </span>
        </div>
      </div>
    </>
  );

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  };

  // Animation de haut en bas (clipPath) partagée
  const cardVariants = {
    hidden: { clipPath: "inset(0% 0% 100% 0%)", opacity: 0, y: -20 },
    visible: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="bg-[#f5f2eb]/70 py-20 px-6 md:px-16 lg:px-20 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col justify-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center px-6 mb-12 lg:mb-16"
        >
          <h2 className="text-4xl md:text-5xl rtl:text-4xl rtl:md:text-5xl text-[#161f33] font-clean font-bold tracking-tighter">
            {t('sec_reviews_title')}
          </h2>
        </motion.div>

        {/* ========================================= */}
        {/* VERSION MOBILE / TABLETTE (Le scroll original) */}
        {/* ========================================= */}
        <motion.div 
          ref={carouselRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex lg:hidden gap-6 px-2 md:px-0 overflow-x-auto snap-x snap-mandatory touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 pt-4"
        >
          {reviewsData.map((review) => (
            <motion.div 
              key={`mobile-${review.id}`}
              variants={cardVariants}
              className="w-[85vw] md:w-[45vw] shrink-0 snap-center group bg-white/95 backdrop-blur-md p-8 flex flex-col justify-between rounded-tl-[3rem] rtl:rounded-tl-none rtl:rounded-tr-[3rem] rounded-br-[1.5rem] rtl:rounded-br-none rtl:rounded-bl-[1.5rem] shadow-xl border border-[#1b2a4a]"
            >
              {renderCardContent(review)}
            </motion.div>
          ))}
        </motion.div>

        {/* ========================================= */}
        {/* VERSION DESKTOP (Boucle avec transition haut en bas) */}
        {/* ========================================= */}
        <div className="hidden lg:flex gap-8 justify-center overflow-hidden pb-8 pt-4">
          <AnimatePresence mode="popLayout">
            {desktopReviews.slice(0, 3).map((review) => (
              <motion.div 
                layout
                key={`desktop-${review.id}`}
                // Utilisation de la même animation d'apparition de haut en bas (inset clip-path)
                initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0, y: -20 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0 }}
                exit={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="w-[350px] shrink-0 group bg-white/95 backdrop-blur-md p-10 flex flex-col justify-between rounded-tl-[3rem] rtl:rounded-tl-none rtl:rounded-tr-[3rem] rounded-br-[1.5rem] rtl:rounded-br-none rtl:rounded-bl-[1.5rem] shadow-xl hover:shadow-2xl border border-[#1b2a4a] transition-shadow duration-500"
              >
                {renderCardContent(review)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

export default Reviews;