'use client';
import { motion } from 'framer-motion';
import { Zap, Shield, Globe, Cpu, BarChart3, Layers } from 'lucide-react';

const features = [
  { icon: Zap, title: "Speed of Light", desc: "Our engine executes trades in milliseconds, beating the market spread." },
  { icon: Shield, title: "Bank-Grade Vault", desc: "Your assets are stored in cold wallets with multi-sig protection." },
  { icon: Globe, title: "Global Access", desc: "Trade from anywhere. Withdraw to any bank or crypto wallet instantly." },
  { icon: Cpu, title: "AI Powered", desc: "Neural networks analyze millions of data points to predict TSLA price." },
  { icon: BarChart3, title: "Real-Time Data", desc: "Live feeds from NASDAQ and NYSE with zero latency delay." },
  { icon: Layers, title: "Portfolio Sync", desc: "Automatically rebalance your portfolio based on risk tolerance." },
];

export default function Features() {
  return (
    <section className="py-32 bg-[#020204] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">BUILT FOR <span className="text-purple-500">PERFECTION</span></h2>
          <p className="text-gray-400">Everything you need to build wealth, wrapped in a beautiful interface.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl group"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                <f.icon className="text-gray-300 group-hover:text-cyan-400 transition-colors" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
