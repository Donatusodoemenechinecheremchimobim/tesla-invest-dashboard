'use client';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, Crown } from 'lucide-react';

const tiers = [
  {
    name: "Standard",
    price: "1,000",
    icon: Zap,
    features: ["Basic Tesla Insights", "Automated Deposits", "Standard Support"]
  },
  {
    name: "Black Tier",
    price: "25,000",
    icon: Shield,
    features: ["Quantum Engine Access", "Priority Withdrawals", "Personal Manager", "No Trade Fees"],
    popular: true
  },
  {
    name: "Founder",
    price: "100,000",
    icon: Crown,
    features: ["Direct Elon-Sentiment Feed", "Private Concierge", "Off-shore Vaults", "Unlimited Leverage"]
  }
];

export default function Membership() {
  return (
    <section id="membership" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">Access <span className="text-[#D4AF37]">Tiers.</span></h2>
          <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px]">Select your entry point into the future</p>
        </div>

        {/* Horizontal Mobile Scroll with Snap */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto no-scrollbar pb-10 snap-x snap-mandatory">
          {tiers.map((tier, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`min-w-[85vw] md:min-w-0 snap-center p-8 rounded-3xl border ${tier.popular ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-[0_0_40px_rgba(212,175,55,0.1)]' : 'border-white/10 bg-[#0a0a0a]'} relative overflow-hidden`}
            >
              {tier.popular && <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">Most Popular</div>}
              
              <tier.icon className={`mb-6 ${tier.popular ? 'text-[#D4AF37]' : 'text-gray-500'}`} size={32} />
              <h3 className="text-2xl font-serif text-white mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-3xl font-serif text-white">${tier.price}</span>
                <span className="text-gray-500 text-xs">/entry</span>
              </div>

              <ul className="space-y-4 mb-10">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-400">
                    <Check size={14} className="text-[#D4AF37]" /> {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${tier.popular ? 'bg-[#D4AF37] text-black hover:bg-white' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
                Apply for Access
              </button>
            </motion.div>
          ))}
        </div>

        {/* Mobile Indicators */}
        <div className="flex md:hidden justify-center gap-2 -mt-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
      </div>
    </section>
  );
}
