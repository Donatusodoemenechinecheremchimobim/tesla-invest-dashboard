'use client';
import { useState, useEffect } from 'react';
import { Cpu, Wifi } from 'lucide-react';

export default function TradingEngine() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const actions = [
      "Analyzing TSLA vol... High",
      "Scanning Elon Musk X feed... Sentiment: Bullish",
      "Executing Arbitrage: Buy @ $248.50",
      "Checking Starlink latency... 24ms",
      "Optimus production rate... +5%",
      "Rebalancing portfolio... Done",
      "Hedge active: Gold Futures"
    ];

    const interval = setInterval(() => {
      const action = actions[Math.floor(Math.random() * actions.length)];
      const time = new Date().toLocaleTimeString();
      setLogs(prev => [`[${time}] ${action}`, ...prev.slice(0, 5)]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 rounded-3xl bg-[#050505] border border-white/10 font-mono text-xs h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse" />
      
      <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
        <div className="flex items-center gap-2 text-green-500">
          <Cpu size={14} className="animate-pulse" />
          <span className="uppercase tracking-widest font-bold">Tesla Quantum Core</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Wifi size={12} />
          <span>Connected</span>
        </div>
      </div>

      <div className="space-y-2 relative z-10">
        {logs.map((log, i) => (
          <div key={i} className={`truncate ${i === 0 ? 'text-white font-bold' : 'text-gray-600'}`}>
            <span className="text-green-500 mr-2">{'>'}</span>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
