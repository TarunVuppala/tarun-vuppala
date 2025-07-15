"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: "https://github.com/tarunvuppala", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/tarunvuppala", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/tarunvuppala", label: "Twitter" },
    { icon: Mail, href: "mailto:tarun.vuppala26@gmail.com", label: "Email" },
  ]

  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-muted/30 border-t border-border relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <h3 className="text-2xl font-bold mb-4">Tarun Vuppala</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              Full Stack Developer crafting digital experiences that solve real problems and scale beautifully. Always
              excited to work on meaningful projects that make a difference.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-card hover:bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 border border-border/50 hover:border-border"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-6 text-lg">Get In Touch</h4>
            <div className="space-y-3 text-muted-foreground">
              <p className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:tarun.vuppala26@gmail.com" className="hover:text-foreground transition-colors">
                  tarun.vuppala26@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>📍</span>
                Hyderabad, India
              </p>
              <p className="flex items-center gap-2">
                <span>🕒</span>
                Available for opportunities
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-muted-foreground text-sm">© {currentYear} Tarun Vuppala. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500" /> using Next.js & Tailwind CSS
            </p>

            <Button variant="ghost" size="sm" onClick={scrollToTop} className="w-8 h-8 p-0 rounded-full hover:bg-muted">
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
