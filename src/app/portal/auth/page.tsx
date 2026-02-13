'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Zap, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export default function PortalAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault(); // 👈 CRITICAL: Prevents page refresh
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } }
        });
        if (signUpError) throw signUpError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      }
      router.push('/dashboard');
    } catch (err: any) {
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        setError("Connection Blocked: Your browser or network is blocking the database. Try Incognito mode.");
      } else {
        setError(err.message || "Access Denied.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-serif">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-[#D4AF37] p-3 rounded-2xl mb-4 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <Zap size={32} className="text-black fill-black" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter uppercase">INVESTMENT<span className="text-[#D4AF37]">TESLA</span></h1>
          <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Private Client Access</p>
        </div>

        <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-500 text-xs">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            {mode === 'signup' && (
              <div>
                <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2 block">Client Legal Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none" required />
              </div>
            )}
            <div>
              <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2 block">Access ID (Email)</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none" required />
            </div>
            <div>
              <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2 block">Security Passcode</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none" required />
            </div>

            <button disabled={loading} className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>{mode === 'login' ? 'Request Access' : 'Create Credentials'} <ArrowRight size={18} /></>}
            </button>
          </form>

          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="w-full mt-6 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors">
            {mode === 'login' ? "Don't have an ID? Register" : "Already have an ID? Return to Login"}
          </button>
        </div>

        <p className="mt-12 text-center text-gray-700 text-[10px] font-bold tracking-[0.2em] uppercase">© 2026 InvestmentTesla Global Systems</p>
      </div>
    </main>
  );
}
