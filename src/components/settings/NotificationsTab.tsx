"use client"

import { useState } from "react"

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

type PreferenceKey =
  | "email"
  | "push"
  | "weeklyDigest"
  | "marketing"
  | "securityAlerts"

type Preference = {
  key: PreferenceKey
  label: string
  description: string
}

const preferences: Preference[] = [
  {
    key: "email",
    label: "Email notifications",
    description: "Receive account activity and updates by email.",
  },
  {
    key: "push",
    label: "Push notifications",
    description: "Get real-time alerts in your browser.",
  },
  {
    key: "weeklyDigest",
    label: "Weekly digest",
    description: "A summary of the week's activity every Monday.",
  },
  {
    key: "marketing",
    label: "Marketing emails",
    description: "Product news, tips, and occasional offers.",
  },
  {
    key: "securityAlerts",
    label: "Security alerts",
    description: "Important notices about sign-ins and security.",
  },
]

const defaultState: Record<PreferenceKey, boolean> = {
  email: true,
  push: false,
  weeklyDigest: true,
  marketing: false,
  securityAlerts: true,
}

export default function NotificationsTab() {
  const [state, setState] = useState(defaultState)
  const [saved, setSaved] = useState(false)

  const toggle = (key: PreferenceKey) => (checked: boolean) => {
    setState((prev) => ({ ...prev, [key]: checked }))
    setSaved(false)
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose how and when we contact you.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col divide-y">
          {preferences.map((preference) => (
            <div
              key={preference.key}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex flex-col gap-1">
                <Label htmlFor={`notify-${preference.key}`}>
                  {preference.label}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {preference.description}
                </p>
              </div>
              <Switch
                id={`notify-${preference.key}`}
                checked={state[preference.key]}
                onCheckedChange={toggle(preference.key)}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" onClick={() => setSaved(true)}>
            Save preferences
          </Button>
          {saved && (
            <span className="text-sm text-muted-foreground">
              Preferences saved.
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
