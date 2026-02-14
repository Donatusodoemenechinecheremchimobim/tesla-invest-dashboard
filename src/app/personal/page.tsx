'use client';
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { Shield, Lock, Award, Key } from 'lucide-react';

export default function PersonalPage() {
  return (
    <main className="bg-[#050505] text-white overflow-hidden">
      <Navbar />
      {/* HERO WITH BACKGROUND IMAGE */}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565514020176-8c2cb576a08c?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 max-w-4xl mx-auto">
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-6">Private Client Group</p>
          <h1 className="text-7xl md:text-9xl font-serif mb-10 leading-none">Legacy <br /> Architecture.</h1>
          <p className="text-gray-300 text-xl leading-relaxed mb-12">
            Wealth is not just about accumulation; it is about preservation, transfer, and impact. We build fortresses around your capital.
          </p>
          <button className="px-12 py-5 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-white transition-colors">Request Access</button>
        </motion.div>
      </section>
      
      <section className="py-32 px-6 max-w-[1400px] mx-auto grid md:grid-cols-3 gap-8">
        {[
          { title: "Trust Structures", desc: "Multi-generational planning and tax-efficient vehicle deployment.", icon: <Shield /> },
          { title: "Physical Storage", desc: "Allocated gold and silver bullion stored in non-bank Swiss vaults.", icon: <Lock /> },
          { title: "Concierge Service", desc: "24/7 dedicated wealth manager access via encrypted lines.", icon: <Award /> },
        ].map((item, i) => (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i*0.2 }} key={i} className="bg-[#111] p-12 rounded-[2rem] border border-white/5 hover:border-[#D4AF37] transition-colors group">
            <div className="text-[#D4AF37] mb-8 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-3xl font-serif mb-4">{item.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </section>
      <Footer />
    </main>
  );
}
