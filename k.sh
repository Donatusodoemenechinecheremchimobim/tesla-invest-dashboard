#!/bin/bash

echo "💎 ACTIVATING 'FILM STRIP' RENDERING (ZERO JITTER)..."

cat << 'EOF' > src/components/dashboard/TradeTicker.tsx
'use client';

import { memo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const trades = [
  { pair: "BTC/USD", price: "48,294.10", change: "+2.4%", up: true },
  { pair: "ETH/USD", price: "2,891.45", change: "+1.8%", up: true },
  { pair: "TSLA", price: "194.20", change: "-0.5%", up: false },
  { pair: "SOL/USD", price: "102.50", change: "+5.1%", up: true },
  { pair: "AAPL", price: "182.40", change: "+0.2%", up: true },
  { pair: "NVDA", price: "721.30", change: "+3.4%", up: true },
  { pair: "XRP/USD", price: "0.54", change: "-1.2%", up: false },
];

const TickerItem = ({ item }: { item: any }) => (
  // INLINE-BLOCK is faster for mobile GPUs than Flexbox
  <div className="inline-flex items-center gap-4 px-6 align-middle">
    <span className="font-bold text-xs tracking-wider text-gray-500">
      {item.pair}
    </span>
    <span className="font-mono text-xs text-white">
      {item.price}
    </span>
    <div className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${
      item.up ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
    }`}>
      {item.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
      {item.change}
    </div>
  </div>
);

function TradeTicker() {
  return (
    <div className="w-full bg-[#050505] border-b border-white/5 py-3 relative z-50 overflow-hidden select-none">
      
      {/* THE "MAGIC" WRAPPER 
         1. whitespace-nowrap: Forces everything into one long line.
         2. will-change-transform: Tells mobile browser to prioritize this layer.
         3. No Flexbox in the parent: Reduces recalculation lag.
      */}
      <div 
        className="whitespace-nowrap w-max animate-infinite-scroll"
        style={{
          transform: 'translate3d(0, 0, 0)', // Force Hardware Acceleration
        }}
      >
        {/* QUADRUPLE CLONE STRATEGY 
           We repeat the list 4 times. This guarantees that even on huge screens 
           or slow scrolls, the user NEVER sees the "jump" or blank space.
        */}
        {trades.map((t, i) => <TickerItem key={`a-${i}`} item={t} />)}
        {trades.map((t, i) => <TickerItem key={`b-${i}`} item={t} />)}
        {trades.map((t, i) => <TickerItem key={`c-${i}`} item={t} />)}
        {trades.map((t, i) => <TickerItem key={`d-${i}`} item={t} />)}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-25%, 0, 0); } /* Move exactly 1/4th (one set) */
        }
        
        .animate-infinite-scroll {
          display: inline-block; /* Crucial for smoothness */
          animation: scroll 45s linear infinite; /* Slower = Smoother perception */
          will-change: transform;
        }
      `}</style>
    </div>
  );
}

// Strictly prevent re-renders
export default memo(TradeTicker);
EOF

echo "✅ TICKER REBUILT WITH 'INLINE-BLOCK' ENGINE."