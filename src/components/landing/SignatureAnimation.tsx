'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SignatureAnimation() {
  const [isFinished, setIsFinished] = useState(false);

  return (
    <div className="relative w-full max-w-[500px] h-[200px] flex items-center justify-center mx-auto my-12">
      
      {/* PAPER TEXTURE BACKGROUND */}
      <div className="absolute inset-0 bg-[#080808] border border-[#333] rounded-xl shadow-2xl transform -rotate-1" />
      <div className="absolute inset-0 bg-[#050505] border border-[#D4AF37]/20 rounded-xl transform rotate-1 flex items-center justify-center overflow-hidden">
         
         {/* THE INVISIBLE PEN WRITING (SVG) */}
         <div className="relative z-10">
            <svg width="400" height="120" viewBox="0 0 400 120" className="overflow-visible">
               {/* This path approximates the cursive flow of "TeslaInvest". 
                  It is a single stroke to simulate a pen.
               */}
               <motion.path
                 d="M40,60 C50,40 60,80 70,60 C80,40 90,60 100,50 L110,50 C120,40 110,70 120,60 C130,50 140,50 150,60 C160,70 170,50 180,60 C190,70 200,50 210,60 L220,60 C230,50 240,70 250,60 C260,50 270,50 280,60 C290,70 300,50 310,60 C320,70 330,50 340,60 L360,60" 
                 fill="none"
                 stroke="#D4AF37"
                 strokeWidth="3"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 initial={{ pathLength: 0, opacity: 1 }}
                 whileInView={{ pathLength: 1 }}
                 transition={{ duration: 3.5, ease: "easeInOut" }}
                 onAnimationComplete={() => setIsFinished(true)}
               />
            </svg>

            {/* THE FINAL TEXT (Fades in ONLY after writing is done to "sharpen" the ink) */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: isFinished ? 1 : 0 }}
               transition={{ duration: 1 }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center"
            >
               <h2 className="text-5xl md:text-6xl font-serif text-[#D4AF37] italic tracking-tight drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  TeslaInvest.
               </h2>
            </motion.div>
         </div>

         {/* WAX SEAL (Stamps at the end) */}
         <motion.div 
           initial={{ scale: 3, opacity: 0 }}
           animate={{ scale: isFinished ? 1 : 3, opacity: isFinished ? 1 : 0 }}
           transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
           className="absolute bottom-6 right-8 w-20 h-20 bg-gradient-to-br from-red-800 to-red-950 rounded-full border-4 border-red-900 shadow-2xl flex items-center justify-center rotate-12 z-20"
         >
            <div className="w-14 h-14 border-2 border-red-900/50 rounded-full flex items-center justify-center">
               <div className="text-red-950 font-serif font-black text-xl">TI</div>
            </div>
         </motion.div>

      </div>
    </div>
  );
}
