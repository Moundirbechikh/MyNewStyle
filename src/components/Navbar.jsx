import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import SearchWidget from './Searchwidget';

function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { favorites } = useFavorites();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('nav_home');
  const [hoveredSection, setHoveredSection] = useState(null);

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

  // Pas connecté -> "Pourquoi Nous" (scroll vers WhyUs)
  // Connecté -> "Nouveautés" (va vers la boutique filtrée sur les nouveaux articles)
  const newArrivalsLink = user
    ? { key: 'nav_new', to: '/shop?mode=new', hash: '' }
    : { key: 'nav_why_us', to: '/#new-arrivals', hash: 'new-arrivals' };

  const navLinks = [
    { key: "nav_home", to: "/", hash: "home" },
    { key: "nav_shop", to: "/shop", hash: "" },
    { key: "nav_categories", to: "/#categories", hash: "categories" },
    newArrivalsLink,
    { key: "nav_about", to: "/#about", hash: "about" },
    { key: "nav_contact", to: "/#contact", hash: "contact" }
  ];

  const handleNavClick = (e, link) => {
    if (location.pathname === '/' && link.hash) {
      e.preventDefault();
      if (link.hash === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      } else {
        const element = document.getElementById(link.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', link.to);
        }
      }
    }
    setActiveSection(link.key);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === '/shop') {
      setActiveSection('nav_shop');
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'categories', 'new-arrivals', 'about', 'contact'];
      let current = 'nav_home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            const activeLink = navLinks.find(link => link.hash === section);
            if (activeLink) current = activeLink.key;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, user]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-3 left-0 w-full px-6 md:px-8 flex justify-center z-50 pointer-events-none"
    >

      <nav className={`hidden lg:flex items-center gap-8 bg-white/95 backdrop-blur-sm px-8 py-3.5 rounded-full pointer-events-auto transition-all duration-300 border ${scrolled ? 'border-[#1b2a4a] shadow-md shadow-[#1b2a4a]/20' : 'border-transparent shadow-sm'}`}>
        {navLinks.map((link) => {
          const isActive = activeSection === link.key;
          const isHovered = hoveredSection === link.key;

          return (
            <Link
              key={link.key}
              to={link.to}
              onMouseEnter={() => setHoveredSection(link.key)}
              onMouseLeave={() => setHoveredSection(null)}
              onClick={(e) => handleNavClick(e, link)}
              className={`relative font-clean text-sm font-bold transition-colors duration-300 whitespace-nowrap z-10
                ${isActive || isHovered ? 'text-white' : 'text-gray-800'}`}
            >
              {(isActive || isHovered) && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute -inset-x-4 -inset-y-2 bg-[#1b2a4a] rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {t(link.key)}
            </Link>
          );
        })}
      </nav>

      <div className={`absolute right-2 md:right-8 top-0 flex items-center gap-2 md:gap-4 bg-white/95 backdrop-blur-sm px-4 md:px-6 py-3.5 rounded-full pointer-events-auto transition-all duration-300 border ${scrolled ? 'border-[#1b2a4a] shadow-md shadow-[#1b2a4a]/20' : 'border-transparent shadow-sm'}`}>

        <div className="relative font-clean">
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-1.5 text-xs font-bold uppercase hover:text-[#1b2a4a] transition-colors py-1 text-gray-800"
          >
            <span>{currentLanguage.flag}</span>
            <span className="hidden md:inline">{currentLanguage.code}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-300 ${langMenuOpen ? 'rotate-180 text-[#1b2a4a]' : ''}`}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <AnimatePresence>
            {langMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full mt-3 right-0 bg-white shadow-xl rounded-2xl p-2 min-w-[140px] border border-gray-100 z-50"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-all whitespace-nowrap
                      ${i18n.language === lang.code ? 'bg-[#1b2a4a] text-white font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-5 w-px bg-gray-200 mx-1"></div>

        <SearchWidget />

        <button
          onClick={() => (user ? navigate('/favorites') : navigate('/login'))}
          className="hover:text-[#1b2a4a] text-gray-800 transition-colors hidden sm:block p-1 relative"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          {favorites.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </button>

        <button
          onClick={() => (user ? navigate('/cart') : navigate('/login'))}
          className="hover:text-[#1b2a4a] text-gray-800 transition-colors relative p-1"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        <div className="relative hidden sm:block">
          <button
            onClick={() => {
              if (user) {
                setUserMenuOpen(!userMenuOpen);
              } else {
                navigate('/login');
              }
            }}
            className="hover:text-[#1b2a4a] text-gray-800 transition-colors p-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {isAdmin && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#1b2a4a] rounded-full border-2 border-white"></span>
            )}
          </button>

          <AnimatePresence>
            {userMenuOpen && user && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full mt-3 right-0 bg-white shadow-xl rounded-2xl p-2 min-w-[180px] border border-gray-100 z-50"
              >
                <div className="px-4 py-2 border-b border-gray-100 mb-1">
                  <p className="text-xs text-gray-400 font-clean">{t('navbar_connected_as')}</p>
                  <p className="text-sm font-bold text-[#1b2a4a] truncate">{user.nom}</p>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => { setUserMenuOpen(false); navigate('/admin'); }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm rounded-xl hover:bg-[#1b2a4a]/5 text-[#1b2a4a] font-bold transition-all"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="9" rx="1"></rect>
                      <rect x="14" y="3" width="7" height="5" rx="1"></rect>
                      <rect x="14" y="12" width="7" height="9" rx="1"></rect>
                      <rect x="3" y="16" width="7" height="5" rx="1"></rect>
                    </svg>
                    Espace Admin
                  </button>
                )}

                <button
                  onClick={() => { setUserMenuOpen(false); navigate('/profile'); }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm rounded-xl hover:bg-gray-50 text-gray-700 transition-all"
                >
                  {t('navbar_my_profile')}
                </button>
                <button
                  onClick={() => { setUserMenuOpen(false); navigate('/favorites'); }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm rounded-xl hover:bg-gray-50 text-gray-700 transition-all"
                >
                  {t('favorites_title')}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm rounded-xl hover:bg-rose-50 text-rose-500 font-semibold transition-all"
                >
                  {t('navbar_logout')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden hover:text-[#1b2a4a] text-gray-800 transition-colors ml-1 p-1"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-0 w-64 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl pointer-events-auto border border-gray-100 lg:hidden font-clean"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.key;

                return (
                  <Link
                    key={link.key}
                    to={link.to}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`flex items-center justify-between text-sm font-bold py-3 px-4 rounded-xl transition-all duration-300
                      ${isActive
                        ? 'bg-[#1b2a4a] text-white translate-x-1 shadow-md'
                        : 'text-gray-800 hover:bg-[#1b2a4a]/10 hover:text-[#1b2a4a] hover:translate-x-1'
                      }`}
                  >
                    {t(link.key)}
                    {isActive && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    )}
                  </Link>
                );
              })}

              <div className="h-px bg-gray-100 my-2"></div>
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center text-sm font-bold py-3 px-4 rounded-xl text-[#1b2a4a] bg-[#1b2a4a]/5 hover:bg-[#1b2a4a]/10 transition-all mb-1"
                    >
                      Espace Admin
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center text-sm font-bold py-3 px-4 rounded-xl text-gray-800 hover:bg-[#1b2a4a]/10 hover:text-[#1b2a4a] transition-all"
                  >
                    {t('navbar_my_profile')}
                  </Link>
                  <Link
                    to="/favorites"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between text-sm font-bold py-3 px-4 rounded-xl text-gray-800 hover:bg-[#1b2a4a]/10 hover:text-[#1b2a4a] transition-all"
                  >
                    {t('favorites_title')}
                    {favorites.length > 0 && (
                      <span className="bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between text-sm font-bold py-3 px-4 rounded-xl text-gray-800 hover:bg-[#1b2a4a]/10 hover:text-[#1b2a4a] transition-all"
                  >
                    {t('cart_title')}
                    {cartCount > 0 && (
                      <span className="bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                    className="flex items-center text-sm font-bold py-3 px-4 rounded-xl text-rose-500 hover:bg-rose-50 transition-all text-left"
                  >
                    {t('navbar_logout')}
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center text-sm font-bold py-3 px-4 rounded-xl text-gray-800 hover:bg-[#1b2a4a]/10 hover:text-[#1b2a4a] transition-all"
                >
                  {t('navbar_login')}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
}

export default Navbar;