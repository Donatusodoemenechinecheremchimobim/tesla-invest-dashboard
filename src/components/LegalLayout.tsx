'use client';
import React from 'react';

// 1. REVERTED TO UPPERCASE: matches your other working pages
import Navbar from '@/components/landing/Navbar'; 
import Footer from '@/components/landing/Footer'; 

// Optional: Remove if this file doesn't exist
import WhatsAppBubble from '@/components/ui/WhatsAppBubble';

export default function LegalLayout({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <main className="bg-[#050505] text-[#E5E5E5] font-sans min-h-screen selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* Remove this line if WhatsAppBubble doesn't exist */}
      <WhatsAppBubble />
      
      <div className="pt-40 pb-32 px-6 max-w-5xl mx-auto">
        <div className="bg-[#111] border border-[#333] rounded-[4rem] p-12 md:p-20 shadow-2xl">
           <h1 className="text-5xl md:text-6xl font-serif font-bold mb-12 text-[#D4AF37] border-b border-[#333] pb-8">{title}</h1>
           <div className="prose prose-invert prose-lg prose-p:text-gray-400 prose-headings:text-white prose-a:text-[#D4AF37] prose-li:text-gray-400 max-w-none">
             {children}
           </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
