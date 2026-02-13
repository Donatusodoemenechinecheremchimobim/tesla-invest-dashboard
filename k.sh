#!/bin/bash

echo "🏷️ RENAMING NAVBAR BUTTON: 'Client Portal' -> 'InvestmentTesla'..."

# Update src/components/intro/IntroNavbar.tsx
sed -i 's/Client Portal/InvestmentTesla/g' src/components/intro/IntroNavbar.tsx
sed -i 's/Access Portal/Access InvestmentTesla/g' src/components/intro/IntroNavbar.tsx

echo "✅ SUCCESS: Button renamed to InvestmentTesla."