'use client';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function RocketGraph() {
  return (
    <div className="relative w-full h-[300px] bg-gray-50 rounded-3xl overflow-hidden flex items-center justify-center border border-gray-100">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <div className="relative w-full h-full p-6">
        <svg className="absolute bottom-0 left-0 w-full h-full overflow-visible">
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path 
            d="M0,300 Q100,250 175,150 T350,20 V300 H0 Z" 
            fill="url(#greenGradient)" 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            transition={{ duration: 1 }} 
          />
          <motion.path 
            d="M0,300 Q100,250 175,150 T350,20" 
            fill="none" 
            stroke="#059669" 
            strokeWidth="4" 
            initial={{ pathLength: 0 }} 
            whileInView={{ pathLength: 1 }} 
            transition={{ duration: 2, ease: "easeInOut" }} 
          />
        </svg>
        
        {/* Rocket Icon following path */}
        <motion.div 
          className="absolute" 
          initial={{ offsetDistance: "0%" }} 
          whileInView={{ offsetDistance: "100%" }} 
          transition={{ duration: 2, ease: "easeInOut" }} 
          style={{ offsetPath: "path('M0,300 Q100,250 175,150 T350,20')", offsetRotate: "auto" }}
        >
          <div className="relative -rotate-45 transform bg-white p-2 rounded-full shadow-md"> 
             <Rocket size={24} className="text-[#059669] fill-[#059669]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
