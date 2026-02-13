'use client';
import { motion } from 'framer-motion';

const tickers = [
  { symbol: "BTC", price: "+4.2%", up: true },
  { symbol: "ETH", price: "+2.8%", up: true },
  { symbol: "VDE", price: "+12.4%", up: true }, // Verde Token
  { symbol: "SPX", price: "+0.8%", up: true },
  { symbol: "NDX", price: "+1.2%", up: true },
  { symbol: "GLD", price: "-0.4%", up: false },
  { symbol: "TSLA", price: "+1.5%", up: true },
  { symbol: "AAPL", price: "+0.9%", up: true },
];

export default function MarketTicker() {
  return (
    <div className="w-full bg-white border-y border-gray-100 overflow-hidden py-3">
      <motion.div 
        className="flex whitespace-nowrap gap-12"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...tickers, ...tickers, ...tickers].map((t, i) => (
          <div key={i} className="flex items-center gap-2 text-sm font-bold text-gray-600">
            <span>{t.symbol}</span>
            <span className={t.up ? "text-[#059669]" : "text-red-500"}>{t.price}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
