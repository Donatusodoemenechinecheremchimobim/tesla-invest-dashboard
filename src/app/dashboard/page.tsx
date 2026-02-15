'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { LogOut, Lock, ShieldCheck, Upload, CheckCircle, Smartphone } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  const [ssn, setSsn] = useState('');
  const [idType, setIdType] = useState<'passport' | 'license'>('passport');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [kycSubmitting, setKycSubmitting] = useState(false);
  const [kycSuccess, setKycSuccess] = useState(false);

  // REPLACE WITH YOUR ACTUAL WHATSAPP NUMBER
  const WHATSAPP_NUMBER = "1234567890"; 

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
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=I%20would%20like%20to%20fund%20my%20account`, '_blank');
    } else {
      alert("Access Denied: Your account must be 'approved' to make a deposit.");
    }
  };

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ssn.length !== 9 || !idFile) return;
    setKycSubmitting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const filename = `${session?.user.id}/${idType}_${Date.now()}`;
      // Uploading to user-kyc bucket
      await supabase.storage.from('user-kyc').upload(filename, idFile);

      await supabase.from('profiles').update({ kyc_status: 'submitted' }).eq('id', session?.user.id);
      setKycSuccess(true);
      setUser({ ...user, kyc_status: 'submitted' });
    } catch (err) {
      alert('Verification upload failed.');
    } finally {
      setKycSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#D4AF37]">Loading...</div>;

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
         <h1 className="text-3xl font-serif italic">Portfolio: {user?.full_name || 'User'}</h1>
         <button onClick={() => supabase.auth.signOut().then(() => router.push('/auth'))}><LogOut size={20} /></button>
      </header>

      <div className="bg-[#111] border border-white/10 p-8 rounded-[2rem] mb-12 text-center">
         <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">Current Balance</p>
         <h2 className="text-6xl font-serif">${user?.balance?.toLocaleString()}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
         <button onClick={handleDepositClick} className={`w-full py-6 font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 ${user?.deposit_status === 'approved' ? 'bg-green-600 text-white' : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'}`}>
            {user?.deposit_status === 'approved' ? <><Smartphone size={18}/> Deposit via WhatsApp</> : <><Lock size={16} /> Deposit Locked</>}
         </button>
         <div className="w-full py-6 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2">
            <ShieldCheck size={18}/> Status: {user?.kyc_status?.toUpperCase() || 'NONE'}
         </div>
      </div>

      {user?.kyc_status !== 'verified' && !kycSuccess && (
        <section className="bg-[#0a0a0a] border border-[#D4AF37]/30 p-8 rounded-[2rem]">
           <h3 className="text-xl font-serif mb-6">Verification Center</h3>
           <form onSubmit={handleKycSubmit} className="space-y-6">
              <div className="flex gap-4">
                 <button type="button" onClick={() => setIdType('passport')} className={`flex-1 py-3 rounded-xl border ${idType === 'passport' ? 'bg-[#D4AF37] text-black' : 'text-gray-500'}`}>Passport</button>
                 <button type="button" onClick={() => setIdType('license')} className={`flex-1 py-3 rounded-xl border ${idType === 'license' ? 'bg-[#D4AF37] text-black' : 'text-gray-500'}`}>License</button>
              </div>
              <input type="text" placeholder="Social Security Number (9 Digits)" value={ssn} onChange={(e) => setSsn(e.target.value.replace(/\D/g, '').slice(0, 9))} className="w-full bg-black border border-white/10 rounded-xl p-4 text-white outline-none" />
              <input type="file" accept="image/*" onChange={(e) => setIdFile(e.target.files?.[0] || null)} className="w-full bg-black border border-white/10 rounded-xl p-4 text-gray-400" />
              <button disabled={kycSubmitting || ssn.length !== 9 || !idFile} className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase rounded-xl">
                {kycSubmitting ? 'Submitting...' : 'Submit Verification'}
              </button>
           </form>
        </section>
      )}

      {kycSuccess && (
        <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-4">
           <CheckCircle className="text-green-500" />
           <p className="text-sm">Verification documents submitted for review.</p>
        </div>
      )}
    </main>
  );
}
