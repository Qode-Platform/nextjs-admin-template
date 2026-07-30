"use client"

import { useState } from "react"
import { LaptopIcon, ShieldIcon, SmartphoneIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Session = {
  id: string
  device: string
  location: string
  lastActive: string
  current: boolean
}

const initialSessions: Session[] = [
  {
    id: "chrome-macos",
    device: "Chrome on macOS",
    location: "San Francisco, US",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "safari-iphone",
    device: "Safari on iPhone",
    location: "San Francisco, US",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "firefox-windows",
    device: "Firefox on Windows",
    location: "London, UK",
    lastActive: "3 days ago",
    current: false,
  },
]

export default function SecurityTab() {
  const [sessions, setSessions] = useState(initialSessions)

  const revoke = (id: string) => {
    setSessions((prev) => prev.filter((session) => session.id !== id))
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldIcon className="size-4" />
            Two-factor authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security by requiring a one-time code from your
            authenticator app when you sign in.
          </CardDescription>
          <CardAction>
            <Button type="button" variant="outline">
              Enable
            </Button>
          </CardAction>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active sessions</CardTitle>
          <CardDescription>
            Devices currently signed in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Device</th>
                <th className="py-2 pr-4 font-medium">Location</th>
                <th className="py-2 pr-4 font-medium">Last active</th>
                <th className="py-2 font-medium">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id} className="border-b last:border-0">
                  <td className="py-3 pr-4">
                    <span className="flex items-center gap-2">
                      {session.device.includes("iPhone") ? (
                        <SmartphoneIcon className="size-4 text-muted-foreground" />
                      ) : (
                        <LaptopIcon className="size-4 text-muted-foreground" />
                      )}
                      {session.device}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {session.location}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {session.lastActive}
                  </td>
                  <td className="py-3 text-right">
                    {session.current ? (
                      <span className="text-xs text-muted-foreground">
                        This device
                      </span>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => revoke(session.id)}
                      >
                        Revoke
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {sessions.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-6 text-center text-sm text-muted-foreground"
                  >
                    No other active sessions.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
