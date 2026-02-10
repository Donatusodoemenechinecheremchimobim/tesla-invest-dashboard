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
  <div className="flex items-center gap-6 px-4 shrink-0">
    <span className="font-bold text-xs tracking-wider text-gray-400">
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
    <div className="w-full bg-[#050505] border-b border-white/5 overflow-hidden py-3 relative z-40 select-none">
      
      {/* MOBILE OPTIMIZATION: TWIN TRACKS
        Instead of moving one long list, we move a wrapper containing TWO identical lists.
        We move exactly -50% (the width of one list).
        At the end, it snaps back to 0 instantly (invisible to the eye).
      */}
      <div 
        className="flex w-max items-center animate-scroll"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)', // Force GPU
          backfaceVisibility: 'hidden', // Fix iOS flicker
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        {/* TRACK 1 */}
        <div className="flex shrink-0">
          {trades.map((trade, i) => <TickerItem key={`a-${i}`} item={trade} />)}
        </div>

        {/* TRACK 2 (The Clone) */}
        <div className="flex shrink-0">
          {trades.map((trade, i) => <TickerItem key={`b-${i}`} item={trade} />)}
        </div>
      </div>

      <style jsx>{`
        /* PURE CSS ANIMATION (Runs off-main-thread) */
        @keyframes scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); } /* Move exactly half */
        }
        
        .animate-scroll {
          /* 30s is the sweet spot. Linear is critical for no "jumps" */
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default memo(TradeTicker);
