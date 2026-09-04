import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import RatingForm from './RatingForm';

const API_URL = import.meta.env.VITE_API_URL || 'https://mynewstyle-server.onrender.com';

function Reviews() {
  const { t } = useTranslation();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupère les vrais avis — endpoint public, visible par tout le monde
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error('Erreur chargement avis:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const StarRating = ({ count = 5 }) => (
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className="w-5 h-5"
          fill={index < count ? '#1b2a4a' : '#e5e7eb'}
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );

  // Contenu de carte — texte affiché tel quel (langue d'origine de l'auteur, pas de traduction)
  const renderCardContent = (review) => (
    <>
      <div>
        <StarRating count={review.rating} />
        <p className="text-gray-700 font-clean text-base lg:text-lg leading-relaxed italic mb-8">
          "{review.comment}"
        </p>
      </div>

      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
        <div className="w-12 h-12 shrink-0 bg-[#1b2a4a] rounded-full flex items-center justify-center text-white font-bold font-clean tracking-wider shadow-md">
          {review.user?.nom ? review.user.nom.charAt(0).toUpperCase() : '?'}
        </div>

        <div className="flex flex-col">
          <span className="text-[#161f33] font-bold font-clean text-base">
            {review.user?.nom || t('rating_anonymous')}
          </span>
          <span className="text-[#1b2a4a]/70 font-clean text-xs font-semibold uppercase tracking-wider mt-0.5">
            {t('rating_verified_buyer')}
          </span>
        </div>
      </div>
    </>
  );

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { clipPath: "inset(0% 0% 100% 0%)", opacity: 0, y: -20 },
    visible: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="bg-[#f5f2eb]/70 py-20 px-6 md:px-16 lg:px-20 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col justify-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center px-6 mb-12 lg:mb-16"
        >
          <h2 className="text-4xl md:text-5xl rtl:text-4xl rtl:md:text-5xl text-[#161f33] font-clean font-bold tracking-tighter">
            {t('sec_reviews_title')}
          </h2>
        </motion.div>

        {/* ========================================= */}
        {/* AFFICHAGE DES VRAIS AVIS — visible par tous, sans connexion */}
        {/* ========================================= */}
        {loading ? (
          <div className="text-center text-gray-400 text-sm py-12">{t('search_loading')}</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 max-w-md mx-auto">
            <p className="text-gray-500 font-semibold mb-1">{t('rating_empty_title')}</p>
            <p className="text-gray-400 text-sm">{t('rating_empty_desc')}</p>
          </div>
        ) : (
          <>
            {/* Mobile / Tablette : scroll horizontal */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="flex lg:hidden gap-6 px-2 md:px-0 overflow-x-auto snap-x snap-mandatory touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 pt-4"
            >
              {reviews.map((review) => (
                <motion.div
                  key={`mobile-${review._id}`}
                  variants={cardVariants}
                  className="w-[85vw] md:w-[45vw] shrink-0 snap-center group bg-white/95 backdrop-blur-md p-8 flex flex-col justify-between rounded-tl-[3rem] rtl:rounded-tl-none rtl:rounded-tr-[3rem] rounded-br-[1.5rem] rtl:rounded-br-none rtl:rounded-bl-[1.5rem] shadow-xl border border-[#1b2a4a]"
                >
                  {renderCardContent(review)}
                </motion.div>
              ))}
            </motion.div>

            {/* Desktop : grille centrée */}
            <div className="hidden lg:flex gap-8 justify-center flex-wrap pb-8 pt-4">
              <AnimatePresence>
                {reviews.map((review) => (
                  <motion.div
                    layout
                    key={`desktop-${review._id}`}
                    initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0, y: -20 }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0 }}
                    exit={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0, y: -20 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="w-[350px] shrink-0 group bg-white/95 backdrop-blur-md p-10 flex flex-col justify-between rounded-tl-[3rem] rtl:rounded-tl-none rtl:rounded-tr-[3rem] rounded-br-[1.5rem] rtl:rounded-br-none rtl:rounded-bl-[1.5rem] shadow-xl hover:shadow-2xl border border-[#1b2a4a] transition-shadow duration-500"
                  >
                    {renderCardContent(review)}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* ========================================= */}
        {/* FORMULAIRE : donner / modifier / supprimer son avis */}
        {/* ========================================= */}
        <div className="mt-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl text-center text-[#161f33] font-clean font-bold tracking-tighter mb-8"
          >
            {t('rating_section_title')}
          </motion.h3>
          <RatingForm onChanged={fetchReviews} />
        </div>

      </div>
    </section>
  );
}

export default Reviews;