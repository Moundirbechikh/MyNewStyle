import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'https://mynewstyle-server.onrender.com';

const STATUS_STYLES = {
  en_attente: 'bg-amber-50 text-amber-600',
  confirmee: 'bg-blue-50 text-blue-600',
  expediee: 'bg-purple-50 text-purple-600',
  livree: 'bg-emerald-50 text-emerald-600',
  annulee: 'bg-rose-50 text-rose-600',
};

function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.error('Erreur chargement commandes:', err);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  const userInitial = user?.nom ? user.nom.charAt(0).toUpperCase() : '?';

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#f5f2eb] px-6 pt-28 pb-16 font-clean selection:bg-[#1b2a4a] selection:text-white">
      <div className="max-w-5xl mx-auto">

        {/* En-tête de la page */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1b2a4a] tracking-tight">
            {t('profile_title')}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {t('profile_subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Colonne Gauche : Carte Utilisateur */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden lg:sticky lg:top-28">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-50 to-transparent"></div>

              <div className="relative z-10 w-24 h-24 bg-[#1b2a4a] text-[#f5f2eb] rounded-full flex items-center justify-center text-4xl font-bold mb-4 shadow-lg ring-4 ring-white">
                {userInitial}
              </div>

              <h2 className="text-xl font-bold text-gray-900 capitalize z-10">{user.nom}</h2>
              <p className="text-sm text-gray-400 mb-8 z-10">{user.email}</p>

              <div className="w-full h-px bg-gray-100 mb-6"></div>

              <button
                onClick={handleLogout}
                className="w-full group flex items-center justify-center gap-2 border border-rose-100 bg-rose-50 text-rose-600 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                {t('profile_logout')}
              </button>
            </div>
          </motion.div>

          {/* Colonne Droite : Historique des commandes — avec le détail des articles */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full min-h-[400px] flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1b2a4a]">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  {t('profile_orders_title')}
                </h3>
              </div>

              {loadingOrders ? (
                <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
                  {t('profile_orders_loading')}
                </div>
              ) : orders.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
                  <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-gray-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{t('profile_orders_empty_title')}</p>
                  <p className="text-xs text-gray-400 max-w-xs">
                    {t('profile_orders_empty_desc')}
                  </p>
                  <button
                    onClick={() => navigate('/shop')}
                    className="mt-6 bg-[#1b2a4a] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                  >
                    {t('profile_orders_cta')}
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {orders.map((order) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition-shadow"
                    >
                      {/* En-tête de la commande */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {t('order_number')} #{order._id.slice(-6).toUpperCase()}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.createdAt)}</p>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${STATUS_STYLES[order.statut] || 'bg-gray-50 text-gray-500'}`}>
                          {t(`order_status_${order.statut}`)}
                        </span>
                      </div>

                      {/* Liste réelle des articles achetés */}
                      <div className="space-y-3 mb-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-3 bg-gray-50/70 rounded-xl p-2.5">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                              {item.image && (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
                              <p className="text-[11px] text-gray-400">
                                {item.color} — {t('cart_size')} {item.size} — x{item.quantity}
                              </p>
                            </div>
                            <p className="text-xs font-bold text-[#1b2a4a] shrink-0">
                              {item.price * item.quantity} DA
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Total de la commande */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                        <p className="text-xs text-gray-500">
                          {order.items.length} {t('profile_order_items')}
                        </p>
                        <p className="text-sm font-bold text-[#1b2a4a]">{order.total} DA</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default Profile;