import React from 'react';
import {
  Package,
  Shirt,
  Star,
  LayoutDashboard,
  Plus,
  Trash2,
  AlertTriangle,
} from 'lucide-react';

function GuideRow({ children, text }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 hover:border-[#1b2a4a]/20 hover:shadow-sm transition-all duration-300">
      <div className="shrink-0 flex items-center justify-center sm:w-56">{children}</div>
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-black text-[#1b2a4a] tracking-tight mt-12 mb-5 first:mt-0 flex items-center gap-3">
      <span className="w-10 h-10 rounded-2xl bg-[#1b2a4a] flex items-center justify-center shrink-0">
        <Icon size={19} strokeWidth={2.2} className="text-white" />
      </span>
      {children}
    </h2>
  );
}

function AdminGuide() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-5xl sm:text-6xl font-black text-[#1b2a4a] tracking-tighter mb-3">
        Guide d'utilisation
      </h1>
      <div className="w-16 h-1.5 bg-[#1b2a4a] rounded-full mb-5"></div>
      <p className="text-sm text-gray-500 mb-8 max-w-xl leading-relaxed">
        Chaque bouton ci-dessous est identique à celui que tu verras réellement dans l'interface —
        survole-le et clique dessus pour comprendre exactement à quoi il sert.
      </p>

      {/* ============ PRODUITS ============ */}
      <SectionTitle icon={Shirt}>Gérer les produits</SectionTitle>
      <div className="space-y-3">
        <GuideRow
          text="Ouvre le formulaire complet pour créer un nouvel article : nom, description, prix, catégorie, genre, tailles, puis au moins une couleur avec sa photo et son stock."
        >
          <button className="bg-[#1b2a4a] hover:bg-[#121c33] text-white px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-[#1b2a4a]/30">
            <Plus size={16} strokeWidth={2.5} />
            Ajouter un produit
          </button>
        </GuideRow>

        <GuideRow
          text="Pour la photo de chaque couleur : clique sur le carré 'Photo', choisis une image sur ton ordinateur — elle part automatiquement sur Cloudinary et l'aperçu s'affiche dès que c'est terminé (petit indicateur de chargement pendant l'envoi)."
        >
          <div className="w-20 h-20 rounded-xl bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-400 text-[10px] cursor-pointer transition-colors duration-300">
            Photo
          </div>
        </GuideRow>

        <GuideRow
          text="La grille apparaît automatiquement selon les tailles que tu as tapées. Chaque case = le stock disponible pour CETTE couleur et CETTE taille précise. Modifie le chiffre directement."
        >
          <div className="grid grid-cols-3 gap-1.5">
            {['S', 'M', 'L'].map((s) => (
              <div key={s} className="bg-white rounded-lg p-2 border border-gray-200 hover:border-[#1b2a4a] w-14 cursor-pointer transition-colors duration-300">
                <p className="text-[9px] font-bold text-gray-400 text-center">{s}</p>
                <p className="text-center text-sm font-bold text-[#1b2a4a]">12</p>
              </div>
            ))}
          </div>
        </GuideRow>

        <GuideRow text="Ouvre le même formulaire, déjà rempli avec les infos actuelles du produit — modifie ce que tu veux et enregistre.">
          <button className="text-xs font-bold text-[#1b2a4a] bg-gray-50 hover:bg-gray-100 py-2.5 px-6 rounded-xl transition-colors duration-300">
            Modifier
          </button>
        </GuideRow>

        <GuideRow text="Supprime le produit définitivement après confirmation. Cette action est irréversible — utilise plutôt la case 'Produit actif' ci-dessous si tu veux juste le cacher temporairement.">
          <button className="text-xs font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 py-2.5 px-6 rounded-xl transition-colors duration-300 flex items-center gap-2">
            <Trash2 size={14} strokeWidth={2.2} />
            Supprimer
          </button>
        </GuideRow>

        <GuideRow text="Décoche cette case dans le formulaire pour retirer le produit du site SANS le supprimer (utile en cas de rupture longue). Recoche pour le republier.">
          <label className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-2.5 cursor-pointer transition-colors duration-300">
            <input type="checkbox" defaultChecked readOnly className="w-4 h-4 accent-[#1b2a4a]" />
            <span className="text-xs font-bold text-gray-700">Produit actif</span>
          </label>
        </GuideRow>

        <GuideRow text="Coche cette case pour que l'article apparaisse dans l'onglet 'Best Sellers' du site (Hero et filtres de la boutique).">
          <label className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-2.5 cursor-pointer transition-colors duration-300">
            <input type="checkbox" defaultChecked readOnly className="w-4 h-4 accent-[#1b2a4a]" />
            <span className="text-xs font-bold text-gray-700">Best-seller</span>
          </label>
        </GuideRow>

        <GuideRow text="Coche 'En promotion' puis renseigne l'ancien prix : il s'affichera barré à côté du nouveau prix sur le site, et l'article apparaît dans l'onglet Promotions.">
          <label className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-2.5 cursor-pointer transition-colors duration-300">
            <input type="checkbox" defaultChecked readOnly className="w-4 h-4 accent-[#1b2a4a]" />
            <span className="text-xs font-bold text-gray-700">En promotion</span>
          </label>
        </GuideRow>

        <GuideRow text="Ce badge orange apparaît automatiquement dès qu'une taille d'un article tombe à 10 unités ou moins — surveille-le pour réapprovisionner à temps.">
          <span className="text-[10px] font-bold uppercase bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full">
            Stock : 6
          </span>
        </GuideRow>
      </div>

      {/* ============ COMMANDES ============ */}
      <SectionTitle icon={Package}>Gérer les commandes</SectionTitle>
      <div className="space-y-3">
        <GuideRow text="Clique n'importe où sur une ligne de commande pour dérouler le détail : articles achetés (avec photo), adresse de livraison, téléphone, et les boutons de statut.">
          <div className="text-xs text-gray-400 italic">Clique sur la carte ↓</div>
        </GuideRow>

        <GuideRow text="Tape une référence de commande (ex: B8F486), un nom de client, un email ou même un nom d'article — les résultats se filtrent en direct.">
          <input
            readOnly
            value="Rechercher..."
            className="bg-white border border-gray-200 hover:border-[#1b2a4a] rounded-2xl px-4 py-2.5 text-xs text-gray-400 w-full cursor-pointer transition-colors duration-300"
          />
        </GuideRow>

        <GuideRow text="Ces boutons changent le statut de la commande. Clique sur celui qui correspond à l'étape actuelle — le bouton actif est en bleu marine plein, les autres restent cliquables à tout moment.">
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] font-bold uppercase px-2.5 py-1.5 rounded-lg bg-[#1b2a4a] text-white">
              Confirmée
            </span>
            <span className="text-[10px] font-bold uppercase px-2.5 py-1.5 rounded-lg bg-white text-gray-500 border border-gray-200 hover:border-[#1b2a4a] hover:text-[#1b2a4a] cursor-pointer transition-colors duration-300">
              Expédiée
            </span>
          </div>
        </GuideRow>

        <GuideRow text="Utilise 'Livrée' une fois le colis remis au client. Utilise 'Annulée' si la commande n'a jamais été honorée, et 'Retournée' si le client a renvoyé l'article après réception — les deux servent à distinguer clairement tes statistiques de vente réelles.">
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] font-bold uppercase px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 cursor-pointer transition-colors duration-300">
              Livrée
            </span>
            <span className="text-[10px] font-bold uppercase px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer transition-colors duration-300">
              Annulée
            </span>
            <span className="text-[10px] font-bold uppercase px-2.5 py-1.5 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 cursor-pointer transition-colors duration-300">
              Retournée
            </span>
          </div>
        </GuideRow>
      </div>

      {/* ============ AVIS ============ */}
      <SectionTitle icon={Star}>Gérer les avis</SectionTitle>
      <div className="space-y-3">
        <GuideRow text="Tous les avis laissés par les clients apparaissent ici, les plus récents en premier. Ils sont aussi visibles publiquement sur la page d'accueil du site.">
          <div className="text-xs text-gray-400 italic">Liste automatique</div>
        </GuideRow>
        <GuideRow text="Supprime un avis inapproprié ou frauduleux. Cette action est immédiate et irréversible — l'avis disparaît aussi du site public.">
          <button className="text-gray-300 hover:text-rose-500 hover:bg-rose-50 p-2.5 bg-gray-50 rounded-xl transition-colors duration-300">
            <Trash2 size={18} strokeWidth={2.2} />
          </button>
        </GuideRow>
      </div>

      {/* ============ TABLEAU DE BORD ============ */}
      <SectionTitle icon={LayoutDashboard}>Tableau de bord</SectionTitle>
      <div className="space-y-3">
        <GuideRow text="Le chiffre d'affaires exclut automatiquement les commandes annulées et retournées — c'est ton vrai revenu net.">
          <div className="bg-white rounded-2xl px-4 py-3 border border-gray-100 hover:shadow-md transition-shadow duration-300 w-full">
            <p className="text-lg font-bold text-[#161f33]">45 000 DA</p>
            <p className="text-[10px] text-gray-400">Chiffre d'affaires</p>
          </div>
        </GuideRow>
        <GuideRow text="Cette section liste les produits dont au moins une taille est à 3 unités ou moins — clique sur 'Gérer' pour aller directement les réapprovisionner.">
          <span className="text-[10px] font-bold text-rose-500 uppercase flex items-center gap-1.5">
            <AlertTriangle size={13} strokeWidth={2.5} />
            Stock faible
          </span>
        </GuideRow>
      </div>
    </div>
  );
}

export default AdminGuide;