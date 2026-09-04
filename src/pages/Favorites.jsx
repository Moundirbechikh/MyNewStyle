import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';

function Favorites() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { favorites, loading } = useFavorites();

  return (
    <div className="min-h-screen bg-[#f5f2eb] px-6 pt-28 pb-16 font-clean selection:bg-[#1b2a4a] selection:text-white">
      <div className="max-w-7xl mx-auto">

        {/* En-tête de la page — même style que Profile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1b2a4a] tracking-tight">
            {t('favorites_title')}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {t('favorites_subtitle')}
          </p>
        </motion.div>

        {loading ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
            <p className="text-gray-400 text-sm">{t('search_loading')}</p>
          </div>
        ) : favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center py-20 px-6"
          >
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-gray-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-1">{t('favorites_empty')}</p>
            <p className="text-xs text-gray-400 max-w-xs mb-6">{t('favorites_empty_desc')}</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-[#1b2a4a] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              {t('cart_go_shop')}
            </button>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {favorites.map((product) => (
                <ProductCard key={product._id} product={{ ...product, id: product._id }} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Favorites;