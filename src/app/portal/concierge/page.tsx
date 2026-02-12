'use client';

import Navbar from '@/components/landing/Navbar';
import { Mail, Phone } from 'lucide-react';

export default function OldConciergePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <div className="pt-32 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-serif mb-8 text-[#D4AF37]">VIP Concierge</h1>
        <p className="text-gray-400 text-lg mb-16">
          Our dedicated support team is available 24/7 to assist Diamond Tier members with deposits, withdrawals, and portfolio management.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
           <div className="bg-[#111] p-10 rounded-2xl border border-white/10">
              <Mail className="mx-auto text-[#D4AF37] mb-4" size={40} />
              <h3 className="font-bold text-xl mb-2">Email Support</h3>
              <p className="text-gray-500">support@teslainv.com</p>
           </div>
           <div className="bg-[#111] p-10 rounded-2xl border border-white/10">
              <Phone className="mx-auto text-[#D4AF37] mb-4" size={40} />
              <h3 className="font-bold text-xl mb-2">Priority Line</h3>
              <p className="text-gray-500">+1 (888) 4-DOJO-AI</p>
           </div>
        </div>
      </div>
    </main>
  );
}
