import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logostyle_bleu.png';
import bgVideo1 from '../assets/BG1.mp4';

// Panneau visuel partagé entre Login et Register.
function AuthVisualPanel({ badgeKey, titleKey, descKey, nav_home}) {
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-48 sm:h-48 lg:h-full lg:w-1/2 shrink-0 overflow-hidden rounded-b-[2.5rem] lg:rounded-none shadow-xl lg:shadow-none">
      <video
        src={bgVideo1}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#1b2a4a]/70"></div>

      {/* BOUTON RETOUR : Visible uniquement sur Desktop (en haut à gauche) */}
      <Link 
        to="/" 
        className="hidden lg:flex absolute top-12 left-12 z-20 items-center gap-2 text-white/80 hover:text-white transition-colors font-semibold text-md tracking-wide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        {t("nav_home")}
      </Link>

      {/* LOGO : Mobile (Haut-gauche), Desktop (Centre absolu) */}
      <Link to="/" className="absolute z-10 top-5 left-5 lg:top-70 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
        <img src={logo} alt="MyNewStyle Logo" className="h-10 sm:h-10 lg:h-36 object-contain invert" />
      </Link>

      {/* Texte — toujours ancré en bas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute bottom-5 left-5 right-5 lg:bottom-12 lg:left-12 lg:right-12 z-10 space-y-1 lg:space-y-4"
      >
        <span className="text-white/70 text-[9px] lg:text-xs font-bold uppercase tracking-[0.2em] lg:tracking-[0.3em]">
          {t(badgeKey)}
        </span>
        <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
          {t(titleKey)}
        </h2>
        <p className="hidden sm:block text-white/80 text-xs sm:text-sm lg:text-base max-w-sm leading-relaxed">
          {t(descKey)}
        </p>
      </motion.div>

      {/* Petit trait décoratif, visible desktop uniquement */}
      <div className="hidden lg:block absolute bottom-12 right-12 w-16 h-1 bg-white/40 rounded-full"></div>
    </div>
  );
}

export default AuthVisualPanel;