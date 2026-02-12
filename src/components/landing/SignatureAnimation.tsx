'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SignatureAnimation() {
  const [showSeal, setShowSeal] = useState(false);
  return (
    <div className="relative w-full max-w-[400px] h-[200px] flex items-center justify-center mx-auto my-12">
      <div className="absolute inset-0 bg-[#111] border border-[#333] rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] transform -rotate-2" />
      <div className="absolute inset-0 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl transform rotate-1 flex items-center justify-center overflow-hidden">
         <svg width="300" height="100" viewBox="0 0 300 100" className="overflow-visible">
            <motion.path d="M20,60 C40,50 50,80 60,60 C70,40 60,30 50,40 C40,50 60,70 80,60 C90,55 100,50 110,60 C120,70 130,50 140,60 L150,60 M160,50 L160,70 M170,60 C180,50 190,70 200,60 C210,50 220,60 230,60" fill="none" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }} onAnimationComplete={() => setShowSeal(true)} />
         </svg>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5, duration: 2 }} className="text-5xl font-serif text-[#D4AF37] font-italic" style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic' }}>TeslaInv.</motion.h2>
         </div>
         <motion.div initial={{ scale: 2, opacity: 0 }} animate={{ scale: showSeal ? 1 : 2, opacity: showSeal ? 1 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="absolute bottom-4 right-4 w-16 h-16 bg-red-800 rounded-full border-4 border-red-900 shadow-lg flex items-center justify-center rotate-12">
            <div className="w-12 h-12 border-2 border-red-900/50 rounded-full flex items-center justify-center"><span className="text-red-950 font-bold text-xs">TI</span></div>
         </motion.div>
      </div>
    </div>
  );
}
