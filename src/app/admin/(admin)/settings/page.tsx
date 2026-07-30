import { SettingsTabs } from "@/components/settings/SettingsTabs"

export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-muted-foreground mt-1">
        Manage your account preferences and security.
      </p>
      <SettingsTabs />
    </div>
  )
}
