'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import { motion } from 'framer-motion';
import { Target, Compass, BarChart, ShieldCheck, TrendingUp, ArrowUpRight, PieChart } from 'lucide-react';

export default function VisionPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900 selection:bg-[#059669] selection:text-white font-sans">
      <IntroNavbar />
      
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block py-2 px-4 rounded-full bg-green-50 text-[#059669] text-xs font-bold uppercase tracking-wider mb-6 border border-green-100">
              Future Forward
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900 tracking-tight leading-tight">
              A Vision for <br/>
              <span className="text-[#059669]">Digital Assets.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-8">
              We leverage proprietary algorithms to navigate market volatility, ensuring your capital isn't just stored, but strategically grown.
            </p>
          </motion.div>

          {/* DYNAMIC DASHBOARD VISUAL (Pure CSS/Tailwind) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="relative h-[550px] rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-white border-8 border-white ring-1 ring-gray-100 p-8 flex flex-col gap-6"
          >
            {/* Header section of the "App" */}
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#059669] rounded-xl flex items-center justify-center text-white">
                     <TrendingUp size={20} />
                  </div>
                  <div>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Global Index</p>
                     <p className="text-sm font-bold text-gray-900">Market Live</p>
                  </div>
               </div>
               <div className="text-right">
                  <p className="text-[#059669] font-bold text-lg">+12.4%</p>
                  <p className="text-[10px] text-gray-400">YTD Growth</p>
               </div>
            </div>

            {/* Main Growth Graph Area */}
            <div className="flex-1 bg-gradient-to-b from-green-50/50 to-transparent rounded-2xl p-6 relative">
               <div className="flex justify-between items-end h-full gap-3">
                  {[40, 65, 50, 85, 70, 95, 110].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                       <motion.div 
                         initial={{ height: 0 }} 
                         animate={{ height: `${h}%` }}
                         transition={{ delay: i * 0.1, duration: 0.8 }}
                         className="w-full bg-[#059669] rounded-t-lg opacity-80 hover:opacity-100 transition-opacity relative group"
                       >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                             ${(h * 1.2).toFixed(1)}k
                          </div>
                       </motion.div>
                       <span className="text-[8px] text-gray-400 font-bold">M{i+1}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Bottom Metrics */}
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 border border-gray-100 rounded-2xl">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Risk Level</p>
                  <div className="flex items-center gap-2">
                     <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-blue-500" />
                     </div>
                     <span className="text-xs font-bold text-gray-700">Low</span>
                  </div>
               </div>
               <div className="p-4 border border-gray-100 rounded-2xl bg-gray-900 text-white">
                  <p className="text-[10px] text-white/40 font-bold uppercase mb-1">Total Assets</p>
                  <p className="text-sm font-bold">$1.24M</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
