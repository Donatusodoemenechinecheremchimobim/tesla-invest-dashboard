'use client';

import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Lock, User, Mail, Eye, EyeOff, AlertTriangle } from 'lucide-react';

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
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Camera access denied");
      setError("Security requirement: Camera access is needed for identity verification.");
    }
  };

  const captureAndUpload = async (userId: string) => {
    if (!videoRef.current || !canvasRef.current) return;
    const context = canvasRef.current.getContext('2d');
    context?.drawImage(videoRef.current, 0, 0, 640, 480);
    const blob = await new Promise<Blob | null>(resolve => canvasRef.current?.toBlob(resolve, 'image/jpeg'));

    if (blob) {
      // Uploading to proctor-snapshots bucket
      const filename = `${userId}/${Date.now()}.jpg`;
      await supabase.storage.from('proctor-snapshots').upload(filename, blob);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cameraActive) {
      setError("Identity verification (Camera) is required to proceed.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      let userId = '';
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        userId = data.user.id;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } }
        });
        if (error) throw error;
        if (data.user) userId = data.user.id;
      }

      if (userId) await captureAndUpload(userId);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white relative">
      <video ref={videoRef} autoPlay playsInline muted className="hidden" />
      <canvas ref={canvasRef} width="640" height="480" className="hidden" />
      
      <div className="w-full max-w-md bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[2rem] p-8 shadow-2xl relative">
        <h2 className="text-3xl font-serif font-bold text-center mb-6">{isLogin ? 'Login' : 'Create Account'}</h2>
        {error && <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-xs">{error}</div>}
        <form onSubmit={handleAuth} className="space-y-4">
           {!isLogin && (
             <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl py-4 px-4 text-sm text-white focus:border-[#D4AF37] outline-none" required />
           )}
           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl py-4 px-4 text-sm text-white focus:border-[#D4AF37] outline-none" required />
           <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl py-4 pl-4 pr-12 text-sm text-white focus:border-[#D4AF37] outline-none" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
           </div>
           <button disabled={loading} className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded-full hover:bg-white transition-all mt-4">
             {loading ? 'Processing...' : (isLogin ? 'Enter Terminal' : 'Initialize Account')}
           </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="w-full text-center mt-6 text-xs text-gray-500 uppercase tracking-widest">{isLogin ? 'Need an account?' : 'Already have an account?'}</button>
      </div>
    </main>
  );
}
