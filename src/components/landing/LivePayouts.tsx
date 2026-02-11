'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const winners = [
  { name: "Sarah J.", country: "🇬🇧 UK", amount: "$4,250" }, { name: "Ahmed K.", country: "🇦🇪 UAE", amount: "$12,400" },
  { name: "Chen L.", country: "🇨🇳 CN", amount: "$8,100" }, { name: "Michael B.", country: "🇺🇸 USA", amount: "$2,500" },
  { name: "Elena R.", country: "🇷🇺 RU", amount: "$15,200" }, { name: "David S.", country: "🇦🇺 AU", amount: "$3,800" },
  { name: "Kwame O.", country: "🇳🇬 NG", amount: "$6,750" }, { name: "Yuki T.", country: "🇯🇵 JP", amount: "$9,300" },
  { name: "Hans M.", country: "🇩🇪 DE", amount: "$5,100" }, { name: "Maria G.", country: "🇧🇷 BR", amount: "$1,900" },
  { name: "Lars N.", country: "🇳🇴 NO", amount: "$18,500" }, { name: "Sophie D.", country: "🇫🇷 FR", amount: "$7,200" },
  { name: "Omar F.", country: "🇸🇦 SA", amount: "$11,000" }, { name: "James P.", country: "🇨🇦 CA", amount: "$4,900" },
  { name: "Priya M.", country: "🇮🇳 IN", amount: "$3,200" }, { name: "Alessandro V.", country: "🇮🇹 IT", amount: "$6,400" },
  { name: "Isabella C.", country: "🇪🇸 ES", amount: "$5,800" }, { name: "Lucas W.", country: "🇳🇱 NL", amount: "$8,900" },
  { name: "Dimitri K.", country: "🇬🇷 GR", amount: "$2,100" }, { name: "Hassan A.", country: "🇶🇦 QA", amount: "$22,000" },
  { name: "Olivia B.", country: "🇳🇿 NZ", amount: "$3,500" }, { name: "Kim H.", country: "🇰🇷 KR", amount: "$7,600" },
  { name: "Fatima Z.", country: "🇲🇦 MA", amount: "$4,100" }, { name: "Johan B.", country: "🇿🇦 ZA", amount: "$5,300" },
  { name: "Mateo R.", country: "🇦🇷 AR", amount: "$2,800" }, { name: "Anders L.", country: "🇸🇪 SE", amount: "$9,100" },
  { name: "Viktor P.", country: "🇺🇦 UA", amount: "$3,900" }, { name: "Gabriela S.", country: "🇲🇽 MX", amount: "$1,500" },
  { name: "Mehmet Y.", country: "🇹🇷 TR", amount: "$6,200" }, { name: "Liam O.", country: "🇮🇪 IE", amount: "$5,500" },
  { name: "Zara N.", country: "🇵🇰 PK", amount: "$2,300" }, { name: "Ivan D.", country: "🇧🇬 BG", amount: "$4,700" },
  { name: "Wei Z.", country: "🇸🇬 SG", amount: "$14,800" }, { name: "Emma F.", country: "🇨🇭 CH", amount: "$25,000" },
  { name: "Tariq M.", country: "🇪🇬 EG", amount: "$3,100" }
];

export default function LivePayouts() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const showTimer = setInterval(() => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => { setIndex((prev) => (prev + 1) % winners.length); }, 500);
      }, 4000); 
    }, 8000); 
    return () => clearInterval(showTimer);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[100] pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-4 bg-[#111]/90 backdrop-blur-md border border-[#D4AF37]/30 p-4 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] pr-8"
          >
            <div className="bg-[#D4AF37]/10 p-2 rounded-full border border-[#D4AF37]/20 text-[#D4AF37]">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-white text-xs font-bold">{winners[index].name} <span className="opacity-50 font-normal">{winners[index].country}</span></p>
              <p className="text-[#D4AF37] text-sm font-bold tracking-wide">Just withdrew {winners[index].amount}</p>
              <p className="text-gray-500 text-[9px] uppercase tracking-widest mt-0.5">Verified Transaction • Just Now</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
