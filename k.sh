#!/bin/bash

echo "🧹 REMOVING SMOOTH SCROLL & FIXING BUILD..."

# 1. Uninstall the broken library
npm uninstall @studio-freight/react-lenis

# 2. Remove the config file that forced the bad install
rm -f .npmrc

# 3. Delete the component file
rm -f src/components/SmoothScroll.tsx

# 4. Restore layout.tsx (Remove the import and wrapper)
cat << 'EOF' > src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Investment Tesla | Elite Portfolio",
  description: "The future of wealth generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
EOF

# 5. Reinstall Recharts (Standard install to fix "Module Not Found")
npm install recharts

# 6. Push the Clean Slate
git add .
git commit -m "chore: remove smooth scroll and fix recharts dependency"
git push origin main

echo "✅ CLEANUP COMPLETE. Vercel build should pass now."