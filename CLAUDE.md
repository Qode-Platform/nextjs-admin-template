@AGENTS.md

# Next.js Admin Template

A Next.js 16 (App Router) admin starter. Stack: TypeScript + React 19, Tailwind CSS v4
with shadcn/ui (Radix primitives, lucide icons), Auth.js v5 (`next-auth`, Google OAuth
with a role-based admin guard), TanStack Table v8, Recharts, and react-hook-form + zod.
There is no backend — data is mocked in `src/lib/api.ts`.

## File structure

All source lives under `src/`. Config files sit at the project root.

```
src/
  app/
    layout.tsx                       Root layout (Geist fonts, globals.css)
    page.tsx                         Dashboard at `/` (stats, revenue chart, users DataTable)
    globals.css                      Tailwind v4 + theme tokens
    columns.tsx                      TanStack column defs for the users table
    (admin)/
      dashboard/page.tsx             Dashboard at `/dashboard` (stats + chart + activity)
    admin/(admin)/
      layout.tsx                     Admin shell (AppShell: sidebar + top bar) for `/admin/*`
      dashboard/page.tsx             Dashboard at `/admin/dashboard`
    (auth)/
      login/page.tsx                 Google sign-in at `/login`
    api/auth/[...nextauth]/route.ts  Auth.js GET/POST handlers
  components/
    layout/
      AppShell.tsx                   Responsive shell (collapsible sidebar + mobile Sheet)
      Sidebar.tsx                    Nav (`navItems`), collapse toggle, account footer
      TopBar.tsx                     Breadcrumbs + account dropdown
    dashboard/
      DashboardStats.tsx             Stat cards
      RevenueChart.tsx               Recharts revenue area chart
      ActivityTable.tsx              Recent-activity list
    ui/                              shadcn/ui primitives (button, card, dialog, table,
                                     data-table, form, input, select, tabs, sheet, ...)
  lib/
    api.ts                           Mock data + `User`/`MonthlyMetric`/`ActivityItem` types
    auth.ts                          Auth.js config (Google provider, admin-role callback)
    utils.ts                         `cn()` class-merge helper
  types/
    next-auth.d.ts                   Session/JWT `role` augmentation

middleware.ts                        Auth guard for `/admin/*` and `/login` (project root)
components.json                      shadcn/ui config (style, aliases)
.env.example                        Required environment variables
```

Route groups `(admin)`, `admin/(admin)`, and `(auth)` are parentheses-wrapped, so they
do not appear in the URL; only the `admin/` segment does. The rich dashboard currently
lives at `/` and `/dashboard`; `/admin/dashboard` is the placeholder wired into the admin
shell. `Users`, `Analytics`, `Settings`, and `Templates` appear in the sidebar nav but
are not yet implemented as routes.

## Conventions

- **`src/` layout** — all source under `src/app/` (routes), `src/components/` (UI), and
  `src/lib/` (logic/data). Import via the `@/*` alias (e.g. `@/components/ui/button`).
- **Server components by default** — add `"use client"` only for interactivity (state,
  hooks, event handlers, charts). See `Sidebar.tsx`/`TopBar.tsx` (client) vs the server
  dashboards under `(admin)`.
- **Mock data** lives in `src/lib/api.ts`. It is deterministic (no `Date.now()`/`Math.random()`)
  so fixtures stay stable across renders. Replace these functions to connect a real API.
- **shadcn/ui** — add components with `pnpm dlx shadcn@latest add <name>`; they land in
  `src/components/ui/`. Config is `components.json`.
- **Auth** — configured in `src/lib/auth.ts` (Auth.js v5). The route handler is
  `src/app/api/auth/[...nextauth]/route.ts`; the guard is `middleware.ts` at the project
  root. Admin role is granted to emails in the `ADMIN_EMAILS` env var.
- **Forms** — use react-hook-form + zod with the shadcn `form` primitives.

## Adding a page

1. Create `src/app/admin/(admin)/your-page/page.tsx` — it inherits the sidebar and top
   bar from the `(admin)` layout automatically.
2. Add a nav entry to `navItems` in `src/components/layout/Sidebar.tsx`
   (`{ label, href, icon }`, icon from `lucide-react`).
3. Keep it a server component unless it needs interactivity, then add `"use client"`.

## Commands

- `pnpm dev` — dev server
- `pnpm build` — production build (must pass before opening a PR)
- `pnpm lint` — ESLint
