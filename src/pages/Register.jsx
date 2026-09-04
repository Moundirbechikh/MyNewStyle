import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AuthVisualPanel from '../components/Authvisualpanel';

function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: '',
    telephone: '',
    adresse: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await register(formData);
      // Compte créé mais pas encore vérifié : on envoie vers la page de code
      navigate('/verify-email', { state: { email: data.email } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden font-clean bg-[#f5f2eb]">

      <AuthVisualPanel
        badgeKey="register_visual_badge"
        titleKey="register_visual_title"
        descKey="register_visual_desc"
      />

      <div className="flex-1 h-full flex items-center justify-center px-6 sm:px-12 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-sm py-6"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-[#161f33] tracking-tight mb-1.5">
            {t('register_title')}
          </h1>
          <p className="text-gray-500 text-sm mb-5">{t('register_desc')}</p>

          {error && (
            <div className="bg-rose-50 text-rose-600 text-xs font-semibold rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                {t('form_name')}
              </label>
              <input
                type="text"
                name="nom"
                required
                value={formData.nom}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                {t('form_email')}
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                {t('form_password')}
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                {t('form_phone')}
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                {t('form_address')}
              </label>
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1b2a4a] focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1b2a4a] hover:bg-[#121c33] disabled:opacity-60 text-white py-3.5 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md shadow-[#1b2a4a]/20 mt-1"
            >
              {loading ? t('register_loading') : t('register_submit')}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            {t('register_have_account')}{' '}
            <Link to="/login" className="text-[#1b2a4a] font-bold hover:underline">
              {t('register_login_link')}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;