'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import WhatsAppBubble from '@/components/ui/WhatsAppBubble';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

export default function CorporatePage() {
  return (
    <main className="bg-slate-50 text-slate-900 font-sans selection:bg-[#059669] selection:text-white">
      <IntroNavbar />
      <WhatsAppBubble />
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-[#059669] font-bold uppercase tracking-widest text-sm mb-4 block">Verde Corporate Solutions</span>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 text-[#0f172a] tracking-tight">Liquidity <br/> <span className="text-[#059669]">Engineered.</span></h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed">Optimize your company's treasury with AI-driven cash flow management.</p>
         </motion.div>
      </section>
      <section className="py-20 bg-white">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
            {[{ title: "Treasury Management", desc: "Maximize yield on idle cash." }, { title: "Payroll Solutions", desc: "Seamless integration with major payroll providers." }].map((sol, i) => (
               <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#059669] shrink-0"><Briefcase size={24} /></div>
                  <div><h3 className="text-2xl font-bold mb-3">{sol.title}</h3><p className="text-gray-500">{sol.desc}</p></div>
               </div>
            ))}
         </div>
      </section>
    </main>
  );
}
