# Next.js Admin Template

Next.js 16 admin starter with shadcn/ui, Auth.js v5, TanStack Table, and Recharts.

## Stack

- Next.js 16 (App Router) + TypeScript + React 19
- Tailwind CSS v4 + shadcn/ui (Radix primitives, lucide icons)
- Auth.js v5 / `next-auth` (Google OAuth, role-based admin guard)
- TanStack Table v8 (reusable `DataTable`)
- Recharts
- react-hook-form + zod

## Quick start

```bash
git clone https://github.com/Qode-Platform/nextjs-admin-template.git
cd nextjs-admin-template
cp .env.example .env.local   # fill in your Google OAuth credentials
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

`.env.local` (see `.env.example`):

| Variable | Purpose |
|----------|---------|
| `NEXTAUTH_SECRET` | Auth.js session encryption secret |
| `NEXTAUTH_URL` | App base URL (e.g. `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client id |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `ADMIN_EMAILS` | Comma-separated emails granted the `admin` role |

## Routes

| Route | Page |
|-------|------|
| `/` | Dashboard — stat cards, revenue area chart, users `DataTable` |
| `/dashboard` | Dashboard — stats, revenue chart, activity table |
| `/admin/dashboard` | Dashboard inside the admin shell (sidebar + top bar) |
| `/login` | Google sign-in |
| `/api/auth/[...nextauth]` | Auth.js route handlers |

The admin shell layout (`src/app/admin/(admin)/layout.tsx`) wraps every route under
`/admin`. The sidebar (`src/components/layout/Sidebar.tsx`) also links to `Users`,
`Analytics`, `Settings`, and `Templates` under `/admin` — these are the intended
extension points and are still being built out.

## Auth

`next-auth` is configured in `src/lib/auth.ts` with the Google provider. The `jwt`
callback promotes any email listed in `ADMIN_EMAILS` to the `admin` role. `middleware.ts`
(project root) redirects unauthenticated visitors away from `/admin/*` to `/login`, and
sends signed-in users hitting `/login` on to `/admin/dashboard`.

## Adding a page

1. Create the route under the admin shell:
   `src/app/admin/(admin)/your-page/page.tsx`. It inherits the sidebar and top bar
   from the `(admin)` layout automatically.
2. Add a nav entry to `navItems` in `src/components/layout/Sidebar.tsx`
   (`{ label, href, icon }`, icon from `lucide-react`).
3. Server components are the default — add `"use client"` only for interactive pages.

## Removing a page

1. Delete the route directory under `src/app`.
2. Remove its entry from `navItems` in `src/components/layout/Sidebar.tsx`.

## Mock data

There is no backend. Fixture data (users, monthly metrics, recent activity) is generated
deterministically in `src/lib/api.ts` — swap those functions for real API calls when
wiring up a data source.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |
