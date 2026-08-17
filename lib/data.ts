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
  title: "Tarun Vuppala - Backend & AI Engineer",
  description: "Backend and AI engineer building resilient systems, local AI applications, and modern web products.",
  keywords: [
    "Tarun Vuppala",
    "Tarun Vuppala Portfolio",
    "Tarun Vuppala Resume",
    "Tarun Vuppala Backend Engineer",
    "Tarun Vuppala AI Engineer",
    "Tarun Vuppala React",
    "V Tarun",
    "Tarun",
    "tarun",
    "tarun vuppala",
    "Backend Engineer",
    "AI Engineer",
    "React",
    "Next.js",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "Frontend",
    "Backend",
  ],
  creator: "Tarun Vuppala",
  jobTitle: "Backend & AI Engineer",
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
    subtitle: "All-in-One College Sports Management",
    description:
      "A centralized athletic sports platform for scheduling, coordination, and live tournament updates.",
    problem:
      "College sports events lacked centralized sports collaboration and online presence.",
    solution:
      "Built a platform for event scheduling, participant management, and real-time score updates.",
    impact: "Supported 10+ live events with 1,500 peak concurrent users and 2,000+ downloads.",
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
        "Handled 1,500 peak concurrent users across 10+ live events",
        "Maintained 100ms average API response latency during tournaments",
        "Delivered 200+ real-time events per match at 20ms propagation latency",
        "Recorded zero downtime and zero production data inconsistencies",
      ],
      learnings: "Optimized real-time data flows under production stress.",
    },
    categories: ["Website", "Mobile"],
  },
  {
    id: "quickfuel",
    title: "QuickFuel",
    subtitle: "Innovative On-Demand Fuel and Vehicle Service Platform",
    description:
      "A web-app that enables on-demand fuel delivery and vehicle repair services, complete with live order tracking.",
    problem:
      "Users often faced long queues or dry pumps without real-time status or home delivery options.",
    solution:
      "Built a on-demand service platform with GPS-based station finder, delivery scheduling, and repair requests.",
    impact: "Saved users 30+ mins/day and removed the need for station visits.",
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
    metrics: [
      { value: "30+ min", label: "saved daily" },
      { value: "Live", label: "order tracking" },
      { value: "95%", label: "prediction accuracy" },
    ],
    details: {
      results: [
        "Platform for on-demand fuel delivery and vehicle repairs",
        "Real-time order tracking with live updates",
        "95% accuracy in fuel status predictions",
      ],
      learnings:
        "Balanced logistics routing with real-time data to ensure timely service.",
    },
    categories: ["Website", "SaaS"],
  },
  {
    id: "tedxaceec",
    title: "TEDxACEEC",
    subtitle: "Event Website & Collaborator Portal",
    description:
      "A custom portal to manage collaborators, ticketing, and analytics for a TEDx event in college.",
    problem: "Event outreach and ticketing lacked centralization.",
    solution: "Built a modular dashboard for marketing and ticketing.",
    impact: "Streamlined operations for 5+ teams and many attendees.",
    tech: ["Next.js", "MongoDB", "Tailwind", "Framer Motion", "Razorpay"],
    image: "/placeholder.svg",
    liveUrl: "https://tedx.aceec.ac.in",
    githubUrl: "https://github.com/tedxaceec/tedxaceec",
    date: "2026",
    featured: true,
    metrics: [
      { value: "90+", label: "tickets processed" },
      { value: "7+", label: "collaborators" },
      { value: "1", label: "event portal" },
    ],
    details: {
      results: ["7+ collaborators onboarded", "90+ tickets processed"],
      learnings: "Internal tooling boosts large-event success.",
    },
    categories: ["Website"],
  },
  {
    id: "trimlyai",
    title: "Trimly.ai",
    subtitle: "Read Smart, Read Less",
    description:
      "A structure-aware AI reading tool that parses PDFs, preserves hierarchy, and adapts summaries to a reader's time budget.",
    problem: "No way to customize document length without losing key content.",
    solution: "Built a time- & mood-based compression engine.",
    impact: "Turned long PDFs into usable briefings without flattening the document.",
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
    metrics: [
      { value: "~80%", label: "less reading" },
      { value: "RAG", label: "structured context" },
      { value: "Local", label: "private workflow" },
    ],
    details: {
      results: [
        "Reduced long-form reading time by roughly 80%",
        "Preserved section structure and key document hierarchy",
        "Let summaries adapt to time budget and reading context",
      ],
      learnings: "Useful AI products need controllability and structure, not just shorter text.",
    },
    categories: ["AI", "SaaS", "Personalization"],
  },
  {
    id: "atlas-ai",
    title: "Atlas AI",
    subtitle: "Offline Multi-Expert AI System",
    description:
      "An offline-first AI mobile app with on-device LLM inference and a custom RAG expert system for private, context-aware conversations.",
    problem:
      "Mobile AI needs private, useful conversations while working within tight device memory and compute limits.",
    solution:
      "Built on-device LLM inference with llama.cpp, vector-backed RAG, GGUF quantization, persistent context windows, and device-specific tuning.",
    impact:
      "Kept time to first token stable between 1.5 and 8 seconds across tuned mobile devices.",
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
      { value: "RAG", label: "expert system" },
    ],
    details: {
      results: [
        "Enabled private, context-aware offline conversations with a custom RAG expert system",
        "Used GGUF quantization to control mobile memory footprint",
        "Maintained stable 1.5–8 second time to first token through device-specific tuning",
      ],
      learnings:
        "Local AI product work is mostly systems work: memory use, model ergonomics, and UX discipline matter as much as the model choice.",
    },
    categories: ["AI", "Productivity", "Mobile"],
  },
  {
    id: "autopodcast",
    title: "AutoPodcast",
    subtitle: "Automated Podcast Editing & Publishing",
    description:
      "An editing automation pipeline for podcast teams that removes silence, balances audio, and prepares episodes for publishing.",
    problem: "Manual post-production was time-consuming.",
    solution: "Built an Adobe-integrated workflow around FFmpeg, silence detection, and batch processing.",
    impact: "Reduced repetitive post-production from hours to minutes.",
    tech: ["FFmpeg", "Adobe CEP", "PPRO API", "UXP"],
    image: "/placeholder.svg",
    liveUrl: null,
    githubUrl: "https://github.com/TarunVuppala/AutoPodcast",
    date: "Mar – Jun 2025",
    featured: true,
    metrics: [
      { value: "<8 min", label: "per edit" },
      { value: "10+", label: "editors" },
      { value: "60%", label: "overhead" },
    ],
    details: {
      results: [
        "Reduced podcast editing time from three hours to under eight minutes",
        "Shipped cross-platform binaries adopted by 10+ podcast editors",
        "Reduced manual release overhead by 60%",
      ],
      learnings: "Automation only sticks when the workflow is dependable, not just technically clever.",
    },
    categories: ["Automation", "Productivity", "Audio Processing", "Plugin"],
  },
  {
    id: "jobtrackerportal",
    title: "JobTrackerPortal",
    subtitle: "Job Application Tracker",
    description:
      "A dashboard to log, track, and follow up on job applications.",
    problem: "Job seekers lose track of applications and next steps.",
    solution:
      "Built a standalone React frontend with an Express.js & MongoDB backend.",
    impact: "Projected to increase follow-through by 20%.",
    tech: ["React", "TypeScript", "Express.js", "MongoDB", "IndexedDB"],
    image: "/placeholder.svg",
    liveUrl: null,
    githubUrl: "https://github.com/TarunVuppala/job-tracker-portal",
    date: "2024",
    featured: false,
    metrics: [
      { value: "Offline", label: "first workflow" },
      { value: "Live", label: "optimistic sync" },
      { value: "∞", label: "applications" },
    ],
    details: {
      results: [
        "Prototype supports unlimited application entries in both online and offline modes",
        "Local reminders queued in IndexedDB and sent to the server when reconnected",
        "Optimistic UI updates ensure smooth interactions even when offline",
      ],
      learnings:
        "Leveraging MongoDB’s flexible schema alongside client-side caching delivers near real-time sync without heavy frameworks.",
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
    text: "Built backend-heavy products where parsing, streaming, fallbacks, and UX all had to work together.",
  },
  {
    text: "Comfortable taking a feature from backend logic and model behavior through to a shipped interface.",
  },
  {
    text: "Shipped end-to-end products across backend systems, model-driven tools, and frontend delivery.",
  },
  {
    text: "Debugged real edge cases across async workflows, data sync, and production integration work.",
  },
  {
    text: "Delivered scoped project work with clear tradeoffs, maintainable handoff quality, and production awareness.",
  },
  {
    text: "Built products around what users and teammates actually need, not just what demos well.",
  },
  {
    text: "Shipped multiple products and internal tools from first commit to usable release.",
  },
  {
    text: "Care about clean finishes, dependable behavior, and not leaving rough edges behind.",
  },
];

export const journeyExpanded = [
  {
    year: "Mar – Jun 2025",
    title: "Software Developer Intern",
    company: "Unity Internet",
    achievements: [
      "Used audio signal analysis, real-time scene switching, and overlap handling",
      "Shipped cross-platform binaries adopted by 10+ podcast editors",
      "Reduced manual release overhead by 60%",
    ],
  },
  {
    year: "Jun 2024 – Feb 2025",
    title: "Software Developer Intern",
    company: "Front Interactive Services",
    achievements: [
      "Worked in an Agile Scrum team of six engineers across two-week sprints",
      "Used TDD to reduce post-release defects by 30%",
      "Improved system stability through disciplined delivery and testing",
    ],
  },
];

export const skillsByDomain = [
  {
    title: "Frontend Development",
    icon: Code,
    skills: [
      {
        name: "React.js",
        logo: getTechIcon("React.js"),
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
      {
        name: "HTML5",
        logo: getTechIcon("HTML5"),
      },
      {
        name: "CSS3",
        logo: getTechIcon("CSS3"),
      },
      {
        name: "Tailwind CSS",
        logo: getTechIcon("Tailwind CSS"),
      },
      {
        name: "ShadCN UI",
        logo: getTechIcon("ShadCN UI"),
      },
      {
        name: "Framer Motion",
        logo: getTechIcon("Framer Motion"),
      },
      {
        name: "GSAP",
        logo: getTechIcon("GSAP"),
      },
      {
        name: "Three.js",
        logo: getTechIcon("Three.js"),
      },
    ],
  },
  {
    title: "Backend, Data & APIs",
    icon: Database,
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
        name: "Java",
        logo: getTechIcon("Java"),
      },
      {
        name: "Spring Boot",
        logo: getTechIcon("Spring Boot"),
      },
      {
        name: "Go",
        logo: getTechIcon("Go"),
      },
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
        name: "REST APIs",
        logo: getTechIcon("REST APIs"),
      },
      {
        name: "JWT",
        logo: getTechIcon("JWT"),
      },
      {
        name: "GraphQL",
        logo: getTechIcon("GraphQL"),
      },
      {
        name: "Authentication",
        logo: getTechIcon("Authentication"),
      },
      {
        name: "OAuth2",
        logo: getTechIcon("Authentication"),
      },
      {
        name: "Message Queues",
        logo: getTechIcon("REST APIs"),
      },
      {
        name: "Socket.io",
        logo: getTechIcon("Socket.io"),
      },
      {
        name: "Redis",
        logo: getTechIcon("Redis"),
      },
      {
        name: "AWS",
        logo: getTechIcon("AWS"),
      },
      {
        name: "Docker",
        logo: getTechIcon("Docker"),
      },
    ],
  },
  {
    title: "AI Engineering",
    icon: Zap,
    skills: [
      {
        name: "Python",
        logo: getTechIcon("Python"),
      },
      {
        name: "OpenAI",
        logo: getTechIcon("OpenAI"),
      },
      {
        name: "Flask",
        logo: getTechIcon("Flask"),
      },
      {
        name: "FastAPI",
        logo: getTechIcon("FastAPI"),
      },
      {
        name: "Hugging Face",
        logo: getTechIcon("Hugging Face"),
      },
      {
        name: "Ollama",
        logo: getTechIcon("Ollama"),
      },
      {
        name: "llama.cpp",
        logo: getTechIcon("llama.cpp"),
      },
      {
        name: "PyTorch",
        logo: getTechIcon("PyTorch"),
      },
      {
        name: "TensorFlow",
        logo: getTechIcon("TensorFlow"),
      },
      {
        name: "scikit-learn",
        logo: getTechIcon("scikit-learn"),
      },
      {
        name: "RAG",
        logo: getTechIcon("RAG"),
      },
      {
        name: "Vector Databases",
        logo: getTechIcon("RAG"),
      },
    ],
  },
  {
    title: "Developer Workflow",
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
        name: "VS Code",
        logo: getTechIcon("VS Code"),
      },
      {
        name: "Figma",
        logo: getTechIcon("Figma"),
      },
      {
        name: "FFmpeg",
        logo: getTechIcon("FFmpeg"),
      },
      {
        name: "Documentation",
        logo: "/icons/documentation.svg",
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
