'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard } from 'lucide-react';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show after 3 seconds
    const timer = setTimeout(() => setIsOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 overflow-hidden shadow-2xl"
          >
            {/* Background Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]" />
            
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition">
              <X size={24} />
            </button>

            <div className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <CreditCard className="text-cyan-400" size={32} />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">EXCLUSIVE INVITATION</h3>
                <p className="text-gray-400 text-sm">
                  You have been selected for the <span className="text-cyan-400">Tesla Quantum Black</span> tier. 
                  Zero fees on your first $50,000 investment.
                </p>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center gap-4">
                <img src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=200&auto=format&fit=crop" className="w-16 h-10 rounded object-cover opacity-80" />
                <div className="text-left">
                  <p className="text-white text-sm font-bold">Metal Card Included</p>
                  <p className="text-xs text-gray-500">Shipped via Private Courier</p>
                </div>
              </div>

              <button 
                onClick={() => window.location.href = '/auth'}
                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors shadow-lg shadow-white/10"
              >
                Claim Access Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
