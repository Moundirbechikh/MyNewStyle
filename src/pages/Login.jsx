import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AuthVisualPanel from '../components/Authvisualpanel';

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/profile');
    } catch (err) {
      // Compte pas encore vérifié : on redirige directement vers la page de code
      // au lieu d'afficher juste une erreur bloquante
      if (err.needsVerification) {
        navigate('/verify-email', { state: { email: err.email } });
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden font-clean bg-[#f5f2eb]">

      <AuthVisualPanel
        badgeKey="login_visual_badge"
        titleKey="login_visual_title"
        descKey="login_visual_desc"
      />

      <div className="flex-1 h-full flex items-center justify-center px-6 sm:px-12 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-sm py-8"
        >
          <h1 className="text-3xl font-bold text-[#161f33] tracking-tight mb-2">
            {t('login_title')}
          </h1>
          <p className="text-gray-500 text-sm mb-8">{t('login_desc')}</p>

          {error && (
            <div className="bg-rose-50 text-rose-600 text-xs font-semibold rounded-xl px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                {t('form_email')}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1b2a4a] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                {t('form_password')}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1b2a4a] focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1b2a4a] hover:bg-[#121c33] disabled:opacity-60 text-white py-3.5 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md shadow-[#1b2a4a]/20 mt-2"
            >
              {loading ? t('login_loading') : t('login_submit')}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            {t('login_no_account')}{' '}
            <Link to="/register" className="text-[#1b2a4a] font-bold hover:underline">
              {t('login_register_link')}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;