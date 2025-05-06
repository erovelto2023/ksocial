"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Clock, Heart, BookOpen, Users, Brain, Medal, ArrowUpRight, ArrowDownRight, Flame } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Mock data for analytics
const activityData = [
  { name: "Mon", meditation: 25, journaling: 15, healing: 10 },
  { name: "Tue", meditation: 30, journaling: 20, healing: 15 },
  { name: "Wed", meditation: 20, journaling: 30, healing: 20 },
  { name: "Thu", meditation: 35, journaling: 15, healing: 10 },
  { name: "Fri", meditation: 25, journaling: 25, healing: 15 },
  { name: "Sat", meditation: 40, journaling: 20, healing: 25 },
  { name: "Sun", meditation: 45, journaling: 35, healing: 30 },
]

const emotionData = [
  { name: "Jan", anxiety: 65, peace: 35 },
  { name: "Feb", anxiety: 60, peace: 40 },
  { name: "Mar", anxiety: 55, peace: 45 },
  { name: "Apr", anxiety: 50, peace: 50 },
  { name: "May", anxiety: 45, peace: 55 },
  { name: "Jun", anxiety: 40, peace: 60 },
]

const practiceDistribution = [
  { name: "Meditation", value: 35 },
  { name: "Journaling", value: 25 },
  { name: "Energy Work", value: 15 },
  { name: "Breathwork", value: 10 },
  { name: "Sound Healing", value: 8 },
  { name: "Other", value: 7 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"]

const insightData = [
  {
    title: "Meditation Consistency",
    description:
      "Your meditation practice has been consistent over the past month, with an average of 30 minutes per day.",
    change: 15,
    isPositive: true,
    icon: Brain,
  },
  {
    title: "Emotional Balance",
    description: "Your reported feelings of peace have increased by 25% since you started your healing journey.",
    change: 25,
    isPositive: true,
    icon: Heart,
  },
  {
    title: "Journal Entries",
    description: "You've completed 18 journal entries this month, which is 3 more than last month.",
    change: 20,
    isPositive: true,
    icon: BookOpen,
  },
  {
    title: "Community Engagement",
    description: "Your participation in healing circles has decreased slightly this month.",
    change: 10,
    isPositive: false,
    icon: Users,
  },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Healing Analytics</h1>
        <p className="text-muted-foreground">
          Track your healing journey progress and identify patterns in your practice.
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <Tabs defaultValue="overview" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="emotions">Emotions</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Past Week</SelectItem>
            <SelectItem value="month">Past Month</SelectItem>
            <SelectItem value="quarter">Past 3 Months</SelectItem>
            <SelectItem value="year">Past Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Practice Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5 hours</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
            <div className="mt-4 h-1 w-full rounded-full bg-muted">
              <div className="h-1 rounded-full bg-purple-600" style={{ width: "75%" }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">75% of your monthly goal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meditation Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground">Your longest streak: 21 days</p>
            <div className="mt-4 grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className={`h-2 rounded-full ${i < 5 ? "bg-purple-600" : "bg-muted"}`} />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emotional Balance</CardTitle>
            <Heart className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
            <div className="mt-4 flex items-center">
              <span className="text-xs text-muted-foreground mr-2">Stress</span>
              <div className="h-2 flex-1 rounded-full bg-muted">
                <div className="h-2 rounded-full bg-rose-500" style={{ width: "35%" }} />
              </div>
              <span className="text-xs text-muted-foreground ml-2">Peace</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Based on your journal entries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Engagement</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8 sessions</div>
            <p className="text-xs text-muted-foreground">Attended this month</p>
            <div className="mt-4 flex items-center space-x-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Healing Circles
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Group Meditation
              </Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">3 different groups</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Practice Distribution</CardTitle>
            <CardDescription>Breakdown of your healing practices by time spent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={practiceDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {practiceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Your practice consistency over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="meditation" fill="#8884d8" name="Meditation" />
                  <Bar dataKey="journaling" fill="#82ca9d" name="Journaling" />
                  <Bar dataKey="healing" fill="#ffc658" name="Healing Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Emotional Trends</CardTitle>
            <CardDescription>Tracking your emotional states over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emotionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="anxiety" stroke="#ff8042" name="Anxiety" />
                  <Line type="monotone" dataKey="peace" stroke="#82ca9d" name="Peace" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Healing Insights</CardTitle>
            <CardDescription>Key observations from your healing journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insightData.map((insight, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`rounded-full p-2 ${insight.isPositive ? "bg-green-100" : "bg-amber-100"}`}>
                    <insight.icon className={`h-4 w-4 ${insight.isPositive ? "text-green-700" : "text-amber-700"}`} />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{insight.title}</p>
                      <Badge variant="outline" className={insight.isPositive ? "text-green-700" : "text-amber-700"}>
                        {insight.isPositive ? (
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="mr-1 h-3 w-3" />
                        )}
                        {insight.change}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Detailed Insights
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Meditation Progress</CardTitle>
            <CardDescription>Your meditation journey milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Consistency</p>
                  <p className="text-sm text-muted-foreground">85%</p>
                </div>
                <Progress value={85} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">65%</p>
                </div>
                <Progress value={65} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Technique Variety</p>
                  <p className="text-sm text-muted-foreground">50%</p>
                </div>
                <Progress value={50} />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Medal className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Next milestone: 30-day streak</span>
              </div>
              <span className="text-sm text-muted-foreground">18 days to go</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Journal Themes</CardTitle>
            <CardDescription>Common themes in your journal entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-purple-100 text-purple-800">Self-discovery</Badge>
                  <span className="text-sm text-muted-foreground">12 entries</span>
                </div>
                <Progress value={80} className="w-[100px]" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-100 text-blue-800">Emotional healing</Badge>
                  <span className="text-sm text-muted-foreground">9 entries</span>
                </div>
                <Progress value={60} className="w-[100px]" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">Gratitude</Badge>
                  <span className="text-sm text-muted-foreground">7 entries</span>
                </div>
                <Progress value={45} className="w-[100px]" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-amber-100 text-amber-800">Relationships</Badge>
                  <span className="text-sm text-muted-foreground">5 entries</span>
                </div>
                <Progress value={35} className="w-[100px]" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-rose-100 text-rose-800">Shadow work</Badge>
                  <span className="text-sm text-muted-foreground">3 entries</span>
                </div>
                <Progress value={20} className="w-[100px]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Goals</CardTitle>
            <CardDescription>Your healing journey targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Daily Meditation</p>
                  <Badge>In Progress</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Meditate for at least 15 minutes every day</p>
                <Progress value={60} className="mt-2" />
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Weekly Journaling</p>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    On Track
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Complete 3 journal entries per week</p>
                <Progress value={100} className="mt-2" />
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Shadow Work</p>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700">
                    Just Started
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Complete the shadow work program</p>
                <Progress value={15} className="mt-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Set New Goal</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
