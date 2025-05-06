"use client"

import { useState } from "react"
import { Search, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

// Mock chakra data
const chakras = [
  {
    id: "root",
    name: "Root Chakra",
    sanskritName: "Muladhara",
    color: "red",
    location: "Base of spine",
    element: "Earth",
    description:
      "The Root Chakra is associated with feelings of safety, security, and basic survival needs. When balanced, you feel grounded, stable, and secure.",
    symptoms: [
      "Fear and anxiety",
      "Financial insecurity",
      "Feeling ungrounded",
      "Disconnection from the body",
      "Basic survival issues",
    ],
    balancingPractices: [
      "Grounding meditation",
      "Walking barefoot in nature",
      "Working with red crystals like garnet or red jasper",
      "Eating root vegetables",
      "Practicing yoga poses like Mountain Pose or Tree Pose",
    ],
    affirmations: [
      "I am safe and secure",
      "I trust in the process of life",
      "I am grounded and centered",
      "My needs are always met",
      "I am connected to my body",
    ],
    bgColor: "bg-red-50",
    textColor: "text-red-800",
    borderColor: "border-red-200",
    iconColor: "text-red-600",
  },
  {
    id: "sacral",
    name: "Sacral Chakra",
    sanskritName: "Svadhisthana",
    color: "orange",
    location: "Lower abdomen",
    element: "Water",
    description:
      "The Sacral Chakra governs creativity, pleasure, emotions, and sexuality. When balanced, you feel creative, passionate, and emotionally fluid.",
    symptoms: [
      "Emotional numbness or overwhelm",
      "Creative blocks",
      "Sexual dysfunction",
      "Lack of pleasure or joy",
      "Difficulty with change",
    ],
    balancingPractices: [
      "Hip-opening yoga poses",
      "Dance or free movement",
      "Working with orange stones like carnelian",
      "Taking warm baths with essential oils",
      "Engaging in creative activities",
    ],
    affirmations: [
      "I embrace pleasure and joy",
      "I flow easily with change",
      "My creativity flows freely",
      "I honor my emotions",
      "I am passionate and alive",
    ],
    bgColor: "bg-orange-50",
    textColor: "text-orange-800",
    borderColor: "border-orange-200",
    iconColor: "text-orange-600",
  },
  {
    id: "solar-plexus",
    name: "Solar Plexus Chakra",
    sanskritName: "Manipura",
    color: "yellow",
    location: "Upper abdomen",
    element: "Fire",
    description:
      "The Solar Plexus Chakra relates to personal power, confidence, and self-esteem. When balanced, you feel confident, purposeful, and in control of your life.",
    symptoms: [
      "Low self-esteem",
      "Lack of confidence",
      "Control issues",
      "Digestive problems",
      "Difficulty making decisions",
    ],
    balancingPractices: [
      "Core-strengthening exercises",
      "Practicing martial arts",
      "Working with yellow stones like citrine",
      "Spending time in sunlight",
      "Setting and achieving goals",
    ],
    affirmations: [
      "I am confident and powerful",
      "I honor my true self",
      "I trust my decisions",
      "I am worthy of respect",
      "I stand in my personal power",
    ],
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-800",
    borderColor: "border-yellow-200",
    iconColor: "text-yellow-600",
  },
  {
    id: "heart",
    name: "Heart Chakra",
    sanskritName: "Anahata",
    color: "green",
    location: "Center of chest",
    element: "Air",
    description:
      "The Heart Chakra is the center of love, compassion, and connection. When balanced, you feel loving, compassionate, and connected to others and yourself.",
    symptoms: [
      "Difficulty giving or receiving love",
      "Codependency or isolation",
      "Grief or heartbreak",
      "Holding grudges",
      "Fear of intimacy",
    ],
    balancingPractices: [
      "Heart-opening yoga poses",
      "Practicing forgiveness and gratitude",
      "Working with green stones like rose quartz or jade",
      "Spending time in nature",
      "Practicing loving-kindness meditation",
    ],
    affirmations: [
      "I am open to giving and receiving love",
      "I forgive myself and others",
      "My heart is open and full",
      "I am worthy of love",
      "I live in balance with others",
    ],
    bgColor: "bg-green-50",
    textColor: "text-green-800",
    borderColor: "border-green-200",
    iconColor: "text-green-600",
  },
  {
    id: "throat",
    name: "Throat Chakra",
    sanskritName: "Vishuddha",
    color: "blue",
    location: "Throat",
    element: "Ether",
    description:
      "The Throat Chakra governs communication, self-expression, and speaking your truth. When balanced, you communicate clearly and express yourself authentically.",
    symptoms: [
      "Difficulty expressing yourself",
      "Fear of speaking up",
      "Throat problems",
      "Talking too much or too little",
      "Not listening to others",
    ],
    balancingPractices: [
      "Singing or chanting",
      "Journaling your thoughts",
      "Working with blue stones like sodalite or lapis lazuli",
      "Practicing active listening",
      "Neck and shoulder stretches",
    ],
    affirmations: [
      "I speak my truth with confidence",
      "I express myself clearly",
      "I am an effective communicator",
      "I listen as well as speak",
      "My voice matters",
    ],
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
    borderColor: "border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    id: "third-eye",
    name: "Third Eye Chakra",
    sanskritName: "Ajna",
    color: "indigo",
    location: "Center of forehead",
    element: "Light",
    description:
      "The Third Eye Chakra relates to intuition, insight, and spiritual awareness. When balanced, you trust your intuition and have clear perception.",
    symptoms: ["Lack of intuition", "Difficulty visualizing", "Headaches", "Overthinking", "Spiritual disconnection"],
    balancingPractices: [
      "Meditation focusing on the third eye area",
      "Visualization exercises",
      "Working with purple stones like amethyst",
      "Reducing screen time",
      "Practicing mindfulness",
    ],
    affirmations: [
      "I trust my intuition",
      "I see clearly in all situations",
      "I am connected to my inner wisdom",
      "My mind is clear and focused",
      "I am open to higher consciousness",
    ],
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-800",
    borderColor: "border-indigo-200",
    iconColor: "text-indigo-600",
  },
  {
    id: "crown",
    name: "Crown Chakra",
    sanskritName: "Sahasrara",
    color: "violet",
    location: "Top of head",
    element: "Cosmic Energy",
    description:
      "The Crown Chakra connects you to higher consciousness, spirituality, and universal wisdom. When balanced, you feel spiritually connected and experience inner peace.",
    symptoms: ["Spiritual disconnection", "Closed-mindedness", "Overthinking", "Materialism", "Lack of purpose"],
    balancingPractices: [
      "Silent meditation",
      "Spending time in prayer or spiritual practice",
      "Working with clear or purple stones like clear quartz or amethyst",
      "Fasting",
      "Practicing gratitude",
    ],
    affirmations: [
      "I am connected to divine wisdom",
      "I am open to spiritual guidance",
      "I trust in the universe",
      "I am one with all that is",
      "I live with purpose and awareness",
    ],
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
    borderColor: "border-purple-200",
    iconColor: "text-purple-600",
  },
]

export default function ChakraGuidesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredChakras = chakras.filter(
    (chakra) =>
      chakra.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chakra.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chakra.symptoms.some((symptom) => symptom.toLowerCase().includes(searchTerm.toLowerCase())) ||
      chakra.balancingPractices.some((practice) => practice.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chakra Balancing Guides</h1>
        <p className="text-muted-foreground">
          Learn techniques to balance and align your chakras for optimal energy flow and wellbeing.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search chakras, symptoms, or balancing practices..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredChakras.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 text-center py-12">
            <p className="text-muted-foreground">No chakras found matching your search criteria.</p>
          </div>
        ) : (
          filteredChakras.map((chakra) => (
            <Card
              key={chakra.id}
              className={`overflow-hidden border-l-4 ${chakra.borderColor} hover:shadow-md transition-shadow`}
            >
              <CardHeader className={`${chakra.bgColor}`}>
                <div className="flex items-center justify-between">
                  <CardTitle className={chakra.textColor}>{chakra.name}</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className={chakra.iconColor}>
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Sanskrit: {chakra.sanskritName}</p>
                        <p>Element: {chakra.element}</p>
                        <p>Location: {chakra.location}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardDescription>{chakra.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="symptoms">
                  <TabsList className="w-full rounded-none">
                    <TabsTrigger value="symptoms" className="flex-1">
                      Symptoms
                    </TabsTrigger>
                    <TabsTrigger value="practices" className="flex-1">
                      Practices
                    </TabsTrigger>
                    <TabsTrigger value="affirmations" className="flex-1">
                      Affirmations
                    </TabsTrigger>
                  </TabsList>
                  <div className="p-4">
                    <TabsContent value="symptoms" className="m-0">
                      <h3 className="font-medium mb-2">Signs of Imbalance:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {chakra.symptoms.map((symptom, index) => (
                          <li key={index}>{symptom}</li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="practices" className="m-0">
                      <h3 className="font-medium mb-2">Balancing Practices:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {chakra.balancingPractices.map((practice, index) => (
                          <li key={index}>{practice}</li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="affirmations" className="m-0">
                      <h3 className="font-medium mb-2">Healing Affirmations:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {chakra.affirmations.map((affirmation, index) => (
                          <li key={index}>"{affirmation}"</li>
                        ))}
                      </ul>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button
                  asChild
                  className={`w-full ${chakra.bgColor} ${chakra.textColor} border ${chakra.borderColor} hover:${chakra.bgColor}`}
                >
                  <Link href={`/dashboard/chakra/${chakra.id}`}>Detailed Guide</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chakra Balancing Meditation</CardTitle>
          <CardDescription>A guided meditation to balance all seven chakras in sequence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video rounded-md bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Chakra Balancing Meditation Video</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Download Audio</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Start Guided Practice</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
