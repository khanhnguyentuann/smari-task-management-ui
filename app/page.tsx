"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { ProjectsList } from "@/components/projects-list"
import { ProjectDetail } from "@/components/project-detail"
import { MyTasks } from "@/components/my-tasks"
import { Profile } from "@/components/profile"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "Admin" as "Admin" | "Member",
    avatar: "/placeholder.svg?height=32&width=32",
  })

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardContent user={user} onNavigate={setCurrentPage} />
      case "projects":
        return (
          <ProjectsList
            user={user}
            onProjectSelect={(id) => {
              setSelectedProject(id)
              setCurrentPage("project-detail")
            }}
          />
        )
      case "project-detail":
        return <ProjectDetail projectId={selectedProject} user={user} onBack={() => setCurrentPage("projects")} />
      case "my-tasks":
        return <MyTasks user={user} />
      case "profile":
        return <Profile user={user} />
      default:
        return <DashboardContent user={user} onNavigate={setCurrentPage} />
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar user={user} currentPage={currentPage} onNavigate={setCurrentPage} />
          <main className="flex-1 overflow-hidden">{renderContent()}</main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}
