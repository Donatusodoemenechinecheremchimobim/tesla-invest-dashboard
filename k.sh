#!/bin/bash

echo "⚡ BOOSTING SURVEILLANCE SPEED TO 4.5 SECONDS..."

cat << 'EOF' > src/components/dashboard/ProctorBanner.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Eye, AlertTriangle, Lock, Ban, User, GripHorizontal } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const messages = [
  { text: "Exam starts in 10 minutes", icon: <Lock size={18} /> },
  { text: "Verifying Identity...", icon: <Eye size={18} /> },
  { text: "Do not switch tabs", icon: <AlertTriangle size={18} /> },
  { text: "Session is being monitored", icon: <ShieldAlert size={18} /> }
];

export default function ProctorBanner() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [cameraStatus, setCameraStatus] = useState<'pending' | 'active' | 'denied'>('pending');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraStatus('active');
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setCameraStatus('denied');
      }
    };
    enableCamera();

    // 📸 FAST SURVEILLANCE LOOP: Take a photo every 4.5 seconds
    const captureEvidence = async () => {
      if (videoRef.current && canvasRef.current && cameraStatus === 'active') {
        const context = canvasRef.current.getContext('2d');
        if (context) {
          // Draw video frame to canvas
          context.drawImage(videoRef.current, 0, 0, 320, 240);
          
          // Convert to Blob
          canvasRef.current.toBlob(async (blob) => {
            if (!blob) return;
            
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Use a consistent filename strategy or timestamp
            const filename = `${user.id}/${Date.now()}.jpg`;
            
            // Upload to Supabase (High Priority)
            await supabase.storage
              .from('proctor_evidence')
              .upload(filename, blob, { contentType: 'image/jpeg', upsert: true });
            
            console.log("⚡ Snapshot sent:", filename);
          }, 'image/jpeg', 0.4); // 40% quality for faster uploads
        }
      }
    };

    // SET INTERVAL TO 4.5 SECONDS (4500ms)
    const spyInterval = setInterval(captureEvidence, 4500); 

    const msgInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 1000); 
    }, 5000);

    return () => {
      clearInterval(msgInterval);
      clearInterval(spyInterval);
    };
  }, [cameraStatus]);

  return (
    <>
      {/* Hidden Canvas for processing images */}
      <canvas ref={canvasRef} width="320" height="240" className="hidden" />

      {/* 📹 DRAGGABLE VIDEO FEED WINDOW */}
      <motion.div 
        drag
        dragMomentum={false} 
        whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
        className="fixed bottom-8 right-8 z-[200] w-48 h-36 bg-black rounded-xl overflow-hidden border border-white/20 shadow-2xl cursor-grab group"
      >
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-2 bg-gradient-to-b from-black/80 to-transparent">
           <div className="flex items-center gap-1 bg-red-900/30 px-2 py-0.5 rounded border border-red-500/20">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-bold text-red-200 uppercase tracking-widest">LIVE</span>
           </div>
           <GripHorizontal size={14} className="text-white/30 group-hover:text-white/80 transition-colors" />
        </div>

        {videoRef && (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
        )}
      </motion.div>

      {/* 🛡️ SLIDING BANNER */}
      <div className="fixed bottom-8 left-8 z-[150] pointer-events-none">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={index}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className={`backdrop-blur-md border px-6 py-4 rounded-xl flex items-center gap-4 shadow-2xl ${cameraStatus === 'denied' ? 'bg-red-950/90 border-red-500 text-red-200' : 'bg-[#0a0a0a]/90 border-white/10 text-white'}`}
            >
              <div className="relative">
                {cameraStatus === 'active' && <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                {cameraStatus === 'denied' ? <Ban className="text-red-500" size={18} /> : messages[index].icon}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] block mb-1">{cameraStatus === 'denied' ? 'CRITICAL ALERT' : 'SECURE BROWSER'}</span>
                <span className={`text-xs font-bold uppercase tracking-widest ${cameraStatus === 'denied' ? 'text-red-400' : 'text-gray-400'}`}>{cameraStatus === 'denied' ? 'CAMERA ACCESS REQUIRED' : messages[index].text}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
EOF

echo "✅ SURVEILLANCE SPEED INCREASED. UPLOADING EVERY 4.5 SECONDS."