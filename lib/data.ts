import {
  Briefcase,
  CheckCircle,
  ClipboardList,
  Code,
  Coffee,
  Database,
  Lightbulb,
  LucideProps,
  Rocket,
  Target,
  Terminal,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

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
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://acethletics.vercel.app",
    githubUrl: null,
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
    image: "/placeholder.svg?height=400&width=600",
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
    categories: ["Web App", "Mobile", "Tool"],
  },
  {
    id: "tedxaceec",
    title: "TEDxACEEC 2024",
    subtitle: "Event Website & Collaborator Portal",
    description:
      "A custom portal to manage collaborators, ticketing, and analytics for a TEDx event in college.",
    problem: "Event outreach and ticketing lacked centralization.",
    solution: "Built a modular dashboard for marketing and ticketing.",
    impact: "Streamlined operations for 5+ teams and many attendees.",
    tech: ["Next.js", "MongoDB", "Tailwind", "Framer Motion", "Razorpay"],
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://tedxaceec.vercel.app",
    githubUrl: null,
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
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: null,
    githubUrl: "https://github.com/madhavmadupu/trimlyai",
    date: "2025",
    featured: true,
    stats: { users: "n/a", performance: "5x faster", rating: "4.7/5" },
    details: {
      challenge: "Balancing brevity with content preservation.",
      approach: "Used semantic prompts and structure extraction.",
      results: ["80% time saved", "90% structural fidelity"],
      learnings: "Fine-tuned semantic thresholds for precision.",
    },
    categories: ["AI", "SaaS", "Personalization"],
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
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: null,
    githubUrl: null,
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
  {
    id: "decornest",
    title: "Decornest",
    subtitle: "3D Room Design Platform",
    description:
      "A 3D editor that lets users customize and visualize room layouts.",
    problem: "Difficulty envisioning interior designs in 3D.",
    solution: "Built a drag-and-drop 3D editor with Three.js.",
    impact: "Prototyped layouts at 60fps.",
    tech: ["Three.js", "React", "Blender"],
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://decornest.vercel.app",
    githubUrl: "https://github.com/tarunvuppala/decornest",
    date: "2023",
    featured: false,
    stats: {
      users: "n/a",
      performance: "Real-time Rendering",
      rating: "4.5/5",
    },
    details: {
      challenge: "3D interaction performance across devices.",
      approach: "Optimized geometry and UI controls.",
      results: ["100+ assets supported", "Exportable scenes"],
      learnings: "Balanced fidelity and performance.",
    },
    categories: ["Web App", "3D", "SaaS"],
  },
  {
    id: "taxcalculator",
    title: "Tax Calculator",
    subtitle: "Personal Income Tax Estimator",
    description: "A tool to estimate annual tax liability based on IT slab.",
    problem: "Complex spreadsheets deter accurate planning.",
    solution: "Built a form-driven calculator with dynamic slabs.",
    impact: "Improved financial planning accuracy.",
    tech: ["React", "JavaScript", "Node.js", "MongoDB"],
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://taxcalculator.vercel.app",
    githubUrl: "https://github.com/TarunVuppala/taxcalculator",
    date: "2025",
    featured: false,
    stats: { users: "n/a", performance: "Instant", rating: "4.8/5" },
    details: {
      challenge: "Updating slabs and deductions dynamically.",
      approach: "Fetched bracket JSON and recalculated in real time.",
      results: ["2023-24 compliant"],
      learnings: "Managed edge-case rules robustly.",
    },
    categories: ["Finance", "Web App", "Tool"],
  },
  {
    id: "eventreg",
    title: "Event ",
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
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: null,
    githubUrl: "https://github.com/TarunVuppala/uipath-aceec",
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
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: null,
    githubUrl: "https://github.com/tarunvuppala/jobtrackerportal",
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
      years: "3+",
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
      category: "DevOps",
      years: "1+",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/java-original.svg",
    },
    {
      name: "Firebase",
      category: "Cloud",
      years: "1+",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/firebase-original.svg",
    },
    {
      name: "Redis",
      category: "Database",
      years: "1+",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    },
  ],
  learning: [
    {
      name: "Kubernetes",
      category: "DevOps",
      years: "Learning",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    },
    {
      name: "GraphQL",
      category: "API",
      years: "Learning",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    },
    {
      name: "Rust",
      category: "Language",
      years: "Learning",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
    },
    {
      name: "Machine Learning",
      category: "AI",
      years: "Learning",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
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
    text: "5 class ideas turned into startups this semester. 💡",
  },
  {
    icon: Terminal,
    text: "Automated 5,000 commands to streamline workflows. 💻",
  },
  {
    icon: ClipboardList,
    text: "Published 20 project case studies for credibility. 📝",
  },
  { icon: Code, text: "25K lines of production-ready code delivered. ✍️" },
  {
    icon: Zap,
    text: "Fixed 150 critical bugs as the go-to problem-solver. ⚡",
  },
  {
    icon: Briefcase,
    text: "Completed 3 freelance gigs on scope and budget. 💼",
  },
  {
    icon: Users,
    text: "Led 4-person hackathon teams to investor-ready MVPs. 👥",
  },
  {
    icon: Rocket,
    text: "Deployed 8 webapps—shipping end-to-end flawlessly. 🚀",
  },
  {
    icon: CheckCircle,
    text: "100% on-time delivery across all projects. ✔️",
  },
];

export const journeyExpanded = [
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
];

export const skillsByDomain = [
  {
    title: "Frontend Development",
    icon: Code,
    color: "#3B82F6",
    bgGradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
    skills: [
      {
        name: "React.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        color: "#61DAFB",
      },
      {
        name: "Next.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        color: "#ffffff",
      },
      {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        color: "#3178C6",
      },
      {
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        color: "#F7DF1E",
      },
      {
        name: "HTML5",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        color: "#E34F26",
      },
      {
        name: "CSS3",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        color: "#1572B6",
      },
      {
        name: "Tailwind CSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
        color: "#06B6D4",
      },
      {
        name: "Motion",
        logo: "https://www.google.com/imgres?q=motion.dev%20logo%20png&imgurl=https%3A%2F%2Fuser-images.githubusercontent.com%2F7850794%2F164965509-2a8dc49e-2ed7-4243-a2c9-481b03bbc31a.png&imgrefurl=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fmotion%2Fv%2F10.17.0&docid=zImfgnQYGoA8kM&tbnid=vGCqJeOBJjfS8M&vet=12ahUKEwjDvcz568aOAxXr3jgGHSgWJDcQM3oECBAQAA..i&w=300&h=300&hcb=2&ved=2ahUKEwjDvcz568aOAxXr3jgGHSgWJDcQM3oECBAQAA",
        color: "#ECF806FF",
      },
    ],
  },
  {
    title: "Backend & Database",
    icon: Database,
    color: "#10B981",
    bgGradient: "linear-gradient(135deg, #10B981, #059669)",
    skills: [
      {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        color: "#339933",
      },
      {
        name: "Express.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        color: "#ffffff",
      },
      {
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        color: "#47A248",
      },
      {
        name: "PostgreSQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        color: "#336791",
      },
      {
        name: "Firebase",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        color: "#FFCA28",
      },
      {
        name: "Prisma",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-plain.svg",
        color: "#ffffff",
      },
    ],
  },
  {
    title: "Tools & Design",
    icon: Wrench,
    color: "#8B5CF6",
    bgGradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
    skills: [
      {
        name: "Git",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        color: "#F05032",
      },
      {
        name: "GitHub",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        color: "#ffffff",
      },
      {
        name: "VS Code",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        color: "#007ACC",
      },
      {
        name: "Figma",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        color: "#F24E1E",
      },
    ],
  },
];
