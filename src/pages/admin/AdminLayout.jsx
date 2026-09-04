import React from 'react';
import { Outlet, NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Shirt, Package, Star, BookOpen, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logostyle_bleu.png';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Produits', icon: Shirt },
  { to: '/admin/orders', label: 'Commandes', icon: Package },
  { to: '/admin/reviews', label: 'Avis', icon: Star },
  { to: '/admin/guide', label: 'Guide', icon: BookOpen },
];

function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Pour savoir sur quelle page on est

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Vérifier si on est sur la page guide
  const isGuideActive = location.pathname === '/admin/guide';

  return (
    <div className="min-h-screen bg-[#f5f2eb] font-clean flex flex-col lg:flex-row">

      {/* ===== Sidebar desktop ===== */}
      <aside className="hidden lg:flex lg:w-72 shrink-0 bg-[#1b2a4a] text-white flex-col p-7 sticky top-0 h-screen">
        <Link to="/" className="mb-12 block">
          <img src={logo} alt="MyNewStyle" className="h-20 object-contain invert" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-2 font-bold">
            Espace Admin
          </p>
        </Link>

        <nav className="flex-1 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-[#1b2a4a] shadow-lg shadow-black/20'
                      : 'text-white/55 hover:bg-white/10 hover:text-white hover:translate-x-1'
                  }`
                }
              >
                <Icon size={19} strokeWidth={2.2} className="transition-transform duration-300 group-hover:scale-110 shrink-0" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/35 font-bold mb-1">Connecté</p>
            <p className="text-xs text-white/70 truncate font-medium">{user?.email}</p>
          </div>
          
          {/* Bouton de déconnexion Desktop (retour au style blanc/transparent) */}
          <button
            onClick={handleLogout}
            title="Se déconnecter"
            className="shrink-0 px-3 py-2 rounded-xl bg-white/10 hover:bg-rose-500 text-white flex items-center gap-2 transition-all duration-300"
          >
            <span className="text-xs font-bold">Déconnexion</span>
            <LogOut size={16} strokeWidth={2.2} />
          </button>
        </div>
      </aside>

      {/* ===== Barre mobile ===== */}
      <div className="lg:hidden bg-[#1b2a4a] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md">
        
        {/* Logo agrandi + Texte MyNewStyle */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Logo" className="h-12 object-contain invert" />
        </Link>
        
        {/* Espace vide géré par le justify-between */}
        
        <div className="flex items-center gap-2.5">
          {/* Bouton Guide avec style actif/inactif */}
          <Link
            to="/admin/guide"
            title="Guide"
            className={`w-10 h-10 rounded-xl shadow-sm flex items-center justify-center transition-all duration-300 ${
              isGuideActive 
                ? 'bg-white text-[#1b2a4a] scale-105' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <BookOpen size={18} strokeWidth={2.2} />
          </Link>
          
          <button
            onClick={handleLogout}
            title="Se déconnecter"
            className="w-10 h-10 rounded-xl bg-rose-500 shadow-sm flex items-center justify-center text-white hover:bg-rose-600 transition-colors duration-300"
          >
            <LogOut size={18} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* ===== Contenu ===== */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 pb-28 lg:pb-10 overflow-x-hidden">
        <Outlet />
      </main>

      {/* ===== Navigation basse mobile ===== */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-2.5 px-2 z-40 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        {navItems
          .filter((item) => item.label !== 'Guide') /* Le Guide est bien retiré d'ici */
          .map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-3.5 py-2 rounded-2xl text-[10px] font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-[#1b2a4a] text-white shadow-md shadow-[#1b2a4a]/30 scale-105'
                      : 'text-gray-400 hover:text-[#1b2a4a]'
                  }`
                }
              >
                <Icon size={18} strokeWidth={2.2} />
                {item.label}
              </NavLink>
            );
          })}
      </nav>
    </div>
  );
}

export default AdminLayout;