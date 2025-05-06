"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit, Trash, Calendar, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

// Mock journal entries
const mockEntries = [
  {
    id: "1",
    title: "Beginning My Healing Journey",
    excerpt: "Today I started exploring energy healing techniques and felt a shift in my awareness...",
    createdAt: "2023-06-15",
    updatedAt: "2023-06-15",
  },
  {
    id: "2",
    title: "Chakra Meditation Insights",
    excerpt: "During my meditation today, I focused on my heart chakra and experienced a warm sensation...",
    createdAt: "2023-06-12",
    updatedAt: "2023-06-13",
  },
  {
    id: "3",
    title: "Emotional Release Work",
    excerpt: "I practiced the emotional release exercises and found myself processing some old grief...",
    createdAt: "2023-06-08",
    updatedAt: "2023-06-08",
  },
  {
    id: "4",
    title: "Crystal Healing Session",
    excerpt: "Used rose quartz and amethyst during my meditation today. The energy felt different...",
    createdAt: "2023-06-05",
    updatedAt: "2023-06-05",
  },
  {
    id: "5",
    title: "Reflecting on My Progress",
    excerpt: "Looking back at the past month, I can see how much my energy has shifted...",
    createdAt: "2023-06-01",
    updatedAt: "2023-06-02",
  },
]

// Journal prompts
const journalPrompts = [
  "How did your energy feel today?",
  "What emotions came up during your meditation?",
  "Describe a moment when you felt truly present today.",
  "What are you grateful for in your healing journey?",
  "What patterns or blocks are you noticing in your life?",
  "How did you practice self-care today?",
  "What insights came to you during quiet moments?",
  "How did you connect with your spiritual practice today?",
]

export default function JournalPage() {
  const [entries, setEntries] = useState(mockEntries)
  const [searchTerm, setSearchTerm] = useState("")
  const [randomPrompt, setRandomPrompt] = useState("")

  useEffect(() => {
    getRandomPrompt()
  }, [])

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * journalPrompts.length)
    setRandomPrompt(journalPrompts[randomIndex])
  }

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this journal entry?")) {
      setEntries(entries.filter((entry) => entry.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Healing Journal</h1>
          <p className="text-muted-foreground">Document your healing journey and track your spiritual growth.</p>
        </div>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/dashboard/journal/new">
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search journal entries..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">
                    <div className="flex items-center gap-1">
                      Title
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Excerpt</TableHead>
                  <TableHead className="w-[100px]">
                    <div className="flex items-center gap-1">
                      Date
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                      No journal entries found. Start writing your healing journey.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">
                        <Link href={`/dashboard/journal/${entry.id}`} className="hover:text-purple-600">
                          {entry.title}
                        </Link>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="line-clamp-1">{entry.excerpt}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{entry.createdAt}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button asChild variant="ghost" size="icon">
                            <Link href={`/dashboard/journal/edit/${entry.id}`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(entry.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Journal Prompt</CardTitle>
              <CardDescription>Inspiration for your next entry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="italic text-muted-foreground">"{randomPrompt}"</p>
              <Button onClick={getRandomPrompt} variant="outline" className="w-full">
                Get New Prompt
              </Button>
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <Link href={`/dashboard/journal/new?prompt=${encodeURIComponent(randomPrompt)}`}>
                  Write with This Prompt
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Journal Stats</CardTitle>
              <CardDescription>Your writing journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Total Entries</span>
                <span className="font-bold">{entries.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>This Month</span>
                <span className="font-bold">
                  {
                    entries.filter((entry) => {
                      const date = new Date(entry.createdAt)
                      const now = new Date()
                      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
                    }).length
                  }
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Streak</span>
                <span className="font-bold">3 days</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Benefits of Journaling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">✨ Process Emotions:</span> Writing helps you understand and release
                complex feelings.
              </p>
              <p className="text-sm">
                <span className="font-medium">✨ Track Your Journey:</span> See your growth and patterns over time.
              </p>
              <p className="text-sm">
                <span className="font-medium">✨ Gain Clarity:</span> Organize your thoughts and find insights about
                your path.
              </p>
              <p className="text-sm">
                <span className="font-medium">✨ Manifest Intentions:</span> Set clear goals for your healing practice.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
