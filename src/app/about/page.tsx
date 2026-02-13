'use client';

import IntroNavbar from '@/components/intro/IntroNavbar';
import MoneyTree from '@/components/animations/MoneyTree';
import { motion } from 'framer-motion';
import { Leaf, Users, History, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900 selection:bg-[#059669] selection:text-white">
      <IntroNavbar />
      
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-[#059669] text-xs font-bold uppercase tracking-wider mb-8">
            <Leaf size={14} /> Our Origins
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900 tracking-tight">
            Rooted in <span className="text-[#059669]">Trust.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed mb-16">
            We started with a simple seed of an idea: 
            What if high-frequency trading wasn't just for Wall Street, but for everyone?
          </p>
        </motion.div>

        {/* THE MONEY TREE ANIMATION */}
        <div className="mb-24">
           <MoneyTree />
           <p className="text-sm text-gray-400 mt-4 font-mono">Simulating Asset Growth Protocol...</p>
        </div>

        {/* STORY GRID */}
        <div className="grid md:grid-cols-2 gap-12 text-left">
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <History className="text-[#059669] mb-4" size={32} />
              <h3 className="text-2xl font-bold mb-4">The Beginning</h3>
              <p className="text-gray-600 leading-relaxed">
                 Founded in 2024, Verde Capital began as a small research project in sustainable algorithmic trading. 
                 We realized that by focusing on stable, eco-friendly markets, we could generate consistent returns without the chaos.
              </p>
           </div>
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <Target className="text-[#059669] mb-4" size={32} />
              <h3 className="text-2xl font-bold mb-4">The Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                 To democratize wealth generation. We believe financial freedom is a right, not a privilege. 
                 Our platform bridges the gap between complex tech and simple, daily profits.
              </p>
           </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-20 bg-white border-t border-gray-100">
         <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">Cultivated by Experts</h2>
            <div className="grid md:grid-cols-3 gap-8">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="group relative overflow-hidden rounded-3xl aspect-square bg-gray-100">
                    {/* Placeholder for Team Images */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                       <Users size={48} />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-left">
                       <h4 className="text-white font-bold">Executive Member</h4>
                       <p className="text-green-400 text-xs uppercase tracking-wider">Strategy & Growth</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </main>
  );
}
