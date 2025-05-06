"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Save, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function NewJournalEntry() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptParam = searchParams.get("prompt")

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (promptParam) {
      setContent(`Prompt: "${promptParam}"\n\n`)
    }
  }, [promptParam])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would normally send the data to your API
      console.log({
        title,
        content,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to journal page
      router.push("/dashboard/journal")
    } catch (error) {
      console.error("Error creating journal entry:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/journal">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">New Journal Entry</h1>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !title || !content}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Entry"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your entry a title"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Journal Entry</Label>
          <Card>
            <CardContent className="p-4">
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write about your healing journey, insights, emotions, or experiences..."
                className="min-h-[400px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                required
              />
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
