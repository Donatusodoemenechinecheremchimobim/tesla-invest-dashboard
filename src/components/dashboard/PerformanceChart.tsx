'use client';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', value: 45000 },
  { name: 'Tue', value: 47000 },
  { name: 'Wed', value: 46500 },
  { name: 'Thu', value: 52000 },
  { name: 'Fri', value: 51000 },
  { name: 'Sat', value: 58000 },
  { name: 'Sun', value: 62500 },
];

export default function PerformanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#555" tick={{fill: '#666', fontSize: 10}} axisLine={false} tickLine={false} />
          <YAxis stroke="#555" tick={{fill: '#666', fontSize: 10}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
            itemStyle={{ color: '#D4AF37' }}
          />
          <Area type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
