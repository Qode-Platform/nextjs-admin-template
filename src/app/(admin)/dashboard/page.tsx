import { ActivityTable } from "@/components/dashboard/ActivityTable"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { RevenueChart } from "@/components/dashboard/RevenueChart"
import { getMetrics, getRecentActivity } from "@/lib/api"

export default function DashboardPage() {
  const metrics = getMetrics()
  const activity = getRecentActivity()

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-6 py-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Overview of key metrics and recent activity.
        </p>
      </div>
      <DashboardStats metrics={metrics} />
      <RevenueChart data={metrics} />
      <ActivityTable items={activity} />
    </div>
  )
}
