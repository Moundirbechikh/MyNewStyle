import React from 'react';
import { useTranslation } from 'react-i18next';
import logoLight from '../assets/logostyle_light.png';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-[#0d1322] text-gray-400 font-clean pt-20 pb-10 overflow-hidden border-t border-gray-800/50">
      
      {/* Effet de lueur en arrière-plan (Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Grille Principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 text-start">
          
          {/* Colonne 1 : Marque & Description (Prend plus de place) */}
          <div className="lg:col-span-4 flex flex-col space-y-8">
            <img 
              src={logoLight} 
              alt="MyNewStyle Logo" 
              className="h-16 md:h-24 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-500 transform hover:scale-105 origin-left rtl:origin-right" 
            />
            <p className="text-sm leading-relaxed text-gray-400/80 max-w-sm">
              {t('footer_desc')}
            </p>
            
            {/* Icônes Réseaux Sociaux - Hover avec effet de remplissage */}
            <div className="flex items-center gap-4 pt-4">
              {[
                { icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>, link: "#" },
                { icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></>, link: "#" },
                { icon: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>, link: "#" }
              ].map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.link} 
                  className="group relative w-12 h-12 flex items-center justify-center rounded-full border border-gray-700/50 bg-transparent overflow-hidden transition-all duration-500"
                >
                  <span className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
                  <svg 
                    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" 
                    className="relative z-10 text-gray-400 group-hover:text-[#0d1322] transition-colors duration-500"
                  >
                    {item.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div className="lg:col-span-2 lg:col-start-6 flex flex-col space-y-6">
            <h3 className="text-white font-bold uppercase tracking-[0.2em] text-xs opacity-80">{t('footer_links')}</h3>
            <ul className="space-y-4 text-sm flex flex-col items-start">
              {['nav_home', 'nav_shop', 'nav_about', 'nav_contact'].map((linkKey, idx) => (
                <li key={idx}>
                  <a href="#" className="group relative inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300">
                    <span className="relative z-10">{t(linkKey)}</span>
                    <span className="absolute -bottom-1 left-0 rtl:right-0 rtl:left-auto w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Contact & Commandes (Zone Mise en Avant) */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col space-y-2">
            <div className="inline-block">
              <h3 className="text-white font-bold uppercase tracking-[0.2em] text-xs opacity-80 relative inline-block">
                {t('footer_order_title')}
                <span className="absolute -top-3 -right-6 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
              </h3>
            </div>
            
            <p className="text-sm leading-relaxed text-gray-400/80 mb-2">
              Toutes nos commandes sont traitées directement par notre équipe pour vous assurer une expérience sur mesure.
            </p>

            <div className="flex flex-col space-y-5">
              {/* Bouton Téléphone */}
              <a href="tel:+213000000000" className="group flex items-center gap-4 bg-gray-900/50 border border-gray-700/50 p-4 hover:bg-white hover:border-white transition-all duration-500">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-gray-800 text-white group-hover:bg-[#0d1322] transition-colors duration-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div className="flex flex-col text-start">
                  <span className="text-xs uppercase tracking-wider text-gray-500 group-hover:text-gray-500 transition-colors">{t('footer_phone')}</span>
                  <span className="text-lg font-bold text-white group-hover:text-[#0d1322] transition-colors">+213 000 000 000</span>
                </div>
              </a>

              {/* Bouton Email */}
              <a href="mailto:contact@mynewstyle.com" className="group flex items-center gap-4 bg-gray-900/50 border border-gray-700/50 p-4 hover:bg-white hover:border-white transition-all duration-500">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-gray-800 text-white group-hover:bg-[#0d1322] transition-colors duration-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div className="flex flex-col text-start overflow-hidden">
                  <span className="text-xs uppercase tracking-wider text-gray-500 group-hover:text-gray-500 transition-colors">{t('footer_email')}</span>
                  <span className="text-base font-bold text-white group-hover:text-[#0d1322] transition-colors truncate">contact@mynewstyle.com</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Ligne de séparation & Copyright */}
        <div className="relative pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 border-t border-gray-800/50">
          <p className="hover:text-gray-300 transition-colors duration-300">{t('footer_rights')}</p>
          <div className="flex items-center gap-6 font-bold tracking-widest uppercase">
            <a href="#" className="hover:text-white transition-colors duration-300 relative group overflow-hidden">
              <span className="inline-block transform group-hover:-translate-y-full transition-transform duration-300">{t('footer_privacy')}</span>
              <span className="absolute top-0 left-0 inline-block transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-white">{t('footer_privacy')}</span>
            </a>
            <a href="#" className="hover:text-white transition-colors duration-300 relative group overflow-hidden">
              <span className="inline-block transform group-hover:-translate-y-full transition-transform duration-300">{t('footer_terms')}</span>
              <span className="absolute top-0 left-0 inline-block transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-white">{t('footer_terms')}</span>
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;