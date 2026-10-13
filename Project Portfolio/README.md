# Daniel Nguyen — Portfolio

My personal portfolio site. The home page is a hand-built globe whose continents are the navigation; the
Projects section hosts a live demo of my Split Step Counter, a computer vision model that counts a tennis
player's split steps.

## Stack

- React 19 + TypeScript, built with Vite and the React Compiler
- React Router for client-side routing
- tsParticles for the animated background
- Deployed on Vercel (static build, SPA rewrites and security headers in `vercel.json`)

## Running it

Requires Node 20.19 or newer.

```sh
npm install
npm run dev       # local dev server
npm run check     # typecheck, lint and production build; run before pushing
npm run preview   # serve the production build locally
```

## Structure

| Path | What it is |
| --- | --- |
| `src/pages/` | One component per route: Home, About, Projects, Connect, Resume, Project1 (Split Step demo), NotFound |
| `src/components/Earth.tsx` | The globe; each continent is a few clipped CSS shapes, and the labelled ones are links |
| `src/components/ParticlesClass.tsx` | Particle background; holds still for visitors who prefer reduced motion |
| `public/split-step/` | Demo clips and the hop times the detector found in each (`demo-N-hops.json`) |
| `vercel.json` | SPA fallback for page routes only (missing files still 404) and security headers |

## How the Split Step demo works

The detector runs offline in the desktop app. For each demo clip it exports the clip plus a JSON file of the
times (in ms) at which it detected a split step. The web page plays the clip and, on every rendered frame,
counts how many of those times the playhead has passed, lighting the badge for 350 ms after each one.
Uploaded videos play back only, because detection doesn't run in the browser.
