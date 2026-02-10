'use client';

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

export default function TradeTicker() {
  return (
    <div className="w-full bg-[#050505] border-b border-white/5 overflow-hidden py-3 relative z-40">
      
      {/* 🚀 MOBILE OPTIMIZATION: 
        1. 'flex-nowrap' prevents wrapping.
        2. We duplicate the list to make the loop seamless.
        3. 'animate-infinite-scroll' handles the GPU movement.
      */}
      <div className="flex w-full select-none overflow-hidden mask-gradient">
        
        {/* INNER TRACK - MOVES LEFT */}
        <div className="flex min-w-full shrink-0 animate-infinite-scroll gap-8 pr-8 items-center will-change-transform">
          {[...trades, ...trades, ...trades].map((trade, i) => ( // Tripled for smoothness on wide screens
            <div key={i} className="flex items-center gap-3 shrink-0">
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

      </div>

      {/* 🎨 CSS INJECTION FOR GPU ANIMATION */}
      <style jsx>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        
        .animate-infinite-scroll {
          animation: scroll 30s linear infinite;
          /* ⚡ FORCE HARDWARE ACCELERATION */
          transform: translate3d(0, 0, 0); 
        }

        @keyframes scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.33%, 0, 0); } /* Move 1/3rd because we tripled the list */
        }
      `}</style>
    </div>
  );
}
