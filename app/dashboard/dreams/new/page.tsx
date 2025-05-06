"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, Save, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

// Common emotions for tagging
const commonEmotions = [
  "joy",
  "fear",
  "anxiety",
  "peace",
  "confusion",
  "love",
  "anger",
  "sadness",
  "excitement",
  "wonder",
  "freedom",
  "comfort",
  "nostalgia",
  "awe",
  "transcendence",
]

// Common symbols for tagging
const commonSymbols = [
  "water",
  "flying",
  "falling",
  "chase",
  "house",
  "animals",
  "darkness",
  "light",
  "death",
  "birth",
  "transformation",
  "journey",
  "maze",
  "forest",
  "mountains",
]

// Dream types
const dreamTypes = [
  { value: "lucid", label: "Lucid" },
  { value: "symbolic", label: "Symbolic" },
  { value: "visitation", label: "Visitation" },
  { value: "spiritual", label: "Spiritual" },
  { value: "shadow", label: "Shadow" },
  { value: "prophetic", label: "Prophetic" },
]

export default function NewDreamPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dream, setDream] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    type: "symbolic",
    isRecurring: false,
    emotions: [] as string[],
    symbols: [] as string[],
    customEmotions: "",
    customSymbols: "",
  })

  const handleEmotionToggle = (emotion: string) => {
    setDream((prev) => {
      if (prev.emotions.includes(emotion)) {
        return { ...prev, emotions: prev.emotions.filter((e) => e !== emotion) }
      } else {
        return { ...prev, emotions: [...prev.emotions, emotion] }
      }
    })
  }

  const handleSymbolToggle = (symbol: string) => {
    setDream((prev) => {
      if (prev.symbols.includes(symbol)) {
        return { ...prev, symbols: prev.symbols.filter((s) => s !== symbol) }
      } else {
        return { ...prev, symbols: [...prev.symbols, symbol] }
      }
    })
  }

  const handleAddCustomEmotions = () => {
    if (!dream.customEmotions.trim()) return

    const newEmotions = dream.customEmotions
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e && !dream.emotions.includes(e))

    setDream((prev) => ({
      ...prev,
      emotions: [...prev.emotions, ...newEmotions],
      customEmotions: "",
    }))
  }

  const handleAddCustomSymbols = () => {
    if (!dream.customSymbols.trim()) return

    const newSymbols = dream.customSymbols
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s && !dream.symbols.includes(s))

    setDream((prev) => ({
      ...prev,
      symbols: [...prev.symbols, ...newSymbols],
      customSymbols: "",
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dream.title || !dream.description) return

    setIsSubmitting(true)

    try {
      // Here you would normally send the data to your API
      console.log({
        ...dream,
        date: `${dream.date}T${dream.time}`,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to dreams list
      router.push("/dashboard/dreams")
    } catch (error) {
      console.error("Error saving dream:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/dashboard/dreams">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dreams
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Record New Dream</h1>
        <p className="text-muted-foreground">Document your dream while it's still fresh in your memory.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dream Details</CardTitle>
                <CardDescription>Describe your dream in as much detail as you can remember.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Dream Title</Label>
                  <Input
                    id="title"
                    placeholder="Give your dream a memorable title"
                    value={dream.title}
                    onChange={(e) => setDream({ ...dream, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Dream Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what happened in your dream..."
                    className="min-h-[200px]"
                    value={dream.description}
                    onChange={(e) => setDream({ ...dream, description: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={dream.date}
                      onChange={(e) => setDream({ ...dream, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> Time
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={dream.time}
                      onChange={(e) => setDream({ ...dream, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Dream Type</Label>
                    <Select value={dream.type} onValueChange={(value) => setDream({ ...dream, type: value })}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select dream type" />
                      </SelectTrigger>
                      <SelectContent>
                        {dreamTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="recurring"
                        checked={dream.isRecurring}
                        onCheckedChange={(checked) => setDream({ ...dream, isRecurring: checked as boolean })}
                      />
                      <Label htmlFor="recurring">Recurring Dream</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emotions & Symbols</CardTitle>
                <CardDescription>Tag the emotions and symbols that appeared in your dream.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Emotions</Label>
                  <div className="flex flex-wrap gap-2">
                    {commonEmotions.map((emotion) => (
                      <Badge
                        key={emotion}
                        variant={dream.emotions.includes(emotion) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleEmotionToggle(emotion)}
                      >
                        {emotion}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add custom emotions (comma separated)"
                      value={dream.customEmotions}
                      onChange={(e) => setDream({ ...dream, customEmotions: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddCustomEmotions()
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={handleAddCustomEmotions}>
                      Add
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Symbols</Label>
                  <div className="flex flex-wrap gap-2">
                    {commonSymbols.map((symbol) => (
                      <Badge
                        key={symbol}
                        variant={dream.symbols.includes(symbol) ? "secondary" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleSymbolToggle(symbol)}
                      >
                        {symbol}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add custom symbols (comma separated)"
                      value={dream.customSymbols}
                      onChange={(e) => setDream({ ...dream, customSymbols: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddCustomSymbols()
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={handleAddCustomSymbols}>
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting} className="ml-auto">
                  {isSubmitting ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Dream
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dream Journaling Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Record Immediately</h3>
                  <p className="text-sm text-muted-foreground">
                    Dreams fade quickly from memory. Try to record your dream as soon as you wake up, even if you only
                    remember fragments.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Include All Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Note colors, feelings, people, places, and objects. Even small details can have significant meaning.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Record Emotions</h3>
                  <p className="text-sm text-muted-foreground">
                    How did you feel during the dream? How do you feel about it now? Emotions provide important context
                    for interpretation.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Note Recurring Themes</h3>
                  <p className="text-sm text-muted-foreground">
                    Pay attention to symbols, settings, or situations that appear repeatedly in your dreams over time.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dream Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="space-y-1">
                  <p className="font-medium">Lucid Dreams</p>
                  <p className="text-muted-foreground">
                    Dreams where you're aware you're dreaming and may have some control over the dream.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Symbolic Dreams</p>
                  <p className="text-muted-foreground">
                    Dreams that use symbols to represent aspects of your life or psyche.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Visitation Dreams</p>
                  <p className="text-muted-foreground">
                    Dreams where deceased loved ones or spiritual beings appear to deliver messages.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Shadow Dreams</p>
                  <p className="text-muted-foreground">
                    Dreams that reveal repressed aspects of yourself or unresolved issues.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Prophetic Dreams</p>
                  <p className="text-muted-foreground">
                    Dreams that seem to predict future events or provide guidance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
