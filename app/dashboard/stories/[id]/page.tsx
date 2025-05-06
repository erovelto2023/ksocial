"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, MessageSquare, Share2, Flag, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Mock story data (would normally fetch based on ID)
const mockStory = {
  id: "1",
  title: "Finding Light in Darkness",
  content:
    "After years of struggling with anxiety, I discovered energy healing and it changed everything. My journey began when I hit rock bottom - panic attacks were controlling my life, and traditional methods weren't helping. A friend suggested Reiki, and though skeptical, I was desperate enough to try.\n\nThe first session was profound. I felt warmth spreading through my body, and for the first time in years, my mind quieted. That session began a healing journey that transformed my relationship with anxiety.\n\nThrough regular energy work, meditation, and shadow work, I've learned to understand my triggers and release the trapped emotions causing my anxiety. Today, I still have anxious moments, but they no longer control me. I've found tools to ground myself and reconnect with my inner peace.\n\nIf you're struggling, know that healing is possible - sometimes in ways you least expect.",
  author: {
    id: "user1",
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=40&width=40",
  },
  publishedAt: "2023-05-15",
  tags: ["Anxiety", "Reiki", "Personal Growth"],
  likes: 42,
  isLiked: false,
  isAuthor: true,
}

// Mock comments
const mockComments = [
  {
    id: "comment1",
    content:
      "Thank you for sharing your journey. I've been struggling with anxiety too and just started exploring energy healing. This gives me hope.",
    author: {
      id: "user5",
      name: "Jessica Miller",
      image: "/placeholder.svg?height=40&width=40",
    },
    publishedAt: "2023-05-16",
    likes: 8,
    isLiked: false,
  },
  {
    id: "comment2",
    content:
      "I had a similar experience with Reiki! It's amazing how something so gentle can be so powerful. Would you mind sharing what other modalities you explored?",
    author: {
      id: "user6",
      name: "David Thompson",
      image: "/placeholder.svg?height=40&width=40",
    },
    publishedAt: "2023-05-17",
    likes: 5,
    isLiked: true,
  },
  {
    id: "comment3",
    content:
      "This resonates with me deeply. I'm still at the beginning of my healing journey, but reading stories like yours helps me believe that change is possible.",
    author: {
      id: "user7",
      name: "Aisha Patel",
      image: "/placeholder.svg?height=40&width=40",
    },
    publishedAt: "2023-05-18",
    likes: 3,
    isLiked: false,
  },
]

export default function StoryPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [story, setStory] = useState(mockStory)
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLikeStory = () => {
    setStory({
      ...story,
      likes: story.isLiked ? story.likes - 1 : story.likes + 1,
      isLiked: !story.isLiked,
    })
  }

  const handleLikeComment = (id: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          }
        }
        return comment
      }),
    )
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)

    try {
      // Here you would normally send the comment to your API
      console.log({
        storyId: params.id,
        content: newComment,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Add the new comment to the list
      const newCommentObj = {
        id: `comment${comments.length + 1}`,
        content: newComment,
        author: {
          id: "currentUser",
          name: "Current User",
          image: "/placeholder.svg?height=40&width=40",
        },
        publishedAt: new Date().toISOString().split("T")[0],
        likes: 0,
        isLiked: false,
      }

      setComments([newCommentObj, ...comments])
      setNewComment("")
    } catch (error) {
      console.error("Error posting comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteStory = async () => {
    if (confirm("Are you sure you want to delete this story? This action cannot be undone.")) {
      try {
        // Here you would normally send a delete request to your API
        console.log(`Deleting story ${params.id}`)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Redirect to stories page
        router.push("/dashboard/stories")
      } catch (error) {
        console.error("Error deleting story:", error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/stories">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        {story.isAuthor && (
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/stories/edit/${params.id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleDeleteStory}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">{story.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarImage src={story.author.image || "/placeholder.svg"} alt={story.author.name} />
              <AvatarFallback>{story.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{story.author.name}</p>
              <p className="text-sm text-muted-foreground">Published on {story.publishedAt}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {story.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-purple-100 text-purple-800">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="prose max-w-none">
          {story.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={story.isLiked ? "text-purple-600" : ""}
              onClick={handleLikeStory}
            >
              <Heart className={`mr-1 h-4 w-4 ${story.isLiked ? "fill-purple-600" : ""}`} />
              {story.likes} Likes
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="#comments">
                <MessageSquare className="mr-1 h-4 w-4" />
                {comments.length} Comments
              </a>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Flag className="mr-1 h-4 w-4" />
                  Report
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Inappropriate content</DropdownMenuItem>
                <DropdownMenuItem>Misinformation</DropdownMenuItem>
                <DropdownMenuItem>Spam</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Other concern</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator className="my-6" />

        <div id="comments" className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Comments ({comments.length})</h2>

          <form onSubmit={handleSubmitComment} className="space-y-4">
            <Textarea
              placeholder="Share your thoughts or ask a question..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <Button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </form>

          <div className="space-y-4 mt-6">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={comment.author.image || "/placeholder.svg"} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{comment.author.name}</p>
                      <p className="text-xs text-muted-foreground">{comment.publishedAt}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{comment.content}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={comment.isLiked ? "text-purple-600" : ""}
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <Heart className={`mr-1 h-4 w-4 ${comment.isLiked ? "fill-purple-600" : ""}`} />
                    {comment.likes}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
