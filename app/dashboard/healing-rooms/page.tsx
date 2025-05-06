"use client"

import { useState } from "react"
import { Search, Plus, Users, Clock, Calendar, Sparkles, ArrowRight, Heart } from "lucide-react"
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
import Link from "next/link"

// Mock healing rooms data
const mockRooms = [
  {
    id: "1",
    name: "Chakra Balancing Circle",
    description:
      "A virtual space for group chakra balancing and energy alignment. Join us for guided meditations and energy work focused on harmonizing your chakra system.",
    category: "energy",
    facilitator: {
      id: "user1",
      name: "Elena Martinez",
      title: "Reiki Master & Energy Healer",
      image: "/placeholder.svg?height=40&width=40",
    },
    participants: 12,
    maxParticipants: 20,
    nextSession: "2023-06-20T18:00:00Z",
    duration: 60,
    isFavorite: true,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    name: "Sound Healing Sanctuary",
    description:
      "Experience the healing vibrations of crystal singing bowls, gongs, and other sound healing instruments in this virtual sound bath session.",
    category: "sound",
    facilitator: {
      id: "user2",
      name: "Michael Chen",
      title: "Sound Healing Practitioner",
      image: "/placeholder.svg?height=40&width=40",
    },
    participants: 8,
    maxParticipants: 15,
    nextSession: "2023-06-18T20:00:00Z",
    duration: 45,
    isFavorite: false,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    name: "Shamanic Journey Circle",
    description:
      "A guided shamanic journey for connecting with spirit guides, power animals, and accessing inner wisdom through drumming and visualization.",
    category: "shamanic",
    facilitator: {
      id: "user3",
      name: "David Thompson",
      title: "Shamanic Practitioner",
      image: "/placeholder.svg?height=40&width=40",
    },
    participants: 15,
    maxParticipants: 25,
    nextSession: "2023-06-22T19:00:00Z",
    duration: 90,
    isFavorite: true,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "4",
    name: "Reiki Healing Exchange",
    description:
      "A space for Reiki practitioners to exchange distance healing and practice their skills in a supportive environment.",
    category: "reiki",
    facilitator: {
      id: "user4",
      name: "Sarah Johnson",
      title: "Reiki Master Teacher",
      image: "/placeholder.svg?height=40&width=40",
    },
    participants: 6,
    maxParticipants: 12,
    nextSession: "2023-06-19T17:30:00Z",
    duration: 75,
    isFavorite: false,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "5",
    name: "Breathwork for Emotional Release",
    description:
      "Guided breathwork sessions designed to release emotional blockages, reduce stress, and increase energy flow throughout the body.",
    category: "breathwork",
    facilitator: {
      id: "user5",
      name: "Aisha Patel",
      title: "Breathwork Facilitator",
      image: "/placeholder.svg?height=40&width=40",
    },
    participants: 10,
    maxParticipants: 15,
    nextSession: "2023-06-21T18:30:00Z",
    duration: 60,
    isFavorite: false,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "6",
    name: "Crystal Healing Meditation",
    description:
      "A guided meditation using crystal energy to clear blockages, balance chakras, and promote overall wellbeing.",
    category: "crystal",
    facilitator: {
      id: "user6",
      name: "Emily Rodriguez",
      title: "Crystal Healer",
      image: "/placeholder.svg?height=40&width=40",
    },
    participants: 9,
    maxParticipants: 20,
    nextSession: "2023-06-23T19:00:00Z",
    duration: 45,
    isFavorite: true,
    image: "/placeholder.svg?height=200&width=400",
  },
]

// Categories for filtering
const categories = [
  { value: "all", label: "All Rooms" },
  { value: "energy", label: "Energy Work" },
  { value: "sound", label: "Sound Healing" },
  { value: "shamanic", label: "Shamanic" },
  { value: "reiki", label: "Reiki" },
  { value: "breathwork", label: "Breathwork" },
  { value: "crystal", label: "Crystal Healing" },
]

export default function HealingRoomsPage() {
  const [rooms, setRooms] = useState(mockRooms)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newRoom, setNewRoom] = useState({
    name: "",
    description: "",
    category: "energy",
    maxParticipants: 15,
    duration: 60,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter rooms based on search and category
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.facilitator.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || room.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleToggleFavorite = (id: string) => {
    setRooms(
      rooms.map((room) => {
        if (room.id === id) {
          return { ...room, isFavorite: !room.isFavorite }
        }
        return room
      }),
    )
  }

  const handleCreateRoom = async () => {
    if (!newRoom.name || !newRoom.description) return

    setIsSubmitting(true)

    try {
      // Here you would normally send the data to your API
      console.log("Creating room:", newRoom)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add new room to the list
      const createdRoom = {
        id: `room${Date.now()}`,
        name: newRoom.name,
        description: newRoom.description,
        category: newRoom.category,
        facilitator: {
          id: "currentUser",
          name: "Current User",
          title: "Healing Practitioner",
          image: "/placeholder.svg?height=40&width=40",
        },
        participants: 1,
        maxParticipants: newRoom.maxParticipants,
        nextSession: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        duration: newRoom.duration,
        isFavorite: false,
        image: "/placeholder.svg?height=200&width=400",
      }

      setRooms([createdRoom, ...rooms])
      setIsCreateDialogOpen(false)
      setNewRoom({
        name: "",
        description: "",
        category: "energy",
        maxParticipants: 15,
        duration: 60,
      })
    } catch (error) {
      console.error("Error creating room:", error)
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
        <h1 className="text-3xl font-bold tracking-tight">Virtual Healing Rooms</h1>
        <p className="text-muted-foreground">
          Join virtual healing spaces facilitated by experienced practitioners or create your own room.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-[350px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search healing rooms..."
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
                <Plus className="mr-2 h-4 w-4" /> Create Room
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create a Healing Room</DialogTitle>
                <DialogDescription>
                  Set up a virtual space for healing sessions and invite others to join.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="room-name">Room Name</Label>
                  <Input
                    id="room-name"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                    placeholder="e.g., Chakra Balancing Circle"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="room-description">Description</Label>
                  <Textarea
                    id="room-description"
                    value={newRoom.description}
                    onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                    placeholder="Describe the purpose and focus of your healing room..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="room-category">Category</Label>
                    <Select
                      value={newRoom.category}
                      onValueChange={(value) => setNewRoom({ ...newRoom, category: value })}
                    >
                      <SelectTrigger id="room-category">
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
                    <Label htmlFor="room-capacity">Max Participants</Label>
                    <Input
                      id="room-capacity"
                      type="number"
                      min="2"
                      max="50"
                      value={newRoom.maxParticipants}
                      onChange={(e) => setNewRoom({ ...newRoom, maxParticipants: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="room-duration">Session Duration (minutes)</Label>
                  <Select
                    value={newRoom.duration.toString()}
                    onValueChange={(value) => setNewRoom({ ...newRoom, duration: Number.parseInt(value) })}
                  >
                    <SelectTrigger id="room-duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                      <SelectItem value="120">120 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateRoom} disabled={isSubmitting || !newRoom.name || !newRoom.description}>
                  {isSubmitting ? "Creating..." : "Create Room"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {filteredRooms.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img src={room.image || "/placeholder.svg"} alt={room.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
                    {categories.find((c) => c.value === room.category)?.label || room.category}
                  </Badge>
                  <Badge variant="outline" className="bg-black/50 text-white backdrop-blur-sm flex items-center gap-1">
                    <Users className="h-3 w-3" /> {room.participants}/{room.maxParticipants}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{room.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${room.isFavorite ? "text-rose-500" : ""}`}
                    onClick={() => handleToggleFavorite(room.id)}
                  >
                    <Heart className={room.isFavorite ? "fill-current" : ""} />
                  </Button>
                </div>
                <CardDescription className="line-clamp-2">{room.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={room.facilitator.image || "/placeholder.svg"} alt={room.facilitator.name} />
                    <AvatarFallback>{room.facilitator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{room.facilitator.name}</p>
                    <p className="text-xs text-muted-foreground">{room.facilitator.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(room.nextSession)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{room.duration} minutes</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full gap-1">
                  <Link href={`/dashboard/healing-rooms/${room.id}`}>
                    <Sparkles className="mr-1 h-4 w-4" /> Join Room
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <p className="text-muted-foreground">No healing rooms found</p>
            <p className="text-sm text-muted-foreground">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first healing room to get started"}
            </p>
            {!searchTerm && selectedCategory === "all" && (
              <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create Healing Room
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Upcoming Sessions</h2>
        <div className="rounded-lg border">
          <div className="grid divide-y">
            {rooms
              .sort((a, b) => new Date(a.nextSession).getTime() - new Date(b.nextSession).getTime())
              .slice(0, 5)
              .map((room) => (
                <div key={room.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:block">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={room.facilitator.image || "/placeholder.svg"} alt={room.facilitator.name} />
                        <AvatarFallback>{room.facilitator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <h3 className="font-medium">{room.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(room.nextSession)} • {room.duration} min
                      </p>
                    </div>
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/dashboard/healing-rooms/${room.id}`}>
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
