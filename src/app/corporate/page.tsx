'use client';
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { Globe, TrendingUp, Building2 } from 'lucide-react';
import Link from 'next/link'; // 1. Import Link

export default function CorporatePage() {
  return (
    <main className="bg-[#050505] text-white w-full overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center px-4 md:px-6 max-w-[1400px] mx-auto pt-20 md:pt-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] to-transparent"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }} 
          className="relative z-10 max-w-3xl w-full"
        >
          <p className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-4 md:mb-6">Verde Corporate Solutions</p>
          
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif mb-8 md:mb-10 leading-[0.9] md:leading-none break-words">
            Liquidity <br /> Engineered.
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 md:mb-12 max-w-xl">
            Optimize your company's treasury with AI-driven cash flow management, high-yield corporate accounts, and instant global payroll.
          </p>
          
          {/* 2. UPDATED BUTTON: Changed <button> to <Link> pointing to /portal */}
          <Link 
            href="/portal"
            className="inline-block px-8 py-4 md:px-12 md:py-5 border border-[#D4AF37] text-[#D4AF37] font-bold text-[10px] md:text-xs uppercase tracking-widest rounded hover:bg-[#D4AF37] hover:text-black transition-colors"
          >
            Open Corporate Account
          </Link>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 md:py-32 bg-[#111] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div className="space-y-12 md:space-y-16">
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex gap-6 md:gap-8">
                <Globe className="text-[#D4AF37] shrink-0 w-10 h-10 md:w-12 md:h-12" />
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif mb-2 md:mb-4">Treasury Management</h3>
                  <p className="text-gray-500 text-sm leading-loose">Automated sweeping of idle cash into government money market funds. Maximize yield without sacrificing liquidity.</p>
                </div>
             </motion.div>
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-6 md:gap-8">
                <TrendingUp className="text-[#D4AF37] shrink-0 w-10 h-10 md:w-12 md:h-12" />
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif mb-2 md:mb-4">Payroll Solutions</h3>
                  <p className="text-gray-500 text-sm leading-loose">Crypto and Fiat payroll execution in 140+ countries. Seamless compliance and instant settlement.</p>
                </div>
             </motion.div>
          </div>
          {/* Image Container */}
          <div className="h-[300px] md:h-[500px] bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center rounded-[2rem] md:rounded-[3rem] opacity-60"></div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
