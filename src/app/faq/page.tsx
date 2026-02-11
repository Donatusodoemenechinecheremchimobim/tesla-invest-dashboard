'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: "How is my capital insured?", a: "We utilize Tesla's $20B internal insurance fund. If a trading algorithm fails or incurs a loss greater than 0.5%, the fund instantly reimburses the difference to your account." },
  { q: "What is the minimum deposit?", a: "The Silver Tier starts at $500. This low entry barrier allows us to gather more data for our AI models." },
  { q: "Can I withdraw anytime?", a: "Yes. Our smart contracts allow for instant liquidity. Gold and Diamond members enjoy priority processing (under 10 minutes)." },
  { q: "Is this tax-free?", a: "We operate out of special economic zones. However, you are responsible for reporting earnings in your local jurisdiction. We provide anonymous crypto payouts to protect privacy." },
  { q: "How accurate is the AI?", a: "The Dojo V4 model currently holds a 98.4% win rate on intraday swing trades." }
];

export default function FAQPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <IntroNavbar />
      
      <div className="pt-40 pb-20 px-6 max-w-3xl mx-auto">
        <h1 className="text-5xl font-serif text-center mb-16">Intelligence Center</h1>
        
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setActive(active === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-serif">{item.q}</span>
                {active === i ? <Minus size={20} className="text-[#D4AF37]" /> : <Plus size={20} className="text-gray-500" />}
              </button>
              <AnimatePresence>
                {active === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
