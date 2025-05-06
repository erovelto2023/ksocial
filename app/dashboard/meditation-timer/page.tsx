"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectItem, SelectContent } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const backgroundSounds = [
  { id: "nature", name: "Nature Sounds", url: "/sounds/nature.mp3" },
  { id: "rain", name: "Gentle Rain", url: "/sounds/rain.mp3" },
  { id: "ocean", name: "Ocean Waves", url: "/sounds/ocean.mp3" },
  { id: "forest", name: "Forest Ambience", url: "/sounds/forest.mp3" },
  { id: "bowls", name: "Singing Bowls", url: "/sounds/bowls.mp3" },
]

const presetTimes = [
  { value: "5", label: "5 minutes" },
  { value: "10", label: "10 minutes" },
  { value: "15", label: "15 minutes" },
  { value: "20", label: "20 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "1 hour" },
]

export default function MeditationTimer() {
  const [duration, setDuration] = useState(10 * 60) // 10 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(duration)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedSound, setSelectedSound] = useState<string | null>(null)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [intervalBells, setIntervalBells] = useState(false)
  const [intervalTime, setIntervalTime] = useState(5 * 60) // 5 minutes in seconds
  const [showCompletionMessage, setShowCompletionMessage] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const bellRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastIntervalBellRef = useRef<number>(0)

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setTimeRemaining(duration)
  }, [duration])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = () => {
    if (isRunning) return

    setIsRunning(true)
    setShowCompletionMessage(false)

    // Play background sound if selected
    if (selectedSound && audioRef.current) {
      audioRef.current.play().catch((error) => console.error("Error playing audio:", error))
    }

    // Play start bell
    if (bellRef.current) {
      bellRef.current.currentTime = 0
      bellRef.current.play().catch((error) => console.error("Error playing bell:", error))
    }

    lastIntervalBellRef.current = timeRemaining

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleComplete()
          return 0
        }

        // Play interval bell if enabled
        if (intervalBells && prev !== duration && lastIntervalBellRef.current - prev >= intervalTime) {
          if (bellRef.current) {
            bellRef.current.currentTime = 0
            bellRef.current.play().catch((error) => console.error("Error playing interval bell:", error))
          }
          lastIntervalBellRef.current = prev
        }

        return prev - 1
      })
    }, 1000)
  }

  const handlePause = () => {
    if (!isRunning) return

    setIsRunning(false)

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    if (selectedSound && audioRef.current) {
      audioRef.current.pause()
    }
  }

  const handleReset = () => {
    handlePause()
    setTimeRemaining(duration)
    setShowCompletionMessage(false)
  }

  const handleComplete = () => {
    handlePause()
    setTimeRemaining(0)
    setShowCompletionMessage(true)
    setCompletedSessions((prev) => prev + 1)

    // Play completion bell
    if (bellRef.current) {
      bellRef.current.currentTime = 0
      bellRef.current.play().catch((error) => console.error("Error playing completion bell:", error))
    }
  }

  const handleSoundChange = (soundId: string) => {
    setSelectedSound(soundId)

    if (audioRef.current) {
      audioRef.current.pause()

      const sound = backgroundSounds.find((s) => s.id === soundId)
      if (sound) {
        audioRef.current.src = sound.url
        audioRef.current.loop = true
        audioRef.current.volume = isMuted ? 0 : volume / 100

        if (isRunning) {
          audioRef.current.play().catch((error) => console.error("Error playing audio:", error))
        }
      }
    }
  }

  const handlePresetTimeChange = (minutes: string) => {
    handlePause()
    const newDuration = Number.parseInt(minutes) * 60
    setDuration(newDuration)
    setTimeRemaining(newDuration)
  }

  const progress = ((duration - timeRemaining) / duration) * 100

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meditation Timer</h1>
        <p className="text-muted-foreground">
          Create a peaceful meditation practice with customizable timing and sounds.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="relative overflow-hidden">
          <div
            className="absolute bottom-0 left-0 h-1 bg-purple-600 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          ></div>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">{formatTime(timeRemaining)}</CardTitle>
            <CardDescription>
              {isRunning ? "Meditation in progress" : timeRemaining === 0 ? "Meditation complete" : "Ready to begin"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <div className="relative h-60 w-60 rounded-full bg-purple-100">
              <div className="absolute inset-4 rounded-full bg-purple-50 shadow-inner"></div>
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(rgb(147, 51, 234) ${progress}%, transparent ${progress}%)`,
                }}
              ></div>
              <div className="absolute inset-8 flex items-center justify-center rounded-full bg-white shadow-lg">
                <div className="text-center">
                  <p className="text-5xl font-bold text-purple-600">{formatTime(timeRemaining)}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{isRunning ? "Breathe deeply..." : ""}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {!isRunning ? (
                <Button onClick={handleStart} size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Play className="mr-2 h-4 w-4" />
                  Start
                </Button>
              ) : (
                <Button onClick={handlePause} size="lg" variant="outline">
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </Button>
              )}
              <Button onClick={handleReset} size="lg" variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>

            {showCompletionMessage && (
              <div className="mt-4 rounded-lg bg-purple-50 p-4 text-center">
                <p className="font-medium text-purple-800">Meditation Complete</p>
                <p className="text-sm text-purple-600">
                  Well done! You've completed {completedSessions} session{completedSessions !== 1 ? "s" : ""} today.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Timer Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Duration</Label>
                <Select onValueChange={handlePresetTimeChange} defaultValue="10">
                  <SelectContent>
                    {presetTimes.map((time) => (
                      <SelectItem key={time.value} value={time.value}>
                        {time.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="interval-bells">Interval Bells</Label>
                  <Switch id="interval-bells" checked={intervalBells} onCheckedChange={setIntervalBells} />
                </div>
                {intervalBells && (
                  <Select
                    onValueChange={(value) => setIntervalTime(Number.parseInt(value) * 60)}
                    defaultValue="300"
                    disabled={!intervalBells}
                  >
                    <SelectContent>
                      <SelectItem value="60">Every 1 minute</SelectItem>
                      <SelectItem value="300">Every 5 minutes</SelectItem>
                      <SelectItem value="600">Every 10 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sound Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Background Sound</Label>
                <Select onValueChange={handleSoundChange} defaultValue="none">
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {backgroundSounds.map((sound) => (
                      <SelectItem key={sound.id} value={sound.id}>
                        {sound.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Volume</Label>
                  <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="h-8 w-8">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
                <Slider
                  value={[volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setVolume(value[0])}
                  disabled={isMuted}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hidden audio elements */}
      <audio ref={audioRef} />
      <audio ref={bellRef} src="/sounds/bell.mp3" />
    </div>
  )
}
