#!/bin/bash

echo "✒️ REFINING SIGNATURE ANIMATION & UPGRADING ABOUT PAGE CONTENT..."

# ======================================================
# 1. FIX SIGNATURE ANIMATION (Writes on Blank, No Tracing)
# ======================================================
cat << 'EOF' > src/components/landing/SignatureAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SignatureAnimation() {
  const [isFinished, setIsFinished] = useState(false);

  return (
    <div className="relative w-full max-w-[500px] h-[200px] flex items-center justify-center mx-auto my-12">
      
      {/* PAPER TEXTURE BACKGROUND */}
      <div className="absolute inset-0 bg-[#080808] border border-[#333] rounded-xl shadow-2xl transform -rotate-1" />
      <div className="absolute inset-0 bg-[#050505] border border-[#D4AF37]/20 rounded-xl transform rotate-1 flex items-center justify-center overflow-hidden">
         
         {/* THE INVISIBLE PEN WRITING (SVG) */}
         <div className="relative z-10">
            <svg width="400" height="120" viewBox="0 0 400 120" className="overflow-visible">
               {/* This path approximates the cursive flow of "TeslaInvest". 
                  It is a single stroke to simulate a pen.
               */}
               <motion.path
                 d="M40,60 C50,40 60,80 70,60 C80,40 90,60 100,50 L110,50 C120,40 110,70 120,60 C130,50 140,50 150,60 C160,70 170,50 180,60 C190,70 200,50 210,60 L220,60 C230,50 240,70 250,60 C260,50 270,50 280,60 C290,70 300,50 310,60 C320,70 330,50 340,60 L360,60" 
                 fill="none"
                 stroke="#D4AF37"
                 strokeWidth="3"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 initial={{ pathLength: 0, opacity: 1 }}
                 whileInView={{ pathLength: 1 }}
                 transition={{ duration: 3.5, ease: "easeInOut" }}
                 onAnimationComplete={() => setIsFinished(true)}
               />
            </svg>

            {/* THE FINAL TEXT (Fades in ONLY after writing is done to "sharpen" the ink) */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: isFinished ? 1 : 0 }}
               transition={{ duration: 1 }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center"
            >
               <h2 className="text-5xl md:text-6xl font-serif text-[#D4AF37] italic tracking-tight drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  TeslaInvest.
               </h2>
            </motion.div>
         </div>

         {/* WAX SEAL (Stamps at the end) */}
         <motion.div 
           initial={{ scale: 3, opacity: 0 }}
           animate={{ scale: isFinished ? 1 : 3, opacity: isFinished ? 1 : 0 }}
           transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
           className="absolute bottom-6 right-8 w-20 h-20 bg-gradient-to-br from-red-800 to-red-950 rounded-full border-4 border-red-900 shadow-2xl flex items-center justify-center rotate-12 z-20"
         >
            <div className="w-14 h-14 border-2 border-red-900/50 rounded-full flex items-center justify-center">
               <div className="text-red-950 font-serif font-black text-xl">TI</div>
            </div>
         </motion.div>

      </div>
    </div>
  );
}
EOF

# ======================================================
# 2. UPDATE NEW SITE ABOUT PAGE (Professional Write-Up)
# ======================================================
cat << 'EOF' > src/app/about/page.tsx
'use client';

import IntroNavbar from '@/components/intro/IntroNavbar';
import RocketGraph from '@/components/landing/RocketGraph'; 
import SignatureAnimation from '@/components/landing/SignatureAnimation'; 
import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp, Cpu } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37]">
      <IntroNavbar />
      
      {/* 1. PROFESSIONAL HERO */}
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em]">The Paradigm Shift</span>
          <h1 className="text-5xl md:text-7xl font-serif mt-8 mb-10 leading-tight">
            The Quantized Future of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Global Capital.</span>
          </h1>
          
          <div className="text-lg md:text-xl text-gray-400 leading-relaxed font-light mb-12 max-w-3xl mx-auto space-y-6 text-justify">
            <p>
              The global financial infrastructure was originally architected for a bygone era of human latency. 
              In a contemporary market ecosystem governed by nanosecond arbitrage and high-frequency execution, 
              the traditional retail investor is mathematically disadvantaged.
            </p>
            <p>
              <strong>TeslaInvest</strong> was established on a singular, non-negotiable imperative: to democratize 
              institutional-grade algorithmic leverage. By synthesizing the raw computational throughput of 
              Tesla's Dojo architecture with proprietary predictive modeling, we have effectively eradicated the 
              latency gap, allowing private capital to maneuver with the precision of a sovereign wealth fund.
            </p>
          </div>
        </motion.div>

        {/* SIGNATURE ANIMATION */}
        <div className="py-8">
           <SignatureAnimation />
        </div>
      </section>

      {/* 2. CORE PHILOSOPHY GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
           
           <div className="space-y-16">
              <div className="flex gap-6 group">
                 <div className="bg-[#111] p-5 h-fit rounded-2xl border border-white/10 group-hover:border-[#D4AF37] transition-colors">
                    <Cpu className="text-[#D4AF37]" size={32}/>
                 </div>
                 <div>
                    <h3 className="text-2xl font-serif mb-3 text-white">Algorithmic Sovereignty</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                       We reject the inefficiency of human emotion in trading. Our Neural Networks process 
                       1.1 Exaflops of market data, identifying micro-fractures in asset pricing before they 
                       appear on standard Bloomberg terminals. This is not speculation; it is calculation.
                    </p>
                 </div>
              </div>

              <div className="flex gap-6 group">
                 <div className="bg-[#111] p-5 h-fit rounded-2xl border border-white/10 group-hover:border-[#D4AF37] transition-colors">
                    <TrendingUp className="text-[#D4AF37]" size={32}/>
                 </div>
                 <div>
                    <h3 className="text-2xl font-serif mb-3 text-white">Asymmetric Upside</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                       Traditional banking offers linear growth in a world of exponential inflation. 
                       Our "Vector-3" strategy leverages volatility as an asset class, turning market turbulence 
                       into a mechanism for compounding yield.
                    </p>
                 </div>
              </div>
           </div>

           {/* ROCKET GRAPH CARD */}
           <div className="bg-[#050505] p-10 rounded-[3rem] border border-white/10 shadow-2xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none" />
              <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-10">Performance Visualization</p>
              <RocketGraph />
              <div className="mt-10 pt-8 border-t border-white/10">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 uppercase tracking-widest">Model Accuracy</span>
                    <span className="text-white font-bold">99.1%</span>
                 </div>
                 <div className="w-full h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
                    <div className="w-[99%] h-full bg-[#D4AF37]" />
                 </div>
              </div>
           </div>

        </div>
      </section>

      {/* 3. THE FOUNDERS */}
      <section className="py-32 px-6 text-center bg-[#080808] border-y border-white/5">
         <Award size={48} className="mx-auto text-[#D4AF37] mb-8" />
         <blockquote className="text-2xl md:text-4xl font-serif max-w-5xl mx-auto leading-normal text-gray-200">
           "We did not build this platform to compete with the banks. <br/>
           We built it to render them obsolete."
         </blockquote>
         <div className="mt-10">
            <p className="text-white font-bold uppercase tracking-widest text-sm">The Architects</p>
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-widest mt-1">Austin • Palo Alto • Zurich</p>
         </div>
      </section>
    </main>
  );
}
EOF

echo "✅ UPGRADE COMPLETE: NEW ANIMATION LOGIC & PROFESSIONAL CONTENT."