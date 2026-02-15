'use client';

import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Attempt to start camera, but don't crash if it fails
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; })
      .catch(err => console.warn("Camera blocked or not found:", err));
  }, []);

  const takeSnapshot = async (userId: string) => {
    try {
      if (!videoRef.current || !canvasRef.current) return;
      const context = canvasRef.current.getContext('2d');
      context?.drawImage(videoRef.current, 0, 0, 640, 480);
      const blob = await new Promise<Blob | null>(res => canvasRef.current?.toBlob(res, 'image/jpeg'));
      if (blob) {
        await supabase.storage.from('proctor-snapshots').upload(`${userId}/${Date.now()}.jpg`, blob);
      }
    } catch (e) {
      console.error("Snapshot failed silently:", e);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      // 1. Auth Logic
      const { data, error } = isLogin 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ 
            email, password, 
            options: { data: { full_name: fullName } } 
          });

      if (error) throw error;

      if (data.user) {
        // 2. Silent Snapshot
        await takeSnapshot(data.user.id);
        // 3. Redirect
        router.push('/dashboard');
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <video ref={videoRef} autoPlay muted className="hidden" />
      <canvas ref={canvasRef} width="640" height="480" className="hidden" />

      <div className="w-full max-w-md bg-[#0a0a0a] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <h2 className="text-3xl font-serif italic text-center mb-2">{isLogin ? 'Login' : 'Join'}</h2>
        <p className="text-center text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-8">Identity Terminal</p>
        
        {/* VISIBLE ERROR BOX */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-xs">
            <AlertCircle size={16} />
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#D4AF37]" required />
          )}
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#D4AF37]" required />
          
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl p-4 pr-12 outline-none focus:border-[#D4AF37]" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button disabled={loading} className="w-full py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest rounded-full hover:bg-white transition-all mt-4 flex items-center justify-center">
            {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Access Account' : 'Initialize')}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} className="w-full text-center mt-8 text-[10px] text-gray-600 uppercase tracking-widest hover:text-white transition-colors">
          {isLogin ? 'Create New Account' : 'Return to Login'}
        </button>
      </div>
    </main>
  );
}
