'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(''); // 🔴 Custom Error State

  const router = useRouter();

  const validateForm = () => {
    if (!email) return "Email identity is required.";
    if (!email.includes('@')) return "Invalid email format.";
    if (!password) return "Passkey is required.";
    if (password.length < 6) return "Passkey must be at least 6 characters.";
    return null;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // 🛑 1. CHECK FOR ERRORS BEFORE SUBMITTING
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: { data: { balance: 0, tesla_units: 0 } }
        });
        if (error) throw error;
        alert('Account created! Please sign in.');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message); // Catch Supabase errors too
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#111_0%,black_100%)]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="w-full max-w-md bg-[#0a0a0a] border border-white/10 p-10 rounded-[2rem] relative z-10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-white/5 rounded-2xl mb-4 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <ShieldCheck size={32} className="text-[#D4AF37]" />
          </div>
          <h1 className="text-3xl font-serif text-white mb-2">{isLogin ? 'Client Portal' : 'Apply for Access'}</h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">Secured by Quantum Encryption</p>
        </div>

        {/* 🚫 'noValidate' KILLS THE BROWSER BUBBLES */}
        <form onSubmit={handleAuth} className="space-y-5" noValidate>
          
          <div className="relative group">
            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error && !email ? 'text-red-500' : 'text-gray-500 group-focus-within:text-[#D4AF37]'}`} size={18} />
            <input 
              type="email" 
              placeholder="Email Identity" 
              value={email} 
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className={`w-full bg-black/50 border rounded-xl py-4 pl-12 pr-4 text-white outline-none transition-all placeholder:text-gray-700 text-sm ${error && !email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#D4AF37]'}`}
            />
          </div>
          
          <div className="relative group">
            <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error && !password ? 'text-red-500' : 'text-gray-500 group-focus-within:text-[#D4AF37]'}`} size={18} />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Passkey" 
              value={password} 
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className={`w-full bg-black/50 border rounded-xl py-4 pl-12 pr-12 text-white outline-none transition-all placeholder:text-gray-700 text-sm ${error && !password ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#D4AF37]'}`}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors p-1"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* 🔴 CUSTOM ERROR MESSAGE DISPLAY */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: "auto", opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 overflow-hidden"
              >
                 <AlertCircle size={16} className="text-red-500 shrink-0" />
                 <p className="text-red-400 text-xs">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            disabled={loading}
            className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-white hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            {loading ? 'Authenticating...' : (isLogin ? 'Access Dashboard' : 'Create Portfolio')}
            {!loading && <ArrowRight size={14} />}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600 text-[10px] cursor-pointer hover:text-[#D4AF37] transition-colors uppercase tracking-wider" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
          {isLogin ? "New Investor? Apply Here" : "Already a Member? Login"}
        </p>
      </motion.div>
    </div>
  );
}
