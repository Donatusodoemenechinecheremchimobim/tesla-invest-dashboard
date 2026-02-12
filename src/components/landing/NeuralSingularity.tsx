'use client';

import { motion } from 'framer-motion';

export default function NeuralSingularity() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-black rounded-[3rem] border border-white/5 my-12 shadow-[0_0_100px_rgba(212,175,55,0.1)]">
      
      {/* 1. GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#D4AF37_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* 2. ORBITING RINGS */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute border border-[#D4AF37]/30 rounded-full"
          style={{ width: i * 120 + 'px', height: i * 120 + 'px' }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ repeat: Infinity, duration: 25 - i * 5, ease: "linear" }}
        >
           <div className="absolute top-0 left-1/2 w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]" />
        </motion.div>
      ))}

      {/* 3. CENTRAL BRAIN */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], filter: ["blur(0px)", "blur(5px)", "blur(0px)"] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="relative z-10 w-40 h-40 bg-gradient-to-br from-[#D4AF37] to-yellow-900 rounded-full flex items-center justify-center shadow-[0_0_80px_#D4AF37]"
      >
        <div className="text-black font-bold text-xs uppercase tracking-widest text-center">
           NEURAL<br/>LINK
        </div>
      </motion.div>

      {/* 4. SHOOTING DATA STREAMS */}
      {[...Array(15)].map((_, i) => (
         <motion.div
           key={i}
           className="absolute w-[2px] h-[100px] bg-gradient-to-t from-transparent to-white opacity-40"
           style={{ left: '50%', top: '50%', transformOrigin: 'top left' }}
           animate={{ rotate: Math.random() * 360, opacity: [0, 1, 0], scaleY: [0, 1.5, 0] }}
           transition={{ repeat: Infinity, duration: 2 + Math.random(), delay: Math.random() }}
         />
      ))}

    </div>
  );
}
