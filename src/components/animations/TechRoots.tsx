'use client';
import { motion } from 'framer-motion';

export default function TechRoots() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Main Stem */}
        <path d="M100,0 V50" stroke="#059669" strokeWidth="4" />
        
        {/* Spreading Digital Roots */}
        {[
          "M100,50 Q60,100 40,150", 
          "M100,50 Q140,100 160,150", 
          "M100,50 V180",
          "M60,80 H20", 
          "M140,80 H180"
        ].map((path, i) => (
           <motion.path
             key={i}
             d={path}
             fill="none" stroke="#059669" strokeWidth="2"
             initial={{ pathLength: 0 }}
             whileInView={{ pathLength: 1 }}
             transition={{ duration: 2, delay: i * 0.3 }}
           />
        ))}

        {/* Data Nodes */}
        {[
          {cx:40, cy:150}, {cx:160, cy:150}, {cx:100, cy:180}, {cx:20, cy:80}, {cx:180, cy:80}
        ].map((node, i) => (
           <motion.circle
             key={i}
             cx={node.cx} cy={node.cy} r="4" fill="#059669"
             initial={{ scale: 0 }}
             whileInView={{ scale: 1 }}
             transition={{ delay: 1.5 + i * 0.2 }}
           />
        ))}
      </svg>
    </div>
  );
}
