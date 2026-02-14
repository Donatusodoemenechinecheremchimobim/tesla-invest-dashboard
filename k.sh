#!/bin/bash

# 1. FIXING THE INVESTMENTTESLA (PORTAL) NAVBAR & MOBILE RESPONSIVENESS
cat << 'EOF' > src/components/portal/PortalNavbar.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, UserPlus, Menu, X, Activity, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortalNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isDashboard = pathname.includes('/dashboard');

  return (
    <nav className="fixed w-full z-[100] bg-black/90 backdrop-blur-xl border-b border-[#D4AF37]/10 py-4 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/portal" className="text-lg md:text-2xl font-serif font-bold text-white shrink-0">
          INVESTMENT<span className="text-[#D4AF37] italic font-light">TESLA</span>
        </Link>
        
        {/* CENTER LINKS (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
          {['Personal', 'Founders', 'Insurance'].map((item) => (
            <Link key={item} href={`/portal/${item.toLowerCase()}`} className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400 hover:text-[#D4AF37]">
              {item}
            </Link>
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          {!isDashboard ? (
            <Link href="/dashboard" className="px-5 py-2 bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg transition-transform active:scale-95">
              Access
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[#D4AF37]/20 rounded-full bg-[#D4AF37]/5">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
                <span className="text-[9px] font-bold uppercase text-[#D4AF37]">Live</span>
              </div>
              <Link href="/portal" className="p-2 bg-white/5 rounded-full text-white">
                <LogOut size={16} />
              </Link>
            </div>
          )}
          <button className="lg:hidden text-[#D4AF37]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-black border-t border-white/5 overflow-hidden">
            <div className="flex flex-col p-6 gap-6">
              {['Personal', 'Founders', 'Insurance'].map((item) => (
                <Link key={item} href={`/portal/${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-sm uppercase tracking-widest text-white">{item}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
EOF

# 2. FIXING THE DASHBOARD MOBILE LAYOUT & GRAPH SCALE
cat << 'EOF' > src/app/dashboard/page.tsx
'use client';
import React from 'react';
import PortalNavbar from '@/components/portal/PortalNavbar';
import GrowthChart from '@/components/dashboard/GrowthChart';
import { TrendingUp, Wallet, ShieldCheck, Zap } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <PortalNavbar />
      
      <div className="pt-24 pb-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* HEADER STATS - Auto Stack on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Balance", val: "$42,500.00", icon: <Wallet className="text-[#D4AF37]"/> },
            { label: "Active Yield", val: "+$1,240.18", icon: <TrendingUp className="text-green-500"/> },
            { label: "Tier Status", val: "Gold Elite", icon: <ShieldCheck className="text-[#D4AF37]"/> },
            { label: "Uptime", val: "99.98%", icon: <Zap className="text-blue-400"/> }
          ].map((stat, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{stat.label}</span>
                {stat.icon}
              </div>
              <p className="text-2xl font-serif">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* GRAPH CONTAINER - Fixed Cutting Off */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-4 md:p-8 mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-serif">Market Analysis</h2>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Real-time Node Performance</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold rounded-full">LIVE FEED</span>
            </div>
          </div>
          
          {/* Chart Wrapper to ensure no overflow */}
          <div className="w-full h-[300px] md:h-[450px] relative">
            <GrowthChart />
          </div>
        </div>
      </div>
    </main>
  );
}
EOF