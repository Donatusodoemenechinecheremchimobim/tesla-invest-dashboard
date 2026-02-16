'use client';
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { MessageSquare, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-x-hidden w-full selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 max-w-4xl mx-auto text-center">
        {/* Responsive Heading: text-5xl on mobile, scaling up to 8xl on PC */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif mb-6 md:mb-8 tracking-tighter leading-tight break-words">
          Get in <span className="text-[#D4AF37] italic underline decoration-white/10">Touch.</span>
        </h1>
        
        <p className="text-gray-400 max-w-xs md:max-w-lg mx-auto mb-12 md:mb-20 font-light text-base md:text-lg leading-relaxed">
          Our institutional desk is available 24/7 for verified equity partners.
        </p>
        
        {/* CONTACT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10 px-2 md:px-0">
           
           {/* Card 1 */}
           <div className="bg-[#0a0a0a] p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-white/5 hover:border-[#D4AF37]/30 transition-all group flex flex-col items-center">
              <MessageSquare className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform w-10 h-10 md:w-12 md:h-12" />
              <h3 className="text-2xl md:text-3xl font-serif mb-2 text-white">Secure Chat</h3>
              <p className="text-gray-500 text-xs md:text-sm">Encrypted P2P terminal messaging.</p>
           </div>
           
           {/* Card 2 */}
           <div className="bg-[#0a0a0a] p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-white/5 hover:border-[#D4AF37]/30 transition-all group flex flex-col items-center">
              <Phone className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform w-10 h-10 md:w-12 md:h-12" />
              <h3 className="text-2xl md:text-3xl font-serif mb-2 text-white">Priority Line</h3>
              <p className="text-gray-500 text-xs md:text-sm">Direct institutional voice link.</p>
           </div>

        </div>
      </section>

      {/* FLOATING ACTION BUTTON - SINGLE WHATSAPP BUBBLE */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999]">
        <a 
          href="https://wa.me/YOUR_NUMBER" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 transition-all"
        >
          <Phone className="text-white fill-white w-6 h-6 md:w-7 md:h-7" />
        </a>
      </div>

      <Footer />
    </main>
  );
}
