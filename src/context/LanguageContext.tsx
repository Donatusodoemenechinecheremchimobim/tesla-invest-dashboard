'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define valid languages
type Language = 'en' | 'es' | 'fr';

// Define the shape of our Context
interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

// 1. The Dictionary of Words
const translations: Record<Language, Record<string, string>> = {
  en: {
    connectMsg: 'Connecting to secure server...',
    dashboardTitle: 'Investor Dashboard',
    signOut: 'Sign Out',
    totalBalance: 'Total Balance',
    totalProfits: 'Total Profits',
    referralLink: 'Your Referral Link',
    marketOpp: 'Market Opportunities',
    hot: 'HOT',
    investBtn: 'Invest Now',
    recentActivity: 'Recent Activity',
    noTrans: 'No recent transactions found.',
  },
  es: {
    connectMsg: 'Conectando al servidor seguro...',
    dashboardTitle: 'Panel de Inversor',
    signOut: 'Cerrar Sesión',
    totalBalance: 'Balance Total',
    totalProfits: 'Ganancias Totales',
    referralLink: 'Tu Enlace de Referido',
    marketOpp: 'Oportunidades de Mercado',
    hot: 'CALIENTE',
    investBtn: 'Invertir Ahora',
    recentActivity: 'Actividad Reciente',
    noTrans: 'No se encontraron transacciones recientes.',
  },
  fr: {
    connectMsg: 'Connexion au serveur sécurisé...',
    dashboardTitle: 'Tableau de Bord',
    signOut: 'Se Déconnecter',
    totalBalance: 'Solde Total',
    totalProfits: 'Bénéfices Totaux',
    referralLink: 'Votre Lien de Parrainage',
    marketOpp: 'Opportunités du Marché',
    hot: 'CHAUD',
    investBtn: 'Investir Maintenant',
    recentActivity: 'Activité Récente',
    noTrans: 'Aucune transaction récente trouvée.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 2. The Provider Component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  // Optional: Load language preference from LocalStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('app-lang') as Language;
    if (savedLang && ['en', 'es', 'fr'].includes(savedLang)) {
      setLang(savedLang);
    }
  }, []);

  // Save preference when it changes
  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('app-lang', newLang);
  };

  // The translation function
  const t = (key: string) => {
    return translations[lang][key] || key; // Fallback to key if translation missing
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 3. The Custom Hook
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}