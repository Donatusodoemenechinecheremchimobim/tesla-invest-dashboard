#!/bin/bash

echo "🌊 INSTALLING LUXURY SCROLL ENGINE..."

# 1. Install Dependency (Force is needed for React 19 compatibility)
npm install @studio-freight/react-lenis --force

# 2. Create the Smooth Scroll Component
mkdir -p src/components
cat << 'EOF' > src/components/SmoothScroll.tsx
'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // 'lerp: 0.07' gives that heavy, expensive "Mercedes" feel.
  // Lower number = heavier/smoother. Higher = snappier.
  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
EOF

# 3. Inject Luxury CSS (Gold Highlight + Invisible Scrollbar)
cat << 'EOF' > src/app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 0, 0, 0;
  --background-end-rgb: 0, 0, 0;
}

body {
  color: rgb(var(--foreground-rgb));
  background: black;
  overflow-x: hidden;
}

/* 🎨 LUXURY TEXT SELECTION */
::selection {
  background: #D4AF37; /* Tesla Gold */
  color: #000;
}

/* 🔽 CUSTOM SCROLLBAR (Slim & Gold) */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #050505;
}
::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #D4AF37;
}

/* 🎞️ CINEMATIC FADE IN */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}
EOF

# 4. Update Root Layout to use SmoothScroll
# We use a cat command here to ensure the structure is perfect.
cat << 'EOF' > src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

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
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
EOF

echo "✅ SUCCESS: Site is now ultra-smooth."
echo "👉 Don't forget to push: git add . && git commit -m 'feat: add smooth scroll' && git push origin main"