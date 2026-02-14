#!/bin/bash

echo "📞 REMOVING EMAIL FROM CONTACT DISPLAY & FINALIZING LAYOUT..."

cat << 'EOF' > src/app/contact/page.tsx
'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import IntroFooter from '@/components/intro/IntroFooter';
import WhatsAppBubble from '@/components/ui/WhatsAppBubble';
import { motion } from 'framer-motion';
import { MapPin, Phone, Globe, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="bg-[#050505] text-[#E5E5E5] min-h-screen selection:bg-[#D4AF37] selection:text-black">
      <IntroNavbar />
      <WhatsAppBubble />
      
      <section className="pt-40 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 pb-32">
         <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">24/7 Global Support</span>
            <h1 className="text-6xl font-serif font-bold mb-8 text-white">Let's talk <br/> <span className="text-[#D4AF37]">Business.</span></h1>
            <p className="text-xl text-gray-400 mb-12 font-light">
               Our dedicated concierge team is available around the clock. Connect with us via the terminal or visit our global headquarters.
            </p>
            
            <div className="space-y-8">
               {[
                  { icon: Phone, title: "Direct Line", val: "+1 (800) VERDE-VIP" },
                  { icon: Globe, title: "Global HQ", val: "Charlotte, NC • USA" }
               ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-8 border border-[#333] hover:border-[#D4AF37] transition-colors rounded-[2rem] bg-[#111]">
                     <div className="w-12 h-12 bg-[#D4AF37] flex items-center justify-center text-black rounded-full"><item.icon size={24} /></div>
                     <div><p className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-1">{item.title}</p><p className="text-2xl font-serif font-bold text-white">{item.val}</p></div>
                  </div>
               ))}
               
               {/* Explicit WhatsApp Mention Card */}
               <div className="flex items-center gap-6 p-8 border border-[#333] hover:border-[#25D366] transition-colors rounded-[2rem] bg-[#111] group">
                  <div className="w-12 h-12 bg-[#25D366] flex items-center justify-center text-white rounded-full"><MessageCircle size={24} /></div>
                  <div>
                     <p className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-1">Live Chat</p>
                     <p className="text-xl font-serif font-bold text-white group-hover:text-[#25D366] transition-colors">Available via WhatsApp</p>
                  </div>
               </div>
            </div>
         </motion.div>

         <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-[#111] border border-[#333] p-12 shadow-2xl rounded-[3rem]">
            <h3 className="text-3xl font-serif font-bold mb-8 text-white">Secure Message Center</h3>
            <form className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <input type="text" placeholder="First Name" className="bg-black border border-[#333] p-5 rounded-xl w-full focus:border-[#D4AF37] outline-none text-white transition-colors" />
                  <input type="text" placeholder="Last Name" className="bg-black border border-[#333] p-5 rounded-xl w-full focus:border-[#D4AF37] outline-none text-white transition-colors" />
               </div>
               
               {/* No Email Input here as requested previously */}
               
               <select className="bg-black border border-[#333] p-5 rounded-xl w-full focus:border-[#D4AF37] outline-none text-gray-400 transition-colors">
                  <option>Select Department</option>
                  <option>Private Banking</option>
                  <option>Corporate Treasury</option>
                  <option>Technical Support</option>
               </select>
               <textarea rows={6} placeholder="How can we assist you?" className="bg-black border border-[#333] p-5 rounded-xl w-full focus:border-[#D4AF37] outline-none text-white transition-colors"></textarea>
               <button className="w-full bg-[#D4AF37] text-black hover:bg-white py-5 font-bold text-sm uppercase tracking-widest transition-colors rounded-xl">Submit Request</button>
            </form>
         </motion.div>
      </section>

      <IntroFooter />
    </main>
  );
}
EOF

echo "✅ CONTACT PAGE UPDATED: EMAIL REMOVED, WHATSAPP CARD ADDED."