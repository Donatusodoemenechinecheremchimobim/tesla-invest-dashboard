#!/bin/bash

echo "🚀 FINALIZING PRODUCTION BUILD..."

# 1. Update Insurance Page with Horizontal Scroll & Progress Dots
cat << 'EOF' > src/app/insurance/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Shield, Umbrella, Heart, Car, Home, Lock } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const plans = [
  { icon: Shield, title: "Tesla Protect", desc: "Comprehensive coverage for your digital and physical TSLA assets." },
  { icon: Umbrella, title: "Portfolio Shield", desc: "Advanced protection against extreme market volatility." },
  { icon: Heart, title: "Life & Legacy", desc: "Multi-generational wealth security and estate preservation." },
  { icon: Car, title: "Fleet Insurance", desc: "Dedicated insurance for high-volume Tesla vehicle owners." },
  { icon: Home, title: "Smart Asset", desc: "Integration coverage for Tesla Powerwall and Solar systems." },
  { icon: Lock, title: "Quantum Vault", desc: "Insuring the keys to your financial immortality." }
];

export default function InsurancePage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
            Tesla Quantum Shield
          </motion.span>
          <h1 className="text-4xl md:text-7xl font-serif mb-6">
            Wealth <span className="text-[#D4AF37]">Immortality.</span>
          </h1>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative group">
          <motion.div 
            className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {plans.map((plan, i) => (
              <motion.div 
                key={i} 
                variants={cardVariants}
                className="min-w-[85vw] md:min-w-0 snap-center p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-[#D4AF37]/50 transition-all flex flex-col"
              >
                <plan.icon className="text-[#D4AF37] mb-6" size={32} />
                <h3 className="text-xl font-serif mb-3 text-white">{plan.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{plan.desc}</p>
                <button className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] uppercase font-bold tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all">
                  Request Access
                </button>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Mobile Scroll Dots */}
          <div className="flex md:hidden justify-center gap-2 mt-4">
            {plans.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
EOF

# 2. Force Sync to Git
git add .
git commit -m "Build: Fix type errors and optimize mobile insurance layout"
git push origin main

echo "------------------------------------------------"
echo "✅ SYNCED. Check your Vercel Dashboard now."
echo "------------------------------------------------"