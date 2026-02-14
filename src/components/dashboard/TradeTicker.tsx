'use client';
import { motion } from 'framer-motion';
export default function TradeTicker() {
  const tickers = ["TSLA $721.30 ▲ +3.2%", "BTC $64,200 ▲ +1.5%", "ETH $3,400 ▲ +2.1%", "SOL $145.20 ▲ +5.4%"];
  return (
    <div className="flex overflow-hidden py-3 bg-black/50 backdrop-blur-md border-t border-white/5">
      <motion.div className="flex gap-12 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
        {[...tickers, ...tickers, ...tickers].map((t, i) => (
          <span key={i} className="text-[10px] font-mono font-bold text-[#D4AF37] tracking-widest uppercase">{t}</span>
        ))}
      </motion.div>
    </div>
  );
}
