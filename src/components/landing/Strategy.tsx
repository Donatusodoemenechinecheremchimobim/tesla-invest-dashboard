'use client';
import { motion } from 'framer-motion';
import { Network, Database, Coins, ArrowUpRight } from 'lucide-react';

export default function Strategy() {
  return (
    <section id="strategy" className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em] mb-4 block">The Mechanism</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
              The Wealth <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F9E29C]">Flywheel.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Why does Tesla stock create millionaires? Because it is a 
              <strong className="text-white"> compounding data engine</strong>. 
              More cars = More data = Better AI = Higher Stock Price.
            </p>

            <div className="space-y-8">
              {[
                { 
                  title: "1. The Fleet Learns", 
                  desc: "Every mile driven by a Tesla trains the Neural Net. No other company has this data.",
                  icon: Network 
                },
                { 
                  title: "2. The AI Awakens", 
                  desc: "Full Self-Driving (FSD) becomes safer than humans. Robotaxis unlock $10T in value.",
                  icon: Database 
                },
                { 
                  title: "3. You Get Paid", 
                  desc: "As margins explode from software & robots, shareholders capture the profit.",
                  icon: Coins 
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#D4AF37] transition-colors shrink-0">
                    <item.icon className="text-gray-400 group-hover:text-[#D4AF37] transition-colors" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl group-hover:text-[#D4AF37] transition-colors">{item.title}</h4>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-purple-900/20 blur-[80px]" />
            <div className="relative border border-white/10 bg-black/80 backdrop-blur-xl p-8 rounded-3xl">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest">Projected Growth</p>
                  <p className="text-5xl font-serif text-white mt-2">$3,500<span className="text-lg text-gray-500">/share</span></p>
                </div>
                <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-bold flex items-center gap-1">
                  <ArrowUpRight size={16} /> +1,400%
                </div>
              </div>
              
              {/* Fake Chart Line */}
              <div className="h-40 flex items-end gap-2">
                {[20, 35, 30, 45, 60, 55, 80, 75, 90, 100].map((h, i) => (
                  <div key={i} className="w-full bg-[#D4AF37]" style={{ height: `${h}%`, opacity: 0.2 + (i * 0.08) }} />
                ))}
              </div>
              <p className="text-center text-gray-600 text-[10px] uppercase tracking-widest mt-6">Based on Ark Invest & Baron Capital Models (2025-2030)</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
