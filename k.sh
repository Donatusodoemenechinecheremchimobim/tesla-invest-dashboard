#!/bin/bash

echo "🚀 RESTORING VISIBILITY & UPGRADING TIERS..."

# 1. UPGRADE MEMBERSHIP TIERS (Horizontal Scroll on Mobile)
cat << 'EOF' > src/components/landing/Membership.tsx
'use client';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, Crown } from 'lucide-react';

const tiers = [
  {
    name: "Standard",
    price: "1,000",
    icon: Zap,
    features: ["Basic Tesla Insights", "Automated Deposits", "Standard Support"]
  },
  {
    name: "Black Tier",
    price: "25,000",
    icon: Shield,
    features: ["Quantum Engine Access", "Priority Withdrawals", "Personal Manager", "No Trade Fees"],
    popular: true
  },
  {
    name: "Founder",
    price: "100,000",
    icon: Crown,
    features: ["Direct Elon-Sentiment Feed", "Private Concierge", "Off-shore Vaults", "Unlimited Leverage"]
  }
];

export default function Membership() {
  return (
    <section id="membership" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">Access <span className="text-[#D4AF37]">Tiers.</span></h2>
          <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px]">Select your entry point into the future</p>
        </div>

        {/* Horizontal Mobile Scroll with Snap */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto no-scrollbar pb-10 snap-x snap-mandatory">
          {tiers.map((tier, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`min-w-[85vw] md:min-w-0 snap-center p-8 rounded-3xl border ${tier.popular ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-[0_0_40px_rgba(212,175,55,0.1)]' : 'border-white/10 bg-[#0a0a0a]'} relative overflow-hidden`}
            >
              {tier.popular && <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">Most Popular</div>}
              
              <tier.icon className={`mb-6 ${tier.popular ? 'text-[#D4AF37]' : 'text-gray-500'}`} size={32} />
              <h3 className="text-2xl font-serif text-white mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-3xl font-serif text-white">${tier.price}</span>
                <span className="text-gray-500 text-xs">/entry</span>
              </div>

              <ul className="space-y-4 mb-10">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-400">
                    <Check size={14} className="text-[#D4AF37]" /> {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${tier.popular ? 'bg-[#D4AF37] text-black hover:bg-white' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
                Apply for Access
              </button>
            </motion.div>
          ))}
        </div>

        {/* Mobile Indicators */}
        <div className="flex md:hidden justify-center gap-2 -mt-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
      </div>
    </section>
  );
}
EOF

# 2. FINAL REPAIR: LIVE ACTIVITY BUBBLE (Guaranteed Visibility)
cat << 'EOF' > src/components/ui/LiveActivity.tsx
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
EOF

echo "✅ FINAL REPAIRS COMPLETE. Syncing to GitHub..."
git add .
git commit -m "UI: Fixed activity visibility and added horizontal tiers for mobile"
git push origin main