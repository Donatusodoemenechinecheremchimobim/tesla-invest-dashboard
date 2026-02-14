'use client';
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';

export default function ServicesPage() {
  const services = [
    { name: "Crypto Assets", desc: "Institutional-grade custody and trading for Bitcoin, Ethereum, and major alts. 100% Cold Storage." },
    { name: "Real Estate", desc: "Access to fractionalized ownership in commercial properties across Dubai, London, and NYC." },
    { name: "Equities", desc: "Direct market access to NYSE, NASDAQ, and LSE with sub-millisecond execution." },
    { name: "Offshore Banking", desc: "Multi-currency accounts in tax-neutral jurisdictions for total financial privacy." },
    { name: "Private Credit", desc: "High-yield fixed income opportunities not available on public markets." },
    { name: "Art & Collectibles", desc: "Tokenized investment in blue-chip art and vintage luxury assets." }
  ];

  return (
    <main className="bg-[#050505] text-white overflow-hidden">
      <Navbar />
      <section className="relative h-[60vh] flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]"></div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative z-10">
           <h1 className="text-7xl font-serif mb-8">Full Stack <br /><span className="text-[#D4AF37]">Finance.</span></h1>
           <p className="text-gray-400 max-w-2xl mx-auto text-xl">From traditional equities to decentralized finance, Verde Stock provides a unified platform.</p>
        </motion.div>
      </section>

      <section className="py-20 px-6 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i*0.1 }} key={i} className="bg-[#111] p-12 rounded-[2rem] border border-white/5 hover:border-[#D4AF37] hover:-translate-y-2 transition-all duration-300">
               <h3 className="text-3xl font-serif mb-6 text-white">{s.name}</h3>
               <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
          <div className="bg-[#D4AF37] p-12 rounded-[2rem] flex flex-col justify-center items-center text-black">
             <h3 className="text-4xl font-serif mb-6 text-center">Start Today</h3>
             <button className="px-10 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest rounded hover:scale-105 transition-transform">Open Account</button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
