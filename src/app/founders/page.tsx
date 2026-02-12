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
