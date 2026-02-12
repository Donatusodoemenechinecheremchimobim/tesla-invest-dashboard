'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <IntroNavbar />
      <div className="pt-40 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-serif mb-8">Private Concierge</h1>
        <p className="text-gray-400 mb-16">
          Our VIP support team is available 24/7 for Diamond Tier members. 
          Please use your dedicated line for immediate assistance.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
           <div className="bg-[#111] p-10 rounded-3xl border border-white/10 flex flex-col items-center">
              <Mail className="text-[#D4AF37] mb-4" size={32} />
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-gray-400 text-sm">vip@teslainv.com</p>
           </div>
           <div className="bg-[#111] p-10 rounded-3xl border border-white/10 flex flex-col items-center">
              <Phone className="text-[#D4AF37] mb-4" size={32} />
              <h3 className="font-bold mb-2">Priority Line</h3>
              <p className="text-gray-400 text-sm">+1 (888) 4-DOJO-AI</p>
           </div>
           <div className="bg-[#111] p-10 rounded-3xl border border-white/10 flex flex-col items-center">
              <MapPin className="text-[#D4AF37] mb-4" size={32} />
              <h3 className="font-bold mb-2">HQ</h3>
              <p className="text-gray-400 text-sm">Austin, Texas</p>
           </div>
        </div>
      </div>
    </main>
  );
}
