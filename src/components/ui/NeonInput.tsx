import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export default function NeonInput({ label, icon, className, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest ml-1">{label}</label>}
      <div className="relative group">
        <input
          {...props}
          className={clsx(
            "w-full bg-[#0a0a0a] border border-white/10 text-white rounded-xl px-5 py-4 pl-12 outline-none transition-all duration-300",
            "focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(0,240,255,0.15)] placeholder:text-gray-600",
            className
          )}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
          {icon}
        </div>
      </div>
    </div>
  );
}
