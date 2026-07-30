export interface TemplateEntry {
  name: string
  route: string
  description: string
  tags: string[]
  sourcePath: string
}

export const templates: TemplateEntry[] = [
  {
    name: "Dashboard",
    route: "/admin/dashboard",
    description: "Stat cards, line chart, and recent activity table",
    tags: ["admin", "charts"],
    sourcePath: "src/app/admin/(admin)/dashboard/page.tsx",
  },
  {
    name: "Users",
    route: "/admin/users",
    description: "Searchable data table with CRUD dialog",
    tags: ["table", "forms"],
    sourcePath: "src/app/admin/(admin)/users/page.tsx",
  },
  {
    name: "Analytics",
    route: "/admin/analytics",
    description: "Charts and metric cards with sparklines",
    tags: ["charts"],
    sourcePath: "src/app/admin/(admin)/analytics/page.tsx",
  },
  {
    name: "Settings",
    route: "/admin/settings",
    description: "Tabbed forms with validation and security",
    tags: ["forms"],
    sourcePath: "src/app/admin/(admin)/settings/page.tsx",
  },
]
