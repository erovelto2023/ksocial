"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, CalendarIcon, CreditCard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
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
    sessionTypes: [
      { id: "reiki", name: "Reiki Session", duration: "60 minutes", price: 85 },
      { id: "chakra", name: "Chakra Balancing", duration: "75 minutes", price: 95 },
      { id: "distance", name: "Distance Healing", duration: "45 minutes", price: 75 },
    ],
    timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
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
    sessionTypes: [
      { id: "intuitive", name: "Intuitive Healing", duration: "60 minutes", price: 95 },
      { id: "emotional", name: "Emotional Release", duration: "90 minutes", price: 120 },
      { id: "ancestral", name: "Ancestral Healing", duration: "75 minutes", price: 110 },
    ],
    timeSlots: ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"],
  },
]

export default function NewBookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const practitionerId = searchParams.get("practitioner")

  const [practitioner, setPractitioner] = useState<any>(null)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [sessionType, setSessionType] = useState("")
  const [timeSlot, setTimeSlot] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (practitionerId) {
      const found = mockPractitioners.find((p) => p.id === practitionerId)
      if (found) {
        setPractitioner(found)
        if (found.sessionTypes.length > 0) {
          setSessionType(found.sessionTypes[0].id)
        }
      }
    }
  }, [practitionerId])

  const selectedSessionType = practitioner?.sessionTypes.find((type: any) => type.id === sessionType)

  const handleSubmit = async () => {
    if (!date || !sessionType || !timeSlot) return

    setIsSubmitting(true)

    try {
      // Here you would normally send the booking data to your API
      console.log({
        practitionerId: practitioner.id,
        date: format(date, "yyyy-MM-dd"),
        sessionType,
        timeSlot,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Move to confirmation step
      setStep(3)
    } catch (error) {
      console.error("Error creating booking:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!practitioner) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p>Loading practitioner information...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/bookings">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
              step >= 1 ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            1
          </div>
          <Separator className="w-8" />
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
              step >= 2 ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            2
          </div>
          <Separator className="w-8" />
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
              step >= 3 ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            3
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Book a Session</h1>
            <p className="text-muted-foreground">Select your session details and preferred time.</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 rounded-md">
                  <AvatarImage src={practitioner.image || "/placeholder.svg"} alt={practitioner.name} />
                  <AvatarFallback className="rounded-md">{practitioner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{practitioner.name}</CardTitle>
                  <CardDescription>{practitioner.title}</CardDescription>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {practitioner.specialties.map((specialty: string) => (
                      <Badge key={specialty} variant="secondary" className="bg-purple-100 text-purple-800">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{practitioner.bio}</p>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Type</label>
                  <Select value={sessionType} onValueChange={setSessionType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a session type" />
                    </SelectTrigger>
                    <SelectContent>
                      {practitioner.sessionTypes.map((type: any) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name} ({type.duration}) - ${type.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        disabled={!sessionType}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => {
                          const day = format(date, "EEEE")
                          return !practitioner.availability.includes(day)
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {date && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Available on {practitioner.availability.join(", ")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Select value={timeSlot} onValueChange={setTimeSlot} disabled={!date}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {practitioner.timeSlots.map((slot: string) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/dashboard/bookings">Cancel</Link>
              </Button>
              <Button
                onClick={() => setStep(2)}
                disabled={!date || !sessionType || !timeSlot}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Continue to Payment
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Review & Payment</h1>
            <p className="text-muted-foreground">Review your booking details and complete payment.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={practitioner.image || "/placeholder.svg"} alt={practitioner.name} />
                    <AvatarFallback>{practitioner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{practitioner.name}</p>
                    <p className="text-sm text-muted-foreground">{practitioner.title}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Session Type:</span>
                    <span className="text-sm font-medium">{selectedSessionType?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Duration:</span>
                    <span className="text-sm font-medium">{selectedSessionType?.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Date:</span>
                    <span className="text-sm font-medium">{date ? format(date, "PPP") : ""}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Time:</span>
                    <span className="text-sm font-medium">{timeSlot}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Session Fee:</span>
                    <span className="text-sm font-medium">${selectedSessionType?.price}.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Platform Fee:</span>
                    <span className="text-sm font-medium">$5.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="font-medium">${(selectedSessionType?.price || 0) + 5}.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Credit Card</p>
                      <p className="text-sm text-muted-foreground">**** **** **** 4242</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-amber-50">
                  <h3 className="font-medium mb-2">Before Your Session</h3>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    <li>Find a quiet, comfortable space where you won't be disturbed</li>
                    <li>Have water nearby and wear comfortable clothing</li>
                    <li>Consider your intentions for the healing session</li>
                    <li>Be open to the experience and trust the process</li>
                  </ul>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Cancellation Policy</h3>
                  <p className="text-sm text-muted-foreground">
                    Free cancellation up to 24 hours before your appointment. Late cancellations or no-shows may be
                    charged a fee of 50% of the session price.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700">
                  {isSubmitting ? "Processing..." : "Complete Booking"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Booking Confirmed!</h1>
            <p className="text-muted-foreground max-w-md mx-auto mt-2">
              Your session with {practitioner.name} has been scheduled for {date ? format(date, "PPP") : ""} at{" "}
              {timeSlot}.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-purple-50 p-4">
                <h3 className="font-medium mb-2">Prepare for Your Session</h3>
                <ul className="text-sm space-y-2 list-disc pl-5">
                  <li>
                    You'll receive a confirmation email with session details and a link to join the virtual session.
                  </li>
                  <li>Find a quiet, comfortable space where you won't be disturbed during your session.</li>
                  <li>Consider journaling about what you hope to address or heal before your session.</li>
                  <li>Stay hydrated and try to avoid caffeine or heavy meals right before your session.</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Questions for Your Practitioner?</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  You can message {practitioner.name} with any questions before your session.
                </p>
                <Button variant="outline" className="w-full">
                  Message Practitioner
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/dashboard/calendar">View in Calendar</Link>
              </Button>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/dashboard/bookings">View All Bookings</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
