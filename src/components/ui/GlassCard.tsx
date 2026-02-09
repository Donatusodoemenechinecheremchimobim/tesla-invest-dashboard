'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({ children, className, hoverEffect = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={clsx(
        "relative backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 overflow-hidden",
        hoverEffect && "hover:border-cyan-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_50px_-10px_rgba(0,240,255,0.15)] transition-all duration-500 group",
        className
      )}
    >
      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {children}
    </motion.div>
  );
}
