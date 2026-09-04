import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'https://mynewstyle-server.onrender.com';

function CartPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, cartTotal, updateQuantity, removeFromCart, refreshCart } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    nomDestinataire: user?.nom || '',
    telephone: user?.telephone || '',
    adresseLivraison: user?.adresse || '',
    ville: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur lors de la commande');

      setOrderSuccess(data);
      refreshCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ===== Écran de confirmation après commande =====
  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-28 pb-16 bg-[#f5f2eb] font-clean">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#161f33] mb-2">{t('order_success_title')}</h1>
          <p className="text-gray-500 text-sm mb-6">{t('order_success_desc')}</p>
          <p className="text-xs text-gray-400 mb-8">
            {t('order_number')}: #{orderSuccess._id.slice(-6).toUpperCase()}
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="w-full bg-[#1b2a4a] hover:bg-[#121c33] text-white py-3.5 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all duration-300"
          >
            {t('order_continue_shopping')}
          </button>
        </motion.div>
      </div>
    );
  }

  // ===== Panier vide =====
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f2eb] px-6 pt-28 pb-16 font-clean">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-10"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1b2a4a] tracking-tight">
              {t('cart_title')}
            </h1>
            <p className="text-sm text-gray-500 mt-2">{t('cart_subtitle')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center py-20 px-6"
          >
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-gray-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-1">{t('cart_empty_title')}</p>
            <p className="text-xs text-gray-400 max-w-xs mb-6">{t('cart_empty_desc')}</p>
            <Link
              to="/shop"
              className="bg-[#1b2a4a] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              {t('cart_go_shop')}
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f2eb] px-6 pt-28 pb-16 font-clean selection:bg-[#1b2a4a] selection:text-white">
      <div className="max-w-6xl mx-auto">

        {/* En-tête — même style que Profile/Favorites */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1b2a4a] tracking-tight">
            {t('cart_title')}
          </h1>
          <p className="text-sm text-gray-500 mt-2">{t('cart_subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Liste des articles */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 space-y-4"
          >
            <AnimatePresence>
              {cart.items.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex gap-4 items-center hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.color} — {t('cart_size')} {item.size}
                    </p>
                    <p className="text-sm font-bold text-[#1b2a4a] mt-1">{item.price} DA</p>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-50 rounded-full px-2 py-1.5 shrink-0">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-[#1b2a4a] font-bold"
                    >
                      −
                    </button>
                    <span className="text-sm font-bold w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-[#1b2a4a] font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-gray-300 hover:text-rose-500 transition-colors shrink-0 p-1"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                      <path d="M10 11v6M14 11v6"></path>
                    </svg>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Résumé + formulaire de commande */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 lg:sticky lg:top-28">
              <h2 className="font-bold text-lg text-[#1b2a4a] mb-4 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                {t('cart_summary')}
              </h2>

              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>{t('cart_subtotal')}</span>
                <span>{cartTotal} DA</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                <span>{t('cart_shipping')}</span>
                <span className="text-emerald-600 font-semibold">{t('cart_shipping_note')}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1b2a4a] mb-6">
                <span>{t('cart_total')}</span>
                <span>{cartTotal} DA</span>
              </div>

              {!showCheckout ? (
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-[#1b2a4a] hover:bg-[#121c33] text-white py-3.5 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all duration-300"
                >
                  {t('cart_checkout')}
                </button>
              ) : (
                <form onSubmit={handlePlaceOrder} className="space-y-3">
                  {error && (
                    <div className="bg-rose-50 text-rose-600 text-xs font-semibold rounded-xl px-3 py-2.5">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                      {t('form_name')}
                    </label>
                    <input
                      type="text"
                      name="nomDestinataire"
                      required
                      value={formData.nomDestinataire}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                      {t('form_phone')}
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      required
                      value={formData.telephone}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                      {t('form_address')}
                    </label>
                    <input
                      type="text"
                      name="adresseLivraison"
                      required
                      value={formData.adresseLivraison}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                      {t('form_city')}
                    </label>
                    <input
                      type="text"
                      name="ville"
                      required
                      value={formData.ville}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                      {t('form_notes')}
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#1b2a4a] hover:bg-[#121c33] disabled:opacity-60 text-white py-3.5 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all duration-300 mt-2"
                  >
                    {submitting ? t('order_placing') : t('order_confirm')}
                  </button>

                  <p className="text-[10px] text-gray-400 text-center pt-1">{t('order_no_payment_note')}</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;