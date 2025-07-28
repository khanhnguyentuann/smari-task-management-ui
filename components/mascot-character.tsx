"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Minimize2, Send, Settings, Target, BarChart3, Users, Plus, Sparkles, Moon } from "lucide-react"

interface TaskBotProps {
  mood?: "happy" | "working" | "celebrating" | "concerned" | "thinking" | "sleeping"
  message?: string
  show?: boolean
  currentPage?: string
  user?: any
  onCreateTask?: () => void
  onNavigate?: (page: string) => void
}

interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  actions?: Array<{
    label: string
    action: string
    icon?: any
  }>
}

export function TaskBot({
  mood = "happy",
  message,
  show = true,
  currentPage = "dashboard",
  user,
  onCreateTask,
  onNavigate,
}: TaskBotProps) {
  const [currentMood, setCurrentMood] = useState(mood)
  const [isVisible, setIsVisible] = useState(show)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })
  const [contextMenu, setContextMenu] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content: `Hi ${user?.name?.split(" ")[0] || "there"}! I'm TaskBot, your productivity buddy! 🤖✨ How can I help you today?`,
      timestamp: new Date(),
      actions: [
        { label: "📝 Create Task", action: "create-task", icon: Plus },
        { label: "📊 My Progress", action: "progress", icon: BarChart3 },
        { label: "👥 Team Status", action: "team", icon: Users },
      ],
    },
  ])

  const chatRef = useRef<HTMLDivElement>(null)
  const robotRef = useRef<HTMLDivElement>(null)

  // Eye tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (robotRef.current && !isChatOpen) {
        const rect = robotRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

        if (distance < 200) {
          setEyePosition({
            x: Math.max(-3, Math.min(3, deltaX / 20)),
            y: Math.max(-2, Math.min(2, deltaY / 20)),
          })
        } else {
          setEyePosition({ x: 0, y: 0 })
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isChatOpen])

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  // Proactive messages based on context
  useEffect(() => {
    const showProactiveMessage = () => {
      const proactiveMessages = {
        dashboard: [
          "3 tasks are overdue - need help catching up? 🚀",
          "Great job! Team completed 12 tasks this week 🎉",
          "Your productivity is up 15% this week! 📈",
        ],
        projects: ["This project is 75% complete. Great progress! 🎯", "Want me to analyze project bottlenecks? 🔍"],
        "my-tasks": ["You have 2 high-priority tasks due today! ⚡", "Focus time! Want me to hide distractions? 🎯"],
      }

      const messages = proactiveMessages[currentPage as keyof typeof proactiveMessages] || []
      if (messages.length > 0 && Math.random() > 0.7) {
        setTimeout(() => {
          if (!isChatOpen) {
            setCurrentMood("concerned")
            // Show proactive message logic here
          }
        }, 5000)
      }
    }

    showProactiveMessage()
  }, [currentPage, isChatOpen])

  const getMascotExpression = (mood: string) => {
    const expressions = {
      happy: { eyes: "😊", mouth: "◡", glow: "from-green-400 to-blue-400" },
      working: { eyes: "🤔", mouth: "○", glow: "from-blue-400 to-purple-400" },
      celebrating: { eyes: "🤩", mouth: "◡", glow: "from-yellow-400 to-pink-400" },
      concerned: { eyes: "😟", mouth: "◔", glow: "from-orange-400 to-red-400" },
      thinking: { eyes: "🤔", mouth: "○", glow: "from-purple-400 to-blue-400" },
      sleeping: { eyes: "😴", mouth: "◡", glow: "from-gray-400 to-blue-400" },
    }
    return expressions[mood as keyof typeof expressions] || expressions.happy
  }

  const expression = getMascotExpression(currentMood)

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: chatInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setChatInput("")
    setIsTyping(true)
    setCurrentMood("thinking")

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(chatInput)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
      setCurrentMood("happy")
    }, 1500)
  }

  const generateBotResponse = (input: string): ChatMessage => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("task") && lowerInput.includes("create")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "I'll help you create a new task! 📝 What should we work on?",
        timestamp: new Date(),
        actions: [
          { label: "🚀 Quick Task", action: "quick-task" },
          { label: "📋 Detailed Task", action: "detailed-task" },
        ],
      }
    }

    if (lowerInput.includes("due") || lowerInput.includes("today")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "You have 3 tasks due today:\n• Update user authentication (High priority)\n• Review mobile designs (Medium)\n• Team standup prep (Low)\n\nWould you like me to help prioritize them? 🎯",
        timestamp: new Date(),
        actions: [
          { label: "📊 Prioritize", action: "prioritize" },
          { label: "⏰ Set Reminders", action: "reminders" },
        ],
      }
    }

    if (lowerInput.includes("progress") || lowerInput.includes("status")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "📈 Weekly insights for you:\n• Completed: 8 tasks (+2 vs last week)\n• On time: 95% (excellent!)\n• Most productive day: Tuesday\n\n💡 Suggestion: Schedule important tasks on Tuesdays for best results!",
        timestamp: new Date(),
      }
    }

    // Default responses
    const responses = [
      "That's interesting! How can I help you with your tasks? 🤖",
      "I'm here to boost your productivity! What would you like to work on? ⚡",
      "Let me help you stay organized! What's on your mind? 📋",
      "Great question! I can help with tasks, projects, and team coordination! 🎯",
    ]

    return {
      id: Date.now().toString(),
      type: "bot",
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
    }
  }

  const handleActionClick = (action: string) => {
    switch (action) {
      case "create-task":
      case "quick-task":
      case "detailed-task":
        onCreateTask?.()
        setIsChatOpen(false)
        break
      case "progress":
        onNavigate?.("dashboard")
        setIsChatOpen(false)
        break
      case "team":
        onNavigate?.("projects")
        setIsChatOpen(false)
        break
      default:
        console.log("Action:", action)
    }
  }

  const quickActions = [
    { icon: Target, label: "Focus Mode", action: "focus" },
    { icon: BarChart3, label: "Daily Summary", action: "summary" },
    { icon: Sparkles, label: "Celebrate", action: "celebrate" },
    { icon: Settings, label: "Settings", action: "settings" },
    { icon: Moon, label: "Do Not Disturb", action: "dnd" },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Context Menu */}
          <AnimatePresence>
            {contextMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="absolute bottom-full right-0 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border p-2 min-w-[160px]"
              >
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.action}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      handleActionClick(action.action)
                      setContextMenu(false)
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                  >
                    <action.icon className="h-4 w-4" />
                    {action.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Interface */}
          <AnimatePresence>
            {isChatOpen && !isMinimized && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="absolute bottom-full right-0 mb-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border overflow-hidden"
              >
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <div className="flex items-center gap-2">
                    <div className="text-lg">🤖</div>
                    <span className="font-semibold">TaskBot Assistant</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsMinimized(true)}
                      className="text-white hover:bg-white/20 h-6 w-6 p-0"
                    >
                      <Minimize2 className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsChatOpen(false)}
                      className="text-white hover:bg-white/20 h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-4 h-64" ref={chatRef}>
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                            msg.type === "user"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{msg.content}</p>
                          {msg.actions && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {msg.actions.map((action, index) => (
                                <Button
                                  key={index}
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleActionClick(action.action)}
                                  className="text-xs h-6 px-2"
                                >
                                  {action.label}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-3 py-2">
                          <div className="flex space-x-1">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>

                {/* Chat Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask me anything about your tasks..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={handleSendMessage} disabled={!chatInput.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimized Chat */}
          <AnimatePresence>
            {isChatOpen && isMinimized && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-full right-0 mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-4 py-2 shadow-lg cursor-pointer"
                onClick={() => setIsMinimized(false)}
              >
                <div className="flex items-center gap-2">
                  <div className="text-sm">🤖</div>
                  <span className="text-sm font-medium">TaskBot</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && !isChatOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute bottom-full right-0 mb-4 bg-gray-900 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap shadow-lg"
              >
                Hi! I'm TaskBot, your productivity buddy! Click me for help 💫
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Robot Character */}
          <motion.div
            ref={robotRef}
            className="relative cursor-pointer select-none"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setIsChatOpen(!isChatOpen)}
            onContextMenu={(e) => {
              e.preventDefault()
              setContextMenu(!contextMenu)
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: currentMood === "celebrating" ? [0, -20, 0] : [0, -5, 0],
              rotate: currentMood === "happy" ? [0, 2, -2, 0] : 0,
            }}
            transition={{
              duration: currentMood === "celebrating" ? 0.6 : 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            {/* Glow Effect */}
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${expression.glow} opacity-20 blur-lg`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />

            {/* Robot Body */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-lg flex items-center justify-center">
              {/* Eyes */}
              <div className="flex items-center gap-1">
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{
                    x: eyePosition.x,
                    y: eyePosition.y,
                    scaleY: currentMood === "sleeping" ? 0.1 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{
                    x: eyePosition.x,
                    y: eyePosition.y,
                    scaleY: currentMood === "sleeping" ? 0.1 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>

              {/* Mouth */}
              <motion.div
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-white rounded-full"
                animate={{
                  scaleX: isTyping ? [1, 1.5, 1] : 1,
                  scaleY: currentMood === "concerned" ? 0.5 : 1,
                }}
                transition={{ duration: 0.3, repeat: isTyping ? Number.POSITIVE_INFINITY : 0 }}
              />

              {/* Thinking Dots */}
              {currentMood === "thinking" && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 bg-blue-400 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              )}

              {/* Celebration Particles */}
              {currentMood === "celebrating" && (
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: [0, (Math.random() - 0.5) * 40],
                        y: [0, (Math.random() - 0.5) * 40],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                      }}
                      style={{
                        left: "50%",
                        top: "50%",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Active Indicator */}
              {isChatOpen && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
