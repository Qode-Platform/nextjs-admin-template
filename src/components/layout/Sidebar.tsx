"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  LayoutDashboard,
  Layout,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Templates", href: "/admin/templates", icon: Layout },
]

type SidebarProps = {
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  /** When true, renders for the mobile drawer: always full-width, no collapse toggle. */
  isMobile?: boolean
}

export default function Sidebar({
  isCollapsed = false,
  onToggleCollapse,
  isMobile = false,
}: SidebarProps) {
  const pathname = usePathname()
  const collapsed = !isMobile && isCollapsed

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div
        className={cn(
          "flex h-14 items-center border-b border-sidebar-border px-4",
          collapsed && "justify-center px-2"
        )}
      >
        <span
          className={cn(
            "font-heading text-base font-semibold whitespace-nowrap",
            collapsed && "sr-only"
          )}
        >
          Admin
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span className={cn(collapsed && "sr-only")}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-2">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2",
            collapsed && "justify-center px-2"
          )}
        >
          <Avatar className="size-8 shrink-0">
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className={cn("min-w-0 flex-1", collapsed && "sr-only")}>
            <p className="truncate text-sm font-medium">Admin User</p>
            <p className="truncate text-xs text-sidebar-foreground/60">
              admin@example.com
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          className={cn(
            "mt-1 w-full justify-start gap-3 text-sidebar-foreground/70",
            collapsed && "justify-center"
          )}
          title={collapsed ? "Sign out" : undefined}
        >
          <LogOut className="size-4 shrink-0" />
          <span className={cn(collapsed && "sr-only")}>Sign out</span>
        </Button>

        {!isMobile && onToggleCollapse && (
          <Button
            variant="ghost"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "mt-1 w-full justify-start gap-3 text-sidebar-foreground/70",
              collapsed && "justify-center"
            )}
            title={collapsed ? "Expand sidebar" : undefined}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="size-4 shrink-0" />
            ) : (
              <PanelLeftClose className="size-4 shrink-0" />
            )}
            <span className={cn(collapsed && "sr-only")}>Collapse</span>
          </Button>
        )}
      </div>
    </div>
  )
}
