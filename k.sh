#!/bin/bash

echo "🛡️ UPDATING INSURANCE PAGE & PORTAL ACCESS FLOW..."

# Update src/app/portal/insurance/page.tsx
cat << 'EOF' > src/app/portal/insurance/page.tsx
'use client';

import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, FileCheck, Landmark, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function InsurancePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-8">
            <ShieldCheck size={16} /> Asset Protection
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8">Insured <span className="text-[#D4AF37]">Excellence.</span></h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Every InvestmentTesla account is protected by a multi-layered insurance structure, covering assets up to $250,000 per client through our global clearing partners.
          </p>
          
          <div className="mt-12">
            <Link 
              href="/portal/auth" 
              className="inline-flex items-center gap-3 bg-[#D4AF37] text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#D4AF37]/20"
            >
              Get Insured Now <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          { icon: Lock, title: "SIPC Coverage", desc: "Securities in your account protected up to $500,000 (including $250,000 for cash)." },
          { icon: FileCheck, title: "Policy Transparency", desc: "View your personal insurance certificate instantly upon account verification." },
          { icon: Landmark, title: "Vault Security", desc: "95% of digital assets are stored in cold-storage vaults with geographic redundancy." }
        ].map((item, i) => (
          <div key={i} className="bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-[#D4AF37]/30 transition-all">
            <item.icon size={40} className="text-[#D4AF37] mb-6" />
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
EOF

echo "✅ SUCCESS: 'Get Insured' button now leads to /portal/auth."