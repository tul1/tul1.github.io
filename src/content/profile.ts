export const profile = {
  name: "Patricio Tula",
  fullName: "Patricio Alejandro Tula",
  title: "Software Engineer",
  company: "OVHcloud",
  location: "Brest, France",
  tagline: "Notes on software, systems, and infrastructure.",
  bio: "I'm a software engineer at OVHcloud, based in Brest. I work on distributed systems and high-performance infrastructure — real-time, low-latency services at scale.",
  headshot: "/headshot.jpg",
  stack: [
    "Go",
    "Python",
    "Kubernetes",
    "Docker",
    "gRPC",
    "TemporalIO",
    "PostgreSQL",
    "MongoDB",
    "Prometheus",
    "Grafana",
  ],
  social: {
    email: "tula.patricio@gmail.com",
    github: "https://github.com/tul1",
    linkedin: "https://linkedin.com/in/patricio-alejandro-tula",
    website: "https://patriciotula.com",
  },
} as const;

export type Profile = typeof profile;
