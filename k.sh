#!/bin/bash

echo "🔐 ACTIVATING REAL DATABASE UPLOADS FOR KYC..."

cat << 'EOF' > src/components/dashboard/KYCModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldAlert, Upload, CheckCircle, X, Lock, CreditCard, FileText, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function KYCModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  
  // FORM STATE
  const [ssn, setSsn] = useState('');
  const [showSSN, setShowSSN] = useState(false);
  const [docType, setDocType] = useState<'passport' | 'license' | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  // 1. VALIDATE INPUTS
  const validateAndContinue = () => {
    const ssnClean = ssn.replace(/[^0-9]/g, '');
    if (ssnClean.length !== 9) {
      setError("SSN must be exactly 9 digits.");
      return;
    }
    if (!docType) {
      setError("Please select a document type.");
      return;
    }
    setError('');
    setStep(2);
  };

  // 2. HANDLE FILE SELECTION
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // 3. REAL SUBMISSION TO SUPABASE
  const handleRealUpload = async () => {
    if (!file || !docType || !ssn) return;
    
    setUploading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      // A. Upload File to 'kyc_documents' Bucket
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${docType}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('kyc_documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // B. Save SSN & Status to Database Profile
      const { error: dbError } = await supabase
        .from('profiles')
        .update({ 
          ssn: ssn, 
          document_type: docType,
          is_verified: false // Set to false until you manually approve them in Supabase
        })
        .eq('id', user.id);

      if (dbError) throw dbError;

      // Success!
      setStep(3);
    } catch (err: any) {
      console.error(err);
      setError("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-[#D4AF37]/30 p-8 rounded-[2rem] shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><X size={20} /></button>
            
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <ShieldAlert size={32} className="text-[#D4AF37]" />
              </div>
            </div>

            {/* STEP 1: SSN & DOC TYPE */}
            {step === 1 && (
              <>
                <h2 className="text-2xl font-serif text-center mb-2 text-white">Identity Verification</h2>
                <p className="text-gray-400 text-center text-[11px] mb-8 leading-relaxed px-4">
                  Federal regulations require a valid SSN and Government ID for all investment accounts.
                </p>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2">Social Security Number</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={16} />
                      <input 
                        type={showSSN ? "text" : "password"} 
                        placeholder="XXX-XX-XXXX" 
                        value={ssn}
                        onChange={(e) => { 
                          const val = e.target.value.replace(/[^0-9-]/g, '');
                          if (val.length <= 11) setSsn(val); 
                          setError(''); 
                        }}
                        className={`w-full bg-black/50 border rounded-xl py-4 pl-12 pr-12 text-white outline-none transition-all placeholder:text-gray-700 text-sm font-mono tracking-widest ${error.includes('SSN') ? 'border-red-500' : 'border-white/10 focus:border-[#D4AF37]'}`}
                      />
                      <button type="button" onClick={() => setShowSSN(!showSSN)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white p-1">
                        {showSSN ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2">Select Document Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => { setDocType('passport'); setError(''); }} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${docType === 'passport' ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                        <CreditCard size={20} /> <span className="text-[10px] font-bold uppercase tracking-widest">Passport</span>
                      </button>
                      <button onClick={() => { setDocType('license'); setError(''); }} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${docType === 'license' ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                        <FileText size={20} /> <span className="text-[10px] font-bold uppercase tracking-widest">Driver's License</span>
                      </button>
                    </div>
                  </div>

                  {error && <p className="text-red-400 text-xs text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">{error}</p>}

                  <button onClick={validateAndContinue} className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all mt-2">
                    Continue to Upload
                  </button>
                </div>
              </>
            )}

            {/* STEP 2: FILE UPLOAD */}
            {step === 2 && (
              <>
                <h2 className="text-2xl font-serif text-center mb-6">Upload {docType === 'passport' ? 'Passport' : 'License'}</h2>
                
                <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-10 flex flex-col items-center justify-center hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all group h-[200px]">
                  <input 
                    type="file" 
                    accept="image/*,.pdf" 
                    onChange={onFileChange} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  
                  {file ? (
                    <div className="flex flex-col items-center">
                       <FileText size={40} className="text-[#D4AF37] mb-2" />
                       <p className="text-xs font-bold text-white text-center">{file.name}</p>
                       <p className="text-[10px] text-gray-500 mt-1">Ready to upload</p>
                    </div>
                  ) : (
                    <>
                       <Upload size={32} className="mb-4 text-gray-500 group-hover:text-[#D4AF37] transition-colors" />
                       <p className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white">Tap to Select File</p>
                    </>
                  )}
                </div>

                {/* REAL UPLOAD BUTTON */}
                <button 
                  onClick={handleRealUpload}
                  disabled={!file || uploading}
                  className={`w-full mt-6 py-4 font-bold uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2 ${!file ? 'bg-white/5 text-gray-600' : 'bg-[#D4AF37] text-black hover:bg-white'}`}
                >
                  {uploading ? <Loader2 className="animate-spin" size={16}/> : (uploading ? "Encrypting..." : "Submit Verification")}
                </button>
                
                {error && <p className="text-red-400 text-xs text-center mt-3">{error}</p>}
                
                {!uploading && (
                  <button onClick={() => { setStep(1); setFile(null); }} className="w-full mt-2 py-4 text-gray-500 font-bold uppercase tracking-widest text-[10px] hover:text-white">
                    Back
                  </button>
                )}
              </>
            )}

            {/* STEP 3: SUCCESS */}
            {step === 3 && (
              <div className="text-center py-4">
                <div className="flex justify-center mb-6">
                   <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                      <CheckCircle size={32} className="text-green-500" />
                   </div>
                </div>
                <h2 className="text-2xl font-serif text-white mb-2">Documents Sent</h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Your SSN and ID have been securely saved to our database. 
                  <br/>Status: <span className="text-[#D4AF37] font-bold">Pending Approval</span>
                </p>
                <button onClick={onClose} className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white transition-all">
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

# 4. UPDATE DASHBOARD TO READ REAL VERIFICATION STATUS
cat << 'EOF' > src/app/dashboard/page.tsx
'use client';

import ProctorBanner from '@/components/dashboard/ProctorBanner';
import GrowthChart from '@/components/dashboard/GrowthChart';
import TransactionModal from '@/components/dashboard/TransactionModal';
import KYCModal from '@/components/dashboard/KYCModal';
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
  
  // 🔐 REAL KYC GATING
  const [kycOpen, setKycOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false); 

  const [modal, setModal] = useState<{ open: boolean; type: 'deposit' | 'buy'; title: string }>({
    open: false, type: 'deposit', title: ''
  });

  const router = useRouter();
  const TSLA_PRICE = 3500; 
  const WA_NUMBER = "19803487946";
  const WA_MESSAGE = encodeURIComponent("Hello, I would like to make a deposit into my investment account.");
  const WHATSAPP_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/auth'); return; }
    
    // FETCH PROFILE & CHECK VERIFICATION STATUS
    const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (profileData) {
      setProfile(profileData);
      // 🟢 REAL DB CHECK
      if (profileData.is_verified === true) {
         setIsVerified(true);
      }
    }

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

  // 🛑 INTERCEPT DEPOSIT
  const handleDepositClick = (e: React.MouseEvent) => {
    if (!isVerified) {
      e.preventDefault(); 
      setKycOpen(true);
    }
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
      <KYCModal isOpen={kycOpen} onClose={() => setKycOpen(false)} />

      <AnimatePresence>
        {showToast.show && (
          <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }} className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] bg-[#D4AF37] text-black px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl font-bold uppercase tracking-widest text-[10px]">
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
                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Verification Required</p>
                <p className="text-gray-400 text-xs">Deposits and withdrawals are locked until identity verification is complete.</p>
              </div>
            </div>
            <ArrowUpRight className="text-[#D4AF37]" size={16} />
          </motion.div>
        )}

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

        <div className="mb-12 p-8 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem]">
           <GrowthChart />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10">
            <div className="flex items-center gap-3 mb-10"><Activity className="text-[#D4AF37]" size={20} /> <h3 className="text-sm font-bold uppercase tracking-widest">Trading Hub</h3></div>
            <div className="space-y-4">
              
              {/* 🟢 LOCKED DEPOSIT BUTTON */}
              <a 
                href={isVerified ? WHATSAPP_LINK : "#"} 
                onClick={handleDepositClick} 
                target={isVerified ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full py-6 font-black uppercase tracking-widest text-[11px] rounded-2xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] 
                  ${isVerified ? 'bg-[#D4AF37] text-black hover:bg-white hover:scale-[1.02] cursor-pointer' : 'bg-white/5 text-gray-400 cursor-not-allowed hover:bg-white/10 border border-white/10'}`}
              >
                {isVerified ? "Deposit" : "Verification Required to Deposit"} {isVerified && <ArrowUpRight size={14} />}
              </a>

            </div>
          </div>

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

echo "✅ REAL KYC UPLOAD AND ENFORCEMENT ENABLED."