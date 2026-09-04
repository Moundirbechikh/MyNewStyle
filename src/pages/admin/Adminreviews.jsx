import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'https://mynewstyle-server.onrender.com';

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem('token');

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/reviews?limit=200`);
      if (res.ok) setReviews(await res.json());
    } catch (err) {
      console.error('Erreur chargement avis:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (review) => {
    if (!window.confirm('Supprimer cet avis définitivement ?')) return;
    try {
      const res = await fetch(`${API_URL}/api/reviews/${review._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      setReviews((prev) => prev.filter((r) => r._id !== review._id));
    } catch (err) {
      alert(err.message);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div>
         <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-5xl sm:text-6xl font-black text-[#1b2a4a] tracking-tighter">
            Avis des clients
        </h1>
        <div className="w-16 h-1.5 bg-[#1b2a4a] mt-4 rounded-full"></div>
      </motion.div>

      {loading ? (
        <p className="text-gray-400 text-sm">Chargement...</p>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
          <p className="text-gray-500 font-semibold">Aucun avis pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence>
            {reviews.map((review) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 shrink-0 bg-[#1b2a4a] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {review.user?.nom ? review.user.nom.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#161f33]">{review.user?.nom || 'Client'}</p>
                      <p className="text-[11px] text-gray-400">{review.user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(review)}
                    className="text-gray-300 hover:text-rose-500 p-1"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                    </svg>
                  </button>
                </div>

                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < review.rating ? '#1b2a4a' : '#e5e7eb'}>
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-2">{review.comment}</p>
                <p className="text-[10px] text-gray-400">{formatDate(review.createdAt)}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default AdminReviews;