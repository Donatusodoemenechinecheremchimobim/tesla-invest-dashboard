'use client';
import { motion } from 'framer-motion';

export default function Concierge() {
  return (
    <section id="concierge" className="py-32 bg-[#080808] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Concierge <span className="text-gold">Prime.</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            We do not use bots. We do not use call centers. 
            Investment Tesla clients are assigned a dedicated 
            <span className="text-white"> Wealth Officer </span> 
            available 24/7 via encrypted uplink.
          </p>
          
          <div className="p-8 border border-white/10 rounded-none bg-white/[0.02] flex items-center gap-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold">
               <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-white font-bold uppercase tracking-widest text-sm">Sarah Jenkins</p>
              <p className="text-gold text-xs uppercase tracking-widest">Senior Wealth Director</p>
              <p className="text-gray-500 text-xs mt-1">Status: <span className="text-green-500">Online</span></p>
            </div>
          </div>
        </motion.div>

        <div className="relative h-[600px] border border-white/10 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition duration-1000"
          />
          <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
            <p className="text-white text-xl font-serif">Global Command Center</p>
            <p className="text-gray-500 text-xs uppercase tracking-widest">Zurich • London • Austin</p>
          </div>
        </div>

      </div>
    </section>
  );
}
