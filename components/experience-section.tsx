"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Scroll, MapPin, Calendar, Trophy } from "lucide-react"

interface Experience {
  id: number
  title: string
  company: string
  location: string
  period: string
  questType: string
  description: string
  achievements: string[]
  xpGained: number
}

const questColors = {
  Epic: "from-dungeon via-purple-900 to-gold/60",
  Major: "from-dungeon-light via-blue-900 to-gold/40",
  "Side Quest": "from-parchment via-emerald-900 to-dungeon/60",
}

export function ExperienceSection({ data }: { data: Experience[] }) {
  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-b from-parchment to-dungeon-light relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Scroll className="w-16 h-16 mx-auto mb-4 text-gold" />
          <h2 className="text-4xl md:text-5xl font-bold text-stone font-medieval">Quest Log</h2>
          <p className="text-muted-foreground mt-2 font-medieval">Completed Adventures & Achievements</p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {data.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 bg-card-parchment border-2 border-gold/30 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <motion.div
                    className={`flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br ${
                      questColors[quest.questType as keyof typeof questColors]
                    } flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Trophy className="w-10 h-10 text-white" />
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-2xl font-bold text-stone font-medieval">{quest.title}</h3>
                        <p className="text-gold font-semibold">{quest.company}</p>
                      </div>
                      {/* Removed questType badge for cleaner look */}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {quest.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {quest.period}
                      </span>
                    </div>

                    <p className="text-stone-light mb-4 leading-relaxed">{quest.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gold font-semibold">
                        <Trophy className="w-4 h-4" />
                        <span className="font-medieval">Achievements</span>
                      </div>
                      <ul className="space-y-1">
                        {quest.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="flex items-start gap-2 text-stone-light"
                          >
                            <span className="text-gold mt-1">⚔️</span>
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
