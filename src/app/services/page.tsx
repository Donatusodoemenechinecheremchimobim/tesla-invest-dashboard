'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import WhatsAppBubble from '@/components/ui/WhatsAppBubble';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bitcoin, Home, LineChart, Landmark, Wallet } from 'lucide-react';

const ServiceCard = ({ title, icon: Icon, desc, color }: any) => (
  <motion.div whileHover={{ y: -10 }} className={`p-10 rounded-[2.5rem] ${color} h-[400px] flex flex-col justify-between relative overflow-hidden group`}>
    <div className="relative z-10 text-white">
      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6"><Icon size={32} /></div>
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      <p className="text-white/80 text-lg leading-relaxed">{desc}</p>
    </div>
    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-[80px] group-hover:bg-white/20 transition-all" />
  </motion.div>
);

export default function ServicesPage() {
  return (
    <main className="bg-[#020617] text-white min-h-screen selection:bg-[#059669] selection:text-white">
      <IntroNavbar />
      <WhatsAppBubble />
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
         <h1 className="text-6xl md:text-8xl font-bold mb-20 text-center">Full Stack <br/> <span className="text-[#059669]">Finance.</span></h1>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard title="Crypto Assets" icon={Bitcoin} desc="Institutional-grade custody." color="bg-[#f59e0b]" />
            <ServiceCard title="Real Estate" icon={Home} desc="Fractionalized ownership." color="bg-[#059669]" />
            <ServiceCard title="Equities" icon={LineChart} desc="Direct market access." color="bg-[#3b82f6]" />
            <ServiceCard title="Offshore Banking" icon={Landmark} desc="Multi-currency accounts." color="bg-[#6366f1]" />
            <ServiceCard title="Private Credit" icon={Wallet} desc="High-yield fixed income." color="bg-[#ec4899]" />
            <div className="p-10 rounded-[2.5rem] bg-[#1e293b] flex flex-col items-center justify-center text-center h-[400px] border border-white/10">
               <h3 className="text-3xl font-bold mb-6">Ready to start?</h3>
               <Link href="/portal/auth" className="px-10 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">Open Account</Link>
            </div>
         </div>
      </section>
    </main>
  );
}
