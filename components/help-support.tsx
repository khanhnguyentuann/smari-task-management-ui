"use client"

import type React from "react"

import { useState } from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MessageCircle,
  Book,
  Video,
  Mail,
  Phone,
  Clock,
  AlertCircle,
  HelpCircle,
  Send,
  ExternalLink,
} from "lucide-react"
import { motion } from "framer-motion"
import { GlassmorphismCard } from "@/components/glassmorphism-card"
import { EnhancedButton } from "@/components/enhanced-button"

interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Member"
  avatar: string
  department?: string
}

interface HelpSupportProps {
  user: User
}

export function HelpSupport({ user }: HelpSupportProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    priority: "medium",
  })

  const faqItems = [
    {
      id: 1,
      question: "How do I create a new project?",
      answer:
        "To create a new project, navigate to the Projects page and click the 'Create New Project' button. Fill in the project details and click 'Create Project'.",
      category: "Projects",
      views: 1250,
    },
    {
      id: 2,
      question: "How can I assign tasks to team members?",
      answer:
        "When creating or editing a task, use the 'Assignee' dropdown to select a team member. You can also drag and drop tasks between different status columns.",
      category: "Tasks",
      views: 980,
    },
    {
      id: 3,
      question: "How do I change my notification settings?",
      answer:
        "Go to Settings > Notifications to customize your notification preferences. You can choose which events trigger notifications and how you receive them.",
      category: "Settings",
      views: 756,
    },
    {
      id: 4,
      question: "Can I export project data?",
      answer:
        "Yes! Go to your project settings and click 'Export Data'. You can export in various formats including CSV, PDF, and JSON.",
      category: "Data",
      views: 642,
    },
    {
      id: 5,
      question: "How do I invite team members?",
      answer:
        "Admins can invite team members by going to Settings > Team Management and clicking 'Invite Member'. Enter their email address and select their role.",
      category: "Team",
      views: 534,
    },
  ]

  const tutorials = [
    {
      id: 1,
      title: "Getting Started with Smart Task",
      description: "Learn the basics of project management and task organization",
      duration: "5 min",
      type: "video",
      thumbnail: "🎬",
    },
    {
      id: 2,
      title: "Advanced Task Management",
      description: "Master advanced features like AI summaries and automation",
      duration: "8 min",
      type: "video",
      thumbnail: "🚀",
    },
    {
      id: 3,
      title: "Team Collaboration Guide",
      description: "Best practices for working with your team effectively",
      duration: "6 min",
      type: "article",
      thumbnail: "👥",
    },
    {
      id: 4,
      title: "Customizing Your Workspace",
      description: "Personalize your dashboard and notification settings",
      duration: "4 min",
      type: "article",
      thumbnail: "⚙️",
    },
  ]

  const tickets = [
    {
      id: "TK-001",
      subject: "Unable to upload files",
      status: "open",
      priority: "high",
      created: "2 hours ago",
      lastUpdate: "1 hour ago",
    },
    {
      id: "TK-002",
      subject: "Feature request: Dark mode",
      status: "in-progress",
      priority: "medium",
      created: "1 day ago",
      lastUpdate: "6 hours ago",
    },
    {
      id: "TK-003",
      subject: "Email notifications not working",
      status: "resolved",
      priority: "low",
      created: "3 days ago",
      lastUpdate: "2 days ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
      case "in-progress":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
      case "resolved":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", contactForm)
    setContactForm({ subject: "", message: "", priority: "medium" })
  }

  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-4 px-6">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <HelpCircle className="h-5 w-5 text-blue-600" />
            </motion.div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Help & Support
            </h1>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <Tabs defaultValue="faq" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                FAQ
              </TabsTrigger>
              <TabsTrigger value="tutorials" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Tutorials
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Contact
              </TabsTrigger>
              <TabsTrigger value="tickets" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                My Tickets
              </TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="space-y-6">
              {/* Search */}
              <GlassmorphismCard>
                <CardContent className="p-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search frequently asked questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </GlassmorphismCard>

              {/* FAQ Items */}
              <div className="space-y-4">
                {filteredFAQ.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GlassmorphismCard className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{item.question}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{item.category}</Badge>
                              <span className="text-xs text-muted-foreground">{item.views} views</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                        </div>
                      </CardContent>
                    </GlassmorphismCard>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tutorials" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {tutorials.map((tutorial, index) => (
                  <motion.div
                    key={tutorial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GlassmorphismCard className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="text-4xl">{tutorial.thumbnail}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                                {tutorial.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{tutorial.duration}</span>
                            </div>
                            <Badge variant={tutorial.type === "video" ? "default" : "secondary"}>
                              {tutorial.type === "video" ? "Video" : "Article"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </GlassmorphismCard>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Contact Form */}
                <GlassmorphismCard>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-blue-600" />
                      Send us a message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="What can we help you with?"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <select
                          id="priority"
                          value={contactForm.priority}
                          onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Please describe your issue or question in detail..."
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          rows={5}
                          required
                        />
                      </div>

                      <EnhancedButton type="submit" className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </EnhancedButton>
                    </form>
                  </CardContent>
                </GlassmorphismCard>

                {/* Contact Info */}
                <div className="space-y-6">
                  <GlassmorphismCard>
                    <CardHeader>
                      <CardTitle>Other ways to reach us</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Email Support</p>
                          <p className="text-sm text-muted-foreground">support@smarttask.com</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <Phone className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Phone Support</p>
                          <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <MessageCircle className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium">Live Chat</p>
                          <p className="text-sm text-muted-foreground">Available 24/7</p>
                        </div>
                      </div>
                    </CardContent>
                  </GlassmorphismCard>

                  <GlassmorphismCard>
                    <CardHeader>
                      <CardTitle>Response Times</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">High Priority</span>
                        <Badge className="bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                          Within 2 hours
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Medium Priority</span>
                        <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
                          Within 24 hours
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Low Priority</span>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                          Within 48 hours
                        </Badge>
                      </div>
                    </CardContent>
                  </GlassmorphismCard>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tickets" className="space-y-6">
              <div className="space-y-4">
                {tickets.map((ticket, index) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GlassmorphismCard className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold">{ticket.subject}</h3>
                              <Badge className={getStatusColor(ticket.status)}>{ticket.status.replace("-", " ")}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>#{ticket.id}</span>
                              <span>Created {ticket.created}</span>
                              <span>Last update {ticket.lastUpdate}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(ticket.priority)}`} />
                            <EnhancedButton variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View
                            </EnhancedButton>
                          </div>
                        </div>
                      </CardContent>
                    </GlassmorphismCard>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
