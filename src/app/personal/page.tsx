'use client';
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { Shield, Lock, Award, Key } from 'lucide-react';

export default function PersonalPage() {
  return (
    <main className="bg-[#050505] text-white w-full overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* HERO WITH BACKGROUND IMAGE */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center px-4 md:px-6">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565514020176-8c2cb576a08c?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
        </div>
        
        {/* Content Layer */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }} 
            className="relative z-10 max-w-5xl mx-auto flex flex-col items-center"
        >
          <p className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-4 md:mb-6">Private Client Group</p>
          
          {/* Responsive Text Sizing: prevents cutoff on mobile */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif mb-6 md:mb-10 leading-[0.9] md:leading-none tracking-tight">
            Legacy <br /> Architecture.
          </h1>
          
          <p className="text-gray-300 text-base md:text-xl leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto px-2">
            Wealth is not just about accumulation; it is about preservation, transfer, and impact. We build fortresses around your capital.
          </p>
          
          <button className="px-10 py-4 md:px-12 md:py-5 bg-[#D4AF37] text-black font-bold text-[10px] md:text-xs uppercase tracking-widest rounded hover:bg-white transition-colors shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            Request Access
          </button>
        </motion.div>
      </section>
      
      {/* FEATURES GRID */}
      <section className="py-20 md:py-32 px-4 md:px-6 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {[
          { title: "Trust Structures", desc: "Multi-generational planning and tax-efficient vehicle deployment.", icon: <Shield /> },
          { title: "Physical Storage", desc: "Allocated gold and silver bullion stored in non-bank Swiss vaults.", icon: <Lock /> },
          { title: "Concierge Service", desc: "24/7 dedicated wealth manager access via encrypted lines.", icon: <Award /> },
        ].map((item, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ delay: i*0.2 }} 
            key={i} 
            // Adjusted padding: p-8 on mobile for more space, p-12 on PC for grandeur
            className="bg-[#111] p-8 md:p-12 rounded-[2rem] border border-white/5 hover:border-[#D4AF37] transition-colors group flex flex-col justify-between min-h-[250px]"
          >
            <div>
                <div className="text-[#D4AF37] mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                    {/* Cloned icon to enforce responsive sizing */}
                    {React.cloneElement(item.icon as React.ReactElement, { className: "w-8 h-8 md:w-10 md:h-10" })}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif mb-3 md:mb-4 text-white">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>
      
      <Footer />
    </main>
  );
}
