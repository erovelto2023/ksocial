"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Save, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import BlogEditor from "@/components/admin/blog-editor"
import Link from "next/link"

export default function NewBlogPost() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [isPublished, setIsPublished] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    // Generate slug from title
    setSlug(
      newTitle
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-"),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would normally send the data to your API
      console.log({
        title,
        slug,
        excerpt,
        content,
        category,
        coverImage,
        isPublished,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to blog admin page
      router.push("/admin/blog")
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/blog">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">New Blog Post</h1>
        </div>
        <Button onClick={handleSubmit} disabled={isSubmitting || !title} className="bg-purple-600 hover:bg-purple-700">
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>

      <Tabs defaultValue="content">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={handleTitleChange} placeholder="Enter post title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary of the post"
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <Card>
              <CardContent className="p-4">
                <BlogEditor content={content} onChange={setContent} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="post-url-slug" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="energy-healing">Energy Healing</SelectItem>
                <SelectItem value="meditation">Meditation</SelectItem>
                <SelectItem value="chakras">Chakras</SelectItem>
                <SelectItem value="spiritual-practices">Spiritual Practices</SelectItem>
                <SelectItem value="astrology">Astrology</SelectItem>
                <SelectItem value="self-care">Self-Care</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cover-image">Cover Image URL</Label>
            <Input
              id="cover-image"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            {coverImage && (
              <div className="mt-2 rounded-md border p-2">
                <img
                  src={coverImage || "/placeholder.svg"}
                  alt="Cover preview"
                  className="h-40 w-full object-cover rounded-md"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=160&width=320"
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="published" checked={isPublished} onCheckedChange={setIsPublished} />
            <Label htmlFor="published">Publish immediately</Label>
          </div>
        </TabsContent>
        <TabsContent value="seo" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="seo-title">SEO Title</Label>
            <Input id="seo-title" placeholder="SEO optimized title (optional)" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seo-description">Meta Description</Label>
            <Textarea
              id="seo-description"
              placeholder="Brief description for search engines"
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input id="keywords" placeholder="comma, separated, keywords" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
