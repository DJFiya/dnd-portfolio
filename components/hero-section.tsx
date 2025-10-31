"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { DiceRoll } from "./dice-roll"
import { Sparkles } from "lucide-react"

interface HeroData {
  name: string
  title: string
  tagline: string
  level: number
  class: string
}

export function HeroSection({ data }: { data: HeroData }) {
  const [showContent, setShowContent] = useState(false)
  const [sparkleParams, setSparkleParams] = useState<{
    x: number;
    y: number;
    targetY: number;
    duration: number;
    delay: number;
  }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1000)
    // Only run on client
    const count = 15;
    const params = Array.from({ length: count }, () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const targetY = Math.random() * window.innerHeight;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;
      return { x, y, targetY, duration, delay };
    });
    setSparkleParams(params);
    return () => clearTimeout(timer)
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-dungeon via-dungeon-light to-parchment"
    >
      <div className="absolute inset-0 overflow-hidden">
        {sparkleParams.map((param, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ x: param.x, y: param.y }}
            animate={{ y: [param.y, param.targetY], opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: param.duration, repeat: Number.POSITIVE_INFINITY, delay: param.delay }}
          >
            <Sparkles className="w-4 h-4 text-gold/40" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.8 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <DiceRoll />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gold mb-4 font-medieval">{data.name}</h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-xl md:text-2xl text-stone font-medieval">
                Level {data.level} {data.class}
              </span>
            </div>
            <p className="text-xl md:text-3xl text-stone-light mb-8 font-medieval">{data.title}</p>
            <p className="text-lg text-dungeon max-w-2xl mx-auto leading-relaxed">{data.tagline}</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-12"
          >
            <motion.button
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="px-8 py-4 bg-gold text-dungeon rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-shadow font-medieval"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Adventure
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="text-gold text-2xl">⬇</div>
      </motion.div>
    </section>
  )
}
