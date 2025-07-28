"use client"

import { useState, useEffect } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { EnhancedDashboardContent } from "@/components/enhanced-dashboard-content"
import { ProjectsList } from "@/components/projects-list"
import { ProjectDetail } from "@/components/project-detail"
import { MyTasks } from "@/components/my-tasks"
import { Profile } from "@/components/profile"
import { Settings } from "@/components/settings"
import { Notifications } from "@/components/notifications"
import { HelpSupport } from "@/components/help-support"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimatedBackground } from "@/components/animated-background"
import { TaskBot } from "@/components/mascot-character"
import { WelcomeScreen } from "@/components/welcome-screen"
import { AuthModal } from "@/components/auth-modal"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("smart-task-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setShowWelcome(false)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (userData: any) => {
    setUser(userData)
    localStorage.setItem("smart-task-user", JSON.stringify(userData))
    setShowWelcome(false)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("smart-task-user")
    setShowWelcome(true)
    setCurrentPage("dashboard")
    setSelectedProject(null)
  }

  const handleGetStarted = () => {
    setShowAuthModal(true)
  }

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <EnhancedDashboardContent user={user} onNavigate={setCurrentPage} />
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
      case "settings":
        return <Settings user={user} />
      case "notifications":
        return <Notifications user={user} />
      case "help-support":
        return <HelpSupport user={user} />
      default:
        return <EnhancedDashboardContent user={user} onNavigate={setCurrentPage} />
    }
  }

  const getMascotMessage = () => {
    if (currentPage === "dashboard") {
      const hour = new Date().getHours()
      if (hour < 12) return `Good morning, ${user?.name?.split(" ")[0]}! Ready to conquer today? 🌅`
      if (hour < 17) return `Good afternoon, ${user?.name?.split(" ")[0]}! Keep up the great work! ☀️`
      return `Good evening, ${user?.name?.split(" ")[0]}! Time to wrap up? 🌙`
    }
    return undefined
  }

  if (isLoading) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 1, repeat: Number.POSITIVE_INFINITY },
            }}
            className="text-6xl"
          >
            ✨
          </motion.div>
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <WelcomeScreen onGetStarted={handleGetStarted} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedBackground />
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <AppSidebar user={user} currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} />
                <main className="flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderContent()}
                    </motion.div>
                  </AnimatePresence>
                </main>
              </div>
            </SidebarProvider>
            <TaskBot
              mood={currentPage === "dashboard" ? "happy" : "working"}
              currentPage={currentPage}
              user={user}
              onCreateTask={() => {
                if (currentPage !== "projects") {
                  setCurrentPage("projects")
                }
                // Additional create task logic can be added here
              }}
              onNavigate={setCurrentPage}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} onLogin={handleLogin} />
    </ThemeProvider>
  )
}
