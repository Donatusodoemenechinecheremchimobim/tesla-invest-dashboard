'use client';

import { useRef, useState, useCallback } from 'react';
import { Camera, RefreshCw, Check, Upload, X } from 'lucide-react';

export default function CameraCapture({ onCapture }: { onCapture: (file: File) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isCameraMode, setIsCameraMode] = useState(false);

  // --- CAMERA LOGIC ---
  const startCamera = async () => {
    try {
      setIsCameraMode(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera Error:", err);
      alert("Unable to access camera. Please use the 'Upload File' option.");
    }
  };

  const takeSnapshot = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "id-snapshot.jpg", { type: "image/jpeg" });
            const previewUrl = URL.createObjectURL(blob);
            setImage(previewUrl);
            onCapture(file);
            stopCamera();
          }
        }, 'image/jpeg', 0.8);
      }
    }
  }, [onCapture]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraMode(false);
  };

  // --- FILE UPLOAD LOGIC ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);
      onCapture(file);
      setIsCameraMode(false);
    }
  };

  const retake = () => {
    setImage(null);
    setIsCameraMode(false);
  };

  return (
    <div className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 overflow-hidden">
      
      {/* 1. INITIAL STATE: CHOOSE METHOD */}
      {!isCameraMode && !image && (
         <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={startCamera}
              className="py-8 flex flex-col items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:bg-white/5 transition-all rounded-xl border border-dashed border-white/20"
            >
              <Camera size={32} className="mb-2" />
              <span className="uppercase tracking-widest text-[10px] font-bold">Take Photo</span>
            </button>
            
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="py-8 flex flex-col items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:bg-white/5 transition-all rounded-xl border border-dashed border-white/20"
            >
              <Upload size={32} className="mb-2" />
              <span className="uppercase tracking-widest text-[10px] font-bold">Upload File</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*,application/pdf" 
              onChange={handleFileUpload}
            />
         </div>
      )}

      {/* 2. CAMERA ACTIVE STATE */}
      {isCameraMode && !image && (
        <div className="relative rounded-xl overflow-hidden bg-black">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-64 object-cover" />
          
          <button 
            type="button"
            onClick={takeSnapshot}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full border-4 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.5)] active:scale-90 transition-transform z-20"
          />
          
          <button 
            type="button"
            onClick={stopCamera}
            className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:text-red-500 transition-colors z-20"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* 3. IMAGE PREVIEW STATE */}
      {image && (
        <div className="relative">
          <img src={image} alt="ID Document" className="w-full h-64 object-cover rounded-xl border border-[#D4AF37]" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4">
            <button 
              type="button"
              onClick={retake}
              className="p-3 bg-red-600/80 rounded-full hover:bg-red-600 transition-colors shadow-lg"
            >
              <RefreshCw size={20} className="text-white" />
            </button>
            <div className="p-3 bg-green-500 rounded-full shadow-lg">
              <Check size={20} className="text-white" />
            </div>
          </div>
          <p className="text-center text-green-500 text-[10px] font-bold uppercase tracking-widest mt-3">Document Ready</p>
        </div>
      )}
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
