'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, Zap } from 'lucide-react';

export default function PortalAuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  
  // Form Data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        // SIGNUP LOGIC
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: 'user',
              verification_status: 'pending' // Forces pending state
            },
          },
        });
        if (signUpError) throw signUpError;
        alert("Portal Access ID Created. Please Log In.");
        setMode('login');
      } else {
        // LOGIN LOGIC
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      setError(err.message || "Connection failed. Please check network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // FORCE BG-BLACK to override global green theme
    <div className="fixed inset-0 w-full h-full bg-[#050505] text-white flex items-center justify-center p-6 z-[9999]">
      
      {/* Golden Glow Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#111] border border-[#D4AF37]/20 p-8 rounded-3xl shadow-[0_0_60px_rgba(212,175,55,0.1)] relative z-10"
      >
        <div className="text-center mb-8">
           <div className="inline-flex items-center gap-2 mb-2 justify-center w-full">
              <div className="bg-[#D4AF37] p-1.5 rounded-lg shadow-[0_0_15px_#D4AF37]">
                <Zap size={24} className="text-black fill-black" />
              </div>
              <span className="text-white font-serif font-bold text-2xl tracking-wide">
                INVESTMENT<span className="text-[#D4AF37]">TESLA</span>
              </span>
           </div>
           <p className="text-[#666] text-[10px] uppercase tracking-[0.3em] font-bold mt-2 border-t border-white/5 pt-4">
             Private Client Access
           </p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-xs font-bold uppercase tracking-wide flex items-center gap-3">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          {mode === 'signup' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <label className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-2 block">Client Legal Name</label>
              <input 
                type="text" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder-gray-800" 
                placeholder="Ex. Johnathan Doe"
                required 
              />
            </motion.div>
          )}

          <div>
            <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2 block">Access ID (Email)</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder-gray-800"
              placeholder="client@investmenttesla.com" 
              required 
            />
          </div>

          <div>
            <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2 block">Security Passcode</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder-gray-800"
              placeholder="••••••••••••" 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mt-6 shadow-[0_5px_20px_rgba(212,175,55,0.3)]"
          >
            {loading ? <Loader2 className="animate-spin" /> : (mode === 'login' ? 'Authenticate' : 'Request Access')}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-white/5">
          <button 
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} 
            className="text-gray-500 hover:text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            {mode === 'login' ? "New to the Portal? Apply Here" : "Return to Login"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
