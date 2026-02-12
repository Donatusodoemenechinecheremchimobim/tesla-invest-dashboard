'use client';

import Navbar from '@/components/landing/Navbar';
import { ShieldCheck, Lock, CheckCircle, Ban, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function OldInsurancePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center">
         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
         >
            <div className="inline-block relative mb-8">
               <motion.div 
                 animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                 transition={{ repeat: Infinity, duration: 3 }}
                 className="absolute inset-0 bg-[#D4AF37] blur-[50px] rounded-full opacity-20"
               />
               <div className="relative p-8 rounded-full bg-[#111] border border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                  <ShieldCheck size={80} className="text-[#D4AF37]" />
               </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif mb-6 text-white">
              Principal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white">Protection</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
               The Secure Asset Fund for Users (SAFU) is backed by Tesla's $20B reserve. 
               We prioritize the safety of your capital above all else.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <Link href="/auth" className="inline-flex items-center gap-2 px-10 py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:bg-white transition-all">
                  Get Insured Now <ArrowRight size={18} />
               </Link>
            </motion.div>
         </motion.div>
      </section>

      {/* 2. COVERAGE GRID */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
         <div className="grid md:grid-cols-2 gap-12">
            
            <motion.div 
              initial={{ x: -50, opacity: 0 }} 
              whileInView={{ x: 0, opacity: 1 }} 
              className="bg-[#0a0a0a] border border-green-500/20 rounded-3xl p-10 relative overflow-hidden hover:border-green-500/50 transition-colors"
            >
               <div className="absolute top-0 right-0 p-4 bg-green-500/10 rounded-bl-2xl border-b border-l border-green-500/20">
                  <Shield size={24} className="text-green-500" />
               </div>
               <h3 className="text-2xl font-serif mb-6 text-white">Full Coverage</h3>
               <ul className="space-y-6">
                  {["Algorithmic Errors", "Flash Crash Events", "System Breaches", "Smart Contract Failures"].map((item, i) => (
                     <li key={i} className="flex items-start gap-4">
                        <CheckCircle size={18} className="text-green-500 mt-1 shrink-0" />
                        <span className="text-gray-300 text-sm">{item}</span>
                     </li>
                  ))}
               </ul>
            </motion.div>

            <motion.div 
               initial={{ x: 50, opacity: 0 }} 
               whileInView={{ x: 0, opacity: 1 }} 
               className="bg-[#0a0a0a] border border-red-500/20 rounded-3xl p-10 relative overflow-hidden hover:border-red-500/50 transition-colors"
            >
               <div className="absolute top-0 right-0 p-4 bg-red-500/10 rounded-bl-2xl border-b border-l border-red-500/20">
                  <Ban size={24} className="text-red-500" />
               </div>
               <h3 className="text-2xl font-serif mb-6 text-white">Liabilities</h3>
               <ul className="space-y-6">
                  {["Phishing Attacks", "Lost Passwords", "Shared Credentials", "Manual Overrides"].map((item, i) => (
                     <li key={i} className="flex items-start gap-4">
                        <Ban size={18} className="text-red-500 mt-1 shrink-0" />
                        <span className="text-gray-300 text-sm">{item}</span>
                     </li>
                  ))}
               </ul>
            </motion.div>

         </div>
      </section>
    </main>
  );
}
