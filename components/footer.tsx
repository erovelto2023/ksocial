import Link from "next/link"
import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-8 py-8 md:py-12 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard/profile" className="text-muted-foreground hover:text-foreground">
                  User Profiles
                </Link>
              </li>
              <li>
                <Link href="/dashboard/messages" className="text-muted-foreground hover:text-foreground">
                  Private Messaging
                </Link>
              </li>
              <li>
                <Link href="/dashboard/forums" className="text-muted-foreground hover:text-foreground">
                  Public Forums
                </Link>
              </li>
              <li>
                <Link href="/dashboard/groups" className="text-muted-foreground hover:text-foreground">
                  Healing Groups
                </Link>
              </li>
              <li>
                <Link href="/dashboard/circles" className="text-muted-foreground hover:text-foreground">
                  Support Circles
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Healing Practices</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard/healing-rooms" className="text-muted-foreground hover:text-foreground">
                  Virtual Healing Rooms
                </Link>
              </li>
              <li>
                <Link href="/dashboard/sessions" className="text-muted-foreground hover:text-foreground">
                  Live Group Sessions
                </Link>
              </li>
              <li>
                <Link href="/dashboard/bookings" className="text-muted-foreground hover:text-foreground">
                  One-on-One Bookings
                </Link>
              </li>
              <li>
                <Link href="/dashboard/chakra" className="text-muted-foreground hover:text-foreground">
                  Chakra Guides
                </Link>
              </li>
              <li>
                <Link href="/dashboard/energy-cleansing" className="text-muted-foreground hover:text-foreground">
                  Energy Tools
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Self-Growth</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard/journal" className="text-muted-foreground hover:text-foreground">
                  Healing Journals
                </Link>
              </li>
              <li>
                <Link href="/dashboard/dreams" className="text-muted-foreground hover:text-foreground">
                  Dream Journal
                </Link>
              </li>
              <li>
                <Link href="/dashboard/shadow-work" className="text-muted-foreground hover:text-foreground">
                  Shadow Work
                </Link>
              </li>
              <li>
                <Link href="/dashboard/gratitude" className="text-muted-foreground hover:text-foreground">
                  Gratitude Wall
                </Link>
              </li>
              <li>
                <Link href="/dashboard/self-care" className="text-muted-foreground hover:text-foreground">
                  Self-Care Planner
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Meditation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/meditation-library" className="text-muted-foreground hover:text-foreground">
                  Meditation Library
                </Link>
              </li>
              <li>
                <Link href="/meditation-timer" className="text-muted-foreground hover:text-foreground">
                  Meditation Timer
                </Link>
              </li>
              <li>
                <Link href="/sound-baths" className="text-muted-foreground hover:text-foreground">
                  Sound Baths
                </Link>
              </li>
              <li>
                <Link href="/breathwork" className="text-muted-foreground hover:text-foreground">
                  Breathwork
                </Link>
              </li>
              <li>
                <Link href="/affirmations" className="text-muted-foreground hover:text-foreground">
                  Affirmations
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">More</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/special-features" className="text-muted-foreground hover:text-foreground">
                  Special Features
                </Link>
              </li>
              <li>
                <Link href="/give-back" className="text-muted-foreground hover:text-foreground">
                  Give Back
                </Link>
              </li>
              <li>
                <Link href="/safety-quality" className="text-muted-foreground hover:text-foreground">
                  Safety & Quality
                </Link>
              </li>
              <li>
                <Link href="/monthly-themes" className="text-muted-foreground hover:text-foreground">
                  Monthly Themes
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground"> 2025 KSocial. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-sm text-muted-foreground flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for the healing community
          </p>
        </div>
      </div>
    </footer>
  )
}
