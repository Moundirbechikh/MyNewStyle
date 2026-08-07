import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const { t, i18n } = useTranslation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Définition des langues disponibles
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇩🇿' }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  // 3. Traduction des liens
  const navLinks = [
    { key: "nav_home", href: "#home" },
    { key: "nav_shop", href: "#shop" },
    { key: "nav_new", href: "#new-arrivals" },
    { key: "nav_categories", href: "#categories" },
    { key: "nav_about", href: "#about" },
    { key: "nav_contact", href: "#contact" }
  ];

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-3 left-0 w-full px-6 md:px-8 flex justify-center z-50 pointer-events-none"
    >
      
      {/* 2. Liens (Bulle Centrale) */}
      <nav className="hidden lg:flex items-center gap-8 bg-white/95 backdrop-blur-sm px-8 py-3.5 rounded-full shadow-sm pointer-events-auto">
        {navLinks.map((link) => (
          <a 
            key={link.key}
            href={link.href} 
            className="text-gray-800 hover:text-black font-clean text-sm font-bold transition-colors duration-200 whitespace-nowrap"
          >
            {t(link.key)}
          </a>
        ))}
      </nav>

      {/* 3. Icônes d'action + Sélecteur de Langue (Bulle Droite) */}
      <div className="absolute right-2 md:right-8 top-0 flex items-center gap-2 md:gap-4 bg-white/95 backdrop-blur-sm px-4 md:px-6 py-3.5 rounded-full shadow-sm text-gray-800 pointer-events-auto">
        
        {/* --- AJOUT: Sélecteur de Langue (Custom Dropdown) --- */}
        <div className="relative font-clean">
          <button 
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-1.5 text-xs font-bold uppercase hover:text-gray-500 transition-colors py-1"
          >
            <span>{currentLanguage.flag}</span>
            <span className="hidden md:inline">{currentLanguage.code}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform ${langMenuOpen ? 'rotate-180' : ''}`}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {langMenuOpen && (
            <div className="absolute top-full mt-3 right-0 bg-white shadow-xl rounded-2xl p-2 min-w-[140px] border border-gray-100 z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-colors whitespace-nowrap
                    ${i18n.language === lang.code ? 'bg-[#f5f2eb] font-bold text-[#1b2a4a]' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Séparateur visuel */}
        <div className="h-5 w-px bg-gray-200 mx-1"></div>

        {/* Icône Recherche */}
        <button className="hover:text-gray-500 transition-colors p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        {/* Icône Favoris */}
        <button className="hover:text-gray-500 transition-colors hidden sm:block p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        {/* Icône Panier */}
        <button className="hover:text-gray-500 transition-colors relative p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
            2
          </span>
        </button>

        {/* Icône Utilisateur */}
        <button className="hover:text-gray-500 transition-colors hidden sm:block p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>

        {/* Menu Hamburger pour Mobile */}
        <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden hover:text-gray-500 transition-colors ml-1 p-1"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* --- MENU OVERLAY MOBILE --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-0 w-[90vw] bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-xl pointer-events-auto border border-gray-100 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.key} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-gray-800 py-2 border-b border-gray-100"
                >
                  {t(link.key)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
}

export default Navbar;