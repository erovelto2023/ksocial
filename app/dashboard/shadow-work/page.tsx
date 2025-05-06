"use client"

import { useState } from "react"
import { Search, Filter, ArrowRight, BookOpen, Save, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock shadow work prompts
const mockPrompts = [
  {
    id: "1",
    title: "Exploring Your Inner Critic",
    description: "Identify and dialogue with your inner critic to understand its origins and purpose.",
    category: "self-awareness",
    difficulty: "moderate",
    estimatedTime: 20,
    questions: [
      "When did you first notice your inner critic's voice?",
      "What specific phrases does your inner critic use most often?",
      "In what situations does your inner critic become loudest?",
      "How does your inner critic's voice resemble someone from your past?",
      "What might your inner critic be trying to protect you from?",
      "If your inner critic had a name and appearance, what would they be like?",
      "Write a dialogue between yourself and your inner critic, allowing both sides to speak freely.",
    ],
  },
  {
    id: "2",
    title: "Childhood Wounds Reflection",
    description: "Explore early experiences that shaped your beliefs and emotional patterns.",
    category: "trauma",
    difficulty: "challenging",
    estimatedTime: 30,
    questions: [
      "What messages did you receive about your worth as a child?",
      "Describe a childhood experience where you felt misunderstood or unseen.",
      "What emotions were discouraged or punished in your family?",
      "How have these early experiences shaped your adult relationships?",
      "What beliefs about yourself formed during childhood that you now question?",
      "Write a letter to your child self, offering the understanding and support they needed.",
    ],
  },
  {
    id: "3",
    title: "Exploring Your Triggers",
    description: "Identify emotional triggers and trace them to their origins.",
    category: "emotional-patterns",
    difficulty: "moderate",
    estimatedTime: 25,
    questions: [
      "What situations consistently trigger strong emotional reactions in you?",
      "Describe the physical sensations you experience when triggered.",
      "What thoughts automatically arise when you're triggered?",
      "How do these triggers connect to past experiences or wounds?",
      "How do you typically respond when triggered? How would you prefer to respond?",
      "What might these triggers be trying to teach you about yourself?",
    ],
  },
  {
    id: "4",
    title: "Meeting Your Shadow Self",
    description: "Visualization exercise to connect with disowned aspects of yourself.",
    category: "shadow-aspects",
    difficulty: "challenging",
    estimatedTime: 35,
    questions: [
      "What qualities or traits do you judge harshly in others?",
      "Which of these qualities might you possess but deny or repress?",
      "What parts of yourself do you hide from others? Why?",
      "Imagine meeting your shadow self. Describe their appearance and demeanor.",
      "What gifts or strengths might your shadow self possess that you've been unable to access?",
      "Write a dialogue between your conscious self and your shadow self.",
      "How might integrating these shadow aspects enrich your life?",
    ],
  },
  {
    id: "5",
    title: "Examining Your Relationship Patterns",
    description: "Identify recurring patterns in relationships and their unconscious roots.",
    category: "relationships",
    difficulty: "moderate",
    estimatedTime: 25,
    questions: [
      "What patterns do you notice repeating across your significant relationships?",
      "What unmet needs are you trying to fulfill through these relationships?",
      "How do these patterns connect to your early relationships with caregivers?",
      "What fears arise when you consider changing these patterns?",
      "How might you be unconsciously creating or maintaining these dynamics?",
      "What would healthier relationship patterns look like for you?",
    ],
  },
  {
    id: "6",
    title: "Exploring Your Relationship with Power",
    description: "Examine your beliefs and experiences around personal power.",
    category: "self-awareness",
    difficulty: "moderate",
    estimatedTime: 20,
    questions: [
      "How comfortable are you with exercising power or authority?",
      "When have you felt powerless in your life? How did you respond?",
      "How was power expressed or withheld in your family of origin?",
      "In what ways might you give your power away to others?",
      "How do you react to authority figures? What does this reveal about your relationship with power?",
      "What would a healthy relationship with your own power look like?",
    ],
  },
]

// Categories for filtering
const categories = [
  { value: "all", label: "All Categories" },
  { value: "self-awareness", label: "Self-Awareness" },
  { value: "trauma", label: "Trauma Healing" },
  { value: "emotional-patterns", label: "Emotional Patterns" },
  { value: "shadow-aspects", label: "Shadow Aspects" },
  { value: "relationships", label: "Relationships" },
]

// Difficulty levels for filtering
const difficultyLevels = [
  { value: "gentle", label: "Gentle" },
  { value: "moderate", label: "Moderate" },
  { value: "challenging", label: "Challenging" },
]

export default function ShadowWorkPage() {
  const [prompts, setPrompts] = useState(mockPrompts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [activePrompt, setActivePrompt] = useState<typeof mockPrompts[0] | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [isJournalOpen, setIsJournalOpen] = useState(false)

  // Filter prompts based on search, category, and difficulty
  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory
    const matchesDifficulty =
      selectedDifficulties.length === 0 || selectedDifficulties.includes(prompt.difficulty)
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty]
    )
  }

  const startPrompt = (prompt: typeof mockPrompts[0]) => {
    setActivePrompt(prompt)
    setCurrentQuestionIndex(0)
    setResponses({})
  }

  const handleResponseChange = (questionIndex: number, response: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionIndex]: response,
    }))
  }

  const nextQuestion = () => {
    if (!activePrompt) return
    
    if (currentQuestionIndex < activePrompt.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // All questions answered, show journal
      setIsJournalOpen(true)
    }
  }

  const calculateProgress = () => {
    if (!activePrompt) return 0
    return ((currentQuestionIndex + 1) / activePrompt.questions.length) * 100
  }

  const formatJournalEntry = () => {
    if (!activePrompt) return ""

    let entry = `# ${activePrompt.title}\n\n`
    entry += `${new Date().toLocaleDateString()}\n\n`

    activePrompt.questions.forEach((question, index) => {
      entry += `## ${question}\n\n`
      entry += `${responses[index] || "No response"}\n\n`
    })

    return entry
  }

  const downloadJournalEntry = () => {
    const journalText = formatJournalEntry()
    const blob = new Blob([journalText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `shadow-work-${activePrompt?.title.toLowerCase().replace(/\s+/g, "-")}-${new Date().toLocaleDateString()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Shadow Work</h1>
        <p className="text-muted-foreground">
          Explore and integrate the hidden aspects of yourself through guided journaling prompts.
        </p>
      </div>

      {activePrompt ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{activePrompt.title}</CardTitle>
                  <CardDescription>
                    {activePrompt.estimatedTime} minute exercise • {activePrompt.difficulty} difficulty
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setActivePrompt(null)}>
                  Exit Exercise
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>
                    Question {currentQuestionIndex + 1} of {activePrompt.questions.length}
                  </span>
                  <span>{calculateProgress()}% Complete</span>
                </div>
                <Progress value={calculateProgress()} className="h-2" />
              </div>

              <div className="rounded-lg bg-muted p-6">
                <h3 className="mb-4 text-lg font-medium">
                  {activePrompt.questions[currentQuestionIndex]}
                </h3>
                <Textarea
                  placeholder="Write your response here..."
                  className="min-h-[200px]"
                  value={responses[currentQuestionIndex] || ""}
                  onChange={(e) => handleResponseChange(currentQuestionIndex, e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={nextQuestion} className="gap-2">
                  {currentQuestionIndex < activePrompt.questions.length - 1 ? (
                    <>
                      Next Question <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Complete <BookOpen className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Dialog open={isJournalOpen} onOpenChange={setIsJournalOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Your Shadow Work Journal Entry</DialogTitle>
                <DialogDescription>
                  Review your responses and save them to your journal.
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-[60vh] overflow-y-auto">
                <div className="space-y-6 p-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{activePrompt.title}</h2>
                    <p className="text-muted-foreground">{new Date().toLocaleDateString()}</p>
                  </div>
                  {activePrompt.questions.map((question, index) => (
                    <div key={index} className="space-y-2 rounded-lg border p-4">
                      <h3 className="font-medium">{question}</h3>
                      <p className="whitespace-pre-line">
                        {responses[index] || "No response provided"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={downloadJournalEntry} className="gap-2">
                  <Download className="h-4 w-4" /> Download
                </Button>
                <Button onClick={() => setActivePrompt(null)} className="gap-2">
                  <Save className="h-4 w-4" /> Save & Finish
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search prompts..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full sm:max-w-[500px]"
            >
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                {categories.map((category) => (
                  <TabsTrigger key={category.value} value={category.value}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto gap-1">
                  <Filter className="h-4 w-4" /> Difficulty
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {difficultyLevels.map((level) => (
                  <DropdownMenuCheckboxItem
                    key={level.value}
                    checked={selectedDifficulties.includes(level.value)}
                    onCheckedChange={() => handleDifficultyChange(level.value)}
                  >
                    {level.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Prompt Cards */}
          {filteredPrompts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPrompts.map((prompt) => (
                <Card key={prompt.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle>{prompt.title}</CardTitle>
                      <Badge>{prompt.difficulty}</Badge>
                    </div>
                    <CardDescription>{prompt.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{prompt.estimatedTime} minutes</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <Badge variant="outline">{prompt.category}</Badge>
                    <Button size="sm" onClick={() => startPrompt(prompt)}>
                      Begin
                    </Button>
                  </CardFooter>
                </Card>
              )\
