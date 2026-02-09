'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LuxuryLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif tracking-widest text-gold mb-4">
              INVESTMENT TESLA
            </h1>
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-gray-500">
              Private Wealth Management
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
