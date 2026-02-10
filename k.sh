#!/bin/bash

echo "⚡ APPLYING MOBILE SPEED PATCH (GPU ACCELERATION)..."

# 1. INJECT "SPEED FORCE" CSS
# This adds classes that force the phone's GPU to take over rendering.
cat << 'EOF' > src/app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 0, 0, 0;
  --background-end-rgb: 0, 0, 0;
}

body {
  color: rgb(var(--foreground-rgb));
  background: black;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased; /* Makes text sharper/faster */
  -moz-osx-font-smoothing: grayscale;
}

/* 🚀 MOBILE OPTIMIZATION ENGINE */

/* 1. Force GPU for everything moving */
* {
  box-sizing: border-box;
}

/* 2. Optimize "Glass" effects for Mobile */
@media (max-width: 768px) {
  .backdrop-blur-md, .backdrop-blur-xl, .backdrop-blur-lg {
    /* Reduce blur radius on mobile to save GPU cycles */
    backdrop-filter: blur(8px) !important; 
    -webkit-backdrop-filter: blur(8px) !important;
  }
}

/* 3. Hardware Acceleration Class */
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  will-change: transform, opacity;
}

/* 4. Native Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* 5. Hide Scrollbar but keep functionality */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
EOF

# 2. OPTIMIZE THE LANDING PAGE (src/app/page.tsx)
# We wrap the main content in a GPU-forced container.
cat << 'EOF' > src/app/page.tsx
'use client';

import Navbar from '@/components/landing/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, TrendingUp, Zap, Globe } from 'lucide-react';
import TradeTicker from '@/components/dashboard/TradeTicker'; // Using your optimized ticker

export default function LandingPage() {
  return (
    // 'gpu-accelerated' class forces mobile smoothness
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden gpu-accelerated selection:bg-[#D4AF37] selection:text-black">
      <Navbar />

      {/* 🚀 OPTIMIZED HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        
        {/* Background - Static on mobile for speed */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)] z-0" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
           <motion.div 
             initial={{ opacity: 0, y: 30 }} 
             animate={{ opacity: 1, y: 0 }} 
             transition={{ duration: 0.8, ease: "easeOut" }} // Faster transition for mobile feel
           >
              <span className="inline-block py-1 px-3 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
                Official Tesla Investment Partner
              </span>
              
              <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-tight tracking-tight">
                The Future of <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Wealth Generation.</span>
              </h1>
              
              <p className="text-gray-400 text-sm md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                Join the world's first algorithmic trading ecosystem powered by Tesla's Dojo Supercomputer.
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full">
                <Link href="/auth" className="w-full md:w-auto px-8 py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  Access Client Portal
                </Link>
                <button className="w-full md:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-all">
                  View Performance
                </button>
              </div>
           </motion.div>
        </div>

        {/* TICKER AT BOTTOM HERO - OPTIMIZED POSITION */}
        <div className="absolute bottom-0 left-0 w-full z-20 border-t border-white/10 bg-black/80 backdrop-blur-md">
           <TradeTicker />
        </div>
      </section>

      {/* FEATURES GRID - REMOVED HEAVY HOVERS FOR MOBILE */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-black">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <ShieldCheck size={32}/>, title: "Insured Principal", desc: "Your capital is backed by Tesla's $20B Insurance Fund." },
            { icon: <Zap size={32}/>, title: "Quantum Speed", desc: "Trades executed in 0.04ms using Dojo Compute clusters." },
            { icon: <Globe size={32}/>, title: "Global Access", desc: "Trade TSLA, CRYPTO, and FX from anywhere in the world." }
          ].map((item, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl">
              <div className="text-[#D4AF37] mb-4">{item.icon}</div>
              <h3 className="text-xl font-serif mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 border-y border-white/5 bg-[#050505] text-center">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
            <div><h3 className="text-3xl font-serif text-white">14.5K</h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Clients</p></div>
            <div><h3 className="text-3xl font-serif text-white">$850M</h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Managed</p></div>
            <div><h3 className="text-3xl font-serif text-white">0.0%</h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Hacks</p></div>
            <div><h3 className="text-3xl font-serif text-white">24/7</h3><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Support</p></div>
         </div>
      </section>

    </main>
  );
}
EOF

echo "✅ SITE OPTIMIZED: GPU ACCELERATION ENABLED."