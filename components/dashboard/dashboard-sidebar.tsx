"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Users,
  Sparkles,
  Brain,
  MedalIcon as Meditation,
  Shield,
  LayoutDashboard,
  Calendar,
  BookOpen,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function DashboardSidebar({ user }: { user: any }) {
  const pathname = usePathname()
  const isAdmin = user?.role === "admin"

  return (
    <div className="flex h-full w-full flex-col border-r bg-background">
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent",
              pathname === "/dashboard" ? "bg-accent" : "transparent",
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="community" className="border-b-0">
              <AccordionTrigger className="rounded-lg px-3 py-2 hover:bg-accent hover:no-underline">
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4" />
                  <span>Community</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0 pt-1">
                <div className="grid gap-1">
                  <Link
                    href="/dashboard/profile"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/profile" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href="/dashboard/messages"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/messages" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Messages</span>
                  </Link>
                  <Link
                    href="/dashboard/forums"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/forums" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Forums</span>
                  </Link>
                  <Link
                    href="/dashboard/groups"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/groups" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Healing Groups</span>
                  </Link>
                  <Link
                    href="/dashboard/circles"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/circles" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Support Circles</span>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="healing" className="border-b-0">
              <AccordionTrigger className="rounded-lg px-3 py-2 hover:bg-accent hover:no-underline">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4" />
                  <span>Healing</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0 pt-1">
                <div className="grid gap-1">
                  <Link
                    href="/dashboard/healing-rooms"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/healing-rooms" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Virtual Healing Rooms</span>
                  </Link>
                  <Link
                    href="/dashboard/sessions"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/sessions" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Live Sessions</span>
                  </Link>
                  <Link
                    href="/dashboard/bookings"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/bookings" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>One-on-One Bookings</span>
                  </Link>
                  <Link
                    href="/dashboard/chakra"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/chakra" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Chakra Guides</span>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="growth" className="border-b-0">
              <AccordionTrigger className="rounded-lg px-3 py-2 hover:bg-accent hover:no-underline">
                <div className="flex items-center gap-3">
                  <Brain className="h-4 w-4" />
                  <span>Self-Growth</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0 pt-1">
                <div className="grid gap-1">
                  <Link
                    href="/dashboard/journal"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/journal" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Healing Journal</span>
                  </Link>
                  <Link
                    href="/dashboard/dreams"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/dreams" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Dream Journal</span>
                  </Link>
                  <Link
                    href="/dashboard/shadow-work"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/shadow-work" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Shadow Work</span>
                  </Link>
                  <Link
                    href="/dashboard/emotional-release"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/emotional-release" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Emotional Release</span>
                  </Link>
                  <Link
                    href="/dashboard/grounding"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/grounding" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Grounding Exercises</span>
                  </Link>
                  <Link
                    href="/dashboard/spirit-guides"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/spirit-guides" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Spirit Guide Connection</span>
                  </Link>
                  <Link
                    href="/dashboard/sacred-space"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/sacred-space" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Sacred Space</span>
                  </Link>
                  <Link
                    href="/dashboard/gratitude"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/gratitude" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Gratitude Wall</span>
                  </Link>
                  <Link
                    href="/dashboard/self-care"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/self-care" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Self-Care Planner</span>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="meditation" className="border-b-0">
              <AccordionTrigger className="rounded-lg px-3 py-2 hover:bg-accent hover:no-underline">
                <div className="flex items-center gap-3">
                  <Meditation className="h-4 w-4" />
                  <span>Meditation</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0 pt-1">
                <div className="grid gap-1">
                  <Link
                    href="/dashboard/meditation-library"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/meditation-library" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Meditation Library</span>
                  </Link>
                  <Link
                    href="/dashboard/meditation-timer"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/meditation-timer" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Meditation Timer</span>
                  </Link>
                  <Link
                    href="/dashboard/sound-baths"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/sound-baths" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Sound Baths</span>
                  </Link>
                  <Link
                    href="/dashboard/breathwork"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 pl-9 hover:bg-accent",
                      pathname === "/dashboard/breathwork" ? "bg-accent" : "transparent",
                    )}
                  >
                    <span>Breathwork</span>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            <Link
              href="/dashboard/calendar"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent",
                pathname === "/dashboard/calendar" ? "bg-accent" : "transparent",
              )}
            >
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </Link>

            <Link
              href="/blog"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent",
                pathname === "/blog" ? "bg-accent" : "transparent",
              )}
            >
              <BookOpen className="h-4 w-4" />
              <span>Blog</span>
            </Link>
          </Accordion>

          {isAdmin && (
            <Link
              href="/admin"
              className={cn(
                "mt-4 flex items-center gap-3 rounded-lg bg-purple-100 px-3 py-2 text-purple-900 hover:bg-purple-200",
                pathname.startsWith("/admin") ? "bg-purple-200" : "bg-purple-100",
              )}
            >
              <Shield className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </Link>
          )}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Link href="/dashboard/settings">
          <Button variant="outline" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </div>
    </div>
  )
}
