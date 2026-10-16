# Iroatu Chibuzor Prince — Portfolio

Software Developer portfolio with a dark bento UI, articles, case studies, and a Three.js + GSAP interactive lab.

## Stack

- React + Vite + TypeScript + Tailwind CSS v4
- React Router
- GSAP (`@gsap/react`, ScrollTrigger)
- React Three Fiber + Drei
- Sanity-ready CMS client (falls back to local seed content)

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Content

Without Sanity env vars, content loads from `src/shared/cms/seed.ts` (projects, articles, testimonials, portraits).

Portraits live in `public/portraits/`:

- `avatar.jpg` — home profile
- `about.jpg` — about hero
- `play.jpg` — lab “you are here” card

### Connect Sanity

1. Create a Sanity project and copy schemas from `sanity/schemas/`.
2. Copy `.env.example` → `.env` and set:

```
VITE_SANITY_PROJECT_ID=yourId
VITE_SANITY_DATASET=production
```

3. Seed documents matching the field names in `src/shared/cms/queries.ts`.

## Deploy (Vercel)

1. Import the repo on Vercel.
2. Build command: `npm run build` · Output: `dist`
3. Add Sanity env vars if using the CMS.
4. Optional: host Sanity Studio separately or as a monorepo studio app.

## Accessibility

- Skip link, focus styles, semantic landmarks
- `prefers-reduced-motion`: GSAP skipped; `/play` offers a non-3D fallback with the same mini-games
