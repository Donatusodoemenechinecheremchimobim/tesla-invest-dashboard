import './globals.css';
import { Inter } from 'next/font/google';
import SocialProof from '@/components/ui/SocialProof';
import WhatsAppBubble from '@/components/ui/WhatsAppBubble'; // 👈 IMPORTED

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Verde Stock | Sustainable Growth',
  description: 'AI-driven investment platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <SocialProof />    {/* 👈 Shows on New Site */}
        <WhatsAppBubble /> {/* 👈 Shows on Old Site */}
      </body>
    </html>
  );
}
