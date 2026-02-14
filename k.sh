#!/bin/bash

echo "🚀 PUSHING CHANGES TO LIVE..."

git add .
git commit -m "feat: replace static marquee with live market ticker on landing page"
git push origin main

echo "✅ DEPLOYMENT COMPLETE."