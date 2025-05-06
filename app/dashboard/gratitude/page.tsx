"use client"

import type React from "react"

import { useState } from "react"
import { Heart, RefreshCw, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock gratitude posts
const mockPosts = [
  {
    id: "1",
    content:
      "Today I'm grateful for the beautiful sunrise that reminded me of the fresh start each day brings. Taking those few minutes to pause and appreciate nature's beauty set a positive tone for my entire day.",
    author: {
      id: "user1",
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2023-06-15T08:23:00Z",
    category: "nature",
    likes: 12,
    isLiked: false,
  },
  {
    id: "2",
    content:
      "Grateful for my healing journey and how far I've come. A year ago I couldn't imagine feeling this peaceful. To anyone struggling right now - keep going, healing isn't linear but it is possible.",
    author: {
      id: "user2",
      name: "Michael Chen",
      image: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2023-06-14T19:45:00Z",
    category: "personal growth",
    likes: 24,
    isLiked: true,
  },
  {
    id: "3",
    content:
      "I'm thankful for the supportive community I've found here. The encouragement and understanding from people who truly get it has been a lifeline during difficult times.",
    author: {
      id: "user3",
      name: "Emily Rodriguez",
      image: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2023-06-14T14:12:00Z",
    category: "community",
    likes: 18,
    isLiked: false,
  },
  {
    id: "4",
    content:
      "Grateful for the small moments of connection today - a genuine smile from a stranger, a heartfelt conversation with a friend, and the purring of my cat as she curled up beside me. These tiny threads weave the fabric of a meaningful life.",
    author: {
      id: "user4",
      name: "David Thompson",
      image: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2023-06-13T21:37:00Z",
    category: "relationships",
    likes: 15,
    isLiked: false,
  },
  {
    id: "5",
    content:
      "Today I'm grateful for the challenges that have shaped me. Each obstacle has been a teacher, showing me my own strength and resilience in ways I couldn't have discovered otherwise.",
    author: {
      id: "user5",
      name: "Aisha Patel",
      image: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2023-06-13T16:50:00Z",
    category: "challenges",
    likes: 20,
    isLiked: true,
  },
  {
    id: "6",
    content:
      "Feeling thankful for my meditation practice today. Those 15 minutes of stillness this morning centered me through a chaotic day at work. The peace we cultivate within truly does ripple outward.",
    author: {
      id: "user6",
      name: "James Wilson",
      image: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2023-06-12T22:15:00Z",
    category: "practices",
    likes: 14,
    isLiked: false,
  },
]

// Gratitude prompts
const gratitudePrompts = [
  "What small moment brought you joy today?",
  "What challenge are you secretly grateful for?",
  "Who has positively influenced your healing journey?",
  "What aspect of nature fills you with gratitude?",
  "What part of your body are you thankful for today?",
  "What lesson are you grateful to have learned?",
  "What comfort or luxury are you appreciating right now?",
  "What quality in yourself are you thankful for?",
]

// Categories for filtering
const categories = [
  { value: "all", label: "All" },
  { value: "nature", label: "Nature" },
  { value: "personal growth", label: "Personal Growth" },
  { value: "community", label: "Community" },
  { value: "relationships", label: "Relationships" },
  { value: "challenges", label: "Challenges" },
  { value: "practices", label: "Practices" },
]

export default function GratitudePage() {
  const [posts, setPosts] = useState(mockPosts)
  const [newPost, setNewPost] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState(gratitudePrompts[0])

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * gratitudePrompts.length)
    setCurrentPrompt(gratitudePrompts[randomIndex])
  }

  const handleLike = (id: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          }
        }
        return post
      }),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.trim()) return

    setIsSubmitting(true)

    try {
      // Here you would normally send the data to your API
      console.log({
        content: newPost,
        category: "personal", // Default category
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Add the new post to the list
      const newPostObj = {
        id: `post${Date.now()}`,
        content: newPost,
        author: {
          id: "currentUser",
          name: "Current User",
          image: "/placeholder.svg?height=40&width=40",
        },
        createdAt: new Date().toISOString(),
        category: "personal",
        likes: 0,
        isLiked: false,
      }

      setPosts([newPostObj, ...posts])
      setNewPost("")
    } catch (error) {
      console.error("Error submitting gratitude post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filter posts based on search term and category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Gratitude Wall</h1>
        <p className="text-muted-foreground">
          Share what you're grateful for and inspire others on their healing journey.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {/* New Post Form */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Share Your Gratitude</h3>
                <Button variant="ghost" size="sm" onClick={getRandomPrompt} className="flex items-center gap-1">
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>New Prompt</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground italic">{currentPrompt}</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <Textarea
                    placeholder="What are you grateful for today?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <Button type="submit" disabled={isSubmitting || !newPost.trim()}>
                    {isSubmitting ? (
                      "Posting..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Share Gratitude
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Search and Filter */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              placeholder="Search gratitude posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="sm:max-w-[300px]"
            />
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
                {categories.map((category) => (
                  <TabsTrigger key={category.value} value={category.value}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Gratitude Posts */}
          {filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={post.author.image || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{post.author.name}</p>
                            <p className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</p>
                          </div>
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                        <p className="text-base leading-relaxed">{post.content}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1 ${post.isLiked ? "text-rose-500" : ""}`}
                    >
                      <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                      <span>{post.likes} likes</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <p className="text-muted-foreground">No gratitude posts found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or be the first to share your gratitude
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Gratitude Practice</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Regular gratitude practice has been shown to increase happiness, reduce depression, and improve overall
                well-being.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium">Benefits:</h4>
                <ul className="list-disc pl-5 text-sm">
                  <li>Reduces stress and anxiety</li>
                  <li>Improves sleep quality</li>
                  <li>Enhances empathy and reduces aggression</li>
                  <li>Increases mental strength and resilience</li>
                  <li>Improves self-esteem and reduces social comparisons</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Community Guidelines</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>Be authentic and genuine in your gratitude</li>
                <li>Respect others' experiences and perspectives</li>
                <li>Keep posts positive and uplifting</li>
                <li>Support fellow community members</li>
                <li>Practice mindful engagement</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
