'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { ShieldAlert, RefreshCw, User, Lock, Grid } from 'lucide-react';
import Image from 'next/image';

export default function AdminDashboard() {
  const [feeds, setFeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔄 REFRESH FUNCTION: GETS LATEST SNAPSHOTS
  const fetchFeeds = async () => {
    setLoading(true);
    
    // 1. List all folders (User IDs) in the bucket
    const { data: folders, error } = await supabase.storage.from('proctor_evidence').list();
    
    if (error || !folders) {
      console.error("Error fetching users:", error);
      setLoading(false);
      return;
    }

    const liveFeeds = [];

    // 2. For each user, get their LATEST photo
    for (const folder of folders) {
      if (folder.id === null) continue; // Skip random files

      const { data: files } = await supabase.storage
        .from('proctor_evidence')
        .list(folder.name, { limit: 1, sortBy: { column: 'name', order: 'desc' } }); // Get newest

      if (files && files.length > 0) {
        const latestFile = files[0];
        
        // Construct Public URL
        const { data: { publicUrl } } = supabase.storage
          .from('proctor_evidence')
          .getPublicUrl(`${folder.name}/${latestFile.name}`);

        liveFeeds.push({
          userId: folder.name,
          lastActive: new Date(latestFile.created_at).toLocaleTimeString(),
          url: publicUrl,
          timestamp: latestFile.created_at
        });
      }
    }

    setFeeds(liveFeeds);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
    
    // Auto-refresh every 5 seconds to simulate "Live Video"
    const interval = setInterval(fetchFeeds, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="bg-red-600/20 p-3 rounded-xl border border-red-600/50">
            <ShieldAlert className="text-red-500 animate-pulse" size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-[0.2em]">Master Control</h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest">Surveillance Grid • Active Nodes: {feeds.length}</p>
          </div>
        </div>
        
        <button 
          onClick={fetchFeeds}
          className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg transition-all text-xs font-bold uppercase tracking-widest"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          {loading ? 'Scanning...' : 'Refresh Signal'}
        </button>
      </div>

      {/* CCTV GRID */}
      {feeds.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
          <Grid size={64} className="mb-4 opacity-20" />
          <p className="uppercase tracking-[0.3em] text-sm">No Active Signals Detected</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {feeds.map((feed) => (
            <motion.div 
              key={feed.userId}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative group"
            >
              {/* STATUS OVERLAY */}
              <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-3 bg-gradient-to-b from-black/90 to-transparent">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]" />
                   <span className="text-[10px] font-bold text-red-400 font-mono">LIVE</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400">{feed.lastActive}</span>
              </div>

              {/* IMAGE FEED */}
              <div className="relative aspect-video bg-gray-900">
                <img 
                  src={feed.url} 
                  alt="Surveillance Feed" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
              </div>

              {/* FOOTER */}
              <div className="p-4 border-t border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-full">
                    <User size={14} className="text-gray-400" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest truncate">Target ID</p>
                    <p className="text-xs font-mono text-[#D4AF37] truncate w-full">{feed.userId}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
