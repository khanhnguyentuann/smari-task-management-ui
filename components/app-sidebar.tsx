"use client"

import { LayoutDashboard, FolderKanban, CheckSquare, User, Sparkles } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"

interface AppSidebarProps {
  user: {
    name: string
    email: string
    role: "Admin" | "Member"
    avatar: string
  }
  currentPage: string
  onNavigate: (page: string) => void
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    key: "dashboard",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    key: "projects",
  },
  {
    title: "My Tasks",
    icon: CheckSquare,
    key: "my-tasks",
  },
  {
    title: "Profile",
    icon: User,
    key: "profile",
  },
]

export function AppSidebar({ user, currentPage, onNavigate }: AppSidebarProps) {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
            <Sparkles className="h-6 w-6" />
            Smart Task
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.key}>
              <SidebarMenuButton
                onClick={() => onNavigate(item.key)}
                isActive={currentPage === item.key}
                className="w-full justify-start"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.name}</span>
              <Badge variant={user.role === "Admin" ? "default" : "secondary"} className="text-xs w-fit">
                {user.role}
              </Badge>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
