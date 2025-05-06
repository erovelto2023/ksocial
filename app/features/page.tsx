import type React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Sparkles,
  Brain,
  MedalIcon as Meditation,
  Heart,
  Shield,
  Users,
  MessageCircle,
  Zap,
  Gift,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-purple-50 py-12 md:py-16">
          <div className="container">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Link href="/" className="flex items-center text-purple-600 hover:text-purple-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Healing Features</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Explore the comprehensive suite of tools and resources designed to support your healing journey.
              </p>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24">
          <h2 className="mb-8 text-2xl font-bold text-center md:text-3xl">Core Community Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Users className="h-6 w-6 text-purple-500" />}
              title="User Profiles"
              description="Create and customize your profile to connect with others on similar healing paths."
            />
            <FeatureCard
              icon={<MessageCircle className="h-6 w-6 text-purple-500" />}
              title="Private Messaging"
              description="Secure messaging to communicate one-on-one with other community members."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6 text-purple-500" />}
              title="Public Forums"
              description="Join discussions on healing, spirituality, and personal growth topics."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6 text-purple-500" />}
              title="User-Created Healing Groups"
              description="Start or join groups focused on specific healing modalities like Reiki or meditation."
            />
            <FeatureCard
              icon={<Heart className="h-6 w-6 text-purple-500" />}
              title="Topic-Specific Support Circles"
              description="Find support in pre-made circles for topics like grief, anxiety, or shadow work."
            />
            <FeatureCard
              icon={<MessageCircle className="h-6 w-6 text-purple-500" />}
              title="Story Sharing Sections"
              description="Share your healing journey or read stories from others in the community."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-purple-500" />}
              title="Safe Space Guidelines + Moderators"
              description="Clear rules and trained moderators to ensure a respectful environment."
            />
          </div>
        </section>

        <section className="bg-purple-50 py-12 md:py-24">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold text-center md:text-3xl">Healing & Spiritual Practices</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Sparkles className="h-6 w-6 text-purple-500" />}
                title="Virtual Energy Healing Rooms"
                description="Participate in real-time energy healing sessions with the community."
              />
              <FeatureCard
                icon={<Sparkles className="h-6 w-6 text-purple-500" />}
                title="Live Group Healing Sessions"
                description="Join live events hosted by experienced practitioners."
              />
              <FeatureCard
                icon={<Sparkles className="h-6 w-6 text-purple-500" />}
                title="Book One-on-One Energy Healing Sessions"
                description="Schedule private sessions with certified healers."
              />
              <FeatureCard
                icon={<Meditation className="h-6 w-6 text-purple-500" />}
                title="Group Meditations"
                description="Meditate together with guided sessions for collective healing."
              />
              <FeatureCard
                icon={<Sparkles className="h-6 w-6 text-purple-500" />}
                title="Chakra Balancing Guides"
                description="Learn techniques to balance and align your chakras."
              />
              <FeatureCard
                icon={<Sparkles className="h-6 w-6 text-purple-500" />}
                title="Energy Cleansing Tips"
                description="Tools and tips to clear negative energy from your space and aura."
              />
              <FeatureCard
                icon={<Sparkles className="h-6 w-6 text-purple-500" />}
                title="Sacred Space Creation Guides"
                description="Step-by-step instructions to create your own sacred space."
              />
              <FeatureCard
                icon={<Sparkles className="h-6 w-6 text-purple-500" />}
                title="Spirit Guide Connection Exercises"
                description="Practices to connect with your spirit guides and higher self."
              />
              <FeatureCard
                icon={<Heart className="h-6 w-6 text-purple-500" />}
                title="Emotional Release Exercises"
                description="Techniques to release trapped emotions and emotional blockages."
              />
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24">
          <h2 className="mb-8 text-2xl font-bold text-center md:text-3xl">Self-Growth Tools</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Brain className="h-6 w-6 text-purple-500" />}
              title="Personal Healing Journals"
              description="Reflect on your journey with customizable journaling prompts."
            />
            <FeatureCard
              icon={<Brain className="h-6 w-6 text-purple-500" />}
              title="Dream Journal Section"
              description="Record and analyze your dreams for spiritual insights."
            />
            <FeatureCard
              icon={<Brain className="h-6 w-6 text-purple-500" />}
              title="Shadow Work Prompts"
              description="Explore your subconscious with guided questions and exercises."
            />
            <FeatureCard
              icon={<Heart className="h-6 w-6 text-purple-500" />}
              title="Gratitude Sharing Wall"
              description="Post or view gratitude messages to inspire positivity."
            />
            <FeatureCard
              icon={<Brain className="h-6 w-6 text-purple-500" />}
              title="Self-Care Planning Tools"
              description="Build personalized self-care routines for mind, body, and spirit."
            />
          </div>
        </section>

        <section className="bg-purple-50 py-12 md:py-24">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold text-center md:text-3xl">Special Features</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Zap className="h-6 w-6 text-purple-500" />}
                title="Interactive Aura Photos"
                description="Upload photos to analyze and visualize your aura."
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6 text-purple-500" />}
                title="Energy Field Visualization Tools"
                description="Explore visual representations of your energy field."
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6 text-purple-500" />}
                title="Astrology + Energy Healing Alignment Forecasts"
                description="Discover how astrology aligns with your healing journey."
              />
              <FeatureCard
                icon={<Gift className="h-6 w-6 text-purple-500" />}
                title="Volunteer Reiki and Energy Healer Practitioners"
                description="Find volunteer healers offering free services to the community."
              />
              <FeatureCard
                icon={<Gift className="h-6 w-6 text-purple-500" />}
                title="Energy Healer Volunteer Opportunities List"
                description="Explore opportunities to give back to the healing community."
              />
              <FeatureCard
                icon={<Shield className="h-6 w-6 text-purple-500" />}
                title="Healing Session Feedback Forms"
                description="Provide feedback after healing sessions to improve the experience."
              />
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Ready to Begin Your Healing Journey?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Join our community today and discover the transformative power of connection, healing, and spiritual
              growth.
            </p>
            <Button size="lg" className="mt-4 bg-purple-600 hover:bg-purple-700">
              Join Our Community
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2 w-fit rounded-full bg-purple-100 p-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
