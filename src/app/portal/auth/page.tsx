'use client';

import { useState } from 'react';
import { handleServerAuth } from '@/app/actions/auth';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await handleServerAuth({ email, password, fullName }, mode);

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="bg-[#D4AF37] p-3 rounded-2xl mb-4 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <Zap size={32} className="text-black fill-black" />
          </div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">INVESTMENT<span className="text-[#D4AF37]">TESLA</span></h1>
          <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">Bypassing Client-Side Network Blocks</p>
        </div>

        <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-500 text-[10px] font-bold uppercase">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <input type="text" placeholder="Legal Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]" required />
            )}
            <input type="email" placeholder="Access ID" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]" required />
            <input type="password" placeholder="Passcode" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]" required />
            <button disabled={loading} className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest">
              {loading ? <Loader2 className="animate-spin" /> : <>{mode === 'login' ? 'Login' : 'Sign Up'} <ArrowRight /></>}
            </button>
          </form>

          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="w-full mt-6 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
            {mode === 'login' ? "New here? Register" : "Back to Login"}
          </button>
        </div>
      </div>
    </main>
  );
}
