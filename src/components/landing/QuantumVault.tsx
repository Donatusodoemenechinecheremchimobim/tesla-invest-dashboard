'use client';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function QuantumVault() {
  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center mx-auto my-10">
      {/* OUTER LOCK RING */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute w-64 h-64 border-4 border-dashed border-gray-800 rounded-full"
      />
      
      {/* INNER LOCK RING */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="absolute w-48 h-48 border-t-4 border-b-4 border-[#D4AF37] rounded-full"
      />

      {/* CENTER VAULT */}
      <div className="relative z-10 w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_0_50px_#D4AF37]">
        <Lock size={40} className="text-black" />
      </div>

      {/* SECURE TEXT */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute -bottom-10 text-white text-xs font-bold uppercase tracking-[0.3em]"
      >
        Funds SAFU
      </motion.div>
    </div>
  );
}
