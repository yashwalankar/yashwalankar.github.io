# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `yashwalankar/` subdirectory:

```bash
cd yashwalankar

npm start        # dev server (localhost:3000)
npm run build    # production build → build/
npm test         # run tests
npm run deploy   # build + push to gh-pages branch (deploys to GitHub Pages)
```

## Architecture

Two top-level directories:
- `yashwalankar/` — React + TypeScript SPA (Create React App), deploys to GitHub Pages
- `backend/` — Vercel serverless functions, deploy separately to Vercel (point Vercel at this folder)

### Frontend (`yashwalankar/`)

**Paper design** — warm off-white editorial aesthetic. Theme constants `T` and font constants `F` are defined at the top of `App.tsx`.

**Key source files:**
- `src/deets.tsx` — all content: `personalInfo` (name, bio, experience, hardware rack, toolkit, projects, homelab services), `writingPosts`, `notes`. **Edit this file to update any displayed content.**
- `src/App.tsx` — all UI components. `PortfolioCard` manages collapsed (intro card) vs expanded (left-rail + tabbed content) state.
- `src/api.ts` — thin fetch wrappers for backend calls (`submitContact`, `trackResumeDownload`, `incrementViewCount`). Set `REACT_APP_API_URL` env var to the Vercel backend URL in production.

**UI patterns:**
- `framer-motion` `AnimatePresence` for intro↔expanded transitions and section tab switches
- Inline styles throughout (no CSS-in-JS, no Tailwind). `App.css` only adds a scroll-hide utility class `.paper-scroll`.
- `useIsMobile(640)` drives responsive layout — desktop shows a 240px left rail + 640px content pane; mobile shows compact header + scrollable pill tabs.
- 5 sections: About, Projects, Homelab, Writing, Contact

### Backend (`backend/`)

Vercel serverless functions in `backend/api/`:
- `contact.ts` — POST, validates fields, **mocked** (TODO: wire up Resend/SendGrid)
- `analytics.ts` — GET/POST view counter, **mocked** in-memory (TODO: wire up Vercel KV or Upstash)
- `resume.ts` — POST download tracker, **mocked** (TODO: persist to analytics DB)

To develop locally: `cd backend && npm install && npm run dev` (requires Vercel CLI).

**Homelab service logos** live in `src/media/icons/` as PNG files imported directly in `deets.tsx`.

## Deployment

Frontend: `npm run deploy` builds and pushes to the `gh-pages` branch → GitHub Pages.
Backend: point a Vercel project at the `backend/` folder. Set `REACT_APP_API_URL` in the frontend's GitHub Actions / build env to the Vercel deployment URL.

Active development branch: `redesign-2026`; `master` is the base for PRs.
