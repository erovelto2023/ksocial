"use client"

import { useState } from "react"
import { Search, Clock, Heart, AlertCircle, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

// Mock grounding exercises
const mockExercises = [
  {
    id: "1",
    title: "5-4-3-2-1 Sensory Grounding",
    description: "Use your five senses to anchor yourself to the present moment.",
    duration: 5,
    category: "anxiety",
    favorited: true,
    steps: [
      "Find 5 things you can see around you",
      "Notice 4 things you can touch or feel",
      "Acknowledge 3 things you can hear",
      "Identify 2 things you can smell",
      "Focus on 1 thing you can taste",
    ],
  },
  {
    id: "2",
    title: "Deep Breathing Square",
    description: "A simple breathing technique to calm the nervous system quickly.",
    duration: 3,
    category: "panic",
    favorited: false,
    steps: [
      "Breathe in for 4 counts",
      "Hold for 4 counts",
      "Exhale for 4 counts",
      "Hold for 4 counts",
      "Repeat 4 times",
    ],
  },
  {
    id: "3",
    title: "Body Scan Grounding",
    description: "Quickly scan through your body to reconnect with physical sensations.",
    duration: 4,
    category: "dissociation",
    favorited: true,
    steps: [
      "Focus on your feet touching the ground",
      "Notice the sensation of your clothes on your skin",
      "Feel the weight of your body against the chair or floor",
      "Bring awareness to your hands and fingers",
      "Notice your breath moving in and out of your body",
    ],
  },
  {
    id: "4",
    title: "Cold Water Grounding",
    description: "Use cold water to quickly shift your nervous system state.",
    duration: 2,
    category: "panic",
    favorited: false,
    steps: [
      "Find a source of cold water",
      "Place your hands under the cold water",
      "Splash cold water on your face if possible",
      "Focus on the sensation of the cold",
      "Take slow, deep breaths as you feel the cold",
    ],
  },
  {
    id: "5",
    title: "Naming Objects Grounding",
    description: "A simple cognitive exercise to bring your mind back to the present.",
    duration: 3,
    category: "anxiety",
    favorited: false,
    steps: [
      "Look around your environment",
      "Name objects you see out loud",
      "Try to name 10-15 different objects",
      "Notice the color, shape, and function of each object",
      "Focus on being precise and specific",
    ],
  },
  {
    id: "6",
    title: "Physical Grounding",
    description: "Use physical movement to reconnect with your body.",
    duration: 5,
    category: "dissociation",
    favorited: true,
    steps: [
      "Stand up if possible",
      "Push your feet firmly into the ground",
      "Stretch your arms overhead",
      "Gently tap or massage your limbs",
      "Do 5-10 jumping jacks or march in place",
    ],
  },
]

// Categories for filtering
const categories = [
  { value: "all", label: "All Exercises" },
  { value: "anxiety", label: "Anxiety" },
  { value: "panic", label: "Panic Attacks" },
  { value: "dissociation", label: "Dissociation" },
]

export default function GroundingPage() {
  const [exercises, setExercises] = useState(mockExercises)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeExercise, setActiveExercise] = useState<(typeof mockExercises)[0] | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  // Filter exercises based on search and category
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || exercise.category === selectedCategory
    return matchesSearch && matchesCategory
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

  const startExercise = (exercise: (typeof mockExercises)[0]) => {
    setActiveExercise(exercise)
    setCurrentStep(0)
    setProgress(0)
  }

  const nextStep = () => {
    if (!activeExercise) return

    if (currentStep < activeExercise.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setProgress(((currentStep + 1) / activeExercise.steps.length) * 100)
    } else {
      // Exercise complete
      setProgress(100)
      // Wait a moment before resetting
      setTimeout(() => {
        setActiveExercise(null)
        setCurrentStep(0)
        setProgress(0)
      }, 2000)
    }
  }

  const resetExercise = () => {
    setActiveExercise(null)
    setCurrentStep(0)
    setProgress(0)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Emergency Grounding Exercises</h1>
        <p className="text-muted-foreground">
          Quick techniques to help you return to the present moment during difficult times.
        </p>
      </div>

      {activeExercise ? (
        <div className="mb-8 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{activeExercise.title}</CardTitle>
                  <CardDescription>
                    {activeExercise.duration} minute exercise for {activeExercise.category}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={resetExercise}>
                  Exit Exercise
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Progress value={progress} className="h-2" />

              <div className="rounded-lg bg-muted p-6 text-center">
                <h3 className="mb-4 text-xl font-medium">Step {currentStep + 1}</h3>
                <p className="text-lg">{activeExercise.steps[currentStep]}</p>
              </div>

              <div className="flex justify-center">
                <Button onClick={nextStep} size="lg" className="gap-2">
                  {currentStep < activeExercise.steps.length - 1 ? (
                    <>
                      Next Step <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Complete <CheckCircle className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Remember</AlertTitle>
            <AlertDescription>
              Take your time with each step. There's no rush. If you need to repeat a step, simply go back.
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <>
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>In case of emergency</AlertTitle>
            <AlertDescription>
              These exercises are designed for mild to moderate distress. If you're experiencing a severe crisis, please
              contact emergency services or a mental health crisis line immediately.
            </AlertDescription>
          </Alert>

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
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:max-w-[500px]">
                <TabsList className="grid w-full grid-cols-4">
                  {categories.map((category) => (
                    <TabsTrigger key={category.value} value={category.value}>
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Exercise Cards */}
            {filteredExercises.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredExercises.map((exercise) => (
                  <Card key={exercise.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle>{exercise.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5" /> {exercise.duration} minutes
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 ${exercise.favorited ? "text-rose-500" : ""}`}
                          onClick={() => handleToggleFavorite(exercise.id)}
                        >
                          <Heart className={exercise.favorited ? "fill-current" : ""} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{exercise.description}</p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                      <Badge>{exercise.category}</Badge>
                      <Button size="sm" onClick={() => startExercise(exercise)}>
                        Start Now
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

          {/* Information Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">About Grounding</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>What is Grounding?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Grounding techniques help reconnect you to the present moment when you're feeling overwhelmed,
                    anxious, or dissociated. These exercises work by directing your attention to the physical sensations
                    of your body and your immediate environment, helping to interrupt distressing thought patterns.
                  </p>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <h4 className="font-medium">When to Use Grounding:</h4>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                      <li>During anxiety or panic attacks</li>
                      <li>When experiencing flashbacks or intrusive thoughts</li>
                      <li>During moments of dissociation or feeling "unreal"</li>
                      <li>When overwhelmed by strong emotions</li>
                      <li>Before important events that trigger nervousness</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tips for Effective Grounding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Practice Regularly</h4>
                    <p className="text-sm text-muted-foreground">
                      Grounding techniques work best when practiced regularly, even when you're not in distress. This
                      helps your brain and body learn the response more effectively.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Find What Works for You</h4>
                    <p className="text-sm text-muted-foreground">
                      Different techniques work for different people. Experiment with various exercises to discover
                      which ones help you the most.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Keep It Accessible</h4>
                    <p className="text-sm text-muted-foreground">
                      Save your favorite grounding techniques somewhere easily accessible, like a note on your phone, so
                      you can quickly reference them when needed.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
