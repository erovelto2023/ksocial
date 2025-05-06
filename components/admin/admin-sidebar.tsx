"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, FileText, Home, Settings, Users, MessageCircle, Heart, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function AdminSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      label: "Users",
      icon: Users,
      href: "/admin/users",
      active: pathname === "/admin/users",
    },
    {
      label: "Blog",
      icon: FileText,
      href: "/admin/blog",
      active: pathname.startsWith("/admin/blog"),
    },
    {
      label: "Healing Rooms",
      icon: Heart,
      href: "/admin/healing-rooms",
      active: pathname.startsWith("/admin/healing-rooms"),
    },
    {
      label: "Support Circles",
      icon: MessageCircle,
      href: "/admin/support-circles",
      active: pathname.startsWith("/admin/support-circles"),
    },
    {
      label: "Journal Prompts",
      icon: BookOpen,
      href: "/admin/journal-prompts",
      active: pathname.startsWith("/admin/journal-prompts"),
    },
    {
      label: "Analytics",
      icon: BarChart,
      href: "/admin/analytics",
      active: pathname === "/admin/analytics",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      active: pathname === "/admin/settings",
    },
  ]

  return (
    <div className="flex h-full w-[240px] flex-col border-r bg-background">
      <div className="flex flex-col gap-2 p-4">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={route.active ? "secondary" : "ghost"}
            className={cn("justify-start gap-2", route.active && "bg-secondary")}
            asChild
          >
            <Link href={route.href}>
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
