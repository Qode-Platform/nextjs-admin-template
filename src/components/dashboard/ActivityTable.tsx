import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { ActivityItem } from "@/lib/api"

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function formatRelative(timestamp: string, reference: number): string {
  const minutes = Math.round(
    (reference - new Date(timestamp).getTime()) / 60000
  )
  if (minutes <= 0) return "just now"
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  return `${days}d ago`
}

export function ActivityTable({ items }: { items: ActivityItem[] }) {
  // Anchor "relative" times to the most recent event so the fixture renders
  // deterministically, independent of the wall clock.
  const reference = items.reduce(
    (latest, item) => Math.max(latest, new Date(item.timestamp).getTime()),
    0
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions across the team</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="text-right">When</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <AvatarFallback>{initials(item.user)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{item.user}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {item.action}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatRelative(item.timestamp, reference)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
