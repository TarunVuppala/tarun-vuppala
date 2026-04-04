import {
  Briefcase,
  CalendarClock,
  CheckCircle,
  Clock,
  Code,
  Coffee,
  Database,
  Lightbulb,
  LucideProps,
  Mail,
  MapPin,
  Rocket,
  Target,
  Terminal,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

import { ForwardRefExoticComponent, RefAttributes } from "react";

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
  "tailwind css": "https://cdn.simpleicons.org/tailwindcss/white",
  tailwind: "https://cdn.simpleicons.org/tailwindcss/white",
  "framer motion": "https://cdn.simpleicons.org/framer/white",
  motion: "https://cdn.simpleicons.org/framer/white",
  "node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "express.js": "https://cdn.simpleicons.org/express/white",
  fastapi: "https://cdn.simpleicons.org/fastapi/white",
  mongodb:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  postgresql:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  prisma: "https://cdn.simpleicons.org/prisma/white",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  github: "https://cdn.simpleicons.org/github/white",
  "vs code":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "socket.io": "https://cdn.simpleicons.org/socketdotio/white",
  sockio: "https://cdn.simpleicons.org/socketdotio/white",
  jwt: "https://cdn.simpleicons.org/jsonwebtokens/white",
  razorpay: "https://cdn.simpleicons.org/razorpay/white",
  "shadcn ui": "https://cdn.simpleicons.org/shadcnui/white",
  shadcn: "https://cdn.simpleicons.org/shadcnui/white",
  "three.js": "https://cdn.simpleicons.org/threedotjs/white",
  "three js": "https://cdn.simpleicons.org/threedotjs/white",
  electron: "https://cdn.simpleicons.org/electron/white",
  openai: "https://cdn.simpleicons.org/openai/white",
  "hugging face": "https://cdn.simpleicons.org/huggingface/white",
  blender:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
  ffmpeg: "https://cdn.simpleicons.org/ffmpeg/white",
  ffmped: "https://cdn.simpleicons.org/ffmpeg/white",
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
  "pdf-parser": "/icons/pdf-parser.svg",
};

export const getTechIcon = (tech: string) =>
  techIconMap[normalizeTechName(tech)] || "/placeholder.svg";

export const allProjects: Project[] = [
  {
    id: "acethletics",
    title: "Acethletics",
    subtitle: "All-in-One College Sports Management",
    description:
      "A unified platform that handles event scheduling, team coordination, live score updates, etc for college sports.",
    problem:
      "College sports events lacked centralized sports collaboration and online presence.",
    solution:
      "Built a platform for event scheduling, participant management, and real-time score updates.",
    impact: "Digitized 10+ sports events and improved communication.",
    tech: [
      "Next.js",
      "React Native",
      "Node.js",
      "MongoDB",
      "Tailwind",
      "Socket.io",
      "Transaction Management",
    ],
    image: "/placeholder.svg",
    liveUrl: "https://acethletics.vercel.app",
    githubUrl: "https://github.com/TarunVuppala/acethletics-server",
    date: "2024",
    featured: true,
    stats: { users: "1.5K+", performance: "Instant Sync", rating: "4.8/5" },
    details: {
      challenge:
        "Coordinating live match updates and team logistics during a multi-day, multi-sport event.",
      approach:
        "Used WebSockets for live scores and built an intuitive admin panel for real-time control.",
      results: [
        "Live updates with 0 delays during 10+ matches",
        "200+ participants registered",
        "1.5K+ page views",
        "Reduced miscommunication",
        "2K+ downloads",
      ],
      learnings: "Optimized real-time data flows under production stress.",
    },
    categories: ["Web App", "Mobile", "Published"],
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
      "MongoDB",
      "Express.js",
      "JWT",
      "Socket.io",
      "Tailwind",
    ],
    image: "/placeholder.svg",
    liveUrl: "https://quick-fuel.vercel.app",
    githubUrl: "https://github.com/TarunVuppala/quick-fuel",
    date: "2024",
    featured: false,
    stats: { users: "n/a", performance: "30min saved", rating: "4.6/5" },
    details: {
      challenge:
        "Accurate real-time data and ensuring reliable on-demand delivery.",
      approach: "Upgraded GPS routing and scheduling logic for deliveries.",
      results: [
        "Platform for on-demand fuel delivery and vehicle repairs",
        "Real-time order tracking with live updates",
        "95% accuracy in fuel status predictions",
      ],
      learnings:
        "Balanced logistics routing with real-time data to ensure timely service.",
    },
    categories: ["Web App", "Tool"],
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
    liveUrl: "https://tedxaceec.vercel.app",
    githubUrl: "https://github.com/tedxaceec/tedxaceec",
    date: "2024",
    featured: true,
    stats: { users: "1K+", performance: "High Engagement", rating: "4.7/5" },
    details: {
      challenge: "UI and marketing",
      approach: "Built a minimal and modern UI for high engagement.",
      results: ["7+ collaborators onboarded", "90+ tickets processed"],
      learnings: "Internal tooling boosts large-event success.",
    },
    categories: ["Web App", "Published"],
  },
  {
    id: "trimlyai",
    title: "Trimly.ai",
    subtitle: "Read Smart, Read Less",
    description:
      "An AI-driven document compression tool that tailors PDF length to time and mood while preserving structure.",
    problem: "No way to customize document length without losing key content.",
    solution: "Built a time- & mood-based compression engine.",
    impact: "Enabled users to read 5x faster while retaining meaning.",
    tech: [
      "Next.js",
      "Ollama",
      "LLaMA 3.2",
      "pdf-parser",
      "Node.js",
      "ShadCN UI",
    ],
    image: "/placeholder.svg",
    liveUrl: null,
    githubUrl: "https://github.com/tarunvuppala/trimlyai",
    date: "2025",
    featured: true,
    stats: { users: "n/a", performance: "5x faster", rating: "4.7/5" },
    details: {
      challenge: "Balancing brevity with content preservation.",
      approach: "Used semantic prompts and structure extraction.",
      results: ["80% time saved", "90% structural fidelity"],
      learnings: "Fine-tuned semantic thresholds for precision.",
    },
    categories: ["AI", "SaaS", "Personalization", "Tool"],
  },
  {
    id: "atlas-ai",
    title: "Atlas AI",
    subtitle: "Privacy-First Local AI Assistant",
    description:
      "An offline-first AI chat application with on-device inference that falls back to the desktop through LAN, using SSE streaming.",
    problem:
      "Mobile AI chat usually depends on a remote backend or breaks down under real device memory and compute limits.",
    solution:
      "Built an offline-first architecture with device-level inference optimization, LAN fallback to a desktop runtime, and provider-specific local chat persistence.",
    impact:
      "Made local AI chat practical on mobile without giving up responsiveness, persistence, or direct control over models.",
    tech: [
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "React.js",
      "Hugging Face",
      "Tailwind CSS",
    ],
    image: "/placeholder.svg",
    liveUrl: null,
    githubUrl: "https://github.com/madhavmadupu/atlas-ai",
    date: "2026",
    featured: true,
    stats: { users: "100% offline", performance: "Local RAG", rating: "GPU-ready" },
    details: {
      challenge:
        "Keeping local inference usable on phones while working within tight memory, compute, and thermal limits.",
      approach:
        "Combined on-device model execution with LAN fallback to desktop through SSE streaming, then tuned inference and persistence around mobile constraints.",
      results: [
        "Offline-first AI chat with on-device inference and desktop fallback over LAN",
        "Optimized on-device execution for mobile memory and compute limits",
        "Enabled full-cycle on-device model management and provider-specific local chat persistence",
      ],
      learnings:
        "Local AI product work is mostly systems work: memory use, model ergonomics, and UX discipline matter as much as the model choice.",
    },
    categories: ["AI", "Productivity", "Tool"],
  },
  {
    id: "autopodcast",
    title: "AutoPodcast",
    subtitle: "Automated Podcast Editing & Publishing",
    description:
      "A pipeline that removes silence, balances audio, and publishes episodes.",
    problem: "Manual post-production was time-consuming.",
    solution: "Automated silence removal and gain control with FFmpeg.",
    impact: "Cut editing time by 95%.",
    tech: ["FFmpeg", "Adobe CEP", "PPRO API", "UXP"],
    image: "/placeholder.svg",
    liveUrl: null,
    githubUrl: "https://github.com/TarunVuppala/AutoPodcast",
    date: "2025",
    featured: false,
    stats: { users: "n/a", performance: "<5min/process", rating: "4.9/5" },
    details: {
      challenge: "Handling diverse audio formats losslessly.",
      approach: "Leveraged FFmpeg filters and CEP scripting.",
      results: ["<1% bitrate loss"],
      learnings: "Optimized concurrent FFmpeg tasks.",
    },
    categories: ["AI", "Productivity", "Audio Processing", "Plugin"],
  },
  // {
  //   id: "decornest",
  //   title: "Decornest",
  //   subtitle: "3D Room Design Platform",
  //   description:
  //     "A 3D editor that lets users customize and visualize room layouts.",
  //   problem: "Difficulty envisioning interior designs in 3D.",
  //   solution: "Built a drag-and-drop 3D editor with Three.js.",
  //   impact: "Prototyped layouts at 60fps.",
  //   tech: ["Three.js", "React", "Blender"],
  //   image: "/placeholder.svg",
  //   liveUrl: null,
  //   githubUrl: null,
  //   date: "2023",
  //   featured: false,
  //   stats: {
  //     users: "n/a",
  //     performance: "Real-time Rendering",
  //     rating: "4.5/5",
  //   },
  //   details: {
  //     challenge: "3D interaction performance across devices.",
  //     approach: "Optimized geometry and UI controls.",
  //     results: ["100+ assets supported", "Exportable scenes"],
  //     learnings: "Balanced fidelity and performance.",
  //   },
  //   categories: ["Web App", "3D", "SaaS"],
  // },
  // {
  //   id: "taxcalculator",
  //   title: "Tax Calculator",
  //   subtitle: "Personal Income Tax Estimator",
  //   description: "A tool to estimate annual tax liability based on IT slab.",
  //   problem: "Complex spreadsheets deter accurate planning.",
  //   solution: "Built a form-driven calculator with dynamic slabs.",
  //   impact: "Improved financial planning accuracy.",
  //   tech: ["React", "JavaScript", "Node.js", "MongoDB"],
  //   image: "/placeholder.svg",
  //   liveUrl: "https://tax-calculator-murex.vercel.app",
  //   githubUrl: "https://github.com/TarunVuppala/tax-calculator",
  //   date: "2025",
  //   featured: false,
  //   stats: { users: "n/a", performance: "Instant", rating: "n/a" },
  //   details: {
  //     challenge: "Updating slabs and deductions dynamically.",
  //     approach: "Fetched bracket JSON and recalculated in real time.",
  //     results: ["2023-24 compliant"],
  //     learnings: "Managed edge-case rules robustly.",
  //   },
  //   categories: ["Finance", "Web App", "Tool"],
  // },
  {
    id: "eventreg",
    title: "Event Registration",
    subtitle: "Minimalistic Event Registration",
    description:
      "A lightweight site for creating and managing event sign-ups and attendees.",
    problem: "Feature-heavy platforms distract attendees.",
    solution:
      "Built a pared-down form with instant confirmation emails and QR-code check-in.",
    impact: "Boosted sign-up completion by 50%.",
    tech: [
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "TypeScript",
      "nodemailer",
      "QR parser",
    ],
    image: "/placeholder.svg",
    liveUrl: null,
    githubUrl: null,
    date: "2025",
    featured: false,
    stats: { users: "300+", performance: "Fast Load", rating: "4.6/5" },
    details: {
      challenge: "Managing on-ground attendee check-in and managing UX.",
      approach:
        "Serverless form submits with instant emails and QR-code generation.",
      results: [
        "50+ events managed",
        "50% increase in completion rates",
        "QR-enabled check-in reduced wait times by 40%",
      ],
      learnings:
        "Integrating QR workflows streamlined in-person event operations.",
    },
    categories: ["Web App", "Tool", "Published"],
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
    stats: { users: "n/a", performance: "Real-time Sync", rating: "n/a" },
    details: {
      challenge:
        "Ensuring reliable data persistence and offline access without a full-featured framework.",
      approach:
        "Built an Express.js REST API backed by MongoDB; used IndexedDB in the React client for offline caching and synchronization.",
      results: [
        "Prototype supports unlimited application entries in both online and offline modes",
        "Local reminders queued in IndexedDB and sent to the server when reconnected",
        "Optimistic UI updates ensure smooth interactions even when offline",
      ],
      learnings:
        "Leveraging MongoDB’s flexible schema alongside client-side caching delivers near real-time sync without heavy frameworks.",
    },
    categories: ["Web App", "Productivity", "Tool"],
  },
];

export const skillsByMastery = {
  expert: [
    {
      name: "React",
      category: "Frontend",
      years: "2+",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "JavaScript",
      category: "Language",
      years: "2+",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      category: "Language",
      years: "1+",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "HTML/CSS",
      category: "Frontend",
      years: "3+",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
  ],
  advanced: [
    {
      name: "Next.js",
      category: "Framework",
      years: "2+",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Node.js",
      category: "Backend",
      years: "2+",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Tailwind CSS",
      category: "Styling",
      years: "2+",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    },
    {
      name: "Git",
      category: "Tools",
      years: "2+",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "MongoDB",
      category: "Database",
      years: "2+",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
  ],
  proficient: [
    {
      name: "Python",
      category: "Language",
      years: "2+",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Java",
      category: "Language",
      years: "3+",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/java-original.svg",
    },
    {
      name: "Firebase",
      category: "Cloud",
      years: "1+",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/firebase-original.svg",
    },
  ],
  learning: [
    {
      name: "Redis",
      category: "Database",
      years: "1+",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
    },
    {
      name: "Nest.js",
      category: "Framework",
      years: "Learning",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    },
    {
      name: "Designing",
      category: "Design",
      years: "Learning",
      logo: "",
    },
    {
      name: "Machine Learning",
      category: "AI",
      years: "Learning",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    },
    {
      name: "Motion.dev",
      category: "Animations",
      years: "Learning",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiqP6jLJCyn0khj8jO7Mxd2e-JT8aBeR8a7g&s",
    },
  ],
};

export const masteryLevels = [
  {
    key: "expert",
    title: "Expert",
    description: "Deep expertise & production experience",
    color: "text-green-500",
  },
  {
    key: "advanced",
    title: "Advanced",
    description: "Strong proficiency & regular use",
    color: "text-blue-500",
  },
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
];

export const codingQuotes = [
  "Software is the sculptor's clay of the digital age, and I mold functionality with every keystroke.",
  "Algorithms are the melodies of machines, and I compose symphonies of efficiency.",
  "Every function I write is a bridge between human intent and machine execution.",
  "In the binary forest, I plant seeds of logic that grow into powerful applications.",
  "Code is the canvas; I'm the painter turning ideas into interactive masterpieces.",
  "Debugging is my meditation—finding serenity in the art of problem elimination.",
  "APIs are the languages of collaboration, and I speak fluently across every endpoint.",
  "Data structures are the architecture of thought, and I build skyscrapers of speed and scale.",
  "Variables are my characters; together they enact the story of your software.",
  "A clean codebase is a clear mind—both reveal clarity and purpose.",
  "Version control is the time machine of development; I travel back to fix mistakes and forward to deliver innovations.",
  "Every pull request is a conversation, and I code to contribute value to the dialogue.",
  "Front-end is my stage, and I choreograph every animation and interaction.",
  "Back-end logic is the engine room, and I engineer horsepower for your application.",
  "Testing isn't optional—it's the guardian ensuring promises in code never break.",
  "Continuous integration is the heartbeat of progress, and I keep it strong and steady.",
  "Branches in Git are the forks in the road, and I navigate them toward the closest merge.",
  "A well-written algorithm is a riddle solved with elegant simplicity.",
  "Refactoring is my way of polishing rough diamonds into gleaming gems.",
  "Deployments are my launchpads—one click and your vision soars into users' hands.",
  "Code is poetry written in logic, and I'm here to craft verses that solve real problems.",
];

export const codingStats: {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  text: string;
}[] = [
  { icon: Coffee, text: "200 cups of coffee fueling on-time MVP builds. ☕" },
  {
    icon: Lightbulb,
    text: "Turning ideas into functional code. 💡",
  },
  { icon: Code, text: "25K lines of production-ready code delivered. ✍️" },
  {
    icon: Zap,
    text: "Fixed 150 critical bugs as the go-to problem-solver. ⚡",
  },
  {
    icon: Briefcase,
    text: "Completed freelance gigs on scope and budget. 💼",
  },
  {
    icon: Users,
    text: "Led products to investor-ready MVPs. 👥",
  },
  {
    icon: Rocket,
    text: "Deployed 4 webapps—shipping end-to-end flawlessly. 🚀",
  },
  {
    icon: CheckCircle,
    text: "100% on-time delivery across all projects. ✔️",
  },
];

export const journeyExpanded = [
  {
    year: "2024",
    title: "Software Developer Intern",
    company: "Unity Labs AI",
    description: "Built a PPRO pluign that automatically edits podcasts.",
    achievements: [
      "Developed a plugin for PPRO that automatically edits podcasts",
      "Implemented a custom algorithm to remove silence",
      "Integrated with Adobe CEP for seamless workflow",
      "Optimized the plugin for faster performance",
    ],
  },
  {
    year: "2024",
    title: "Software Developer Intern",
    company: "Frost Interactive",
    description:
      "Focused on backend and business logic optimization. Collaborated with frontend teams to integrate APIs.",
    achievements: [
      "Developed backend of 2 in-house applications from scratch",
      "Implemented efficient database queries",
      "Optimized API performance by 50%",
      "Contributed to team knowledge base with documentation",
    ],
  },
];

export const stats = [
  { number: "10+", label: "Projects Completed" },
  { number: "2+", label: "Years Experience" },
  { number: "10+", label: "Technologies" },
  { number: "80%", label: "Client Satisfaction" },
];

export const journeyTimeline = [
  { year: "2018", event: "Discovered passion for coding in high school." },
  {
    year: "2023",
    event: "Built my first web app and started honing my skills.",
  },
  { year: "2024", event: "First internship: Built real-world web apps." },
  {
    year: "2025",
    event: "Launched personal projects and open-source contributions.",
  },
];

export const highlights: {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
}[] = [
  {
    icon: Code,
    title: "Clean Architecture",
    description:
      "Crafting code that's elegant, maintainable, and built to scale with future needs.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    description:
      "Turning complex problems into creative, efficient breakthroughs.",
  },
  {
    icon: Target,
    title: "Impact-Driven",
    description:
      "Delivering solutions that create real value for users and businesses.",
  },
  {
    icon: Rocket,
    title: "Entrepreneurial Spirit",
    description:
      "Building towards launching something that makes a real impact in people's lives.",
  },
];

export const skillsByDomain = [
  {
    title: "Frontend Development",
    icon: Code,
    color: "#3B82F6",
    bgGradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
    description:
      "Component-driven UIs with responsive layouts, accessible interactions, and motion that reinforces the story.",
    skills: [
      {
        name: "React.js",
        logo: getTechIcon("React.js"),
        color: "#61DAFB",
      },
      {
        name: "Next.js",
        logo: getTechIcon("Next.js"),
        color: "#ffffff",
      },
      {
        name: "TypeScript",
        logo: getTechIcon("TypeScript"),
        color: "#3178C6",
      },
      {
        name: "JavaScript",
        logo: getTechIcon("JavaScript"),
        color: "#F7DF1E",
      },
      {
        name: "HTML5",
        logo: getTechIcon("HTML5"),
        color: "#E34F26",
      },
      {
        name: "CSS3",
        logo: getTechIcon("CSS3"),
        color: "#1572B6",
      },
      {
        name: "Tailwind CSS",
        logo: getTechIcon("Tailwind CSS"),
        color: "#06B6D4",
      },
      {
        name: "Framer Motion",
        logo: getTechIcon("Framer Motion"),
        color: "#ECF806FF",
      },
    ],
  },
  {
    title: "Backend & Database",
    icon: Database,
    color: "#10B981",
    bgGradient: "linear-gradient(135deg, #10B981, #059669)",
    description:
      "Robust APIs and data layers with structured schemas, strong typing, and observability baked into the stack.",
    skills: [
      {
        name: "Node.js",
        logo: getTechIcon("Node.js"),
        color: "#339933",
      },
      {
        name: "Express.js",
        logo: getTechIcon("Express.js"),
        color: "#ffffff",
      },
      {
        name: "MongoDB",
        logo: getTechIcon("MongoDB"),
        color: "#47A248",
      },
      {
        name: "PostgreSQL",
        logo: getTechIcon("PostgreSQL"),
        color: "#336791",
      },
      {
        name: "Prisma",
        logo: getTechIcon("Prisma"),
        color: "#ffffff",
      },
    ],
  },
  {
    title: "Tools & Design",
    icon: Wrench,
    color: "#8B5CF6",
    bgGradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
    description:
      "Workflow accelerators for version control, collaboration, and quick iteration between design and engineering.",
    skills: [
      {
        name: "Git",
        logo: getTechIcon("Git"),
        color: "#F05032",
      },
      {
        name: "GitHub",
        logo: getTechIcon("GitHub"),
        color: "#ffffff",
      },
      {
        name: "VS Code",
        logo: getTechIcon("VS Code"),
        color: "#007ACC",
      },
      {
        name: "Figma",
        logo: getTechIcon("Figma"),
        color: "#F24E1E",
      },
    ],
  },
];

export const projectTypes = [
  "Full-Stack App",
  "E-commerce Site",
  "API Development",
  "MVP",
  "Organization Website",
  "Landing Page",
  "Dashboard",
  "Web App",
  "Other",
];

export const budgetRanges = [
  "< ₹10,000",
  "₹10,000 - ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "Let's discuss",
];

export const timelines = [
  "ASAP",
  "1-2 weeks",
  "1 month",
  "2-3 months",
  "3+ months",
  "Flexible",
];

export const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "tarun.vuppala26@gmail.com",
    description: "Drop me a line anytime",
    href: "mailto:tarun.vuppala26@gmail.com",
    color: "text-blue-400",
  },
  {
    icon: CalendarClock,
    title: "Book a Call",
    value: "Schedule a 1:1",
    description: "Let's discuss your project",
    href: "https://calendly.com/tarun-vuppala26/intro-call",
    color: "text-indigo-500",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Hyderabad, India",
    description: "Available for remote work globally",
    href: null,
    color: "text-green-400",
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "Within 24 hours",
    description: "Usually much faster!",
    href: null,
    color: "text-purple-400",
  },
];
