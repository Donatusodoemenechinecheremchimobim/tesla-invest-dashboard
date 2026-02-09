'use client';
import { motion } from 'framer-motion';
import { Network, Database, Coins, ArrowUpRight } from 'lucide-react';

export default function Strategy() {
  return (
    <section id="strategy" className="py-20 md:py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em] mb-4 block">The Wealth Mechanism</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 md:mb-8 leading-tight">
              The Wealth <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F9E29C]">Flywheel.</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed">
              Tesla isn't just a car company; it's a <strong className="text-white">compounding AI engine</strong> designed to capture the next $10 Trillion of economic value.
            </p>

            <div className="space-y-6 md:space-y-8">
              {[
                { title: "1. The Fleet Learns", desc: "Every Tesla mile trains the world's most advanced Neural Net.", icon: Network },
                { title: "2. The AI Scales", desc: "FSD and Optimus unlock margins never seen in human history.", icon: Database },
                { title: "3. You Accumulate", desc: "Our platform captures this growth for the private investor.", icon: Coins }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 md:gap-6 group">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#D4AF37] transition-colors shrink-0">
                    <item.icon className="text-gray-500 group-hover:text-[#D4AF37]" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{item.title}</h4>
                    <p className="text-gray-500 text-xs md:text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Fixed Chart Image Container for Mobile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="relative w-full max-w-lg mx-auto lg:max-w-none"
          >
            <div className="absolute inset-0 bg-[#D4AF37]/10 blur-[100px] rounded-full" />
            <div className="relative border border-white/10 bg-black/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">TSLA Projection</p>
                  <p className="text-4xl md:text-5xl font-serif text-white mt-2">$3,500<span className="text-lg text-gray-600">/sh</span></p>
                </div>
                <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-bold flex items-center gap-1">
                  <ArrowUpRight size={14} /> +1,400%
                </div>
              </div>
              <div className="h-40 flex items-end gap-1 md:gap-2">
                {[30, 45, 40, 55, 70, 65, 90, 85, 95, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-[#D4AF37] to-white/20 rounded-t-sm" style={{ height: `${h}%`, opacity: 0.3 + (i * 0.07) }} />
                ))}
              </div>
              <p className="text-center text-gray-600 text-[9px] uppercase tracking-widest mt-6">Estimated Growth Curve (2026-2030)</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
