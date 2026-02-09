#!/bin/bash

echo "🧈 APPLYING BUTTER SMOOTH UPDATES & MOBILE FIXES..."

# 1. Update Global CSS for hidden scrollbars and smooth scrolling
cat << 'EOF' > src/app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-tap-highlight-color: transparent;
  }
  body {
    @apply bg-[#050505] text-white antialiased overflow-x-hidden;
  }
}

@layer utilities {
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
}
EOF

# 2. RESTORE & FIX Insurance Page (Vercel Ready)
cat << 'EOF' > src/app/insurance/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Shield, Umbrella, Heart, Car, Home, HardHat, Lock } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

const plans = [
  { icon: Shield, title: "Tesla Protect", desc: "Comprehensive coverage for your digital and physical TSLA assets." },
  { icon: Umbrella, title: "Portfolio Shield", desc: "Advanced protection against extreme market volatility and flash crashes." },
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
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.5em] mb-4 block"
          >
            Tesla Quantum Shield
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Immortality for <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F9E29C]">Your Wealth.</span>
          </h1>
        </div>

        {/* Horizontal Scroll on Mobile */}
        <motion.div 
          className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-10 no-scrollbar snap-x snap-mandatory"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              className="min-w-[85vw] md:min-w-0 snap-center p-8 rounded-3xl bg-gradient-to-b from-[#111] to-black border border-white/10 hover:border-[#D4AF37] transition-all group"
            >
              <plan.icon className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-2xl font-serif mb-4">{plan.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{plan.desc}</p>
              <button className="w-full py-4 border border-white/10 rounded-xl text-[10px] uppercase font-bold tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all">
                Request Encryption
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
EOF

# 3. FIX Wealth Flywheel (Mobile Clipping Fix)
cat << 'EOF' > src/components/landing/Strategy.tsx
'use client';
import { motion } from 'framer-motion';
import { Network, Database, Coins, ArrowUpRight } from 'lucide-react';

export default function Strategy() {
  return (
    <section id="strategy" className="py-20 md:py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em] mb-4 block">The Wealth Mechanism</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 md:mb-8 leading-tight">
              The Wealth <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F9E29C]">Flywheel.</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed">
              Tesla isn't just a car company; it's a <strong className="text-white">compounding AI engine</strong> designed to capture the next $10 Trillion of economic value.
            </p>

            <div className="space-y-6 md:space-y-8">
              {[
                { title: "1. The Fleet Learns", desc: "Every Tesla mile trains the world's most advanced Neural Net.", icon: Network },
                { title: "2. The AI Scales", desc: "FSD and Optimus unlock margins never seen in human history.", icon: Database },
                { title: "3. You Accumulate", desc: "Our platform captures this growth for the private investor.", icon: Coins }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 md:gap-6 group">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#D4AF37] transition-colors shrink-0">
                    <item.icon className="text-gray-500 group-hover:text-[#D4AF37]" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{item.title}</h4>
                    <p className="text-gray-500 text-xs md:text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Fixed Chart Image Container for Mobile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="relative w-full max-w-lg mx-auto lg:max-w-none"
          >
            <div className="absolute inset-0 bg-[#D4AF37]/10 blur-[100px] rounded-full" />
            <div className="relative border border-white/10 bg-black/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">TSLA Projection</p>
                  <p className="text-4xl md:text-5xl font-serif text-white mt-2">$3,500<span className="text-lg text-gray-600">/sh</span></p>
                </div>
                <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-bold flex items-center gap-1">
                  <ArrowUpRight size={14} /> +1,400%
                </div>
              </div>
              <div className="h-40 flex items-end gap-1 md:gap-2">
                {[30, 45, 40, 55, 70, 65, 90, 85, 95, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-[#D4AF37] to-white/20 rounded-t-sm" style={{ height: `${h}%`, opacity: 0.3 + (i * 0.07) }} />
                ))}
              </div>
              <p className="text-center text-gray-600 text-[9px] uppercase tracking-widest mt-6">Estimated Growth Curve (2026-2030)</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
EOF

# 4. FIX Concierge (Mobile Padding & Centering)
cat << 'EOF' > src/components/landing/Concierge.tsx
'use client';
import { motion } from 'framer-motion';
import { Globe, Shield, Headset } from 'lucide-react';

export default function Concierge() {
  const items = [
    { icon: Globe, title: "Global Access", desc: "Private terminal access in 140+ countries." },
    { icon: Shield, title: "Vault Storage", desc: "Physical and digital cold storage for TSLA keys." },
    { icon: Headset, title: "Black Concierge", desc: "24/7 dedicated wealth manager for elite members." }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-serif mb-16 text-white">Elite <span className="text-[#D4AF37]">Services.</span></h2>
        
        {/* Responsive Grid that scrolls horizontally on small screens */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="min-w-[75vw] md:min-w-0 snap-center p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6 border border-[#D4AF37]/20">
                <item.icon className="text-[#D4AF37]" size={28} />
              </div>
              <h4 className="text-white font-serif text-xl mb-3">{item.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
EOF

echo "✅ ALL FIXES APPLIED. SYNCING TO GIT..."
git add .
git commit -m "Optimize: Mobile layout fixes, smooth scroll, and insurance restoration"
git push origin main