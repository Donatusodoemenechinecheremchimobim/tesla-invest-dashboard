'use client';

import { motion } from 'framer-motion';
import { Shield, Umbrella, Heart, Car, Home, HardHat, Lock } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

const plans = [
  { icon: Shield, title: "Tesla Protect", desc: "Comprehensive coverage for your digital and physical TSLA assets." },
  { icon: Umbrella, title: "Portfolio Shield", desc: "Advanced protection against extreme market volatility and flash crashes." },
  { icon: Heart, title: "Life & Legacy", desc: "Multi-generational wealth security and estate preservation." },
  { icon: Car, title: "Fleet Insurance", desc: "Dedicated insurance for high-volume Tesla vehicle owners." },
  { icon: Home, title: "Smart Asset", desc: "Integration coverage for Tesla Powerwall and Solar systems." },
  { icon: Lock, title: "Quantum Vault", desc: "Insuring the keys to your financial immortality." }
];

export default function InsurancePage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.5em] mb-4 block"
          >
            Tesla Quantum Shield
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Immortality for <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F9E29C]">Your Wealth.</span>
          </h1>
        </div>

        {/* Horizontal Scroll on Mobile */}
        <motion.div 
          className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-10 no-scrollbar snap-x snap-mandatory"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              className="min-w-[85vw] md:min-w-0 snap-center p-8 rounded-3xl bg-gradient-to-b from-[#111] to-black border border-white/10 hover:border-[#D4AF37] transition-all group"
            >
              <plan.icon className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-2xl font-serif mb-4">{plan.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{plan.desc}</p>
              <button className="w-full py-4 border border-white/10 rounded-xl text-[10px] uppercase font-bold tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all">
                Request Encryption
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
