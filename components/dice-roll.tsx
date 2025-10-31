"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function DiceRoll() {
  const [rolling, setRolling] = useState(false)
  const [result, setResult] = useState(6)
  const [complete, setComplete] = useState(false)
  const [rotationX, setRotationX] = useState(0)
  const [rotationY, setRotationY] = useState(0)

  // Map each face number (1-6) to its position on the cube
  const cubeFaces = [
    { value: 1, transform: "rotateY(0deg) translateZ(48px)" },
    { value: 2, transform: "rotateY(180deg) translateZ(48px)" },
    { value: 3, transform: "rotateY(90deg) translateZ(48px)" },
    { value: 4, transform: "rotateY(-90deg) translateZ(48px)" },
    { value: 5, transform: "rotateX(90deg) translateZ(48px)" },
    { value: 6, transform: "rotateX(-90deg) translateZ(48px)" },
  ]

  // Map results 1-6 to show different faces
  const getRotationForNumber = (num: number) => {
    const rotations = [
      { x: 0, y: 0 },      // face 1 - front
      { x: 0, y: 180 },    // face 2 - back
      { x: 0, y: -90 },    // face 3 - right
      { x: 0, y: 90 },     // face 4 - left
      { x: -90, y: 0 },    // face 5 - top
      { x: 90, y: 0 },     // face 6 - bottom
    ]
    return rotations[num - 1]
  }

  const rollDice = () => {
    if (rolling) return

    setRolling(true)
    setComplete(false)
    let count = 0
    const interval = setInterval(() => {
      setResult(Math.floor(Math.random() * 6) + 1)
      count++
      if (count > 12) {
        clearInterval(interval)
        const finalResult = Math.floor(Math.random() * 6) + 1
        setResult(finalResult)
        const finalRot = getRotationForNumber(finalResult)
        // Set final rotation - Framer Motion will handle smooth deceleration
        setRotationX(finalRot.x + 1080)
        setRotationY(finalRot.y + 1080)
        setRolling(false)
        setTimeout(() => {
          setComplete(true)
        }, 1800)
        setTimeout(() => setComplete(false), 3500)
      }
    }, 80)
  }

  return (
    <motion.div
      className="inline-block cursor-pointer select-none"
      onClick={rollDice}
      whileHover={!rolling ? { scale: 1.08, y: -4 } : {}}
      whileTap={!rolling ? { scale: 0.92 } : {}}
    >
      <motion.div 
        className="relative"
        animate={
          complete
            ? {
                y: [0, -8, 0],
              }
            : {}
        }
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        <div style={{ perspective: "1200px", width: "112px", height: "112px" }}>
          {/* Glow effect during roll */}
          {rolling && (
            <motion.div
              className="absolute inset-0 rounded-2xl bg-amber-400/40 blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Success glow */}
          {complete && (
            <motion.div
              className="absolute inset-0 rounded-2xl bg-amber-400/60 blur-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1.5, 1.8],
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
            />
          )}

          <motion.div
            style={{
              width: "112px",
              height: "112px",
              position: "relative",
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateX: rolling ? [rotationX, rotationX + 360] : rotationX,
              rotateY: rolling ? [rotationY, rotationY + 360] : rotationY,
              scale: rolling ? [1, 1.05, 1.02, 1.05, 1] : complete ? [1, 1.1, 1.05] : 1,
            }}
            transition={{
              rotateX: { 
                duration: rolling ? 0.12 : 2.2, 
                ease: rolling ? "linear" : [0.16, 1, 0.3, 1],
                repeat: rolling ? Infinity : 0,
              },
              rotateY: { 
                duration: rolling ? 0.12 : 2.2, 
                ease: rolling ? "linear" : [0.16, 1, 0.3, 1],
                repeat: rolling ? Infinity : 0,
              },
              scale: { duration: rolling ? 1.4 : 0.5, ease: "easeOut" },
            }}
          >
            {/* All 6 cube faces */}
            {cubeFaces.map((face, i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  width: "112px",
                  height: "112px",
                  transform: face.transform.replace("48px", "56px"),
                  backfaceVisibility: "hidden",
                }}
                className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-xl shadow-2xl flex items-center justify-center border-2 border-amber-300/60"
                animate={
                  rolling
                    ? {
                        boxShadow: [
                          "0 10px 30px rgba(245, 158, 11, 0.3)",
                          "0 15px 40px rgba(245, 158, 11, 0.5)",
                          "0 10px 30px rgba(245, 158, 11, 0.3)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  repeat: rolling ? Infinity : 0,
                }}
              >
                {complete && face.value === result && (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-amber-300/50 rounded-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: [0, 1, 0.5, 0],
                        scale: [0.8, 1.1, 1.3, 1.5],
                      }}
                      transition={{
                        duration: 1,
                        ease: "easeOut",
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 border-4 border-amber-200 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                    />
                  </>
                )}
                <motion.span 
                  className="text-6xl font-bold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] relative z-10"
                  animate={
                    complete && face.value === result
                      ? {
                          scale: [1, 1.25, 1.15],
                        }
                      : {
                          scale: 1,
                        }
                  }
                  transition={{
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  {face.value}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dice shadow */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/20 rounded-full blur-md"
          animate={
            rolling
              ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }
              : complete
                ? {
                    scale: [1, 0.9, 1],
                    opacity: [0.2, 0.15, 0.2],
                  }
                : {
                    scale: 1,
                    opacity: 0.2,
                  }
          }
          transition={{
            duration: rolling ? 0.6 : 0.4,
            repeat: rolling ? Infinity : 0,
          }}
        />
      </motion.div>

      <motion.p
        className="text-sm text-gray-600 mt-6 text-center font-medium"
        animate={
          rolling
            ? { 
                opacity: [0.5, 0.7, 0.5],
              }
            : complete
              ? {
                  opacity: 1,
                  scale: [1, 1.08, 1],
                  y: [0, -2, 0],
                }
              : {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }
        }
        transition={{ 
          duration: rolling ? 0.8 : 0.4,
          repeat: rolling ? Infinity : 0,
        }}
      >
        {rolling ? "Rolling..." : complete ? `You rolled a ${result}!` : "Click to roll"}
      </motion.p>
    </motion.div>
  )
}
