'use client';

import Navbar from '@/components/landing/Navbar';
import { Phone, MessageCircle } from 'lucide-react';

export default function OldConciergePage() {
  const WA_NUMBER = "19803487946";
  const WA_LINK = `https://wa.me/${WA_NUMBER}`;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <div className="pt-32 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-serif mb-8 text-[#D4AF37]">VIP Concierge</h1>
        <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Our dedicated support team is available 24/7 to assist Diamond Tier members. 
          Connect directly via our secure lines.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
           {/* WHATSAPP */}
           <a href={WA_LINK} target="_blank" className="bg-[#111] p-10 rounded-2xl border border-white/10 hover:border-green-500/50 hover:bg-green-500/5 transition-all group cursor-pointer">
              <MessageCircle className="mx-auto text-green-500 mb-4 group-hover:scale-110 transition-transform" size={48} />
              <h3 className="font-bold text-xl mb-2 text-white">WhatsApp Priority</h3>
              <p className="text-gray-500 mb-4">Instant response within 2 minutes.</p>
              <span className="text-green-500 font-mono text-sm">+{WA_NUMBER}</span>
           </a>

           {/* PHONE */}
           <div className="bg-[#111] p-10 rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-all group">
              <Phone className="mx-auto text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform" size={48} />
              <h3 className="font-bold text-xl mb-2 text-white">Emergency Line</h3>
              <p className="text-gray-500 mb-4">For urgent portfolio actions.</p>
              <span className="text-[#D4AF37] font-mono text-sm">+1 (888) 4-DOJO-AI</span>
           </div>
        </div>
      </div>
    </main>
  );
}
