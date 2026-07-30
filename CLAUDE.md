# nextjs-admin-template

A Next.js admin starter kit. This is a **standalone repository** — it is not a
submodule of, or otherwise coupled to, fleet-control.

## Stack

- **Next.js** (App Router, React Server Components) with TypeScript
- **Tailwind CSS** v4 (configured via `@tailwindcss/postcss`; no `tailwind.config` file)
- **shadcn/ui** — components live in `components/ui`, config in `components.json`,
  the `cn()` helper in `lib/utils.ts`
- **Auth.js v5** (planned) — `.env.example` carries the `NEXTAUTH_*` and Google
  OAuth placeholders it expects; the auth wiring itself is not yet in place

## Layout

- `app/` — routes (App Router). `app/page.tsx` redirects to `/admin/dashboard`.
- `components/ui/` — shadcn/ui primitives
- `lib/utils.ts` — shared helpers (`cn`)

## Common commands

- `pnpm dev` — start the dev server
- `pnpm build` — production build
- `pnpm lint` — ESLint

## Notes

Package manager is **pnpm**. Copy `.env.example` to `.env.local` and fill in real
values before running with auth enabled.
