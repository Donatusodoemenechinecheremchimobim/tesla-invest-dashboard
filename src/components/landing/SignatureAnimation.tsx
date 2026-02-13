'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SignatureAnimation() {
  const [isFinished, setIsFinished] = useState(false);

  return (
    <div className="relative w-full max-w-[400px] h-[180px] flex items-center justify-center mx-auto my-12">
      <div className="absolute inset-0 bg-white border border-gray-200 rounded-xl shadow-xl transform -rotate-1" />
      
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-5xl md:text-6xl text-[#059669] italic tracking-tighter" style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic' }}>
          Verde Capital.
        </h2>

        {/* Reveal Mask */}
        <motion.div 
           initial={{ width: "100%" }}
           whileInView={{ width: "0%" }}
           transition={{ duration: 2.5, ease: "easeInOut" }}
           onAnimationComplete={() => setIsFinished(true)}
           className="absolute top-0 right-0 h-full bg-white z-20"
        />
        
        {/* Green Stamp */}
        <motion.div 
           initial={{ scale: 3, opacity: 0 }}
           animate={{ scale: isFinished ? 1 : 3, opacity: isFinished ? 1 : 0 }}
           transition={{ type: "spring", stiffness: 180, damping: 12 }}
           className="absolute bottom-[-20px] right-[-20px] w-16 h-16 border-2 border-[#059669] rounded-full flex items-center justify-center -rotate-12 z-30 bg-white/90"
        >
            <span className="text-[#059669] font-bold text-xs uppercase text-center leading-none">Verified<br/>Secure</span>
        </motion.div>
      </div>
    </div>
  );
}
