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

### Sanity Studio

```bash
cd portfolio
npm install
npm run dev
```

Studio runs on http://localhost:3333 (project `gy3g0tff`, dataset `production`). Schemas live in `portfolio/schemaTypes/`.

## Content

Without Sanity env vars, content loads from `src/shared/cms/seed.ts` (projects, articles, testimonials, portraits).

Portraits live in `public/portraits/`:

- `avatar.jpg` — home profile
- `about.jpg` — about hero
- `play.jpg` — lab “you are here” card

### Connect Sanity

1. Copy `.env.example` → `.env.local` and set (Vite gives `.env.local` priority over `.env`):

```
VITE_SANITY_PROJECT_ID=gy3g0tff
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2025-01-01
```

2. Keep the `production` dataset public: this browser app reads published content without a token. Add `http://localhost:5173` (or the actual Vite origin) and your production URL under Sanity → API → CORS origins. Never put a Sanity API token in a `VITE_` variable.
3. Run `npm run dev:studio` and create and **publish** `siteSettings`, `project`, `article`, `testimonial`, and `skill` documents. Projects and articles need a generated slug; articles also need a publication date. Their `body` arrays contain plain-text paragraphs, matching the frontend's `string[]` renderer. Article `cover` is currently reserved; article cards use `coverGradient`.
4. Restart Vite after changing env files, and rebuild/redeploy after changing hosting env variables.

The Studio and CLI share project settings in `portfolio/project.ts`. The older `sanity/` files re-export the Studio schemas for compatibility. If you switch Sanity projects or datasets, update both `portfolio/project.ts` and the frontend env variables.

Leave `VITE_SANITY_PROJECT_ID` blank to force seed-only mode. Missing/invalid configuration, query failures, and empty collections fall back to seed content independently. Partial site settings inherit missing fields from the seed; an explicit empty socials array stays empty. If multiple settings documents exist, the most recently updated published document wins. Project cover uploads take priority over `coverImageUrl`; missing covers show the gradient. CMS collections replace their seed collection once they contain usable documents, so CMS and seed detail routes are not mixed.

Verify the frontend and Studio after installing dependencies in both directories:

```bash
npm run test:cms
npm run lint
npm run build
npm run build:studio
```

The CMS tests evaluate the actual GROQ queries locally using the Studio's `groq-js` dependency and cover sparse content, image references, routing, and seed fallback. They do not verify hosted dataset permissions or CORS.

## Deploy (Vercel)

1. Import the repo on Vercel.
2. Build command: `npm run build` · Output: `dist`
3. Add Sanity env vars if using the CMS.
4. Deploy Studio separately with `cd portfolio && npx sanity deploy`, or host it as its own service. Studio auto-updates are enabled; the CLI currently has no deployment `appId`. After registering a deployed Studio in Sanity Manage, add its assigned `appId` to `portfolio/sanity.cli.ts` to control the runtime version/channel. Until then, builds warn and use the latest compatible runtime, which can differ from the installed local version.

## Accessibility

- Skip link, focus styles, semantic landmarks
- `prefers-reduced-motion`: GSAP skipped; `/play` offers a non-3D fallback with the same mini-games
