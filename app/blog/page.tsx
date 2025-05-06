"use client";

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"



interface BlogPost {
  _id: string;
  title: string;
  content: string;
  createdAt: number;
}

const categories = [
  "Energy Healing",
  "Meditation",
  "Chakras",
  "Reiki",
  "Sound Healing",
  "Spiritual Practices",
  "Astrology",
  "Self-Care"
];

export default function BlogPage() {
  // Placeholder blog posts
  const posts: BlogPost[] = [
    {
      _id: '1',
      title: 'Welcome to the Blog',
      content: 'This is a static placeholder post.',
      createdAt: Date.now(),
    },
    {
      _id: '2',
      title: 'Second Article',
      content: 'More static content here.',
      createdAt: Date.now(),
    },
  ];
  let featuredPost: BlogPost | null = posts[0];
  let recentPosts: BlogPost[] = posts.slice(1);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-purple-50 py-12 md:py-16">
          <div className="container">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Healing Insights Blog</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Explore articles on energy healing, spiritual growth, and mindful living to support your healing
                journey.
              </p>
            </div>
          </div>
        </section>

        <section className="container py-12">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-2xl font-bold">Featured Article</h2>
              <Card className="overflow-hidden">
                {featuredPost && (
                  <div>
                    <CardHeader>
                      <CardTitle className="text-2xl">{featuredPost.title}</CardTitle>
                      <CardDescription>{new Date(featuredPost.createdAt).toISOString().slice(0, 10)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>{featuredPost.content}</div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        
                      </div>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/blog`}>
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </div>
                )}
              </Card>

              <h2 className="mb-6 mt-12 text-2xl font-bold">Recent Articles</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {recentPosts.map((post) => (
                  <Card key={post._id} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>{new Date(post.createdAt).toISOString().slice(0, 10)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>{post.content}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <div className="sticky top-20 space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Link key={category} href={`/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                          {category}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Subscribe</h3>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Get healing insights in your inbox</CardTitle>
                      <CardDescription>
                        Subscribe to our newsletter for the latest articles and resources.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-2">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">Subscribe</Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
