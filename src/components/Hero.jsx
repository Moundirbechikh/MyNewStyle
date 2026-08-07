import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import logo from '../assets/logostyle.png';
import bgVideo from '../assets/BG.mp4';
import HeroCard from './HeroCard';

// 1. Définition des animations (Variantes Framer Motion)
// Animation du conteneur parent pour créer un effet "cascade" (stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Délai de 0.2s entre l'apparition de chaque élément enfant
      delayChildren: 0.3,   // Le conteneur attend 0.3s avant de commencer
    },
  },
};

// Animation individuelle pour chaque élément textuel/bouton (glisse vers le haut)
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};

function Hero() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <section className="relative min-h-screen h-screen flex items-center px-6 md:px-16 lg:px-20 pt-36 pb-16 overflow-hidden">
      
      {/* Arrière-plan Vidéo */}
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Overlay semi-transparent */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#f5f2eb]/50 z-0"></div>

      {/* 2. Logo : Animation de descente (fade in down) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-6 md:left-6 top-6 cursor-pointer pointer-events-auto z-20"
      >
        <img src={logo} alt="MyNewStyle Logo" className="h-16 md:h-16 lg:h-24 object-contain" />
      </motion.div>

      {/* 3. Contenu Textuel et Boutons : Géré par le stagger (cascade) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-xl md:max-w-4xl space-y-2 rtl:space-y-4"
      >
        
        {/* Titre */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-8xl rtl:text-7xl rtl:md:text-[8rem] text-[#161f33] leading-[1.1] font-clean tracking-tighter"
        >
          {isAr ? (
              t('hero_title').split(' ').map((word, i) => (
                  <React.Fragment key={i}>
                    {word}{i === 0 && <br className="hidden sm:inline" />} 
                  </React.Fragment>
              ))
          ) : (
              <>Wear Your <br className="hidden sm:inline" /> Confidence.</>
          )}
        </motion.h1>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-gray-600 text-xl md:text-2xl rtl:text-2xl rtl:md:text-3xl leading-relaxed max-w-md rtl:max-w-lg font-clean"
        >
          {t('hero_desc')}
        </motion.p>

        {/* Boutons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-6 pointer-events-auto">
          <button className="bg-[#1b2a4a] hover:bg-[#121c33] text-white px-8 py-4 text-xs rtl:text-sm font-semibold tracking-widest uppercase rounded-2xl transition-all duration-300 shadow-md font-clean whitespace-nowrap">
            {t('btn_shop')}
          </button>
          
          <button className="bg-white hover:bg-gray-50 text-[#1b2a4a] px-8 py-4 text-xs rtl:text-sm font-semibold tracking-widest uppercase rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md font-clean whitespace-nowrap">
            {t('btn_explore')}
          </button>
        </motion.div>
      </motion.div>

      {/* 4. La HeroCard : Glisse depuis le côté selon la langue (RTL/LTR) */}
      <motion.div 
        initial={{ opacity: 0, x: isAr ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        className="hidden lg:block absolute bottom-0 right-0 rtl:right-auto rtl:left-0 z-20 pointer-events-auto"
      >
        <HeroCard />
      </motion.div>
      
    </section>
  );
}

export default Hero;