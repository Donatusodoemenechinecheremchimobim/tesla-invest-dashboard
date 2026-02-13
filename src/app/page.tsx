'use client';

import IntroNavbar from '@/components/intro/IntroNavbar';
import SplashScreen from '@/components/intro/SplashScreen';
import MarketTicker from '@/components/landing/MarketTicker'; // 👈 NEW TICKER
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, TrendingUp, ShieldCheck, Activity, Users, Star } from 'lucide-react';
import RocketGraph from '@/components/landing/RocketGraph'; 

export default function VerdeHome() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900 selection:bg-[#059669] selection:text-white">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      <IntroNavbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-green-200/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-100/60 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block py-2 px-4 rounded-full bg-green-50 text-[#059669] text-xs font-bold uppercase tracking-wider mb-6 border border-green-100">
              🌱 Sustainable Wealth Generation
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.1]">
              Growth, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] to-[#34D399]">Simplified.</span>
            </h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-lg">
              Verde Capital leverages advanced AI to identify high-yield opportunities in sustainable markets. 
              Smart, secure, and designed for your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/portal/" className="px-8 py-4 bg-[#059669] text-white font-bold rounded-full shadow-xl shadow-green-200 hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Start Investing <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="px-8 py-4 bg-white text-gray-600 font-bold rounded-full border border-gray-200 hover:border-[#059669] hover:text-[#059669] transition-all flex items-center justify-center">
                How It Works
              </Link>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} 
             animate={{ opacity: 1, scale: 1 }} 
             transition={{ delay: 0.2, duration: 0.8 }}
             className="relative"
          >
             <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[3rem]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-green-100 rounded-2xl text-[#059669]">
                      <TrendingUp size={32} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Annual Return</p>
                      <h3 className="text-3xl font-bold text-gray-900">+24.8%</h3>
                    </div>
                  </div>
                  <RocketGraph />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* NEW TICKER SECTION */}
      <MarketTicker />

      {/* FEATURES GRID */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-bold mb-4">Why Choose Verde?</h2>
             <p className="text-gray-500">We blend technology with sustainability.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Activity, title: "AI-Driven", text: "Our algorithms process millions of data points to predict market trends." },
               { icon: ShieldCheck, title: "Bank-Grade Security", text: "Your assets are protected by top-tier encryption and insurance." },
               { icon: TrendingUp, title: "Consistent Growth", text: "Strategies designed to outperform the market in any condition." }
             ].map((f, i) => (
               <div key={i} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all group">
                 <f.icon className="w-12 h-12 text-gray-400 group-hover:text-[#059669] transition-colors mb-6" />
                 <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                 <p className="text-gray-500 leading-relaxed">{f.text}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* NEW TESTIMONIALS SECTION */}
      <section className="py-24 bg-[#FAFAFA] border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-16">Trusted by 12,000+ Investors</h2>
            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { name: "Sarah L.", role: "Early Adopter", text: "Verde Capital completely changed how I view passive income. The dashboard is beautiful and the returns are real." },
                 { name: "Michael Chen", role: "Entrepreneur", text: "I love the focus on sustainable tech. Making money while supporting green energy is a win-win." },
                 { name: "Jessica R.", role: "Doctor", text: "Secure, fast, and transparent. The support team on WhatsApp is incredibly helpful." }
               ].map((t, i) => (
                 <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-center gap-1 mb-4 text-yellow-400">
                       {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-gray-600 italic mb-6">"{t.text}"</p>
                    <div className="font-bold text-gray-900">{t.name}</div>
                    <div className="text-xs text-[#059669] uppercase font-bold tracking-wider">{t.role}</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

    </main>
  );
}
