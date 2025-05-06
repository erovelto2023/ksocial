"use client"

import { useState } from "react"
import { Search, Play, Info, Heart, Clock, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock emotional release exercises
const mockExercises = [
  {
    id: "1",
    title: "Emotional Freedom Technique (EFT)",
    description: "A tapping technique to release emotional blockages and reduce stress.",
    duration: 10,
    emotion: "anxiety",
    level: "beginner",
    favorited: true,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "Somatic Release Meditation",
    description: "A guided practice to identify and release emotions stored in the body.",
    duration: 15,
    emotion: "grief",
    level: "intermediate",
    favorited: false,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    title: "Anger Release Breathwork",
    description: "Powerful breathing techniques to safely release anger and frustration.",
    duration: 8,
    emotion: "anger",
    level: "beginner",
    favorited: true,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "4",
    title: "Inner Child Healing Visualization",
    description: "Connect with and heal your inner child through guided visualization.",
    duration: 20,
    emotion: "trauma",
    level: "advanced",
    favorited: false,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "5",
    title: "Forgiveness Ritual",
    description: "A structured practice to release resentment through forgiveness work.",
    duration: 25,
    emotion: "resentment",
    level: "intermediate",
    favorited: false,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "6",
    title: "Vocal Toning for Emotional Release",
    description: "Use your voice to move stuck emotions through sound vibration.",
    duration: 12,
    emotion: "general",
    level: "beginner",
    favorited: true,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "7",
    title: "Shadow Work Journaling",
    description: "Guided journaling prompts to explore and integrate shadow aspects.",
    duration: 30,
    emotion: "shame",
    level: "advanced",
    favorited: false,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "8",
    title: "Body Scan for Emotional Awareness",
    description: "Learn to identify where emotions are held in your body.",
    duration: 15,
    emotion: "general",
    level: "beginner",
    favorited: false,
    image: "/placeholder.svg?height=200&width=400",
  },
]

// Emotions for filtering
const emotions = [
  { value: "all", label: "All Emotions" },
  { value: "anxiety", label: "Anxiety" },
  { value: "grief", label: "Grief" },
  { value: "anger", label: "Anger" },
  { value: "trauma", label: "Trauma" },
  { value: "resentment", label: "Resentment" },
  { value: "shame", label: "Shame" },
  { value: "general", label: "General" },
]

// Levels for filtering
const levels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
]

export default function EmotionalReleasePage() {
  const [exercises, setExercises] = useState(mockExercises)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmotion, setSelectedEmotion] = useState("all")
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [selectedExercise, setSelectedExercise] = useState<(typeof mockExercises)[0] | null>(null)

  // Filter exercises based on search, emotion, and levels
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEmotion = selectedEmotion === "all" || exercise.emotion === selectedEmotion
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(exercise.level)
    return matchesSearch && matchesEmotion && matchesLevel
  })

  const handleToggleFavorite = (id: string) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === id) {
          return { ...exercise, favorited: !exercise.favorited }
        }
        return exercise
      }),
    )
  }

  const handleLevelChange = (level: string) => {
    setSelectedLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]))
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Emotional Release Exercises</h1>
        <p className="text-muted-foreground">
          Practices to help you process and release difficult emotions in a healthy way.
        </p>
      </div>

      <div className="mb-8 space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search exercises..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Tabs value={selectedEmotion} onValueChange={setSelectedEmotion} className="w-full sm:max-w-[500px]">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-8">
              {emotions.map((emotion) => (
                <TabsTrigger key={emotion.value} value={emotion.value}>
                  {emotion.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto gap-1">
                <Filter className="h-4 w-4" /> Level
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {levels.map((level) => (
                <DropdownMenuCheckboxItem
                  key={level.value}
                  checked={selectedLevels.includes(level.value)}
                  onCheckedChange={() => handleLevelChange(level.value)}
                >
                  {level.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Exercise Cards */}
        {filteredExercises.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={exercise.image || "/placeholder.svg"}
                    alt={exercise.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <Badge variant="outline" className="bg-black/50 text-white backdrop-blur-sm">
                      {exercise.level}
                    </Badge>
                    <Badge variant="outline" className="bg-black/50 text-white backdrop-blur-sm">
                      <Clock className="mr-1 h-3 w-3" /> {exercise.duration} min
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{exercise.title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 ${exercise.favorited ? "text-rose-500" : ""}`}
                      onClick={() => handleToggleFavorite(exercise.id)}
                    >
                      <Heart className={exercise.favorited ? "fill-current" : ""} />
                    </Button>
                  </div>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between pt-0">
                  <Badge>{exercise.emotion}</Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" onClick={() => setSelectedExercise(exercise)} className="gap-1">
                        <Play className="h-4 w-4" /> Start
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>{exercise.title}</DialogTitle>
                        <DialogDescription>
                          {exercise.duration} minute exercise for {exercise.emotion} release
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="aspect-video overflow-hidden rounded-md bg-muted">
                          <img
                            src={exercise.image || "/placeholder.svg"}
                            alt={exercise.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-medium">Instructions</h3>
                          <p className="text-sm text-muted-foreground">
                            Find a quiet space where you won't be disturbed. Take a few deep breaths to center yourself.
                            As you practice this exercise, remember that emotional release can sometimes feel intense.
                            Be gentle with yourself and know that it's okay to pause if needed.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            This exercise helps release {exercise.emotion} by working directly with the body's energy
                            system. Follow along with the guided instructions, and allow yourself to fully experience
                            any emotions that arise without judgment.
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <Button variant="outline" className="gap-1">
                            <Info className="h-4 w-4" /> Learn More
                          </Button>
                          <Button className="gap-1">
                            <Play className="h-4 w-4" /> Begin Practice
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <p className="text-muted-foreground">No exercises found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search filters or check back later for new content
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Information Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">About Emotional Release</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Why It's Important</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Emotions that aren't properly processed can become trapped in the body, leading to physical tension,
                chronic stress, and even illness. Regular emotional release practices help prevent this buildup and
                support overall wellbeing.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Signs You Need Release</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                <li>Feeling emotionally numb or disconnected</li>
                <li>Unexplained physical tension or pain</li>
                <li>Recurring emotional triggers</li>
                <li>Difficulty expressing emotions</li>
                <li>Feeling "stuck" in certain emotional patterns</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>After Practice Care</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                After emotional release work, it's important to be gentle with yourself. Drink plenty of water, rest if
                needed, journal about your experience, and consider reaching out to a trusted friend or professional if
                intense emotions were stirred up.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
