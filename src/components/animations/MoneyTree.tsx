'use client';
import { motion } from 'framer-motion';

export default function MoneyTree() {
  return (
    <div className="relative w-64 h-80 mx-auto">
      <svg viewBox="0 0 200 300" className="w-full h-full overflow-visible">
        
        {/* 1. THE SEED (Buried) - Changed to Gold */}
        <motion.circle 
          cx="100" cy="280" r="5" fill="#D4AF37"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* 2. THE SPROUT (Rising) - Changed stroke to Lighter Brown/Gold for visibility on black */}
        <motion.path
          d="M100,280 Q100,200 100,150"
          fill="none" stroke="#8B6914" strokeWidth="4" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />

        {/* 3. BRANCHES - Changed stroke to Lighter Brown/Gold */}
        <motion.path
          d="M100,150 Q70,120 50,100 M100,150 Q130,120 150,100 M100,150 V80"
          fill="none" stroke="#8B6914" strokeWidth="3" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
        />

        {/* 4. LEAVES (Popping up) - Changed from Green to Gold Theme */}
        {[
           { x: 50, y: 100, d: 0 }, { x: 150, y: 100, d: 0.2 }, { x: 100, y: 80, d: 0.4 },
           { x: 75, y: 130, d: 0.6 }, { x: 125, y: 130, d: 0.8 }
        ].map((leaf, i) => (
          <motion.path
            key={i}
            d={`M${leaf.x},${leaf.y} Q${leaf.x-10},${leaf.y-10} ${leaf.x},${leaf.y-20} Q${leaf.x+10},${leaf.y-10} ${leaf.x},${leaf.y}`}
            fill="#D4AF37" // Gold Leaves
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 3.5 + leaf.d }}
          />
        ))}

        {/* 5. GOLD COINS (The Fruit) - Brighter Gold/White mix */}
        {[
           { x: 40, y: 110, d: 0 }, { x: 160, y: 110, d: 0.3 }, { x: 100, y: 60, d: 0.6 },
           { x: 60, y: 140, d: 0.9 }, { x: 140, y: 140, d: 1.2 }
        ].map((coin, i) => (
          <motion.circle
            key={i}
            cx={coin.x} cy={coin.y + 10} r="6"
            fill="#FFF" // White center for contrast
            stroke="#D4AF37" // Gold border
            strokeWidth="3"
            initial={{ scale: 0, y: 0 }}
            animate={{ scale: 1, y: 5 }}
            transition={{ type: "spring", bounce: 0.6, delay: 4.5 + coin.d }}
          />
        ))}
      </svg>
    </div>
  );
}
