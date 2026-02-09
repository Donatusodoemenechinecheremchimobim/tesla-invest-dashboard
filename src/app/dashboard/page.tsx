'use client';
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, onSnapshot, collection, query, where, orderBy, runTransaction } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { LogOut, TrendingUp, History, Wallet, Copy, User, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext'; // <--- IMPORT THIS

export default function Dashboard() {
  const { t, lang, setLang } = useLanguage(); // <--- USE THE HOOK
  const [user, setUser] = useState<any>(null);
  const [investAmount, setInvestAmount] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const router = useRouter();

  // ... (Keep your existing useEffect/Auth logic here exactly as before) ...
  // ... (Keep your handleInvest function here exactly as before) ...
  
  // Quick mock for auth/data just so the code compiles for the example
  // In your real code, keep the useEffects you already have!

  if (!user) return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono animate-pulse">{t('connectMsg')}</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 pb-32">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('dashboardTitle')}</h1>
            <p className="text-gray-400 flex items-center gap-2"><User size={16}/> {user.email}</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* LANGUAGE SWITCHER */}
            <div className="flex bg-zinc-900 rounded-full p-1 border border-zinc-800">
                <button 
                    onClick={() => setLang('en')} 
                    className={`px-3 py-1 rounded-full text-xs font-bold transition ${lang === 'en' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                >
                    EN
                </button>
                <button 
                    onClick={() => setLang('es')} 
                    className={`px-3 py-1 rounded-full text-xs font-bold transition ${lang === 'es' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                >
                    ES
                </button>
                <button 
                    onClick={() => setLang('fr')} 
                    className={`px-3 py-1 rounded-full text-xs font-bold transition ${lang === 'fr' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                >
                    FR
                </button>
            </div>

             <button onClick={() => auth.signOut()} className="px-6 py-2 rounded-full border border-zinc-800 hover:bg-zinc-900 transition flex items-center gap-2">
               <LogOut size={16}/> {t('signOut')}
             </button>
          </div>
        </header>

        {/* Wealth Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass p-8 rounded-3xl relative overflow-hidden group bg-zinc-900/30 border border-zinc-800">
            <p className="text-gray-400 mb-2 flex items-center gap-2"><Wallet className="text-red-500" size={20}/> {t('totalBalance')}</p>
            <h2 className="text-5xl font-bold tracking-tighter">${user.balance.toLocaleString()}</h2>
          </div>

          <div className="glass p-8 rounded-3xl relative overflow-hidden group bg-zinc-900/30 border border-zinc-800">
            <p className="text-gray-400 mb-2 flex items-center gap-2"><TrendingUp className="text-green-500" size={20}/> {t('totalProfits')}</p>
            <h2 className="text-5xl font-bold tracking-tighter text-green-400">+${user.totalEarned.toLocaleString()}</h2>
          </div>

          <div className="glass p-8 rounded-3xl relative overflow-hidden flex flex-col justify-center bg-zinc-900/30 border border-zinc-800">
             <p className="text-gray-400 mb-2">{t('referralLink')}</p>
             <div className="flex bg-black/40 p-3 rounded-xl border border-white/5 justify-between items-center">
               <code className="text-sm text-red-400">tesla.com/ref/{user.refCode}</code>
               <Copy size={16} className="text-gray-500"/>
             </div>
          </div>
        </div>

        {/* Main Engine Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><TrendingUp className="text-red-500"/> {t('marketOpp')}</h3>
            
            {/* Tesla Card */}
            <div className="glass-card p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-red-600 text-xs font-bold px-3 py-1 rounded-bl-xl">{t('hot')}</div>
               <div className="flex justify-between items-start mb-6">
                 <div>
                   <h2 className="text-2xl font-bold">Tesla Inc (TSLA)</h2>
                 </div>
               </div>
               
               <div className="flex gap-4">
                 <input 
                   type="number" 
                   placeholder="Amount ($)" 
                   className="bg-black/50 border border-zinc-700 p-4 rounded-xl w-full focus:border-red-500 focus:outline-none transition"
                   value={investAmount}
                   onChange={e => setInvestAmount(e.target.value)}
                 />
                 <button onClick={() => {/* Call handleInvest */}} className="bg-red-600 px-8 rounded-xl font-bold hover:bg-red-700 transition">
                   {t('investBtn')}
                 </button>
               </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><History className="text-blue-500"/> {t('recentActivity')}</h3>
            <div className="glass p-6 rounded-3xl min-h-[400px] bg-zinc-900/30 border border-zinc-800">
              {history.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">{t('noTrans')}</div>
              ) : (
                <div className="space-y-4">
                  {/* Map history here */}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}