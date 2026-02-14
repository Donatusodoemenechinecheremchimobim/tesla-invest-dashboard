'use client';
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { Mail, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  // Config
  const phoneNumber = "19803487946";
  const message = encodeURIComponent("Hello VerdeStock, I am interested in inquiring about institutional access and private wealth management services.");
  
  // FIXED: Removed invalid backslashes
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <main className="bg-[#050505] text-white overflow-hidden relative">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] flex items-center px-6 max-w-[1400px] mx-auto">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] to-transparent"></div>
        
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="relative z-10">
           <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-6">24/7 Global Support</p>
           <h1 className="text-7xl md:text-9xl font-serif">Let's Talk <br /> Business.</h1>
        </motion.div>
      </section>

      {/* --- CONTACT DETAILS & FORM --- */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto grid md:grid-cols-2 gap-20">
        <div className="space-y-12">
           <p className="text-gray-400 text-lg leading-relaxed">Our dedicated concierge team is available around the clock. Connect with us via the terminal or visit our global headquarters.</p>
           
           <div className="flex items-start gap-8">
              <MapPin className="text-[#D4AF37] mt-1 w-8 h-8" />
              <div>
                 <h4 className="font-serif text-2xl mb-2">Global HQ</h4>
                 <p className="text-gray-500 text-sm">214 North Tryon St<br/>Charlotte, NC • USA</p>
              </div>
           </div>
           
           <div className="flex items-start gap-8">
              <MessageCircle className="text-[#D4AF37] mt-1 w-8 h-8" />
              <div>
                 <h4 className="font-serif text-2xl mb-2">Live Chat</h4>
                 <a 
                   href={whatsappUrl} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-gray-500 text-sm hover:text-[#D4AF37] cursor-pointer underline transition-colors"
                 >
                   Click to Chat on WhatsApp
                 </a>
              </div>
           </div>
        </div>
        
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="bg-[#111] p-12 rounded-[3rem] border border-white/5">
           <h3 className="text-3xl font-serif mb-10">Secure Message Center</h3>
           <form className="space-y-6">
             <div className="grid grid-cols-2 gap-6">
               <input type="text" placeholder="First Name" className="bg-black border border-white/10 rounded-xl p-5 text-sm focus:border-[#D4AF37] outline-none transition-colors" />
               <input type="text" placeholder="Last Name" className="bg-black border border-white/10 rounded-xl p-5 text-sm focus:border-[#D4AF37] outline-none transition-colors" />
             </div>
             <select className="w-full bg-black border border-white/10 rounded-xl p-5 text-sm text-gray-400 focus:border-[#D4AF37] outline-none transition-colors">
               <option>Select Department</option>
               <option>Private Wealth</option>
               <option>Corporate Treasury</option>
             </select>
             <textarea placeholder="How can we assist you?" rows={4} className="w-full bg-black border border-white/10 rounded-xl p-5 text-sm focus:border-[#D4AF37] outline-none transition-colors"></textarea>
             <button className="w-full py-6 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-colors">Submit Request</button>
           </form>
        </motion.div>
      </section>

      {/* --- FLOATING WHATSAPP BUBBLE --- */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-10 right-10 z-[100] bg-[#25D366] w-16 h-16 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.4)] flex items-center justify-center cursor-pointer border-2 border-white/10"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>

      <Footer />
    </main>
  );
}
