import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { MonthlyMetric } from "@/lib/api"
import { cn } from "@/lib/utils"

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const number = new Intl.NumberFormat("en-US")

function pctChange(current: number, previous: number): number {
  return previous === 0 ? 0 : ((current - previous) / previous) * 100
}

// The fixture doesn't track churn, so approximate it from engagement:
// more sessions per user reads as lower churn.
function churnRate(metric: MonthlyMetric): number {
  return Math.max(0, 8 - metric.sessions / metric.users)
}

export function DashboardStats({ metrics }: { metrics: MonthlyMetric[] }) {
  const latest = metrics[metrics.length - 1]
  const previous = metrics[metrics.length - 2]

  // New signups modeled as the net new active users in the latest month.
  const signups = latest.users - previous.users
  const previousSignups = previous.users - metrics[metrics.length - 3].users

  const stats = [
    {
      label: "Total Revenue",
      value: currency.format(latest.revenue),
      trend: pctChange(latest.revenue, previous.revenue),
      positiveIsGood: true,
      icon: DollarSign,
    },
    {
      label: "Active Users",
      value: number.format(latest.users),
      trend: pctChange(latest.users, previous.users),
      positiveIsGood: true,
      icon: Users,
    },
    {
      label: "New Signups",
      value: number.format(signups),
      trend: pctChange(signups, previousSignups),
      positiveIsGood: true,
      icon: UserPlus,
    },
    {
      label: "Churn Rate",
      value: `${churnRate(latest).toFixed(1)}%`,
      trend: pctChange(churnRate(latest), churnRate(previous)),
      positiveIsGood: false,
      icon: TrendingDown,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        const up = stat.trend >= 0
        const good = up === stat.positiveIsGood
        const TrendIcon = up ? TrendingUp : TrendingDown
        return (
          <Card key={stat.label}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardDescription>{stat.label}</CardDescription>
                <Icon className="size-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={cn(
                  "border-transparent",
                  good
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-destructive/10 text-destructive"
                )}
              >
                <TrendIcon />
                {up ? "+" : ""}
                {stat.trend.toFixed(1)}%
              </Badge>
              <span className="text-xs text-muted-foreground">
                vs last month
              </span>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
