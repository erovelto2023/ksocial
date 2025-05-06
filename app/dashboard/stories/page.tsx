"use client"

import { useState } from "react"
import { Heart, MessageSquare, Share2, Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Mock stories data
const mockStories = [
  {
    id: "1",
    title: "Finding Light in Darkness",
    excerpt: "After years of struggling with anxiety, I discovered energy healing and it changed everything...",
    content:
      "After years of struggling with anxiety, I discovered energy healing and it changed everything. My journey began when I hit rock bottom - panic attacks were controlling my life, and traditional methods weren't helping. A friend suggested Reiki, and though skeptical, I was desperate enough to try. The first session was profound. I felt warmth spreading through my body, and for the first time in years, my mind quieted. That session began a healing journey that transformed my relationship with anxiety. Through regular energy work, meditation, and shadow work, I've learned to understand my triggers and release the trapped emotions causing my anxiety. Today, I still have anxious moments, but they no longer control me. I've found tools to ground myself and reconnect with my inner peace. If you're struggling, know that healing is possible - sometimes in ways you least expect.",
    author: {
      id: "user1",
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    publishedAt: "2023-05-15",
    tags: ["Anxiety", "Reiki", "Personal Growth"],
    likes: 42,
    comments: 7,
    isLiked: false,
  },
  {
    id: "2",
    title: "My Chakra Awakening Experience",
    excerpt: "I never believed in energy centers until I experienced my own chakra awakening...",
    content:
      "I never believed in energy centers until I experienced my own chakra awakening. It started with strange sensations in my lower back during meditation - warmth, tingling, and sometimes even mild vibrations. At first, I dismissed it as imagination, but the sensations grew stronger and began moving up my spine. A spiritual teacher explained I was experiencing kundalini energy activating my chakras. As the energy moved through each center, I faced different emotional challenges - old wounds surfaced, patterns became clear, and I had to confront parts of myself I'd long ignored. The heart chakra opening was most intense - I felt overwhelming compassion and found myself crying at random moments, feeling deeply connected to others' pain and joy. This journey taught me that chakras aren't just mystical concepts but tangible aspects of our energetic anatomy. Working with them has helped me release blockages and find greater balance in all areas of life.",
    author: {
      id: "user2",
      name: "Michael Chen",
      image: "/placeholder.svg?height=40&width=40",
    },
    publishedAt: "2023-06-02",
    tags: ["Chakras", "Kundalini", "Meditation"],
    likes: 38,
    comments: 12,
    isLiked: true,
  },
  {
    id: "3",
    title: "Healing After Loss Through Mediumship",
    excerpt: "When I lost my mother, I found unexpected healing through connecting with her spirit...",
    content:
      "When I lost my mother, I found unexpected healing through connecting with her spirit. The grief was overwhelming - a physical pain that never seemed to ease. Six months after her passing, a friend suggested visiting a medium. I was skeptical but desperate for anything that might help. The session changed everything. The medium shared details only my mother would know, described her personality perfectly, and delivered messages that answered questions I'd been struggling with. What struck me most was feeling my mother's presence - her love hadn't disappeared but had transformed. This experience opened me to exploring spiritual connection in ways I never had before. I began meditating to connect with her myself, learning to recognize the subtle signs of her presence. While the grief hasn't disappeared, it's transformed into something gentler, accompanied by gratitude for our continuing bond. This journey taught me that death changes relationships but doesn't end them, and that healing comes in unexpected forms when we open ourselves to possibilities beyond the physical world.",
    author: {
      id: "user3",
      name: "Emily Rodriguez",
      image: "/placeholder.svg?height=40&width=40",
    },
    publishedAt: "2023-06-18",
    tags: ["Grief", "Mediumship", "Spirit Connection"],
    likes: 56,
    comments: 23,
    isLiked: false,
  },
  {
    id: "4",
    title: "From Skeptic to Believer: My Energy Healing Journey",
    excerpt: "As a former scientist, I dismissed energy healing as pseudoscience until my own experience...",
    content:
      "As a former scientist, I dismissed energy healing as pseudoscience until my own experience changed everything. With a background in biology, I believed only in what could be measured and proven. When chronic back pain led me to try acupuncture after exhausting conventional treatments, I expected nothing. To my shock, I felt energy moving through meridians during the session, and my pain decreased significantly. This experience cracked open my rigid worldview and led me to explore other modalities - Reiki, sound healing, and qigong. Each one demonstrated effects I couldn't explain through my scientific training. I've since learned that science is beginning to measure subtle energy fields, and quantum physics offers frameworks that might eventually explain these phenomena. My journey has taught me that healing exists in the integration of approaches - conventional medicine has its place, but so do ancient practices that work with the body's energy systems. I no longer need to choose between science and spirituality; instead, I've found wisdom in both perspectives.",
    author: {
      id: "user4",
      name: "Dr. James Wilson",
      image: "/placeholder.svg?height=40&width=40",
    },
    publishedAt: "2023-07-05",
    tags: ["Science", "Energy Healing", "Perspective Shift"],
    likes: 29,
    comments: 15,
    isLiked: false,
  },
]

export default function StoriesPage() {
  const [stories, setStories] = useState(mockStories)
  const [searchTerm, setSearchTerm] = useState("")

  const handleLike = (id: string) => {
    setStories(
      stories.map((story) => {
        if (story.id === id) {
          return {
            ...story,
            likes: story.isLiked ? story.likes - 1 : story.likes + 1,
            isLiked: !story.isLiked,
          }
        }
        return story
      }),
    )
  }

  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Healing Stories</h1>
          <p className="text-muted-foreground">
            Share your healing journey or read inspiring stories from the community.
          </p>
        </div>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/dashboard/stories/new">
            <Plus className="mr-2 h-4 w-4" />
            Share Your Story
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full md:w-3/4">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search stories..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="recent">
            <TabsList className="mb-4">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="popular">Most Popular</TabsTrigger>
              <TabsTrigger value="following">From People You Follow</TabsTrigger>
            </TabsList>
            <TabsContent value="recent" className="space-y-4">
              {filteredStories.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No stories found. Try a different search term.</p>
                </div>
              ) : (
                filteredStories.map((story) => <StoryCard key={story.id} story={story} onLike={handleLike} />)
              )}
            </TabsContent>
            <TabsContent value="popular" className="space-y-4">
              {filteredStories
                .sort((a, b) => b.likes - a.likes)
                .map((story) => (
                  <StoryCard key={story.id} story={story} onLike={handleLike} />
                ))}
            </TabsContent>
            <TabsContent value="following" className="space-y-4">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Follow more community members to see their stories here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full md:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Popular Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge variant="outline" className="hover:bg-purple-100 cursor-pointer">
                Anxiety
              </Badge>
              <Badge variant="outline" className="hover:bg-purple-100 cursor-pointer">
                Meditation
              </Badge>
              <Badge variant="outline" className="hover:bg-purple-100 cursor-pointer">
                Chakras
              </Badge>
              <Badge variant="outline" className="hover:bg-purple-100 cursor-pointer">
                Energy Healing
              </Badge>
              <Badge variant="outline" className="hover:bg-purple-100 cursor-pointer">
                Grief
              </Badge>
              <Badge variant="outline" className="hover:bg-purple-100 cursor-pointer">
                Personal Growth
              </Badge>
              <Badge variant="outline" className="hover:bg-purple-100 cursor-pointer">
                Spirituality
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Writing Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">✨ Be Authentic:</span> Share your genuine experience, including
                challenges.
              </p>
              <p className="text-sm">
                <span className="font-medium">✨ Focus on Transformation:</span> Highlight how your journey changed you.
              </p>
              <p className="text-sm">
                <span className="font-medium">✨ Include Practical Details:</span> Share specific practices that helped.
              </p>
              <p className="text-sm">
                <span className="font-medium">✨ Respect Privacy:</span> Change names or details if sharing about
                others.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Story</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="font-medium">From Darkness to Light: A Healing Journey</h3>
                <p className="text-sm text-muted-foreground">
                  "After my diagnosis, I discovered the healing power of community..."
                </p>
                <Link href="/dashboard/stories/featured" className="text-sm text-purple-600 hover:text-purple-700">
                  Read full story →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StoryCard({ story, onLike }: { story: any; onLike: (id: string) => void }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Avatar>
            <AvatarImage src={story.author.image || "/placeholder.svg"} alt={story.author.name} />
            <AvatarFallback>{story.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{story.author.name}</p>
            <p className="text-xs text-muted-foreground">{story.publishedAt}</p>
          </div>
        </div>
        <CardTitle>
          <Link href={`/dashboard/stories/${story.id}`} className="hover:text-purple-600">
            {story.title}
          </Link>
        </CardTitle>
        <CardDescription>{story.excerpt}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {story.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="bg-purple-100 text-purple-800">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={story.isLiked ? "text-purple-600" : ""}
            onClick={() => onLike(story.id)}
          >
            <Heart className={`mr-1 h-4 w-4 ${story.isLiked ? "fill-purple-600" : ""}`} />
            {story.likes}
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/dashboard/stories/${story.id}#comments`}>
              <MessageSquare className="mr-1 h-4 w-4" />
              {story.comments}
            </Link>
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Share2 className="mr-1 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  )
}
