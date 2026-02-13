'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // 👈 IMPORTED
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, TrendingUp, DollarSign, Globe } from 'lucide-react';

const transactions = [
  { name: "Sarah J.", country: "UK", action: "earned", amount: "$4,500" },
  { name: "Michael C.", country: "USA", action: "deposited", amount: "$10,000" },
  { name: "David L.", country: "Canada", action: "invested", amount: "$2,500" },
  { name: "Elena R.", country: "Spain", action: "withdrew", amount: "$1,200" },
  { name: "Ahmed K.", country: "UAE", action: "earned", amount: "$8,900" },
  { name: "Jessica T.", country: "Australia", action: "invested", amount: "$5,000" },
  { name: "Robert B.", country: "Germany", action: "earned", amount: "$3,200" },
  { name: "Liam N.", country: "Ireland", action: "deposited", amount: "$15,000" },
  { name: "Wei Z.", country: "China", action: "earned", amount: "$6,700" },
  { name: "Olivia P.", country: "USA", action: "invested", amount: "$1,000" },
  { name: "Carlos M.", country: "Mexico", action: "earned", amount: "$950" },
  { name: "Hiroshi T.", country: "Japan", action: "withdrew", amount: "$2,100" },
  { name: "Anna S.", country: "Russia", action: "earned", amount: "$12,400" },
  { name: "James W.", country: "UK", action: "invested", amount: "$7,500" },
  { name: "Sophie L.", country: "France", action: "deposited", amount: "$20,000" },
  { name: "Daniel K.", country: "Brazil", action: "earned", amount: "$5,600" },
  { name: "Emma R.", country: "USA", action: "invested", amount: "$3,000" },
  { name: "Lucas F.", country: "Italy", action: "earned", amount: "$1,800" },
  { name: "Mia H.", country: "Sweden", action: "withdrew", amount: "$900" },
  { name: "Noah G.", country: "Canada", action: "earned", amount: "$11,200" },
  { name: "Isabella V.", country: "Spain", action: "invested", amount: "$4,200" },
  { name: "Ethan B.", country: "USA", action: "deposited", amount: "$50,000" },
  { name: "Ava D.", country: "Australia", action: "earned", amount: "$2,300" },
  { name: "Mason J.", country: "USA", action: "invested", amount: "$1,500" },
  { name: "Charlotte M.", country: "UK", action: "earned", amount: "$7,800" },
  { name: "Amir S.", country: "UAE", action: "deposited", amount: "$25,000" },
  { name: "Harper C.", country: "Canada", action: "invested", amount: "$6,000" },
  { name: "Benjamin O.", country: "Germany", action: "earned", amount: "$3,900" },
  { name: "Evelyn K.", country: "USA", action: "withdrew", amount: "$1,400" },
  { name: "Alexander P.", country: "Greece", action: "earned", amount: "$9,100" },
  { name: "Abigail R.", country: "USA", action: "invested", amount: "$2,800" },
  { name: "Emily W.", country: "New Zealand", action: "deposited", amount: "$12,000" },
  { name: "Sebastian T.", country: "Chile", action: "earned", amount: "$4,700" },
  { name: "Elizabeth H.", country: "UK", action: "invested", amount: "$8,000" },
  { name: "Matthew D.", country: "USA", action: "earned", amount: "$1,600" },
  { name: "Sofia A.", country: "Argentina", action: "withdrew", amount: "$3,500" },
  { name: "Jackson B.", country: "Canada", action: "earned", amount: "$10,500" },
  { name: "Avery L.", country: "USA", action: "invested", amount: "$5,500" },
  { name: "Scarlett G.", country: "UK", action: "deposited", amount: "$18,000" },
  { name: "Henry F.", country: "France", action: "earned", amount: "$6,200" }
];

export default function SocialProof() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname(); // 👈 GET CURRENT URL

  useEffect(() => {
    // 🛑 STOP if we are on the Old Site (/portal)
    if (pathname?.startsWith('/portal')) return;

    const showNotification = () => {
      const randomIndex = Math.floor(Math.random() * transactions.length);
      setIndex(randomIndex);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 6000);
    };

    const initialTimer = setTimeout(showNotification, 1000);
    const loopTimer = setInterval(showNotification, 10000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(loopTimer);
    };
  }, [pathname]);

  // 🛑 DOUBLE CHECK: Don't render on portal
  if (pathname?.startsWith('/portal')) return null;

  const current = transactions[index];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="fixed bottom-6 left-6 z-[9999] bg-white border border-green-200 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] rounded-2xl p-4 flex items-center gap-4 max-w-sm pointer-events-none"
        >
          <div className="bg-green-50 p-3 rounded-full shrink-0">
            {current.action === 'earned' ? <TrendingUp size={20} className="text-[#059669]" /> : 
             current.action === 'invested' ? <DollarSign size={20} className="text-blue-600" /> :
             current.action === 'deposited' ? <CheckCircle size={20} className="text-green-600" /> :
             <Globe size={20} className="text-purple-500" />}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 leading-tight">
              {current.name} <span className="text-gray-400 font-normal text-xs">from {current.country}</span>
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Just {current.action} <span className="text-[#059669] font-bold">{current.amount}</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
