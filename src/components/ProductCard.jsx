import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function ProductCard({ product }) {
  const { t } = useTranslation();
  
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : '');

  const currentColor = product.colors[selectedColorIndex];
  
  // NOUVEAU : Calcule le stock spécifiquement pour la taille et la couleur choisies
  const currentStock = currentColor.stockBySize?.[selectedSize] ?? 0;

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

        {/* Badge Sexe */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 backdrop-blur-md text-[#1b2a4a] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {t(`filter_${product.sex}`)}
          </span>
        </div>
      </div>

      {/* Informations Article */}
      <div className="space-y-3">
        
        {/* NOUVEAU DESIGN : Titre et Prix séparés */}
        <div className="flex flex-col gap-1">
          <h3 className="font-clean text-base sm:text-lg font-bold text-gray-900 line-clamp-2 leading-tight min-h-[3rem]">
            {product.name}
          </h3>
          <span className="font-clean text-lg font-extrabold text-[#1b2a4a]">
            {product.price} DA
          </span>
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
          disabled={currentStock === 0}
          className="w-full mt-3 bg-[#1b2a4a] hover:bg-[#121c33] active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all duration-300 font-clean shadow-sm"
        >
          {currentStock > 0 ? t('prod_add_cart') : t('prod_unavailable')}
        </button>
      </div>
    </motion.div>
  );
}

export default ProductCard;