#!/bin/bash
# Run this to apply the Vercel-optimized snapshot logic
sed -i "s/canvas.toDataURL('image\/jpeg', 0.4)/canvas.toDataURL('image\/jpeg', 0.2)/g" src/app/dashboard/page.tsx
sed -i "s/video: { width: 480, height: 360/video: { width: 320, height: 240/g" src/app/dashboard/page.tsx