"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FolderKanban, CheckSquare, Clock, AlertTriangle, Plus, Activity } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface User {
  name: string
  email: string
  role: "Admin" | "Member"
  avatar: string
}

interface DashboardContentProps {
  user: User
  onNavigate: (page: string) => void
}

export function DashboardContent({ user, onNavigate }: DashboardContentProps) {
  const [stats] = useState({
    totalProjects: 12,
    activeTasks: 28,
    completedTasks: 156,
    overdueTasks: 3,
  })

  const [recentActivities] = useState([
    {
      id: 1,
      type: "task_completed",
      user: "Sarah Wilson",
      action: "completed task",
      target: "Update user authentication",
      time: "2 minutes ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      type: "project_created",
      user: "Mike Johnson",
      action: "created project",
      target: "Mobile App Redesign",
      time: "1 hour ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      type: "task_assigned",
      user: "Emily Chen",
      action: "assigned task",
      target: "Database optimization",
      time: "3 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ])

  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-4 px-6">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <FolderKanban className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProjects}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                <CheckSquare className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeTasks}</div>
                <p className="text-xs text-muted-foreground">+5 from yesterday</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                <Clock className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedTasks}</div>
                <p className="text-xs text-muted-foreground">+12 this week</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.overdueTasks}</div>
                <p className="text-xs text-muted-foreground">Needs attention</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                        <AvatarFallback>
                          {activity.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {user.role === "Admin" && (
                  <Button onClick={() => onNavigate("projects")} className="w-full justify-start" size="lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Project
                  </Button>
                )}
                <Button
                  onClick={() => onNavigate("my-tasks")}
                  variant="outline"
                  className="w-full justify-start"
                  size="lg"
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Create New Task
                </Button>
                <Button
                  onClick={() => onNavigate("projects")}
                  variant="outline"
                  className="w-full justify-start"
                  size="lg"
                >
                  <FolderKanban className="h-4 w-4 mr-2" />
                  View All Projects
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
