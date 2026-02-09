'use client';
import { useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { X, Loader2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'deposit' | 'withdraw' | 'buy_tesla';
  currentBalance: number;
}

export default function ActionModal({ isOpen, onClose, type, currentBalance }: ActionModalProps) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransaction = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return alert("Enter a valid amount");
    
    // Check sufficient funds for withdrawal or buying stock
    if ((type === 'withdraw' || type === 'buy_tesla') && Number(amount) > currentBalance) {
      return alert("Insufficient Liquid Cash");
    }
    
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) return;

      const val = Number(amount);
      const userRef = doc(db, "users", user.uid);

      if (type === 'deposit') {
        // Add Cash
        await updateDoc(userRef, { balance: increment(val) });
        await recordTx(user.uid, 'Deposit', val, 'USD', 'in');
      
      } else if (type === 'withdraw') {
        // Remove Cash
        await updateDoc(userRef, { balance: increment(-val) });
        await recordTx(user.uid, 'Withdrawal', val, 'USD', 'out');

      } else if (type === 'buy_tesla') {
        // Swap Cash for Tesla Stock
        await updateDoc(userRef, { 
          balance: increment(-val),      // Deduct Cash
          teslaBalance: increment(val)   // Add to Tesla Holdings
        });
        await recordTx(user.uid, 'Buy Asset', val, 'TSLA', 'out'); 
      }

      setLoading(false);
      onClose();
      // Force reload to update UI
      window.location.reload(); 
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const recordTx = async (uid: string, type: string, amount: number, asset: string, dir: string) => {
    await addDoc(collection(db, "transactions"), {
      userId: uid,
      type: type,
      amount: amount,
      asset: asset,
      status: 'Completed',
      date: new Date().toISOString(),
      direction: dir
    });
  }

  const getTitle = () => {
    if (type === 'buy_tesla') return 'Allocate to Tesla';
    return `${type} Funds`;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="w-full max-w-sm bg-[#0a0a0a] border border-[#D4AF37]/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/5 rounded-full text-gray-400 hover:text-white">
              <X size={18} />
            </button>

            <h3 className="text-xl font-serif text-white capitalize mb-6">{getTitle()}</h3>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">
                  {type === 'buy_tesla' ? 'Investment Amount (USD)' : 'Amount (USD)'}
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] text-xl font-serif">$</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-2xl font-mono text-white focus:border-[#D4AF37] outline-none transition"
                    placeholder="0.00"
                    autoFocus
                  />
                </div>
                {type === 'buy_tesla' && (
                  <p className="text-[10px] text-gray-500 mt-2 text-right">
                    Available Cash: <span className="text-white">${currentBalance.toLocaleString()}</span>
                  </p>
                )}
              </div>

              <button 
                onClick={handleTransaction}
                disabled={loading}
                className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white transition flex justify-center items-center gap-2 shadow-lg shadow-[#D4AF37]/20"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Confirm Transaction'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
