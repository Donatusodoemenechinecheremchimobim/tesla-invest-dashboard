#!/bin/bash

echo "✒️ FIXING SIGNATURE (REVEAL MODE) & DEPLOYING FOUNDERS PAGE..."

# ======================================================
# 1. FIX SIGNATURE ANIMATION (Mask Reveal Technique)
# ======================================================
cat << 'EOF' > src/components/landing/SignatureAnimation.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SignatureAnimation() {
  const [isFinished, setIsFinished] = useState(false);

  return (
    <div className="relative w-full max-w-[500px] h-[200px] flex items-center justify-center mx-auto my-12">
      
      {/* PAPER BACKGROUND */}
      <div className="absolute inset-0 bg-[#080808] border border-[#333] rounded-xl shadow-2xl transform -rotate-1" />
      <div className="absolute inset-0 bg-[#050505] border border-[#D4AF37]/20 rounded-xl transform rotate-1 flex items-center justify-center overflow-hidden">
         
         <div className="relative z-10">
            {/* THE ACTUAL TEXT */}
            <h2 className="text-6xl md:text-7xl text-[#D4AF37] italic tracking-tighter" style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic' }}>
              TeslaInvest.
            </h2>

            {/* THE MASK (Hides the text, then slides away) */}
            <motion.div 
               initial={{ width: "100%" }}
               whileInView={{ width: "0%" }}
               transition={{ duration: 2.5, ease: "easeInOut" }}
               onAnimationComplete={() => setIsFinished(true)}
               className="absolute top-0 right-0 h-full bg-[#050505] z-20"
            />
         </div>

         {/* WAX SEAL (Stamps ONLY after writing is done) */}
         <motion.div 
           initial={{ scale: 3, opacity: 0 }}
           animate={{ scale: isFinished ? 1 : 3, opacity: isFinished ? 1 : 0 }}
           transition={{ type: "spring", stiffness: 180, damping: 12 }}
           className="absolute bottom-6 right-8 w-20 h-20 bg-gradient-to-br from-red-800 to-red-950 rounded-full border-4 border-red-900 shadow-2xl flex items-center justify-center rotate-12 z-30"
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
# 2. CREATE 'NEURAL SINGULARITY' ANIMATION (For Founders Page)
# ======================================================
cat << 'EOF' > src/components/landing/NeuralSingularity.tsx
'use client';

import { motion } from 'framer-motion';

export default function NeuralSingularity() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-black rounded-[3rem] border border-white/5 my-12 shadow-[0_0_100px_rgba(212,175,55,0.1)]">
      
      {/* 1. GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#D4AF37_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* 2. ORBITING RINGS */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute border border-[#D4AF37]/30 rounded-full"
          style={{ width: i * 120 + 'px', height: i * 120 + 'px' }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ repeat: Infinity, duration: 25 - i * 5, ease: "linear" }}
        >
           <div className="absolute top-0 left-1/2 w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]" />
        </motion.div>
      ))}

      {/* 3. CENTRAL BRAIN */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], filter: ["blur(0px)", "blur(5px)", "blur(0px)"] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="relative z-10 w-40 h-40 bg-gradient-to-br from-[#D4AF37] to-yellow-900 rounded-full flex items-center justify-center shadow-[0_0_80px_#D4AF37]"
      >
        <div className="text-black font-bold text-xs uppercase tracking-widest text-center">
           NEURAL<br/>LINK
        </div>
      </motion.div>

      {/* 4. SHOOTING DATA STREAMS */}
      {[...Array(15)].map((_, i) => (
         <motion.div
           key={i}
           className="absolute w-[2px] h-[100px] bg-gradient-to-t from-transparent to-white opacity-40"
           style={{ left: '50%', top: '50%', transformOrigin: 'top left' }}
           animate={{ rotate: Math.random() * 360, opacity: [0, 1, 0], scaleY: [0, 1.5, 0] }}
           transition={{ repeat: Infinity, duration: 2 + Math.random(), delay: Math.random() }}
         />
      ))}

    </div>
  );
}
EOF

# ======================================================
# 3. CREATE THE FOUNDERS PAGE
# ======================================================
mkdir -p src/app/founders
cat << 'EOF' > src/app/founders/page.tsx
'use client';

import IntroNavbar from '@/components/intro/IntroNavbar';
import NeuralSingularity from '@/components/landing/NeuralSingularity';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function FoundersPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37]">
      <IntroNavbar />
      
      {/* 1. HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
        
        {/* ELON MUSK CIRCULAR FRAME */}
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: "spring", stiffness: 100 }}
          className="relative w-64 h-64 mx-auto mb-12"
        >
           {/* Spinning Borders */}
           <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4AF37] animate-spin-slow" style={{ animationDuration: '20s' }} />
           <div className="absolute -inset-4 rounded-full border border-white/10" />
           
           {/* IMAGE */}
           <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#111] shadow-[0_0_50px_rgba(212,175,55,0.3)] bg-gray-800">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg" 
                alt="Elon Musk" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
           </div>

           {/* TITLE BADGE */}
           <div className="absolute bottom-0 right-4 bg-[#D4AF37] text-black text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest border border-white">
              Technoking
           </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1 className="text-5xl md:text-8xl font-serif mb-8 text-white">The Architect.</h1>
          <p className="text-[#D4AF37] font-mono text-sm uppercase tracking-[0.3em] mb-12">
             Elon Reeve Musk • Founder & Visionary
          </p>
        </motion.div>

        {/* 2. THE WRITE UP (MARS MANIFESTO) */}
        <div className="text-left bg-[#111] p-10 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden">
           <Quote className="absolute top-10 left-10 text-[#D4AF37]/20" size={100} />
           
           <div className="relative z-10 space-y-8 text-lg text-gray-300 font-light leading-relaxed">
              <p>
                 <span className="text-white font-bold text-2xl">Civilization is fragile.</span> The window of opportunity to become a multi-planetary species 
                 will not remain open forever. To secure the light of consciousness, we must build a self-sustaining city on Mars.
              </p>
              <p>
                 But space exploration is capital intensive. Traditional financing models—Wall Street banks, venture capital, 
                 government grants—are too slow, too risk-averse, and too short-sighted. 
                 <span className="text-[#D4AF37]"> We needed a perpetual motion machine for capital generation.</span>
              </p>
              <p>
                 That is why <strong>TeslaInvest</strong> was built. By redirecting the idle processing power of the 
                 Dojo Supercomputer during off-peak hours, we unlocked the ability to predict market volatility with 
                 99.9% accuracy.
              </p>
              <p>
                 Every dollar of profit generated by this platform serves two purposes: 
                 <br/>1. Expanding your personal wealth.
                 <br/>2. Funding the Starship program to take humanity to the stars.
              </p>
           </div>
        </div>

      </section>

      {/* 3. CRAZY ANIMATION SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
         <h2 className="text-3xl font-serif mb-8">The Engine: Neural Singularity</h2>
         <NeuralSingularity />
      </section>

    </main>
  );
}
EOF

# ======================================================
# 4. UPDATE NAVBAR TO INCLUDE 'FOUNDERS' LINK
# ======================================================
cat << 'EOF' > src/components/intro/IntroNavbar.tsx
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Menu, X, ChevronRight } from 'lucide-react';

export default function IntroNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Founders", href: "/founders" }, // 👈 ADDED HERE
    { name: "Technology", href: "/technology" },
    { name: "Insurance", href: "/insurance" },
    { name: "About", href: "/about" },
    { name: "Press", href: "/press" },
    { name: "Concierge", href: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-3 group z-50">
            <div className="bg-[#D4AF37] p-1.5 rounded-lg group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <Zap size={20} className="text-black fill-black" />
            </div>
            <span className="text-white font-serif font-bold text-xl tracking-wide">TESLA<span className="text-[#D4AF37]">INV</span></span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
            {links.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/portal" className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all group shadow-lg">
              Client Portal <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white hover:text-[#D4AF37] transition-colors z-50">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 lg:hidden flex flex-col"
          >
            <div className="flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={link.href} onClick={() => setIsOpen(false)} className="flex items-center justify-between p-6 border-b border-white/10 text-xl font-serif text-white hover:text-[#D4AF37] transition-colors group">
                    {link.name}
                    <ChevronRight size={16} className="text-gray-600 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8">
                <Link href="/portal" onClick={() => setIsOpen(false)} className="flex w-full items-center justify-center gap-2 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs py-5 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  Access Client Portal <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
EOF

echo "✅ FOUNDERS PAGE DEPLOYED & SIGNATURE FIXED."