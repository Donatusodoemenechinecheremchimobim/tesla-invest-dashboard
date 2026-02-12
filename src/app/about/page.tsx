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
