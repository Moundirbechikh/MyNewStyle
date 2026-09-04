import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'https://mynewstyle-server.onrender.com';

const STATUS_STYLES = {
  en_attente: 'bg-amber-50 text-amber-600',
  confirmee: 'bg-blue-50 text-blue-600',
  expediee: 'bg-purple-50 text-purple-600',
  livree: 'bg-emerald-50 text-emerald-600',
  annulee: 'bg-rose-50 text-rose-600',
  retournee: 'bg-orange-50 text-orange-600',
};

const STATUS_LABELS = {
  en_attente: 'En attente',
  confirmee: 'Confirmée',
  expediee: 'Expédiée',
  livree: 'Livrée',
  annulee: 'Annulée',
  retournee: 'Retournée',
};

const STATUS_OPTIONS = ['en_attente', 'confirmee', 'expediee', 'livree', 'annulee', 'retournee'];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const getToken = () => localStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search.trim()) params.set('search', search.trim());
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const res = await fetch(`${API_URL}/api/orders?${params.toString()}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) setOrders(await res.json());
    } catch (err) {
      console.error('Erreur chargement commandes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchOrders, 300); // debounce recherche
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, statusFilter]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ statut: newStatus }),
      });
      if (!res.ok) throw new Error('Erreur de mise à jour du statut');
      const updated = await res.json();
      setOrders((prev) => prev.map((o) => (o._id === updated._id ? updated : o)));
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
            Commandes
        </h1>
        <div className="w-16 h-1.5 bg-[#1b2a4a] mt-4 rounded-full"></div>
      </motion.div>

      {/* Recherche + filtre */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Rechercher par référence, nom du client, email, article..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[240px] bg-white border border-gray-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a]"
        >
          <option value="all">Tous les statuts</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Chargement...</p>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
          <p className="text-gray-500 font-semibold">Aucune commande trouvée.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {orders.map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        #{order._id.slice(-6).toUpperCase()}
                        <span className="text-gray-400 font-normal ml-2">{formatDate(order.createdAt)}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {order.nomDestinataire} — {order.user?.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-bold text-[#1b2a4a]">{order.total} DA</p>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${STATUS_STYLES[order.statut]}`}>
                        {STATUS_LABELS[order.statut]}
                      </span>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === order._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-50 overflow-hidden"
                    >
                      <div className="p-5 space-y-4">
                        {/* Articles */}
                        <div className="space-y-2">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-gray-50/70 rounded-xl p-2.5">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
                                <p className="text-[11px] text-gray-400">{item.color} — {item.size} — x{item.quantity}</p>
                              </div>
                              <p className="text-xs font-bold text-[#1b2a4a]">{item.price * item.quantity} DA</p>
                            </div>
                          ))}
                        </div>

                        {/* Livraison */}
                        <div className="bg-[#f5f2eb] rounded-xl p-4">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Livraison</p>
                          <p className="text-sm text-gray-700">{order.adresseLivraison}, {order.ville}</p>
                          <p className="text-sm text-gray-700">Tél : {order.telephone}</p>
                          {order.notes && <p className="text-xs text-gray-500 mt-1 italic">Notes : {order.notes}</p>}
                        </div>

                        {/* Boutons de statut */}
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Changer le statut</p>
                          <div className="flex flex-wrap gap-2">
                            {STATUS_OPTIONS.map((status) => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(order._id, status)}
                                className={`text-[11px] font-bold uppercase tracking-wider px-3 py-2 rounded-xl border transition-all ${
                                  order.statut === status
                                    ? 'bg-[#1b2a4a] text-white border-[#1b2a4a]'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#1b2a4a] hover:text-[#1b2a4a]'
                                }`}
                              >
                                {STATUS_LABELS[status]}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;