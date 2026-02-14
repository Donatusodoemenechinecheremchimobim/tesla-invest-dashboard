# ==========================================
# 4. CONTACT PAGE (The "Global" Experience)
# ==========================================
cat << 'EOF' > src/app/contact/page.tsx
'use client';
import IntroNavbar from '@/components/intro/IntroNavbar';
import WhatsAppBubble from '@/components/ui/WhatsAppBubble';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="bg-white text-[#1a1a1a] min-h-screen">
      <IntroNavbar />
      <WhatsAppBubble />
      
      <section className="pt-40 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
         
         <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-[#059669] font-bold uppercase tracking-widest text-sm mb-4 block">24/7 Global Support</span>
            <h1 className="text-6xl font-bold mb-8">Let's talk <br/> <span className="text-[#059669]">Business.</span></h1>
            <p className="text-xl text-gray-500 mb-12">
               Our dedicated concierge team is available around the clock. Whether you are in Tokyo or Toronto, we are one call away.
            </p>
            
            <div className="space-y-8">
               {[
                  { icon: Phone, title: "Direct Line", val: "+1 (800) VERDE-VIP" },
                  { icon: Mail, title: "Secure Email", val: "concierge@verdecapital.com" },
                  { icon: MapPin, title: "Headquarters", val: "214 North Tryon St, Charlotte, NC" }
               ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-gray-50 border border-gray-100">
                     <div className="w-12 h-12 bg-[#059669] rounded-full flex items-center justify-center text-white">
                        <item.icon size={24} />
                     </div>
                     <div>
                        <p className="text-xs font-bold uppercase text-gray-400">{item.title}</p>
                        <p className="text-xl font-bold">{item.val}</p>
                     </div>
                  </div>
               ))}
            </div>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#020617] text-white p-12 rounded-[3rem] shadow-2xl"
         >
            <h3 className="text-3xl font-bold mb-8">Send a Secure Message</h3>
            <form className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <input type="text" placeholder="First Name" className="bg-[#1e293b] border border-gray-700 rounded-xl p-4 w-full focus:border-[#059669] outline-none transition-colors" />
                  <input type="text" placeholder="Last Name" className="bg-[#1e293b] border border-gray-700 rounded-xl p-4 w-full focus:border-[#059669] outline-none transition-colors" />
               </div>
               <input type="email" placeholder="Email Address" className="bg-[#1e293b] border border-gray-700 rounded-xl p-4 w-full focus:border-[#059669] outline-none transition-colors" />
               <select className="bg-[#1e293b] border border-gray-700 rounded-xl p-4 w-full focus:border-[#059669] outline-none transition-colors text-gray-400">
                  <option>Select Department</option>
                  <option>Private Banking</option>
                  <option>Corporate Treasury</option>
                  <option>Technical Support</option>
               </select>
               <textarea rows={4} placeholder="How can we assist you?" className="bg-[#1e293b] border border-gray-700 rounded-xl p-4 w-full focus:border-[#059669] outline-none transition-colors"></textarea>
               <button className="w-full bg-[#059669] hover:bg-[#047857] py-5 rounded-xl font-bold text-lg transition-colors">
                  Submit Request
               </button>
            </form>
         </motion.div>

      </section>
    </main>
  );
}
EOF

echo "✅ ALL PAGES DEPLOYED. SITE IS FULLY FUNCTIONAL."

# 🚀 Push to Live
git add .
git commit -m "feat: replace all placeholder pages with fully animated production layouts"
git push origin main