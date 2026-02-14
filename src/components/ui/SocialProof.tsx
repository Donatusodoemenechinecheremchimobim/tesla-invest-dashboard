'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, TrendingUp, DollarSign, Globe } from 'lucide-react';

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
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed bottom-6 left-6 z-[9999] bg-white/90 backdrop-blur-md border border-green-100 shadow-2xl rounded-2xl p-4 flex items-center gap-4 max-w-sm pointer-events-none"
        >
          <div className="bg-green-50 p-2.5 rounded-xl shrink-0">
            {current.action === 'earned' ? <TrendingUp size={18} className="text-[#059669]" /> : 
             current.action === 'invested' ? <DollarSign size={18} className="text-blue-600" /> :
             <CheckCircle size={18} className="text-green-600" />}
          </div>
          <div className="flex flex-col">
            <p className="text-[13px] font-bold text-gray-900 leading-tight">
              {current.name} <span className="text-gray-400 font-normal text-[11px]">from {current.country}</span>
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              Just {current.action} <span className="text-[#059669] font-bold">{current.amount}</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
