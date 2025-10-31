"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Shield, Heart, Zap, Brain, Eye, MessageCircle } from "lucide-react"

interface AboutData {
  backstory: string
  alignment: string
  race: string
  proficiencies: string[]
}

const attributes = [
  { icon: Shield, label: "Diligence" },
  { icon: Zap, label: "Adaptability" },
  { icon: Heart, label: "Collaboration" },
  { icon: Brain, label: "Problem Solving" },
  { icon: Eye, label: "Detailed Oriented" },
  { icon: MessageCircle, label: "Communication" },
]

export function AboutSection({ data }: { data: AboutData }) {
  return (
    <section id="about" className="py-20 bg-parchment relative overflow-hidden">
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-gold/30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-gold/30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-gold/30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-gold/30" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-stone font-medieval">Character Sheet</h2>
          <p className="text-center text-muted-foreground mb-12 font-medieval">
            {data.race} • {data.alignment}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Backstory */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-card-parchment border-2 border-gold/30 shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-gold font-medieval">Backstory</h3>
                <p className="text-stone-light leading-relaxed">{data.backstory}</p>
              </Card>

              {/* Proficiencies */}
              <Card className="p-6 bg-card-parchment border-2 border-gold/30 shadow-xl mt-6">
                <h3 className="text-2xl font-bold mb-4 text-gold font-medieval">Proficiencies</h3>
                <div className="flex flex-wrap gap-2">
                  {data.proficiencies.map((prof, index) => (
                    <motion.span
                      key={prof}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="px-3 py-1 bg-gold/20 text-stone rounded-full text-sm border border-gold/30"
                    >
                      {prof}
                    </motion.span>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-card-parchment border-2 border-gold/30 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-gold font-medieval">Core Attributes</h3>
                <div className="grid grid-cols-2 gap-4">
                  {attributes.map(({ icon: Icon, label }, index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      <div className="bg-gradient-to-br from-gold/10 to-amber-600/10 p-4 rounded-lg border-2 border-gold/30 text-center">
                        <Icon className="w-8 h-8 mx-auto mb-2 text-gold" />
                        <div className="text-sm text-stone font-medieval font-semibold">{label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
