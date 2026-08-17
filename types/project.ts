export type ProjectMetric = {
  value: string
  label: string
}

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  problem: string
  solution: string
  impact: string
  tech: string[]
  image: string
  liveUrl: string | null
  githubUrl: string | null
  date: string
  featured: boolean
  metrics?: ProjectMetric[]
  details: {
    results: string[]
    learnings: string
  }
  categories: string[]
}
