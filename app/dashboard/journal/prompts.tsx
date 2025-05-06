"use client"

import { useState } from "react"
import { Search, Plus, Tag, Clock, BookOpen, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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

// Mock journal prompts data
const mockPrompts = [
  {
    id: "1",
    title: "Inner Child Healing",
    description: "Connect with your inner child and explore unresolved emotions from your past.",
    category: "inner-child",
    duration: 20,
    isFavorite: true,
    tags: ["Inner Child", "Healing", "Emotional Release"],
    questions: [
      "Close your eyes and visualize yourself as a child. What age are you? Where are you?",
      "What emotions does your inner child seem to be feeling?",
      "What does your inner child need most right now?",
      "Write a letter from your adult self to your inner child.",
      "What patterns from childhood are still affecting you today?",
      "How can you better nurture your inner child moving forward?",
    ],
  },
  {
    id: "2",
    title: "Shadow Work Exploration",
    description: "Explore the hidden aspects of yourself that you may have repressed or denied.",
    category: "shadow",
    duration: 30,
    isFavorite: false,
    tags: ["Shadow Work", "Self-Discovery", "Integration"],
    questions: [
      "What qualities in others trigger strong emotional reactions in you?",
      "What parts of yourself do you try to hide from others?",
      "What emotions do you find most difficult to express?",
      "What patterns or behaviors do you judge most harshly in others?",
      "How might these judgments reflect disowned parts of yourself?",
      "How might embracing these shadow aspects benefit your life?",
    ],
  },
  {
    id: "3",
    title: "Chakra Check-In",
    description: "Assess the balance of your energy centers and identify areas that need attention.",
    category: "energy",
    duration: 15,
    isFavorite: true,
    tags: ["Chakras", "Energy Work", "Balance"],
    questions: [
      "How do you feel in your root chakra? Are you feeling grounded and secure?",
      "How is your sacral chakra? Are you able to experience joy and pleasure?",
      "How is your solar plexus? Do you feel confident and empowered?",
      "How is your heart chakra? Are you able to give and receive love freely?",
      "How is your throat chakra? Can you express yourself authentically?",
      "How is your third eye? Are you connected to your intuition?",
      "How is your crown chakra? Do you feel spiritually connected?",
    ],
  },
  {
    id: "4",
    title: "Emotional Release",
    description: "Process and release difficult emotions that may be stored in your body.",
    category: "emotional",
    duration: 25,
    isFavorite: false,
    tags: ["Emotional Healing", "Release Work", "Somatic"],
    questions: [
      "What emotion feels most present for you today?",
      "Where do you feel this emotion in your body?",
      "What message might this emotion be trying to convey?",
      "What would you like to express about this emotion that you haven't yet?",
      "What do you need to feel safe enough to fully release this emotion?",
      "Write a dialogue between yourself and this emotion.",
    ],
  },
  {
    id: "5",
    title: "Gratitude Practice",
    description: "Cultivate an attitude of gratitude to shift your perspective and energy.",
    category: "mindfulness",
    duration: 10,
    isFavorite: true,
    tags: ["Gratitude", "Positivity", "Mindfulness"],
    questions: [
      "What are three things you're grateful for in your life right now?",
      "What is something about your body you're grateful for today?",
      "What challenge are you secretly grateful for?",
      "Who has positively impacted your life recently? How?",
      "What simple pleasure brought you joy today?",
      "What aspect of nature are you thankful for?",
    ],
  },
  {
    id: "6",
    title: "Dream Exploration",
    description: "Analyze your dreams to uncover subconscious patterns and messages.",
    category: "dreams",
    duration: 20,
    isFavorite: false,
    tags: ["Dream Work", "Subconscious", "Symbolism"],
    questions: [
      "Describe a recent dream in as much detail as you can remember.",
      "What emotions came up during this dream?",
      "What symbols or recurring themes appeared?",
      "How might these symbols relate to your current life situation?",
      "If you could rewrite this dream, how would you change it?",
      "What message might your subconscious be trying to communicate?",
    ],
  },
  {
    id: "7",
    title: "Self-Compassion Practice",
    description: "Cultivate kindness toward yourself, especially during challenging times.",
    category: "self-care",
    duration: 15,
    isFavorite: false,
    tags: ["Self-Compassion", "Self-Love", "Healing"],
    questions: [
      "What aspects of yourself do you find difficult to accept?",
      "How would you speak to a dear friend facing the same challenges you are?",
      "Write a compassionate letter to yourself from the perspective of a loving friend.",
      "What do you need most right now to feel supported?",
      "How can you practice more self-compassion in your daily life?",
      "What self-critical thoughts can you reframe with kindness?",
    ],
  },
  {
    id: "8",
    title: "Spiritual Connection",
    description: "Deepen your connection to your spiritual self and higher guidance.",
    category: "spiritual",
    duration: 20,
    isFavorite: true,
    tags: ["Spirituality", "Higher Self", "Divine Connection"],
    questions: [
      "How would you describe your relationship with your spiritual self?",
      "When do you feel most spiritually connected?",
      "What practices help you connect with your higher guidance?",
      "What message might your higher self have for you right now?",
      "How can you integrate more spiritual awareness into your daily life?",
      "What spiritual questions are you currently exploring?",
    ],
  },
  {
    id: "9",
    title: "Healing Relationships",
    description: "Explore patterns in your relationships and pathways to healing.",
    category: "relationships",
    duration: 25,
    isFavorite: false,
    tags: ["Relationships", "Healing", "Patterns"],
    questions: [
      "What patterns do you notice repeating in your relationships?",
      "How might these patterns connect to your early relationships?",
      "What qualities do you most value in relationships?",
      "What boundaries might you need to establish or strengthen?",
      "Is there a relationship in your life that needs healing? What steps could you take?",
      "How can you bring more authenticity to your relationships?",
    ],
  },
  {
    id: "10",
    title: "Future Self Visioning",
    description: "Connect with your future healed self for guidance and inspiration.",
    category: "manifestation",
    duration: 20,
    isFavorite: true,
    tags: ["Future Self", "Visioning", "Manifestation"],
    questions: [
      "Imagine yourself one year from now, having done significant healing work. What do you see?",
      "What qualities has your future self developed that you're currently working on?",
      "What advice would your future self give you about your current challenges?",
      "What daily practices is your future self engaged in?",
      "How does your future self handle difficult emotions or situations?",
      "Write a letter from your future self offering guidance and encouragement.",
    ],
  },
]

// Categories for filtering
const categories = [
  { value: "all", label: "All Prompts" },
  { value: "inner-child", label: "Inner Child" },
  { value: "shadow", label: "Shadow Work" },
  { value: "energy", label: "Energy Work" },
  { value: "emotional", label: "Emotional" },
  { value: "mindfulness", label: "Mindfulness" },
  { value: "dreams", label: "Dreams" },
  { value: "self-care", label: "Self-Care" },
  { value: "spiritual", label: "Spiritual" },
  { value: "relationships", label: "Relationships" },
  { value: "manifestation", label: "Manifestation" },
]

export default function JournalPromptsPage() {
  const [prompts, setPrompts] = useState(mockPrompts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isPromptOpen, setIsPromptOpen] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState<(typeof mockPrompts)[0] | null>(null)
  const [newPrompt, setNewPrompt] = useState({
    title: "",
    description: "",
    category: "emotional",
    duration: 15,
    tags: [] as string[],
    questions: [""] as string[],
  })
  const [newTag, setNewTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter prompts based on search and category
  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleToggleFavorite = (id: string) => {
    setPrompts(
      prompts.map((prompt) => {
        if (prompt.id === id) {
          return { ...prompt, isFavorite: !prompt.isFavorite }
        }
        return prompt
      }),
    )
  }

  const handleAddTag = () => {
    if (newTag.trim() && !newPrompt.tags.includes(newTag.trim())) {
      setNewPrompt({
        ...newPrompt,
        tags: [...newPrompt.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setNewPrompt({
      ...newPrompt,
      tags: newPrompt.tags.filter((t) => t !== tag),
    })
  }

  const handleAddQuestion = () => {
    setNewPrompt({
      ...newPrompt,
      questions: [...newPrompt.questions, ""],
    })
  }

  const handleUpdateQuestion = (index: number, value: string) => {
    const updatedQuestions = [...newPrompt.questions]
    updatedQuestions[index] = value
    setNewPrompt({
      ...newPrompt,
      questions: updatedQuestions,
    })
  }

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = [...newPrompt.questions]
    updatedQuestions.splice(index, 1)
    setNewPrompt({
      ...newPrompt,
      questions: updatedQuestions,
    })
  }

  const handleCreatePrompt = async () => {
    if (!newPrompt.title || !newPrompt.description || newPrompt.questions.some((q) => !q.trim())) return

    setIsSubmitting(true)

    try {
      // Here you would normally send the data to your API
      console.log("Creating prompt:", newPrompt)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add new prompt to the list
      const createdPrompt = {
        id: `prompt${Date.now()}`,
        ...newPrompt,
        isFavorite: false,
      }

      setPrompts([createdPrompt, ...prompts])
      setIsCreateDialogOpen(false)
      setNewPrompt({
        title: "",
        description: "",
        category: "emotional",
        duration: 15,
        tags: [],
        questions: [""],
      })
    } catch (error) {
      console.error("Error creating prompt:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenPrompt = (prompt: (typeof mockPrompts)[0]) => {
    setSelectedPrompt(prompt)
    setIsPromptOpen(true)
  }

  const handleStartJournaling = () => {
    if (!selectedPrompt) return

    // Here you would typically redirect to the journal entry page with the prompt
    window.location.href = `/dashboard/journal/new?prompt=${encodeURIComponent(JSON.stringify(selectedPrompt))}`
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Journal Prompts</h1>
        <p className="text-muted-foreground">
          Explore guided prompts to deepen your healing journey through reflective writing.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-[350px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search prompts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:w-auto">
            <TabsList className="h-9 grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="emotional">Emotional</TabsTrigger>
              <TabsTrigger value="spiritual">Spiritual</TabsTrigger>
              <TabsTrigger value="self-care">Self-Care</TabsTrigger>
            </TabsList>
          </Tabs>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Prompt
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Journal Prompt</DialogTitle>
                <DialogDescription>
                  Design a new journaling prompt to explore specific aspects of your healing journey.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="prompt-title">Title</Label>
                  <Input
                    id="prompt-title"
                    value={newPrompt.title}
                    onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })}
                    placeholder="e.g., Inner Child Healing"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="prompt-description">Description</Label>
                  <Textarea
                    id="prompt-description"
                    value={newPrompt.description}
                    onChange={(e) => setNewPrompt({ ...newPrompt, description: e.target.value })}
                    placeholder="Describe what this prompt explores..."
                    className="min-h-[80px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="prompt-category">Category</Label>
                    <Select
                      value={newPrompt.category}
                      onValueChange={(value) => setNewPrompt({ ...newPrompt, category: value })}
                    >
                      <SelectTrigger id="prompt-category">
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
                    <Label htmlFor="prompt-duration">Est. Duration (minutes)</Label>
                    <Select
                      value={newPrompt.duration.toString()}
                      onValueChange={(value) => setNewPrompt({ ...newPrompt, duration: Number.parseInt(value) })}
                    >
                      <SelectTrigger id="prompt-duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="20">20 minutes</SelectItem>
                        <SelectItem value="25">25 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="prompt-tags">Tags (up to 5)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="prompt-tags"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add tags"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddTag}
                      disabled={!newTag.trim() || newPrompt.tags.length >= 5}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newPrompt.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                        <button
                          type="button"
                          className="ml-1 rounded-full text-muted-foreground hover:text-foreground"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Journal Prompts/Questions</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddQuestion}
                      disabled={newPrompt.questions.length >= 10}
                    >
                      <Plus className="mr-1 h-3 w-3" /> Add Question
                    </Button>
                  </div>
                  <div className="space-y-3 mt-2">
                    {newPrompt.questions.map((question, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={question}
                          onChange={(e) => handleUpdateQuestion(index, e.target.value)}
                          placeholder={`Question ${index + 1}`}
                          className="flex-1"
                        />
                        {newPrompt.questions.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveQuestion(index)}
                            className="h-10 w-10 flex-shrink-0"
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreatePrompt}
                  disabled={
                    isSubmitting ||
                    !newPrompt.title ||
                    !newPrompt.description ||
                    newPrompt.questions.some((q) => !q.trim())
                  }
                >
                  {isSubmitting ? "Creating..." : "Create Prompt"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {filteredPrompts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPrompts.map((prompt) => (
            <Card key={prompt.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{prompt.title}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${prompt.isFavorite ? "text-amber-500" : ""}`}
                    onClick={() => handleToggleFavorite(prompt.id)}
                  >
                    <Sparkles className={prompt.isFavorite ? "fill-amber-500" : ""} />
                  </Button>
                </div>
                <CardDescription className="line-clamp-2">{prompt.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 flex-grow">
                <div className="flex flex-wrap gap-1.5">
                  {prompt.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{prompt.duration} minutes</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span>{prompt.questions.length} journal prompts</span>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button className="w-full" variant="outline" onClick={() => handleOpenPrompt(prompt)}>
                  <BookOpen className="mr-2 h-4 w-4" /> View Prompts
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <p className="text-muted-foreground">No journal prompts found</p>
            <p className="text-sm text-muted-foreground">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first journal prompt to get started"}
            </p>
            {!searchTerm && selectedCategory === "all" && (
              <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create Journal Prompt
              </Button>
            )}
          </div>
        </div>
      )}

      <Dialog open={isPromptOpen} onOpenChange={setIsPromptOpen}>
        {selectedPrompt && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedPrompt.title}</DialogTitle>
              <DialogDescription>{selectedPrompt.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-purple-50">
                  {categories.find((c) => c.value === selectedPrompt.category)?.label || selectedPrompt.category}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {selectedPrompt.duration} minutes
                </Badge>
              </div>
              <div className="space-y-4">
                {selectedPrompt.questions.map((question, index) => (
                  <div key={index} className="rounded-lg border p-3">
                    <p className="font-medium text-sm">
                      {index + 1}. {question}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPromptOpen(false)}>
                Close
              </Button>
              <Button onClick={handleStartJournaling}>
                <BookOpen className="mr-2 h-4 w-4" /> Start Journaling
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
