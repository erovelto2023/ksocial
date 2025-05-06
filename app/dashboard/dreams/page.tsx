"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, Calendar, Moon, Sun, Filter, ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock dream journal entries
const mockDreams = [
  {
    id: "1",
    title: "Flying Over Mountains",
    description:
      "I was flying over snow-capped mountains, feeling completely free. The air was crisp and I could see for miles in every direction. I had a sense of profound peace and possibility.",
    date: "2023-06-15T08:23:00Z",
    type: "lucid",
    emotions: ["joy", "freedom", "peace"],
    symbols: ["flying", "mountains", "sky"],
    isRecurring: false,
  },
  {
    id: "2",
    title: "Lost in a Maze",
    description:
      "I was wandering through an endless maze with walls that kept shifting. Every time I thought I found the exit, the path would change. I felt increasingly anxious until I realized I could simply float above the maze to see the whole pattern.",
    date: "2023-06-10T23:45:00Z",
    type: "symbolic",
    emotions: ["anxiety", "confusion", "relief"],
    symbols: ["maze", "walls", "searching"],
    isRecurring: true,
  },
  {
    id: "3",
    title: "Conversation with Grandmother",
    description:
      "My grandmother, who passed away five years ago, appeared in my dream. We sat in her old kitchen and she gave me advice about a decision I've been struggling with. The details were vivid and her presence felt incredibly real.",
    date: "2023-06-05T04:12:00Z",
    type: "visitation",
    emotions: ["comfort", "love", "nostalgia"],
    symbols: ["ancestor", "kitchen", "guidance"],
    isRecurring: false,
  },
  {
    id: "4",
    title: "Ocean Turning to Stars",
    description:
      "I was swimming in the ocean at night when suddenly the water transformed into a sea of stars. I could swim through the cosmos, touching nebulae and planets. The boundary between water and space became meaningless.",
    date: "2023-05-28T02:37:00Z",
    type: "spiritual",
    emotions: ["wonder", "awe", "transcendence"],
    symbols: ["ocean", "stars", "transformation"],
    isRecurring: false,
  },
  {
    id: "5",
    title: "Being Chased Through Forest",
    description:
      "I was running through a dark forest, being pursued by something I couldn't see. Just as it was about to catch me, I turned to face it and realized it was a part of myself I've been avoiding. When I acknowledged it, the chase ended.",
    date: "2023-05-20T03:50:00Z",
    type: "shadow",
    emotions: ["fear", "anxiety", "acceptance"],
    symbols: ["forest", "darkness", "pursuit"],
    isRecurring: true,
  },
]

// Dream types for filtering
const dreamTypes = [
  { value: "all", label: "All Dreams" },
  { value: "lucid", label: "Lucid" },
  { value: "symbolic", label: "Symbolic" },
  { value: "visitation", label: "Visitation" },
  { value: "spiritual", label: "Spiritual" },
  { value: "shadow", label: "Shadow" },
  { value: "prophetic", label: "Prophetic" },
]

// Common emotions for tagging
const commonEmotions = [
  "joy",
  "fear",
  "anxiety",
  "peace",
  "confusion",
  "love",
  "anger",
  "sadness",
  "excitement",
  "wonder",
  "freedom",
  "comfort",
  "nostalgia",
  "awe",
  "transcendence",
]

// Common symbols for tagging
const commonSymbols = [
  "water",
  "flying",
  "falling",
  "chase",
  "house",
  "animals",
  "darkness",
  "light",
  "death",
  "birth",
  "transformation",
  "journey",
  "maze",
  "forest",
  "mountains",
]

export default function DreamJournalPage() {
  const [dreams, setDreams] = useState(mockDreams)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [dreamToDelete, setDreamToDelete] = useState<string | null>(null)

  // Filter dreams based on search and type
  const filteredDreams = dreams
    .filter((dream) => {
      const matchesSearch =
        dream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dream.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dream.emotions.some((emotion) => emotion.toLowerCase().includes(searchTerm.toLowerCase())) ||
        dream.symbols.some((symbol) => symbol.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesType = selectedType === "all" || dream.type === selectedType

      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

  const handleDeleteDream = (id: string) => {
    setDreamToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (dreamToDelete) {
      setDreams(dreams.filter((dream) => dream.id !== dreamToDelete))
      setDreamToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  // Determine if dream occurred during day or night
  const isDayDream = (dateString: string) => {
    const hours = new Date(dateString).getHours()
    return hours >= 6 && hours < 20
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dream Journal</h1>
        <p className="text-muted-foreground">Record and explore your dreams to uncover patterns and insights.</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-[350px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search dreams, emotions, or symbols..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="lucid">Lucid</TabsTrigger>
              <TabsTrigger value="symbolic">Symbolic</TabsTrigger>
              <TabsTrigger value="visitation">Visitation</TabsTrigger>
            </TabsList>
          </Tabs>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {dreamTypes
                .filter((type) => !["all", "lucid", "symbolic", "visitation"].includes(type.value))
                .map((type) => (
                  <DropdownMenuItem key={type.value} onClick={() => setSelectedType(type.value)}>
                    {type.label}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" onClick={toggleSortOrder}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <Button asChild>
            <Link href="/dashboard/dreams/new">
              <Plus className="mr-2 h-4 w-4" /> New Dream
            </Link>
          </Button>
        </div>
      </div>

      {filteredDreams.length > 0 ? (
        <div className="space-y-6">
          {filteredDreams.map((dream) => (
            <Card key={dream.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {dream.title}
                      {dream.isRecurring && (
                        <Badge variant="outline" className="ml-2">
                          Recurring
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" /> {formatDate(dream.date)}
                      {isDayDream(dream.date) ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                    </CardDescription>
                  </div>
                  <Badge>{dream.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 whitespace-pre-line text-sm">{dream.description}</p>
                <div className="space-y-3">
                  <div>
                    <h4 className="mb-1.5 text-sm font-medium">Emotions:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {dream.emotions.map((emotion) => (
                        <Badge key={emotion} variant="secondary">
                          {emotion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-1.5 text-sm font-medium">Symbols:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {dream.symbols.map((symbol) => (
                        <Badge key={symbol} variant="outline">
                          {symbol}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/dreams/${dream.id}`}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteDream(dream.id)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <p className="text-muted-foreground">No dreams found</p>
            <p className="text-sm text-muted-foreground">
              {searchTerm || selectedType !== "all"
                ? "Try adjusting your search or filters"
                : "Record your first dream to get started"}
            </p>
            {!searchTerm && selectedType === "all" && (
              <Button asChild className="mt-4">
                <Link href="/dashboard/dreams/new">
                  <Plus className="mr-2 h-4 w-4" /> Record Dream
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Dream</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this dream? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
