import { Card, CardContent } from "@/components/ui/card"

export default function TestimonialSection() {
  return (
    <section className="bg-purple-50 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Healing Stories from Our Community
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from members who have experienced transformation through our platform.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <TestimonialCard
            quote="The virtual healing rooms have been transformative for me. I've connected with amazing healers and felt energy shifts I never thought possible."
            name="Sarah J."
            role="Community Member"
          />
          <TestimonialCard
            quote="The shadow work prompts helped me face parts of myself I'd been avoiding for years. This community provided the safe space I needed for that journey."
            name="Michael T."
            role="3 Years Member"
          />
          <TestimonialCard
            quote="I found my spiritual family here. The support circles helped me through my grief in ways traditional therapy couldn't."
            name="Elena R."
            role="Healing Group Leader"
          />
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <Card className="border-0 bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 fill-purple-500 text-purple-500"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <p className="text-muted-foreground">{quote}</p>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 font-semibold">{name.charAt(0)}</span>
            </div>
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
