'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PhoneAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const loop = setInterval(() => {
      setStep((s) => (s + 1) % 4); // Loop through 4 steps
    }, 4000);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative w-[300px] h-[600px] bg-black border-[8px] border-[#333] rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden mx-auto">
      {/* Dynamic Island */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />
      
      {/* Screen Content */}
      <div className="w-full h-full bg-[#0a0a0a] relative p-6 flex flex-col pt-16">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="w-8 h-8 bg-gray-800 rounded-full" />
          <div className="text-white font-bold">TESLA<span className="text-[#D4AF37]">INV</span></div>
          <div className="w-8 h-8 bg-gray-800 rounded-full" />
        </div>

        {/* Balance */}
        <div className="text-center mb-8">
          <p className="text-gray-500 text-xs uppercase tracking-widest">Total Equity</p>
          <motion.h2 
             key={step}
             initial={{ scale: 0.9, opacity: 0.5 }}
             animate={{ scale: 1, opacity: 1 }}
             className="text-4xl font-serif text-white mt-2"
          >
             ${step === 0 ? "14,200" : step === 1 ? "14,200" : "19,850"}
          </motion.h2>
          <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: step >= 2 ? 1 : 0 }}
             className="text-green-500 text-sm font-bold mt-1 flex justify-center items-center gap-1"
          >
             <TrendingUp size={14} /> +$5,650 (Today)
          </motion.div>
        </div>

        {/* Graph */}
        <div className="flex-1 relative border-b border-gray-800 mb-8">
           {/* Static Line */}
           <svg className="absolute bottom-0 left-0 w-full h-[100px] overflow-visible">
              <motion.path 
                d="M0,100 C50,100 50,80 100,80 C150,80 150,90 200,90"
                fill="none"
                stroke="#333"
                strokeWidth="2"
              />
              {/* SHOOTING LINE */}
              <motion.path 
                d="M200,90 C220,90 230,40 280,10"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: step >= 2 ? 1 : 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
           </svg>
           
           {/* Floating "Buy" Indicator */}
           <motion.div 
             initial={{ opacity: 0, scale: 0 }}
             animate={{ opacity: step === 1 ? 1 : 0, scale: step === 1 ? 1 : 0 }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37] text-black px-4 py-2 rounded-full font-bold text-xs shadow-[0_0_20px_#D4AF37]"
           >
             BUY TSLA
           </motion.div>
        </div>

        {/* Action Button */}
        <motion.button
           animate={{ scale: step === 1 ? 0.95 : 1, backgroundColor: step >= 2 ? "#10B981" : "#333" }}
           className="w-full py-4 rounded-xl text-white font-bold text-sm mb-4 flex items-center justify-center gap-2"
        >
           {step >= 2 ? <><CheckCircle size={16}/> Order Executed</> : "Swipe to Trade"}
        </motion.button>
        
      </div>

      {/* Glossy Reflection */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
    </div>
  );
}
