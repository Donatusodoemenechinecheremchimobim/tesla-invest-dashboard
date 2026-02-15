'use client';

import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { LogOut, Lock, ArrowRight, ShieldCheck, FileText, Upload, CheckCircle, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showLockAlert, setShowLockAlert] = useState(false);
  
  // KYC STATES
  const [ssn, setSsn] = useState('');
  const [idType, setIdType] = useState<'passport' | 'license'>('passport');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [kycSubmitting, setKycSubmitting] = useState(false);
  const [kycSuccess, setKycSuccess] = useState(false);

  // YOUR WHATSAPP NUMBER
  const WHATSAPP_NUMBER = "1234567890"; // Replace with real number

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push('/auth'); return; }

      // Fetch Profile for Balance & Status
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (profile) setUser(profile);
      setLoading(false);
    };
    fetchData();
  }, [supabase, router]);

  const handleDepositClick = () => {
    if (user?.deposit_status === 'approved') {
      // Open WhatsApp
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=I%20want%20to%20make%20a%20deposit`, '_blank');
    } else {
      setShowLockAlert(true);
    }
  };

  const handleSsnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Force exactly 9 digits
    const val = e.target.value.replace(/\D/g, '').slice(0, 9);
    setSsn(val);
  };

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ssn.length !== 9 || !idFile) return;
    setKycSubmitting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // 1. Upload to 'user-kyc' bucket
      const filename = `${session.user.id}/${idType}_${Date.now()}`;
      await supabase.storage.from('user-kyc').upload(filename, idFile);

      // 2. Update Profile with Status
      await supabase.from('profiles').update({ 
        kyc_status: 'submitted' 
      }).eq('id', session.user.id);

      setKycSuccess(true);
      setUser({ ...user, kyc_status: 'submitted' });
    } catch (err) {
      console.error(err);
      alert('Upload failed. Please try again.');
    } finally {
      setKycSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#D4AF37]">Loading...</div>;

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
         <div>
            <h1 className="text-3xl font-serif italic mb-1">Welcome, {user?.full_name || 'Investor'}</h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest">
               Status: <span className={user?.deposit_status === 'approved' ? "text-green-500" : "text-red-500"}>{user?.deposit_status?.toUpperCase()}</span>
            </p>
         </div>
         <button onClick={() => supabase.auth.signOut().then(() => router.push('/auth'))} className="text-gray-500 hover:text-red-500 transition-colors">
            <LogOut size={20} />
         </button>
      </header>

      {/* BALANCE CARD */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-[2rem] mb-8 text-center">
         <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Total Balance</p>
         <h2 className="text-6xl font-serif text-white tracking-tighter">${user?.balance?.toLocaleString()}</h2>
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
         {/* DEPOSIT BUTTON (LOCKED) */}
         <button 
           onClick={handleDepositClick}
           className={`w-full py-6 font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 transition-all
             ${user?.deposit_status === 'approved' 
               ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20' 
               : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
             }`}
         >
            {user?.deposit_status === 'approved' ? <><Smartphone size={18}/> Contact Agent (WhatsApp)</> : <><Lock size={16} /> Deposit Locked</>}
         </button>

         {/* KYC BUTTON (Shows form below) */}
         <button className="w-full py-6 bg-[#D4AF37] text-black font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-2">
            <ShieldCheck size={18}/> Verification Center
         </button>
      </div>

      {/* KYC UPLOAD SECTION */}
      {user?.kyc_status !== 'verified' && !kycSuccess && (
        <section className="bg-[#0a0a0a] border border-[#D4AF37]/30 p-8 rounded-[2rem]">
           <h3 className="text-xl font-serif mb-6 flex items-center gap-2"><FileText className="text-[#D4AF37]" size={20}/> Submit KYC Documents</h3>
           
           <form onSubmit={handleKycSubmit} className="space-y-6">
              
              {/* ID Type Selection */}
              <div className="flex gap-4">
                 <button type="button" onClick={() => setIdType('passport')} className={`flex-1 py-3 rounded-xl border text-xs font-bold uppercase ${idType === 'passport' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-transparent border-white/10 text-gray-500'}`}>Passport</button>
                 <button type="button" onClick={() => setIdType('license')} className={`flex-1 py-3 rounded-xl border text-xs font-bold uppercase ${idType === 'license' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-transparent border-white/10 text-gray-500'}`}>Driver's License</button>
              </div>

              {/* SSN Input */}
              <div>
                 <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Social Security Number (9 Digits)</label>
                 <input 
                    type="text" 
                    value={ssn}
                    onChange={handleSsnChange}
                    placeholder="XXX-XX-XXXX" // 
                    className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none tracking-widest"
                 />
              </div>

              {/* File Upload */}
              <div className="relative">
                 <input 
                   type="file" 
                   accept="image/*"
                   onChange={(e) => setIdFile(e.target.files?.[0] || null)}
                   className="hidden" 
                   id="id-upload"
                 />
                 <label htmlFor="id-upload" className="w-full bg-black border border-white/10 border-dashed rounded-xl p-6 flex items-center justify-center gap-2 text-gray-400 cursor-pointer hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                    <Upload size={16} /> {idFile ? idFile.name : `Upload ${idType === 'passport' ? 'Passport' : 'License'} Image`}
                 </label>
              </div>

              <button disabled={kycSubmitting || ssn.length !== 9 || !idFile} className="w-full py-4 bg-white/10 hover:bg-[#D4AF37] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-xl font-bold uppercase tracking-widest text-xs">
                {kycSubmitting ? 'Uploading to Secure Bucket...' : 'Submit Verification'}
              </button>
           </form>
        </section>
      )}

      {kycSuccess && (
         <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-4">
            <CheckCircle size={24} className="text-green-500" />
            <div>
               <h4 className="font-bold text-green-500">Submission Received</h4>
               <p className="text-xs text-green-400">Your documents are under review. Deposit access will be unlocked upon approval.</p>
            </div>
         </div>
      )}

      {/* LOCK ALERT MODAL */}
      <AnimatePresence>
        {showLockAlert && (
          <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#111] border border-red-500/30 p-8 rounded-3xl max-w-sm w-full text-center">
               <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4"><Lock className="text-red-500" size={24}/></div>
               <h3 className="text-xl font-serif mb-2">Access Denied</h3>
               <p className="text-gray-400 text-xs mb-6">Complete KYC verification and wait for admin approval to unlock deposits.</p>
               <button onClick={() => setShowLockAlert(false)} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold uppercase">Close</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
