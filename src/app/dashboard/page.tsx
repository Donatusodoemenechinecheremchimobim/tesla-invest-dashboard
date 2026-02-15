'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Dashboard() {
  const [debugStatus, setDebugStatus] = useState('Initializing...');
  const [user, setUser] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function debug() {
      try {
        // 1. Check Session
        setDebugStatus('Checking Supabase Session...');
        const { data: { session }, error: sError } = await supabase.auth.getSession();
        if (sError) throw new Error("Session Error: " + sError.message);
        if (!session) {
          setDebugStatus('NO SESSION FOUND. Redirecting to auth...');
          setTimeout(() => window.location.href = '/portal/auth', 2000);
          return;
        }

        // 2. Check Database Connection
        setDebugStatus('Fetching User Profile...');
        const { data: profile, error: pError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (pError) throw new Error("DB Profile Error: " + pError.message);
        setUser(profile);
        setDebugStatus('All Systems Go.');

        // 3. Check Camera
        setDebugStatus('Requesting Camera Access...');
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
        setDebugStatus('Monitoring Active.');

      } catch (e: any) {
        setDebugStatus('FATAL ERROR: ' + e.message);
        console.error(e);
      }
    }
    debug();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10 font-mono">
      <div className="max-w-xl mx-auto border border-[#D4AF37] p-6 rounded-xl">
        <h1 className="text-[#D4AF37] mb-4">SYSTEM DIAGNOSTICS</h1>
        <div className="bg-zinc-900 p-4 rounded mb-6 text-xs text-green-400">
          STATUS: {debugStatus}
        </div>
        
        {user && (
          <div className="space-y-2 text-xs">
            <p>NAME: {user.full_name}</p>
            <p>BALANCE: ${user.balance}</p>
            <p>STATUS: <span className="text-yellow-400">{user.deposit_status}</span></p>
            <p>UNLOCKED: {String(user.deposit_status?.toLowerCase().trim() === 'approved')}</p>
          </div>
        )}

        <video ref={videoRef} autoPlay muted className="mt-6 w-full h-40 bg-zinc-800 rounded object-cover" />
      </div>
    </main>
  );
}
