'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import { Phone, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const WA_NUMBER = "19803487946";
  const WA_LINK = `https://wa.me/${WA_NUMBER}`;

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
           
           {/* WHATSAPP */}
           <a href={WA_LINK} target="_blank" className="bg-[#111] p-10 rounded-3xl border border-white/10 flex flex-col items-center hover:border-green-500/50 transition-colors cursor-pointer">
              <MessageCircle className="text-green-500 mb-4" size={32} />
              <h3 className="font-bold mb-2">WhatsApp</h3>
              <p className="text-gray-400 text-sm">+{WA_NUMBER}</p>
           </a>

           {/* PHONE */}
           <div className="bg-[#111] p-10 rounded-3xl border border-white/10 flex flex-col items-center">
              <Phone className="text-[#D4AF37] mb-4" size={32} />
              <h3 className="font-bold mb-2">Priority Line</h3>
              <p className="text-gray-400 text-sm">+1 (888) 4-DOJO-AI</p>
           </div>

           {/* HQ */}
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
