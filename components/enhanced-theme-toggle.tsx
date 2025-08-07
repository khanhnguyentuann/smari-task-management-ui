"use client"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function EnhancedThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    )
  }

  const isDark = theme === "dark"

  return (
    <div className="flex items-center gap-2">
      {/* Theme Preview Swatch */}
      <div
        className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-700 transition-colors duration-300"
        style={{
          backgroundColor: isDark ? 'hsl(240 10% 3.9%)' : 'hsl(0 0% 100%)',
        }}
        aria-label={`Current theme preview: ${theme}`}
      />

      <motion.button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`relative w-12 h-6 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors duration-300 ${
          isDark 
            ? "bg-gradient-to-r from-blue-600 to-purple-600" 
            : "bg-gradient-to-r from-yellow-400 to-orange-500"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Slider */}
        <motion.div
          className="relative w-4 h-4 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden"
          initial={false}
          animate={{
            x: isDark ? 24 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: 90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-blue-600 flex items-center justify-center w-full h-full overflow-hidden"
              >
                🌙
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: -90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-yellow-600 flex items-center justify-center w-full h-full overflow-hidden"
              >
                ☀️
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Background stars for dark mode */}
        {isDark && (
          <div className="absolute inset-0 overflow-hidden rounded-full">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        )}
      </motion.button>
    </div>
  )
}
