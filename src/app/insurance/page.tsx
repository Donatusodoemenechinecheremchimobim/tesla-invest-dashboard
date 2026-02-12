'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import QuantumVault from '@/components/landing/QuantumVault';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle } from 'lucide-react';

export default function InsurancePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <IntroNavbar />
      
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
         <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <QuantumVault />
         </motion.div>

         <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em]">SAFU Protocol</span>
          <h1 className="text-5xl md:text-7xl font-serif mt-6 mb-8">Capital Protected.</h1>
          <p className="text-xl text-gray-400 leading-relaxed font-light mb-8">
            We don't just manage risk; we eliminate it. Every portfolio is backed by our 
            <strong> $20 Billion Insurance Fund</strong>. If a trade moves against us by more than 0.5%, 
            the fund automatically covers the difference.
          </p>
          <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
             <div className="flex justify-between mb-2">
                <span className="text-white text-sm">Insurance Fund Status</span>
                <span className="text-[#D4AF37] text-sm font-bold">100% SOLVENT</span>
             </div>
             <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#D4AF37] w-full animate-pulse" />
             </div>
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif text-center mb-12">Coverage Details</h2>
        <div className="space-y-4">
          {[
            "Principal Protection: Your initial deposit is 100% guaranteed.",
            "Smart Contract Audit: Verified by Certik and Quantstamp.",
            "Custody: Assets are held in multi-sig cold wallets.",
            "Instant Liquidity: Withdrawals are processed immediately."
          ].map((item, i) => (
             <div key={i} className="flex items-center gap-4 bg-[#111] p-6 rounded-xl border border-white/5">
                <CheckCircle className="text-[#D4AF37] shrink-0" />
                <span className="text-gray-300">{item}</span>
             </div>
          ))}
        </div>
      </section>
    </main>
  );
}
