interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  tech: string[];
  image: string;
  liveUrl: string | null;
  githubUrl: string | null;
  date: string;
  featured: boolean;
  stats: {
    users: string;
    performance: string;
    rating: string;
  };
  details: {
    challenge: string;
    approach: string;
    results: string[];
    learnings: string;
  };
  categories: string[];
}

 interface ContactFormData {
  name: string
  email: string
  message: string
}
