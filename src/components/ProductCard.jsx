import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

function ProductCard({ product }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : '');
  const [addingToCart, setAddingToCart] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const currentColor = product.colors[selectedColorIndex];
  const currentStock = currentColor.stockBySize?.[selectedSize] ?? 0;
  const favorite = isFavorite(product.id);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await addToCart(product.id, selectedSize, currentColor.name, 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    } catch (err) {
      if (err.message === 'NEED_LOGIN') {
        navigate('/login');
      }
    } finally {
      setAddingToCart(false);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      await toggleFavorite(product.id);
    } catch (err) {
      if (err.message === 'NEED_LOGIN') {
        navigate('/login');
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-xl border border-gray-100 flex flex-col justify-between transition-all duration-300 group"
    >
      {/* Conteneur Image */}
      <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-gray-100 mb-4">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentColor.image}
            src={currentColor.image}
            alt={product.name}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </AnimatePresence>

        {/* Badges Sexe / Bestseller / Promo */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="bg-white/90 backdrop-blur-md text-[#1b2a4a] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {t(`filter_${product.sex}`)}
          </span>
          {product.isBestseller && (
            <span className="bg-[#1b2a4a] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {t('badge_bestseller')}
            </span>
          )}
          {product.isPromo && (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {t('badge_promo')}
            </span>
          )}
        </div>

        {/* Bouton Favori */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={favorite ? '#f43f5e' : 'none'}
            stroke={favorite ? '#f43f5e' : '#1b2a4a'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      {/* Informations Article */}
      <div className="space-y-3">
        
        <div className="flex flex-col gap-1">
          <h3 className="font-clean text-base sm:text-lg font-bold text-gray-900 line-clamp-2 leading-tight min-h-[3rem]">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-clean text-lg font-extrabold text-[#1b2a4a]">
              {product.price} DA
            </span>
            {product.isPromo && product.oldPrice && (
              <span className="font-clean text-sm font-semibold text-gray-400 line-through">
                {product.oldPrice} DA
              </span>
            )}
          </div>
        </div>

        {/* Sélecteur de Couleurs */}
        <div className="flex items-center gap-2 pt-1">
          {product.colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColorIndex(index)}
              title={color.name}
              style={{ backgroundColor: color.hex }}
              className={`w-5 h-5 rounded-full transition-all duration-200 border-2 
                ${selectedColorIndex === index ? 'border-[#1b2a4a] scale-125 shadow-md' : 'border-white hover:scale-110'}`}
            />
          ))}
          <span className="text-xs text-gray-400 font-clean ml-1 truncate">({currentColor.name})</span>
        </div>

        {/* Sélecteur de Tailles & Affichage du Stock Dynamique */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex gap-1.5 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all font-clean
                  ${selectedSize === size 
                    ? 'bg-[#1b2a4a] text-white shadow-md' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
              >
                {size}
              </button>
            ))}
          </div>

          <span className={`text-[11px] whitespace-nowrap font-bold font-clean px-2 py-1 rounded-lg ${currentStock > 0 ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
            {currentStock > 0 ? `${t('prod_stock')}: ${currentStock}` : t('prod_out_of_stock')}
          </span>
        </div>

        {/* Bouton Ajouter au panier */}
        <button 
          onClick={handleAddToCart}
          disabled={currentStock === 0 || addingToCart}
          className={`w-full mt-3 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all duration-300 font-clean shadow-sm active:scale-95
            ${justAdded ? 'bg-emerald-600' : 'bg-[#1b2a4a] hover:bg-[#121c33]'}`}
        >
          {currentStock === 0
            ? t('prod_unavailable')
            : justAdded
            ? t('prod_added')
            : addingToCart
            ? t('prod_adding')
            : t('prod_add_cart')}
        </button>
      </div>
    </motion.div>
  );
}

export default ProductCard;