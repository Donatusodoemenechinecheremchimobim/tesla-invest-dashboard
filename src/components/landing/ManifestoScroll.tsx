'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

const manifestoPoints = [
  {
    highlight: "Civilization is fragile.",
    text: "The window of opportunity to become a multi-planetary species will not remain open forever. To secure the light of consciousness, we must build a self-sustaining city on Mars."
  },
  {
    highlight: "Traditional financing is broken.",
    text: "Wall Street banks, venture capital, and government grants are too slow, too risk-averse, and too short-sighted for the scale of interstellar ambition."
  },
  {
    highlight: "A perpetual capital engine.",
    text: "TeslaInvest was built to solve this. By redirecting idle Dojo Supercomputer processing power, we predict market volatility with unprecedented accuracy."
  },
  {
    highlight: "The dual mandate.",
    text: "Every dollar of profit generated serves two purposes: 1. Expanding your personal wealth. 2. Funding the Starship fleet to take humanity to the stars."
  }
];

function TextBlock({ item, index }: { item: any, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.6 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={{ 
        opacity: isInView ? 1 : 0.3, 
        x: isInView ? 0 : (index % 2 === 0 ? -20 : 20),
        scale: isInView ? 1 : 0.95
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative p-8 md:p-12 rounded-3xl border ${isInView ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/5 bg-[#111]'} transition-colors duration-700`}
    >
      <Quote className={`absolute top-6 left-6 ${isInView ? 'text-[#D4AF37]' : 'text-gray-700'} transition-colors duration-700`} size={40} />
      <div className="relative z-10 ml-10">
        <h3 className={`text-2xl md:text-3xl font-serif mb-4 ${isInView ? 'text-white' : 'text-gray-400'} transition-colors duration-700`}>
          {item.highlight}
        </h3>
        <p className={`text-lg leading-relaxed ${isInView ? 'text-gray-200' : 'text-gray-600'} transition-colors duration-700`}>
          {item.text}
        </p>
      </div>
    </motion.div>
  );
}

export default function ManifestoScroll() {
  return (
    <div className="space-y-24 py-20">
      {manifestoPoints.map((item, index) => (
        <TextBlock key={index} item={item} index={index} />
      ))}
    </div>
  );
}
