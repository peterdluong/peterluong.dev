# peterluong.dev — Codebase Overview

A single-page personal portfolio site for **peterluong.dev**, currently in
active development. This document describes the architecture, structural
conventions, and styling motivations of the source under `my-app/src`.

## Stack & Build Model

The project is a **Create React App (react-scripts 5) + TypeScript** single-page
app, deployed as a fully static bundle to **GitHub Pages** via `gh-pages` against
a custom domain (`CNAME` → peterluong.dev). There is no server or backend — all
state is client-side, and routing is handled in the browser. TypeScript runs in
`strict` mode, targeting ES5 with the modern `react-jsx` transform.

## Application Shell

`index.tsx` composes the app from the outside in, establishing a deliberate
provider ordering:

```
Redux Provider → PersistGate → BrowserRouter → CanvasBackground + (App | Placeholder) + FooterBar
```

Two design decisions live here. First, an animated `CanvasBackground` and a
persistent `FooterBar` sit **outside** the router, so they render once and remain
constant across every route rather than re-mounting on navigation. Second, a
top-level `wip` flag gates the whole experience: when set, the full routed `App`
renders; otherwise a single `Placeholder` "in development" screen is shown. This
is the site's simple release switch while it's being built.

## Routing & Page Structure

`App.tsx` defines the routes with `react-router-dom` v6, mapping paths (`/`,
`/about`, `/projects`, `/resume`, `/fun`, `/three`) to page components. Pages live
under `src/app/pages/`, an App-Router-style convention borrowed by name even
though this is CRA rather than Next.js. Most pages are intentionally thin
scaffolds right now; the substantive ones are `Home` (still CRA boilerplate),
`Projects` (glassmorphism demo), and `Three` (the 3D playground).

## State Management

State is handled with **Redux Toolkit** and kept deliberately minimal — a single
`theme` slice tracking `"light" | "dark"`. The store is wrapped in
**redux-persist** (localStorage), so the visitor's theme choice survives reloads;
the persistence action types are excluded from the serializability check in
middleware config. Theme is read via `useSelector` wherever appearance depends on
it, making light/dark a cross-cutting concern rather than prop-drilled state.

## The Animated Background

`CanvasBackground` is the signature visual element and the most involved piece of
code. It is a fixed, full-viewport `<canvas>` at `z-index: -1` running a
`requestAnimationFrame` particle loop. Dozens of translucent circles (count scaled
to viewport area) drift with capped min/max speeds, apply friction, bounce off
edges, and are gently **attracted toward the cursor** within a radius. A
`RESOLUTION` multiplier oversamples the canvas for crispness on high-DPI displays.
Circle colors are drawn from the brand palette, and both the canvas backdrop and
per-circle opacity **react to the theme** — dark mode dims the particles, light
mode brightens them, with a smooth transition. Particle state is held in refs to
avoid re-renders driving the animation.

## 3D / Three.js

The `/three` route uses **react-three-fiber** + **drei** to render interactive
scenes: auto-rotating and click-to-scale boxes with hover-driven color changes,
plus `OrbitControls` and `useGLTF`-loaded models (a MacBook Pro and Pokémon
`.glb` assets served from `public/`). Models are wrapped in `Suspense` for async
loading. This route reads as an experimental sandbox rather than production UI.

## Styling Approach

Styling is intentionally eclectic and reflects a site mid-evolution:

- **Inline styles** dominate component layout (flexbox arrangements, sizing,
  colors) — fast to iterate, co-located with markup.
- **Per-component CSS files** live beside components (`components/styles/`) and are
  imported directly, used for effects that inline styles handle awkwardly:
  keyframe animations, striped progress bars, and canvas transitions.
- **Tailwind** is installed and wired through `index.css`, but the config is
  otherwise empty and it's barely used — present as scaffolding for a future
  refactor rather than the current styling system.
- A hand-rolled **glassmorphism** utility (`.glass` in `App.css`) — blurred
  backdrop, translucency, soft shadow, rounded corners — signals the intended
  visual direction for content cards.

Brand identity is centralized in `assets/Brand.ts`: a primary palette of
**green (#50C878), orange (#FB9A54), blue (#00C5FF)** with green-based secondaries.
These colors recur across the particle background, the `PLButton` hover state, and
the 3D cube materials, giving the disparate pieces a shared accent language.
Smooth `transition` timings on theme-dependent surfaces are a recurring motif —
color and background changes are eased rather than snapped.

## Folder Conventions

```
src/
  app/pages/       route-level page components
  components/       reusable UI (NavBar, buttons, background, theme toggle)
    styles/         co-located CSS for those components
  redux/
    slices/         feature slices (theme)
    store.ts        store + persistence config
  assets/           brand palette, images, .glb models
  utils/            small helpers (randomness)
  hooks/ types/     reserved for future use
```

## Current State & Intent

This is an **early-stage personal site**: several pages are placeholders, some CRA
boilerplate remains, and commented-out code marks in-progress ideas (a full nav,
progress-bar experiments). The bones, however, express a clear vision — a
theme-aware, animated, brand-consistent portfolio with a playful 3D corner, built
static-first for zero-cost GitHub Pages hosting.
