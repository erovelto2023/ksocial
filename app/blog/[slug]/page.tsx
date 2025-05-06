import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, MessageCircle, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BlogComments from "@/components/blog/blog-comments"

// Mock data for a blog post
const post = {
  id: "1",
  title: "5 Essential Chakra Balancing Techniques for Beginners",
  slug: "essential-chakra-balancing-techniques",
  content: `
    <p>Chakras are energy centers in your body that correspond to specific nerve bundles and internal organs. When your chakras are balanced, energy flows smoothly throughout your body, promoting physical, emotional, and spiritual well-being. However, when they're blocked or imbalanced, you may experience physical or emotional symptoms.</p>
    
    <p>In this guide, we'll explore five essential chakra balancing techniques that are perfect for beginners starting their healing journey.</p>
    
    <h2>1. Meditation and Visualization</h2>
    
    <p>One of the most effective ways to balance your chakras is through meditation and visualization. Find a quiet space where you won't be disturbed, sit comfortably, and close your eyes. Visualize each chakra as a spinning wheel of energy in its corresponding color:</p>
    
    <ul>
      <li>Root Chakra (Base of spine): Red</li>
      <li>Sacral Chakra (Lower abdomen): Orange</li>
      <li>Solar Plexus Chakra (Upper abdomen): Yellow</li>
      <li>Heart Chakra (Center of chest): Green</li>
      <li>Throat Chakra (Throat): Blue</li>
      <li>Third Eye Chakra (Forehead): Indigo</li>
      <li>Crown Chakra (Top of head): Violet or White</li>
    </ul>
    
    <p>Imagine each chakra spinning freely, glowing brightly with its color. If you sense any blockages, visualize the energy clearing and the chakra returning to balance.</p>
    
    <h2>2. Sound Healing</h2>
    
    <p>Each chakra resonates with a specific sound frequency. Using singing bowls, tuning forks, or even chanting specific mantras can help balance your chakras. The traditional Sanskrit seed sounds for each chakra are:</p>
    
    <ul>
      <li>Root Chakra: LAM</li>
      <li>Sacral Chakra: VAM</li>
      <li>Solar Plexus Chakra: RAM</li>
      <li>Heart Chakra: YAM</li>
      <li>Throat Chakra: HAM</li>
      <li>Third Eye Chakra: OM</li>
      <li>Crown Chakra: Silence or AUM</li>
    </ul>
    
    <p>Try chanting these sounds while focusing on the corresponding chakra location in your body.</p>
    
    <h2>3. Crystal Healing</h2>
    
    <p>Crystals have unique vibrational frequencies that can help balance your chakras. Here are some crystals associated with each chakra:</p>
    
    <ul>
      <li>Root Chakra: Red Jasper, Hematite, Black Tourmaline</li>
      <li>Sacral Chakra: Carnelian, Orange Calcite, Sunstone</li>
      <li>Solar Plexus Chakra: Citrine, Yellow Jasper, Tiger's Eye</li>
      <li>Heart Chakra: Rose Quartz, Green Aventurine, Jade</li>
      <li>Throat Chakra: Blue Lace Agate, Sodalite, Aquamarine</li>
      <li>Third Eye Chakra: Amethyst, Lapis Lazuli, Fluorite</li>
      <li>Crown Chakra: Clear Quartz, Selenite, Amethyst</li>
    </ul>
    
    <p>Place these crystals on the corresponding chakra points while lying down, or carry them with you throughout the day.</p>
    
    <h2>4. Yoga Poses</h2>
    
    <p>Specific yoga poses can help open and balance your chakras:</p>
    
    <ul>
      <li>Root Chakra: Mountain Pose, Warrior I</li>
      <li>Sacral Chakra: Goddess Pose, Hip Openers</li>
      <li>Solar Plexus Chakra: Boat Pose, Warrior III</li>
      <li>Heart Chakra: Camel Pose, Cobra Pose</li>
      <li>Throat Chakra: Fish Pose, Shoulder Stand</li>
      <li>Third Eye Chakra: Child's Pose, Forward Fold</li>
      <li>Crown Chakra: Headstand, Savasana</li>
    </ul>
    
    <p>Practice these poses mindfully, focusing on the energy center they target.</p>
    
    <h2>5. Color Therapy</h2>
    
    <p>Surrounding yourself with the color associated with a particular chakra can help balance it. You can:</p>
    
    <ul>
      <li>Wear clothes in the color of the chakra you want to balance</li>
      <li>Eat foods of that color</li>
      <li>Visualize the color during meditation</li>
      <li>Use colored light therapy</li>
    </ul>
    
    <p>Remember, chakra balancing is a personal journey. What works for one person may not work for another. Experiment with these techniques and notice how your body and energy respond. With regular practice, you'll develop a deeper understanding of your energy centers and how to keep them in harmony.</p>
    
    <p>Have you tried any of these techniques? Share your experiences in the comments below!</p>
  `,
  coverImage: "/placeholder.svg?height=400&width=800",
  author: "Admin User",
  authorImage: "/placeholder.svg?height=50&width=50",
  category: "Energy Healing",
  publishedAt: "May 15, 2023",
  readTime: "8 min read",
  tags: ["chakras", "energy healing", "beginners", "meditation", "crystals"],
}

// Mock related posts
const relatedPosts = [
  {
    id: "2",
    title: "Understanding the Power of Reiki Healing",
    slug: "understanding-power-reiki-healing",
    excerpt:
      "Explore the ancient Japanese technique of Reiki and how it can help channel energy to promote healing, reduce stress, and improve well-being.",
    coverImage: "/placeholder.svg?height=150&width=300",
    category: "Reiki",
    publishedAt: "June 2, 2023",
  },
  {
    id: "7",
    title: "A Complete Guide to the 7 Chakras",
    slug: "complete-guide-seven-chakras",
    excerpt:
      "Learn about the seven main chakras, their locations, functions, and how they influence your physical, emotional, and spiritual well-being.",
    coverImage: "/placeholder.svg?height=150&width=300",
    category: "Chakras",
    publishedAt: "April 28, 2023",
  },
  {
    id: "8",
    title: "How to Use Crystals for Chakra Healing",
    slug: "crystals-chakra-healing",
    excerpt:
      "Discover which crystals work best for each chakra and how to use them effectively in your healing practice.",
    coverImage: "/placeholder.svg?height=150&width=300",
    category: "Crystal Healing",
    publishedAt: "May 22, 2023",
  },
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real application, you would fetch the post data based on the slug
  // const { slug } = params;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="container py-12">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <Link href="/blog" className="flex items-center text-purple-600 hover:text-purple-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </div>

            <div className="mb-8 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{post.category}</Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.publishedAt}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>12 comments</span>
                </div>
              </div>
            </div>

            <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="prose prose-purple max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={post.authorImage || "/placeholder.svg"}
                  alt={post.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-muted-foreground">Energy Healing Practitioner</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Heart className="mr-1 h-4 w-4" />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  Share
                </Button>
              </div>
            </div>

            <Separator className="my-8" />

            <BlogComments postId={post.id} />

            <Separator className="my-8" />

            <div>
              <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={relatedPost.coverImage || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <Badge variant="outline" className="w-fit">
                        {relatedPost.category}
                      </Badge>
                      <CardTitle className="text-base">
                        <Link href={`/blog/${relatedPost.slug}`} className="hover:text-purple-600">
                          {relatedPost.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-xs">{relatedPost.excerpt}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
