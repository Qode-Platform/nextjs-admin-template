"use client"

import * as React from "react"
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { type ColumnDef, DataTable } from "@/components/ui/data-table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type User } from "@/lib/api"
import {
  AddUserDialog,
  type UserFormValues,
} from "@/components/users/AddUserDialog"

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

const roleBadgeVariant: Record<
  User["role"],
  "default" | "secondary" | "outline"
> = {
  admin: "default",
  user: "secondary",
  viewer: "outline",
}

function buildColumns(onDelete: (id: string) => void): ColumnDef<User>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="flex items-center gap-3">
            <Avatar size="sm">
              <AvatarFallback>{initials(user.name)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{user.name}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.getValue("email")}</span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue<User["role"]>("role")
        return (
          <Badge variant={roleBadgeVariant[role]} className="capitalize">
            {role}
          </Badge>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue<User["status"]>("status")
        return (
          <Badge
            variant={status === "active" ? "default" : "secondary"}
            className="capitalize"
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.getValue("createdAt")}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Open actions menu"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <Eye className="size-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Pencil className="size-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => onDelete(user.id)}
              >
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

function nextUserId(users: User[]): string {
  const maxId = users.reduce((max, user) => {
    const numeric = Number.parseInt(user.id.replace(/\D/g, ""), 10)
    return Number.isNaN(numeric) ? max : Math.max(max, numeric)
  }, 0)
  return `usr_${(maxId + 1).toString().padStart(3, "0")}`
}

export function UsersTable({ data }: { data: User[] }) {
  const [users, setUsers] = React.useState<User[]>(data)

  const handleAddUser = React.useCallback((values: UserFormValues) => {
    setUsers((current) => [
      {
        id: nextUserId(current),
        name: values.name,
        email: values.email,
        role: values.role,
        status: values.status,
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...current,
    ])
  }, [])

  const handleDeleteUser = React.useCallback((id: string) => {
    setUsers((current) => current.filter((user) => user.id !== id))
  }, [])

  const columns = React.useMemo(
    () => buildColumns(handleDeleteUser),
    [handleDeleteUser]
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddUserDialog onAddUser={handleAddUser} />
      </div>
      <DataTable columns={columns} data={users} searchKey="name" />
    </div>
  )
}
