"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function NewStoryPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would normally send the data to your API
      console.log({
        title,
        content,
        tags,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to stories page
      router.push("/dashboard/stories")
    } catch (error) {
      console.error("Error creating story:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/stories">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Share Your Healing Story</h1>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !title || !content}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? "Publishing..." : "Publish Story"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your story a meaningful title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Your Story</Label>
          <Card>
            <CardContent className="p-4">
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your healing journey, challenges, breakthroughs, and lessons learned..."
                className="min-h-[400px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                required
              />
            </CardContent>
          </Card>
          <p className="text-xs text-muted-foreground mt-2">
            Tip: Be authentic and focus on your transformation. Include specific practices that helped you.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (up to 5)</Label>
          <div className="flex gap-2">
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add tags (press Enter)"
              disabled={tags.length >= 5}
            />
            <Button
              type="button"
              onClick={handleAddTag}
              disabled={!tagInput.trim() || tags.length >= 5}
              variant="outline"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-purple-100 text-purple-800">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-purple-800 hover:text-purple-900"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Popular tags: Anxiety, Meditation, Chakras, Energy Healing, Grief, Personal Growth
          </p>
        </div>

        <div className="rounded-lg border p-4 bg-amber-50">
          <h3 className="font-medium mb-2">Community Guidelines</h3>
          <ul className="text-sm space-y-1 list-disc pl-5">
            <li>Be respectful and supportive of others' journeys</li>
            <li>Avoid making medical claims or diagnosing others</li>
            <li>Respect privacy - change names or details if sharing about others</li>
            <li>Focus on personal experiences rather than promoting services</li>
          </ul>
        </div>
      </form>
    </div>
  )
}
