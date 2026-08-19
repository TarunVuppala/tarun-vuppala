import {
  Code,
  Database,
  Terminal,
  Zap,
} from "lucide-react";

import type { Project } from "@/types/project";

// Centralized site data (moved here so all display data is in one place)
export const canonicalSiteUrl = "https://www.tarunvuppala.me"

export const resumeFilePath = "/Tarun-Vuppala-Resume.pdf"

export const socialProfiles = {
  github: "https://github.com/tarunvuppala",
  linkedin: "https://linkedin.com/in/tarun26",
  twitter: "https://x.com/tarunvuppala",
  email: "mailto:tarun.vuppala26@gmail.com",
} as const

export const siteConfig = {
  name: "Tarun Vuppala",
  title: "Tarun Vuppala - Software Engineer",
  description: "Software engineer interested in backend systems, real-time software, and applied AI.",
  keywords: [
    "Tarun Vuppala",
    "Tarun Vuppala Portfolio",
    "Tarun Vuppala Resume",
    "Tarun Vuppala Software Engineer",
    "Tarun Vuppala React",
    "V Tarun",
    "Tarun",
    "tarun",
    "tarun vuppala",
    "Software Engineer",
    "React",
    "Next.js",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "Frontend",
    "Backend",
  ],
  creator: "Tarun Vuppala",
  jobTitle: "Software Engineer",
  email: "tarun.vuppala26@gmail.com",
  sameAs: [canonicalSiteUrl, socialProfiles.github, socialProfiles.linkedin, socialProfiles.twitter],
  images: {
    openGraph: "/main.png",
  },
  location: {
    placename: process.env.NEXT_PUBLIC_GEO_PLACENAME || "Hyderabad",
    country: process.env.NEXT_PUBLIC_GEO_COUNTRY || "IN",
    region: process.env.NEXT_PUBLIC_GEO_REGION,
  },
}

const normalizeTechName = (value: string) => value.toLowerCase().trim();

export const techIconMap: Record<string, string> = {
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "react.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "react native":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  typescript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  javascript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  html5: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "tailwind css": "https://cdn.simpleicons.org/tailwindcss/ffffff",
  tailwind: "https://cdn.simpleicons.org/tailwindcss/ffffff",
  "framer motion": "https://cdn.simpleicons.org/framer/ffffff",
  motion: "https://cdn.simpleicons.org/framer/ffffff",
  gsap: "https://cdn.simpleicons.org/greensock/ffffff",
  "node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "express.js": "https://cdn.simpleicons.org/express/ffffff",
  fastapi: "https://cdn.simpleicons.org/fastapi/ffffff",
  flask: "https://cdn.simpleicons.org/flask/ffffff",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "spring boot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
  c: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  "c++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "amazon web services":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "nest.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
  graphql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  mongodb:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  postgresql:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  prisma: "https://cdn.simpleicons.org/prisma/ffffff",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  github: "https://cdn.simpleicons.org/github/ffffff",
  "vs code":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "socket.io": "https://cdn.simpleicons.org/socketdotio/ffffff",
  sockio: "https://cdn.simpleicons.org/socketdotio/ffffff",
  jwt: "https://cdn.simpleicons.org/jsonwebtokens/ffffff",
  razorpay: "https://cdn.simpleicons.org/razorpay/ffffff",
  "shadcn ui": "https://cdn.simpleicons.org/shadcnui/ffffff",
  shadcn: "https://cdn.simpleicons.org/shadcnui/ffffff",
  "three.js": "https://cdn.simpleicons.org/threedotjs/ffffff",
  "three js": "https://cdn.simpleicons.org/threedotjs/ffffff",
  electron: "https://cdn.simpleicons.org/electron/ffffff",
  openai: "/icons/openai.svg",
  "hugging face": "https://cdn.simpleicons.org/huggingface/ffffff",
  blender:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
  ffmpeg: "https://cdn.simpleicons.org/ffmpeg/ffffff",
  ffmped: "https://cdn.simpleicons.org/ffmpeg/ffffff",
  nodemailer: "/icons/nodemailer.svg",
  indexeddb: "/icons/indexeddb.svg",
  "indexed db": "/icons/indexeddb.svg",
  "transaction management": "/icons/transaction-management.svg",
  "adobe cep": "/icons/adobe-cep.svg",
  "ppro api": "/icons/ppro-api.svg",
  uxp: "/icons/uxp.svg",
  "qr parser": "/icons/qr-parser.svg",
  ollama: "/icons/ollama.svg",
  "llama 3.2": "/icons/llama.svg",
  "llama.cpp": "/icons/llama.svg",
  "pdf-parser": "/icons/pdf-parser.svg",
  "rest apis": "/icons/rest-apis.svg",
  authentication: "/icons/authentication.svg",
  observability: "/icons/observability.svg",
  "machine learning": "/icons/machine-learning.svg",
  rag: "/icons/rag.svg",
  mlflow: "https://cdn.simpleicons.org/mlflow/ffffff",
  redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  pytorch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  tensorflow: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  "scikit-learn":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
  langchain: "/icons/langchain.svg",
};

export const getTechIcon = (tech: string) =>
  techIconMap[normalizeTechName(tech)] || "/placeholder.svg";

const projectCatalog: Project[] = [
  {
    id: "acethletics",
    title: "Acethletics",
    subtitle: "College Sports Platform",
    description:
      "An internship project for ACE Engineering College sports: tournaments, live scores, and real-time updates.",
    problem:
      "The project focused on giving college sports a more visible and organized online presence, closer to how sports are presented at large universities.",
    solution:
      "As part of my internship at Front Interactive Services, I worked mainly on the backend, including APIs, database operations, and real-time updates.",
    impact: "Used across 10+ live events, with 1,500 peak concurrent users.",
    tech: [
      "Next.js",
      "Node.js",
      "Socket.io",
      "MongoDB",
      "Tailwind",
      "Transaction Management",
    ],
    image: "/placeholder.svg",
    liveUrl: "https://acethletics.vercel.app",
    githubUrl: "https://github.com/TarunVuppala/acethletics-server",
    date: "Aug – Dec 2024",
    featured: true,
    metrics: [
      { value: "1.5K", label: "peak users" },
      { value: "100ms", label: "API average" },
      { value: "20ms", label: "live updates" },
    ],
    details: {
      results: [
        "Supported 1,500 peak concurrent users across 10+ live events",
        "Maintained 100ms average API response latency during tournaments",
        "Delivered real-time score updates with 20ms propagation latency",
      ],
      learnings: "This gave me practical experience with real-time communication and handling a large number of connected users.",
    },
    categories: ["Website", "Mobile"],
  },
  {
    id: "quickfuel",
    title: "QuickFuel",
    subtitle: "Fuel Delivery & Vehicle Services",
    description:
      "An experiment with agent-based fuel delivery and services for common vehicle-owner problems.",
    problem:
      "Running out of fuel, detouring to a station, waiting in line, or arranging help when a vehicle has a problem can turn a small issue into a long one.",
    solution:
      "I explored a mix of finding nearby fuel, requesting delivery by agents, and booking vehicle services, with location details, scheduling, and real-time order updates.",
    impact: "An early experiment in the logistics and operations behind fuel delivery and vehicle services.",
    tech: [
      "React.js",
      "Node.js",
      "Socket.io",
      "MongoDB",
      "Express.js",
      "JWT",
      "Tailwind",
    ],
    image: "/placeholder.svg",
    liveUrl: "https://quick-fuel.vercel.app",
    githubUrl: "https://github.com/TarunVuppala/quick-fuel",
    date: "2024",
    featured: false,
    details: {
      results: [
        "Explored fuel delivery by agents rather than delivery tied to petrol stations",
        "Worked with location, scheduling, and changing order status",
        "Thought through service flows for common vehicle-owner problems",
      ],
      learnings:
        "This project made me think about the operational side of a service: who fulfils a request, how the timing works, and what happens when a vehicle owner needs help quickly.",
    },
    categories: ["Website", "SaaS"],
  },
  {
    id: "tedxaceec",
    title: "TEDxACEEC",
    subtitle: "Event Website & Ticketing",
    description:
      "A website for our college TEDx event, covering event details, collaborators, and ticket purchases.",
    problem: "The event needed a public place to share its story, details, people, and ticket information.",
    solution: "I worked on the event website, event and team pages, collaborator presentation, and ticket purchase flow.",
    impact: "Used to present and sell tickets for one college TEDx event.",
    tech: ["Next.js", "MongoDB", "Tailwind", "Framer Motion", "Razorpay"],
    image: "/placeholder.svg",
    liveUrl: "https://tedx.aceec.ac.in",
    githubUrl: "https://github.com/tedxaceec/tedxaceec",
    date: "2026",
    featured: true,
    metrics: [
      { value: "90+", label: "tickets processed" },
      { value: "7+", label: "collaborators shown" },
      { value: "1", label: "event website" },
    ],
    details: {
      results: [
        "Worked on the event website and ticketing flow",
        "Presented event details, teams, and collaborators",
        "Processed 90+ ticket purchases",
      ],
      learnings: "Working on the site made me think about how much of an event experience comes from clear information and a straightforward ticket purchase flow.",
    },
    categories: ["Website"],
  },
  {
    id: "trimlyai",
    title: "Trimly.ai",
    subtitle: "Making long documents easier to read",
    description:
      "An AI reading experiment that removes filler and repetition from books, technical documents, and papers.",
    problem: "Long documents often contain filler and repetition; removing those without losing the parts that matter is harder than simply making a summary shorter.",
    solution: "I worked on PDF parsing, structure-aware processing, and retrieved document context to guide what should stay.",
    impact: "An experiment in making long documents easier to work through without flattening them.",
    tech: [
      "Next.js",
      "Node.js",
      "pdf-parser",
      "LLaMA 3.2",
      "Ollama",
      "ShadCN UI",
    ],
    image: "/placeholder.svg",
    liveUrl: null,
    githubUrl: "https://github.com/tarunvuppala/trimlyai",
    date: "2025",
    featured: true,
    details: {
      results: [
        "Worked with fiction, non-fiction, technical documents, and papers",
        "Experimented with removing filler and repeated points while keeping section structure",
        "Used retrieved document context to guide what should stay",
      ],
      learnings: "The project made me think more carefully about the difference between making something shorter and making it more useful.",
    },
    categories: ["AI", "SaaS", "Personalization"],
  },
  {
    id: "atlas-ai",
    title: "Atlas AI",
    subtitle: "Exploring on-device AI",
    description:
      "An offline AI assistant for mobile devices, built for limited connectivity and sensitive data.",
    problem:
      "Cloud AI is not always practical when network coverage is limited or an organization needs to keep its data private.",
    solution:
      "I worked with React Native, llama.cpp, RAG, GGUF quantization, and persistent context while tuning for mobile memory and compute limits.",
    impact:
      "Kept time to first token between 1.5 and 8 seconds on the devices I tuned.",
    tech: [
      "React Native",
      "Python",
      "llama.cpp",
      "RAG",
    ],
    image: "/placeholder.svg",
    liveUrl: null,
    githubUrl: "https://github.com/madhavmadupu/atlas-ai",
    date: "Feb – Apr 2026",
    featured: true,
    metrics: [
      { value: "1.5–8s", label: "first token" },
      { value: "On-device", label: "inference" },
      { value: "RAG", label: "retrieval" },
    ],
    details: {
      results: [
        "Ran an AI assistant locally on a mobile device without depending on a cloud service",
        "Used RAG, GGUF quantization, and persistent context to shape the experience",
        "Kept time to first token between 1.5 and 8 seconds across tuned devices",
      ],
      learnings:
        "This project gave me a better understanding of the trade-offs involved in running AI models locally, particularly around model size, memory usage, and response time.",
    },
    categories: ["AI", "Productivity", "Mobile"],
  },
  {
    id: "autopodcast",
    title: "AutoPodcast",
    subtitle: "Premiere Pro editing plugin",
    description:
      "An internship project at Unity Internet for automating parts of podcast editing.",
    problem: "The project focused on reducing repetitive work in a podcast editing workflow.",
    solution: "I worked with audio analysis, silence detection, overlap handling, FFmpeg, and Premiere Pro APIs to generate edits.",
    impact: "Took a podcast editing workflow from around three hours to under eight minutes.",
    tech: ["FFmpeg", "Adobe CEP", "PPRO API", "UXP"],
    image: "/placeholder.svg",
    liveUrl: null,
    githubUrl: "https://github.com/TarunVuppala/AutoPodcast",
    date: "Mar – Jun 2025",
    featured: true,
    metrics: [
      { value: "<8 min", label: "per edit" },
      { value: "10+", label: "editors" },
    ],
    details: {
      results: [
        "Reduced a podcast editing workflow from around three hours to under eight minutes",
        "Worked with audio analysis, silence detection, overlap handling, and automated camera switching",
        "Packaged the tool for cross-platform use by 10+ editors",
      ],
      learnings: "Automation only helps when it fits the way people already work, including the awkward parts of the workflow.",
    },
    categories: ["Automation", "Productivity", "Audio Processing", "Plugin"],
  },
  {
    id: "jobtrackerportal",
    title: "JobTrackerPortal",
    subtitle: "Job Application Tracker",
    description:
      "A job application tracker for scraping links, fit, analytics, reminders, and preparation tasks.",
    problem: "Job applications involve more than saving a link: status, follow-ups, preparation, and role-specific tasks can all end up scattered.",
    solution:
      "I built a React frontend with an Express.js and MongoDB backend to scrape job links, track progress, show analytics and job fit, and manage reminders.",
    impact: "An experiment in keeping the parts of a job search workflow in one place.",
    tech: ["React", "TypeScript", "Express.js", "MongoDB", "IndexedDB"],
    image: "/placeholder.svg",
    liveUrl: null,
    githubUrl: "https://github.com/TarunVuppala/job-tracker-portal",
    date: "2024",
    featured: false,
    details: {
      results: [
        "Scraped job details from application links",
        "Tracked status, reminders, and tasks related to a role",
        "Explored analytics and job-fit information alongside applications",
      ],
      learnings:
        "Working on this made me think about how many small decisions and follow-ups sit around a job application beyond the application itself.",
    },
    categories: ["Website", "Productivity","SaaS"],
  },
];

const PROJECT_ORDER = ["atlas-ai", "autopodcast", "acethletics", "tedxaceec", "trimlyai"];

export const allProjects: Project[] = [
  ...PROJECT_ORDER.map((id) => projectCatalog.find((project) => project.id === id)!),
  ...projectCatalog.filter((project) => !PROJECT_ORDER.includes(project.id)),
];

export const codingStats = [
  {
    text: "I am early in my career, with experience from internships, engineering teams, and projects of my own.",
  },
  {
    text: "I learn by breaking problems down, thinking through trade-offs, and building something concrete.",
  },
  {
    text: "I have learned a lot by taking projects from a first idea to something I could actually use.",
  },
  {
    text: "I have spent time on data sync, model behavior, audio workflows, and the rough edges between them.",
  },
  {
    text: "I care about clear handoffs and understanding what happens when the happy path ends.",
  },
  {
    text: "I am still building my sense for system design, distributed systems, and production work.",
  },
  {
    text: "Most of what I know came from trying to build something and finding out where I was wrong.",
  },
  {
    text: "I try to leave projects easier to understand than I found them.",
  },
];

export const journeyExpanded = [
  {
    year: "Mar – Jun 2025",
    title: "Software Developer Intern",
    company: "Unity Internet",
    achievements: [
      "Worked on audio analysis, overlap handling, and cross-platform delivery",
    ],
  },
  {
    year: "Jun 2024 – Feb 2025",
    title: "Software Developer Intern",
    company: "Front Interactive Services",
    achievements: [
      "Worked in a six-engineer Scrum team and used TDD; post-release defects dropped by 30%",
    ],
  },
];

export const skillsByDomain = [
  {
    title: "Backend",
    icon: Code,
    skills: [
      {
        name: "Node.js",
        logo: getTechIcon("Node.js"),
      },
      {
        name: "Express.js",
        logo: getTechIcon("Express.js"),
      },
      {
        name: "REST APIs",
        logo: getTechIcon("REST APIs"),
      },
      {
        name: "WebSockets",
        logo: getTechIcon("Socket.io"),
      },
      {
        name: "Java",
        logo: getTechIcon("Java"),
      },
      {
        name: "Python",
        logo: getTechIcon("Python"),
      },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    skills: [
      {
        name: "MongoDB",
        logo: getTechIcon("MongoDB"),
      },
      {
        name: "PostgreSQL",
        logo: getTechIcon("PostgreSQL"),
      },
      {
        name: "MySQL",
        logo: getTechIcon("MySQL"),
      },
      {
        name: "Redis",
        logo: getTechIcon("Redis"),
      },
    ],
  },
  {
    title: "Frontend",
    icon: Code,
    skills: [
      {
        name: "React",
        logo: getTechIcon("React"),
      },
      {
        name: "Next.js",
        logo: getTechIcon("Next.js"),
      },
      {
        name: "TypeScript",
        logo: getTechIcon("TypeScript"),
      },
      {
        name: "JavaScript",
        logo: getTechIcon("JavaScript"),
      },
    ],
  },
  {
    title: "AI",
    icon: Zap,
    skills: [
      {
        name: "LLMs",
        logo: "/icons/openai.svg",
      },
      {
        name: "RAG",
        logo: getTechIcon("RAG"),
      },
      {
        name: "llama.cpp",
        logo: getTechIcon("llama.cpp"),
      },
      {
        name: "Ollama",
        logo: getTechIcon("Ollama"),
      },
      {
        name: "PyTorch",
        logo: getTechIcon("PyTorch"),
      },
    ],
  },
  {
    title: "Tools",
    icon: Terminal,
    skills: [
      {
        name: "Git",
        logo: getTechIcon("Git"),
      },
      {
        name: "GitHub",
        logo: getTechIcon("GitHub"),
      },
      {
        name: "Docker",
        logo: getTechIcon("Docker"),
      },
      {
        name: "AWS",
        logo: getTechIcon("AWS"),
      },
    ],
  },
];

export const contactInfo = [
  {
    title: "Email",
    value: "tarun.vuppala26@gmail.com",
    href: "mailto:tarun.vuppala26@gmail.com",
  },
  {
    title: "Book a Call",
    value: "Schedule a 1:1",
    href: "https://calendly.com/tarun-vuppala26/intro-call",
  },
  {
    title: "Location",
    value: "Hyderabad, India",
    href: null,
  },
  {
    title: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
];
