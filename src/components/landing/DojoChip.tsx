'use client';
import { motion } from 'framer-motion';

export default function DojoChip() {
  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center mx-auto my-10">
      {/* PULSING GLOW */}
      <div className="absolute inset-0 bg-[#D4AF37] opacity-20 blur-[60px] animate-pulse" />

      {/* ROTATING RINGS */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10 + i * 5, ease: "linear" }}
          className="absolute border border-[#D4AF37]/30 rounded-full"
          style={{ width: `${100 + i * 60}px`, height: `${100 + i * 60}px` }}
        />
      ))}

      {/* THE CHIP */}
      <div className="relative z-10 w-40 h-40 bg-[#111] border border-[#D4AF37] rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
        <div className="grid grid-cols-4 gap-1">
           {[...Array(16)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ opacity: [0.2, 1, 0.2] }}
               transition={{ repeat: Infinity, duration: 1, delay: Math.random() }}
               className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"
             />
           ))}
        </div>
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white" />
        <p className="absolute -bottom-8 text-[#D4AF37] text-[10px] font-mono tracking-widest">DOJO V4</p>
      </div>
    </div>
  );
}
