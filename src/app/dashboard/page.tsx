'use client';

import ProctorBanner from '@/components/dashboard/ProctorBanner';
import GrowthChart from '@/components/dashboard/GrowthChart';
import TransactionModal from '@/components/dashboard/TransactionModal';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, History, Activity, TrendingUp, Plus, ShoppingCart, CheckCircle } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [txLoading, setTxLoading] = useState(false);
  const [showToast, setShowToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: '' });
  const [modal, setModal] = useState<{ open: boolean; type: 'deposit' | 'buy'; title: string }>({
    open: false,
    type: 'deposit',
    title: ''
  });

  const router = useRouter();
  const TSLA_PRICE = 3500; 

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/auth'); return; }
    
    // Fetch Profile
    const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (profileData) setProfile(profileData);

    // Fetch Transactions
    const { data: txData } = await supabase.from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (txData) setTransactions(txData);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    // Listen for both Profile and Transaction updates
    const channel = supabase.channel('dashboard_updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, fetchData)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'transactions' }, fetchData)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [router]);

  const triggerToast = (msg: string) => {
    setShowToast({ show: true, msg });
    setTimeout(() => setShowToast({ show: false, msg: '' }), 4000);
  };

  const handleTransaction = async (amount: number) => {
    if (isNaN(amount) || amount <= 0) return;
    
    setTxLoading(true);
    try {
      if (modal.type === 'buy' && amount > profile.balance) throw new Error("Insufficient liquid balance.");

      const newBalance = modal.type === 'deposit' ? profile.balance + amount : profile.balance - amount;
      const newUnits = modal.type === 'buy' ? (profile.tesla_units || 0) + (amount / TSLA_PRICE) : (profile.tesla_units || 0);

      await supabase.from('profiles').update({ balance: newBalance, tesla_units: newUnits }).eq('id', profile.id);
      await supabase.from('transactions').insert({
        user_id: profile.id,
        type: modal.type === 'deposit' ? 'Deposit' : 'Buy TSLA',
        amount: amount,
        direction: modal.type === 'deposit' ? 'in' : 'out'
      });

      setModal({ ...modal, open: false });
      triggerToast(`Successfully processed ${modal.type === 'buy' ? '$' + amount + ' TSLA buy' : 'deposit'}`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setTxLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#D4AF37] animate-pulse">Connecting to Quantum Node...</div>;

  const totalEquity = (profile?.balance || 0) + ((profile?.tesla_units || 0) * TSLA_PRICE);

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      
      {/* SUCCESS TOAST NOTIFICATION */}
      <AnimatePresence>
        {showToast.show && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] bg-[#D4AF37] text-black px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl font-bold uppercase tracking-widest text-[10px]"
          >
            <CheckCircle size={18} /> {showToast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <TransactionModal isOpen={modal.open} title={modal.title} loading={txLoading} onClose={() => setModal({ ...modal, open: false })} onConfirm={handleTransaction} />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Portfolio Equity</p>
            <h2 className="text-3xl font-serif text-white">${totalEquity.toLocaleString()}</h2>
          </div>
          <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Available USD</p>
            <h2 className="text-3xl font-serif text-[#D4AF37]">${(profile?.balance || 0).toLocaleString()}</h2>
          </div>
          <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-[#D4AF37]/20">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">TSLA Units</p>
            <h2 className="text-3xl font-serif text-white">{(profile?.tesla_units || 0).toFixed(4)}</h2>
          </div>
        </div>

        {/* GRAPH */}
        <div className="mb-12 p-8 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem]">
           <GrowthChart />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* TERMINAL */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10">
            <div className="flex items-center gap-3 mb-10"><Activity className="text-[#D4AF37]" size={20} /> <h3 className="text-sm font-bold uppercase tracking-widest">Trading Hub</h3></div>
            <div className="space-y-4">
              <button onClick={() => setModal({ open: true, type: 'buy', title: 'Buy TSLA' })} className="w-full py-6 bg-[#D4AF37] text-black font-black uppercase tracking-widest text-[11px] rounded-2xl">Buy Tesla Stock</button>
              <button onClick={() => setModal({ open: true, type: 'deposit', title: 'Add Funds' })} className="w-full py-6 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[11px] rounded-2xl">Inject Liquidity</button>
            </div>
          </div>

          {/* REAL LEDGER HISTORY */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 max-h-[400px] overflow-y-auto">
            <div className="flex items-center gap-3 mb-10"><History className="text-[#D4AF37]" size={20} /> <h3 className="text-sm font-bold uppercase tracking-widest">Ledger History</h3></div>
            <div className="space-y-4">
              {transactions.length > 0 ? transactions.map((tx) => (
                <div key={tx.id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                  <div>
                    <p className="text-white text-[11px] font-bold uppercase tracking-widest">{tx.type}</p>
                    <p className="text-gray-500 text-[9px]">{new Date(tx.created_at).toLocaleDateString()}</p>
                  </div>
                  <p className={`font-mono text-sm ${tx.direction === 'in' ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.direction === 'in' ? '+' : '-'}${Number(tx.amount).toLocaleString()}
                  </p>
                </div>
              )) : (
                <p className="text-gray-600 text-center py-10 uppercase text-[10px] tracking-widest">No activity found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    
      {/* Component placed correctly at end of main */}
      <ProctorBanner />
    </main>
  );
}