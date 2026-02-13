#!/bin/bash

echo "📊 INTEGRATING GRAPH INTERFACE INTO VISION PAGE..."

cat << 'EOF' > src/app/founders/page.tsx
'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, Activity, Globe, Zap, MousePointer2 } from 'lucide-react';

export default function VisionPage() {
  const chartData = [20, 45, 30, 60, 80, 55, 90, 110, 100, 130];

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900 selection:bg-[#059669] selection:text-white font-sans">
      <IntroNavbar />
      
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block py-2 px-4 rounded-full bg-green-50 text-[#059669] text-xs font-bold uppercase tracking-wider mb-6 border border-green-100">
              Institutional Grade
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900 tracking-tight leading-tight">
              Real-Time <br/>
              <span className="text-[#059669]">Intelligence.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-8">
              Experience a vision of wealth management where every data point is actionable. Our interface provides the transparency required for the modern investor.
            </p>
            
            <div className="flex flex-wrap gap-4">
               <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                  <Activity size={16} className="text-[#059669]" /> Live Feed
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                  <Globe size={16} className="text-[#059669]" /> Global Access
               </div>
            </div>
          </motion.div>

          {/* ADVANCED GRAPH INTERFACE VISUAL */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="relative h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#0A0A0A] border-8 border-white p-6 flex flex-col gap-6"
          >
            {/* Interface Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
               <div>
                  <h3 className="text-white font-bold flex items-center gap-2">
                     <Zap size={16} className="text-[#059669] fill-[#059669]" /> 
                     Quantum-V Engine
                  </h3>
                  <p className="text-[10px] text-gray-500 font-mono">ID: VT-992-ALPHA</p>
               </div>
               <div className="bg-green-500/10 text-[#059669] px-3 py-1 rounded-full text-[10px] font-bold border border-[#059669]/20">
                  ACTIVE
               </div>
            </div>

            {/* THE GRAPH AREA */}
            <div className="flex-1 relative flex items-end justify-between px-2 group">
               {/* Vertical Grid Lines */}
               <div className="absolute inset-0 flex justify-between pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-[1px] h-full bg-white/5" />
                  ))}
               </div>

               {/* The Bars/Graph */}
               {chartData.map((h, i) => (
                 <div key={i} className="relative flex-1 flex flex-col items-center group/bar cursor-crosshair">
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, type: 'spring', stiffness: 50 }}
                      className="w-[70%] bg-[#059669] rounded-t-sm relative transition-all duration-300 group-hover/bar:bg-white group-hover/bar:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    >
                       {/* Floating Tooltip on Hover */}
                       <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">
                          +{(h * 0.4).toFixed(1)}%
                       </div>
                    </motion.div>
                 </div>
               ))}

               {/* Floating Overlay Card */}
               <div className="absolute top-10 right-10 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Projected ROI</p>
                  <p className="text-2xl font-bold text-white tracking-tighter">$42,900.00</p>
                  <div className="mt-2 flex items-center gap-2 text-[#059669] text-[10px] font-bold">
                     <TrendingUp size={12} /> +18.4% this quarter
                  </div>
               </div>
            </div>

            {/* Interface Footer Metrics */}
            <div className="grid grid-cols-3 gap-3">
               {[
                 { label: "Stability", val: "94%", color: "text-blue-400" },
                 { label: "Precision", val: "99.9%", color: "text-[#059669]" },
                 { label: "Latency", val: "0.4ms", color: "text-purple-400" }
               ].map((m, i) => (
                 <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-[8px] text-gray-500 font-bold uppercase mb-1">{m.label}</p>
                    <p className={`text-xs font-bold ${m.color}`}>{m.val}</p>
                 </div>
               ))}
            </div>
            
            <div className="absolute bottom-4 right-4 text-white/10 opacity-20 pointer-events-none">
               <MousePointer2 size={120} />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
EOF

echo "✅ VISION PAGE GRAPH INTERFACE DEPLOYED."