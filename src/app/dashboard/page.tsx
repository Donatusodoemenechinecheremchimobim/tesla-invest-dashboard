'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/landing/Navbar';
import KYCVerification from '@/components/dashboard/KYCVerification';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Lock, ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
       const { data: { user } } = await supabase.auth.getUser();
       if (user) {
          setUser(user);
          const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
          setProfile(profile);
       }
    };
    getData();
  }, []);

  const isApproved = profile?.verification_status === 'approved';

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
         <h1 className="text-4xl font-serif mb-2">Welcome, {profile?.full_name || 'Investor'}</h1>
         <p className="text-gray-500 text-xs uppercase tracking-widest mb-12">Portfolio Overview</p>

         {/* TOP ROW: BALANCE & ACTIONS */}
         <div className="grid md:grid-cols-3 gap-8 mb-12">
            
            {/* BALANCE CARD */}
            <div className="md:col-span-2 bg-[#111] border border-white/5 p-8 rounded-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[80px]" />
               <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Total Balance</p>
               <h2 className="text-5xl font-serif text-white mb-4">$0.00</h2>
               <div className="flex gap-4">
                  {/* DEPOSIT BUTTON - LOCKED IF NOT APPROVED */}
                  <button 
                    disabled={!isApproved}
                    className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all \${isApproved ? 'bg-[#D4AF37] text-black hover:bg-white' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                  >
                    {isApproved ? (
                       <>Deposit Funds <ArrowUpRight size={16}/></>
                    ) : (
                       <><Lock size={14}/> Deposit Locked</>
                    )}
                  </button>
                  <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10">
                    Withdraw
                  </button>
               </div>
            </div>

            {/* STATUS CARD */}
            <div className="bg-[#111] border border-white/5 p-8 rounded-3xl flex flex-col justify-center">
               <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Account Status</p>
               <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full \${isApproved ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`} />
                  <span className={`text-xl font-bold \${isApproved ? 'text-green-500' : 'text-red-500'}`}>
                     {isApproved ? 'Active & Verified' : 'Restricted'}
                  </span>
               </div>
               {!isApproved && <p className="text-xs text-gray-500 mt-2">Verification required to unlock funding.</p>}
            </div>

         </div>

         {/* KYC SECTION (Shows if not approved) */}
         {!isApproved && profile && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
               <KYCVerification user={profile} onVerificationComplete={() => window.location.reload()} />
            </motion.div>
         )}

         {/* PLACEHOLDER CHART AREA */}
         <div className="bg-[#111] border border-white/5 h-64 rounded-3xl flex items-center justify-center text-gray-600">
            <TrendingUp size={48} className="opacity-20" />
            <span className="ml-4 text-xs font-bold uppercase tracking-widest">Market Data Inactive</span>
         </div>

      </div>
    </main>
  );
}
