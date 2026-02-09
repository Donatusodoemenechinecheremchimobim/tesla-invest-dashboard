#!/bin/bash

echo "🛠 FIXING INSURANCE PAGE TYPE ERRORS..."

cat << 'EOF' > src/app/insurance/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Shield, Umbrella, Heart, Car, Home, HardHat } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';

// 1. Define the Animation Variants SEPARATELY
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// 2. Define your Data
const insurancePlans = [
  { icon: Shield, title: "Tesla Protect", desc: "Comprehensive coverage for your TSLA assets." },
  { icon: Umbrella, title: "Portfolio Shield", desc: "Protection against market volatility crashes." },
  { icon: Heart, title: "Life & Wealth", desc: "Securing your family's financial future." },
  { icon: Car, title: "Fleet Insurance", desc: "For owners of 3 or more Tesla vehicles." },
  { icon: Home, title: "Smart Home", desc: "Integration with Tesla Powerwall & Solar." },
  { icon: HardHat, title: "Optimus Liability", desc: "Coverage for household robot labor." }
];

export default function InsurancePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">Wealth <span className="text-[#D4AF37]">Insurance</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto uppercase tracking-widest text-xs">Protecting the assets of the future</p>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {insurancePlans.map((plan, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-[#D4AF37]/50 transition-colors group"
            >
              <plan.icon className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-serif mb-2">{plan.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{plan.desc}</p>
              <button className="mt-6 text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold border-b border-[#D4AF37]/20 pb-1 hover:border-[#D4AF37] transition-all">
                Request Quote
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
EOF

echo "✅ INSURANCE PAGE FIXED. Syncing to GitHub..."
git add .
git commit -m "Fix: Insurance page TypeScript variants error"
git push origin main