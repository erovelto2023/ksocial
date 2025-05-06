"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash, Eye, ArrowUpDown, MoreHorizontal, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Mock data for blog posts
const mockPosts = [
  {
    id: "1",
    title: "5 Essential Chakra Balancing Techniques",
    slug: "essential-chakra-balancing-techniques",
    status: "published",
    author: "Admin User",
    category: "Energy Healing",
    publishedAt: "2023-05-15",
    comments: 12,
  },
  {
    id: "2",
    title: "Understanding the Power of Reiki Healing",
    slug: "understanding-power-reiki-healing",
    status: "published",
    author: "Healing Guide",
    category: "Reiki",
    publishedAt: "2023-06-02",
    comments: 8,
  },
  {
    id: "3",
    title: "Beginner's Guide to Meditation",
    slug: "beginners-guide-meditation",
    status: "published",
    author: "Meditation Teacher",
    category: "Meditation",
    publishedAt: "2023-06-10",
    comments: 15,
  },
  {
    id: "4",
    title: "How to Create Your Sacred Space at Home",
    slug: "create-sacred-space-home",
    status: "draft",
    author: "Admin User",
    category: "Spiritual Practices",
    publishedAt: null,
    comments: 0,
  },
  {
    id: "5",
    title: "The Connection Between Astrology and Healing",
    slug: "connection-astrology-healing",
    status: "draft",
    author: "Astrology Expert",
    category: "Astrology",
    publishedAt: null,
    comments: 0,
  },
]

export default function BlogAdmin() {
  const [posts, setPosts] = useState(mockPosts)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content and publications.</p>
        </div>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">
                <div className="flex items-center gap-1">
                  Title
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No posts found. Try a different search term.
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    {post.status === "published" ? (
                      <Badge className="bg-green-500 hover:bg-green-600">Published</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.publishedAt || "—"}</TableCell>
                  <TableCell>{post.comments}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/blog/edit/${post.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        {post.status === "draft" ? (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Publish
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <XCircle className="mr-2 h-4 w-4" />
                            Unpublish
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleDelete(post.id)} className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
