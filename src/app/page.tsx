"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { getMetrics, getRecentActivity, getUsers } from "@/lib/api"
import { userColumns } from "./columns"

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const number = new Intl.NumberFormat("en-US")

export default function DashboardPage() {
  const users = getUsers()
  const metrics = getMetrics()
  const activity = getRecentActivity()

  const latest = metrics[metrics.length - 1]
  const activeUsers = users.filter((user) => user.status === "active").length

  const summary = [
    { label: "Revenue", value: currency.format(latest.revenue) },
    { label: "Users", value: number.format(latest.users) },
    { label: "Sessions", value: number.format(latest.sessions) },
    { label: "Active accounts", value: number.format(activeUsers) },
  ]

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-6 py-10">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of revenue, users, and recent activity.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <CardDescription>{item.label}</CardDescription>
              <CardTitle className="text-2xl">{item.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Monthly revenue over the year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={metrics}
                  margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--primary)"
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--primary)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    width={48}
                    tickFormatter={(value) =>
                      `$${Math.round(Number(value) / 1000)}k`
                    }
                  />
                  <Tooltip
                    formatter={(value) => currency.format(Number(value))}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--primary)"
                    fill="url(#revenue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Latest actions across the team</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {activity.map((item) => (
                <li key={item.id} className="text-sm">
                  <span className="font-medium">{item.user}</span>{" "}
                  <span className="text-muted-foreground">{item.action}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Users</h2>
        <DataTable columns={userColumns} data={users} searchKey="name" />
      </section>
    </main>
  )
}
