"use client"

import type React from "react"

import { useState } from "react"
import { ThumbsUp, Flag, Reply } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useSession } from "next-auth/react"
import Link from "next/link"

// Mock comments data
const mockComments = [
  {
    id: "1",
    content:
      "These chakra balancing techniques have been so helpful for me! I've been practicing the meditation and visualization daily, and I've noticed a significant improvement in my energy levels.",
    author: "Sarah Johnson",
    authorImage: "/placeholder.svg?height=40&width=40",
    createdAt: "2 days ago",
    likes: 15,
    replies: [
      {
        id: "1-1",
        content: "I've had the same experience! Which technique do you find most effective?",
        author: "Michael Chen",
        authorImage: "/placeholder.svg?height=40&width=40",
        createdAt: "1 day ago",
        likes: 3,
      },
      {
        id: "1-2",
        content:
          "Sarah, have you tried combining the crystal healing with meditation? It's been a game-changer for me.",
        author: "Emma Wilson",
        authorImage: "/placeholder.svg?height=40&width=40",
        createdAt: "12 hours ago",
        likes: 2,
      },
    ],
  },
  {
    id: "2",
    content:
      "I'm new to chakra healing and this article was exactly what I needed. The explanations are clear and the techniques seem approachable. I'm excited to try the sound healing method!",
    author: "David Thompson",
    authorImage: "/placeholder.svg?height=40&width=40",
    createdAt: "3 days ago",
    likes: 8,
    replies: [],
  },
  {
    id: "3",
    content:
      "I've been practicing yoga for years but never specifically for chakra balancing. The poses recommended here are a great addition to my practice. Thank you for sharing this knowledge!",
    author: "Priya Patel",
    authorImage: "/placeholder.svg?height=40&width=40",
    createdAt: "4 days ago",
    likes: 12,
    replies: [],
  },
]

interface BlogCommentsProps {
  postId: string
}

export default function BlogComments({ postId }: BlogCommentsProps) {
  const { data: session } = useSession()
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)

    try {
      // In a real application, you would send this to your API
      // await fetch('/api/comments', { method: 'POST', body: JSON.stringify({ postId, content: newComment }) })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Add the new comment to the list (this would normally come from the API response)
      const newCommentObj = {
        id: `new-${Date.now()}`,
        content: newComment,
        author: session?.user?.name || "Anonymous User",
        authorImage: session?.user?.image || "/placeholder.svg?height=40&width=40",
        createdAt: "Just now",
        likes: 0,
        replies: [],
      }

      setComments([newCommentObj, ...comments])
      setNewComment("")
    } catch (error) {
      console.error("Error posting comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitReply = async (commentId: string) => {
    if (!replyContent.trim()) return

    setIsSubmitting(true)

    try {
      // In a real application, you would send this to your API
      // await fetch('/api/comments/reply', { method: 'POST', body: JSON.stringify({ commentId, content: replyContent }) })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Add the new reply to the comment (this would normally come from the API response)
      const newReply = {
        id: `reply-${Date.now()}`,
        content: replyContent,
        author: session?.user?.name || "Anonymous User",
        authorImage: session?.user?.image || "/placeholder.svg?height=40&width=40",
        createdAt: "Just now",
        likes: 0,
      }

      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          }
        }
        return comment
      })

      setComments(updatedComments)
      setReplyContent("")
      setReplyingTo(null)
    } catch (error) {
      console.error("Error posting reply:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikeComment = (commentId: string) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 }
      }

      // Check if it's a reply
      if (comment.replies) {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === commentId) {
            return { ...reply, likes: reply.likes + 1 }
          }
          return reply
        })

        return { ...comment, replies: updatedReplies }
      }

      return comment
    })

    setComments(updatedComments)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Comments ({comments.reduce((acc, comment) => acc + 1 + comment.replies.length, 0)})
        </h2>
      </div>

      {session ? (
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={session.user?.image || "/placeholder.svg?height=40&width=40"}
                alt={session.user?.name || "User"}
              />
              <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="rounded-lg border p-4 text-center">
          <p className="mb-2">Sign in to join the conversation</p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>
      )}

      <Separator />

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.authorImage || "/placeholder.svg"} alt={comment.author} />
                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">{comment.createdAt}</p>
                  </div>
                </div>
                <p>{comment.content}</p>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 px-2 text-muted-foreground"
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{comment.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 px-2 text-muted-foreground"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    <Reply className="h-4 w-4" />
                    <span>Reply</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-muted-foreground">
                    <Flag className="h-4 w-4" />
                    <span>Report</span>
                  </Button>
                </div>

                {replyingTo === comment.id && (
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={session?.user?.image || "/placeholder.svg?height=32&width=32"}
                          alt={session?.user?.name || "User"}
                        />
                        <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder={`Reply to ${comment.author}...`}
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setReplyingTo(null)
                          setReplyContent("")
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        disabled={isSubmitting || !replyContent.trim()}
                        onClick={() => handleSubmitReply(comment.id)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {isSubmitting ? "Posting..." : "Post Reply"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {comment.replies.length > 0 && (
              <div className="ml-14 space-y-4 border-l-2 border-muted pl-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={reply.authorImage || "/placeholder.svg"} alt={reply.author} />
                      <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{reply.author}</p>
                          <p className="text-xs text-muted-foreground">{reply.createdAt}</p>
                        </div>
                      </div>
                      <p>{reply.content}</p>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 px-2 text-muted-foreground"
                          onClick={() => handleLikeComment(reply.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{reply.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-muted-foreground">
                          <Flag className="h-4 w-4" />
                          <span>Report</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
