# Wavegodmaxb - Next.js demo copy

This project reproduces the homepage layout using images scraped from https://wavegodmaxb.com and adds a simple client-side e-commerce demo and a prominent "Jon lodge made this" label.

How it works:
- /api/images fetches the homepage and extracts image src attributes. These are used to build product tiles.
- The store is local-only (client-side), cart stored in localStorage. No payment provider is integrated.

To run locally:
1. npm install
2. npm run dev
3. Open http://localhost:3000

To deploy:
- Push to a git provider and import in Vercel. Vercel will detect Next.js and deploy automatically.

Notes & next steps:
- If you want exact markup/typography from the original site, I can extend the CSS to match more closely.
- To add real checkout, connect Stripe or another payment provider and replace the checkout link with a server-side payment session.
- If you want me to add static export or Edge functions for faster scraping/caching, tell me and I’ll update the build.

License: For demo use only — confirm you have permission to reuse any copyrighted content before publishing publicly.