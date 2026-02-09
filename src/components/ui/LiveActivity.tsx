'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, DollarSign, Zap, Globe, ShieldCheck } from 'lucide-react';

const activities = [
  { name: "Sarah J.", loc: "Austin, TX", action: "earned", val: "$12,400", type: "profit" },
  { name: "Michael R.", loc: "London, UK", action: "bought", val: "500 TSLA", type: "buy" },
  { name: "Ahmed K.", loc: "Dubai, UAE", action: "withdrew", val: "$50,000", type: "cashout" },
  { name: "Elena V.", loc: "Berlin, DE", action: "staked", val: "$25,000", type: "stake" },
  { name: "James W.", loc: "Toronto, CA", action: "earned", val: "$8,200", type: "profit" },
  { name: "Wei L.", loc: "Singapore", action: "bought", val: "1,000 TSLA", type: "buy" },
  { name: "Oluwaseun B.", loc: "Lagos, NG", action: "invested", val: "$5,000", type: "buy" },
  { name: "Yuki T.", loc: "Tokyo, JP", action: "withdrew", val: "¥2,000,000", type: "cashout" },
  { name: "Jack D.", loc: "Chicago, US", action: "bought", val: "Tesla Call Option", type: "buy" },
  { name: "Sebastian L.", loc: "Buenos Aires, AR", action: "earned", val: "$3,000", type: "profit" }
];

export default function LiveActivity() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 1. Prevent Hydration Mismatch (Don't render on server)
  useEffect(() => {
    setMounted(true);
    
    // Show first one after 3 seconds
    const startTimer = setTimeout(() => setIsVisible(true), 3000);

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex(Math.floor(Math.random() * activities.length));
        setIsVisible(true);
      }, 1000);
    }, 8000);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, []);

  if (!mounted) return null;

  const item = activities[index];

  const getIcon = () => {
    switch (item.type) {
      case 'profit': return <TrendingUp size={16} className="text-green-400" />;
      case 'buy': return <Zap size={16} className="text-[#D4AF37]" />;
      case 'cashout': return <DollarSign size={16} className="text-blue-400" />;
      case 'stake': return <ShieldCheck size={16} className="text-purple-400" />;
      default: return <Globe size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 left-4 md:left-8 z-[10000] pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="flex items-center gap-3 p-3 bg-black/95 backdrop-blur-xl border border-[#D4AF37]/40 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.2)] w-[280px] md:w-[320px]"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
               {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-500 font-medium truncate">
                <span className="text-white font-bold">{item.name}</span> • {item.loc}
              </p>
              <p className="text-xs md:text-sm font-bold text-white mt-0.5">
                {item.action === 'earned' ? 'Profited' : 
                 item.action === 'bought' ? 'Purchased' : 
                 item.action === 'withdrew' ? 'Withdrew' : 'Staked'} 
                <span className="text-[#D4AF37] ml-1">{item.val}</span>
              </p>
            </div>
            <div className="text-[8px] text-gray-600 uppercase font-bold self-start mt-1">Now</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
