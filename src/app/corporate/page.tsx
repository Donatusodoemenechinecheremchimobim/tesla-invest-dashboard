'use client';
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { Globe, TrendingUp, Building2 } from 'lucide-react';

export default function CorporatePage() {
  return (
    <main className="bg-[#050505] text-white overflow-hidden">
      <Navbar />
      <section className="relative h-[80vh] flex items-center px-6 max-w-[1400px] mx-auto">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] to-transparent"></div>
        
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="relative z-10 max-w-3xl">
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-6">Verde Corporate Solutions</p>
          <h1 className="text-7xl md:text-9xl font-serif mb-10 leading-none">Liquidity <br /> Engineered.</h1>
          <p className="text-gray-300 text-xl leading-relaxed mb-12">
            Optimize your company's treasury with AI-driven cash flow management, high-yield corporate accounts, and instant global payroll.
          </p>
          <button className="px-12 py-5 border border-[#D4AF37] text-[#D4AF37] font-bold text-xs uppercase tracking-widest rounded hover:bg-[#D4AF37] hover:text-black transition-colors">Open Corporate Account</button>
        </motion.div>
      </section>

      <section className="py-32 bg-[#111] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-20">
          <div className="space-y-16">
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex gap-8">
                <Globe className="text-[#D4AF37] shrink-0 w-12 h-12" />
                <div><h3 className="text-3xl font-serif mb-4">Treasury Management</h3><p className="text-gray-500 text-sm leading-loose">Automated sweeping of idle cash into government money market funds. Maximize yield without sacrificing liquidity.</p></div>
             </motion.div>
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-8">
                <TrendingUp className="text-[#D4AF37] shrink-0 w-12 h-12" />
                <div><h3 className="text-3xl font-serif mb-4">Payroll Solutions</h3><p className="text-gray-500 text-sm leading-loose">Crypto and Fiat payroll execution in 140+ countries. Seamless compliance and instant settlement.</p></div>
             </motion.div>
          </div>
          <div className="h-[500px] bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center rounded-[3rem] opacity-60"></div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
