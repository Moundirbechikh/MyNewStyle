import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'hhttps://mynewstyle-server.onrender.com';

const CATEGORIES = ['tshirts', 'hoodies', 'sweats', 'pants'];
const SEXES = ['men', 'women', 'unisex'];

const emptyColor = () => ({ name: '', hex: '#1b2a4a', image: '', stockBySize: {} });

function ProductFormModal({ product, onClose, onSaved }) {
  const isEditing = Boolean(product);
  const getToken = () => localStorage.getItem('token');

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    oldPrice: '',
    category: 'tshirts',
    sex: 'men',
    sizesInput: 'S, M, L, XL',
    active: true,
    isBestseller: false,
    isPromo: false,
  });
  const [colors, setColors] = useState([emptyColor()]);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Précharge les données si on est en édition
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price ?? '',
        oldPrice: product.oldPrice ?? '',
        category: product.category || 'tshirts',
        sex: product.sex || 'men',
        sizesInput: (product.sizes || []).join(', '),
        active: product.active !== false,
        isBestseller: Boolean(product.isBestseller),
        isPromo: Boolean(product.isPromo),
      });
      setColors(
        (product.colors || []).map((c) => ({
          name: c.name,
          hex: c.hex,
          image: c.image,
          stockBySize: c.stockBySize || {},
        }))
      );
    }
  }, [product]);

  const sizes = form.sizesInput
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const handleFieldChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleColorFieldChange = (index, field, value) => {
    const updated = [...colors];
    updated[index] = { ...updated[index], [field]: value };
    setColors(updated);
  };

  const handleStockChange = (colorIndex, size, value) => {
    const updated = [...colors];
    updated[colorIndex] = {
      ...updated[colorIndex],
      stockBySize: { ...updated[colorIndex].stockBySize, [size]: Number(value) || 0 },
    };
    setColors(updated);
  };

  const handleAddColor = () => setColors([...colors, emptyColor()]);
  const handleRemoveColor = (index) => setColors(colors.filter((_, i) => i !== index));

  const handleImageUpload = async (index, file) => {
    if (!file) return;
    setUploadingIndex(index);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur d'upload");

      handleColorFieldChange(index, 'image', data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (colors.some((c) => !c.name || !c.image)) {
      setError('Chaque couleur doit avoir un nom et une image.');
      return;
    }
    if (sizes.length === 0) {
      setError('Ajoutez au moins une taille.');
      return;
    }

    const body = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      sex: form.sex,
      sizes,
      active: form.active,
      isBestseller: form.isBestseller,
      isPromo: form.isPromo,
      oldPrice: form.isPromo && form.oldPrice ? Number(form.oldPrice) : null,
      colors: colors.map((c) => ({
        name: c.name,
        hex: c.hex,
        image: c.image,
        stockBySize: c.stockBySize,
      })),
    };

    setSaving(true);
    try {
      const url = isEditing ? `${API_URL}/api/products/${product._id}` : `${API_URL}/api/products`;
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur de sauvegarde');

      onSaved();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1b2a4a]/50 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl font-clean"
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 sm:px-8 py-5 flex items-center justify-between z-10 rounded-t-3xl">
          <h2 className="text-lg font-bold text-[#161f33]">
            {isEditing ? 'Modifier le produit' : 'Ajouter un produit'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-[#1b2a4a] p-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="bg-rose-50 text-rose-600 text-sm font-semibold rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Infos générales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Nom</label>
              <input
                required
                value={form.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Prix (DA)</label>
              <input
                required
                type="number"
                value={form.price}
                onChange={(e) => handleFieldChange('price', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Description</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Catégorie</label>
              <select
                value={form.category}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Genre</label>
              <select
                value={form.sex}
                onChange={(e) => handleFieldChange('sex', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a]"
              >
                {SEXES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Tailles (séparées par virgule)</label>
              <input
                value={form.sizesInput}
                onChange={(e) => handleFieldChange('sizesInput', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a]"
              />
            </div>
          </div>

          {/* Interrupteurs */}
          <div className="flex flex-wrap gap-4">
            {[
              { key: 'active', label: 'Produit actif (visible sur le site)' },
              { key: 'isBestseller', label: 'Best-seller' },
              { key: 'isPromo', label: 'En promotion' },
            ].map((toggle) => (
              <label key={toggle.key} className="flex items-center gap-2 cursor-pointer bg-gray-50 rounded-xl px-4 py-2.5">
                <input
                  type="checkbox"
                  checked={form[toggle.key]}
                  onChange={(e) => handleFieldChange(toggle.key, e.target.checked)}
                  className="w-4 h-4 accent-[#1b2a4a]"
                />
                <span className="text-xs font-bold text-gray-700">{toggle.label}</span>
              </label>
            ))}
          </div>

          {form.isPromo && (
            <div className="max-w-xs">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Ancien prix (affiché barré)
              </label>
              <input
                type="number"
                value={form.oldPrice}
                onChange={(e) => handleFieldChange('oldPrice', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a]"
              />
            </div>
          )}

          {/* Couleurs + Stock */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#161f33]">Couleurs, photos & stock</h3>
              <button
                type="button"
                onClick={handleAddColor}
                className="text-xs font-bold text-[#1b2a4a] hover:underline"
              >
                + Ajouter une couleur
              </button>
            </div>

            <div className="space-y-5">
              <AnimatePresence>
                {colors.map((color, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100"
                  >
                    <div className="flex flex-wrap items-start gap-4 mb-4">
                      {/* Upload photo */}
                      <div className="shrink-0">
                        <label className="block w-20 h-20 rounded-xl overflow-hidden bg-gray-200 cursor-pointer relative">
                          {color.image ? (
                            <img src={color.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px] text-center px-1">
                              Photo
                            </div>
                          )}
                          {uploadingIndex === index && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[9px]">
                              ...
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(index, e.target.files[0])}
                          />
                        </label>
                      </div>

                      <div className="flex-1 min-w-[180px] grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Nom couleur</label>
                          <input
                            value={color.name}
                            onChange={(e) => handleColorFieldChange(index, 'name', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1b2a4a]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Couleur</label>
                          <input
                            type="color"
                            value={color.hex}
                            onChange={(e) => handleColorFieldChange(index, 'hex', e.target.value)}
                            className="w-full h-9 bg-white border border-gray-200 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>

                      {colors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(index)}
                          className="text-gray-300 hover:text-rose-500 p-1 shrink-0"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Grille de stock par taille */}
                    {sizes.length > 0 && (
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                          Stock par taille
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {sizes.map((size) => (
                            <div key={size} className="bg-white rounded-lg p-2 border border-gray-200">
                              <p className="text-[10px] font-bold text-gray-400 text-center mb-1">{size}</p>
                              <input
                                type="number"
                                min="0"
                                value={color.stockBySize[size] ?? 0}
                                onChange={(e) => handleStockChange(index, size, e.target.value)}
                                className="w-full text-center text-sm font-bold text-[#1b2a4a] focus:outline-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-[#1b2a4a] hover:bg-[#121c33] disabled:opacity-60 text-white py-3.5 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all duration-300"
          >
            {saving ? 'Enregistrement...' : isEditing ? 'Enregistrer les modifications' : 'Créer le produit'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ProductFormModal;