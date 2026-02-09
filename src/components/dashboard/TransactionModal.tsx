'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, ArrowRight } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  title: string;
  loading: boolean;
}

export default function TransactionModal({ isOpen, onClose, onConfirm, title, loading }: ModalProps) {
  const [amount, setAmount] = useState('');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition">
              <X className="text-gray-500" size={20} />
            </button>
          </div>

          <div className="relative mb-8">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={20} />
            <input 
              type="number" 
              autoFocus
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-12 pr-4 text-2xl font-serif text-white outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>

          <button 
            onClick={() => onConfirm(parseFloat(amount))}
            disabled={loading || !amount}
            className="w-full py-5 bg-[#D4AF37] text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:scale-[1.02] disabled:opacity-50 transition-all flex items-center justify-center gap-3"
          >
            {loading ? 'Processing Node...' : 'Confirm Transaction'} <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
