'use client';
import { motion } from 'framer-motion';

const TICKERS = [
  { sym: "TSLA", price: "248.50", change: "+4.2%" },
  { sym: "BTC", price: "64,200", change: "+1.8%" },
  { sym: "XAU", price: "2,045", change: "+0.5%" },
  { sym: "NVDA", price: "890.12", change: "+3.1%" },
  { sym: "AAPL", price: "178.30", change: "-0.2%" },
  { sym: "ETH", price: "3,450", change: "+2.4%" },
];

export default function MarketTicker() {
  return (
    <div className="w-full bg-[#050505] border-b border-white/5 overflow-hidden py-3 flex relative z-40">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
      
      <motion.div 
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...TICKERS, ...TICKERS, ...TICKERS].map((t, i) => (
          <div key={i} className="flex items-center gap-2 text-sm font-mono">
            <span className="font-bold text-white">{t.sym}</span>
            <span className={t.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
              {t.price} ({t.change})
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
