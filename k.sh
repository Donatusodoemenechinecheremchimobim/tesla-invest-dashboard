#!/bin/bash
echo "🔧 Repairing Styling Engine..."

# 1. Install missing dev dependencies (just in case)
npm install -D tailwindcss postcss autoprefixer

# 2. Force-Create the Tailwind Config (The Brain)
cat << 'EOF' > tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
EOF

# 3. Force-Create PostCSS Config (The Compiler)
cat << 'EOF' > postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
EOF

# 4. Clear Next.js Cache
rm -rf .next

echo "✅ Repairs Complete."
echo "👉 STOP the terminal (Ctrl + C) and run 'npm run dev' again."