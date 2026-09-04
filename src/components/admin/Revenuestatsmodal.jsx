import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, RotateCcw, XCircle, ShoppingBag, AlertTriangle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://mynewstyle-server.onrender.com';

function MiniStat({ icon: Icon, label, value, accent }) {
  return (
    <div className="bg-gray-50/70 rounded-2xl p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accent}`}>
        <Icon size={17} strokeWidth={2.2} />
      </div>
      <div className="min-w-0">
        <p className="text-lg font-black text-[#161f33] truncate">{value}</p>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}

function RevenueStatsModal({ onClose }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredMonth, setHoveredMonth] = useState(null);

  const getToken = () => localStorage.getItem('token');

  const fetchStats = async (y) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/orders/stats?year=${y}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) setStats(await res.json());
    } catch (err) {
      console.error('Erreur chargement statistiques:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  const maxRevenue = stats ? Math.max(...stats.monthly.map((m) => m.revenue), 1) : 1;

  return (
    <div className="fixed inset-0 bg-[#1b2a4a]/50 backdrop-blur-sm z-[80] flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl font-clean"
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 sm:px-8 py-5 flex items-center justify-between z-10 rounded-t-3xl">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1b2a4a] tracking-tight">Statistiques</h2>
            <p className="text-xs text-gray-400 font-semibold">Chiffre d'affaires, annulations et retours</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-[#1b2a4a] p-2 hover:bg-gray-50 rounded-xl transition-colors">
            <X size={22} strokeWidth={2.2} />
          </button>
        </div>

        {loading || !stats ? (
          <div className="p-12 text-center text-gray-400 text-sm">Chargement...</div>
        ) : (
          <div className="p-5 sm:p-8">

            <div className="flex gap-2 mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {stats.availableYears.map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                    year === y ? 'bg-[#1b2a4a] text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>

            {/* ===================== DESKTOP : Graphique en barres ===================== */}
            <div className="hidden lg:block">
              <div className="bg-gray-50/50 rounded-3xl p-6 mb-6">
                <div className="flex items-end justify-between gap-2 h-56 mb-3">
                  {stats.monthly.map((m) => {
                    const heightPercent = (m.revenue / maxRevenue) * 100;
                    const hasIssues = m.cancelled + m.returned > 0;
                    return (
                      <div
                        key={m.month}
                        className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
                        onMouseEnter={() => setHoveredMonth(m.month)}
                        onMouseLeave={() => setHoveredMonth(null)}
                      >
                        {hoveredMonth === m.month && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-2 -translate-y-full bg-[#1b2a4a] text-white text-[10px] rounded-xl px-3 py-2 whitespace-nowrap shadow-lg z-10"
                          >
                            <p className="font-bold">{m.revenue} DA</p>
                            <p className="text-white/70">{m.orders} commande(s)</p>
                            {hasIssues && (
                              <p className="text-rose-300 mt-0.5">
                                {m.cancelled > 0 && `${m.cancelled} annulée(s) `}
                                {m.returned > 0 && `${m.returned} retournée(s)`}
                              </p>
                            )}
                          </motion.div>
                        )}
                        <div
                          className={`w-full max-w-[36px] rounded-t-lg transition-all duration-500 ${
                            hasIssues ? 'bg-[#1b2a4a] group-hover:bg-rose-400' : 'bg-[#1b2a4a] group-hover:bg-[#121c33]'
                          }`}
                          style={{ height: `${Math.max(heightPercent, 2)}%` }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between gap-2">
                  {stats.monthly.map((m) => (
                    <span key={m.month} className="flex-1 text-center text-[10px] font-bold text-gray-400">
                      {m.monthLabel}
                    </span>
                  ))}
                </div>
              </div>

              {stats.worstMonth && (
                <div className="flex items-center gap-3 bg-rose-50 rounded-2xl px-5 py-4 mb-6">
                  <AlertTriangle size={18} strokeWidth={2.2} className="text-rose-500 shrink-0" />
                  <p className="text-sm text-rose-600">
                    <strong>{stats.worstMonth.monthLabel} {year}</strong> a eu le plus d'annulations/retours cette année
                    ({stats.worstMonth.cancelled} annulée(s), {stats.worstMonth.returned} retournée(s)).
                  </p>
                </div>
              )}

              <div className="grid grid-cols-4 gap-4">
                <MiniStat icon={TrendingUp} label={`Revenu ${year}`} value={`${stats.yearlyTotal.revenue} DA`} accent="bg-[#1b2a4a] text-white" />
                <MiniStat icon={ShoppingBag} label="Commandes" value={stats.yearlyTotal.orders} accent="bg-blue-50 text-blue-600" />
                <MiniStat icon={XCircle} label="Annulées" value={stats.yearlyTotal.cancelled} accent="bg-rose-50 text-rose-600" />
                <MiniStat icon={RotateCcw} label="Retournées" value={stats.yearlyTotal.returned} accent="bg-orange-50 text-orange-600" />
              </div>
            </div>

            {/* ===================== MOBILE : Résumé scrollable, chiffres uniquement ===================== */}
            <div className="lg:hidden space-y-6">

              <div className="bg-[#1b2a4a] rounded-3xl p-5 text-white">
                <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-3">Ce mois-ci</p>
                <p className="text-3xl font-black mb-4">{stats.currentMonth.revenue} DA</p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-lg font-bold">{stats.currentMonth.orders}</p>
                    <p className="text-[9px] text-white/50 uppercase font-bold">Commandes</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-rose-300">{stats.currentMonth.cancelled}</p>
                    <p className="text-[9px] text-white/50 uppercase font-bold">Annulées</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-orange-300">{stats.currentMonth.returned}</p>
                    <p className="text-[9px] text-white/50 uppercase font-bold">Retournées</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50/70 rounded-3xl p-5">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">Cette année ({year})</p>
                <p className="text-2xl font-black text-[#1b2a4a] mb-4">{stats.yearlyTotal.revenue} DA</p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-base font-bold text-[#161f33]">{stats.yearlyTotal.orders}</p>
                    <p className="text-[9px] text-gray-400 uppercase font-bold">Commandes</p>
                  </div>
                  <div>
                    <p className="text-base font-bold text-rose-500">{stats.yearlyTotal.cancelled}</p>
                    <p className="text-[9px] text-gray-400 uppercase font-bold">Annulées</p>
                  </div>
                  <div>
                    <p className="text-base font-bold text-orange-500">{stats.yearlyTotal.returned}</p>
                    <p className="text-[9px] text-gray-400 uppercase font-bold">Retournées</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3 px-1">Par mois</p>
                <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
                  {stats.monthly.map((m) => (
                    <div
                      key={m.month}
                      className="shrink-0 w-32 bg-white border border-gray-100 rounded-2xl p-4 snap-start"
                    >
                      <p className="text-xs font-bold text-gray-400 uppercase mb-2">{m.monthLabel}</p>
                      <p className="text-base font-black text-[#1b2a4a] mb-2">{m.revenue} DA</p>
                      <div className="flex gap-2 text-[10px]">
                        <span className="text-gray-400">{m.orders} cmd</span>
                        {m.cancelled > 0 && <span className="text-rose-500">{m.cancelled} ann.</span>}
                        {m.returned > 0 && <span className="text-orange-500">{m.returned} ret.</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3 px-1">Par année</p>
                <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
                  {stats.yearlyBreakdown.map((y) => (
                    <div
                      key={y.year}
                      className={`shrink-0 w-36 rounded-2xl p-4 snap-start border ${
                        y.year === year ? 'bg-[#1b2a4a] text-white border-[#1b2a4a]' : 'bg-white border-gray-100'
                      }`}
                    >
                      <p className={`text-xs font-bold uppercase mb-2 ${y.year === year ? 'text-white/60' : 'text-gray-400'}`}>
                        {y.year}
                      </p>
                      <p className="text-base font-black mb-2">{y.revenue} DA</p>
                      <div className="flex gap-2 text-[10px]">
                        <span className={y.year === year ? 'text-white/70' : 'text-gray-400'}>{y.orders} cmd</span>
                        <span className={y.year === year ? 'text-rose-300' : 'text-rose-500'}>{y.cancelled} ann.</span>
                        <span className={y.year === year ? 'text-orange-300' : 'text-orange-500'}>{y.returned} ret.</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {stats.worstMonth && (
                <div className="flex items-center gap-3 bg-rose-50 rounded-2xl px-4 py-3.5">
                  <AlertTriangle size={16} strokeWidth={2.2} className="text-rose-500 shrink-0" />
                  <p className="text-xs text-rose-600">
                    <strong>{stats.worstMonth.monthLabel}</strong> : le plus d'annulations/retours cette année.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default RevenueStatsModal;