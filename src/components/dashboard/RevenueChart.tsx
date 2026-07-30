"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
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
import type { MonthlyMetric } from "@/lib/api"

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const number = new Intl.NumberFormat("en-US")

interface TooltipEntry {
  dataKey: string
  value: number
  color: string
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: TooltipEntry[]
  label?: string
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border bg-card p-3 text-sm shadow-md ring-1 ring-foreground/10">
      <p className="mb-2 font-medium">{label}</p>
      <ul className="space-y-1">
        {payload.map((entry) => (
          <li key={entry.dataKey} className="flex items-center gap-2">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="capitalize text-muted-foreground">
              {entry.dataKey}
            </span>
            <span className="ml-auto font-medium">
              {entry.dataKey === "revenue"
                ? currency.format(entry.value)
                : number.format(entry.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function RevenueChart({ data }: { data: MonthlyMetric[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue &amp; Users</CardTitle>
        <CardDescription>
          Monthly revenue and active users over the year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 8, right: 12, left: 4, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.2}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                yAxisId="revenue"
                tickLine={false}
                axisLine={false}
                width={52}
                tickFormatter={(value) =>
                  `$${Math.round(Number(value) / 1000)}k`
                }
              />
              <YAxis
                yAxisId="users"
                orientation="right"
                tickLine={false}
                axisLine={false}
                width={48}
                tickFormatter={(value) => number.format(Number(value))}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                yAxisId="users"
                type="monotone"
                dataKey="users"
                stroke="var(--chart-2)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
