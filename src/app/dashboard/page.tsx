'use client';
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, onSnapshot, setDoc, collection, query, where, orderBy, runTransaction } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { LogOut, TrendingUp, History, Wallet, Copy, User, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LiveActivity from '@/components/LiveActivity'; // <--- Import the bubble

export default function Dashboard() {
  const { t, lang, setLang } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [investAmount, setInvestAmount] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Helper: Format Currency
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0, 
    }).format(amount);
  };

  // Authentication & Data Stream
  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged(async (u) => {
      if (!u) {
        router.push('/auth');
      } else {
        // 1. Real-time User Data
        const unsubDoc = onSnapshot(doc(db, "users", u.uid), async (snapshot) => {
            if (snapshot.exists()) {
                setUser(snapshot.data());
                setLoading(false);
            } else {
                // *** SELF-HEALING FIX ***
                // If user exists in Auth but not in Database, create the profile now
                console.log("Profile missing... Creating default profile.");
                try {
                    await setDoc(doc(db, "users", u.uid), {
                        email: u.email,
                        balance: 0,
                        totalEarned: 0,
                        refCode: u.uid.slice(0, 6).toUpperCase(), // Generate a simple ref code
                        createdAt: new Date().toISOString()
                    });
                    // The onSnapshot will fire again automatically after this!
                } catch (err: any) {
                    console.error("Error creating profile:", err);
                    setError(err.message);
                    setLoading(false);
                }
            }
        }, (err) => {
            console.error("Database Error:", err);
            setError("Database Connection Failed. Check Console.");
            setLoading(false);
        });
        
        // 2. Real-time Transaction History
        // Note: If you see a red error in console, click the link to create the Index
        const q = query(
            collection(db, "transactions"), 
            where("userId", "==", u.uid), 
            orderBy("date", "desc")
        );
        
        const unsubHist = onSnapshot(q, (snap) => {
            setHistory(snap.docs.map(d => d.data()));
        }, (error) => {
            console.log("Index might be missing, ignoring for now...", error);
        });
        
        return () => { unsubDoc(); unsubHist(); }
      }
    });
    return () => unsubAuth();
  }, [router]);

  // Secure Investment Logic
  const handleInvest = async () => {
    const amount = Number(investAmount);
    if (!investAmount || amount <= 0) return alert("Please enter a valid amount.");
    if (amount > user.balance) return alert("Insufficient funds in wallet.");
    
    try {
      await runTransaction(db, async (transaction) => {
        const userRef = doc(db, "users", auth.currentUser!.uid);
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) throw "User does not exist!";
        
        const currentBalance = userDoc.data().balance;
        if (currentBalance < amount) throw "Insufficient Funds!";

        // Deduct
        transaction.update(userRef, { balance: currentBalance - amount });

        // Record
        const newTxRef = doc(collection(db, "transactions"));
        transaction.set(newTxRef, {
          userId: auth.currentUser!.uid,
          type: "Investment",
          asset: "Tesla Stock (TSLA)",
          amount: amount,
          date: new Date().toISOString(),
          status: "Active",
          roi: "15%" 
        });
      });
      alert("Investment Successful!");
      setInvestAmount('');
    } catch (e: any) {
      console.error(e);
      alert("Transaction Failed: " + e.message);
    }
  };

  // ERROR STATE
  if (error) {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-red-500 gap-4 p-4 text-center">
            <AlertTriangle size={48} />
            <h2 className="text-xl font-bold">System Error</h2>
            <p className="max-w-md bg-zinc-900 p-4 rounded font-mono text-sm">{error}</p>
            <button onClick={() => window.location.reload()} className="bg-white text-black px-6 py-2 rounded-full font-bold mt-4">
                Retry Connection
            </button>
        </div>
    );
  }

  // LOADING STATE
  if (loading || !user) {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-red-600 font-mono gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <p className="animate-pulse">{t('connectMsg')}</p>
        </div>
    );
  }

  // --- DASHBOARD UI ---
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 pb-32 font-sans selection:bg-red-900 selection:text-white relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-b border-zinc-900 pb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{t('dashboardTitle')}</h1>
            <p className="text-zinc-500 flex items-center gap-2 font-mono text-sm">
                <User size={14}/> {user.email}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Language Switcher */}
            <div className="flex bg-zinc-900 rounded-full p-1 border border-zinc-800">
                {(['en', 'es', 'fr'] as const).map((l) => (
                    <button 
                        key={l}
                        onClick={() => setLang(l)} 
                        className={`px-3 py-1 rounded-full text-xs font-bold transition uppercase ${lang === l ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                    >
                        {l}
                    </button>
                ))}
            </div>

             <button onClick={() => auth.signOut()} className="px-6 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-red-600 hover:border-red-600 hover:text-white transition flex items-center gap-2 text-sm font-medium">
               <LogOut size={16}/> {t('signOut')}
             </button>
          </div>
        </header>

        {/* Wealth Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Balance */}
          <div className="glass p-8 rounded-3xl relative overflow-hidden bg-zinc-900/20 border border-zinc-800 hover:border-zinc-700 transition">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -mr-10 -mt-10"/>
            <p className="text-zinc-400 mb-2 flex items-center gap-2 font-medium"><Wallet className="text-red-500" size={20}/> {t('totalBalance')}</p>
            <h2 className="text-5xl font-bold tracking-tighter text-white">{formatMoney(user.balance)}</h2>
          </div>

          {/* Profits */}
          <div className="glass p-8 rounded-3xl relative overflow-hidden bg-zinc-900/20 border border-zinc-800 hover:border-zinc-700 transition">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-full blur-3xl -mr-10 -mt-10"/>
            <p className="text-zinc-400 mb-2 flex items-center gap-2 font-medium"><TrendingUp className="text-emerald-500" size={20}/> {t('totalProfits')}</p>
            <h2 className="text-5xl font-bold tracking-tighter text-emerald-400">+{formatMoney(user.totalEarned)}</h2>
          </div>

          {/* Referral */}
          <div className="glass p-8 rounded-3xl relative overflow-hidden flex flex-col justify-center bg-zinc-900/20 border border-zinc-800">
             <p className="text-zinc-400 mb-3 font-medium">{t('referralLink')}</p>
             <div 
                className="flex bg-black p-4 rounded-xl border border-zinc-800 justify-between items-center cursor-pointer hover:border-red-500/50 transition group"
                onClick={() => {
                    navigator.clipboard.writeText(`tesla.com/ref/${user.refCode}`);
                    alert("Link Copied!");
                }}
             >
               <code className="text-sm text-red-400 font-mono">tesla.com/ref/{user.refCode}</code>
               <Copy size={16} className="text-zinc-600 group-hover:text-white transition"/>
             </div>
          </div>
        </div>

        {/* Main Engine Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-zinc-300"><TrendingUp size={20} className="text-red-500"/> {t('marketOpp')}</h3>
            
            {/* Tesla Card */}
            <div className="glass-card p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 relative overflow-hidden backdrop-blur-sm">
               <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-lg">{t('hot')}</div>
               <div className="flex justify-between items-start mb-6">
                 <div>
                   <h2 className="text-2xl font-bold text-white">Tesla Inc (TSLA)</h2>
                   <p className="text-sm text-zinc-400">AI Robotics & EV Division</p>
                 </div>
               </div>
               
               <div className="flex flex-col sm:flex-row gap-4">
                 <input 
                   type="number" 
                   placeholder="Amount ($)" 
                   className="bg-black border border-zinc-700 p-4 rounded-xl w-full text-white focus:border-red-500 focus:outline-none transition font-mono"
                   value={investAmount}
                   onChange={e => setInvestAmount(e.target.value)}
                 />
                 <button onClick={handleInvest} className="bg-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition text-white whitespace-nowrap shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                   {t('investBtn')}
                 </button>
               </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-zinc-300"><History size={20} className="text-blue-500"/> {t('recentActivity')}</h3>
            <div className="glass p-6 rounded-3xl min-h-[400px] bg-zinc-900/20 border border-zinc-800">
              {history.length === 0 ? (
                <div className="text-center text-zinc-600 mt-20 flex flex-col items-center gap-4">
                    <History size={48} className="opacity-20"/>
                    <p>{t('noTrans')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((h, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                      <div>
                        <p className="font-bold text-sm text-zinc-200">{h.type}</p>
                        <p className="text-xs text-zinc-500 font-mono">{new Date(h.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`font-mono font-bold ${h.type === 'Withdrawal' ? 'text-red-400' : 'text-emerald-400'}`}>
                        {h.type === 'Withdrawal' ? '-' : '+'}{formatMoney(h.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
      
      {/* Live Activity Bubble Component */}
      <LiveActivity />

    </div>
  );
}