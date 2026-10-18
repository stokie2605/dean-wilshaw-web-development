# AGENTS.md

## Read first

1. The Second memory vault at `C:\Users\Wilshaw\Documents\Second memory`: `AGENTS.md`, then `02 Areas/Task Router.md`, then the project note `01 Projects/Dean Wilshaw Web Development/Dean Wilshaw Web Development.md`.
2. Read only the Task Router row for the job in hand.
3. Follow section 8 of the vault AGENTS.md (Phil's method). Plan first and wait for Dean to say proceed.

Live status (done, waiting, next) lives only in the vault project note. Update it at the end of every session.

## Locked decisions

- Hosting: Vercel (`dean-wilshaw-web-development`, `vite build`, output `dist`) from GitHub (`stokie2605/dean-wilshaw-web-development`). Work on short-lived branches from `main`.
- Stack: React 19, Vite 6, Tailwind CSS v4, TypeScript, React Router v7, Lucide icons, Vercel serverless functions (`api/quote.ts`, `api/health-check.ts`), Express (`server.ts`) for local development, and Resend for email.
- Email and DNS: all site emails send from `dean@designsystemsweb.co.uk` with reply-to headers and colon subjects. DNS stays on Namecheap BasicDNS with ImprovMX forwarding and Resend sending records.
- Site structure: one-page agency site, phone-first, in this order: hero with three interactive phone previews, free Website Health Check (also at `/check`, limited to 5 checks and 2 emails per hour per visitor), What you get, My work, Web apps, How it works, Questions, and closing call to action, plus `/privacy` and `/terms`.
- Removed features stay removed: live client work only in My work. Concept demos, the admin CRM, the pricing section, and the AI chat tools removed on 2026-10-17 stay removed. Red neon, glowing cards, and generic slate phone bezels stay removed. No prices on the site.
- Copy and layout: phone-first layout where multi-column grids stack into a single column on smaller screens. UK English. Zero em dashes, en dashes, spaced hyphens, or decorative emojis in copy.

## Do NOT touch

- `.env`, `.env.local`, and Vercel production secrets (`RESEND_API_KEY`, `PSI_API_KEY`).
- `main` branch directly (use short-lived feature branches).
- Live DNS records on Namecheap without Dean's approval.
- `.agents/rules/design_systems_web.md`.

## Commands

- Install: `npm install`
- Dev: `npm run dev`
- Typecheck: `npm run lint` (`npx tsc --noEmit`)
- Build: `npm run build`
