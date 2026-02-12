import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import WhatsAppBubble from '@/components/ui/WhatsAppBubble'; // 👈 IMPORTED

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'TeslaInvest | Algorithmic Wealth',
  description: 'The future of high-frequency trading powered by Dojo V4.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-black text-white`}>
        {children}
        <WhatsAppBubble /> {/* 👈 GLOBAL BUBBLE */}
      </body>
    </html>
  );
}
