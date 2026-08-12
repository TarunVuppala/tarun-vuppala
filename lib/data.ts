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
  gsap: "https://cdn.simpleicons.org/greensock/white",
  "node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "express.js": "https://cdn.simpleicons.org/express/white",
  fastapi: "https://cdn.simpleicons.org/fastapi/white",
  flask: "https://cdn.simpleicons.org/flask/white",
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
  "llama.cpp": "/icons/llama.svg",
  "pdf-parser": "/icons/pdf-parser.svg",
  "rest apis": "/icons/rest-apis.svg",
  authentication: "/icons/authentication.svg",
  observability: "/icons/observability.svg",
  "machine learning": "/icons/machine-learning.svg",
  rag: "/icons/rag.svg",
  mlflow: "https://cdn.simpleicons.org/mlflow/white",
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

export const allProjects: Project[] = [
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
    stats: { users: "2K+ downloads", performance: "100ms API avg.", rating: "20ms realtime" },
    details: {
      challenge:
        "Coordinating live match updates and team logistics during a multi-day, multi-sport event.",
      approach:
        "Architected the backend, database schemas, transactional workflows, and WebSocket infrastructure for live tournament use.",
      results: [
        "Handled 1,500 peak concurrent users across 10+ live events",
        "Maintained 100ms average API response latency during tournaments",
        "Delivered 200+ real-time events per match at 20ms propagation latency",
        "Recorded zero downtime and zero production data inconsistencies",
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
    liveUrl: "https://tedx.aceec.ac.in",
    githubUrl: "https://github.com/tedxaceec/tedxaceec",
    date: "2026",
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
    stats: { users: "n/a", performance: "5x faster", rating: "4.7/5" },
    details: {
      challenge: "Balancing brevity with content preservation.",
      approach:
        "Combined document structure extraction with controllable summarization so shortening a file did not destroy its hierarchy.",
      results: [
        "Reduced long-form reading time by roughly 80%",
        "Preserved section structure and key document hierarchy",
        "Let summaries adapt to time budget and reading context",
      ],
      learnings: "Useful AI products need controllability and structure, not just shorter text.",
    },
    categories: ["AI", "SaaS", "Personalization", "Tool"],
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
    stats: { users: "Offline-first", performance: "1.5–8s TTFT", rating: "On-device RAG" },
    details: {
      challenge:
        "Keeping local inference usable on phones under tight memory and compute limits.",
      approach:
        "Chunked and embedded domain knowledge into a vector database, then tuned quantization, context windows, and inference parameters per device.",
      results: [
        "Enabled private, context-aware offline conversations with a custom RAG expert system",
        "Used GGUF quantization to control mobile memory footprint",
        "Maintained stable 1.5–8 second time to first token through device-specific tuning",
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
    stats: { users: "10+ editors", performance: "<8 min/edit", rating: "60% less overhead" },
    details: {
      challenge: "Handling real-world audio variance while keeping editing reliable enough for repeated use.",
      approach: "Wrapped FFmpeg-based audio processing inside an Adobe workflow that editors could actually use.",
      results: [
        "Reduced podcast editing time from three hours to under eight minutes",
        "Shipped cross-platform binaries adopted by 10+ podcast editors",
        "Reduced manual release overhead by 60%",
      ],
      learnings: "Automation only sticks when the workflow is dependable, not just technically clever.",
    },
    categories: ["Automation", "Productivity", "Audio Processing", "Plugin"],
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
  {
    icon: Coffee,
    text: "Built backend-heavy products where parsing, streaming, fallbacks, and UX all had to work together.",
  },
  {
    icon: Lightbulb,
    text: "Comfortable taking a feature from backend logic and model behavior through to a shipped interface.",
  },
  {
    icon: Code,
    text: "Shipped end-to-end products across backend systems, model-driven tools, and frontend delivery.",
  },
  {
    icon: Zap,
    text: "Debugged real edge cases across async workflows, data sync, and production integration work.",
  },
  {
    icon: Briefcase,
    text: "Delivered scoped project work with clear tradeoffs, maintainable handoff quality, and production awareness.",
  },
  {
    icon: Users,
    text: "Built products around what users and teammates actually need, not just what demos well.",
  },
  {
    icon: Rocket,
    text: "Shipped multiple products and internal tools from first commit to usable release.",
  },
  {
    icon: CheckCircle,
    text: "Care about clean finishes, dependable behavior, and not leaving rough edges behind.",
  },
];

export const journeyExpanded = [
  {
    year: "Mar – Jun 2025",
    title: "Software Developer Intern",
    company: "Unity Internet",
    description:
      "Built a Premiere Pro auto-edit plugin that reduced podcast editing time from three hours to under eight minutes.",
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
    description:
      "Engineered backend systems with 50+ REST API endpoints and a scalable server-side architecture.",
    achievements: [
      "Worked in an Agile Scrum team of six engineers across two-week sprints",
      "Used TDD to reduce post-release defects by 30%",
      "Improved system stability through disciplined delivery and testing",
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
      "Product-facing interfaces with responsive layouts, accessible interactions, and motion used intentionally.",
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
        name: "ShadCN UI",
        logo: getTechIcon("ShadCN UI"),
        color: "#ffffff",
      },
      {
        name: "Framer Motion",
        logo: getTechIcon("Framer Motion"),
        color: "#ECF806FF",
      },
      {
        name: "GSAP",
        logo: getTechIcon("GSAP"),
        color: "#88CE02",
      },
      {
        name: "Three.js",
        logo: getTechIcon("Three.js"),
        color: "#ffffff",
      },
    ],
  },
  {
    title: "Backend, Data & APIs",
    icon: Database,
    color: "#10B981",
    bgGradient: "linear-gradient(135deg, #10B981, #059669)",
    description:
      "Hands-on with APIs, data layers, service logic, and the reliability and performance work that helps products stay dependable after launch.",
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
        name: "Java",
        logo: getTechIcon("Java"),
        color: "#F89820",
      },
      {
        name: "Spring Boot",
        logo: getTechIcon("Spring Boot"),
        color: "#6DB33F",
      },
      {
        name: "Go",
        logo: getTechIcon("Go"),
        color: "#00ADD8",
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
        name: "MySQL",
        logo: getTechIcon("MySQL"),
        color: "#4479A1",
      },
      {
        name: "REST APIs",
        logo: getTechIcon("REST APIs"),
        color: "#ffffff",
      },
      {
        name: "JWT",
        logo: getTechIcon("JWT"),
        color: "#ffffff",
      },
      {
        name: "GraphQL",
        logo: getTechIcon("GraphQL"),
        color: "#E10098",
      },
      {
        name: "Authentication",
        logo: getTechIcon("Authentication"),
        color: "#ffffff",
      },
      {
        name: "OAuth2",
        logo: getTechIcon("Authentication"),
        color: "#ffffff",
      },
      {
        name: "Message Queues",
        logo: getTechIcon("REST APIs"),
        color: "#ffffff",
      },
      {
        name: "Socket.io",
        logo: getTechIcon("Socket.io"),
        color: "#ffffff",
      },
      {
        name: "Redis",
        logo: getTechIcon("Redis"),
        color: "#ffffff",
      },
      {
        name: "AWS",
        logo: getTechIcon("AWS"),
        color: "#FF9900",
      },
      {
        name: "Docker",
        logo: getTechIcon("Docker"),
        color: "#ffffff",
      },
    ],
  },
  {
    title: "AI Engineering",
    icon: Zap,
    color: "#F59E0B",
    bgGradient: "linear-gradient(135deg, #F59E0B, #D97706)",
    description:
      "Focused on building production-facing AI systems across model development, retrieval pipelines, evaluation, deployment, monitoring, and inference optimization.",
    skills: [
      {
        name: "Python",
        logo: getTechIcon("Python"),
        color: "#3776AB",
      },
      {
        name: "OpenAI",
        logo: getTechIcon("OpenAI"),
        color: "#ffffff",
      },
      {
        name: "Flask",
        logo: getTechIcon("Flask"),
        color: "#ffffff",
      },
      {
        name: "FastAPI",
        logo: getTechIcon("FastAPI"),
        color: "#009688",
      },
      {
        name: "Hugging Face",
        logo: getTechIcon("Hugging Face"),
        color: "#ffffff",
      },
      {
        name: "Ollama",
        logo: getTechIcon("Ollama"),
        color: "#ffffff",
      },
      {
        name: "llama.cpp",
        logo: getTechIcon("llama.cpp"),
        color: "#ffffff",
      },
      {
        name: "PyTorch",
        logo: getTechIcon("PyTorch"),
        color: "#ffffff",
      },
      {
        name: "TensorFlow",
        logo: getTechIcon("TensorFlow"),
        color: "#ffffff",
      },
      {
        name: "scikit-learn",
        logo: getTechIcon("scikit-learn"),
        color: "#ffffff",
      },
      {
        name: "RAG",
        logo: getTechIcon("RAG"),
        color: "#ffffff",
      },
      {
        name: "Vector Databases",
        logo: getTechIcon("RAG"),
        color: "#ffffff",
      },
    ],
  },
  {
    title: "Developer Workflow",
    icon: Terminal,
    color: "#8B5CF6",
    bgGradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
    description:
      "Tooling and workflow habits that keep delivery clear, collaboration smooth, and iteration grounded in good engineering basics.",
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
      {
        name: "FFmpeg",
        logo: getTechIcon("FFmpeg"),
        color: "#65A30D",
      },
      {
        name: "Documentation",
        logo: "/icons/documentation.svg",
        color: "#ffffff",
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
