'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import { motion } from 'framer-motion';
import { Target, Compass, BarChart, ShieldCheck, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function VisionPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900 selection:bg-[#059669] selection:text-white">
      <IntroNavbar />
      
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block py-2 px-4 rounded-full bg-green-50 text-[#059669] text-xs font-bold uppercase tracking-wider mb-6 border border-green-100">
              Future Forward
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900 tracking-tight leading-tight">
              A Vision for <br/>
              <span className="text-[#059669]">Generational Wealth.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-8">
              Verde Capital is built to bridge the gap between complex algorithms and the individual investor. We provide the tools; you provide the ambition.
            </p>
          </motion.div>

          {/* CODE-BASED ILLUSTRATION (Never fails to load) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl bg-gradient-to-br from-[#059669] to-[#064e3b] p-8 flex flex-col justify-between border-8 border-white"
          >
            <div className="flex justify-between items-start">
               <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                  <TrendingUp className="text-white" size={32} />
               </div>
               <div className="text-right">
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Market Status</p>
                  <p className="text-white font-bold text-xl">Bullish +4.2%</p>
               </div>
            </div>

            <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                 <motion.div 
                   key={i}
                   initial={{ width: 0 }}
                   animate={{ width: i === 1 ? '100%' : i === 2 ? '80%' : '60%' }}
                   transition={{ duration: 1, delay: i * 0.2 }}
                   className="h-4 bg-white/10 rounded-full overflow-hidden"
                 >
                    <div className="h-full bg-white/30 rounded-full" />
                 </motion.div>
               ))}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl">
               <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-gray-900">Portfolio Growth</p>
                  <ArrowUpRight className="text-[#059669]" />
               </div>
               <div className="h-24 flex items-end gap-2">
                  {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="flex-1 bg-[#059669]/20 rounded-t-md hover:bg-[#059669] transition-colors cursor-pointer"
                    />
                  ))}
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { icon: Target, title: "Precision", desc: "Every trade is calculated with 99.9% algorithmic accuracy." },
              { icon: Compass, title: "Ethics", desc: "We prioritize sustainable markets." },
              { icon: BarChart, title: "Growth", desc: "Consistent returns for wealth compounding." },
              { icon: ShieldCheck, title: "Safety", desc: "Bank-grade encryption for total peace of mind." }
            ].map((v, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#059669]">
                  <v.icon size={28} />
                </div>
                <h3 className="text-lg font-bold mb-3">{v.title}</h3>
                <p className="text-sm text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
