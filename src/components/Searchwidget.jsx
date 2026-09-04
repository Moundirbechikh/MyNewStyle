import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'https://mynewstyle-server.onrender.com';

const CATEGORY_MATCHES = [
  { value: 'tshirts', labelKey: 'cat_tshirts' },
  { value: 'hoodies', labelKey: 'cat_hoodies' },
  { value: 'sweats', labelKey: 'cat_sweats' },
  { value: 'pants', labelKey: 'cat_pants' },
];

const SEX_MATCHES = [
  { value: 'men', labelKey: 'filter_men' },
  { value: 'women', labelKey: 'filter_women' },
  { value: 'unisex', labelKey: 'filter_unisex' },
];

function SearchWidget() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  useEffect(() => {
    if (!query || query.trim().length < 1) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/products?search=${encodeURIComponent(query)}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        handleClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const trimmedQuery = query.trim().toLowerCase();

  const matchedCategories = trimmedQuery.length > 0
    ? CATEGORY_MATCHES.filter((cat) => t(cat.labelKey).toLowerCase().includes(trimmedQuery))
    : [];

  const matchedSexes = trimmedQuery.length > 0
    ? SEX_MATCHES.filter((sex) => t(sex.labelKey).toLowerCase().includes(trimmedQuery))
    : [];

  const handleSeeAllResults = () => {
    if (query.trim() === '') return;
    navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    handleClose();
  };

  const handleSelectProduct = (product) => {
    navigate(`/shop?search=${encodeURIComponent(product.name)}`);
    handleClose();
  };

  const handleSelectCategory = (categoryValue) => {
    navigate(`/shop?category=${categoryValue}`);
    handleClose();
  };

  const handleSelectSex = (sexValue) => {
    navigate(`/shop?sex=${sexValue}`);
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSeeAllResults();
  };

  const hasAnyMatch = results.length > 0 || matchedCategories.length > 0 || matchedSexes.length > 0;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => (isOpen ? handleClose() : handleOpen())}
        className="hover:text-[#1b2a4a] text-gray-800 transition-colors p-1"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[65px] right-0 w-full sm:absolute sm:top-full sm:left-auto sm:right-0 sm:mt-3 sm:w-[420px] bg-white rounded-2xl shadow-xl border border-gray-100 z-50 font-clean overflow-hidden origin-top sm:origin-top-right"
          >
            <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-100">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 shrink-0">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search_placeholder')}
                className="flex-1 text-xs sm:text-sm outline-none placeholder:text-gray-400 min-w-0 bg-transparent"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 p-1"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </form>

            <div className="max-h-[55vh] overflow-y-auto">
              {query.trim() === '' ? (
                <div className="px-5 py-6 text-center text-gray-400 text-xs sm:text-sm">
                  {t('search_hint')}
                </div>
              ) : loading ? (
                <div className="px-5 py-6 text-center text-gray-400 text-xs sm:text-sm">
                  {t('search_loading')}
                </div>
              ) : !hasAnyMatch ? (
                <div className="px-5 py-6 text-center text-gray-400 text-xs sm:text-sm">
                  {t('search_no_results')}
                </div>
              ) : (
                <div className="py-2">
                  {/* Raccourcis catégories */}
                  {matchedCategories.length > 0 && (
                    <div className="px-3 sm:px-4 pt-2 pb-3">
                      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 mb-2">
                        {t('search_categories_label')}
                      </p>
                      <div className="flex flex-wrap gap-1.5 px-2">
                        {matchedCategories.map((cat) => (
                          <button
                            key={cat.value}
                            onClick={() => handleSelectCategory(cat.value)}
                            className="bg-gray-50 hover:bg-[#1b2a4a] hover:text-white text-[#1b2a4a] text-[10px] sm:text-xs font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-200"
                          >
                            {t(cat.labelKey)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Raccourcis genre */}
                  {matchedSexes.length > 0 && (
                    <div className="px-3 sm:px-4 pt-1 pb-3">
                      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 mb-2">
                        {t('search_gender_label')}
                      </p>
                      <div className="flex flex-wrap gap-1.5 px-2">
                        {matchedSexes.map((sex) => (
                          <button
                            key={sex.value}
                            onClick={() => handleSelectSex(sex.value)}
                            className="bg-gray-50 hover:bg-[#1b2a4a] hover:text-white text-[#1b2a4a] text-[10px] sm:text-xs font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-200"
                          >
                            {t(sex.labelKey)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Résultats produits */}
                  {results.length > 0 && (
                    <div className="px-1.5 sm:px-2">
                      {(matchedCategories.length > 0 || matchedSexes.length > 0) && (
                        <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 px-4 mb-2 mt-1">
                          {t('search_products_label')}
                        </p>
                      )}
                      {results.map((product) => (
                        <button
                          key={product._id}
                          onClick={() => handleSelectProduct(product)}
                          className="flex items-center gap-2 sm:gap-3 w-full px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 shrink-0">
                            <img
                              src={product.colors?.[0]?.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{product.name}</p>
                            <p className="text-[10px] sm:text-xs text-gray-400">{product.price} DA</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {results.length > 0 && (
                    <button
                      onClick={handleSeeAllResults}
                      className="w-full mt-2 px-5 py-2.5 sm:py-3 text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#1b2a4a] hover:bg-gray-50 transition-colors border-t border-gray-100"
                    >
                      {t('search_see_all')} "{query}"
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchWidget;