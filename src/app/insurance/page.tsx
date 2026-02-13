'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import ShieldedSprout from '@/components/animations/ShieldedSprout'; // 👈 IMPORTED
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Umbrella } from 'lucide-react';

export default function InsurancePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900 selection:bg-[#059669] selection:text-white">
      <IntroNavbar />
      
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900 tracking-tight">
            Capital Protection.
          </h1>

          {/* ANIMATION HERE */}
          <div className="mb-12">
             <ShieldedSprout />
          </div>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12">
            Your peace of mind is our primary asset. Every account is insured up to $2.5M 
            through our global banking partners. We protect your growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 text-left">
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:border-green-200 transition-colors">
              <Umbrella className="text-[#059669] mb-4" size={32} />
              <h3 className="text-2xl font-bold mb-2">FDIC Insured</h3>
              <p className="text-gray-500">Cash balances are held in FDIC-insured program banks, protecting your liquidity against bank failure.</p>
           </div>
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:border-green-200 transition-colors">
              <Lock className="text-[#059669] mb-4" size={32} />
              <h3 className="text-2xl font-bold mb-2">SIPC Protection</h3>
              <p className="text-gray-500">Securities in your account are protected up to $500,000. We take custody seriously.</p>
           </div>
        </div>
      </section>
    </main>
  );
}
