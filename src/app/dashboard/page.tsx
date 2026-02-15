'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { LogOut, Lock, ShieldCheck, Upload, CheckCircle, Smartphone, FileText } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  const [ssn, setSsn] = useState('');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [kycSubmitting, setKycSubmitting] = useState(false);
  const [kycSuccess, setKycSuccess] = useState(false);

  // YOUR WHATSAPP LINK
  const WHATSAPP_LINK = "https://wa.me/1234567890?text=I%20want%20to%20deposit"; 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push('/auth'); return; }

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
    if (profile) setUser(profile);
    setLoading(false);
  };

  const handleDepositClick = () => {
    if (user?.deposit_status === 'approved') {
      window.open(WHATSAPP_LINK, '_blank');
    } else {
      alert("Access Restricted: Your identity verification is pending.");
    }
  };

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ssn.length !== 9 || !idFile) return;
    setKycSubmitting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const filename = `${session?.user.id}/id_${Date.now()}`;
      await supabase.storage.from('user-kyc').upload(filename, idFile);
      await supabase.from('profiles').update({ kyc_status: 'submitted' }).eq('id', session?.user.id);
      setKycSuccess(true);
      setUser({ ...user, kyc_status: 'submitted' });
    } catch (err) {
      alert('Upload failed.');
    } finally {
      setKycSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#D4AF37]">Connecting to Vault...</div>;

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
         <h1 className="text-3xl font-serif italic">{user?.full_name || 'Account Overview'}</h1>
         <button onClick={() => supabase.auth.signOut().then(() => router.push('/auth'))} className="text-gray-500 hover:text-red-500 transition-colors"><LogOut size={20} /></button>
      </header>

      <div className="bg-[#111] border border-white/10 p-10 rounded-[2.5rem] mb-12 text-center shadow-2xl">
         <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-4">Total Liquid Assets</p>
         <h2 className="text-7xl font-serif text-[#D4AF37] tracking-tighter">${user?.balance?.toLocaleString()}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
         <button onClick={handleDepositClick} className={`w-full py-6 font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 transition-all ${user?.deposit_status === 'approved' ? 'bg-green-600 hover:bg-green-500 shadow-lg shadow-green-900/20' : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'}`}>
            {user?.deposit_status === 'approved' ? <><Smartphone size={18}/> Deposit via WhatsApp</> : <><Lock size={16} /> Deposit Locked</>}
         </button>
         <div className="w-full py-6 bg-white/5 border border-white/10 text-gray-400 font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2">
            <ShieldCheck size={18} className={user?.kyc_status === 'verified' ? "text-green-500" : "text-yellow-500"}/> Status: {user?.kyc_status?.toUpperCase()}
         </div>
      </div>

      {user?.kyc_status !== 'verified' && !kycSuccess && (
        <section className="bg-[#0a0a0a] border border-[#D4AF37]/20 p-8 rounded-[2rem]">
           <h3 className="text-xl font-serif mb-6 flex items-center gap-2"><FileText size={20} className="text-[#D4AF37]"/> Secure Verification</h3>
           <form onSubmit={handleKycSubmit} className="space-y-6">
              <input type="text" placeholder="SSN (9 Digits)" value={ssn} onChange={(e) => setSsn(e.target.value.replace(/\D/g, '').slice(0, 9))} className="w-full bg-black border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#D4AF37]" required />
              <input type="file" accept="image/*" onChange={(e) => setIdFile(e.target.files?.[0] || null)} className="w-full bg-black border border-white/10 rounded-xl p-4 text-gray-400" required />
              <button disabled={kycSubmitting || ssn.length !== 9 || !idFile} className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase rounded-xl hover:bg-white transition-all">
                {kycSubmitting ? 'Securing Data...' : 'Submit Documents'}
              </button>
           </form>
        </section>
      )}

      {kycSuccess && (
        <div className="p-8 bg-green-500/5 border border-green-500/20 rounded-2xl flex items-center gap-4">
           <CheckCircle className="text-green-500" size={24} />
           <p className="text-sm text-green-200">Documents submitted. An administrator will review your profile shortly.</p>
        </div>
      )}
    </main>
  );
}
