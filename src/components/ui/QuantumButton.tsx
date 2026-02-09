'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  disabled?: boolean;
}

export default function QuantumButton({ children, onClick, variant = 'primary', className, disabled }: ButtonProps) {
  const baseStyles = "relative px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group";
  
  const variants = {
    primary: "bg-white text-black hover:bg-cyan-400 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]",
    secondary: "bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-cyan-400/50 hover:text-cyan-400",
    danger: "bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyles, variants[variant], className, disabled && "opacity-50 cursor-not-allowed")}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Hover Glare Effect */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
    </motion.button>
  );
}
