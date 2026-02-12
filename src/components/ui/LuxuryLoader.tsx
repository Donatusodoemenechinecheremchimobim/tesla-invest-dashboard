'use client';
import { motion } from 'framer-motion';

export default function LuxuryLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 1, delay: 1 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
    </motion.div>
  );
}
