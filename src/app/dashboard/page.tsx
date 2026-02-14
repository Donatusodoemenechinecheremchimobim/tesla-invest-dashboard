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
