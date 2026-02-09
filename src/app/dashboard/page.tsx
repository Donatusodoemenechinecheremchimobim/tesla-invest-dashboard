'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendingUp, Wallet, ArrowUpRight, ArrowDownLeft, PieChart, Settings, LogOut, Home, Zap, ArrowLeft } from 'lucide-react';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import RealHistory from '@/components/dashboard/RealHistory';
import ActionModal from '@/components/dashboard/ActionModal';
import TradingEngine from '@/components/dashboard/TradingEngine';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [modalType, setModalType] = useState<'deposit' | 'withdraw' | 'buy_tesla' | null>(null);
  const [activeTab, setActiveTab] = useState('home'); 
  const router = useRouter();

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((u) => {
      if (!u) router.push('/auth');
      else {
        const unsubDoc = onSnapshot(doc(db, "users", u.uid), (doc) => {
          if (doc.exists()) {
             setUser({ ...u, ...doc.data() });
          } else {
             setUser(u);
          }
        });
        return () => unsubDoc();
      }
    });
    return () => unsubAuth();
  }, [router]);

  if (!user) return <div className="min-h-screen bg-black flex items-center justify-center text-[#D4AF37] animate-pulse uppercase tracking-widest text-xs">Secure Uplink...</div>;

  const cash = user.balance || 0;
  const tesla = user.teslaBalance || 0;
  const totalEquity = cash + tesla;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D4AF37] selection:text-black pb-24 md:pb-10">
      
      <ActionModal 
        isOpen={!!modalType} 
        onClose={() => setModalType(null)} 
        type={modalType || 'deposit'} 
        currentBalance={cash}
      />

      {/* SIDEBAR (Desktop) */}
      <aside className="fixed left-0 top-0 h-full w-20 bg-[#0a0a0a] border-r border-white/5 hidden md:flex flex-col items-center py-8 z-50">
        <div onClick={() => router.push('/')} className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center text-black font-bold text-xl mb-12 cursor-pointer hover:scale-110 transition-transform">T</div>
        <nav className="flex flex-col gap-8">
          <button onClick={() => router.push('/')} className="p-3 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition group relative">
            <Home size={24} />
            <span className="absolute left-full ml-4 px-2 py-1 bg-white text-black text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity">Main</span>
          </button>
          <button className="p-3 bg-white/10 rounded-xl text-[#D4AF37]"><PieChart size={24} /></button>
          <button className="p-3 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition"><Settings size={24} /></button>
        </nav>
        <button onClick={() => auth.signOut()} className="mt-auto p-3 text-red-500 hover:bg-red-500/10 rounded-xl"><LogOut size={24} /></button>
      </aside>

      {/* MOBILE NAV */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 z-50 md:hidden flex justify-around py-4 pb-6 px-2">
        <button onClick={() => router.push('/')} className="flex flex-col items-center gap-1 text-gray-500">
          <Home size={20} />
          <span className="text-[9px] uppercase tracking-widest">Main</span>
        </button>
        <button onClick={() => setModalType('buy_tesla')} className="flex flex-col items-center gap-1 text-gray-500 hover:text-white">
          <div className="bg-[#D4AF37] text-black p-2 rounded-full -mt-6 border-4 border-[#050505] shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <Zap size={24} fill="black" />
          </div>
          <span className="text-[9px] uppercase tracking-widest font-bold text-[#D4AF37] mt-1">Invest</span>
        </button>
        <button onClick={() => auth.signOut()} className="flex flex-col items-center gap-1 text-gray-500">
          <LogOut size={20} />
          <span className="text-[9px] uppercase tracking-widest">Exit</span>
        </button>
      </nav>

      <main className="md:pl-20">
        <header className="px-6 md:px-8 py-6 flex justify-between items-center border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/')}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition md:hidden"
            >
              <ArrowLeft size={18} className="text-[#D4AF37]" />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-serif text-white">Command <span className="text-[#D4AF37]">Center</span></h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">System Online</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/')}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-white"
          >
            <ArrowLeft size={14} /> Back to Terminal
          </button>
          
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-xs shadow-[0_0_15px_rgba(212,175,55,0.4)] md:hidden">
            {user.email?.[0].toUpperCase()}
          </div>
        </header>

        <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-20"><Wallet size={60} /></div>
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest mb-2">Total Equity</p>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 break-words">
                ${totalEquity.toLocaleString()}
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                  <span className="text-gray-500">Tesla (TSLA)</span>
                  <span className="text-[#D4AF37] font-bold">${tesla.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Cash (USD)</span>
                  <span className="text-white font-bold">${cash.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setModalType('buy_tesla')} className="col-span-2 py-3 bg-[#D4AF37] text-black text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white transition flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                   <Zap size={14} fill="black" /> Buy Tesla Stock
                </button>
                <button onClick={() => setModalType('deposit')} className="py-3 bg-white/5 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition">
                   Deposit
                </button>
                <button onClick={() => setModalType('withdraw')} className="py-3 border border-white/20 text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white/5 transition">
                   Withdraw
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="col-span-1 md:col-span-2">
              <TradingEngine />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
             <div className="lg:col-span-2 p-5 md:p-6 rounded-3xl bg-[#0a0a0a] border border-white/10">
               <h3 className="text-white font-serif mb-4 md:mb-6">Asset Growth</h3>
               <PerformanceChart />
             </div>
             
             <div className="p-5 md:p-6 rounded-3xl bg-[#0a0a0a] border border-white/10 min-h-[300px] md:h-[400px] overflow-hidden flex flex-col">
               <h3 className="text-white font-serif mb-4 md:mb-6">Ledger</h3>
               <div className="overflow-y-auto flex-1 -mr-2 pr-2 custom-scrollbar">
                 <RealHistory />
               </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
