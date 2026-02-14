'use client';
import React from 'react';
import PortalNavbar from '@/components/portal/PortalNavbar';
import { Crown, Diamond, Sparkles, CheckCircle } from 'lucide-react';

export default function PortalLanding() {
  const tiers = [
    { name: "Silver", price: "$4,000+", roi: "150%", icon: <Sparkles size={24}/> },
    { name: "Gold", price: "$15,000+", roi: "250%", icon: <Crown size={32}/>, popular: true },
    { name: "Diamond", price: "$50,000+", roi: "400%", icon: <Diamond size={24}/> }
  ];

  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <PortalNavbar />
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-7xl font-serif tracking-tighter mb-4 italic">Institutional Tiers</h1>
          <p className="text-gray-500 uppercase text-[10px] tracking-[0.4em]">Minimum entry starting at $4,000</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier, i) => (
            <div key={i} className={`p-8 rounded-[2.5rem] border ${tier.popular ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/5 bg-[#0a0a0a]'} flex flex-col items-center text-center`}>
              <div className="mb-6 text-[#D4AF37]">{tier.icon}</div>
              <h3 className="text-2xl font-serif mb-2">{tier.name}</h3>
              <p className="text-3xl font-bold mb-6">{tier.price}</p>
              <div className="w-full pt-6 border-t border-white/5 space-y-4 mb-8">
                 <div className="flex items-center gap-2 text-xs text-gray-400"><CheckCircle size={14} className="text-[#D4AF37]"/> {tier.roi} Weekly Returns</div>
                 <div className="flex items-center gap-2 text-xs text-gray-400"><CheckCircle size={14} className="text-[#D4AF37]"/> Insured Capital</div>
              </div>
              <a href="/dashboard" className="w-full py-4 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] transition-colors">Start Yield</a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
