'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👁️ State for visibility
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
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
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#222,black)] z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md bg-[#0a0a0a] border border-white/10 p-8 rounded-[2rem] relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-white/5 rounded-2xl mb-4 border border-white/10">
            <ShieldCheck size={32} className="text-[#D4AF37]" />
          </div>
          <h1 className="text-2xl font-serif text-white">{isLogin ? 'Welcome Back' : 'Join the Elite'}</h1>
          <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">Secure Quantum Access</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#D4AF37] transition-all"
              required 
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type={showPassword ? "text" : "password"} // 👁️ Toggle Logic
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white outline-none focus:border-[#D4AF37] transition-all"
              required 
            />
            {/* 👁️ The Clickable Icon */}
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button 
            disabled={loading}
            className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 mt-6"
          >
            {loading ? 'Processing...' : (isLogin ? 'Access Dashboard' : 'Create Portfolio')}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 text-xs cursor-pointer hover:text-[#D4AF37] transition-colors uppercase tracking-wider" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "New Investor? Apply for Access" : "Already a Member? Login"}
        </p>
      </motion.div>
    </div>
  );
}
