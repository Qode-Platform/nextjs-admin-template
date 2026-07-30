"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type NotificationKey =
  | "productUpdates"
  | "securityAlerts"
  | "weeklyDigest"
  | "mentions"

type NotificationOption = {
  key: NotificationKey
  label: string
  description: string
}

const options: NotificationOption[] = [
  {
    key: "productUpdates",
    label: "Product updates",
    description: "News about features and improvements.",
  },
  {
    key: "securityAlerts",
    label: "Security alerts",
    description: "Sign-ins from new devices and password changes.",
  },
  {
    key: "weeklyDigest",
    label: "Weekly digest",
    description: "A summary of activity from the past week.",
  },
  {
    key: "mentions",
    label: "Mentions",
    description: "When a teammate mentions you in a comment.",
  },
]

const initialState: Record<NotificationKey, boolean> = {
  productUpdates: true,
  securityAlerts: true,
  weeklyDigest: false,
  mentions: true,
}

export function NotificationsTab() {
  const [prefs, setPrefs] = useState(initialState)
  const [saved, setSaved] = useState(false)

  function toggle(key: NotificationKey) {
    setPrefs((current) => ({ ...current, [key]: !current[key] }))
    setSaved(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose which emails you&apos;d like to receive.
        </CardDescription>
      </CardHeader>
      <CardContent className="divide-y divide-border">
        {options.map((option) => (
          <div
            key={option.key}
            className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div className="grid gap-1">
              <Label htmlFor={`notify-${option.key}`}>{option.label}</Label>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </div>
            <Switch
              id={`notify-${option.key}`}
              checked={prefs[option.key]}
              onCheckedChange={() => toggle(option.key)}
            />
          </div>
        ))}
      </CardContent>
      <CardFooter className="mt-6 flex items-center gap-3">
        <Button onClick={() => setSaved(true)}>Save preferences</Button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
            <Check className="size-4" />
            Preferences saved
          </span>
        )}
      </CardFooter>
    </Card>
  )
}
