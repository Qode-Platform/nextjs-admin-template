"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AccountTab } from "@/components/settings/AccountTab"
import { NotificationsTab } from "@/components/settings/NotificationsTab"
import { ProfileTab } from "@/components/settings/ProfileTab"
import { SecurityTab } from "@/components/settings/SecurityTab"

export function SettingsTabs() {
  return (
    <Tabs defaultValue="profile" className="mt-6">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ProfileTab />
      </TabsContent>
      <TabsContent value="account">
        <AccountTab />
      </TabsContent>
      <TabsContent value="notifications">
        <NotificationsTab />
      </TabsContent>
      <TabsContent value="security">
        <SecurityTab />
      </TabsContent>
    </Tabs>
  )
}
