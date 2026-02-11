'use client';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [exit, setExit] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => { setExit(true); setTimeout(onComplete, 1000); }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={exit ? { opacity: 0, scale: 1.1, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center flex-col"
    >
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#D4AF37] opacity-20 blur-[50px] rounded-full animate-pulse" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} className="relative z-10 flex flex-col items-center gap-4 mb-8">
          <div className="bg-[#D4AF37] p-4 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.6)]">
             <Zap size={48} className="text-black fill-black" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tighter text-center">
            INVESTMENT<span className="text-[#D4AF37]">TESLA</span>
          </h1>
        </motion.div>
      </div>
      <div className="w-64 h-1 bg-[#222] rounded-full overflow-hidden relative">
        <motion.div className="absolute top-0 left-0 h-full bg-[#D4AF37] shadow-[0_0_20px_#D4AF37]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2.5, ease: "easeInOut" }} />
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-[#666] text-[10px] font-bold uppercase tracking-[0.5em] mt-4">Initializing Quantum Uplink...</motion.p>
    </motion.div>
  );
}
