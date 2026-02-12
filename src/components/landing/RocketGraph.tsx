'use client';

import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function RocketGraph() {
  return (
    <div className="relative w-full max-w-[350px] h-[350px] bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(212,175,55,0.1)]">
      
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* GRAPH CONTENT */}
      <div className="relative w-full h-full p-8">
        <div className="absolute top-6 left-6">
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Tesla Growth</p>
          <h3 className="text-3xl text-white font-serif mt-1">+420%</h3>
        </div>

        {/* THE PATH */}
        <svg className="absolute bottom-0 left-0 w-full h-full overflow-visible">
          <defs>
            <linearGradient id="rocketGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* FILL AREA */}
          <motion.path 
            d="M0,350 Q100,300 175,200 T350,50 V350 H0 Z"
            fill="url(#rocketGradient)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* LINE */}
          <motion.path 
            d="M0,350 Q100,300 175,200 T350,50"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {/* THE ROCKET */}
        <motion.div
          className="absolute"
          initial={{ offsetDistance: "0%" }}
          whileInView={{ offsetDistance: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ 
            offsetPath: "path('M0,350 Q100,300 175,200 T350,50')",
            offsetRotate: "auto"
          }}
        >
          <div className="relative -rotate-45 transform"> {/* Adjust rotation to align with line */}
             <Rocket size={32} className="text-white fill-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
             {/* Engine Flame */}
             <motion.div 
               animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
               transition={{ repeat: Infinity, duration: 0.2 }}
               className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-6 bg-orange-500 rounded-full blur-[2px]"
             />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
