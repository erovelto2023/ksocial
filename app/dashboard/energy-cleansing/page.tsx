"use client"

import { useState } from "react"
import { Search, Sparkles, Home, User, Zap, Clock, Download, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock energy cleansing techniques
const techniques = [
  {
    id: "smudging",
    title: "Smudging with Sage",
    category: "space",
    difficulty: "beginner",
    time: "5-10 minutes",
    description:
      "Smudging is an ancient practice of burning sacred herbs to clear negative energy from a space. White sage is traditionally used for its powerful cleansing properties.",
    steps: [
      "Open windows to allow negative energy to escape",
      "Light the end of a sage bundle until it produces smoke",
      "Set your intention for cleansing the space",
      "Move clockwise around your space, allowing smoke to reach all areas",
      "Pay special attention to corners, doorways, and electronics",
      "Extinguish sage by pressing into a fireproof container",
    ],
    tips: [
      "Always use a fireproof container to catch ash",
      "Keep a window open during and after smudging",
      "If you're sensitive to smoke, try a smokeless alternative like sage spray",
    ],
    alternatives: ["Palo Santo", "Cedar", "Sweetgrass", "Sage Spray"],
    icon: Home,
  },
  {
    id: "salt-bath",
    title: "Cleansing Salt Bath",
    category: "personal",
    difficulty: "beginner",
    time: "20-30 minutes",
    description:
      "Salt baths have been used for centuries to draw out negative energy and impurities from the body. Epsom salt, sea salt, or Himalayan salt can all be used for their cleansing properties.",
    steps: [
      "Fill your bathtub with warm water",
      "Add 1-2 cups of your chosen salt",
      "Optional: Add 5-10 drops of cleansing essential oils like lavender or eucalyptus",
      "Set your intention for releasing negative energy",
      "Soak for at least 20 minutes, visualizing negativity dissolving into the water",
      "When draining the water, imagine all negative energy going down the drain",
    ],
    tips: [
      "Stay hydrated before and after your bath",
      "For extra cleansing, add a tablespoon of baking soda",
      "If you don't have a bathtub, try a foot soak instead",
    ],
    alternatives: ["Foot soak", "Salt scrub", "Crystal-infused bath", "Sound bath"],
    icon: User,
  },
  {
    id: "sound-cleansing",
    title: "Sound Cleansing",
    category: "both",
    difficulty: "beginner",
    time: "5-15 minutes",
    description:
      "Sound vibrations can break up stagnant or negative energy in your space or aura. Bells, singing bowls, clapping, or even recorded sounds can be used to cleanse energy.",
    steps: [
      "Choose your sound tool (singing bowl, bell, clapping hands, etc.)",
      "Set your intention for clearing negative energy",
      "Move clockwise around your space, creating sound",
      "Pay attention to corners and areas that feel heavy or stagnant",
      "Allow the sound to resonate until it naturally fades",
      "Express gratitude when complete",
    ],
    tips: [
      "If using a singing bowl, move the mallet around the rim in a clockwise direction",
      "Clapping works well for quick cleansing in specific areas",
      "Sound recordings can be effective if you don't have instruments",
    ],
    alternatives: ["Tibetan bells", "Tuning forks", "Drums", "Chanting", "Recorded sound cleansing tracks"],
    icon: Zap,
  },
  {
    id: "visualization",
    title: "Energy Visualization",
    category: "personal",
    difficulty: "intermediate",
    time: "5-10 minutes",
    description:
      "Visualization is a powerful technique that uses your mind's eye to cleanse your energy field. This practice can be done anywhere and requires no tools except your focused attention.",
    steps: [
      "Find a comfortable seated position and close your eyes",
      "Take several deep breaths to center yourself",
      "Visualize a bright white or golden light above your head",
      "Imagine this light pouring down through your crown, filling your entire body",
      "As the light moves through you, see it dissolving any dark or stagnant energy",
      "Visualize this negative energy being released through your feet into the earth for transmutation",
      "When complete, see yourself surrounded by a protective bubble of light",
    ],
    tips: [
      "Practice regularly for best results",
      "If visualization is difficult, focus on the feeling instead",
      "Try different colors of light for different effects (gold for protection, blue for calm, etc.)",
    ],
    alternatives: ["Aura combing", "Cord cutting meditation", "Chakra cleansing visualization", "Grounding meditation"],
    icon: User,
  },
  {
    id: "crystals",
    title: "Crystal Cleansing",
    category: "both",
    difficulty: "beginner",
    time: "varies",
    description:
      "Crystals have unique energetic properties that can absorb and transmute negative energy. Different crystals have different cleansing properties and can be placed around your space or carried with you.",
    steps: [
      "Choose appropriate cleansing crystals (black tourmaline, selenite, clear quartz, and amethyst are good options)",
      "Cleanse your crystals before use by placing in sunlight, moonlight, or using sound",
      "Place crystals in corners of rooms, near electronics, or in areas that feel energetically heavy",
      "For personal cleansing, hold a cleansing crystal in your hand while setting an intention",
      "You can also create a crystal grid around yourself or your bed for deeper cleansing",
      "Cleanse your crystals regularly as they absorb negative energy",
    ],
    tips: [
      "Different crystals have different properties - research which ones align with your needs",
      "Selenite is self-cleansing and can be used to cleanse other crystals",
      "Program your crystals with specific intentions for more targeted cleansing",
    ],
    alternatives: ["Crystal grids", "Crystal elixirs (indirect method)", "Crystal wands", "Wearing crystal jewelry"],
    icon: Sparkles,
  },
  {
    id: "salt-cleansing",
    title: "Salt Cleansing for Spaces",
    category: "space",
    difficulty: "beginner",
    time: "24 hours",
    description:
      "Salt has powerful absorption properties that can draw out negative energy from a space. Placing bowls of salt in different areas of your home can help cleanse the energy over time.",
    steps: [
      "Fill small bowls with sea salt or Himalayan salt",
      "Place bowls in corners of rooms, near electronics, or in areas that feel heavy",
      "Set an intention for the salt to absorb negative energy",
      "Leave for 24-48 hours",
      "Dispose of the salt by flushing down the toilet or returning to the earth",
      "Rinse bowls thoroughly before reusing",
    ],
    tips: [
      "Black salt (not cooking black salt) is particularly powerful for protection",
      "You can add cleansing herbs like rosemary or lavender to the salt",
      "Replace salt if it becomes clumpy, as this indicates it has absorbed moisture and energy",
    ],
    alternatives: [
      "Salt lamps",
      "Salt sprinkled at thresholds",
      "Salt water spray",
      "Baking soda (less potent but works similarly)",
    ],
    icon: Home,
  },
  {
    id: "energy-sweep",
    title: "Energy Sweeping",
    category: "space",
    difficulty: "intermediate",
    time: "10-15 minutes",
    description:
      "Energy sweeping uses visualization and intention combined with physical movement to clear negative energy from a space, similar to sweeping dust from your floors.",
    steps: [
      "Begin at the furthest point from your front door",
      "Use a broom dedicated to energy clearing (or visualize energy broom)",
      "Set your intention to sweep away negative energy",
      "Use sweeping motions toward the front door, visualizing gathering all negative energy",
      "Continue room by room, always moving toward the exit",
      "Sweep the energy out the front door",
      "Cleanse your broom afterward (or release your visualization)",
    ],
    tips: [
      "You can use a regular broom, a special ritual broom, or simply your hands",
      "Adding sound (like clapping or bells) can enhance the effectiveness",
      "This technique works well after arguments or when energy feels stagnant",
    ],
    alternatives: ["Feather fan sweeping", "Sound sweeping", "Smoke sweeping with incense", "Water sprinkling"],
    icon: Home,
  },
  {
    id: "breath-of-fire",
    title: "Breath of Fire",
    category: "personal",
    difficulty: "intermediate",
    time: "3-5 minutes",
    description:
      "Breath of Fire is a yogic breathing technique that cleanses the energy channels in the body, increases oxygen, and releases toxins. It's a powerful practice for quickly shifting your energy.",
    steps: [
      "Sit comfortably with a straight spine",
      "Begin with normal breathing to center yourself",
      "Inhale and exhale rapidly through the nose, keeping them equal in duration",
      "The breath should be powered by quick contractions of the abdomen",
      "Start with 30 seconds and gradually build up to 3-5 minutes",
      "Return to normal breathing when complete",
    ],
    tips: [
      "If you feel lightheaded, return to normal breathing",
      "Practice on an empty stomach",
      "Not recommended during pregnancy or menstruation",
      "Start slowly and build up over time",
    ],
    alternatives: ["Alternate nostril breathing", "Lion's breath", "Bellows breath", "Kapalabhati pranayama"],
    icon: User,
  },
]

export default function EnergyCleansing() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const filteredTechniques = techniques.filter(
    (technique) =>
      (technique.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        technique.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        technique.steps.some((step) => step.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (selectedCategory === "all" || technique.category === selectedCategory || technique.category === "both") &&
      (selectedDifficulty === "all" || technique.difficulty === selectedDifficulty),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Energy Cleansing Techniques</h1>
        <p className="text-muted-foreground">Tools and tips to clear negative energy from your space and aura.</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search techniques, steps, or descriptions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="space">Space</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs defaultValue="all" value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <TabsList>
              <TabsTrigger value="all">All Levels</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTechniques.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 text-center py-12">
            <p className="text-muted-foreground">No techniques found matching your search criteria.</p>
          </div>
        ) : (
          filteredTechniques.map((technique) => (
            <Card key={technique.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <technique.icon className="h-5 w-5 text-purple-600" />
                      {technique.title}
                    </CardTitle>
                    <CardDescription className="mt-1">{technique.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-purple-50">
                    {technique.category === "personal"
                      ? "Personal Cleansing"
                      : technique.category === "space"
                        ? "Space Cleansing"
                        : "Personal & Space"}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50">
                    {technique.difficulty.charAt(0).toUpperCase() + technique.difficulty.slice(1)}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {technique.time}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Steps:</h3>
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    {technique.steps.slice(0, 3).map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                    {technique.steps.length > 3 && (
                      <li className="text-purple-600">
                        <Link href={`/dashboard/energy-cleansing/${technique.id}`}>
                          +{technique.steps.length - 3} more steps...
                        </Link>
                      </li>
                    )}
                  </ol>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t mt-4 pt-4">
                <Button variant="outline" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  Quick Guide
                </Button>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href={`/dashboard/energy-cleansing/${technique.id}`}>Full Instructions</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Energy Cleansing Toolkit</CardTitle>
          <CardDescription>Download our comprehensive guide to energy cleansing techniques</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Our 25-page guide includes detailed instructions for 15 different energy cleansing techniques, plus
            information on when to use each method, how to enhance their effectiveness, and how to create a regular
            cleansing practice.
          </p>
          <div className="aspect-[3/2] rounded-md bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Energy Cleansing Toolkit Preview</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Toolkit (PDF)
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
