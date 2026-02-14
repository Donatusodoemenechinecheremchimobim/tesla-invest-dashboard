'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, TrendingUp, DollarSign, Globe, Zap } from 'lucide-react';

const transactions = [
  { name: "Sarah J.", country: "UK", action: "earned", amount: "$4,500" },
  { name: "Michael C.", country: "USA", action: "deposited", amount: "$10,000" },
  { name: "Elena R.", country: "Spain", action: "earned", amount: "$12,400" },
  { name: "Ahmed K.", country: "UAE", action: "earned", amount: "$8,900" },
  { name: "Jessica T.", country: "Australia", action: "invested", amount: "$5,000" },
  { name: "Liam N.", country: "Ireland", action: "deposited", amount: "$15,000" }
];

export default function SocialProof() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // 🛑 Prevent rendering on /portal routes if needed, 
    // but typically you'd want this consistent with the theme.
    if (pathname?.startsWith('/portal')) return;

    const showNotification = () => {
      setIndex(Math.floor(Math.random() * transactions.length));
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 6000);
    };

    const initialTimer = setTimeout(showNotification, 2000);
    const loopTimer = setInterval(showNotification, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(loopTimer);
    };
  }, [pathname]);

  if (pathname?.startsWith('/portal')) return null;

  const current = transactions[index];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.95 }}
          className="fixed bottom-6 left-6 z-[9999] bg-[#0a0a0a]/90 backdrop-blur-md border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl p-4 flex items-center gap-4 max-w-sm pointer-events-none"
        >
          {/* ICON CONTAINER - Gold Theme */}
          <div className="bg-[#D4AF37]/10 p-2.5 rounded-xl shrink-0 border border-[#D4AF37]/20">
            {current.action === 'earned' ? <TrendingUp size={18} className="text-[#D4AF37]" /> : 
             current.action === 'invested' ? <DollarSign size={18} className="text-[#D4AF37]" /> :
             <CheckCircle size={18} className="text-[#D4AF37]" />}
          </div>
          
          <div className="flex flex-col">
            <p className="text-[13px] font-bold text-white leading-tight tracking-tight">
              {current.name} <span className="text-gray-500 font-normal text-[11px] ml-1">from {current.country}</span>
            </p>
            <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-medium">
              Just {current.action} <span className="text-[#D4AF37] font-bold">{current.amount}</span>
            </p>
          </div>

          {/* SUBTLE GLOW EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 to-transparent rounded-2xl -z-10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}