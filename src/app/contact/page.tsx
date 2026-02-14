'use client';
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { MessageSquare, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-serif mb-8 tracking-tighter">Get in <span className="text-[#D4AF37] italic underline decoration-white/10">Touch.</span></h1>
        <p className="text-gray-400 max-w-lg mx-auto mb-20 font-light text-lg">Our institutional desk is available 24/7 for verified equity partners.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
           <div className="bg-[#0a0a0a] p-12 rounded-[3rem] border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
              <MessageSquare className="text-[#D4AF37] mb-6 mx-auto group-hover:scale-110 transition-transform" size={48} />
              <h3 className="text-2xl font-serif mb-2 text-white">Secure Chat</h3>
              <p className="text-gray-500 text-sm">Encrypted P2P terminal messaging.</p>
           </div>
           <div className="bg-[#0a0a0a] p-12 rounded-[3rem] border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
              <Phone className="text-[#D4AF37] mb-6 mx-auto group-hover:scale-110 transition-transform" size={48} />
              <h3 className="text-2xl font-serif mb-2 text-white">Priority Line</h3>
              <p className="text-gray-500 text-sm">Direct institutional voice link.</p>
           </div>
        </div>
      </section>

      {/* STACKED BUBBLES: WHATSAPP ON TOP */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-[9999]">
        {/* WhatsApp (Green) */}
        <a 
          href="https://wa.me/YOUR_NUMBER" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 transition-all"
        >
          <Phone size={28} className="text-white fill-white" />
        </a>
        
        {/* Message (Gold) */}
        <button className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:scale-110 active:scale-95 transition-all">
          <MessageSquare size={28} className="text-black" />
        </button>
      </div>

      <Footer />
    </main>
  );
}
