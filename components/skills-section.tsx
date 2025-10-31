"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Sword, Wand2, BookOpen, Wrench } from "lucide-react"

interface Skill {
  name: string
  category: string
}

interface SkillsData {
  combat: Skill[]
  magic: Skill[]
  arcane: Skill[]
  utility: Skill[]
}

const skillCategories = {
  combat: { icon: Sword, title: "Combat Skills", color: "from-stone-800 to-stone-600" },
  magic: { icon: Wand2, title: "Magic Arts", color: "from-amber-900 to-amber-700" },
  arcane: { icon: BookOpen, title: "Arcane Knowledge", color: "from-slate-800 to-slate-600" },
  utility: { icon: Wrench, title: "Utility Skills", color: "from-emerald-900 to-emerald-700" },
}

export function SkillsSection({ data }: { data: SkillsData }) {
  const categories = Object.entries(data)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  // Simple sparkle particle component
  const Particles = ({ count = 12 }: { count?: number }) => (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 1.2, delay: i * 0.07, repeat: Infinity }}
        >
          <span className="block w-2 h-2 rounded-full bg-gold/70 blur-sm" />
        </motion.span>
      ))}
    </>
  )

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-dungeon-light to-parchment relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-stone-600 font-medieval">Skill Compendium</h2>
          <p className="text-muted-foreground mt-2 font-medieval">Mastered Abilities & Proficiencies</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categories.map(([category, skills], index) => {
            const { icon: Icon, title, color } = skillCategories[category as keyof typeof skillCategories]

            const isFocused = focusedIndex === index

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                onMouseEnter={() => setFocusedIndex(index)}
                onMouseLeave={() => setFocusedIndex(null)}
                className="relative"
              >
                <Card className={`p-6 bg-card-parchment border-2 border-gold/30 shadow-xl transition-shadow h-full ${isFocused ? "ring-4 ring-gold/40 shadow-2xl" : "hover:shadow-2xl"}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      animate={isFocused ? { scale: 1.15, rotate: 360 } : {}}
                      transition={{ duration: 0.6 }}
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-parchment" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-stone font-medieval">{title}</h3>
                  </div>

                  {/* Particles on focus */}
                  {isFocused && <Particles />}

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {skills.map((skill: any, skillIndex: number) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + skillIndex * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="flex items-center gap-2 p-3 bg-gold/10 rounded-lg border border-gold/20 cursor-default"
                      >
                        <span className="text-gold text-xs">✦</span>
                        <span className="text-sm text-stone font-semibold">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
