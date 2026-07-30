"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(60, "Name must be 60 characters or fewer."),
  bio: z.string().max(160, "Bio must be 160 characters or fewer."),
})

type ProfileValues = z.infer<typeof profileSchema>

export default function ProfileTab() {
  const [saved, setSaved] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "Jane Doe", bio: "Product designer and admin." },
  })

  const onSubmit = handleSubmit(async () => {
    // No backend in this template — reflect the save in the UI.
    setSaved(true)
  })

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Update your public profile information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="profile-name">Name</Label>
            <Input
              id="profile-name"
              aria-invalid={Boolean(errors.name)}
              {...register("name", { onChange: () => setSaved(false) })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="profile-bio">Bio</Label>
            <Textarea
              id="profile-bio"
              rows={4}
              placeholder="Tell us a little about yourself."
              aria-invalid={Boolean(errors.bio)}
              {...register("bio", { onChange: () => setSaved(false) })}
            />
            {errors.bio && (
              <p className="text-sm text-destructive">{errors.bio.message}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isSubmitting}>
              Save changes
            </Button>
            {saved && (
              <span className="text-sm text-muted-foreground">
                Profile saved.
              </span>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
