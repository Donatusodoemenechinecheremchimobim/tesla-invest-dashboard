#!/bin/bash

echo "🚀 INFLATING GROWTH CHART TO FUTURE ESTIMATES..."

cat << 'EOF' > src/components/dashboard/GrowthChart.tsx
'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 🔮 FUTURE GROWTH DATA (INFLATED OPTIMISTIC MODEL)
// Starts realistic, then accelerates into a "Hockey Stick" curve.
const data = [
  { year: '2025', price: 210, label: 'Current' },
  { year: '2026', price: 450, label: 'Robotaxi Launch' },
  { year: '2027', price: 980, label: 'Optimus Scale' },
  { year: '2028', price: 1650, label: 'Energy Dominance' },
  { year: '2029', price: 2400, label: 'Global FSD' },
  { year: '2030', price: 3450, label: 'Market Leader' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0a0a] border border-[#D4AF37] p-4 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.2)]">
        <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">{label}</p>
        <p className="text-[#D4AF37] text-xl font-bold font-serif">
          ${payload[0].value.toLocaleString()}
        </p>
        <p className="text-white text-[9px] mt-1 italic">
          {data.find(d => d.year === label)?.label}
        </p>
      </div>
    );
  }
  return null;
};

export default function GrowthChart() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="year" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#666', fontSize: 10 }} 
            dy={10}
          />
          <YAxis 
            hide={true} 
            domain={['dataMin - 100', 'dataMax + 500']} // Adds headroom for the curve
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#D4AF37', strokeWidth: 1, strokeDasharray: '5 5' }} />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#D4AF37" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorPrice)" 
            animationDuration={2000} // Slower animation for "Grand Reveal" effect
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
EOF

echo "✅ CHART UPDATED: DISPLAYING MASSIVE FUTURE GROWTH."