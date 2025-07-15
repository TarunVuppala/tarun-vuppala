"use client"

import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Mail, Download, Code, Coffee, Lightbulb, Rocket } from "lucide-react"

export default function AboutPage() {
  const skillsByMastery = {
    expert: [
      {
        name: "React",
        category: "Frontend",
        years: "3+",
        icon: "⚛️",
        description: "Building complex UIs with hooks, context, and performance optimization",
      },
      {
        name: "JavaScript",
        category: "Language",
        years: "4+",
        icon: "🟨",
        description: "ES6+, async/await, closures, prototypes, and modern JS patterns",
      },
      {
        name: "TypeScript",
        category: "Language",
        years: "2+",
        icon: "🔷",
        description: "Advanced types, generics, utility types, and strict type safety",
      },
      {
        name: "HTML/CSS",
        category: "Frontend",
        years: "4+",
        icon: "🎨",
        description: "Semantic HTML, CSS Grid, Flexbox, animations, and responsive design",
      },
    ],
    advanced: [
      {
        name: "Next.js",
        category: "Framework",
        years: "2+",
        icon: "▲",
        description: "SSR, SSG, API routes, middleware, and App Router",
      },
      {
        name: "Node.js",
        category: "Backend",
        years: "2+",
        icon: "🟢",
        description: "Express, REST APIs, middleware, authentication, and server optimization",
      },
      {
        name: "Tailwind CSS",
        category: "Styling",
        years: "2+",
        icon: "💨",
        description: "Utility-first CSS, custom components, and design systems",
      },
      {
        name: "Git",
        category: "Tools",
        years: "3+",
        icon: "🌿",
        description: "Version control, branching strategies, and collaborative workflows",
      },
      {
        name: "MongoDB",
        category: "Database",
        years: "2+",
        icon: "🍃",
        description: "Document modeling, aggregation pipelines, and performance optimization",
      },
      {
        name: "PostgreSQL",
        category: "Database",
        years: "1+",
        icon: "🐘",
        description: "Relational design, complex queries, and database optimization",
      },
    ],
    proficient: [
      {
        name: "Python",
        category: "Language",
        years: "2+",
        icon: "🐍",
        description: "Django, Flask, data analysis, and automation scripts",
      },
      {
        name: "Docker",
        category: "DevOps",
        years: "1+",
        icon: "🐳",
        description: "Containerization, multi-stage builds, and deployment strategies",
      },
      {
        name: "AWS",
        category: "Cloud",
        years: "1+",
        icon: "☁️",
        description: "EC2, S3, Lambda, RDS, and cloud architecture patterns",
      },
      {
        name: "Redis",
        category: "Database",
        years: "1+",
        icon: "🔴",
        description: "Caching strategies, pub/sub messaging, and session management",
      },
    ],
    learning: [
      {
        name: "Kubernetes",
        category: "DevOps",
        years: "Learning",
        icon: "⚙️",
        description: "Container orchestration, deployments, and cluster management",
      },
      {
        name: "GraphQL",
        category: "API",
        years: "Learning",
        icon: "🔗",
        description: "Schema design, resolvers, and efficient data fetching",
      },
      {
        name: "Rust",
        category: "Language",
        years: "Learning",
        icon: "🦀",
        description: "Systems programming, memory safety, and performance optimization",
      },
      {
        name: "Machine Learning",
        category: "AI",
        years: "Learning",
        icon: "🤖",
        description: "TensorFlow, neural networks, and data science fundamentals",
      },
    ],
  }

  const masteryLevels = [
    { key: "expert", title: "Expert", description: "Deep expertise & production experience", color: "text-green-500" },
    { key: "advanced", title: "Advanced", description: "Strong proficiency & regular use", color: "text-blue-500" },
    {
      key: "proficient",
      title: "Proficient",
      description: "Solid understanding & practical use",
      color: "text-yellow-500",
    },
    {
      key: "learning",
      title: "Learning",
      description: "Currently exploring & building projects",
      color: "text-purple-500",
    },
  ]

  const journey = [
    {
      year: "2024",
      title: "Full Stack Developer & Freelancer",
      company: "Independent",
      description:
        "Building scalable web applications and helping startups bring their ideas to life. Specializing in React ecosystem and modern web technologies.",
      achievements: [
        "Delivered 15+ projects for various clients",
        "Built real-time applications with WebSocket integration",
        "Implemented AI-powered features using OpenAI API",
        "Achieved 98% client satisfaction rate",
      ],
    },
    {
      year: "2023",
      title: "Frontend Developer Intern",
      company: "TechCorp Solutions",
      description:
        "Focused on React development and user experience optimization. Collaborated with design teams to create pixel-perfect interfaces.",
      achievements: [
        "Improved application performance by 40%",
        "Implemented responsive design for mobile users",
        "Contributed to component library used across teams",
        "Mentored 2 junior developers",
      ],
    },
    {
      year: "2022",
      title: "Computer Science Student",
      company: "University",
      description:
        "Started my journey in web development while pursuing Computer Science. Built foundational knowledge in algorithms, data structures, and software engineering.",
      achievements: [
        "Completed 50+ coding challenges",
        "Built first full-stack application",
        "Participated in 3 hackathons",
        "Maintained 3.8 GPA while coding",
      ],
    },
  ]

  const highlights = [
    {
      icon: Code,
      title: "Clean Architecture",
      description:
        "I obsess over writing maintainable, scalable code that stands the test of time. Every line serves a purpose.",
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "Every challenge is a puzzle waiting to be solved with the right approach and creative thinking.",
    },
    {
      icon: Coffee,
      title: "Late Night Coder",
      description: "My best ideas come during those quiet hours when the world sleeps and code flows freely.",
    },
    {
      icon: Rocket,
      title: "Startup Minded",
      description: "Building towards launching something that makes a real impact in people's lives.",
    },
  ]

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-16 sm:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12 sm:mb-16"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "200px" }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-px bg-linear-to-r from-transparent via-primary to-transparent mx-auto mb-8"
                />
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">About Me</h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  A passionate developer crafting digital experiences that matter
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6">My Story</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      I'm Tarun, a Computer Science student with an insatiable curiosity for web development. What
                      started as late-night coding sessions has evolved into a passion for building systems that solve
                      real problems and scale beautifully.
                    </p>
                    <p>
                      I believe in writing code that's not just functional, but elegant and maintainable. Every project
                      is an opportunity to learn something new and push the boundaries of what's possible on the web.
                    </p>
                    <p>
                      My goal is to launch a startup that makes a meaningful impact, one line of code at a time. I'm
                      driven by the challenge of turning complex problems into simple, intuitive solutions.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-6"
                >
                  <Card className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-medium">Location</span>
                      </div>
                      <p className="text-muted-foreground">Hyderabad, India</p>
                      <p className="text-sm text-muted-foreground mt-1">Available for remote work globally</p>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Mail className="w-5 h-5 text-primary" />
                        <span className="font-medium">Contact</span>
                      </div>
                      <p className="text-muted-foreground">tarun.vuppala26@gmail.com</p>
                      <p className="text-sm text-muted-foreground mt-1">Usually respond within 24 hours</p>
                    </CardContent>
                  </Card>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full" size="lg">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-16"
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">What Drives Me</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {highlights.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="border-border/50 hover:border-border transition-all duration-300 h-full">
                        <CardContent className="p-6">
                          <item.icon className="w-8 h-8 text-primary mb-4" />
                          <h3 className="font-semibold mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="py-16 sm:py-20 bg-muted/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12 sm:mb-16"
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Skills & Expertise</h2>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  My technical toolkit organized by mastery level and real-world experience
                </p>
              </motion.div>

              <div className="space-y-12">
                {masteryLevels.map((level, levelIndex) => {
                  const skills = skillsByMastery[level.key as keyof typeof skillsByMastery]

                  return (
                    <motion.div
                      key={level.key}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: levelIndex * 0.2 }}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <span className={`w-3 h-3 rounded-full ${level.color.replace("text-", "bg-")}`} />
                        <h3 className={`text-2xl font-bold ${level.color}`}>{level.title}</h3>
                        <span className="text-muted-foreground">({skills.length} technologies)</span>
                      </div>
                      <p className="text-muted-foreground mb-6">{level.description}</p>

                      <div className="grid md:grid-cols-2 gap-4">
                        {skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <Card className="border-border/50 hover:border-border transition-all duration-300">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                  <div className="text-2xl">{skill.icon}</div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-medium">{skill.name}</h4>
                                      <Badge variant="secondary" className="text-xs">
                                        {skill.category}
                                      </Badge>
                                      <span className="text-xs text-muted-foreground ml-auto">{skill.years}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Journey Section */}
          <section className="py-16 sm:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12 sm:mb-16"
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">My Journey</h2>
                <p className="text-lg sm:text-xl text-muted-foreground">The path that led me to where I am today</p>
              </motion.div>

              <div className="space-y-8">
                {journey.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Card className="border-border/50 hover:border-border transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <Calendar className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">{item.company}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="sm:ml-auto">
                            {item.year}
                          </Badge>
                        </div>

                        <p className="text-muted-foreground mb-4">{item.description}</p>

                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Key Achievements:</h4>
                          <ul className="space-y-1">
                            {item.achievements.map((achievement, achievementIndex) => (
                              <li key={achievementIndex} className="text-sm text-muted-foreground flex items-start">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-2 shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}
