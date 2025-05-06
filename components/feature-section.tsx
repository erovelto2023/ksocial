import { MessageCircle, Users, Sparkles, Brain, MedalIcon as Meditation, Heart } from "lucide-react"

export default function FeatureSection() {
  return (
    <section className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Discover Our Core Features</h2>
          <p className="mt-4 text-muted-foreground">
            Our platform offers a comprehensive suite of tools and resources to support your healing journey.
          </p>
          <div className="mt-8 grid gap-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-purple-100 p-2">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold">Community Connection</h3>
                <p className="text-sm text-muted-foreground">
                  Create your profile, join forums, and connect with others on similar healing paths.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-purple-100 p-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold">Energy Healing Sessions</h3>
                <p className="text-sm text-muted-foreground">
                  Participate in virtual healing rooms and book sessions with certified practitioners.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-purple-100 p-2">
                <Brain className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold">Personal Growth Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Access journals, shadow work prompts, and self-care planning resources.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-purple-50 p-6">
              <Meditation className="h-10 w-10 text-purple-600" />
              <h3 className="mt-4 font-bold">Meditation Library</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Access a wide range of guided meditations for every need and experience level.
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-6">
              <Heart className="h-10 w-10 text-purple-600" />
              <h3 className="mt-4 font-bold">Support Circles</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Find support in topic-specific circles for grief, anxiety, or shadow work.
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-purple-50 p-6">
            <MessageCircle className="h-10 w-10 text-purple-600" />
            <h3 className="mt-4 font-bold">Story Sharing</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Share your healing journey or read inspiring stories from others in the community.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
