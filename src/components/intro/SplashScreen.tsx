'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 0: Seed appears
    // Stage 1: Sprout grows
    // Stage 2: Leaves pop
    // Stage 3: Complete
    const timer1 = setTimeout(() => setStage(1), 500);
    const timer2 = setTimeout(() => setStage(2), 1500);
    const timer3 = setTimeout(() => {
       setStage(3);
       setTimeout(onComplete, 800); 
    }, 2500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-32 h-32 flex items-center justify-center mb-8">
         {/* Seed */}
         <motion.div 
           animate={{ scale: stage >= 1 ? 0 : 1, opacity: stage >= 1 ? 0 : 1 }}
           className="w-4 h-4 bg-[#3D2817] rounded-full absolute bottom-0"
         />
         
         {/* Sprout Stem */}
         <motion.div 
           initial={{ height: 0 }}
           animate={{ height: stage >= 1 ? 60 : 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="w-1 bg-[#059669] absolute bottom-0 origin-bottom"
         />

         {/* Left Leaf */}
         <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: stage >= 2 ? 1 : 0 }}
            transition={{ type: "spring" }}
            className="absolute bottom-8 left-12 w-6 h-6 bg-[#059669] rounded-tr-[20px] rounded-bl-[20px] -rotate-45"
            style={{ transformOrigin: "bottom right", left: "calc(50% - 14px)" }}
         />
         
         {/* Right Leaf */}
         <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: stage >= 2 ? 1 : 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="absolute bottom-12 right-12 w-8 h-8 bg-[#059669] rounded-tl-[20px] rounded-br-[20px] rotate-45"
            style={{ transformOrigin: "bottom left", right: "calc(50% - 16px)" }}
         />
      </div>

      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 tracking-tight"
      >
        Verde<span className="text-[#059669]">Capital</span>
      </motion.h1>
      <p className="text-gray-400 text-xs mt-2 font-mono uppercase tracking-widest">Planting your future...</p>
    </motion.div>
  );
}
