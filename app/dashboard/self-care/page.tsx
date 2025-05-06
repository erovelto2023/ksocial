"use client"

import { useState } from "react"
import { Plus, Calendar, Edit, Trash2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

// Mock self-care activities
const mockActivities = [
  {
    id: "1",
    title: "Morning Meditation",
    description: "15-minute guided meditation to start the day with intention and clarity",
    category: "mental",
    completed: true,
    scheduledFor: "2023-06-15T07:00:00Z",
    duration: 15,
  },
  {
    id: "2",
    title: "Nature Walk",
    description: "30-minute walk in the park to connect with nature and get some fresh air",
    category: "physical",
    completed: false,
    scheduledFor: "2023-06-15T12:00:00Z",
    duration: 30,
  },
  {
    id: "3",
    title: "Journaling Session",
    description: "Write about feelings, challenges, and gratitude to process emotions",
    category: "emotional",
    completed: false,
    scheduledFor: "2023-06-15T19:00:00Z",
    duration: 20,
  },
  {
    id: "4",
    title: "Epsom Salt Bath",
    description: "Relaxing bath with essential oils to soothe muscles and calm the mind",
    category: "physical",
    completed: true,
    scheduledFor: "2023-06-14T21:00:00Z",
    duration: 45,
  },
  {
    id: "5",
    title: "Call with Friend",
    description: "Catch up with a supportive friend to maintain social connections",
    category: "social",
    completed: true,
    scheduledFor: "2023-06-14T18:00:00Z",
    duration: 60,
  },
  {
    id: "6",
    title: "Digital Detox",
    description: "Two hours away from screens to reduce stress and be present",
    category: "mental",
    completed: false,
    scheduledFor: "2023-06-16T20:00:00Z",
    duration: 120,
  },
]

// Self-care categories
const categories = [
  { value: "all", label: "All Activities" },
  { value: "physical", label: "Physical" },
  { value: "mental", label: "Mental" },
  { value: "emotional", label: "Emotional" },
  { value: "social", label: "Social" },
  { value: "spiritual", label: "Spiritual" },
]

// Self-care suggestions by category
const suggestions = {
  physical: [
    "Take a 20-minute walk outside",
    "Do 10 minutes of gentle stretching",
    "Try a new healthy recipe",
    "Take a relaxing bath with essential oils",
    "Get 8 hours of sleep tonight",
  ],
  mental: [
    "Practice meditation for 10 minutes",
    "Read a book for pleasure",
    "Do a digital detox for 2 hours",
    "Try a new puzzle or brain game",
    "Practice deep breathing exercises",
  ],
  emotional: [
    "Journal about your feelings",
    "Practice self-compassion affirmations",
    "Allow yourself to cry if needed",
    "Identify and name your emotions",
    "Create art to express your feelings",
  ],
  social: [
    "Call a supportive friend or family member",
    "Join a community event or group",
    "Write a gratitude letter to someone",
    "Set healthy boundaries in a relationship",
    "Reach out to someone you haven't talked to in a while",
  ],
  spiritual: [
    "Spend time in nature",
    "Practice mindfulness or meditation",
    "Reflect on your values and purpose",
    "Try yoga or tai chi",
    "Create a sacred space in your home",
  ],
}

export default function SelfCarePage() {
  const [activities, setActivities] = useState(mockActivities)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingActivity, setEditingActivity] = useState<null | (typeof mockActivities)[0]>(null)
  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    category: "mental",
    duration: 15,
    scheduledFor: new Date().toISOString().slice(0, 16),
  })

  // Filter activities based on selected category
  const filteredActivities = activities.filter(
    (activity) => selectedCategory === "all" || activity.category === selectedCategory,
  )

  // Group activities by date
  const groupedActivities = filteredActivities.reduce(
    (groups, activity) => {
      const date = new Date(activity.scheduledFor).toLocaleDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(activity)
      return groups
    },
    {} as Record<string, typeof mockActivities>,
  )

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedActivities).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  const handleAddActivity = () => {
    const newActivityObj = {
      id: `activity${Date.now()}`,
      title: newActivity.title,
      description: newActivity.description,
      category: newActivity.category,
      completed: false,
      scheduledFor: newActivity.scheduledFor,
      duration: Number(newActivity.duration),
    }

    setActivities([newActivityObj, ...activities])
    setIsDialogOpen(false)
    setNewActivity({
      title: "",
      description: "",
      category: "mental",
      duration: 15,
      scheduledFor: new Date().toISOString().slice(0, 16),
    })
  }

  const handleUpdateActivity = () => {
    if (!editingActivity) return

    setActivities(activities.map((activity) => (activity.id === editingActivity.id ? editingActivity : activity)))
    setEditingActivity(null)
  }

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((activity) => activity.id !== id))
  }

  const handleToggleComplete = (id: string) => {
    setActivities(
      activities.map((activity) => {
        if (activity.id === id) {
          return { ...activity, completed: !activity.completed }
        }
        return activity
      }),
    )
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "physical":
        return "bg-blue-100 text-blue-800"
      case "mental":
        return "bg-purple-100 text-purple-800"
      case "emotional":
        return "bg-pink-100 text-pink-800"
      case "social":
        return "bg-green-100 text-green-800"
      case "spiritual":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Self-Care Planner</h1>
        <p className="text-muted-foreground">
          Plan and track your self-care activities to nurture your mind, body, and spirit.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {/* Tabs and Add Button */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:max-w-[600px]">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                {categories.map((category) => (
                  <TabsTrigger key={category.value} value={category.value}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" /> Add Activity
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Self-Care Activity</DialogTitle>
                  <DialogDescription>Create a new self-care activity to add to your planner.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Activity Title</Label>
                    <Input
                      id="title"
                      value={newActivity.title}
                      onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                      placeholder="Morning Meditation"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newActivity.description}
                      onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                      placeholder="15-minute guided meditation to start the day with intention"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newActivity.category}
                        onValueChange={(value) => setNewActivity({ ...newActivity, category: value })}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories
                            .filter((cat) => cat.value !== "all")
                            .map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        min="5"
                        value={newActivity.duration}
                        onChange={(e) =>
                          setNewActivity({ ...newActivity, duration: Number.parseInt(e.target.value) || 15 })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="scheduledFor">Schedule For</Label>
                    <Input
                      id="scheduledFor"
                      type="datetime-local"
                      value={newActivity.scheduledFor}
                      onChange={(e) => setNewActivity({ ...newActivity, scheduledFor: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddActivity} disabled={!newActivity.title}>
                    Add Activity
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Activities List */}
          {sortedDates.length > 0 ? (
            <div className="space-y-6">
              {sortedDates.map((date) => (
                <div key={date} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">
                      {new Date(date).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {groupedActivities[date].map((activity) => (
                      <Card key={activity.id} className={activity.completed ? "bg-muted/50" : ""}>
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="flex items-center gap-2">
                                <Checkbox
                                  checked={activity.completed}
                                  onCheckedChange={() => handleToggleComplete(activity.id)}
                                  id={`complete-${activity.id}`}
                                />
                                <span className={activity.completed ? "line-through text-muted-foreground" : ""}>
                                  {activity.title}
                                </span>
                              </CardTitle>
                              <CardDescription>
                                {formatTime(activity.scheduledFor)} • {activity.duration} minutes
                              </CardDescription>
                            </div>
                            <Badge className={getCategoryColor(activity.category)}>
                              {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className={`text-sm ${activity.completed ? "text-muted-foreground line-through" : ""}`}>
                            {activity.description}
                          </p>
                        </CardContent>
                        {editingActivity?.id === activity.id ? (
                          <CardFooter className="border-t bg-muted/50 px-6 py-4">
                            <div className="grid w-full gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="edit-title">Title</Label>
                                <Input
                                  id="edit-title"
                                  value={editingActivity.title}
                                  onChange={(e) => setEditingActivity({ ...editingActivity, title: e.target.value })}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                  id="edit-description"
                                  value={editingActivity.description}
                                  onChange={(e) =>
                                    setEditingActivity({ ...editingActivity, description: e.target.value })
                                  }
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button onClick={handleUpdateActivity} className="flex-1">
                                  <Save className="mr-2 h-4 w-4" /> Save
                                </Button>
                                <Button variant="outline" onClick={() => setEditingActivity(null)} className="flex-1">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </CardFooter>
                        ) : (
                          <CardFooter className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setEditingActivity(activity)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteActivity(activity.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </CardFooter>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <p className="text-muted-foreground">No self-care activities found</p>
                <p className="text-sm text-muted-foreground">Add your first self-care activity to get started</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Self-Care Ideas</CardTitle>
              <CardDescription>Try these activities for your self-care practice</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="physical" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
                  <TabsTrigger value="physical">Physical</TabsTrigger>
                  <TabsTrigger value="mental">Mental</TabsTrigger>
                  <TabsTrigger value="emotional">Emotional</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                  <TabsTrigger value="spiritual">Spiritual</TabsTrigger>
                </TabsList>
                {Object.entries(suggestions).map(([category, items]) => (
                  <TabsContent key={category} value={category} className="mt-4">
                    <ul className="list-disc space-y-2 pl-5 text-sm">
                      {items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Self-Care Stats</CardTitle>
              <CardDescription>Your self-care activity summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>Completed Activities</span>
                    <span className="font-medium">
                      {activities.filter((a) => a.completed).length}/{activities.length}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-purple-500"
                      style={{
                        width: `${(activities.filter((a) => a.completed).length / activities.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {categories
                    .filter((cat) => cat.value !== "all")
                    .map((category) => {
                      const categoryActivities = activities.filter((a) => a.category === category.value)
                      const completedCount = categoryActivities.filter((a) => a.completed).length
                      const totalCount = categoryActivities.length
                      const percentage = totalCount ? (completedCount / totalCount) * 100 : 0

                      return (
                        <div key={category.value} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>{category.label}</span>
                            <span>
                              {completedCount}/{totalCount}
                            </span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className={`h-full ${
                                category.value === "physical"
                                  ? "bg-blue-500"
                                  : category.value === "mental"
                                    ? "bg-purple-500"
                                    : category.value === "emotional"
                                      ? "bg-pink-500"
                                      : category.value === "social"
                                        ? "bg-green-500"
                                        : "bg-amber-500"
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
