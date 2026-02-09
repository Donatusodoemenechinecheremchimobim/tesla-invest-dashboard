'use client';
import { motion } from 'framer-motion';
import { Bot, Zap, Car, TrendingUp } from 'lucide-react';

export default function WhyTesla() {
  return (
    <section id="why-tesla" className="py-32 bg-[#020204] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">The <span className="text-[#D4AF37]">Singularity</span> Play.</h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Most people think Tesla sells cars. <strong className="text-white">They are wrong.</strong> Tesla is building the physical AI infrastructure of Earth. 
            Investing now is like buying Apple in 2005 or Amazon in 1999.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Optimus */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 rounded-3xl bg-gradient-to-b from-[#111] to-black border border-white/10 hover:border-[#D4AF37] transition-all duration-500 group"
          >
            <Bot className="text-[#D4AF37] w-12 h-12 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl font-serif text-white mb-4">Optimus</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Labor is the biggest cost in the economy. Tesla is solving it with humanoids.
              <span className="block mt-4 text-white font-bold text-lg">
                Market Potential: $25 Trillion
              </span>
            </p>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-[10%] h-full bg-[#D4AF37]" /> 
            </div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2">Current Saturation: Early Stage</p>
          </motion.div>

          {/* Card 2: Robotaxi */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 rounded-3xl bg-gradient-to-b from-[#111] to-black border border-white/10 hover:border-blue-500 transition-all duration-500 group"
          >
            <Car className="text-blue-500 w-12 h-12 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl font-serif text-white mb-4">Cybercab</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              A car that makes money while you sleep. The lowest cost-per-mile transport in history.
              <span className="block mt-4 text-white font-bold text-lg">
                Market Potential: $10 Trillion
              </span>
            </p>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-[5%] h-full bg-blue-500" />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2">Current Saturation: Very Early</p>
          </motion.div>

          {/* Card 3: Energy */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 rounded-3xl bg-gradient-to-b from-[#111] to-black border border-white/10 hover:border-green-500 transition-all duration-500 group"
          >
            <Zap className="text-green-500 w-12 h-12 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl font-serif text-white mb-4">Megapack</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              The world is running out of power for AI. Tesla Energy is growing 2x faster than the car business.
              <span className="block mt-4 text-white font-bold text-lg">
                Market Potential: Unlimited
              </span>
            </p>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-[30%] h-full bg-green-500" />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2">Current Saturation: Booming</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
