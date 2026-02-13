#!/bin/bash

echo "📊 UPDATING VISION PAGE IMAGE..."

# Update src/app/founders/page.tsx with the new image URL
cat << 'EOF' > src/app/founders/page.tsx
'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Target, Compass, BarChart, ShieldCheck } from 'lucide-react';

export default function VisionPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900 selection:bg-[#059669] selection:text-white">
      <IntroNavbar />
      
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block py-2 px-4 rounded-full bg-green-50 text-[#059669] text-xs font-bold uppercase tracking-wider mb-6 border border-green-100">
              Future Forward
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900 tracking-tight">
              A Vision for <br/>
              <span className="text-[#059669]">Generational Wealth.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-8">
              We envision a world where high-tier financial tools aren't locked behind velvet ropes. 
              Verde Capital is built to bridge the gap between complex algorithms and the individual investor.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
          >
            {/* UPDATED IMAGE: Financial presentation / Stock Charts */}
            <Image 
              src="https://images.unsplash.com/photo-1591696208162-a912e601ef39?auto=format&fit=crop&w=800&q=80" 
              alt="Financial analysis and stock charts" 
              fill 
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { icon: Target, title: "Precision", desc: "Every trade is calculated with 99.9% algorithmic accuracy." },
              { icon: Compass, title: "Ethics", desc: "We prioritize sustainable companies and green energy markets." },
              { icon: BarChart, title: "Growth", desc: "Consistent returns designed for long-term wealth compounding." },
              { icon: ShieldCheck, title: "Safety", desc: "Bank-grade encryption and insured assets for total peace of mind." }
            ].map((v, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#059669]">
                  <v.icon size={28} />
                </div>
                <h3 className="text-lg font-bold mb-3">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
EOF

echo "✅ VISION PAGE UPDATED WITH NEW FINANCIAL VISUALS."