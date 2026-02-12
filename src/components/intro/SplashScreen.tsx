'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 150);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="bg-[#D4AF37] p-3 rounded-xl"
        >
          <Zap size={32} className="text-black fill-black" />
        </motion.div>
        {/* UPDATED TEXT HERE */}
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-widest">
          TESLA<span className="text-[#D4AF37]">INV</span>
        </h1>
      </div>
      
      {/* Loading Bar */}
      <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-[#D4AF37]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 font-mono text-[#D4AF37] text-xs">
        INITIALIZING DOJO NODES... {progress}%
      </div>
    </motion.div>
  );
}
