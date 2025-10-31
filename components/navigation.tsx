"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Scroll, Sword, Shield, Sparkles, Mail, User } from "lucide-react"

const navItems = [
  { name: "Hero", icon: Sword, href: "#hero" },
  { name: "About", icon: User, href: "#about" },
  { name: "Quests", icon: Scroll, href: "#experience" },
  { name: "Loot", icon: Shield, href: "#projects" },
  { name: "Skills", icon: Sparkles, href: "#skills" },
  { name: "Contact", icon: Mail, href: "#contact" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.href.slice(1))
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-parchment/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div className="text-2xl font-bold text-gold" whileHover={{ scale: 1.05 }}>
            ⚔️
          </motion.div>

          <div className="flex gap-1 md:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.href.slice(1)

              return (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-3 py-2 rounded-lg transition-colors ${
                    isActive ? "text-gold" : "text-stone hover:text-gold"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5 md:hidden" />
                  <span className="hidden md:inline text-sm font-medieval">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gold/10 rounded-lg border border-gold/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
