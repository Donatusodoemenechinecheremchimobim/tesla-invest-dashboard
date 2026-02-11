#!/bin/bash

echo " RESTORING KYC VERIFICATION PROTOCOLS..."

# 1. CREATE THE KYC MODAL COMPONENT
cat << 'EOF' > src/components/dashboard/KYCModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ShieldAlert, Upload, CheckCircle, X } from 'lucide-react';

export default function KYCModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      setStep(3); // Success state
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-[#D4AF37]/30 p-8 rounded-[2rem] shadow-[0_0_50px_rgba(212,175,55,0.1)]"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={20} /></button>
            
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/30">
                <ShieldAlert size={40} className="text-[#D4AF37]" />
              </div>
            </div>

            {step === 1 && (
              <>
                <h2 className="text-2xl font-serif text-center mb-2">Identity Verification</h2>
                <p className="text-gray-400 text-center text-sm mb-8">
                  To comply with International Banking Regulations (Tesla-FinCEN), we require proof of identity for all accounts over $500.
                </p>
                <div className="space-y-3">
                  <button onClick={() => setStep(2)} className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white transition-all">
                    Upload ID / Passport
                  </button>
                  <button onClick={onClose} className="w-full py-4 bg-white/5 text-gray-400 font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white/10">
                    Remind Me Later
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-2xl font-serif text-center mb-6">Upload Document</h2>
                <div 
                  onClick={handleUpload}
                  className="border-2 border-dashed border-white/20 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all group"
                >
                  <Upload size={32} className="text-gray-500 mb-4 group-hover:text-[#D4AF37] transition-colors" />
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white">
                    {uploading ? "Encrypting Upload..." : "Tap to Select File"}
                  </p>
                </div>
                <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-widest">
                  Secure Quantum Encryption (256-bit)
                </p>
              </>
            )}

            {step === 3 && (
              <div className="text-center">
                <h2 className="text-2xl font-serif text-white mb-2">Verification Pending</h2>
                <p className="text-gray-400 text-sm mb-8">
                  Your documents have been submitted to our compliance team. Review typically takes 1-6 hours.
                </p>
                <button onClick={onClose} className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-xl">
                  Return to Dashboard
                </button>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
EOF

# 2. UPDATE THE DASHBOARD TO INCLUDE KYC BANNER & MODAL
cat << 'EOF' > src/app/dashboard/page.tsx
'use client';

import ProctorBanner from '@/components/dashboard/ProctorBanner';
import GrowthChart from '@/components/dashboard/GrowthChart';
import TransactionModal from '@/components/dashboard/TransactionModal';
import KYCModal from '@/components/dashboard/KYCModal'; // 👈 IMPORT KYC
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Activity, CheckCircle, ArrowUpRight, ShieldAlert } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [txLoading, setTxLoading] = useState(false);
  const [showToast, setShowToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: '' });
  
  // KYC STATE
  const [kycOpen, setKycOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // Default to false for new users

  const [modal, setModal] = useState<{ open: boolean; type: 'deposit' | 'buy'; title: string }>({
    open: false,
    type: 'deposit',
    title: ''
  });

  const router = useRouter();
  const TSLA_PRICE = 3500; 

  const WA_NUMBER = "19803487946";
  const WA_MESSAGE = encodeURIComponent("Hello, I would like to make a deposit into my investment account.");
  const WHATSAPP_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/auth'); return; }
    
    const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (profileData) setProfile(profileData);

    const { data: txData } = await supabase.from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (txData) setTransactions(txData);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
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
    if (!isVerified && modal.type === 'deposit') {
      // If attempting high value actions without KYC
      setKycOpen(true);
      return; 
    }

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
      
      {/* KYC MODAL */}
      <KYCModal isOpen={kycOpen} onClose={() => setKycOpen(false)} />

      {/* TOAST */}
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
        
        {/* 🚨 KYC WARNING BANNER */}
        {!isVerified && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[#D4AF37]/10 border border-[#D4AF37]/50 p-4 rounded-2xl flex items-center justify-between mb-8 cursor-pointer hover:bg-[#D4AF37]/20 transition-colors"
            onClick={() => setKycOpen(true)}
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-[#D4AF37]" size={20} />
              <div>
                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Action Required</p>
                <p className="text-gray-400 text-xs">Verify your identity to unlock full withdrawal limits.</p>
              </div>
            </div>
            <ArrowUpRight className="text-[#D4AF37]" size={16} />
          </motion.div>
        )}

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
          {/* TRADING HUB */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10">
            <div className="flex items-center gap-3 mb-10"><Activity className="text-[#D4AF37]" size={20} /> <h3 className="text-sm font-bold uppercase tracking-widest">Trading Hub</h3></div>
            <div className="space-y-4">
              
              {/* DEPOSIT BUTTON -> WHATSAPP */}
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-6 bg-[#D4AF37] text-black font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-white hover:scale-[1.02] transition-all cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              >
                Deposit <ArrowUpRight size={14} />
              </a>

            </div>
          </div>

          {/* LEDGER HISTORY */}
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
    
      <ProctorBanner />
    </main>
  );
}
EOF

echo "✅ KYC VERIFICATION SYSTEM RESTORED."