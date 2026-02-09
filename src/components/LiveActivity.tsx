'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, DollarSign, User } from 'lucide-react';

// Fake data to simulate activity
const NAMES = ["Alex M.", "Sarah J.", "David K.", "Maria R.", "James L.", "Chen W.", "Amara D."];
const ACTIONS = ["invested", "withdrew", "earned"];
const AMOUNTS = [500, 1200, 5000, 250, 10000, 750, 3200];
const FLAGS = ["🇺🇸", "🇬🇧", "🇨🇦", "🇩🇪", "🇯🇵", "🇳🇬", "🇧🇷"];

export default function LiveActivity() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: '', action: '', amount: 0, flag: '' });

  useEffect(() => {
    // Function to trigger a new bubble
    const showNewActivity = () => {
      const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
      const randomAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
      const randomAmount = AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)];
      const randomFlag = FLAGS[Math.floor(Math.random() * FLAGS.length)];

      setData({ name: randomName, action: randomAction, amount: randomAmount, flag: randomFlag });
      setVisible(true);

      // Hide after 4 seconds
      setTimeout(() => setVisible(false), 4000);
    };

    // Run every 8-15 seconds randomly
    const interval = setInterval(() => {
      if (Math.random() > 0.3) showNewActivity(); // 70% chance to show
    }, 8000);

    // Show first one immediately
    setTimeout(showNewActivity, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 max-w-xs w-full"
        >
          <div className="glass-card p-4 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/10 shadow-2xl flex items-center gap-4">
            
            {/* Icon Box */}
            <div className={`p-3 rounded-full ${
              data.action === 'invested' ? 'bg-red-500/20 text-red-500' : 
              data.action === 'earned' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'
            }`}>
              {data.action === 'invested' ? <TrendingUp size={20} /> : 
               data.action === 'earned' ? <DollarSign size={20} /> : <User size={20} />}
            </div>

            {/* Text Content */}
            <div>
              <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
                {data.flag} {data.name} just {data.action}
              </p>
              <p className="text-lg font-bold text-white font-mono">
                ${data.amount.toLocaleString()}
              </p>
            </div>

            {/* 'Live' Dot */}
            <div className="absolute top-2 right-2 flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}