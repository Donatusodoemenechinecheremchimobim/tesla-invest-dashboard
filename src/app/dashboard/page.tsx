'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { LogOut, Lock, Unlock, Smartphone, ShieldCheck, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        window.location.href = '/auth';
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profile) {
        setUser(profile);
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const handleDeposit = () => {
    if (user?.deposit_status === 'approved') {
      window.open("https://wa.me/1234567890?text=I%20want%20to%20deposit", "_blank");
    } else {
      alert("Account Restricted: Approval Required.");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-[#D4AF37] text-xs uppercase tracking-[0.5em] animate-pulse">
      Verifying Security Ledger...
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
         <h1 className="text-3xl font-serif italic text-[#D4AF37]">Welcome, {user?.full_name}</h1>
         <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/auth')} className="text-gray-500 hover:text-red-500 transition-colors"><LogOut size={20} /></button>
      </header>

      <div className="bg-[#111] border border-white/10 p-10 rounded-[2.5rem] mb-12 text-center shadow-2xl">
         <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-4">Available Balance</p>
         <h2 className="text-7xl font-serif text-white tracking-tighter">${user?.balance?.toLocaleString()}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
         <button onClick={handleDeposit} className={`w-full py-6 font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 transition-all ${user?.deposit_status === 'approved' ? 'bg-green-600 hover:bg-green-500' : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'}`}>
            {user?.deposit_status === 'approved' ? <><Smartphone size={18}/> Deposit via WhatsApp</> : <><Lock size={16} /> Deposit Locked</>}
         </button>
         <div className="w-full py-6 bg-white/5 border border-white/10 text-gray-400 font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2">
            <ShieldCheck size={18} className={user?.deposit_status === 'approved' ? "text-green-500" : "text-red-500"}/> Status: {user?.deposit_status?.toUpperCase()}
         </div>
      </div>
    </main>
  );
}
