'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Zap, DollarSign, ShieldCheck } from 'lucide-react';

const activities = [
  { name: "Sarah J.", loc: "Austin, TX", action: "earned", val: "$12,400", type: "profit" },
  { name: "Michael R.", loc: "London, UK", action: "bought", val: "500 TSLA", type: "buy" },
  { name: "Chisom E.", loc: "Abuja, NG", action: "withdrew", val: "$1,500", type: "cashout" },
  { name: "Sebastian L.", loc: "Buenos Aires, AR", action: "earned", val: "$3,000", type: "profit" },
  { name: "Elena V.", loc: "Berlin, DE", action: "staked", val: "$25,000", type: "stake" }
];

export default function LiveActivity() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Wait 3 seconds after load to show first bubble
    const timer = setTimeout(() => setShow(true), 3000);

    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIndex(Math.floor(Math.random() * activities.length));
        setShow(true);
      }, 1000);
    }, 9000);

    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  if (!mounted) return null;

  const item = activities[index];

  return (
    <div 
      className="fixed bottom-24 md:bottom-8 left-4 md:left-8 pointer-events-none" 
      style={{ zIndex: 2147483647 }}
    >
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.8 }}
            className="flex items-center gap-3 p-3 bg-black/95 backdrop-blur-2xl border border-[#D4AF37]/50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-[280px] md:w-[320px]"
          >
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
               {item.type === 'profit' ? <TrendingUp size={16} className="text-green-400" /> : <Zap size={16} className="text-[#D4AF37]" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-500 font-medium truncate pr-4">
                <span className="text-white font-bold">{item.name}</span> • {item.loc}
              </p>
              <p className="text-xs md:text-sm font-bold text-white mt-0.5">
                {item.action === 'earned' ? 'Profited' : 'Purchased'} 
                <span className="text-[#D4AF37] ml-1">{item.val}</span>
              </p>
            </div>
            <div className="text-[8px] text-gray-600 font-bold uppercase self-start mt-1 shrink-0">Now</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
