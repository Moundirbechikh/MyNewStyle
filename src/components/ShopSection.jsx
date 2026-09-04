import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import logo from '../assets/logostyle_bleu.png';
import videoBG from '../assets/BG2.mp4';
import bg1 from '../assets/BG1.png';
import bg2 from '../assets/BG2.png';
import ProductCard from './ProductCard';

function ShopSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const shopGridRef = useRef(null);

  const [mobileBgIndex, setMobileBgIndex] = useState(0);
  const mobileBackgrounds = [bg2, bg1];

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

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedSex, setSelectedSex] = useState(searchParams.get('sex') || 'all');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [maxPrice, setMaxPrice] = useState(25000);

  const [mode, setMode] = useState(searchParams.get('mode') || 'all');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL || 'https://mynewstyle-server.onrender.com';
        const params = new URLSearchParams();
        if (mode && mode !== 'all' && mode !== 'new') params.set('mode', mode);

        const res = await fetch(`${apiUrl}/api/products?${params.toString()}`);

        if (!res.ok) {
          throw new Error('Erreur lors du chargement des produits');
        }

        const data = await res.json();
        const formatted = data.map((p) => ({ ...p, id: p._id }));
        setProducts(formatted);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [mode]);

  useEffect(() => {
    if (searchParams.get('category') || searchParams.get('sex') || searchParams.get('mode') || searchParams.get('search')) {
      setTimeout(() => {
        shopGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageTitleKey = useMemo(() => {
    if (mode === 'new') return 'shop_title_new';
    if (mode === 'bestseller') return 'shop_title_bestseller';
    if (mode === 'promo') return 'shop_title_promo';
    if (selectedCategory !== 'all') return `shop_title_cat_${selectedCategory}`;
    return 'sec_category_title';
  }, [mode, selectedCategory]);

  // "Nouveautés" = articles ajoutés ce mois-ci. Repli automatique sur la liste
  // complète si rien n'a été ajouté ce mois-ci (jamais de page vide).
  const isThisMonth = (dateStr) => {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  };

  const baseProducts = useMemo(() => {
    if (mode !== 'new') return products;
    const thisMonthProducts = products.filter((p) => isThisMonth(p.createdAt));
    return thisMonthProducts.length > 0 ? thisMonthProducts : products;
  }, [products, mode]);

  const filteredProducts = baseProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

    // L'unisexe s'affiche systématiquement en plus du genre choisi
    const matchesSex =
      selectedSex === 'all' ||
      product.sex === selectedSex ||
      (selectedSex !== 'unisex' && product.sex === 'unisex');

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

  const handleResetFilters = () => {
    setSelectedSex('all');
    setSelectedCategory('all');
    setSelectedSize('all');
    setMaxPrice(25000);
    setSearchQuery('');
    setMode('all');
    navigate('/shop', { replace: true });
  };

  return (
    <div className="relative font-clean bg-[#f5f2eb]/20">

      <section className="relative h-[100dvh] w-full overflow-hidden">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute left-6 md:left-6 top-6 cursor-pointer pointer-events-auto z-50 mix-blend-difference"
        >
          <img src={logo} alt="MyNewStyle Logo" className="h-14 md:h-16 lg:h-20 object-contain invert" />
        </motion.div>

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

          <div className="absolute top-32 inset-x-0 flex flex-col items-center justify-start pointer-events-none z-10">
            <h1 className="text-6xl lg:text-8xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
              {t('shop_title')}
            </h1>
            <p className="text-white/95 text-xl lg:text-2xl max-w-3xl text-center drop-shadow-md font-medium">
              {t('shop_desc')}
            </p>
          </div>

          <div className="absolute bottom-4 inset-x-0 w-full px-8 lg:px-12 z-20 flex justify-between gap-8 lg:gap-12">

            <div
              onClick={() => handleCategorySelect('women')}
              className="group w-1/2 h-[260px] lg:h-[300px] [perspective:1500px] cursor-pointer"
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden] border-2 lg:border-[3px] border-white/80 hover:border-white rounded-2xl bg-white/5 backdrop-blur-[2px] transition-all duration-300">
                  <div className="text-white px-8 py-3 text-6xl lg:text-7xl font-bold uppercase">
                    {t('card_women_front')}
                  </div>
                </div>

                <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl shadow-2xl px-6 lg:px-12 border border-gray-200">
                  <h4 className="text-[#1b2a4a] text-3xl lg:text-4xl font-bold mb-3 tracking-tight">
                    {t('card_women_back_title')}
                  </h4>
                  <p className="text-gray-600 text-xs lg:text-sm mb-6 max-w-md">
                    {t('card_women_back_desc')}
                  </p>
                  <motion.button
                    className="border-2 border-[#1b2a4a] text-[#1b2a4a] bg-transparent px-8 py-3 text-xs lg:text-sm tracking-[0.2em] uppercase font-bold hover:bg-[#1b2a4a] hover:text-white transition-colors rounded-none font-clean"
                  >
                    {t('btn_see_more_3d')}
                  </motion.button>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleCategorySelect('men')}
              className="group w-1/2 h-[260px] lg:h-[300px] [perspective:1500px] cursor-pointer"
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden] border-2 lg:border-[3px] border-white/80 hover:border-white rounded-2xl bg-white/5 backdrop-blur-[2px] transition-all duration-300">
                  <div className="text-white px-8 py-3 text-6xl lg:text-7xl font-bold uppercase">
                    {t('card_men_front')}
                  </div>
                </div>

                <div className="absolute inset-0 bg-[#1b2a4a]/95 backdrop-blur-md flex flex-col items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl shadow-2xl px-6 lg:px-12 border border-white/20">
                  <h4 className="text-white text-3xl lg:text-4xl font-bold mb-3 tracking-tight">
                    {t('card_men_back_title')}
                  </h4>
                  <p className="text-white/80 text-xs lg:text-sm mb-6 max-w-md">
                    {t('card_men_back_desc')}
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
              {mobileBgIndex === 0 ? t('card_women_front') : t('card_men_front')}
            </motion.h2>

            <motion.p
              key={`desc-${mobileBgIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/95 text-lg font-medium mb-10 max-w-sm drop-shadow-md"
            >
              {t('mobile_desc')}
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

          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-10">
            <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${mobileBgIndex === 0 ? 'bg-white' : 'bg-white/40'}`}></div>
            <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${mobileBgIndex === 1 ? 'bg-white' : 'bg-white/40'}`}></div>
          </div>

        </div>
      </section>

      <section ref={shopGridRef} className="max-w-7xl mx-auto pt-16 pb-24 px-6 md:px-12 lg:px-20 scroll-mt-0">

        <motion.div
          key={pageTitleKey}
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
          className='flex flex-col items-center justify-center mb-12 text-center'
        >
          <h2 className="text-4xl md:text-5xl rtl:text-4xl rtl:md:text-5xl text-[#161f33] font-clean tracking-tighter font-bold">
            {t(pageTitleKey)}
          </h2>
          <div className="w-16 h-1 bg-[#1b2a4a] mt-4 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit space-y-6 lg:sticky lg:top-8"
          >
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h2 className="font-bold text-lg text-[#1b2a4a]">{t('filter_adv')}</h2>
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-500 font-semibold hover:underline"
              >
                {t('filter_reset')}
              </button>
            </div>

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
              {(selectedSex === 'men' || selectedSex === 'women') && (
                <p className="text-[10px] text-gray-400 mt-2 italic">{t('filter_gender_unisex_note')}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{t('filter_category')}</label>
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setMode('all'); }}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a] transition-all cursor-pointer"
              >
                <option value="all">{t('filter_cat_all')}</option>
                <option value="hoodies">Hoodies</option>
                <option value="sweats">Sweats</option>
                <option value="tshirts">T-Shirts</option>
                <option value="pants">Pantalons</option>
              </select>
            </div>

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

          <div className="lg:col-span-3">
            {loading ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-base font-semibold">Chargement des produits...</p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-rose-100 shadow-sm">
                <p className="text-rose-500 text-base font-semibold">{error}</p>
              </div>
            ) : filteredProducts.length > 0 ? (
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