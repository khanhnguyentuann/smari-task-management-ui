"use client"

import { useState } from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  SettingsIcon,
  UserIcon,
  BellIcon,
  ShieldIcon,
  PaletteIcon,
  GlobeIcon,
  UsersIcon,
  KeyIcon,
  MailIcon,
  ClockIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react"
import { motion } from "framer-motion"
import { GlassmorphismCard } from "@/components/glassmorphism-card"
import { EnhancedButton } from "@/components/enhanced-button"
import { EnhancedThemeToggle } from "@/components/enhanced-theme-toggle"

interface SettingsProps {
  user: {
    id: string
    name: string
    email: string
    role: "Admin" | "Member"
    avatar: string
    department?: string
  }
}

export function Settings({ user }: SettingsProps) {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    desktop: false,
    taskAssigned: true,
    taskCompleted: true,
    projectUpdates: true,
    weeklyDigest: false,
    mentions: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    activityVisible: false,
    onlineStatus: true,
    readReceipts: true,
  })

  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "UTC-8",
    dateFormat: "MM/DD/YYYY",
    startOfWeek: "monday",
    workingHours: {
      start: "09:00",
      end: "17:00",
    },
  })

  const [showPassword, setShowPassword] = useState(false)

  const teamMembers = [
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah@company.com",
      role: "Admin",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      status: "active",
      lastActive: "2 minutes ago",
    },
    {
      id: "2",
      name: "Alex Rodriguez",
      email: "alex@company.com",
      role: "Member",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      status: "active",
      lastActive: "1 hour ago",
    },
    {
      id: "3",
      name: "Emily Johnson",
      email: "emily@company.com",
      role: "Member",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      status: "inactive",
      lastActive: "3 days ago",
    },
  ]

  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-4 px-6">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <SettingsIcon className="h-5 w-5 text-blue-600" />
            </motion.div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <BellIcon className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <ShieldIcon className="h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <PaletteIcon className="h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <GlobeIcon className="h-4 w-4" />
                Preferences
              </TabsTrigger>
              {user.role === "Admin" && (
                <TabsTrigger value="team" className="flex items-center gap-2">
                  <UsersIcon className="h-4 w-4" />
                  Team
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="account" className="space-y-6">
              <GlassmorphismCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-blue-600" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={user.name.split(" ")[0]} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={user.name.split(" ")[1] || ""} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={user.email} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue={user.department || ""} />
                  </div>

                  <div className="flex gap-2">
                    <EnhancedButton>Save Changes</EnhancedButton>
                    <EnhancedButton variant="outline">Cancel</EnhancedButton>
                  </div>
                </CardContent>
              </GlassmorphismCard>

              <GlassmorphismCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <KeyIcon className="h-5 w-5 text-green-600" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                    </div>
                  </div>

                  <EnhancedButton>Update Password</EnhancedButton>
                </CardContent>
              </GlassmorphismCard>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <GlassmorphismCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BellIcon className="h-5 w-5 text-blue-600" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <MailIcon className="h-4 w-4" />
                      Delivery Methods
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive push notifications on mobile</p>
                        </div>
                        <Switch
                          checked={notifications.push}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Desktop Notifications</p>
                          <p className="text-sm text-muted-foreground">Show notifications on desktop</p>
                        </div>
                        <Switch
                          checked={notifications.desktop}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, desktop: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Notification Types</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Task Assigned</span>
                        <Switch
                          checked={notifications.taskAssigned}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, taskAssigned: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Task Completed</span>
                        <Switch
                          checked={notifications.taskCompleted}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, taskCompleted: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Project Updates</span>
                        <Switch
                          checked={notifications.projectUpdates}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, projectUpdates: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Weekly Digest</span>
                        <Switch
                          checked={notifications.weeklyDigest}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Mentions</span>
                        <Switch
                          checked={notifications.mentions}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, mentions: checked })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </GlassmorphismCard>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <GlassmorphismCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldIcon className="h-5 w-5 text-green-600" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Profile Visibility</p>
                      <p className="text-sm text-muted-foreground">Allow others to see your profile</p>
                    </div>
                    <Switch
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Activity Visibility</p>
                      <p className="text-sm text-muted-foreground">Show your activity to team members</p>
                    </div>
                    <Switch
                      checked={privacy.activityVisible}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, activityVisible: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Online Status</p>
                      <p className="text-sm text-muted-foreground">Show when you're online</p>
                    </div>
                    <Switch
                      checked={privacy.onlineStatus}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, onlineStatus: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Read Receipts</p>
                      <p className="text-sm text-muted-foreground">Show when you've read messages</p>
                    </div>
                    <Switch
                      checked={privacy.readReceipts}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, readReceipts: checked })}
                    />
                  </div>
                </CardContent>
              </GlassmorphismCard>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <GlassmorphismCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PaletteIcon className="h-5 w-5 text-purple-600" />
                    Appearance Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Theme</p>
                      <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                    </div>
                    <EnhancedThemeToggle />
                  </div>

                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex gap-2">
                      {["blue", "purple", "green", "red", "orange"].map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full bg-${color}-500 hover:scale-110 transition-transform`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </GlassmorphismCard>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <GlassmorphismCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GlobeIcon className="h-5 w-5 text-blue-600" />
                    Regional Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select
                        value={preferences.language}
                        onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="vi">Tiếng Việt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select
                        value={preferences.timezone}
                        onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                          <SelectItem value="UTC+7">Vietnam Time (UTC+7)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date Format</Label>
                      <Select
                        value={preferences.dateFormat}
                        onValueChange={(value) => setPreferences({ ...preferences, dateFormat: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Start of Week</Label>
                      <Select
                        value={preferences.startOfWeek}
                        onValueChange={(value) => setPreferences({ ...preferences, startOfWeek: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sunday">Sunday</SelectItem>
                          <SelectItem value="monday">Monday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </GlassmorphismCard>

              <GlassmorphismCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClockIcon className="h-5 w-5 text-green-600" />
                    Working Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={preferences.workingHours.start}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            workingHours: { ...preferences.workingHours, start: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        value={preferences.workingHours.end}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            workingHours: { ...preferences.workingHours, end: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </GlassmorphismCard>
            </TabsContent>

            {user.role === "Admin" && (
              <TabsContent value="team" className="space-y-6">
                <GlassmorphismCard>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UsersIcon className="h-5 w-5 text-blue-600" />
                      Team Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Team Members</h4>
                      <EnhancedButton>
                        <MailIcon className="h-4 w-4 mr-2" />
                        Invite Member
                      </EnhancedButton>
                    </div>

                    <div className="space-y-3">
                      {teamMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <img
                              src={member.avatar || "/placeholder.svg"}
                              alt={member.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">{member.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={member.role === "Admin" ? "default" : "secondary"}>{member.role}</Badge>
                            <Badge variant={member.status === "active" ? "default" : "secondary"}>
                              {member.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </GlassmorphismCard>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
