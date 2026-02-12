'use client';

import Navbar from '@/components/landing/Navbar';
import { ShieldCheck, Lock } from 'lucide-react';

export default function OldInsurancePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <div className="pt-32 px-6 max-w-7xl mx-auto text-center">
        <ShieldCheck size={80} className="text-[#D4AF37] mx-auto mb-8" />
        <h1 className="text-4xl md:text-6xl font-serif mb-6">Principal Protection</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16">
          Your capital is secured by our $20 Billion internal insurance fund. In the unlikely event of algorithmic failure, 
          losses are automatically reimbursed to your account balance.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
           <div className="bg-[#111] p-8 rounded-2xl border border-white/10 flex gap-4">
              <Lock className="text-[#D4AF37] shrink-0" size={32} />
              <div>
                 <h3 className="font-bold text-lg">Zero Liability</h3>
                 <p className="text-gray-500 text-sm mt-1">Investors are not liable for trading losses incurred by system errors.</p>
              </div>
           </div>
           <div className="bg-[#111] p-8 rounded-2xl border border-white/10 flex gap-4">
              <ShieldCheck className="text-[#D4AF37] shrink-0" size={32} />
              <div>
                 <h3 className="font-bold text-lg">Cold Storage</h3>
                 <p className="text-gray-500 text-sm mt-1">90% of assets are held in offline cold wallets to prevent cyber attacks.</p>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
