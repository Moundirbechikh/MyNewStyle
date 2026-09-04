import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'https://mynewstyle-server.onrender.com';

function RatingForm({ onChanged }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [hasExisting, setHasExisting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getToken = () => localStorage.getItem('token');

  // Précharge l'avis existant de l'utilisateur, s'il en a déjà laissé un
  const fetchMyReview = async () => {
    if (!user) {
      setFetching(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/reviews/me`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setRating(data.rating);
          setComment(data.comment);
          setHasExisting(true);
        } else {
          setHasExisting(false);
          setRating(0);
          setComment('');
        }
      }
    } catch (err) {
      console.error('Erreur chargement avis:', err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchMyReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError(t('rating_error_no_stars'));
      return;
    }
    if (comment.trim().length === 0) {
      setError(t('rating_error_no_comment'));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ rating, comment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur');

      setSuccess(true);
      setHasExisting(true);
      if (onChanged) onChanged();

      setTimeout(() => {
        setSuccess(false);
        setIsFormOpen(false);
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(t('rating_delete_confirm'))) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/reviews/me`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error('Erreur lors de la suppression');

      setRating(0);
      setComment('');
      setHasExisting(false);
      setIsFormOpen(false);
      if (onChanged) onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cardStyle =
    "bg-white/95 backdrop-blur-md p-8 md:p-10 font-clean rounded-tl-[3rem] rtl:rounded-tl-none rtl:rounded-tr-[3rem] rounded-br-[1.5rem] rtl:rounded-br-none rtl:rounded-bl-[1.5rem] shadow-xl border border-[#1b2a4a] text-center max-w-xl mx-auto transition-all duration-500";

  // ================= État : pas connecté =================
  if (!user) {
    return (
      <div className={cardStyle}>
        <h3 className="text-xl lg:text-2xl font-bold text-[#161f33] mb-2">{t('rating_login_title')}</h3>
        <p className="text-base text-gray-500 mb-8 italic">{t('rating_login_desc')}</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-[#1b2a4a] hover:bg-[#121c33] text-white px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {t('navbar_login')}
        </button>
      </div>
    );
  }

  // ================= État : chargement =================
  if (fetching) {
    return (
      <div className={cardStyle}>
        <p className="text-sm text-gray-400 animate-pulse">{t('search_loading')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto w-full font-clean">
      <AnimatePresence mode="wait">

        {/* ================= État : formulaire ouvert (création ou édition) ================= */}
        {isFormOpen ? (
          <motion.div
            key="form-state"
            initial={{ opacity: 0, y: 20, clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0, y: -20, clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cardStyle}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl lg:text-2xl font-bold text-[#161f33]">
                {hasExisting ? t('rating_edit_title') : t('rating_title')}
              </h3>
              <button
                onClick={() => { setIsFormOpen(false); setError(''); }}
                className="text-gray-400 hover:text-[#1b2a4a] transition-colors p-2"
                aria-label="Fermer"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <p className="text-base text-gray-700 mb-8 italic leading-relaxed text-left">
              {t('rating_desc')}
            </p>

            {error && (
              <div className="bg-rose-50 text-rose-600 text-sm font-bold rounded-xl px-4 py-3 mb-6 text-center border border-rose-100">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-50 text-emerald-600 text-sm font-bold rounded-xl px-4 py-3 mb-6 text-center border border-emerald-100">
                {t('rating_success')}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex justify-center gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill={(hoverRating || rating) >= star ? '#1b2a4a' : '#e5e7eb'}
                      className="transition-colors duration-200"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </button>
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t('rating_placeholder')}
                rows={4}
                maxLength={500}
                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-[#1b2a4a] focus:ring-1 focus:ring-[#1b2a4a] resize-none mb-8 transition-all"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1b2a4a] hover:bg-[#121c33] disabled:opacity-60 text-white py-4 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {loading ? t('rating_submitting') : hasExisting ? t('rating_update_submit') : t('rating_submit')}
              </button>
            </form>
          </motion.div>
        ) : hasExisting ? (
          // ================= État : mon avis existant (Modifier / Supprimer) =================
          <motion.div
            key="my-review-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={cardStyle}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-[#161f33]">{t('rating_my_review_title')}</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="text-xs font-bold text-[#1b2a4a] hover:underline uppercase tracking-wider"
                >
                  {t('rating_edit_btn')}
                </button>
                <span className="text-gray-200">|</span>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="text-xs font-bold text-rose-500 hover:underline uppercase tracking-wider disabled:opacity-50"
                >
                  {t('rating_delete_btn')}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-rose-50 text-rose-600 text-xs font-bold rounded-xl px-4 py-2.5 mb-4">
                {error}
              </div>
            )}

            <div className="flex gap-1 mb-4 justify-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={i < rating ? '#1b2a4a' : '#e5e7eb'}>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 text-sm italic leading-relaxed">"{comment}"</p>
          </motion.div>
        ) : (
          // ================= État : bouton "Donner mon avis" =================
          <motion.div
            key="button-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-[#1b2a4a] hover:bg-[#121c33] text-white px-10 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-2xl border border-[#1b2a4a] flex items-center gap-3"
            >
              <span>{t('rating_give_btn')}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RatingForm;