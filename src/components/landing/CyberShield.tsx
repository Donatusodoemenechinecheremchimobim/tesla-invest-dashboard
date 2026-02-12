'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Lock } from 'lucide-react';

export default function CyberShield() {
  return (
    <div className="relative w-full max-w-[350px] h-[350px] bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(212,175,55,0.1)]">
      
      {/* SCANNING LINE */}
      <motion.div 
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute left-0 w-full h-[2px] bg-[#D4AF37]/50 shadow-[0_0_20px_#D4AF37] z-10"
      />

      {/* PULSING RINGS */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
          className="absolute w-32 h-32 border border-[#D4AF37]/30 rounded-full"
        />
      ))}

      {/* CENTER SHIELD */}
      <div className="relative z-20 bg-black/50 p-6 rounded-full border border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)]">
        <ShieldCheck size={64} className="text-[#D4AF37]" />
        <div className="absolute -bottom-2 -right-2 bg-[#D4AF37] text-black p-1.5 rounded-full">
           <Lock size={12} />
        </div>
      </div>

      {/* FLOATING PARTICLES */}
      <div className="absolute inset-0">
         {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ x: Math.random() * 300, y: Math.random() * 300, opacity: 0 }}
              animate={{ y: [null, Math.random() * -50], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, delay: Math.random() }}
            />
         ))}
      </div>
      
      <div className="absolute bottom-6 text-center w-full">
         <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold">256-Bit Encryption</p>
         <p className="text-gray-500 text-[9px] mt-1">Tesla Security Protocol Active</p>
      </div>

    </div>
  );
}
