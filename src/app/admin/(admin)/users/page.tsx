import { UsersTable } from "@/components/users/UsersTable"
import { getUsers } from "@/lib/api"

export default function UsersPage() {
  const users = getUsers()

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-muted-foreground mt-1">
          Manage your team members and their access.
        </p>
      </div>
      <UsersTable data={users} />
    </div>
  )
}
