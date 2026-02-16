'use client';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { month: 'Jan', value: 200 },
  { month: 'Feb', value: 350 },
  { month: 'Mar', value: 500 },
  { month: 'Apr', value: 650 },
  { month: 'May', value: 800 },
  { month: 'Jun', value: 950 },
  { month: 'Jul', value: 1100 },
  { month: 'Aug', value: 1250 },
  { month: 'Sep', value: 1350 },
  { month: 'Oct', value: 1400 }, // Matches the image reference ($1400B)
];

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#D4AF37] p-3 rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-white/20">
        <p className="text-black text-[10px] font-bold uppercase tracking-widest mb-1">{label} Performance</p>
        <p className="text-black text-lg font-serif font-bold">
          ${payload[0].value} Billion
        </p>
      </div>
    );
  }
  return null;
};

export default function GrowthChart() {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }} 
            dy={10}
            interval={1} // Show fewer labels on mobile if needed
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }}
            tickFormatter={(value) => `$${value}B`}
            domain={[0, 1600]} // Adjusted domain to fit 1400 comfortably
            dx={-5}
          />
          
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#D4AF37', strokeWidth: 1, strokeDasharray: '4 4' }} />
          
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#D4AF37" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorGold)" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
