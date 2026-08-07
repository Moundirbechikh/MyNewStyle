import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import logo from '../assets/logostyle.png';
import bgVideo1 from '../assets/BG1.mp4';

function WhyUs() {
  const { t } = useTranslation();

  const reasons = [
    {
      id: "01",
      titleKey: "why_1_title",
      descKey: "why_1_desc",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"></path>
        </svg>
      )
    },
    {
      id: "02",
      titleKey: "why_2_title",
      descKey: "why_2_desc",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12l3 3 5-5"></path>
        </svg>
      )
    },
    {
      id: "03",
      titleKey: "why_3_title",
      descKey: "why_3_desc",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" rx="2"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
      )
    },
    {
      id: "04",
      titleKey: "why_4_title",
      descKey: "why_4_desc",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      )
    }
  ];

  // Le composant de la carte avec motion.div, délais personnalisés et le super effet Hover
  const SquareCard = ({ item, delay }) => (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} // Déclenche un peu avant que la carte ne soit totalement visible
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      className="group w-[85vw] md:w-full shrink-0 snap-center relative bg-white hover:bg-[#1b2a4a] p-6 lg:p-8 flex flex-col justify-center rounded-none shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-2 transition-all duration-500 h-full min-h-[220px] lg:min-h-[200px] border border-gray-100 hover:border-[#1b2a4a] cursor-pointer"
    >
      
      {/* --- AFFICHAGE MOBILE UNIQUEMENT --- */}
      <div className="flex lg:hidden justify-between items-start mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-50 group-hover:bg-white/10 text-[#1b2a4a] group-hover:text-white rounded-none transition-colors duration-500">
          {item.icon}
        </div>
        <span className="text-lg font-bold tracking-tighter text-gray-200 group-hover:text-white/20 font-clean leading-none transition-colors duration-500">
          {item.id}
        </span>
      </div>

      <div className="space-y-4">
        {/* --- TITRE MOBILE UNIQUEMENT --- */}
        <h3 className="lg:hidden text-lg rtl:text-xl font-bold text-[#161f33] group-hover:text-white font-clean tracking-tight leading-tight transition-colors duration-500">
          {t(item.titleKey)}
        </h3>

        {/* --- AFFICHAGE DESKTOP UNIQUEMENT --- */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-gray-50 group-hover:bg-white/10 text-[#1b2a4a] group-hover:text-white rounded-none transition-all duration-500 group-hover:scale-110">
            {item.icon}
          </div>
          <h3 className="text-xl rtl:text-2xl font-bold text-[#161f33] group-hover:text-white font-clean tracking-tight leading-tight transition-colors duration-500">
            {t(item.titleKey)}
          </h3>
        </div>
        
        {/* Paragraphe descriptif avec changement de couleur fluide */}
        <p className="text-gray-500 group-hover:text-gray-300 text-sm lg:text-base leading-relaxed text-center font-clean line-clamp-4 lg:line-clamp-none transition-colors duration-500">
          {t(item.descKey)}
        </p>
      </div>

    </motion.div>
  );

  return (
    <section className="relative w-full h-[100svh] lg:h-screen flex flex-col justify-center overflow-hidden">
      
      {/* 1. Vidéo de Fond */}
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src={bgVideo1} type="video/mp4" />
      </video>

      {/* 2. Overlay noir léger */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-0"></div>

      {/* 3. Contenu Principal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto py-8 flex flex-col justify-center h-full">
        
        {/* En-tête de Section animé */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center px-6 mb-8 lg:mb-14 space-y-2 lg:space-y-2 shrink-0"
        >
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-white/90 font-clean">
            {t('sec_why_badge')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl rtl:text-4xl rtl:md:text-6xl text-white font-clean tracking-tighter">
            {t('sec_why_title')}
          </h2>
        </motion.div>

        {/* --- VUE MOBILE : Carrousel + Bouton "Voir Plus" --- */}
        <div className="lg:hidden w-full flex flex-col items-center">
          <div className="w-full flex gap-4 px-6 overflow-x-auto snap-x snap-mandatory touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-6">
            {/* Sur mobile, on augmente le délai de 0.2s pour chaque carte */}
            {reasons.map((item, index) => (
              <SquareCard key={item.id} item={item} delay={0.2 * index} />
            ))}
          </div>
          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-2 border border-white text-white bg-transparent px-10 py-3 text-sm tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-black transition-colors rounded-none font-clean"
          >
            {t('btn_see_more_3d')}
          </motion.button>
        </div>

        {/* --- VUE DESKTOP (PC) : Grille 3 Colonnes --- */}
        <div className="hidden lg:grid grid-cols-3 gap-4 px-10 max-w-7xl mx-auto w-full items-stretch flex-1 max-h-[650px]">
          
          {/* Carte 1 (Haut Gauche) - Délai 0.3s */}
          <SquareCard item={reasons[0]} delay={0.3} />

          {/* CARTE CENTRALE 3D - Apparaît en premier ! (Délai 0.1s) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="row-span-2 group w-full h-full [perspective:1000px] cursor-pointer"
          >
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-2xl">
              
              {/* FACE AVANT */}
              <div className="absolute inset-0 bg-white/25 p-8 flex flex-col items-center justify-center text-center [backface-visibility:hidden] border border-gray-100 backdrop-blur-sm">
                <img src={logo} alt="MyNewStyle Logo" className="h-28 mb-8 opacity-90 object-contain" />
                <p className="font-clean text-gray-900 text-xl italic leading-relaxed p-6 border-2 bg-white/30 border-white">
                  "{t('card_3d_front_text')}"
                </p>
              </div>

              {/* FACE ARRIÈRE */}
              <div className="absolute inset-0 bg-[#1b2a4a] p-8 flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] border border-[#1b2a4a]">
                <h4 className="text-white font-clean text-3xl font-bold mb-4 tracking-tight">
                  {t('card_3d_back_title')}
                </h4>
                <p className="text-gray-300 font-clean text-base mb-10 leading-relaxed px-4">
                  {t('card_3d_back_text')}
                </p>
                <button className="border border-white text-white bg-transparent px-10 py-3 text-sm tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-[#1b2a4a] transition-colors rounded-none font-clean">
                  {t('btn_see_more_3d')}
                </button>
              </div>

            </div>
          </motion.div>

          {/* Carte 2 (Haut Droite) - Délai 0.5s */}
          <SquareCard item={reasons[1]} delay={0.5} />
          
          {/* Carte 3 (Bas Gauche) - Délai 0.7s */}
          <SquareCard item={reasons[2]} delay={0.7} />
          
          {/* Carte 4 (Bas Droite) - Délai 0.9s */}
          <SquareCard item={reasons[3]} delay={0.9} />

        </div>

      </div>

    </section>
  );
}

export default WhyUs;