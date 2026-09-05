import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import logoNoir from '../assets/logostyle.png';
import logoBleu from '../assets/logostyle_bleu.png';
import logoGrey from '../assets/logostyle_grey.png';
import logoGreyDark from '../assets/logostyle_greydark.png';
import logoLight from '../assets/logostyle_light.png';

const LOGOS = [logoNoir, logoBleu, logoGrey, logoGreyDark, logoLight];
const API_URL = import.meta.env.VITE_API_URL || 'https://mynewstyle-server.onrender.com';

// Ping le backend avec un timeout par tentative, réessaie tant qu'il ne répond pas
// (utile pour Render qui met du temps à se réveiller après une mise en veille)
async function pingBackend() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(`${API_URL}/`, { signal: controller.signal });
    clearTimeout(timeout);
    return res.ok;
  } catch (err) {
    return false;
  }
}

function LoadingScreen({ children }) {
  const [isReady, setIsReady] = useState(false);
  const [logoIndex, setLogoIndex] = useState(0);
  const cancelledRef = useRef(false);

  // Vérifie le backend en boucle jusqu'à ce qu'il réponde
  useEffect(() => {
    cancelledRef.current = false;

    const checkServer = async () => {
      const ok = await pingBackend();
      if (cancelledRef.current) return;

      if (ok) {
        setIsReady(true);
      } else {
        setTimeout(checkServer, 1500);
      }
    };

    checkServer();

    return () => {
      cancelledRef.current = true;
    };
  }, []);

  // Une fois le logo entièrement révélé, petite pause puis on passe à la couleur suivante (boucle)
  const handleRevealComplete = () => {
    if (isReady) return;
    setTimeout(() => {
      setLogoIndex((prev) => (prev + 1) % LOGOS.length);
    }, 450);
  };

  if (isReady) return children;

  return (
    <div className="fixed inset-0 bg-[#f5f2eb] flex flex-col items-center justify-center z-[9999] font-clean">
      <div className="relative w-44 h-44 sm:w-56 sm:h-56">
        {/* Le logo, toujours entièrement présent en dessous */}
        <img
          src={LOGOS[logoIndex]}
          alt="MyNewStyle"
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* Le cache : commence par tout couvrir, puis se rétracte de gauche à droite
            en révélant le logo progressivement. La clé force le redémarrage de
            l'animation à chaque changement de couleur. */}
        <motion.div
          key={logoIndex}
          className="absolute inset-0 bg-[#f5f2eb]"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 100%)' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          onAnimationComplete={handleRevealComplete}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-[10px] uppercase tracking-[0.35em] text-[#1b2a4a]/50 font-bold"
      >
        Chargement...
      </motion.p>
    </div>
  );
}

export default LoadingScreen;