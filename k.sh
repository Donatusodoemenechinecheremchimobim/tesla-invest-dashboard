#!/bin/bash

echo "🔗 LINKING 'HOW IT WORKS' TO GROWTH TECH PAGE..."

# Update src/app/page.tsx
# This replaces the previous about link with /technology
sed -i 's|href="/about"|href="/technology"|g' src/app/page.tsx

echo "✅ SUCCESS: 'How It Works' now leads to /technology."