'use client';

import { memo } from 'react'; // 1. Import memo to stop re-renders
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

// 2. CREATE A HUGE STATIC LIST (Prevents calculation during scroll)
const tickerItems = [...trades, ...trades, ...trades, ...trades]; 

function TradeTicker() {
  return (
    <div className="w-full bg-[#050505] border-b border-white/5 overflow-hidden py-3 relative z-40 select-none">
      
      {/* GPU LAYER HACK:
         - translateZ(0) & backface-visibility: hidden -> Forces GPU layer
         - perspective: 1000px -> Fixes Safari flickering
         - will-change: transform -> Prepares the browser
      */}
      <div 
        className="flex w-max items-center animate-ticker"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        {tickerItems.map((trade, i) => (
          <div key={i} className="flex items-center gap-6 px-4 shrink-0">
            <span className="font-bold text-xs tracking-wider text-gray-400">
              {trade.pair}
            </span>
            <span className="font-mono text-xs text-white">
              {trade.price}
            </span>
            <div className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${
              trade.up ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
            }`}>
              {trade.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {trade.change}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        /* 3. PURE CSS KEYFRAMES (No JS involved) */
        @keyframes ticker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        
        .animate-ticker {
          /* 4. SLOWER SPEED (40s) = LESS STROBING */
          animation: ticker 40s linear infinite;
        }
        
        /* Pause on hover (Optional, removes if causes stutter) */
        /* .animate-ticker:hover { animation-play-state: paused; } */
      `}</style>
    </div>
  );
}

// 5. MEMOIZE THE COMPONENT
// This stops the Dashboard from re-rendering the ticker when you click other things.
export default memo(TradeTicker);
