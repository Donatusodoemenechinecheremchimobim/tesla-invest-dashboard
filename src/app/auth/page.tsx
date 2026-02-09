'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ChevronRight, User, Key, FileText, Upload, UserPlus } from 'lucide-react';

export default function AuthPage() {
  const [step, setStep] = useState(1);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ssn, setSsn] = useState('');
  const [idType, setIdType] = useState<'passport' | 'license'>('passport');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSsnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').substring(0, 9);
    let formatted = val;
    if (val.length > 3 && val.length <= 5) formatted = `${val.slice(0, 3)}-${val.slice(3)}`;
    else if (val.length > 5) formatted = `${val.slice(0, 3)}-${val.slice(3, 5)}-${val.slice(5)}`;
    setSsn(formatted);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error: loginErr } = await supabase.auth.signInWithPassword({ email, password });
        if (loginErr) throw loginErr;
        router.push('/dashboard');
      } else {
        if (step === 1) {
          if (password.length < 6) throw new Error("Security protocol requires 6+ characters.");
          setStep(2);
          setLoading(false);
          return;
        }

        if (step === 2) {
          const rawSsn = ssn.replace(/\D/g, '');
          if (rawSsn.length !== 9) throw new Error("SSN must be exactly 9 digits.");
          if (!idFile) throw new Error("Identity document required.");

          const { data: authData, error: authErr } = await supabase.auth.signUp({ email, password });
          if (authErr) throw authErr;
          const user = authData.user;
          if (!user) throw new Error("Registration failed.");

          const fileExt = idFile.name.split('.').pop();
          const filePath = `${user.id}/${idType}_${Date.now()}.${fileExt}`;
          const { error: uploadErr } = await supabase.storage
            .from('kyc_docs')
            .upload(filePath, idFile);
          if (uploadErr) throw uploadErr;

          const { error: profileErr } = await supabase.from('profiles').upsert({
            id: user.id,
            email: user.email,
            ssn: rawSsn,
            id_type: idType,
            id_image_url: filePath,
            kyc_status: 'Pending Verification',
            balance: 0
          });
          if (profileErr) throw profileErr;

          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
             {isLogin ? <Lock className="text-[#D4AF37]" size={24} /> : <UserPlus className="text-[#D4AF37]" size={24} />}
          </div>
          <h1 className="text-2xl font-serif text-white tracking-widest uppercase">
            {isLogin ? 'Access Portal' : 'Create Account'}
          </h1>
        </div>

        {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-[11px] text-center font-bold">{error}</div>}

        <form onSubmit={handleAuth} className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-white outline-none focus:border-[#D4AF37] transition" placeholder="Email Address" />
                </div>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-white outline-none focus:border-[#D4AF37] transition" placeholder="Security Passkey" />
                </div>
              </motion.div>
            ) : (
              <motion.div key="step2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 ml-1 font-bold">Social Security Number</label>
                  <input type="text" required value={ssn} onChange={handleSsnChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#D4AF37] tracking-widest text-lg font-mono" placeholder="000-00-0000" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setIdType('passport')} className={`py-3 rounded-xl border text-[10px] font-bold uppercase transition ${idType === 'passport' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-white/10 text-gray-500'}`}>Passport</button>
                  <button type="button" onClick={() => setIdType('license')} className={`py-3 rounded-xl border text-[10px] font-bold uppercase transition ${idType === 'license' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-white/10 text-gray-500'}`}>License</button>
                </div>
                <div className="relative h-32 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center bg-white/[0.02] hover:border-[#D4AF37] transition cursor-pointer group">
                  <input type="file" required accept="image/*" onChange={(e) => setIdFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <Upload className="text-gray-600 group-hover:text-[#D4AF37] mb-2" size={24} />
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest px-4 truncate">{idFile ? idFile.name : `Upload ${idType}`}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" disabled={loading} className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-xl uppercase tracking-widest text-[11px] shadow-lg hover:shadow-[#D4AF37]/20 transition-all flex items-center justify-center gap-2">
            {loading ? 'Authorizing...' : isLogin ? 'Sign In' : step === 1 ? 'Next' : 'Create My Account'}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setStep(1); setError(''); }} 
            className="text-[#D4AF37] text-[11px] font-bold uppercase tracking-widest hover:text-white transition"
          >
            {isLogin ? "Don't have an account? Create one" : "Back to Login"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
