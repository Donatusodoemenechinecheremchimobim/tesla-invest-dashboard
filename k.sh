#!/bin/bash

echo "🛡️ EVOLVING INSURANCE TERMINAL..."

cat << 'EOF' > src/app/insurance/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Shield, Umbrella, Heart, Car, Home, Lock, ChevronRight } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { useEffect, useState } from 'react';

const plans = [
  { icon: Shield, title: "Tesla Protect", desc: "Military-grade encryption for your digital and physical TSLA holdings." },
  { icon: Umbrella, title: "Portfolio Shield", desc: "Algorithmic protection against Black Swan events and flash crashes." },
  { icon: Heart, title: "Life & Legacy", desc: "Preserving your generational wealth for the next century and beyond." },
  { icon: Car, title: "Fleet Insurance", desc: "Proprietary coverage for high-volume Tesla autonomous fleets." },
  { icon: Home, title: "Smart Asset", desc: "Total protection for Tesla Solar, Powerwall, and Smart Infrastructure." },
  { icon: Lock, title: "Quantum Vault", desc: "Insuring the physical hardware and keys to your financial soul." }
];

export default function InsurancePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => setIsLoggedIn(!!user));
    return () => unsub();
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] overflow-x-hidden">
      <Navbar />
      
      <div className="pt-32 pb-40 px-6 max-w-7xl mx-auto">
        {/* NARRATIVE SECTION */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.5em] mb-6 block"
          >
            Institutional Security
          </motion.span>
          <h1 className="text-4xl md:text-7xl font-serif mb-8 text-white">
            Our Promise to <span className="text-[#D4AF37]">The 1%.</span>
          </h1>
          <p className="text-gray-400 text-base md:text-xl leading-relaxed font-light">
            At Investment Tesla, we don't just manage assets; we insure the future. 
            Every client is backed by our <strong className="text-white">Quantum Liquidity Reserve</strong>, 
            a multi-billion dollar safety net designed to absorb global market shocks. 
            When you invest with us, you aren't just buying stock—you are entering a 
            fortress of financial immortality. We assume the risk, so you can enjoy the revolution.
          </p>
        </div>

        {/* AUTO-SCROLLING PLANS */}
        <div className="relative w-full overflow-hidden py-10">
          <motion.div 
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear",
              repeatType: "loop"
            }}
            style={{ width: "fit-content" }}
          >
            {/* Double the plans to create a seamless loop */}
            {[...plans, ...plans].map((plan, i) => (
              <div 
                key={i} 
                className="w-[300px] md:w-[380px] p-10 rounded-3xl bg-[#0a0a0a] border border-white/5 flex flex-col items-center text-center shrink-0 group hover:border-[#D4AF37]/40 transition-colors"
              >
                <plan.icon className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-2xl font-serif mb-4 text-white">{plan.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{plan.desc}</p>
              </div>
            ))}
          </motion.div>
          
          {/* Gradient Fades for the edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
        </div>

        {/* SINGULAR CALL TO ACTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center"
        >
          <Link 
            href={isLoggedIn ? "/dashboard" : "/auth"}
            className="group relative px-16 py-6 bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] text-sm overflow-hidden rounded-full shadow-[0_0_50px_rgba(212,175,55,0.3)] hover:scale-105 transition-all"
          >
            <span className="relative z-10 flex items-center gap-3">
              Get Insured <ChevronRight size={18} />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
          <p className="mt-6 text-gray-600 text-[10px] uppercase tracking-widest">
            Instant Enrollment via Tesla Quantum Link
          </p>
        </motion.div>
      </div>
    </main>
  );
}
EOF

echo "✅ INSURANCE PAGE RE-ENGINEERED. Syncing..."
git add .
git commit -m "Evolution: Unified CTA and auto-scrolling insurance engine"
git push origin main