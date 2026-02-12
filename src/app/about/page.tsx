'use client';

import IntroNavbar from '@/components/intro/IntroNavbar';
import RocketGraph from '@/components/landing/RocketGraph'; 
import SignatureAnimation from '@/components/landing/SignatureAnimation'; // 👈 IMPORTED
import { motion } from 'framer-motion';
import { Target, Users, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37]">
      <IntroNavbar />
      
      {/* HERO STORY */}
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em]">Our Genesis</span>
          <h1 className="text-5xl md:text-8xl font-serif mt-6 mb-8">From Chaos to Code.</h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed font-light">
            In 2020, the financial markets broke. While retail investors panicked, algorithms feasted. 
            We asked a simple question: <br/>
            <span className="text-white font-bold italic">"Why should Wall Street have all the fun?"</span>
          </p>
        </motion.div>

        {/* ✍️ SIGNATURE ADDED HERE */}
        <div className="py-10">
           <SignatureAnimation />
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
           <div className="space-y-12">
              <div className="flex gap-6">
                 <div className="bg-[#111] p-4 h-fit rounded-2xl border border-white/10"><Target className="text-[#D4AF37]" size={32}/></div>
                 <div>
                    <h3 className="text-2xl font-serif mb-2">The Objective</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                       To democratize high-frequency trading. We built a bridge between Tesla's Dojo Supercomputer and your wallet.
                    </p>
                 </div>
              </div>
              <div className="flex gap-6">
                 <div className="bg-[#111] p-4 h-fit rounded-2xl border border-white/10"><Users className="text-[#D4AF37]" size={32}/></div>
                 <div>
                    <h3 className="text-2xl font-serif mb-2">The Community</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                       14,000+ members strong. From Dubai to Tokyo, our investors are not just clients; they are part of the network.
                    </p>
                 </div>
              </div>
           </div>

           <div className="bg-[#050505] p-8 rounded-[3rem] border border-white/10 shadow-2xl text-center">
              <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-8">Visualizing Our Growth</p>
              <RocketGraph />
              <p className="text-gray-500 text-[10px] mt-8 italic">Actual representation of Portfolio v4.2 Performance</p>
           </div>
        </div>
      </section>
    </main>
  );
}
