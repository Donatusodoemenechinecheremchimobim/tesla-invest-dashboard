'use client';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Membership() {
  return (
    <section id="membership" className="py-32 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[#D4AF37] text-xs font-bold tracking-[0.4em] uppercase">Selection Process</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mt-4">Access Tiers</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Gold Tier */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 border border-white/10 bg-[#111] rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 bg-white/5 rounded-bl-2xl text-xs uppercase tracking-widest text-gray-400">Standard</div>
            <h3 className="text-3xl font-serif text-white mb-2">Gold Reserve</h3>
            <p className="text-gray-500 mb-8 text-sm">For accredited investors starting their journey.</p>
            <div className="text-4xl font-bold text-white mb-8">$50k <span className="text-sm font-normal text-gray-600">Min Deposit</span></div>
            
            <ul className="space-y-4 mb-10 text-gray-400 text-sm">
              <li className="flex items-center gap-3"><Check size={16} className="text-[#D4AF37]" /> AI-Driven Portfolio</li>
              <li className="flex items-center gap-3"><Check size={16} className="text-[#D4AF37]" /> 24/7 Support Ticket</li>
              <li className="flex items-center gap-3"><Check size={16} className="text-[#D4AF37]" /> Mobile App Access</li>
            </ul>
            <button className="w-full py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition">Apply</button>
          </motion.div>

          {/* Black Tier */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 border border-[#D4AF37]/50 bg-gradient-to-b from-[#1a1a1a] to-black rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.1)]"
          >
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent left-0" />
            <h3 className="text-3xl font-serif text-white mb-2">Tesla <span className="text-[#D4AF37]">Black</span></h3>
            <p className="text-gray-500 mb-8 text-sm">Invite-only access for ultra-high net worth.</p>
            <div className="text-4xl font-bold text-white mb-8">$500k <span className="text-sm font-normal text-gray-600">Min Deposit</span></div>
            
            <ul className="space-y-4 mb-10 text-white text-sm">
              <li className="flex items-center gap-3"><Check size={16} className="text-[#D4AF37]" /> <span className="font-bold">Zero</span> Management Fees</li>
              <li className="flex items-center gap-3"><Check size={16} className="text-[#D4AF37]" /> Dedicated Wealth Officer</li>
              <li className="flex items-center gap-3"><Check size={16} className="text-[#D4AF37]" /> Laser-Etched Metal Card</li>
              <li className="flex items-center gap-3"><Check size={16} className="text-[#D4AF37]" /> SpaceX Launch Invites</li>
            </ul>
            <button className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-white transition shadow-lg shadow-[#D4AF37]/20">Request Invitation</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
