"use client"

import { useState } from "react"
import { ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Session = {
  id: string
  device: string
  location: string
  lastActive: string
  current: boolean
}

const sessions: Session[] = [
  {
    id: "sess-1",
    device: "MacBook Pro · Chrome",
    location: "San Francisco, US",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "sess-2",
    device: "iPhone 15 · Safari",
    location: "San Francisco, US",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "sess-3",
    device: "Windows 11 · Edge",
    location: "London, UK",
    lastActive: "3 days ago",
    current: false,
  },
]

export function SecurityTab() {
  const [twoFactor, setTwoFactor] = useState(false)

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Two-factor authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account at sign-in.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-muted">
              <ShieldCheck className="size-5 text-muted-foreground" />
            </span>
            <div className="grid gap-1">
              <Label htmlFor="two-factor">Authenticator app</Label>
              <p className="text-sm text-muted-foreground">
                {twoFactor
                  ? "Two-factor authentication is on."
                  : "Two-factor authentication is off."}
              </p>
            </div>
          </div>
          <Switch
            id="two-factor"
            checked={twoFactor}
            onCheckedChange={setTwoFactor}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active sessions</CardTitle>
          <CardDescription>
            Devices currently signed in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last active</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {session.device}
                      {session.current && (
                        <Badge variant="outline">This device</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {session.location}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {session.lastActive}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={session.current}
                    >
                      Revoke
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
