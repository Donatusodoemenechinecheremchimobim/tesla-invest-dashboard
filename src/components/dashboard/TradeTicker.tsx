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
  <div className="flex items-center gap-4 px-6 shrink-0">
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
      
      {/* THE DUAL-WIELD CONTAINER */}
      <div className="flex w-full overflow-hidden mask-gradient">
        
        {/* LIST 1: Moves from 0% to -100% */}
        <div className="flex animate-marquee min-w-full shrink-0 items-center justify-around">
           {trades.map((t, i) => <TickerItem key={`a-${i}`} item={t} />)}
        </div>

        {/* LIST 2: Moves from 0% to -100% (Follows perfectly) */}
        <div className="flex animate-marquee min-w-full shrink-0 items-center justify-around">
           {trades.map((t, i) => <TickerItem key={`b-${i}`} item={t} />)}
        </div>

      </div>

      <style jsx>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }

        .animate-marquee {
          /* 60s is extremely slow & smooth. Linear makes it constant. */
          animation: marquee 60s linear infinite;
          will-change: transform; /* Tells the mobile GPU to take over */
        }
      `}</style>
    </div>
  );
}

// Stop re-renders
export default memo(TradeTicker);
