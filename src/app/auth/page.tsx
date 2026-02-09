'use client';

import { useState } from 'react';
import { auth, db, storage } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Upload, Lock, ChevronRight, User, Key, FileText } from 'lucide-react';

export default function AuthPage() {
  const [step, setStep] = useState(1);
  const [isLogin, setIsLogin] = useState(true);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ssn, setSsn] = useState('');
  const [idType, setIdType] = useState('passport');
  const [idFile, setIdFile] = useState<File | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(''); // NEW: Error state
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(''); // Clear previous errors

    try {
      if (isLogin) {
        console.log("Attempting Login...");
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Login Success. Redirecting...");
        router.push('/dashboard');
      } else {
        if (step === 1) {
          if(password.length < 6) throw new Error("Password must be at least 6 characters.");
          setStep(2);
          setLoading(false);
          return;
        }

        if (step === 2) {
          console.log("Attempting Signup...");
          if (ssn.length < 9) throw new Error("Invalid SSN Format.");
          if (!idFile) throw new Error("ID Document Required.");
          
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log("User Created:", user.uid);
          
          // Generate unique path for file
          const storageRef = ref(storage, `kyc/${user.uid}/${Date.now()}_${idFile.name}`);
          await uploadBytes(storageRef, idFile);
          const downloadURL = await getDownloadURL(storageRef);
          console.log("File Uploaded");

          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            uid: user.uid,
            ssn: ssn,
            idImageUrl: downloadURL,
            idType: idType,
            balance: 0,
            totalEarned: 0,
            refCode: 'TESLA-' + Math.floor(Math.random() * 10000),
            createdAt: new Date().toISOString(),
            kycStatus: "Pending Verification"
          });
          console.log("Firestore Updated");

          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      setErrorMsg(err.message); // Show error to user
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background FX */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-900/20 rounded-full blur-[80px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif text-white tracking-wide mb-2">
            {isLogin ? 'WEALTH PORTAL' : 'IDENTITY VERIFICATION'}
          </h1>
          <div className="flex justify-center items-center gap-2 text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] bg-[#D4AF37]/5 py-1 px-3 rounded-full border border-[#D4AF37]/20 w-fit mx-auto">
            <Lock size={10} />
            <span>Encrypted Uplink</span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: LOGIN / SIGNUP */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-gray-500 text-[10px] uppercase tracking-widest pl-1">Secure Email</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 text-gray-500 w-4 h-4" />
                    <input
                      type="email"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-10 text-white text-sm focus:border-[#D4AF37] outline-none transition"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-gray-500 text-[10px] uppercase tracking-widest pl-1">Passkey</label>
                  <div className="relative">
                    <Key className="absolute left-4 top-3.5 text-gray-500 w-4 h-4" />
                    <input
                      type="password"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-10 text-white text-sm focus:border-[#D4AF37] outline-none transition"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: KYC (ONLY FOR SIGNUP) */}
            {step === 2 && !isLogin && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl flex gap-3 items-start">
                  <ShieldCheck className="text-[#D4AF37] shrink-0 w-5 h-5 mt-0.5" />
                  <p className="text-[11px] text-[#D4AF37]/80 leading-relaxed">
                    Federal law requires ID verification.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-500 text-[10px] uppercase tracking-widest pl-1">Social Security (SSN)</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-3.5 text-gray-500 w-4 h-4" />
                    <input
                      type="text"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-10 text-white text-sm focus:border-[#D4AF37] outline-none transition tracking-widest"
                      value={ssn}
                      onChange={(e) => setSsn(e.target.value)}
                      placeholder="XXX-XX-XXXX"
                      maxLength={11}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setIdType('passport')} className={`p-3 border rounded-xl text-[10px] uppercase font-bold transition ${idType === 'passport' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-white/10 text-gray-500'}`}>
                    Passport
                  </button>
                  <button type="button" onClick={() => setIdType('license')} className={`p-3 border rounded-xl text-[10px] uppercase font-bold transition ${idType === 'license' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-white/10 text-gray-500'}`}>
                    Driver's Lic
                  </button>
                </div>

                <div className="border border-dashed border-white/20 rounded-xl p-6 text-center hover:border-[#D4AF37] transition cursor-pointer relative group bg-white/[0.02]">
                  <input 
                    type="file" 
                    required 
                    onChange={(e) => setIdFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  <div className="relative z-10">
                    <Upload className="mx-auto text-gray-500 mb-2 group-hover:text-[#D4AF37] transition w-6 h-6" />
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest truncate px-2">
                      {idFile ? idFile.name : 'Tap to Upload Document'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-black font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <span className="animate-pulse">Processing Transaction...</span>
            ) : (
              step === 1 && !isLogin ? <>Continue <ChevronRight size={16}/></> : (isLogin ? 'Access Terminal' : 'Submit & Encrypt')
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setStep(1);
              setErrorMsg('');
            }}
            className="text-gray-500 text-[10px] uppercase tracking-widest hover:text-white transition underline underline-offset-4"
          >
            {isLogin ? "Request New Account" : "Return to Login"}
          </button>
        </div>

      </motion.div>
    </div>
  );
}
