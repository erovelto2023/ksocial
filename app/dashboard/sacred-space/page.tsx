"use client"

import { useState } from "react"
import { Search, Home, Sparkles, Compass, Flame, Droplets, Wind, Star, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock sacred space guides
const guides = [
  {
    id: "altar",
    title: "Creating a Personal Altar",
    category: "beginner",
    space: "small",
    description:
      "A personal altar is a dedicated space for spiritual practice, reflection, and connection. It serves as a focal point for meditation, prayer, or energy work.",
    elements: [
      {
        name: "Location",
        description:
          "Choose a quiet, clean area where you won't be disturbed. This could be a shelf, small table, windowsill, or corner of a room.",
        tips: [
          "East-facing is traditional but not required",
          "Ensure the space feels peaceful to you",
          "Consider privacy needs",
        ],
      },
      {
        name: "Foundation",
        description:
          "Start with a clean surface covered with a special cloth if desired. The foundation sets the energy for your altar.",
        tips: [
          "Natural fabrics like silk, cotton, or linen work well",
          "Colors can correspond to your intention (purple for spirituality, green for growth, etc.)",
          "Cleanse the area with sage, sound, or visualization before setting up",
        ],
      },
      {
        name: "Elements",
        description: "Include representations of earth, fire, water, and air to create balance.",
        tips: [
          "Earth: crystals, stones, plants, salt",
          "Fire: candles, sun symbols, dragons",
          "Water: small bowl of water, seashells, mermaids",
          "Air: feathers, incense, bells, wind chimes",
        ],
      },
      {
        name: "Sacred Objects",
        description: "Add items that hold spiritual significance for you personally.",
        tips: [
          "Religious symbols that resonate with you",
          "Family heirlooms with special meaning",
          "Natural objects collected from meaningful places",
          "Images of spiritual teachers or deities",
          "Crystals chosen for their specific properties",
        ],
      },
      {
        name: "Personal Touches",
        description: "Include items that represent your current intentions, goals, or what you're working to manifest.",
        tips: [
          "Written intentions or affirmations",
          "Photos of loved ones you're sending energy to",
          "Symbols of what you're manifesting",
          "Journal for recording insights",
        ],
      },
    ],
    maintenance: [
      "Dust and clean your altar regularly",
      "Refresh water and flowers as needed",
      "Cleanse the energy weekly with sage, sound, or visualization",
      "Update elements as your intentions change",
    ],
    icon: Home,
  },
  {
    id: "meditation",
    title: "Meditation Space",
    category: "beginner",
    space: "small",
    description:
      "A dedicated meditation space helps signal to your mind that it's time to turn inward, making it easier to establish a regular practice.",
    elements: [
      {
        name: "Location",
        description: "Choose a quiet area with minimal distractions where you can sit comfortably for your practice.",
        tips: [
          "Consider natural light if meditating during the day",
          "Ensure good ventilation",
          "Choose a location where you won't be disturbed",
        ],
      },
      {
        name: "Seating",
        description: "Create a comfortable place to sit that supports good posture.",
        tips: [
          "Meditation cushion (zafu) or bench",
          "Comfortable chair if sitting on the floor is difficult",
          "Blankets or pillows for additional support",
          "Yoga mat for seated floor positions",
        ],
      },
      {
        name: "Ambiance",
        description: "Create a sensory environment that helps you relax and turn inward.",
        tips: [
          "Soft, natural lighting or candles",
          "Minimal visual distractions",
          "Pleasant scents from incense or essential oils",
          "Sound control (white noise machine, soft music, or silence)",
        ],
      },
      {
        name: "Focal Point",
        description: "Include something to rest your gaze upon during meditation.",
        tips: [
          "Candle for flame meditation",
          "Spiritual symbol or statue",
          "Natural object like a stone or plant",
          "Simple artwork with calming colors",
        ],
      },
      {
        name: "Practical Items",
        description: "Keep meditation tools nearby for convenience.",
        tips: [
          "Timer or meditation app",
          "Journal for recording insights",
          "Shawl or blanket for warmth",
          "Water for after practice",
        ],
      },
    ],
    maintenance: [
      "Keep the space clean and free of clutter",
      "Refresh any natural elements regularly",
      "Cleanse the energy periodically with sage, sound, or visualization",
      "Adjust elements based on your evolving practice",
    ],
    icon: Sparkles,
  },
  {
    id: "elemental",
    title: "Elemental Sacred Space",
    category: "intermediate",
    space: "medium",
    description:
      "An elemental sacred space incorporates all five elements—earth, fire, water, air, and spirit—to create a balanced environment for spiritual work.",
    elements: [
      {
        name: "Earth Corner",
        description: "The north corner represents stability, grounding, and abundance.",
        tips: [
          "Use green, brown, or black colors",
          "Include plants, stones, crystals, or soil",
          "Add symbols of abundance like coins or seeds",
          "Incorporate images of mountains or forests",
        ],
      },
      {
        name: "Fire Corner",
        description: "The south corner represents transformation, passion, and energy.",
        tips: [
          "Use red, orange, or gold colors",
          "Include candles, lamps, or a small fireproof container",
          "Add symbols of the sun or dragons",
          "Incorporate spicy scents like cinnamon or clove",
        ],
      },
      {
        name: "Water Corner",
        description: "The west corner represents emotions, intuition, and healing.",
        tips: [
          "Use blue, teal, or silver colors",
          "Include a small bowl of water, seashells, or water symbols",
          "Add mirrors or reflective surfaces",
          "Incorporate flowing fabrics or wave patterns",
        ],
      },
      {
        name: "Air Corner",
        description: "The east corner represents communication, intellect, and new beginnings.",
        tips: [
          "Use yellow, white, or light blue colors",
          "Include feathers, wind chimes, or bells",
          "Add incense, essential oil diffusers, or fans",
          "Incorporate symbols of birds or clouds",
        ],
      },
      {
        name: "Spirit Center",
        description: "The center represents connection to higher consciousness and integration of all elements.",
        tips: [
          "Use purple, white, or clear crystals",
          "Include symbols of unity like circles or mandalas",
          "Add items representing your spiritual path",
          "Create a central altar or focal point",
        ],
      },
    ],
    maintenance: [
      "Refresh the elements regularly (change water, trim plants, etc.)",
      "Cleanse the space during full and new moons",
      "Realign the elemental energies if the space feels unbalanced",
      "Update as the seasons change to stay connected to natural cycles",
    ],
    icon: Compass,
  },
  {
    id: "healing",
    title: "Healing Room",
    category: "advanced",
    space: "large",
    description:
      "A healing room is designed specifically for energy work, Reiki, or other healing modalities, creating a safe container for transformation and wellness.",
    elements: [
      {
        name: "Treatment Area",
        description: "Create a comfortable space for the recipient to receive healing.",
        tips: [
          "Massage table or comfortable mat on the floor",
          "Clean, soft linens and pillows for support",
          "Adjustable lighting for different treatments",
          "Space to walk around all sides of the treatment area",
        ],
      },
      {
        name: "Energy Enhancements",
        description: "Include elements that amplify and purify healing energy.",
        tips: [
          "Crystals placed around the room or under the treatment table",
          "Himalayan salt lamp for air purification",
          "Plants to absorb negative energy and increase oxygen",
          "Sacred symbols on walls or floor",
        ],
      },
      {
        name: "Ambiance",
        description: "Create a multi-sensory environment that promotes relaxation and healing.",
        tips: [
          "Soft, warm lighting (avoid fluorescent lights)",
          "Sound system for healing music or nature sounds",
          "Essential oil diffuser with healing scents",
          "Neutral, calming colors on walls and fabrics",
        ],
      },
      {
        name: "Practitioner Area",
        description: "Designate a space for the healer's tools and preparations.",
        tips: [
          "Small table or shelf for healing tools",
          "Comfortable seating for consultations",
          "Handwashing station or cleansing supplies",
          "Storage for reference materials and client notes",
        ],
      },
      {
        name: "Energetic Protection",
        description: "Include elements that maintain the integrity of the healing space.",
        tips: [
          "Black tourmaline or obsidian in corners for protection",
          "Selenite to keep energy clear and flowing",
          "Salt lamps or bowls of salt for energy absorption",
          "Symbols of protection appropriate to your tradition",
        ],
      },
    ],
    maintenance: [
      "Cleanse the space thoroughly between clients",
      "Change linens and wash hands before each session",
      "Perform a deep energy clearing weekly",
      "Regularly cleanse and recharge crystals and tools",
    ],
    icon: Sparkles,
  },
  {
    id: "outdoor",
    title: "Outdoor Sacred Space",
    category: "intermediate",
    space: "varies",
    description:
      "An outdoor sacred space connects you directly with nature's elements and rhythms, creating a powerful setting for spiritual practice.",
    elements: [
      {
        name: "Location",
        description: "Find a natural setting that feels special and energetically aligned.",
        tips: [
          "Consider privacy and noise levels",
          "Look for natural features like trees, rocks, or water",
          "Notice how the sun moves through the space",
          "Check for safety and accessibility in all weather",
        ],
      },
      {
        name: "Boundaries",
        description: "Create a sense of sacred enclosure while maintaining connection to nature.",
        tips: [
          "Use stones to mark the perimeter",
          "Plant specific herbs or flowers as a natural boundary",
          "Hang prayer flags, ribbons, or wind chimes",
          "Create an entrance or gateway to mark the threshold",
        ],
      },
      {
        name: "Central Focus",
        description: "Establish a focal point for meditation, ceremony, or offerings.",
        tips: [
          "Stone altar or flat rock surface",
          "Fire pit (where safe and legal)",
          "Special tree or plant",
          "Statue or natural feature like a boulder",
        ],
      },
      {
        name: "Seating",
        description: "Create comfortable places to sit for meditation or contemplation.",
        tips: [
          "Flat stones or logs as natural seating",
          "Weather-resistant cushions or blankets",
          "Simple bench or stump seats",
          "Clear ground space for sitting directly on earth",
        ],
      },
      {
        name: "Elemental Connections",
        description: "Enhance the natural elements already present in your space.",
        tips: [
          "Earth: Crystal grid, potted plants, or a small garden",
          "Fire: Candle lanterns, fire pit, or sun dial",
          "Water: Bird bath, small fountain, or rain collector",
          "Air: Wind chimes, prayer flags, or pinwheels",
          "Spirit: Prayer ties, offerings, or symbolic items",
        ],
      },
    ],
    maintenance: [
      "Visit regularly to maintain your connection to the space",
      "Adapt to seasonal changes rather than fighting them",
      "Remove litter and tend to plants as needed",
      "Renew your intentions with the space during solstices and equinoxes",
    ],
    icon: Wind,
  },
]

// Element icons
const elementIcons = {
  Earth: <Droplets className="h-4 w-4" />,
  Fire: <Flame className="h-4 w-4" />,
  Water: <Droplets className="h-4 w-4" />,
  Air: <Wind className="h-4 w-4" />,
  Spirit: <Star className="h-4 w-4" />,
  Location: <Compass className="h-4 w-4" />,
  Foundation: <Home className="h-4 w-4" />,
  Elements: <Sparkles className="h-4 w-4" />,
  "Sacred Objects": <Star className="h-4 w-4" />,
  "Personal Touches": <Sparkles className="h-4 w-4" />,
  Seating: <Home className="h-4 w-4" />,
  Ambiance: <Sparkles className="h-4 w-4" />,
  "Focal Point": <Star className="h-4 w-4" />,
  "Practical Items": <Home className="h-4 w-4" />,
  "Earth Corner": <Droplets className="h-4 w-4" />,
  "Fire Corner": <Flame className="h-4 w-4" />,
  "Water Corner": <Droplets className="h-4 w-4" />,
  "Air Corner": <Wind className="h-4 w-4" />,
  "Spirit Center": <Star className="h-4 w-4" />,
  "Treatment Area": <Home className="h-4 w-4" />,
  "Energy Enhancements": <Sparkles className="h-4 w-4" />,
  "Practitioner Area": <Home className="h-4 w-4" />,
  "Energetic Protection": <Star className="h-4 w-4" />,
  Boundaries: <Home className="h-4 w-4" />,
  "Central Focus": <Star className="h-4 w-4" />,
  "Elemental Connections": <Sparkles className="h-4 w-4" />,
}

export default function SacredSpacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSpace, setSelectedSpace] = useState("all")

  const filteredGuides = guides.filter(
    (guide) =>
      (guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.elements.some(
          (element) =>
            element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            element.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            element.tips.some((tip) => tip.toLowerCase().includes(searchTerm.toLowerCase())),
        )) &&
      (selectedCategory === "all" || guide.category === selectedCategory) &&
      (selectedSpace === "all" || guide.space === selectedSpace),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sacred Space Creation Guides</h1>
        <p className="text-muted-foreground">
          Step-by-step instructions to create your own sacred space for spiritual practice and healing.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search guides, elements, or tips..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList>
              <TabsTrigger value="all">All Levels</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs defaultValue="all" value={selectedSpace} onValueChange={setSelectedSpace}>
            <TabsList>
              <TabsTrigger value="all">All Spaces</TabsTrigger>
              <TabsTrigger value="small">Small</TabsTrigger>
              <TabsTrigger value="medium">Medium</TabsTrigger>
              <TabsTrigger value="large">Large</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGuides.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 text-center py-12">
            <p className="text-muted-foreground">No guides found matching your search criteria.</p>
          </div>
        ) : (
          filteredGuides.map((guide) => (
            <Card key={guide.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <guide.icon className="h-5 w-5 text-purple-600" />
                      {guide.title}
                    </CardTitle>
                    <CardDescription className="mt-1">{guide.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-purple-50">
                    {guide.category.charAt(0).toUpperCase() + guide.category.slice(1)} Level
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50">
                    {guide.space === "small"
                      ? "Small Space"
                      : guide.space === "medium"
                        ? "Medium Space"
                        : guide.space === "large"
                          ? "Large Space"
                          : "Flexible Space"}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Key Elements:</h3>
                  <div className="space-y-2">
                    {guide.elements.slice(0, 3).map((element) => (
                      <div key={element.name} className="flex items-start gap-2">
                        <div className="mt-0.5 text-purple-600">
                          {elementIcons[element.name as keyof typeof elementIcons] || <Sparkles className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{element.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">{element.description}</p>
                        </div>
                      </div>
                    ))}
                    {guide.elements.length > 3 && (
                      <p className="text-sm text-purple-600">
                        <Link href={`/dashboard/sacred-space/${guide.id}`}>
                          +{guide.elements.length - 3} more elements...
                        </Link>
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t mt-4 pt-4">
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/sacred-space/${guide.id}`}>View Details</Link>
                </Button>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href={`/dashboard/sacred-space/${guide.id}`}>
                    Download Guide
                    <Download className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
