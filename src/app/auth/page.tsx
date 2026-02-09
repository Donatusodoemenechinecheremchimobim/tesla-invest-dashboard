'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 1. AUTO-REDIRECT: If already logged in, go to dashboard
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User detected, redirecting...");
        router.push('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Log In
        await signInWithEmailAndPassword(auth, email, password);
        // The useEffect above will handle the redirect, but we can double-force it here
        router.push('/dashboard'); 
      } else {
        // Sign Up
        await createUserWithEmailAndPassword(auth, email, password);
        // On signup, we also want to go to dashboard
        router.push('/dashboard');
      }
    } catch (err: any) {
      // Make error messages user-friendly
      let msg = err.message;
      if (msg.includes('invalid-credential')) msg = "Incorrect email or password.";
      if (msg.includes('email-already-in-use')) msg = "This email is already registered.";
      if (msg.includes('weak-password')) msg = "Password should be at least 6 characters.";
      
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        
        {/* Logo Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter">
            TESLA<span className="text-red-600">INVST</span>
          </h1>
          <p className="mt-2 text-gray-400">
            {isLogin ? 'Sign in to your portfolio' : 'Create your secure account'}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="space-y-6 glass p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-red-500 focus:outline-none transition"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-red-500 focus:outline-none transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(220,38,38,0.3)]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                Processing...
              </span>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-gray-400 hover:text-white text-sm transition"
          >
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span className="text-red-500 font-bold underline decoration-red-500/30 underline-offset-4">
              {isLogin ? 'Sign Up' : 'Log In'}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}