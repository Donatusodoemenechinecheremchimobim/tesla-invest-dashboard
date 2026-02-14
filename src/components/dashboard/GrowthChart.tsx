'use client';
import { useEffect, useRef } from 'react';

export default function GrowthChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set internal resolution higher for sharpness
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    
    // 1. Draw Grid Lines (Y-Axis in Billions)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    ctx.font = "10px Inter, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";

    const labels = ["$0", "$250B", "$500B", "$750B", "$1.0T"];
    for (let i = 0; i < 5; i++) {
      const y = h - (i * (h / 4)) - 20;
      ctx.beginPath();
      ctx.moveTo(60, y);
      ctx.lineTo(w, y);
      ctx.stroke();
      ctx.fillText(labels[i], 0, y + 4);
    }

    // 2. Create the Path
    const padding = 60;
    const chartWidth = w - padding;
    const chartHeight = h - 40;

    // Gradient Fill (The "Gold" Area)
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, "rgba(212, 175, 55, 0.25)");
    gradient.addColorStop(1, "rgba(212, 175, 55, 0)");

    ctx.beginPath();
    ctx.moveTo(padding, h - 20);
    // Exponential Growth Curve
    ctx.bezierCurveTo(
      padding + chartWidth * 0.4, h - 20, 
      padding + chartWidth * 0.6, h * 0.7, 
      w, 20
    );
    ctx.lineTo(w, h - 20);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // 3. Draw the Main Gold Line
    ctx.beginPath();
    ctx.moveTo(padding, h - 20);
    ctx.bezierCurveTo(
      padding + chartWidth * 0.4, h - 20, 
      padding + chartWidth * 0.6, h * 0.7, 
      w, 20
    );
    
    // Shadow/Glow effect
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(212, 175, 55, 0.5)";
    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Reset shadow for other elements
    ctx.shadowBlur = 0;

  }, []);

  return (
    <div className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Tooltip Simulation */}
      <div className="absolute top-[15%] right-[5%] bg-[#D4AF37] text-black px-3 py-1 rounded text-[10px] font-black uppercase tracking-tighter shadow-xl">
        Current AUM: $1.242 Trillion
      </div>
    </div>
  );
}
