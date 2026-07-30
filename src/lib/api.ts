export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "viewer"
  status: "active" | "inactive"
  createdAt: string
}

export interface MonthlyMetric {
  month: string
  revenue: number
  users: number
  sessions: number
}

export interface ActivityItem {
  id: string
  user: string
  action: string
  timestamp: string
}

const FIRST_NAMES = [
  "Ava",
  "Liam",
  "Olivia",
  "Noah",
  "Emma",
  "Elijah",
  "Sophia",
  "Mateo",
  "Isabella",
  "Lucas",
  "Mia",
  "Ethan",
  "Amelia",
  "James",
  "Harper",
  "Benjamin",
  "Evelyn",
  "Henry",
  "Aria",
  "Sebastian",
]

const LAST_NAMES = [
  "Carter",
  "Nguyen",
  "Patel",
  "Kim",
  "Rossi",
  "Okafor",
  "Silva",
  "Haddad",
  "Novak",
  "Fischer",
  "Yamamoto",
  "Andersson",
  "Costa",
  "Ivanov",
  "Mensah",
  "Reyes",
  "Larsen",
  "Dubois",
  "Khan",
  "Walsh",
]

const ROLES: User["role"][] = ["admin", "user", "viewer"]

function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z]+/g, ".")
}

function pad(value: number): string {
  return value.toString().padStart(2, "0")
}

export function getUsers(): User[] {
  const users: User[] = []
  for (let i = 0; i < 50; i++) {
    const first = FIRST_NAMES[i % FIRST_NAMES.length]
    const last = LAST_NAMES[(i * 7) % LAST_NAMES.length]
    const name = `${first} ${last}`
    // Deterministic spread so the fixture is stable across renders.
    const role = ROLES[i % ROLES.length]
    const status: User["status"] = i % 4 === 0 ? "inactive" : "active"
    const day = pad((i % 27) + 1)
    const month = pad((i % 12) + 1)
    users.push({
      id: `usr_${(i + 1).toString().padStart(3, "0")}`,
      name,
      email: `${slug(name)}${i}@example.com`,
      role,
      status,
      createdAt: `2025-${month}-${day}`,
    })
  }
  return users
}

export function getMetrics(): MonthlyMetric[] {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  return months.map((month, i) => ({
    month,
    revenue: 42000 + i * 3800 + (i % 3) * 1500,
    users: 1200 + i * 145 + (i % 4) * 60,
    sessions: 5400 + i * 620 + (i % 5) * 210,
  }))
}

export function getRecentActivity(): ActivityItem[] {
  const actions = [
    "signed in",
    "updated their profile",
    "created a new project",
    "invited a teammate",
    "exported a report",
    "changed billing plan",
    "deleted an item",
    "left a comment",
    "uploaded a file",
    "archived a workspace",
  ]
  const names = [
    "Ava Carter",
    "Liam Nguyen",
    "Olivia Patel",
    "Noah Kim",
    "Emma Rossi",
    "Elijah Okafor",
    "Sophia Silva",
    "Mateo Haddad",
    "Isabella Novak",
    "Lucas Fischer",
  ]
  return actions.map((action, i) => {
    const hour = pad(9 + (i % 8))
    const minute = pad((i * 7) % 60)
    return {
      id: `act_${(i + 1).toString().padStart(3, "0")}`,
      user: names[i % names.length],
      action,
      // Fixed clock time keeps the fixture deterministic (no Date.now()).
      timestamp: `2025-12-15T${hour}:${minute}:00Z`,
    }
  })
}
