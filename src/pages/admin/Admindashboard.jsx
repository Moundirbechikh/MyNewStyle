import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Clock,
  Wallet,
  Shirt,
  AlertTriangle,
  ArrowUpRight,
} from 'lucide-react';
import RevenueStatsModal from '../../components/admin/Revenuestatsmodal';

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

function StatCard({ label, value, icon: Icon, index, onClick, clickable }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      onClick={onClick}
      className={`relative bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
        clickable ? 'cursor-pointer' : ''
      }`}
    >
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#1b2a4a]/[0.03] rounded-full"></div>

      <div className="relative flex items-start justify-between mb-5">
        <div className="w-12 h-12 rounded-2xl bg-[#1b2a4a] flex items-center justify-center shadow-lg shadow-[#1b2a4a]/20">
          <Icon size={22} strokeWidth={2.2} className="text-white" />
        </div>
        {clickable && (
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#1b2a4a] bg-[#1b2a4a]/5 px-2.5 py-1.5 rounded-full flex items-center gap-1">
            Détails <ArrowUpRight size={11} strokeWidth={2.5} />
          </span>
        )}
      </div>
      <p className="relative text-3xl font-black text-[#161f33] tracking-tight">{value}</p>
      <p className="relative text-xs text-gray-400 font-bold uppercase tracking-wider mt-1.5">{label}</p>
    </motion.div>
  );
}

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsModalOpen, setStatsModalOpen] = useState(false);

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${getToken()}` };
        const [ordersRes, productsRes] = await Promise.all([
          fetch(`${API_URL}/api/orders`, { headers }),
          fetch(`${API_URL}/api/products/admin/all`, { headers }),
        ]);
        if (ordersRes.ok) setOrders(await ordersRes.json());
        if (productsRes.ok) setProducts(await productsRes.json());
      } catch (err) {
        console.error('Erreur chargement dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const pendingOrders = orders.filter((o) => o.statut === 'en_attente').length;
  const totalRevenue = orders
    .filter((o) => o.statut !== 'annulee' && o.statut !== 'retournee')
    .reduce((sum, o) => sum + o.total, 0);
  const recentOrders = orders.slice(0, 5);

  const lowStockProducts = products.filter((p) =>
    p.colors.some((c) => Object.values(c.stockBySize || {}).some((qty) => qty <= 3))
  );

  if (loading) {
    return <p className="text-gray-400 text-sm">Chargement...</p>;
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-5xl sm:text-6xl font-black text-[#1b2a4a] tracking-tighter">
          Tableau de bord
        </h1>
        <div className="w-16 h-1.5 bg-[#1b2a4a] mt-4 rounded-full"></div>
      </motion.div>

      {/* Cartes de statistiques — le Chiffre d'affaires est cliquable */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Commandes totales" value={orders.length} icon={ShoppingBag} index={0} />
        <StatCard label="En attente" value={pendingOrders} icon={Clock} index={1} />
        <StatCard
          label="Chiffre d'affaires"
          value={`${totalRevenue} DA`}
          icon={Wallet}
          index={2}
          clickable
          onClick={() => setStatsModalOpen(true)}
        />
        <StatCard label="Produits en catalogue" value={products.length} icon={Shirt} index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg text-[#161f33]">Commandes récentes</h2>
            <Link
              to="/admin/orders"
              className="flex items-center gap-1 text-xs font-bold text-[#1b2a4a] hover:underline"
            >
              Voir tout <ArrowUpRight size={13} strokeWidth={2.5} />
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">Aucune commande pour le moment.</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between bg-gray-50/70 rounded-2xl px-4 py-3.5">
                  <div>
                    <p className="text-sm font-bold text-gray-900">#{order._id.slice(-6).toUpperCase()}</p>
                    <p className="text-xs text-gray-400">{order.nomDestinataire}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${STATUS_STYLES[order.statut]}`}>
                      {STATUS_LABELS[order.statut]}
                    </span>
                    <p className="text-xs font-bold text-[#1b2a4a] mt-1">{order.total} DA</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg text-[#161f33] flex items-center gap-2">
              <AlertTriangle size={17} strokeWidth={2.2} className="text-rose-500" />
              Stock faible
            </h2>
            <Link
              to="/admin/products"
              className="flex items-center gap-1 text-xs font-bold text-[#1b2a4a] hover:underline"
            >
              Gérer <ArrowUpRight size={13} strokeWidth={2.5} />
            </Link>
          </div>
          {lowStockProducts.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">Tout est bien approvisionné 👍</p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.slice(0, 5).map((p) => (
                <div key={p._id} className="flex items-center gap-3 bg-rose-50/50 rounded-2xl px-4 py-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <img src={p.colors[0]?.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 truncate flex-1">{p.name}</p>
                  <span className="text-[10px] font-bold text-rose-500 uppercase">Stock bas</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {statsModalOpen && <RevenueStatsModal onClose={() => setStatsModalOpen(false)} />}
    </div>
  );
}

export default AdminDashboard;