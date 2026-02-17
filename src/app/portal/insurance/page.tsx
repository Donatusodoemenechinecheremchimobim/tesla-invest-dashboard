'use client';
import Navbar from '@/components/portal/PortalNavbar';
import { ShieldCheck, Lock } from 'lucide-react';

export default function InsurancePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
         <ShieldCheck size={64} className="text-[#D4AF37] mx-auto mb-8" />
         <h1 className="text-6xl font-serif mb-8">Insured <span className="text-[#D4AF37]">Excellence.</span></h1>
         <p className="text-gray-400 text-lg leading-relaxed mb-16">
            Every InvestmentTesla account is protected by a multi-layered insurance structure, covering assets up to $250,000 per client through our global clearing partners.
         </p>
         <div className="bg-[#111] border border-[#D4AF37]/30 p-10 rounded-3xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-6">
               <span className="text-gray-400">Insurance Provider</span>
               <span className="font-bold text-white">Tesla Assurance Corp</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-6">
               <span className="text-gray-400">Coverage Limit</span>
               <span className="font-bold text-[#D4AF37]">$250,000.00</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-gray-400">Status</span>
               <span className="font-bold text-[#00FF41] flex items-center gap-2"><Lock size={14}/> Active</span>
            </div>
         </div>
      </section>
    </main>
  );
}
