'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TrustSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Left: Text & Payment */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6">GLOBAL <span className="text-purple-500">LIQUIDITY</span></h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Instant withdrawals to over 180 countries. Our exclusive Quantum Metal™ card allows you to spend your stock portfolio as liquid cash anywhere Visa is accepted.
          </p>
          
          <div className="relative h-64 w-full max-w-md bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 p-6 shadow-2xl overflow-hidden group hover:scale-105 transition-transform duration-500">
            {/* Fake Card Visual */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=800&auto=format&fit=crop')] bg-cover opacity-50 mix-blend-overlay" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <span className="text-2xl font-bold tracking-widest text-white">TESLA<span className="text-cyan-400">BLACK</span></span>
                <span className="text-white/50 text-sm">WORLD ELITE</span>
              </div>
              <div>
                <p className="text-gray-400 font-mono mb-2">**** **** **** 4291</p>
                <div className="flex justify-between items-end">
                  <span className="text-white uppercase tracking-widest text-xs">Alexander Pierce</span>
                  <div className="w-10 h-6 bg-white/20 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Customer Service Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          className="relative"
        >
           <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-2xl opacity-20" />
           <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/3]">
             {/* Using a high-quality Unsplash image for support/tech */}
             <img 
               src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop" 
               alt="Premium Support" 
               className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
             />
             <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-xl">24</div>
                 <div>
                   <p className="font-bold text-white">Concierge Support</p>
                   <p className="text-xs text-gray-400">Response time: 0.8 seconds</p>
                 </div>
               </div>
             </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
