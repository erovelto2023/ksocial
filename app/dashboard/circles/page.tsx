"use client"

import { useState } from "react"
import { Search, Plus, Users, MessageCircle, Calendar, Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

// Mock support circles data
const mockCircles = [
  {
    id: "1",
    name: "Grief & Loss Support",
    description:
      "A compassionate space for those navigating grief and loss. Share your journey, find understanding, and learn coping strategies in a supportive environment.",
    category: "grief",
    facilitator: {
      id: "user1",
      name: "Emily Rodriguez",
      image: "/placeholder.svg?height=40&width=40",
    },
    members: 18,
    maxMembers: 25,
    nextMeeting: "2023-06-21T19:00:00Z",
    frequency: "weekly",
    isPrivate: false,
    isFavorite: true,
    topics: ["Grief Processing", "Coping Strategies", "Emotional Support"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    name: "Anxiety Management Circle",
    description:
      "Learn practical tools and share experiences for managing anxiety. This group focuses on mindfulness techniques, cognitive strategies, and mutual support.",
    category: "anxiety",
    facilitator: {
      id: "user2",
      name: "Michael Chen",
      image: "/placeholder.svg?height=40&width=40",
    },
    members: 22,
    maxMembers: 30,
    nextMeeting: "2023-06-19T18:00:00Z",
    frequency: "weekly",
    isPrivate: false,
    isFavorite: false,
    topics: ["Anxiety Relief", "Mindfulness", "Cognitive Techniques"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    name: "Spiritual Awakening Support",
    description:
      "For those experiencing spiritual awakening or kundalini awakening. Share your experiences, challenges, and insights in a non-judgmental space.",
    category: "spiritual",
    facilitator: {
      id: "user3",
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    members: 15,
    maxMembers: 20,
    nextMeeting: "2023-06-22T20:00:00Z",
    frequency: "biweekly",
    isPrivate: false,
    isFavorite: true,
    topics: ["Kundalini Awakening", "Integration", "Spiritual Emergence"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "4",
    name: "Trauma Recovery Circle",
    description:
      "A trauma-informed space for healing and recovery. This group offers peer support while exploring gentle approaches to trauma resolution.",
    category: "trauma",
    facilitator: {
      id: "user4",
      name: "David Thompson",
      image: "/placeholder.svg?height=40&width=40",
    },
    members: 12,
    maxMembers: 15,
    nextMeeting: "2023-06-20T18:30:00Z",
    frequency: "weekly",
    isPrivate: true,
    isFavorite: false,
    topics: ["Trauma Recovery", "Nervous System Regulation", "Self-Compassion"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "5",
    name: "Highly Sensitive Persons (HSP)",
    description:
      "A supportive community for highly sensitive people to share experiences, challenges, and strategies for thriving with heightened sensitivity.",
    category: "sensitivity",
    facilitator: {
      id: "user5",
      name: "Aisha Patel",
      image: "/placeholder.svg?height=40&width=40",
    },
    members: 20,
    maxMembers: 25,
    nextMeeting: "2023-06-23T19:00:00Z",
    frequency: "weekly",
    isPrivate: false,
    isFavorite: false,
    topics: ["Sensitivity Management", "Boundaries", "Self-Care"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "6",
    name: "Inner Child Healing",
    description:
      "Explore inner child healing techniques and share your journey of reconnecting with and healing your inner child in a supportive environment.",
    category: "inner-child",
    facilitator: {
      id: "user6",
      name: "James Wilson",
      image: "/placeholder.svg?height=40&width=40",
    },
    members: 16,
    maxMembers: 20,
    nextMeeting: "2023-06-24T17:00:00Z",
    frequency: "biweekly",
    isPrivate: false,
    isFavorite: true,
    topics: ["Inner Child Work", "Reparenting", "Emotional Healing"],
    image: "/placeholder.svg?height=200&width=400",
  },
]

// Categories for filtering
const categories = [
  { value: "all", label: "All Circles" },
  { value: "grief", label: "Grief & Loss" },
  { value: "anxiety", label: "Anxiety" },
  { value: "spiritual", label: "Spiritual" },
  { value: "trauma", label: "Trauma" },
  { value: "sensitivity", label: "Sensitivity" },
  { value: "inner-child", label: "Inner Child" },
]

export default function SupportCirclesPage() {
  const [circles, setCircles] = useState(mockCircles)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCircle, setNewCircle] = useState({
    name: "",
    description: "",
    category: "grief",
    maxMembers: 20,
    frequency: "weekly",
    isPrivate: false,
    topics: [] as string[],
  })
  const [newTopic, setNewTopic] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter circles based on search and category
  const filteredCircles = circles.filter((circle) => {
    const matchesSearch =
      circle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      circle.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      circle.topics.some((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || circle.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleToggleFavorite = (id: string) => {
    setCircles(
      circles.map((circle) => {
        if (circle.id === id) {
          return { ...circle, isFavorite: !circle.isFavorite }
        }
        return circle
      }),
    )
  }

  const handleAddTopic = () => {
    if (newTopic.trim() && !newCircle.topics.includes(newTopic.trim())) {
      setNewCircle({
        ...newCircle,
        topics: [...newCircle.topics, newTopic.trim()],
      })
      setNewTopic("")
    }
  }

  const handleRemoveTopic = (topic: string) => {
    setNewCircle({
      ...newCircle,
      topics: newCircle.topics.filter((t) => t !== topic),
    })
  }

  const handleCreateCircle = async () => {
    if (!newCircle.name || !newCircle.description) return

    setIsSubmitting(true)

    try {
      // Here you would normally send the data to your API
      console.log("Creating circle:", newCircle)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add new circle to the list
      const createdCircle = {
        id: `circle${Date.now()}`,
        name: newCircle.name,
        description: newCircle.description,
        category: newCircle.category,
        facilitator: {
          id: "currentUser",
          name: "Current User",
          image: "/placeholder.svg?height=40&width=40",
        },
        members: 1,
        maxMembers: newCircle.maxMembers,
        nextMeeting: new Date(Date.now() + 86400000 * 7).toISOString(), // Next week
        frequency: newCircle.frequency,
        isPrivate: newCircle.isPrivate,
        isFavorite: false,
        topics: newCircle.topics,
        image: "/placeholder.svg?height=200&width=400",
      }

      setCircles([createdCircle, ...circles])
      setIsCreateDialogOpen(false)
      setNewCircle({
        name: "",
        description: "",
        category: "grief",
        maxMembers: 20,
        frequency: "weekly",
        isPrivate: false,
        topics: [],
      })
    } catch (error) {
      console.error("Error creating circle:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().slice(0, 10)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Support Circles</h1>
        <p className="text-muted-foreground">
          Join supportive communities focused on specific healing journeys or create your own circle.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-[350px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search support circles..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:w-auto">
            <TabsList>
              {categories.slice(0, 4).map((category) => (
                <TabsTrigger key={category.value} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Circle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create a Support Circle</DialogTitle>
                <DialogDescription>
                  Start a new support group focused on a specific healing journey or challenge.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="circle-name">Circle Name</Label>
                  <Input
                    id="circle-name"
                    value={newCircle.name}
                    onChange={(e) => setNewCircle({ ...newCircle, name: e.target.value })}
                    placeholder="e.g., Grief & Loss Support"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="circle-description">Description</Label>
                  <Textarea
                    id="circle-description"
                    value={newCircle.description}
                    onChange={(e) => setNewCircle({ ...newCircle, description: e.target.value })}
                    placeholder="Describe the purpose and focus of your support circle..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="circle-category">Category</Label>
                    <Select
                      value={newCircle.category}
                      onValueChange={(value) => setNewCircle({ ...newCircle, category: value })}
                    >
                      <SelectTrigger id="circle-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="circle-capacity">Max Members</Label>
                    <Input
                      id="circle-capacity"
                      type="number"
                      min="5"
                      max="50"
                      value={newCircle.maxMembers}
                      onChange={(e) => setNewCircle({ ...newCircle, maxMembers: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="circle-frequency">Meeting Frequency</Label>
                    <Select
                      value={newCircle.frequency}
                      onValueChange={(value) => setNewCircle({ ...newCircle, frequency: value })}
                    >
                      <SelectTrigger id="circle-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="circle-private"
                        checked={newCircle.isPrivate}
                        onCheckedChange={(checked) => setNewCircle({ ...newCircle, isPrivate: checked as boolean })}
                      />
                      <Label htmlFor="circle-private">Private Circle</Label>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="circle-topics">Topics (up to 5)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="circle-topics"
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      placeholder="Add topics for discussion"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTopic()
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddTopic}
                      disabled={!newTopic.trim() || newCircle.topics.length >= 5}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newCircle.topics.map((topic) => (
                      <Badge key={topic} variant="secondary">
                        {topic}
                        <button
                          type="button"
                          className="ml-1 rounded-full text-muted-foreground hover:text-foreground"
                          onClick={() => handleRemoveTopic(topic)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateCircle}
                  disabled={isSubmitting || !newCircle.name || !newCircle.description}
                >
                  {isSubmitting ? "Creating..." : "Create Circle"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {filteredCircles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCircles.map((circle) => (
            <Card key={circle.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={circle.image || "/placeholder.svg"}
                  alt={circle.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
                    {categories.find((c) => c.value === circle.category)?.label || circle.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {circle.isPrivate && (
                      <Badge variant="outline" className="bg-black/50 text-white backdrop-blur-sm">
                        Private
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className="bg-black/50 text-white backdrop-blur-sm flex items-center gap-1"
                    >
                      <Users className="h-3 w-3" /> {circle.members}/{circle.maxMembers}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{circle.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${circle.isFavorite ? "text-rose-500" : ""}`}
                    onClick={() => handleToggleFavorite(circle.id)}
                  >
                    <Heart className={circle.isFavorite ? "fill-current" : ""} />
                  </Button>
                </div>
                <CardDescription className="line-clamp-2">{circle.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={circle.facilitator.image || "/placeholder.svg"} alt={circle.facilitator.name} />
                    <AvatarFallback>{circle.facilitator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{circle.facilitator.name}</p>
                    <p className="text-xs text-muted-foreground">Facilitator</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(circle.nextMeeting)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <span>{circle.frequency.charAt(0).toUpperCase() + circle.frequency.slice(1)} meetings</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {circle.topics.map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full gap-1">
                  <Link href={`/dashboard/circles/${circle.id}`}>
                    <Users className="mr-1 h-4 w-4" /> Join Circle
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <p className="text-muted-foreground">No support circles found</p>
            <p className="text-sm text-muted-foreground">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first support circle to get started"}
            </p>
            {!searchTerm && selectedCategory === "all" && (
              <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create Support Circle
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Upcoming Meetings</h2>
        <div className="rounded-lg border">
          <div className="grid divide-y">
            {circles
              .sort((a, b) => new Date(a.nextMeeting).getTime() - new Date(b.nextMeeting).getTime())
              .slice(0, 5)
              .map((circle) => (
                <div key={circle.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:block">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={circle.facilitator.image || "/placeholder.svg"}
                          alt={circle.facilitator.name}
                        />
                        <AvatarFallback>{circle.facilitator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <h3 className="font-medium">{circle.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(circle.nextMeeting)} • {circle.members} members
                      </p>
                    </div>
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/dashboard/circles/${circle.id}`}>
                      Join <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
