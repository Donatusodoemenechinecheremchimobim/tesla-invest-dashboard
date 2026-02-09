'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

export default function GrowthChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: history } = await supabase
        .from('transactions')
        .select('created_at, amount, direction')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (history) {
        let runningBalance = 0;
        const chartData = history.map((tx: any) => {
          runningBalance += tx.direction === 'in' ? Number(tx.amount) : -Number(tx.amount);
          return {
            date: format(parseISO(tx.created_at), 'MMM dd'),
            value: runningBalance
          };
        });
        setData(chartData);
      }
    };

    fetchTransactions();
  }, []);

  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center border border-white/5 rounded-3xl bg-white/[0.02]">
        <p className="text-gray-600 text-[10px] uppercase tracking-widest">Awaiting First Deposit to Plot Growth</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
          <XAxis dataKey="date" stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '12px' }}
            itemStyle={{ color: '#D4AF37' }}
          />
          <Area type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={3} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
