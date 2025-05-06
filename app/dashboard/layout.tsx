import type { ReactNode } from "react"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { getMockSession } from "@/lib/mock-session"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  // For preview, we'll use a mock user session
  const session = getMockSession("user")

  // In a real app, you would use:
  // const session = await getServerSession(authOptions)
  // if (!session) {
  //   redirect("/auth/signin")
  // }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={session.user} />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
