"use client"

import { useState } from "react"
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FolderKanban, CheckSquare, Clock, AlertTriangle, Plus, Activity } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { GlassmorphismCard } from "@/components/glassmorphism-card"
import { EnhancedButton } from "@/components/enhanced-button"
import { motion } from "framer-motion"

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
            {[
              {
                title: "Total Projects",
                value: stats.totalProjects,
                icon: FolderKanban,
                color: "text-blue-600",
                change: "+2 from last month",
              },
              {
                title: "Active Tasks",
                value: stats.activeTasks,
                icon: CheckSquare,
                color: "text-green-600",
                change: "+5 from yesterday",
              },
              {
                title: "Completed Tasks",
                value: stats.completedTasks,
                icon: Clock,
                color: "text-purple-600",
                change: "+12 this week",
              },
              {
                title: "Overdue Tasks",
                value: stats.overdueTasks,
                icon: AlertTriangle,
                color: "text-red-600",
                change: "Needs attention",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassmorphismCard className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      className="text-2xl font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                    >
                      {stat.value}
                    </motion.div>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </CardContent>
                </GlassmorphismCard>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Activities */}
            <GlassmorphismCard>
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
            </GlassmorphismCard>

            {/* Quick Actions */}
            <GlassmorphismCard>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {user.role === "Admin" && (
                  <EnhancedButton onClick={() => onNavigate("projects")} className="w-full justify-start" size="lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Project
                  </EnhancedButton>
                )}
                <EnhancedButton
                  onClick={() => onNavigate("my-tasks")}
                  variant="outline"
                  className="w-full justify-start"
                  size="lg"
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Create New Task
                </EnhancedButton>
                <EnhancedButton
                  onClick={() => onNavigate("projects")}
                  variant="outline"
                  className="w-full justify-start"
                  size="lg"
                >
                  <FolderKanban className="h-4 w-4 mr-2" />
                  View All Projects
                </EnhancedButton>
              </CardContent>
            </GlassmorphismCard>
          </div>
        </div>
      </div>
    </div>
  )
}
