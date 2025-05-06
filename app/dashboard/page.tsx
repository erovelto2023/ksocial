import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Users, MessageCircle, Heart, Brain } from "lucide-react"
import Link from "next/link"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {session?.user?.name}</h1>
        <p className="text-muted-foreground">Here's an overview of your healing journey and community activities.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healing Sessions</CardTitle>
            <Sparkles className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Upcoming sessions this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Groups</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Active group memberships</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Journal Entries</CardTitle>
            <Brain className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Entries in the past month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Unread messages</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Daily Affirmation</CardTitle>
            <CardDescription>Your personal affirmation for today</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium italic text-center py-4">
              "I am open to receiving healing energy and positive vibrations from the universe."
            </p>
            <Button variant="outline" className="w-full mt-2">
              Generate New Affirmation
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Healing sessions and community gatherings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Group Meditation</h4>
                <p className="text-sm text-muted-foreground">Tomorrow, 7:00 PM</p>
              </div>
              <Button variant="outline" size="sm">
                Join
              </Button>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Chakra Balancing Workshop</h4>
                <p className="text-sm text-muted-foreground">Saturday, 10:00 AM</p>
              </div>
              <Button variant="outline" size="sm">
                Join
              </Button>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Energy Healing Circle</h4>
                <p className="text-sm text-muted-foreground">Sunday, 6:00 PM</p>
              </div>
              <Button variant="outline" size="sm">
                Join
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gratitude Wall</CardTitle>
            <CardDescription>Recent gratitude posts from the community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">M</span>
                </div>
                <p className="text-sm font-medium">Maria S.</p>
              </div>
              <p className="text-sm">Grateful for the support of this community during my healing journey.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">J</span>
                </div>
                <p className="text-sm font-medium">James T.</p>
              </div>
              <p className="text-sm">Thankful for the peace I found through the meditation sessions.</p>
            </div>
            <Link
              href="/dashboard/gratitude"
              className="flex items-center text-sm text-purple-600 hover:text-purple-700"
            >
              <Heart className="mr-1 h-4 w-4" />
              Share your gratitude
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
