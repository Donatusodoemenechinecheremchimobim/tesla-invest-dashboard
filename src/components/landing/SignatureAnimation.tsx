'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SignatureAnimation() {
  const [isFinished, setIsFinished] = useState(false);

  return (
    <div className="relative w-full max-w-[500px] h-[200px] flex items-center justify-center mx-auto my-12">
      
      {/* PAPER BACKGROUND */}
      <div className="absolute inset-0 bg-[#080808] border border-[#333] rounded-xl shadow-2xl transform -rotate-1" />
      <div className="absolute inset-0 bg-[#050505] border border-[#D4AF37]/20 rounded-xl transform rotate-1 flex items-center justify-center overflow-hidden">
         
         <div className="relative z-10">
            {/* THE ACTUAL TEXT */}
            <h2 className="text-6xl md:text-7xl text-[#D4AF37] italic tracking-tighter" style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic' }}>
              TeslaInvest.
            </h2>

            {/* THE MASK (Hides the text, then slides away) */}
            <motion.div 
               initial={{ width: "100%" }}
               whileInView={{ width: "0%" }}
               transition={{ duration: 2.5, ease: "easeInOut" }}
               onAnimationComplete={() => setIsFinished(true)}
               className="absolute top-0 right-0 h-full bg-[#050505] z-20"
            />
         </div>

         {/* WAX SEAL (Stamps ONLY after writing is done) */}
         <motion.div 
           initial={{ scale: 3, opacity: 0 }}
           animate={{ scale: isFinished ? 1 : 3, opacity: isFinished ? 1 : 0 }}
           transition={{ type: "spring", stiffness: 180, damping: 12 }}
           className="absolute bottom-6 right-8 w-20 h-20 bg-gradient-to-br from-red-800 to-red-950 rounded-full border-4 border-red-900 shadow-2xl flex items-center justify-center rotate-12 z-30"
         >
            <div className="w-14 h-14 border-2 border-red-900/50 rounded-full flex items-center justify-center">
               <div className="text-red-950 font-serif font-black text-xl">TI</div>
            </div>
         </motion.div>

      </div>
    </div>
  );
}
