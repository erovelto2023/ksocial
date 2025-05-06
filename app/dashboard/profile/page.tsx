"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, Mail, MapPin, Calendar, LinkIcon, Save, Edit, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock user data
const mockUser = {
  id: "user1",
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  bio: "Spiritual seeker on a journey of self-discovery and healing. Passionate about energy work, meditation, and connecting with like-minded souls.",
  location: "Portland, Oregon",
  joinedDate: "2023-01-15",
  website: "www.sarahspiritualjourney.com",
  image: "/placeholder.svg?height=128&width=128",
  interests: ["Energy Healing", "Meditation", "Crystal Work", "Shamanism", "Sound Healing"],
  certifications: [
    { name: "Reiki Master", issuer: "International Reiki Association", year: "2020" },
    { name: "Certified Meditation Instructor", issuer: "Mindful Living Institute", year: "2019" },
  ],
  privacySettings: {
    showEmail: false,
    showLocation: true,
    allowMessages: true,
    emailNotifications: true,
  },
}

// Mock activity data
const mockActivity = [
  {
    id: "1",
    type: "journal",
    title: "New Journal Entry",
    description: "Created a new journal entry about chakra balancing experiences",
    date: "2023-06-15T14:23:00Z",
  },
  {
    id: "2",
    type: "group",
    title: "Joined Healing Group",
    description: "Became a member of 'Energy Healers Circle'",
    date: "2023-06-12T10:45:00Z",
  },
  {
    id: "3",
    type: "comment",
    title: "Commented on Post",
    description: "Left a comment on 'The Power of Intention' article",
    date: "2023-06-10T16:30:00Z",
  },
  {
    id: "4",
    type: "session",
    title: "Completed Healing Session",
    description: "Participated in a group Reiki healing session",
    date: "2023-06-08T19:15:00Z",
  },
  {
    id: "5",
    type: "post",
    title: "Shared Experience",
    description: "Posted about your meditation breakthrough in the community forum",
    date: "2023-06-05T11:20:00Z",
  },
]

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)
  const [newInterest, setNewInterest] = useState("")
  const [activity] = useState(mockActivity)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddInterest = () => {
    if (newInterest.trim() && !editedUser.interests.includes(newInterest.trim())) {
      setEditedUser({
        ...editedUser,
        interests: [...editedUser.interests, newInterest.trim()],
      })
      setNewInterest("")
    }
  }

  const handleRemoveInterest = (interest: string) => {
    setEditedUser({
      ...editedUser,
      interests: editedUser.interests.filter((i) => i !== interest),
    })
  }

  const handleSaveProfile = async () => {
    setIsSubmitting(true)
    try {
      // Here you would normally send the data to your API
      console.log("Saving profile:", editedUser)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user state with edited values
      setUser(editedUser)
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().slice(0, 10)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "journal":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Journal
          </Badge>
        )
      case "group":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Group
          </Badge>
        )
      case "comment":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
            Comment
          </Badge>
        )
      case "session":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            Session
          </Badge>
        )
      case "post":
        return (
          <Badge variant="outline" className="bg-rose-50 text-rose-700">
            Post
          </Badge>
        )
      default:
        return <Badge variant="outline">Activity</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your profile information and account settings.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader className="relative">
              <div className="absolute right-6 top-6">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile} disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                )}
              </div>
              <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-6">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="mt-4 text-center sm:mt-0 sm:text-left">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      />
                    </div>
                  ) : (
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                  )}
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground sm:justify-start">
                    <div className="flex items-center">
                      <Mail className="mr-1 h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    {user.location && (
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {isEditing ? (
                          <Input
                            value={editedUser.location}
                            onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                            className="h-8 w-[180px]"
                          />
                        ) : (
                          <span>{user.location}</span>
                        )}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>Joined {formatDate(user.joinedDate)}</span>
                    </div>
                    {user.website && (
                      <div className="flex items-center">
                        <LinkIcon className="mr-1 h-4 w-4" />
                        {isEditing ? (
                          <Input
                            value={editedUser.website}
                            onChange={(e) => setEditedUser({ ...editedUser, website: e.target.value })}
                            className="h-8 w-[220px]"
                          />
                        ) : (
                          <a
                            href={`https://${user.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:underline"
                          >
                            {user.website}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">About Me</h3>
                {isEditing ? (
                  <Textarea
                    value={editedUser.bio}
                    onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                    className="min-h-[120px]"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{user.bio}</p>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">Interests & Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? editedUser.interests : user.interests).map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-sm">
                      {interest}
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveInterest(interest)}
                          className="ml-1 rounded-full text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  ))}
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        placeholder="Add interest"
                        className="h-8 w-[180px]"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddInterest()
                          }
                        }}
                      />
                      <Button size="sm" variant="outline" onClick={handleAddInterest}>
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">Certifications & Training</h3>
                <div className="space-y-3">
                  {user.certifications.map((cert, index) => (
                    <div key={index} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{cert.name}</h4>
                        <Badge variant="outline">{cert.year}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                  ))}
                  {isEditing && (
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" /> Add Certification
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions and contributions on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {activity.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex-shrink-0 pt-1">{getActivityIcon(item.type)}</div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(item.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control what information is visible to other users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-email">Show Email Address</Label>
                  <p className="text-sm text-muted-foreground">Allow other users to see your email address</p>
                </div>
                <Switch
                  id="show-email"
                  checked={user.privacySettings.showEmail}
                  onCheckedChange={(checked) =>
                    setUser({
                      ...user,
                      privacySettings: { ...user.privacySettings, showEmail: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-location">Show Location</Label>
                  <p className="text-sm text-muted-foreground">Display your location on your profile</p>
                </div>
                <Switch
                  id="show-location"
                  checked={user.privacySettings.showLocation}
                  onCheckedChange={(checked) =>
                    setUser({
                      ...user,
                      privacySettings: { ...user.privacySettings, showLocation: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allow-messages">Allow Direct Messages</Label>
                  <p className="text-sm text-muted-foreground">Let other users send you private messages</p>
                </div>
                <Switch
                  id="allow-messages"
                  checked={user.privacySettings.allowMessages}
                  onCheckedChange={(checked) =>
                    setUser({
                      ...user,
                      privacySettings: { ...user.privacySettings, allowMessages: checked },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates about activity relevant to you</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={user.privacySettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setUser({
                      ...user,
                      privacySettings: { ...user.privacySettings, emailNotifications: checked },
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={() => alert("Settings saved!")}>
                <Save className="mr-2 h-4 w-4" /> Save Settings
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" value={user.email} readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex gap-2">
                  <Input id="password" type="password" value="••••••••••••" readOnly />
                  <Button variant="outline">Change</Button>
                </div>
              </div>
              <Separator />
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="america-los_angeles">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america-los_angeles">Pacific Time (US & Canada)</SelectItem>
                    <SelectItem value="america-denver">Mountain Time (US & Canada)</SelectItem>
                    <SelectItem value="america-chicago">Central Time (US & Canada)</SelectItem>
                    <SelectItem value="america-new_york">Eastern Time (US & Canada)</SelectItem>
                    <SelectItem value="europe-london">London</SelectItem>
                    <SelectItem value="europe-paris">Paris</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="destructive">Delete Account</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
