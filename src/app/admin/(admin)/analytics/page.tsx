"use client"

import { AnalyticsMetrics } from "@/components/analytics/AnalyticsMetrics"
import { MonthlyChart } from "@/components/analytics/MonthlyChart"
import { WeeklyChart } from "@/components/analytics/WeeklyChart"

const monthlyData = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
].map((month, i) => ({
  month,
  sessions: 4000 + i * 300,
  pageViews: 8000 + i * 600,
}))

const weeklyData = [
  { day: "Mon", desktop: 420, mobile: 280 },
  { day: "Tue", desktop: 380, mobile: 320 },
  { day: "Wed", desktop: 510, mobile: 290 },
  { day: "Thu", desktop: 460, mobile: 340 },
  { day: "Fri", desktop: 540, mobile: 310 },
  { day: "Sat", desktop: 320, mobile: 390 },
  { day: "Sun", desktop: 290, mobile: 360 },
]

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track traffic, engagement, and conversion trends.
        </p>
      </div>
      <AnalyticsMetrics />
      <MonthlyChart data={monthlyData} />
      <WeeklyChart data={weeklyData} />
    </div>
  )
}
