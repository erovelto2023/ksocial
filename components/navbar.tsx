"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-purple-600">KSocial</span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link">Community</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>User Profiles</DropdownMenuItem>
              <DropdownMenuItem>Private Messaging</DropdownMenuItem>
              <DropdownMenuItem>Public Forums</DropdownMenuItem>
              <DropdownMenuItem>Healing Groups</DropdownMenuItem>
              <DropdownMenuItem>Support Circles</DropdownMenuItem>
              <DropdownMenuItem>Story Sharing</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link">Healing Practices</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Virtual Healing Rooms</DropdownMenuItem>
              <DropdownMenuItem>Live Group Sessions</DropdownMenuItem>
              <DropdownMenuItem>One-on-One Bookings</DropdownMenuItem>
              <DropdownMenuItem>Meditations</DropdownMenuItem>
              <DropdownMenuItem>Chakra Guides</DropdownMenuItem>
              <DropdownMenuItem>Energy Tools</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link">Self-Growth</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Healing Journals</DropdownMenuItem>
              <DropdownMenuItem>Dream Journal</DropdownMenuItem>
              <DropdownMenuItem>Shadow Work Prompts</DropdownMenuItem>
              <DropdownMenuItem>Gratitude Wall</DropdownMenuItem>
              <DropdownMenuItem>Self-Care Planner</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link">Meditation & Mindfulness</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Meditation Library</DropdownMenuItem>
              <DropdownMenuItem>Meditation Timer</DropdownMenuItem>
              <DropdownMenuItem>Sound Baths</DropdownMenuItem>
              <DropdownMenuItem>Breathwork Exercises</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="link">More Features</Button>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost">Sign In</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Sign Up</Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle Menu"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="container md:hidden py-4 pb-6">
          <nav className="flex flex-col gap-4">
            <Button variant="ghost" className="justify-start">
              Community
            </Button>
            <Button variant="ghost" className="justify-start">
              Healing Practices
            </Button>
            <Button variant="ghost" className="justify-start">
              Self-Growth
            </Button>
            <Button variant="ghost" className="justify-start">
              Meditation & Mindfulness
            </Button>
            <Button variant="ghost" className="justify-start">
              More Features
            </Button>
            <div className="flex flex-col gap-2 mt-4">
              <Button variant="outline">Sign In</Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Sign Up</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
