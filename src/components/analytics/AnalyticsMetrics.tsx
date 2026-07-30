"use client"

import { Area, AreaChart, ResponsiveContainer } from "recharts"
import {
  Eye,
  MousePointerClick,
  Target,
  Timer,
  type LucideIcon,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Metric = {
  label: string
  value: string
  icon: LucideIcon
  spark: { value: number }[]
}

function spark(values: number[]): { value: number }[] {
  return values.map((value) => ({ value }))
}

const metrics: Metric[] = [
  {
    label: "Page Views",
    value: "128,430",
    icon: Eye,
    spark: spark([32, 41, 38, 55, 49, 62, 71]),
  },
  {
    label: "Avg Session Duration",
    value: "3m 42s",
    icon: Timer,
    spark: spark([48, 52, 45, 50, 58, 54, 61]),
  },
  {
    label: "Bounce Rate",
    value: "38.6%",
    icon: MousePointerClick,
    spark: spark([64, 60, 62, 55, 51, 48, 44]),
  },
  {
    label: "Conversion Rate",
    value: "4.8%",
    icon: Target,
    spark: spark([2, 3, 3, 4, 4, 5, 6]),
  },
]

export function AnalyticsMetrics() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.label}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardDescription>{metric.label}</CardDescription>
                <Icon className="size-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">{metric.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-12 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={metric.spark}
                    margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
                  >
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="var(--chart-1)"
                      fill="var(--chart-1)"
                      fillOpacity={0.15}
                      strokeWidth={2}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
