'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Typewriter from 'typewriter-effect';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-30 text-center max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_10px_#D4AF37]" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase">The Next Trillion Dollar Wave</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-[0.95]">
            Don't Just Watch. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F9E29C] to-[#B38728] drop-shadow-2xl">
              OWN THE FUTURE.
            </span>
          </h1>

          <div className="h-24 md:h-20 text-lg md:text-2xl text-gray-300 font-light mb-10 max-w-3xl mx-auto leading-relaxed">
            <Typewriter
              options={{
                strings: [
                  'Tesla is not a car company. It is an AI Superpower.',
                  'Optimus Robots will be a $25 Trillion industry.',
                  'Robotaxis will print money while you sleep.',
                  'This is your chance to build Generational Wealth.',
                ],
                autoStart: true,
                loop: true,
                delay: 35,
                deleteSpeed: 15,
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
            <Link href="/portal/auth" className="group relative px-10 py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_50px_rgba(212,175,55,0.4)] rounded-sm">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Your Portfolio <ChevronRight size={16} />
              </span>
            </Link>
            
            <Link href="#why-tesla" className="px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition duration-500 rounded-sm">
              Read The Thesis
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
