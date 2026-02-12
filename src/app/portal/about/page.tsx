'use client';

import Navbar from '@/components/landing/Navbar';
import SignatureAnimation from '@/components/landing/SignatureAnimation';
import { motion } from 'framer-motion';
import { Award, BookOpen, PenTool, History } from 'lucide-react';

export default function OldAboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      
      {/* HEADER */}
      <div className="pt-32 px-6 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
           <h1 className="text-4xl md:text-6xl font-serif mb-6 text-[#D4AF37]">Our Legacy</h1>
           <p className="text-gray-400 text-lg mb-12">
             Before the algorithms, before the supercomputers, there was a simple idea: 
             <span className="text-white font-bold"> Market efficiency is a myth.</span>
           </p>
        </motion.div>

        {/* SIGNATURE ANIMATION */}
        <SignatureAnimation />
      </div>

      {/* STORY SECTION */}
      <div className="py-20 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
         
         <div className="space-y-8">
            <div className="bg-[#111] p-8 rounded-2xl border border-white/10">
               <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#D4AF37]/10 p-3 rounded-lg"><History className="text-[#D4AF37]" size={24}/></div>
                  <h3 className="text-xl font-bold">The Origin (2019)</h3>
               </div>
               <p className="text-gray-400 text-sm leading-relaxed">
                  It started in a garage in Palo Alto. A group of ex-SpaceX engineers realized that the same 
                  telemetry data used to land rockets could be applied to market volatility. The "Vector-3" 
                  algorithm was born.
               </p>
            </div>

            <div className="bg-[#111] p-8 rounded-2xl border border-white/10">
               <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#D4AF37]/10 p-3 rounded-lg"><PenTool className="text-[#D4AF37]" size={24}/></div>
                  <h3 className="text-xl font-bold">The Blueprint</h3>
               </div>
               <p className="text-gray-400 text-sm leading-relaxed">
                  We didn't want to build another hedge fund for billionaires. We wanted to build a 
                  <span className="text-white"> wealth-distribution engine</span>. By automating the trading process, 
                  we removed the need for expensive brokers and management fees.
               </p>
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-[#111] p-8 rounded-2xl border border-white/10">
               <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#D4AF37]/10 p-3 rounded-lg"><BookOpen className="text-[#D4AF37]" size={24}/></div>
                  <h3 className="text-xl font-bold">The Philosophy</h3>
               </div>
               <p className="text-gray-400 text-sm leading-relaxed">
                  Trust is currency. That is why our code is audited quarterly. That is why our insurance fund 
                  is transparent. We believe that if we make you money, you will stay. It is that simple.
               </p>
            </div>

            <div className="bg-[#050505] p-8 rounded-2xl border border-[#D4AF37]/30 text-center">
               <Award size={48} className="text-[#D4AF37] mx-auto mb-4" />
               <h3 className="text-2xl font-serif text-white mb-2">14,000+</h3>
               <p className="text-gray-500 text-xs uppercase tracking-widest">Active Members</p>
               <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-gray-300 italic">"The most sophisticated retail trading tool ever built."</p>
                  <p className="text-[#D4AF37] text-xs font-bold mt-2">— Financial Times (2025)</p>
               </div>
            </div>
         </div>

      </div>
    </main>
  );
}
