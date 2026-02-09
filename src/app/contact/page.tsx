'use client';
import Navbar from '@/components/landing/Navbar';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white">
      <Navbar />
      <div className="aurora-bg" />
      
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        
        {/* Left Info */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-5xl font-bold mb-8">CONCIERGE <span className="text-cyan-400">SUPPORT</span></h1>
          <p className="text-gray-400 text-lg mb-12">
            Our private banking team is available 24/7. Average response time is under 45 seconds for Black Tier members.
          </p>

          <div className="space-y-8">
            {[
              { icon: Phone, label: "Private Line", val: "+1 (888) 420-6969" },
              { icon: Mail, label: "Secure Uplink", val: "concierge@teslaquantum.com" },
              { icon: MapPin, label: "Headquarters", val: "Gigafactory Texas, Austin, USA" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 p-6 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition">
                <item.icon className="text-cyan-400" size={24} />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">{item.label}</p>
                  <p className="text-xl font-bold">{item.val}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="relative">
           <form className="p-8 border border-white/10 rounded-3xl bg-black/40 backdrop-blur-xl space-y-6">
             <h3 className="text-2xl font-bold mb-6">Initialize Uplink</h3>
             <input type="text" placeholder="Identity Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-cyan-400 transition" />
             <input type="email" placeholder="Secure Email" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-cyan-400 transition" />
             <textarea placeholder="Message Protocol" rows={4} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-cyan-400 transition" />
             <button className="w-full py-4 bg-cyan-400 text-black font-bold rounded-xl hover:bg-white transition-colors">TRANSMIT</button>
           </form>
        </motion.div>

      </section>
    </main>
  );
}
