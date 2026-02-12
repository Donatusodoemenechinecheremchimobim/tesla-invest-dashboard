'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Ship, Zap, Telescope } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DigitalVoyage() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const loop = setInterval(() => {
      setStage((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-full max-w-4xl h-[400px] bg-[#050505] border border-white/10 rounded-[3rem] overflow-hidden mx-auto shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      
      {/* 🌊 1. THE DATA OCEAN */}
      <div className="absolute inset-0 flex flex-col justify-end pb-10 opacity-30">
        <motion.div 
           animate={{ x: ["-5%", "0%", "-5%"] }}
           transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
           className="w-[120%] h-32 bg-gradient-to-t from-[#111] to-transparent border-t border-white/5"
        />
        <motion.div 
           animate={{ x: ["0%", "-5%", "0%"] }}
           transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
           className="w-[120%] h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent border-t border-[#D4AF37]/10"
        />
      </div>

      {/* 🏝️ 2. THE TESLA BEACON */}
      <motion.div 
        animate={{ 
           scale: stage >= 2 ? [1, 1.2, 1] : 1,
           opacity: stage >= 1 ? 1 : 0.2,
           filter: stage >= 1 ? "blur(0px)" : "blur(5px)"
        }}
        transition={{ duration: 2 }}
        className="absolute top-10 right-10 md:right-32 z-10 flex flex-col items-center"
      >
        <div className="bg-[#D4AF37] p-4 rounded-full shadow-[0_0_60px_#D4AF37]">
          <Zap size={32} className="text-black fill-black" />
        </div>
        <p className="text-[#D4AF37] text-[10px] font-bold mt-2 uppercase tracking-widest">The Sanctuary</p>
      </motion.div>

      {/* 🚢 3. THE SHIP */}
      <motion.div
        animate={{ 
           x: stage === 0 ? 0 : stage === 1 ? 50 : 250, 
           y: [0, -5, 0], 
           rotate: stage === 3 ? 0 : [1, -1, 1] 
        }}
        transition={{ 
           x: { duration: 3, ease: "easeInOut" },
           y: { repeat: Infinity, duration: 2 },
           rotate: { repeat: Infinity, duration: 3 }
        }}
        className="absolute bottom-20 left-10 md:left-32 z-20 text-white"
      >
        <div className="relative">
           <Ship size={64} className="text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]" />
           
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: stage === 1 ? 1 : 0 }}
             className="absolute -top-8 -right-8 bg-white/10 p-2 rounded-full border border-white/20 backdrop-blur-md"
           >
              <Telescope size={20} className="text-[#D4AF37]" />
           </motion.div>

           <AnimatePresence>
             {stage === 1 && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0 }}
                 className="absolute -top-20 -right-20 bg-[#D4AF37] text-black px-4 py-2 rounded-xl text-[10px] font-bold uppercase w-32 shadow-lg"
               >
                 Opportunity Sighted!
               </motion.div>
             )}
           </AnimatePresence>
        </div>
        
        <motion.div 
           animate={{ width: [0, 50, 0], opacity: [0, 0.5, 0] }}
           transition={{ repeat: Infinity, duration: 1 }}
           className="absolute bottom-0 -left-10 h-1 bg-white/20 rounded-full"
        />
      </motion.div>

      {/* 📜 4. NARRATIVE TEXT */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full text-center px-4">
        <motion.p 
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-gray-400 text-xs md:text-sm font-serif italic"
        >
          {stage === 0 && "Drifting in the sea of traditional banking..."}
          {stage === 1 && "Wait... scanning horizon... High-Yield Signal Detected."}
          {stage === 2 && "Target Locked: Tesla Investment Ecosystem."}
          {stage === 3 && "Full Speed Ahead. Wealth Imminent."}
        </motion.p>
      </div>

    </div>
  );
}
