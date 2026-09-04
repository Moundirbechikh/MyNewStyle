import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AuthVisualPanel from '../components/Authvisualpanel';

function VerifyEmail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmail, resendCode } = useAuth();

  // L'email arrive depuis Register.jsx via navigate('/verify-email', { state: { email } })
  const emailFromState = location.state?.email || '';
  const [email] = useState(emailFromState);

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  const handleDigitChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // un seul chiffre autorisé
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = digits.join('');
    if (code.length !== 6) {
      setError(t('verify_incomplete_code'));
      return;
    }

    setError('');
    setLoading(true);
    try {
      await verifyEmail(email, code);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setResendMessage('');
    setResending(true);
    try {
      await resendCode(email);
      setResendMessage(t('verify_code_resent'));
    } catch (err) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    // Accès direct sans passer par l'inscription : on redirige proprement
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#f5f2eb] font-clean px-6">
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">{t('verify_no_email')}</p>
          <Link to="/register" className="text-[#1b2a4a] font-bold hover:underline text-sm">
            {t('register_title')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden font-clean bg-[#f5f2eb]">

      <AuthVisualPanel
        badgeKey="verify_visual_badge"
        titleKey="verify_visual_title"
        descKey="verify_visual_desc"
      />

      <div className="flex-1 h-full flex items-center justify-center px-6 sm:px-12 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-sm py-8"
        >
          <h1 className="text-3xl font-bold text-[#161f33] tracking-tight mb-2">
            {t('verify_title')}
          </h1>
          <p className="text-gray-500 text-sm mb-1">{t('verify_desc')}</p>
          <p className="text-[#1b2a4a] text-sm font-bold mb-8 truncate">{email}</p>

          {error && (
            <div className="bg-rose-50 text-rose-600 text-xs font-semibold rounded-xl px-4 py-3 mb-5">
              {error}
            </div>
          )}
          {resendMessage && (
            <div className="bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-xl px-4 py-3 mb-5">
              {resendMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-2 justify-between" onPaste={handlePaste}>
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-bold bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#1b2a4a] focus:bg-white transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1b2a4a] hover:bg-[#121c33] disabled:opacity-60 text-white py-3.5 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md shadow-[#1b2a4a]/20"
            >
              {loading ? t('verify_loading') : t('verify_submit')}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 mb-2">{t('verify_no_code')}</p>
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-[#1b2a4a] font-bold text-sm hover:underline disabled:opacity-60"
            >
              {resending ? t('verify_resending') : t('verify_resend_link')}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default VerifyEmail;