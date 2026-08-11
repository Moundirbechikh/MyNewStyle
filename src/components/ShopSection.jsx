import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logostyle_bleu.png';
import videoBG from '../assets/BG2.mp4';
import bg1 from '../assets/BG1.png'; // IMPORT MOBILE FEMME
import bg2 from '../assets/BG2.png'; // IMPORT MOBILE HOMME
import ProductCard from './ProductCard';

function ShopSection() {
  const { t } = useTranslation();
  
  // Référence pour le défilement automatique vers la boutique
  const shopGridRef = useRef(null);

  // État pour gérer la disparition du titre principal sur Desktop au survol (Non utilisé ici car le titre est fixe)
  const [hoveredSide, setHoveredSide] = useState(null);

  // État pour gérer le slider mobile (0 = Femme, 1 = Homme)
  const [mobileBgIndex, setMobileBgIndex] = useState(0);
  const mobileBackgrounds = [bg2, bg1];
  
  // Changement d'image toutes les 10 secondes sur mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setMobileBgIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const fadeUp = (delay) => ({
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, delay: delay, ease: "easeOut" } 
    }
  });

  // --- ÉTATS DES FILTRES ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSex, setSelectedSex] = useState('all'); 
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [maxPrice, setMaxPrice] = useState(25000);

  // MOCK DATA (Données de test)
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
          name: "Bleu Nuit", hex: "#1b2a4a", 
          image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600",
          stockBySize: { "S": 12, "M": 0, "L": 5, "XL": 2 }
        },
        { 
          name: "Gris", hex: "#9ca3af", 
          image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=600",
          stockBySize: { "S": 0, "M": 8, "L": 14, "XL": 5 }
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
          name: "Noir", hex: "#111827", 
          image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600",
          stockBySize: { "M": 5, "L": 0, "XL": 0 }
        },
        { 
          name: "Beige", hex: "#d4d4d8", 
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
          name: "Blanc", hex: "#ffffff", 
          image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
          stockBySize: { "XS": 15, "S": 25, "M": 8 }
        },
        { 
          name: "Bleu Nuit", hex: "#1b2a4a", 
          image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=600",
          stockBySize: { "XS": 0, "S": 0, "M": 0 }
        }
      ]
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSex = selectedSex === 'all' || product.sex === selectedSex;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;
    const matchesSize = selectedSize === 'all' || product.sizes.includes(selectedSize);

    return matchesSearch && matchesSex && matchesCategory && matchesPrice && matchesSize;
  });

  const handleCategorySelect = (sex) => {
    setSelectedSex(sex);
    setTimeout(() => {
      shopGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  return (
    <div className="relative font-clean bg-[#f5f2eb]/20">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION FULL SCREEN (Desktop & Mobile)           */}
      {/* ======================================================== */}
      <section className="relative h-screen w-full overflow-hidden">
        
        {/* LOGO GLOABAL - Remis à sa place d'origine (top-6) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute left-6 md:left-12 top-6 cursor-pointer pointer-events-auto z-50 mix-blend-difference"
        >
          <img src={logo} alt="MyNewStyle Logo" className="h-12 md:h-16 lg:h-20 object-contain  invert" />
        </motion.div>

        {/* --- VUE DESKTOP (Vidéo + Textes fixes + Cartes 3D) --- */}
        <div className="hidden md:block absolute inset-0">
          
          <video 
            src={videoBG} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          
          <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

          {/* TITRE ET DESCRIPTION (Fixes au centre haut) */}
          <div className="absolute top-32 inset-x-0 flex flex-col items-center justify-start pointer-events-none z-10">
            <h1 className="text-6xl lg:text-8xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
              {t('shop_title')}
            </h1>
            <p className="text-white/95 text-xl lg:text-2xl max-w-3xl text-center drop-shadow-md font-medium">
              {t('shop_desc')}
            </p>
          </div>

          {/* ZONES DE HOVER DÉLIMITÉES EN BAS (padding 10 bas, 8 côtés) */}
          <div className="absolute bottom-4 inset-x-0 w-full px-8  lg:px-12 z-20 flex justify-between gap-8 lg:gap-12">
            
            {/* GAUCHE : FEMME */}
            <div 
              onClick={() => handleCategorySelect('women')}
              className="group w-1/2 h-[260px] lg:h-[300px] [perspective:1500px] cursor-pointer"
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Face Avant (Border blanc, écriture type bouton au milieu) */}
                <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden] border-2 lg:border-[3px] border-white/80 hover:border-white rounded-2xl bg-white/5 backdrop-blur-[2px] transition-all duration-300">
                  <div className=" text-white px-8 py-3 text-6xl lg:text-7xl font-bold uppercase">
                    Femme
                  </div>
                </div>
                
                {/* Face Arrière (Blanche) */}
                <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl shadow-2xl px-6 lg:px-12 border border-gray-200">
                  <h4 className="text-[#1b2a4a] text-3xl lg:text-4xl font-bold mb-3 tracking-tight">Collection Femme</h4>
                  <p className="text-gray-600 text-xs lg:text-sm mb-6 max-w-md">
                    Découvrez notre sélection exclusive de hoodies oversize, t-shirts premium et pantalons tendance, disponibles dans une large gamme de couleurs.
                  </p>
                  <motion.button 
                    className="border-2 border-[#1b2a4a] text-[#1b2a4a] bg-transparent px-8 py-3 text-xs lg:text-sm tracking-[0.2em] uppercase font-bold hover:bg-[#1b2a4a] hover:text-white transition-colors rounded-none font-clean"
                  >
                    {t('btn_see_more_3d')}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* DROITE : HOMME */}
            <div 
              onClick={() => handleCategorySelect('men')}
              className="group w-1/2 h-[260px] lg:h-[300px] [perspective:1500px] cursor-pointer"
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Face Avant (Border blanc, écriture type bouton au milieu) */}
                <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden] border-2 lg:border-[3px] border-white/80 hover:border-white rounded-2xl bg-white/5 backdrop-blur-[2px] transition-all duration-300">
                  <div className="text-white px-8 py-3 text-6xl lg:text-7xl font-bold uppercase">
                    Homme
                  </div>
                </div>
                
                {/* Face Arrière (Bleue) */}
                <div className="absolute inset-0 bg-[#1b2a4a]/95 backdrop-blur-md flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl shadow-2xl px-6 lg:px-12 border border-white/20">
                  <h4 className="text-white text-3xl lg:text-4xl font-bold mb-3 tracking-tight">Collection Homme</h4>
                  <p className="text-white/80 text-xs lg:text-sm mb-6 max-w-md">
                    Explorez notre gamme de vêtements urbains : hoodies confortables, t-shirts essentiels et pantalons stylés, déclinés dans de multiples coloris.
                  </p>
                  <motion.button 
                    className="border-2 border-white text-white bg-transparent px-8 py-3 text-xs lg:text-sm tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-black transition-colors rounded-none font-clean"
                  >
                    {t('btn_see_more_3d')}
                  </motion.button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- VUE MOBILE (Plein écran avec slider automatique) --- */}
        <div className="md:hidden absolute inset-0 z-20">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileBgIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${mobileBackgrounds[mobileBgIndex]})` }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-black/50"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
            <motion.h2 
              key={`title-${mobileBgIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl font-bold text-white mb-6 uppercase tracking-widest drop-shadow-lg"
            >
              {mobileBgIndex === 0 ? 'Femme' : 'Homme'}
            </motion.h2>

            <motion.p
              key={`desc-${mobileBgIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/95 text-lg font-medium mb-10 max-w-sm drop-shadow-md"
            >
              Découvrez nos hoodies, t-shirts et pantalons disponibles dans une large gamme de couleurs.
            </motion.p>

            <motion.button 
              key={`btn-${mobileBgIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              onClick={() => handleCategorySelect(mobileBgIndex === 0 ? 'women' : 'men')}
              className="border-2 border-white text-white bg-transparent px-10 py-4 text-base tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-black transition-colors rounded-none font-clean"
            >
              {t('btn_see_more_3d')}
            </motion.button>
          </div>

          {/* Indicateurs de slider (les petits points en bas) */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-10">
            <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${mobileBgIndex === 0 ? 'bg-white' : 'bg-white/40'}`}></div>
            <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${mobileBgIndex === 1 ? 'bg-white' : 'bg-white/40'}`}></div>
          </div>
          
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. SECTION BOUTIQUE & FILTRES (Cible du défilement)      */}
      {/* ======================================================== */}
              {/* Titre et description : Apparaît en premier (délai 0) */}
              <motion.div variants={fadeUp(0)}
              className='flex flex-row justify-center mt-10'>
            <h2 className=" text-4xl md:text-5xl rtl:text-4xl rtl:md:text-5xl text-[#161f33] font-clean tracking-tighter">
              {t('sec_category_title')}
            </h2>
          </motion.div>
      <section ref={shopGridRef} className="max-w-7xl mx-auto pt-10 pb-24 px-6 md:px-12 lg:px-20 scroll-mt-0">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
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
                <option value="pants">Pantalons</option>
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
    </div>
  );
}

export default ShopSection;