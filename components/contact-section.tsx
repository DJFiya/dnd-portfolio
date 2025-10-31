"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Twitter, Mail, Send } from "lucide-react"
import { useState } from "react"

interface ContactData {
  email: string
  github: string
  linkedin: string
  message: string
}

export function ContactSection({ data }: { data: ContactData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [sending, setSending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Construct mailto link
    const subject = encodeURIComponent(`[Portfolio] Message from ${formData.name}`)
    const body = encodeURIComponent(`${formData.message}\n\nRegards, \n\n${formData.name}\n${formData.email}\n\n`)
    const mailto = `mailto:${data.email}?subject=${subject}&body=${body}`
    window.location.href = mailto
  }

  const socialLinks = [
    { icon: Github, href: data.github, label: "GitHub" },
    { icon: Linkedin, href: data.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${data.email}`, label: "Email" },
  ]

  return (
    <section id="contact" className="py-20 bg-dungeon relative overflow-hidden">
      {/* Animated raven */}
      <motion.div
        className="absolute top-20 text-4xl"
        animate={{
          x: ["-10%", "110%"],
          y: [0, -50, 0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        🦅
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="text-6xl mb-4 inline-block"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            📜
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gold font-medieval">Send a Message</h2>
          <p className="text-stone-light mt-2 font-medieval max-w-2xl mx-auto">{data.message}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-card-parchment border-2 border-gold/30 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-stone font-semibold mb-2 font-medieval">Your Name</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                    className="bg-parchment border-gold/30"
                  />
                </div>

                <div>
                  <label className="block text-stone font-semibold mb-2 font-medieval">Your Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="bg-parchment border-gold/30"
                  />
                </div>

                <div>
                  <label className="block text-stone font-semibold mb-2 font-medieval">Your Quest</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your quest or message..."
                    required
                    rows={5}
                    className="bg-parchment border-gold/30"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-gold text-dungeon hover:bg-gold/90 font-bold font-medieval"
                >
                  {sending ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="inline-block"
                    >
                      🦅
                    </motion.span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Raven
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Social Links & Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-card-parchment border-2 border-gold/30 shadow-xl">
              <h3 className="text-2xl font-bold text-gold mb-4 font-medieval">Connect on Other Realms</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gold/10 rounded-lg border border-gold/30 hover:bg-gold/20 transition-colors"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <Icon className="w-5 h-5 text-gold" />
                      <span className="text-stone font-semibold text-sm">{link.label}</span>
                    </motion.a>
                  )
                })}
              </div>
            </Card>

            <Card className="p-6 bg-card-parchment border-2 border-gold/30 shadow-xl">
              <h3 className="text-2xl font-bold text-gold mb-4 font-medieval">Quest Response Time</h3>
              <p className="text-stone-light leading-relaxed">
                I typically respond to messages within 1-2 business days. For urgent quests, please mark your message as
                [URGENT] and I'll prioritize it accordingly.
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 text-stone-light"
        >
          <p className="font-medieval">
            © {new Date().getFullYear()} • Crafted By Daevik
          </p>
        </motion.div>
      </div>
    </section>
  )
}
