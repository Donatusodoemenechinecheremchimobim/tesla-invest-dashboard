'use client';
import { motion } from 'framer-motion';
import { Globe, Shield, Headset } from 'lucide-react';

export default function Concierge() {
  const items = [
    { icon: Globe, title: "Global Access", desc: "Private terminal access in 140+ countries." },
    { icon: Shield, title: "Vault Storage", desc: "Physical and digital cold storage for TSLA keys." },
    { icon: Headset, title: "Black Concierge", desc: "24/7 dedicated wealth manager for elite members." }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-serif mb-16 text-white">Elite <span className="text-[#D4AF37]">Services.</span></h2>
        
        {/* Responsive Grid that scrolls horizontally on small screens */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="min-w-[75vw] md:min-w-0 snap-center p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6 border border-[#D4AF37]/20">
                <item.icon className="text-[#D4AF37]" size={28} />
              </div>
              <h4 className="text-white font-serif text-xl mb-3">{item.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
