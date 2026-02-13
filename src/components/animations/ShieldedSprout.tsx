'use client';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function ShieldedSprout() {
  return (
    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
      {/* The Shield Container */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 text-green-100"
      >
         <Shield size={192} fill="currentColor" />
      </motion.div>

      {/* The Plant Inside */}
      <div className="relative z-10 mt-10">
         <svg width="60" height="80" viewBox="0 0 60 80">
            <motion.path d="M30,80 Q30,40 30,20" stroke="#059669" strokeWidth="4" fill="none" 
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.path d="M30,20 Q10,10 0,30" stroke="#059669" strokeWidth="0" fill="#059669"
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.2 }}
            />
            <motion.path d="M30,20 Q50,10 60,30" stroke="#059669" strokeWidth="0" fill="#059669"
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.4 }}
            />
         </svg>
      </div>

      {/* Glow Effect */}
      <motion.div 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 bg-green-400/20 blur-2xl rounded-full -z-10"
      />
    </div>
  );
}
