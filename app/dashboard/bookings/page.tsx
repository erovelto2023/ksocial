"use client"

import { useState } from "react"
import { CalendarIcon, Search, Filter, Star, Clock, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import Link from "next/link"

// Mock practitioners data
const mockPractitioners = [
  {
    id: "1",
    name: "Elena Martinez",
    title: "Certified Reiki Master",
    image: "/placeholder.svg?height=80&width=80",
    specialties: ["Reiki", "Chakra Balancing", "Distance Healing"],
    experience: "12 years",
    rating: 4.9,
    reviews: 124,
    location: "Remote / Virtual",
    price: 85,
    availability: ["Monday", "Wednesday", "Friday"],
    bio: "Elena is a certified Reiki Master with over 12 years of experience. She specializes in chakra balancing and distance healing, helping clients release energy blockages and find balance in their lives.",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    title: "Energy Healer & Intuitive",
    image: "/placeholder.svg?height=80&width=80",
    specialties: ["Intuitive Healing", "Emotional Release", "Ancestral Healing"],
    experience: "8 years",
    rating: 4.8,
    reviews: 98,
    location: "Remote / Virtual",
    price: 95,
    availability: ["Tuesday", "Thursday", "Saturday"],
    bio: "Marcus combines intuitive abilities with energy healing techniques to identify and clear emotional blockages. His sessions focus on releasing trapped emotions and healing ancestral patterns.",
  },
  {
    id: "3",
    name: "Sophia Chen",
    title: "Quantum Healing Practitioner",
    image: "/placeholder.svg?height=80&width=80",
    specialties: ["Quantum Healing", "Past Life Regression", "Energy Medicine"],
    experience: "15 years",
    rating: 5.0,
    reviews: 156,
    location: "Remote / Virtual",
    price: 120,
    availability: ["Monday", "Tuesday", "Thursday", "Sunday"],
    bio: "Sophia practices quantum healing techniques that work across time and space. Her sessions help clients access higher states of consciousness and heal on multiple levels simultaneously.",
  },
  {
    id: "4",
    name: "Aiden Williams",
    title: "Shamanic Practitioner",
    image: "/placeholder.svg?height=80&width=80",
    specialties: ["Soul Retrieval", "Power Animal Work", "Shamanic Journeying"],
    experience: "20 years",
    rating: 4.9,
    reviews: 187,
    location: "Remote / Virtual",
    price: 110,
    availability: ["Wednesday", "Friday", "Saturday", "Sunday"],
    bio: "Aiden is a shamanic practitioner who helps clients reconnect with their authentic selves through soul retrieval, power animal work, and shamanic journeying. His sessions focus on deep spiritual healing.",
  },
  {
    id: "5",
    name: "Leila Patel",
    title: "Pranic Healer & Meditation Guide",
    image: "/placeholder.svg?height=80&width=80",
    specialties: ["Pranic Healing", "Meditation", "Stress Reduction"],
    experience: "10 years",
    rating: 4.7,
    reviews: 112,
    location: "Remote / Virtual",
    price: 75,
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    bio: "Leila specializes in pranic healing, a no-touch energy healing system. Her sessions help cleanse and energize the aura, promoting physical and emotional wellbeing through balanced energy flow.",
  },
]

// Mock bookings data
const mockBookings = [
  {
    id: "booking1",
    practitioner: {
      id: "1",
      name: "Elena Martinez",
      title: "Certified Reiki Master",
      image: "/placeholder.svg?height=80&width=80",
    },
    date: "2023-07-15",
    time: "10:00 AM",
    type: "Reiki Session",
    duration: "60 minutes",
    status: "upcoming",
  },
  {
    id: "booking2",
    practitioner: {
      id: "3",
      name: "Sophia Chen",
      title: "Quantum Healing Practitioner",
      image: "/placeholder.svg?height=80&width=80",
    },
    date: "2023-06-28",
    time: "2:00 PM",
    type: "Quantum Healing Session",
    duration: "90 minutes",
    status: "completed",
  },
]

export default function BookingsPage() {
  const [practitioners, setPractitioners] = useState(mockPractitioners)
  const [bookings, setBookings] = useState(mockBookings)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [date, setDate] = useState<Date | undefined>(undefined)

  const filteredPractitioners = practitioners.filter(
    (practitioner) =>
      (practitioner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        practitioner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        practitioner.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (selectedSpecialty === "all" ||
        practitioner.specialties.some((specialty) =>
          specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()),
        )),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Energy Healing Sessions</h1>
        <p className="text-muted-foreground">
          Book one-on-one sessions with certified energy healers and spiritual practitioners.
        </p>
      </div>

      <Tabs defaultValue="find">
        <TabsList>
          <TabsTrigger value="find">Find a Practitioner</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="find" className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, specialty, or modality..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full md:w-[200px] space-y-2">
              <label className="text-sm font-medium">Specialty</label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="reiki">Reiki</SelectItem>
                  <SelectItem value="chakra">Chakra Balancing</SelectItem>
                  <SelectItem value="intuitive">Intuitive Healing</SelectItem>
                  <SelectItem value="quantum">Quantum Healing</SelectItem>
                  <SelectItem value="shamanic">Shamanic Healing</SelectItem>
                  <SelectItem value="pranic">Pranic Healing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-[200px] space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <Button variant="outline" size="icon" className="flex-shrink-0">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPractitioners.length === 0 ? (
              <div className="md:col-span-2 lg:col-span-3 text-center py-12">
                <p className="text-muted-foreground">No practitioners found. Try different search criteria.</p>
              </div>
            ) : (
              filteredPractitioners.map((practitioner) => (
                <Card key={practitioner.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 rounded-md">
                        <AvatarImage src={practitioner.image || "/placeholder.svg"} alt={practitioner.name} />
                        <AvatarFallback className="rounded-md">{practitioner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{practitioner.name}</CardTitle>
                        <CardDescription>{practitioner.title}</CardDescription>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{practitioner.rating}</span>
                          <span className="text-xs text-muted-foreground">({practitioner.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {practitioner.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="bg-purple-100 text-purple-800">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{practitioner.experience} experience</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{practitioner.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>${practitioner.price} per session</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/dashboard/practitioners/${practitioner.id}`}>View Profile</Link>
                    </Button>
                    <Button asChild className="bg-purple-600 hover:bg-purple-700">
                      <Link href={`/dashboard/bookings/new?practitioner=${practitioner.id}`}>Book Session</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {bookings.length === 0 ? (
              <div className="md:col-span-2 text-center py-12">
                <p className="text-muted-foreground">You don't have any bookings yet.</p>
                <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Find a Practitioner</Button>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-xl font-bold mb-4">Upcoming Sessions</h2>
                  {bookings.filter((booking) => booking.status === "upcoming").length === 0 ? (
                    <Card>
                      <CardContent className="p-6 text-center text-muted-foreground">No upcoming sessions</CardContent>
                    </Card>
                  ) : (
                    bookings
                      .filter((booking) => booking.status === "upcoming")
                      .map((booking) => (
                        <Card key={booking.id} className="mb-4">
                          <CardHeader className="pb-2">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={booking.practitioner.image || "/placeholder.svg"}
                                  alt={booking.practitioner.name}
                                />
                                <AvatarFallback>{booking.practitioner.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-base">{booking.practitioner.name}</CardTitle>
                                <CardDescription>{booking.practitioner.title}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>
                                  {booking.date} at {booking.time}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>
                                  {booking.type} ({booking.duration})
                                </span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline">Reschedule</Button>
                            <Button variant="destructive">Cancel</Button>
                          </CardFooter>
                        </Card>
                      ))
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">Past Sessions</h2>
                  {bookings.filter((booking) => booking.status === "completed").length === 0 ? (
                    <Card>
                      <CardContent className="p-6 text-center text-muted-foreground">No past sessions</CardContent>
                    </Card>
                  ) : (
                    bookings
                      .filter((booking) => booking.status === "completed")
                      .map((booking) => (
                        <Card key={booking.id} className="mb-4">
                          <CardHeader className="pb-2">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={booking.practitioner.image || "/placeholder.svg"}
                                  alt={booking.practitioner.name}
                                />
                                <AvatarFallback>{booking.practitioner.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-base">{booking.practitioner.name}</CardTitle>
                                <CardDescription>{booking.practitioner.title}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>
                                  {booking.date} at {booking.time}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>
                                  {booking.type} ({booking.duration})
                                </span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline">Book Again</Button>
                            <Button className="bg-purple-600 hover:bg-purple-700">Leave Review</Button>
                          </CardFooter>
                        </Card>
                      ))
                  )}
                </div>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
