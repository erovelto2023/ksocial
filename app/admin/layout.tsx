import type { ReactNode } from "react"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"
import { getMockSession } from "@/lib/mock-session"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // For preview, we'll use a mock admin session
  const session = getMockSession("admin")

  // In a real app, you would use:
  // const session = await getServerSession(authOptions)
  // if (!session || session.user.role !== "admin") {
  //   redirect("/dashboard")
  // }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader user={session.user} />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
