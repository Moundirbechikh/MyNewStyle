import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductFormModal from '../../components/admin/Productformmodal';

const API_URL = import.meta.env.VITE_API_URL || 'https://mynewstyle-server.onrender.com';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const getToken = () => localStorage.getItem('token');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/products/admin/all`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) setProducts(await res.json());
    } catch (err) {
      console.error('Erreur chargement produits:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (product) => {
    if (!window.confirm(`Supprimer "${product.name}" définitivement ?`)) return;
    try {
      const res = await fetch(`${API_URL}/api/products/${product._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const totalStock = (product) =>
    product.colors.reduce(
      (sum, c) => sum + Object.values(c.stockBySize || {}).reduce((s, q) => s + q, 0),
      0
    );

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-1">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-5xl sm:text-6xl font-black text-[#1b2a4a] tracking-tighter">
            Produits
        </h1>
        <div className="w-16 h-1.5 bg-[#1b2a4a] mt-4 rounded-full"></div>
      </motion.div>
        <button
          onClick={() => { setEditingProduct(null); setModalOpen(true); }}
          className="bg-[#1b2a4a] hover:bg-[#121c33] text-white px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Ajouter un produit
        </button>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] bg-white border border-gray-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a]"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a]"
        >
          <option value="all">Toutes les catégories</option>
          <option value="tshirts">T-Shirts</option>
          <option value="hoodies">Hoodies</option>
          <option value="sweats">Sweats</option>
          <option value="pants">Pantalons</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Chargement...</p>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
          <p className="text-gray-500 font-semibold">Aucun produit trouvé.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const stock = totalStock(product);
              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                      <img src={product.colors[0]?.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-gray-900 truncate">{product.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{product.category} — {product.sex}</p>
                      <p className="text-sm font-bold text-[#1b2a4a] mt-1">{product.price} DA</p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {!product.active && (
                      <span className="text-[9px] font-bold uppercase bg-gray-100 text-gray-500 px-2 py-1 rounded-full">Désactivé</span>
                    )}
                    {product.isBestseller && (
                      <span className="text-[9px] font-bold uppercase bg-[#1b2a4a] text-white px-2 py-1 rounded-full">Best-seller</span>
                    )}
                    {product.isPromo && (
                      <span className="text-[9px] font-bold uppercase bg-rose-500 text-white px-2 py-1 rounded-full">Promo</span>
                    )}
                    <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded-full ${stock <= 10 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      Stock : {stock}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-50">
                    <button
                      onClick={() => { setEditingProduct(product); setModalOpen(true); }}
                      className="flex-1 text-xs font-bold text-[#1b2a4a] bg-gray-50 hover:bg-gray-100 py-2.5 rounded-xl transition-colors"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="flex-1 text-xs font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 py-2.5 rounded-xl transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {modalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setModalOpen(false)}
          onSaved={fetchProducts}
        />
      )}
    </div>
  );
}

export default AdminProducts;