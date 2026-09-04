import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'https://mynewstyle-server.onrender.com';

const TABS = [
  { key: 'new', mode: 'new', labelKey: 'hero_tab_new' },
  { key: 'bestseller', mode: 'bestseller', labelKey: 'hero_tab_bestseller' },
  { key: 'promo', mode: 'promo', labelKey: 'hero_tab_promo' },
];

function HeroCard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('new');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tabsData, setTabsData] = useState({ new: [], bestseller: [], promo: [] });
  const [loading, setLoading] = useState(true);

  // Récupère les 3 listes de vrais produits en une fois au chargement
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [newRes, bestRes, promoRes] = await Promise.all([
          fetch(`${API_URL}/api/products?limit=3`), // déjà triés par date décroissante -> nouveautés
          fetch(`${API_URL}/api/products?mode=bestseller&limit=3`),
          fetch(`${API_URL}/api/products?mode=promo&limit=3`),
        ]);

        const [newData, bestData, promoData] = await Promise.all([
          newRes.ok ? newRes.json() : [],
          bestRes.ok ? bestRes.json() : [],
          promoRes.ok ? promoRes.json() : [],
        ]);

        setTabsData({ new: newData, bestseller: bestData, promo: promoData });
      } catch (err) {
        console.error('Erreur chargement HeroCard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const currentItems = tabsData[activeTab] || [];

  // Changement automatique d'item toutes les 5 secondes (au sein de l'onglet actif)
  useEffect(() => {
    if (currentItems.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeTab, currentItems.length]);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setCurrentIndex(0);
  };

  const handleSeeMore = () => {
    const tab = TABS.find((t) => t.key === activeTab);
    navigate(`/shop?mode=${tab.mode}`);
  };

  const currentItem = currentItems[currentIndex];

  // Calcule le % de réduction réel à partir de price/oldPrice
  const getDiscountBadge = (item) => {
    if (!item.isPromo || !item.oldPrice || item.oldPrice <= item.price) return null;
    const percent = Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100);
    return `-${percent}%`;
  };

  const getSubtitle = (item) => {
    const categoryLabel = t(`cat_${item.category}`);
    const sexLabel = t(`filter_${item.sex}`);
    return `${categoryLabel} — ${sexLabel}`;
  };

  return (
    <div className="bg-white/95 backdrop-blur-md px-5 pt-5 w-96 h-[75vh] max-h-[700px] flex flex-col rounded-tl-[3rem] rtl:rounded-tl-none rtl:rounded-tr-[3rem] shadow-2xl border-t border-l rtl:border-l-0 rtl:border-r border-white/40 pointer-events-auto">

      {/* Onglets New / Best Sellers / Promo */}
      <div className="flex gap-1 mb-4 bg-gray-50 p-1 rounded-full shrink-0">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`flex-1 text-[10px] font-bold uppercase tracking-wider py-2 rounded-full transition-all duration-300 font-clean
              ${activeTab === tab.key
                ? 'bg-[#1b2a4a] text-white shadow-md'
                : 'text-gray-500 hover:text-[#1b2a4a]'}`}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-gray-400 font-clean">{t('search_loading')}</p>
        </div>
      ) : !currentItem ? (
        // ===== Aucun produit dans cette catégorie pour l'instant =====
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
              <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"></path>
            </svg>
          </div>
          <p className="text-sm font-bold text-gray-500 font-clean">{t('hero_empty_title')}</p>
          <p className="text-xs text-gray-400 mt-1 font-clean">{t('hero_empty_desc')}</p>
        </div>
      ) : (
        <>
          {/* Zone Image */}
          <div className="flex-1 w-full bg-gray-100 rounded-tl-[2rem] rtl:rounded-tl-none rtl:rounded-tr-[2rem] rounded-br-[1rem] rtl:rounded-br-none rtl:rounded-bl-[1rem] overflow-hidden relative shadow-inner">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${activeTab}-${currentItem._id}`}
                src={currentItem.colors?.[0]?.image}
                alt={currentItem.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Badge promo — % réel calculé depuis price/oldPrice */}
            {getDiscountBadge(currentItem) && (
              <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {getDiscountBadge(currentItem)}
              </div>
            )}

            {/* Points de progression */}
            {currentItems.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {currentItems.map((item, index) => (
                  <div
                    key={item._id}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Zone Contenu */}
          <div className="mt-6 px-2 pb-5 flex flex-col gap-4">
            <div className="min-h-[4.5rem] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <p className="font-clean text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">
                    {getSubtitle(currentItem)}
                  </p>
                  <h3 className="font-clean font-bold text-gray-900 text-xl mt-1 truncate">
                    {currentItem.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-clean text-base font-extrabold text-[#1b2a4a]">
                      {currentItem.price} DA
                    </span>
                    {currentItem.isPromo && currentItem.oldPrice && (
                      <span className="font-clean text-sm font-semibold text-gray-400 line-through">
                        {currentItem.oldPrice} DA
                      </span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bouton "Voir plus" -> navigue vers /shop avec le mode de l'onglet actif */}
            <button
              onClick={handleSeeMore}
              className="w-full py-3.5 border border-[#1b2a4a] text-[#1b2a4a] text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#1b2a4a] hover:text-white transition-colors duration-300 font-clean flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {t('btn_see_more')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default HeroCard;