'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function LiveGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // HUGE STARTING VALUE: $142 Million
  const [price, setPrice] = useState(142500000.00); 
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  useEffect(() => {
    // Initial Data: Populate with ~142M values
    let current = 142500000;
    const initial = [];
    for(let i=0; i<100; i++) {
      // Fluctuate by $50,000 - $100,000
      current += (Math.random() - 0.5) * 200000;
      initial.push(current);
    }
    setDataPoints(initial);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const last = prev[prev.length - 1] || 142500000;
        // Big jumps for massive scale feel
        const change = (Math.random() - 0.45) * 150000; 
        const newPrice = last + change;
        setPrice(newPrice);
        return [...prev.slice(1), newPrice];
      });
    }, 50); // 20 FPS
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dataPoints.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;
    const min = Math.min(...dataPoints);
    const max = Math.max(...dataPoints);
    const range = max - min || 1;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, "rgba(212, 175, 55, 0.4)");
    gradient.addColorStop(1, "rgba(212, 175, 55, 0)");

    ctx.beginPath();
    ctx.moveTo(0, h);
    dataPoints.forEach((p, i) => {
      const x = (i / (dataPoints.length - 1)) * w;
      const y = h - ((p - min) / range) * (h * 0.7) - (h * 0.15);
      ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    dataPoints.forEach((p, i) => {
      const x = (i / (dataPoints.length - 1)) * w;
      const y = h - ((p - min) / range) * (h * 0.7) - (h * 0.15);
      if (i===0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 3;
    ctx.stroke();
  }, [dataPoints]);

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-12 overflow-hidden relative">
       <div className="flex flex-col md:flex-row justify-between items-start mb-10 relative z-10">
         <div>
           <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-[#00FF41] rounded-full animate-pulse"></div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Real-Time Net Worth</p>
           </div>
           <h2 className="text-5xl font-serif mb-2">Global <span className="text-gray-600 text-3xl italic ml-4">Consolidated</span></h2>
         </div>
         <div className="text-right">
           <h2 className="text-5xl font-mono text-[#D4AF37] tracking-tight">${price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
           <p className="text-[#00FF41] text-sm font-mono mt-1">+${(price * 0.012).toLocaleString()} (24H)</p>
         </div>
       </div>
       
       <div className="w-full h-[500px] relative z-10">
         <canvas ref={canvasRef} width={1400} height={500} className="w-full h-full object-contain" />
       </div>
       <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent pointer-events-none"></div>
    </div>
  );
}
