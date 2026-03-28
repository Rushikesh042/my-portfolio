# Rushikesh Bodhe — Portfolio

Premium personal portfolio for an AI/ML Engineer. Built with React 18, TypeScript, Vite, Three.js / React Three Fiber, and GSAP.

## Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| 3D | Three.js · @react-three/fiber · @react-three/drei |
| Animation | GSAP 3 + ScrollTrigger |
| Smooth scroll | Lenis |
| Styling | Pure CSS (custom properties, glassmorphism) |

## Folder Structure

```
src/
├── components/
│   ├── Cursor/             # Custom magnetic cursor (desktop)
│   ├── Loader/             # Animated loading screen
│   ├── Navbar/             # Sticky nav with active-section tracking
│   ├── three/
│   │   ├── HeroScene.tsx       # R3F canvas wrapper
│   │   └── NeuralNetwork.tsx   # Interactive 3D neural graph
│   ├── Hero/               # Landing section + typewriter roles
│   ├── About/              # Bio, stats, education cards
│   ├── WhatIDo/            # Services / capabilities grid
│   ├── Experience/         # Career timeline + certifications
│   ├── Projects/           # Featured project cards
│   ├── TechStack/          # Tech categories with hover effects
│   ├── Publications/       # Papers + awards
│   └── Contact/            # Contact form + social links + footer
├── data/
│   └── content.ts          # All personalised copy lives here
├── hooks/
│   └── useScrollReveal.ts  # GSAP + ScrollTrigger reveal helpers
├── styles/
│   └── globals.css         # Design tokens, utilities, base styles
├── App.tsx
└── main.tsx
```

## Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:5173

# 3. Type-check
npx tsc --noEmit

# 4. Production build
npm run build

# 5. Preview production build
npm run preview
```

## Update Content

All personal content is centralised in **`src/data/content.ts`**. Edit that file to update:

- Name, tagline, contact details
- Hero copy and CTA
- About bio and stats
- Experience entries
- Projects
- Tech stack categories
- Publications and awards
- Contact info

No other files need to be modified for content changes.

## Deploy to Vercel

```bash
# Option 1 — Vercel CLI
npm i -g vercel
vercel            # follow prompts; select the project root
vercel --prod     # promote to production

# Option 2 — GitHub integration
# Push to GitHub, connect repo at vercel.com, auto-deploys on push
```

No extra Vercel configuration needed — Vite projects are auto-detected.

## Deploy to Netlify

```bash
# Option 1 — Netlify CLI
npm i -g netlify-cli
netlify init
netlify deploy --prod --dir=dist

# Option 2 — Drag and drop
npm run build
# Upload the dist/ folder at app.netlify.com/drop

# Option 3 — GitHub integration
# Connect repo: Build command: npm run build, Publish dir: dist
```

Add a `netlify.toml` for SPA routing:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## CV File

Place your CV at `public/Rushikesh_Bodhe_CV.pdf` for the download button to work.

## Performance Notes

- Three.js vendor chunk is ~270 KB gzipped — expected for a 3D portfolio
- 3D scene uses `dpr={[1, 1.5]}` to cap pixel ratio on high-DPI displays
- Mobile gets reduced 3D opacity for battery efficiency
- ScrollTrigger animations fire once per element (`toggleActions: play none none none`)

## Accessibility

- Semantic HTML5 sections with `aria-labelledby`
- `aria-hidden` on all decorative and 3D elements
- `aria-live` on typewriter role cycle
- Focus-visible ring on all interactive elements
- Screen-reader-only text for icon-only controls
- Form labels, `required`, and `aria-required` on all inputs
