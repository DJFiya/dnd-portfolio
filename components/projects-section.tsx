"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  name: string
  rarity: string
  type: string
  description: string
  technologies: string[]
  image: string
  github: string
  external: string
  lootValue: number
}

const rarityColors = {
  Legendary: "from-amber-600 via-yellow-700 to-orange-800",
  Epic: "from-indigo-600 via-purple-700 to-violet-800",
  Rare: "from-blue-600 via-cyan-700 to-teal-800",
  Uncommon: "from-emerald-600 via-green-700 to-lime-800",
}

const rarityGlow = {
  Legendary: "shadow-amber-700/50",
  Epic: "shadow-indigo-700/50",
  Rare: "shadow-blue-700/50",
  Uncommon: "shadow-emerald-700/50",
}

export function ProjectsSection({ data }: { data: Project[] }) {
  const [openChest, setOpenChest] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-20 bg-dungeon relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="text-6xl mb-4 cursor-pointer inline-block"
            onClick={() => setOpenChest(!openChest)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={
              openChest
                ? { rotateX: -40, rotate: 0, filter: [
                    "drop-shadow(0 0 0px #bfefff)",
                    "drop-shadow(0 0 6px #bfefff)",
                    "drop-shadow(0 0 12px #e0f7fa)",
                    "drop-shadow(0 0 6px #fff)",
                    "drop-shadow(0 0 0px #fff)"
                  ] }
                : {
                    rotate: [0, -25, 25, -25, 25, 0],
                    filter: "none"
                  }
            }
            transition={
              openChest
                ? { duration: 0.3, filter: { duration: 1.2, repeat: Infinity, ease: "easeInOut" } }
                : {
                    rotate: {
                      duration: 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    },
                  }
            }
          >
            {openChest ? "💎" : "🗝️"}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gold font-medieval">Treasure Vault</h2>
          <p className="text-stone-light mt-2 font-medieval">Legendary Artifacts & Creations</p>
        </motion.div>

        <AnimatePresence>
          {openChest && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto"
            >
              {data.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50, rotateY: -90 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                  whileHover={{ y: -10 }}
                >
                  <Card
                    className={`overflow-hidden bg-card-parchment border-2 cursor-pointer transition-all hover:shadow-2xl ${
                      rarityGlow[project.rarity as keyof typeof rarityGlow]
                    }`}
                    style={{
                      borderImage: `linear-gradient(135deg, ${
                        rarityColors[project.rarity as keyof typeof rarityColors]
                      }) 1`,
                    }}
                    onClick={() => setSelectedProject(project)}
                  >
                    
                      {/*
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.name}
                          fill
                          className="object-cover transition-transform hover:scale-110"
                        />
                      </div>
                      */}
                    

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-stone mb-2 font-medieval">{project.name}</h3>
                      <p className="text-sm text-gold mb-3">{project.type}</p>
                      <p className="text-stone-light mb-4 leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gold/20 text-stone text-xs rounded border border-gold/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2 justify-end">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gold/20 rounded-lg hover:bg-gold/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github className="w-4 h-4 text-gold" />
                        </motion.a>
                        {project.external && (
                          <motion.a
                            href={project.external}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gold/20 rounded-lg hover:bg-gold/30 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink className="w-4 h-4 text-gold" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!openChest && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-stone-light mt-8 font-medieval"
          >
            Use the key to reveal the treasures within...
          </motion.p>
        )}
      </div>
    </section>
  )
}
