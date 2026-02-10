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
