#!/bin/bash

echo "🚀 OPTIMIZING IMAGES & UPGRADING FOUNDERS PAGE CONTENT..."

# ======================================================
# 1. CONFIGURE NEXT.JS TO ALLOW WIKIMEDIA IMAGES
# ======================================================
# We need to tell Next.js it's okay to optimize images from this domain.
cat << 'EOF' > next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
EOF

# ======================================================
# 2. CREATE THE NEW INTERACTIVE TEXT COMPONENT
# ======================================================
cat << 'EOF' > src/components/landing/ManifestoScroll.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

const manifestoPoints = [
  {
    highlight: "Civilization is fragile.",
    text: "The window of opportunity to become a multi-planetary species will not remain open forever. To secure the light of consciousness, we must build a self-sustaining city on Mars."
  },
  {
    highlight: "Traditional financing is broken.",
    text: "Wall Street banks, venture capital, and government grants are too slow, too risk-averse, and too short-sighted for the scale of interstellar ambition."
  },
  {
    highlight: "A perpetual capital engine.",
    text: "TeslaInvest was built to solve this. By redirecting idle Dojo Supercomputer processing power, we predict market volatility with unprecedented accuracy."
  },
  {
    highlight: "The dual mandate.",
    text: "Every dollar of profit generated serves two purposes: 1. Expanding your personal wealth. 2. Funding the Starship fleet to take humanity to the stars."
  }
];

function TextBlock({ item, index }: { item: any, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.6 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={{ 
        opacity: isInView ? 1 : 0.3, 
        x: isInView ? 0 : (index % 2 === 0 ? -20 : 20),
        scale: isInView ? 1 : 0.95
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative p-8 md:p-12 rounded-3xl border ${isInView ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/5 bg-[#111]'} transition-colors duration-700`}
    >
      <Quote className={`absolute top-6 left-6 ${isInView ? 'text-[#D4AF37]' : 'text-gray-700'} transition-colors duration-700`} size={40} />
      <div className="relative z-10 ml-10">
        <h3 className={`text-2xl md:text-3xl font-serif mb-4 ${isInView ? 'text-white' : 'text-gray-400'} transition-colors duration-700`}>
          {item.highlight}
        </h3>
        <p className={`text-lg leading-relaxed ${isInView ? 'text-gray-200' : 'text-gray-600'} transition-colors duration-700`}>
          {item.text}
        </p>
      </div>
    </motion.div>
  );
}

export default function ManifestoScroll() {
  return (
    <div className="space-y-24 py-20">
      {manifestoPoints.map((item, index) => (
        <TextBlock key={index} item={item} index={index} />
      ))}
    </div>
  );
}
EOF

# ======================================================
# 3. UPDATE THE FOUNDERS PAGE (Use next/image & New Text Component)
# ======================================================
cat << 'EOF' > src/app/founders/page.tsx
'use client';

import IntroNavbar from '@/components/intro/IntroNavbar';
import NeuralSingularity from '@/components/landing/NeuralSingularity';
import ManifestoScroll from '@/components/landing/ManifestoScroll'; // 👈 IMPORT NEW COMPONENT
import { motion } from 'framer-motion';
import Image from 'next/image'; // 👈 IMPORT NEXT/IMAGE

export default function FoundersPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37]">
      <IntroNavbar />
      
      {/* 1. HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
        
        {/* CIRCULAR ELON FRAME */}
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: "spring", stiffness: 100 }}
          className="relative w-64 h-64 mx-auto mb-12"
        >
           {/* Spinning Borders */}
           <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4AF37] animate-spin-slow" style={{ animationDuration: '20s' }} />
           <div className="absolute -inset-4 rounded-full border border-white/10" />
           
           {/* IMAGE - UPDATED TO NEXT/IMAGE FOR FAST LOADING */}
           <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#111] shadow-[0_0_50px_rgba(212,175,55,0.3)] bg-gray-800 relative">
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg" 
                alt="Elon Musk" 
                fill
                className="object-cover"
                priority // Loads immediately
              />
           </div>

           {/* Badge */}
           <div className="absolute bottom-0 right-4 bg-[#D4AF37] text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest border border-white z-10">
              Technoking
           </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1 className="text-5xl md:text-8xl font-serif mb-8 text-white">The Architect.</h1>
          <p className="text-[#D4AF37] font-mono text-sm uppercase tracking-[0.3em] mb-20">
             Elon Reeve Musk • Founder & Visionary
          </p>
        </motion.div>

        {/* 2. THE NEW INTERACTIVE MANIFESTO SCROLL */}
        <ManifestoScroll />

      </section>

      {/* 3. CRAZY ANIMATION SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center border-t border-white/10">
         <h2 className="text-3xl font-serif mb-8 mt-10">The Engine: Neural Singularity</h2>
         <NeuralSingularity />
      </section>

    </main>
  );
}
EOF

echo "✅ FOUNDERS PAGE OPTIMIZED: FASTER IMAGE & INTERACTIVE TEXT DEPLOYED."