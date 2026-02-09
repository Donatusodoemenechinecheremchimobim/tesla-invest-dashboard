'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleAuth = async (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Custom Validation to prevent ugly browser errors
    if (form.password.length < 6) {
      setError("Security Alert: Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        const res = await createUserWithEmailAndPassword(auth, form.email, form.password);
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          name: form.name,
          email: form.email,
          balance: 100,
          totalEarned: 0,
          refCode: Math.random().toString(36).substring(7),
          joined: new Date().toISOString()
        });
      }
      router.push('/dashboard');
    } catch (err: any) {
      // Clean up Firebase error messages
      const msg = err.message.includes('auth/invalid-credential') 
        ? "Invalid email or password." 
        : err.message.replace('Firebase:', '').replace('Error (auth/', '').replace(').', '');
      setError(msg);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80" />
      
      <form onSubmit={handleAuth} className="glass p-8 md:p-12 rounded-3xl w-full max-w-md relative z-10 border border-white/5 backdrop-blur-2xl shadow-2xl">
        <Link href="/" className="absolute top-6 left-6 text-zinc-500 hover:text-white transition">← Back</Link>
        
        <h2 className="text-4xl font-black mb-2 text-center tracking-tighter italic mt-8">INVESTMENT<span className="text-red-600">TESLA</span></h2>
        <p className="text-center text-zinc-400 mb-8 text-sm">{isLogin ? "Welcome Back, Trader." : "Create your secure portfolio."}</p>
        
        {/* Smart Error Box */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-pulse">
            <AlertCircle size={18} />
            {error}
          </div>
        )}
        
        {!isLogin && (
          <div className="mb-4">
            <input type="text" placeholder="Full Legal Name" 
              className="w-full p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none text-white placeholder:text-zinc-600 transition" 
              onChange={e => setForm({...form, name: e.target.value})} required />
          </div>
        )}
        
        <input type="email" placeholder="Email Address" 
          className="w-full p-4 mb-4 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none text-white placeholder:text-zinc-600 transition" 
          onChange={e => setForm({...form, email: e.target.value})} required />
          
        <input type="password" placeholder="Password (Min 6 chars)" 
          className="w-full p-4 mb-8 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none text-white placeholder:text-zinc-600 transition" 
          onChange={e => setForm({...form, password: e.target.value})} required />

        <button disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 disabled:opacity-50 group">
          {loading ? "Processing..." : (isLogin ? "Access Dashboard" : "Start Trading")}
          {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition" />}
        </button>
        
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-sm text-zinc-500 cursor-pointer hover:text-white transition" onClick={() => {setError(''); setIsLogin(!isLogin);}}>
            {isLogin ? "Need an account? " : "Already have an account? "}
            <span className="text-red-500 font-bold underline">{isLogin ? "Register" : "Login"}</span>
          </p>
        </div>
      </form>
    </div>
  );
}