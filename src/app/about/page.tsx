'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37]">
      <IntroNavbar />
      
      <div className="pt-40 px-6 max-w-4xl mx-auto text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-serif mb-8">The Vision.</motion.h1>
        <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
          We believe that high-frequency algorithmic trading should not be limited to Wall Street hedge funds. 
          By leveraging the Dojo Supercomputer, we bring institutional-grade returns to the individual investor.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 mb-32">
         <div className="bg-[#111] p-10 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-serif mb-4">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To democratize wealth generation. For decades, the best trading algorithms were locked behind 
              the closed doors of Renaissance Technologies and Citadel. We broke the lock.
            </p>
         </div>
         <div className="bg-[#111] p-10 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-serif mb-4">Our Tech</h3>
            <p className="text-gray-400 leading-relaxed">
              Built on the backbone of Tesla's AI infrastructure. We utilize idle compute power from the 
              Dojo network to solve complex market inefficiencies.
            </p>
         </div>
      </div>
    </main>
  );
}
