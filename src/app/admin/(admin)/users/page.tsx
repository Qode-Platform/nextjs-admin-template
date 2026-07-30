import { UsersTable } from "@/components/users/UsersTable"
import { getUsers } from "@/lib/api"

export default function UsersPage() {
  const users = getUsers()

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-6 py-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your team members and their access.
        </p>
      </div>
      <UsersTable data={users} />
    </div>
  )
}
