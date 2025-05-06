import type React from "react"
import {
  ArrowRight,
  Heart,
  Users,
  MessageCircle,
  Sparkles,
  Brain,
  MedalIcon as Meditation,
  Zap,
  Gift,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import HeroSection from "@/components/hero-section"
import FeatureSection from "@/components/feature-section"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TestimonialSection from "@/components/testimonial-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              A Sanctuary for Healing and Growth
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Join our community of healers, seekers, and spiritual practitioners dedicated to personal growth, energy
              healing, and mindful living.
            </p>
          </div>

          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mt-12">
            <FeatureCard
              icon={<Users className="h-6 w-6 text-purple-500" />}
              title="Community"
              description="Connect with like-minded individuals through profiles, messaging, forums, and support circles."
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6 text-purple-500" />}
              title="Healing Practices"
              description="Access virtual healing rooms, live sessions, one-on-one bookings, and energy tools."
            />
            <FeatureCard
              icon={<Brain className="h-6 w-6 text-purple-500" />}
              title="Self-Growth"
              description="Track your journey with healing journals, shadow work prompts, and self-care planners."
            />
            <FeatureCard
              icon={<Meditation className="h-6 w-6 text-purple-500" />}
              title="Meditation & Mindfulness"
              description="Explore our library of guided meditations, sound baths, and breathwork exercises."
            />
            <FeatureCard
              icon={<Heart className="h-6 w-6 text-purple-500" />}
              title="Engagement & Fun"
              description="Participate in kindness missions, voice messages, and live Q&A sessions with experts."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-purple-500" />}
              title="Special Features"
              description="Visualize your energy field, analyze your aura, and discover astrology forecasts."
            />
            <FeatureCard
              icon={<Gift className="h-6 w-6 text-purple-500" />}
              title="Give Back"
              description="Connect with volunteer healers or offer your own services to the community."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-purple-500" />}
              title="Safety & Quality"
              description="Ensure quality with feedback forms, practitioner reviews, and self-assessment tools."
            />
            <FeatureCard
              icon={<MessageCircle className="h-6 w-6 text-purple-500" />}
              title="Motivation"
              description="Stay inspired with monthly healing themes and gentle reminder notifications."
            />
          </div>
        </section>

        <FeatureSection />
        <TestimonialSection />

        <section className="bg-purple-50 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                Begin Your Healing Journey Today
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Join our community and discover the transformative power of connection, healing, and spiritual growth.
              </p>
              <Button size="lg" className="mt-4 bg-purple-600 hover:bg-purple-700">
                Join Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="flex flex-col items-center text-center">
      <CardHeader>
        <div className="mb-2 rounded-full bg-purple-100 p-4 w-fit mx-auto">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
