"use client"

import { useState } from "react"
import { Search, Play, Pause, Clock, BookOpen, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock spirit guide exercises
const mockExercises = [
  {
    id: "1",
    title: "Meeting Your Spirit Guide Meditation",
    description: "A guided meditation to help you connect with your primary spirit guide.",
    duration: 15,
    level: "beginner",
    category: "meditation",
    favorited: true,
    completed: true,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Sarah Johnson",
      title: "Spiritual Guide",
      image: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "2",
    title: "Automatic Writing for Guide Communication",
    description: "Learn how to use automatic writing to receive messages from your guides.",
    duration: 20,
    level: "intermediate",
    category: "channeling",
    favorited: false,
    completed: false,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Michael Chen",
      title: "Intuitive Channel",
      image: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "3",
    title: "Recognizing Signs from Your Guides",
    description: "Develop awareness of the subtle ways your guides communicate with you daily.",
    duration: 10,
    level: "beginner",
    category: "awareness",
    favorited: true,
    completed: false,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Emily Rodriguez",
      title: "Spiritual Teacher",
      image: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "4",
    title: "Deepening Your Guide Connection",
    description: "Advanced techniques to strengthen your relationship with your spirit guides.",
    duration: 25,
    level: "advanced",
    category: "meditation",
    favorited: false,
    completed: false,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "David Thompson",
      title: "Shamanic Practitioner",
      image: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "5",
    title: "Working with Angelic Guides",
    description: "Connect specifically with angelic beings for guidance and protection.",
    duration: 18,
    level: "intermediate",
    category: "channeling",
    favorited: false,
    completed: true,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Aisha Patel",
      title: "Angel Intuitive",
      image: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "6",
    title: "Journaling to Connect with Guides",
    description: "Use journaling prompts to open a dialogue with your spiritual guides.",
    duration: 12,
    level: "beginner",
    category: "writing",
    favorited: true,
    completed: false,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "James Wilson",
      title: "Intuitive Coach",
      image: "/placeholder.svg?height=40&width=40",
    },
  },
]

// Categories for filtering
const categories = [
  { value: "all", label: "All Exercises" },
  { value: "meditation", label: "Meditation" },
  { value: "channeling", label: "Channeling" },
  { value: "awareness", label: "Awareness" },
  { value: "writing", label: "Writing" },
]

// Levels for filtering
const levels = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
]

export default function SpiritGuidesPage() {
  const [exercises, setExercises] = useState(mockExercises)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [currentExercise, setCurrentExercise] = useState<(typeof mockExercises)[0] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  // Filter exercises based on search, category, and level
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || exercise.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || exercise.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
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

  const handleStartExercise = (exercise: (typeof mockExercises)[0]) => {
    setCurrentExercise(exercise)
    setIsPlaying(true)
    setProgress(0)

    // Simulate progress for demo purposes
    const interval = setInterval(
      () => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsPlaying(false)
            // Mark as completed
            setExercises(
              exercises.map((ex) => {
                if (ex.id === exercise.id) {
                  return { ...ex, completed: true }
                }
                return ex
              }),
            )
            return 100
          }
          return prev + 1
        })
      },
      (exercise.duration * 60 * 10) / 100,
    ) // Simulate progress based on duration
  }

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleCloseExercise = () => {
    setCurrentExercise(null)
    setIsPlaying(false)
    setProgress(0)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Spirit Guide Connection</h1>
        <p className="text-muted-foreground">
          Exercises and meditations to help you connect with your spiritual guides.
        </p>
      </div>

      {currentExercise ? (
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{currentExercise.title}</CardTitle>
                <CardDescription className="mt-1">
                  {currentExercise.duration} minute {currentExercise.category} exercise
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleCloseExercise}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video overflow-hidden rounded-md bg-muted">
              <img
                src={currentExercise.image || "/placeholder.svg"}
                alt={currentExercise.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={handleTogglePlay}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <span className="text-sm font-medium">
                    {Math.floor((progress / 100) * currentExercise.duration)}:
                    {Math.floor(((progress / 100) * currentExercise.duration * 60) % 60)
                      .toString()
                      .padStart(2, "0")}{" "}
                    / {currentExercise.duration}:00
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleFavorite(currentExercise.id)}
                  className={currentExercise.favorited ? "text-rose-500" : ""}
                >
                  <Heart className={`mr-1 h-4 w-4 ${currentExercise.favorited ? "fill-current" : ""}`} />
                  {currentExercise.favorited ? "Favorited" : "Add to Favorites"}
                </Button>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div className="rounded-lg bg-muted p-4">
              <h3 className="mb-2 font-medium">Instructions</h3>
              <p className="text-sm text-muted-foreground">
                Find a quiet, comfortable space where you won't be disturbed. Sit or lie down in a relaxed position.
                Close your eyes and take several deep breaths to center yourself. Follow along with the guided exercise,
                remaining open to whatever experiences arise. Remember that connecting with your guides is a personal
                experience that may manifest in different ways for different people.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={currentExercise.author.image || "/placeholder.svg"}
                  alt={currentExercise.author.name}
                />
                <AvatarFallback>{currentExercise.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{currentExercise.author.name}</p>
                <p className="text-sm text-muted-foreground">{currentExercise.author.title}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-6 md:grid-cols-[1fr_250px]">
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 sm:flex-row">
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
            <div className="flex flex-1 gap-4">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:max-w-[400px]">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
                  {categories.map((category) => (
                    <TabsTrigger key={category.value} value={category.value}>
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="w-full sm:max-w-[300px]">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                  {levels.map((level) => (
                    <TabsTrigger key={level.value} value={level.value}>
                      {level.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Exercise Cards */}
          {filteredExercises.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                    <Badge variant="secondary">{exercise.category}</Badge>
                    <Button size="sm" onClick={() => handleStartExercise(exercise)} className="gap-1">
                      {exercise.completed ? (
                        <>
                          <BookOpen className="h-4 w-4" /> Revisit
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" /> Start
                        </>
                      )}
                    </Button>
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

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your spirit guide connection journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Completed Exercises</span>
                  <span className="font-medium">
                    {exercises.filter((e) => e.completed).length}/{exercises.length}
                  </span>
                </div>
                <Progress
                  value={(exercises.filter((e) => e.completed).length / exercises.length) * 100}
                  className="h-2"
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Recently Completed</h4>
                {exercises
                  .filter((e) => e.completed)
                  .slice(0, 3)
                  .map((exercise) => (
                    <div key={exercise.id} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm">{exercise.title}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About Spirit Guides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Spirit guides are spiritual beings that provide guidance, wisdom, and support on your spiritual journey.
                They may appear as ancestors, animals, angels, or other forms.
              </p>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Common Types of Guides:</h4>
                <ul className="list-disc pl-5 text-sm">
                  <li>Ancestral Guides</li>
                  <li>Animal Guides</li>
                  <li>Angelic Beings</li>
                  <li>Ascended Masters</li>
                  <li>Star Beings</li>
                </ul>
              </div>
              <p className="text-sm">
                Remember that connecting with your guides is a personal journey. Be patient and open to receiving
                guidance in unexpected ways.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
