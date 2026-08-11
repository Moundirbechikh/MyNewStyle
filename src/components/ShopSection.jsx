import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logostyle_bleu.png';
import ProductCard from './ProductCard';

function ShopSection() {
  const { t } = useTranslation();

  // --- ÉTATS DES FILTRES ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSex, setSelectedSex] = useState('all'); 
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [maxPrice, setMaxPrice] = useState(25000);

  // NOUVEAU MOCK DATA : Le stock dépend de la couleur et de la taille
  const products = [
    {
      id: 1,
      name: "Oversized Premium Hoodie",
      price: 12500,
      category: "hoodies",
      sex: "men",
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { 
          name: "Bleu Nuit", 
          hex: "#1b2a4a", 
          image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600",
          stockBySize: { "S": 12, "M": 0, "L": 5, "XL": 2 } // Rupture en M
        },
        { 
          name: "Gris", 
          hex: "#9ca3af", 
          image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=600",
          stockBySize: { "S": 0, "M": 8, "L": 14, "XL": 5 } // Rupture en S
        }
      ]
    },
    {
      id: 2,
      name: "Urban Minimalist Jacket",
      price: 18900,
      category: "jackets",
      sex: "unisex",
      sizes: ["M", "L", "XL"],
      colors: [
        { 
          name: "Noir", 
          hex: "#111827", 
          image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600",
          stockBySize: { "M": 5, "L": 0, "XL": 0 }
        },
        { 
          name: "Beige", 
          hex: "#d4d4d8", 
          image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=600",
          stockBySize: { "M": 10, "L": 10, "XL": 10 }
        }
      ]
    },
    {
      id: 3,
      name: "Classic Cotton T-Shirt",
      price: 4500,
      category: "tshirts",
      sex: "women",
      sizes: ["XS", "S", "M"],
      colors: [
        { 
          name: "Blanc", 
          hex: "#ffffff", 
          image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
          stockBySize: { "XS": 15, "S": 25, "M": 8 }
        },
        { 
          name: "Bleu Nuit", 
          hex: "#1b2a4a", 
          image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=600",
          stockBySize: { "XS": 0, "S": 0, "M": 0 } // Rupture totale
        }
      ]
    }
  ];

  // Filtrage
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSex = selectedSex === 'all' || product.sex === selectedSex;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;
    const matchesSize = selectedSize === 'all' || product.sizes.includes(selectedSize);

    return matchesSearch && matchesSex && matchesCategory && matchesPrice && matchesSize;
  });

  return (
    <section className="relative min-h-screen bg-[#f5f2eb]/30 pt-24 pb-20 px-6 md:px-12 lg:px-20 font-clean">
      
      {/* 1. LOGO */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-6 md:left-6 top-6 cursor-pointer pointer-events-auto z-50"
      >
        <img src={logo} alt="MyNewStyle Logo" className="h-12 md:h-16 lg:h-20 object-contain" />
      </motion.div>

      {/* 2. EN-TÊTE DE LA BOUTIQUE */}
      <div className="max-w-7xl mx-auto mb-10 mt-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#161f33] tracking-tight mb-4"
        >
          {t('shop_title')}
        </motion.h1>
        <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto">
          {t('shop_desc')}
        </p>
      </div>

      {/* 3. HOLDER & FILTRES */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Panneau de Filtrage Latéral */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit space-y-6 lg:sticky lg:top-8"
        >
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h2 className="font-bold text-lg text-[#1b2a4a]">{t('filter_adv')}</h2>
            <button 
              onClick={() => { setSelectedSex('all'); setSelectedCategory('all'); setSelectedSize('all'); setMaxPrice(25000); setSearchQuery(''); }}
              className="text-xs text-rose-500 font-semibold hover:underline"
            >
              {t('filter_reset')}
            </button>
          </div>

          {/* Recherche */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{t('filter_search')}</label>
            <input 
              type="text" 
              placeholder={t('filter_search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a] transition-all"
            />
          </div>

          {/* Filtre par Sexe */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{t('filter_gender')}</label>
            <div className="grid grid-cols-2 gap-2">
              {['all', 'men', 'women', 'unisex'].map((sex) => (
                <button
                  key={sex}
                  onClick={() => setSelectedSex(sex)}
                  className={`py-2 text-xs font-bold rounded-xl uppercase transition-all
                    ${selectedSex === sex ? 'bg-[#1b2a4a] text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                >
                  {t(`filter_${sex}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Filtre par Catégorie */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{t('filter_category')}</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a] transition-all cursor-pointer"
            >
              <option value="all">{t('filter_cat_all')}</option>
              <option value="hoodies">Hoodies</option>
              <option value="jackets">Jackets</option>
              <option value="tshirts">T-Shirts</option>
            </select>
          </div>

          {/* Filtre par Prix Max */}
          <div>
            <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
              <span>{t('filter_price_max')}</span>
              <span className="text-[#1b2a4a]">{maxPrice} DA</span>
            </div>
            <input 
              type="range" 
              min="2000" 
              max="25000" 
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#1b2a4a] cursor-pointer"
            />
          </div>

          {/* Filtre par Taille */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{t('filter_size')}</label>
            <div className="flex flex-wrap gap-2">
              {['all', 'XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all
                    ${selectedSize === size ? 'bg-[#1b2a4a] text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                >
                  {size === 'all' ? t('filter_size_all') : size}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grille des Produits */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm"
            >
              <p className="text-gray-500 text-base font-semibold">{t('shop_empty')}</p>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}

export default ShopSection;