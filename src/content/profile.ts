export const profile = {
  name: "Patricio Tula",
  title: "Senior Software Engineer",
  tagline:
    "Go, distributed systems, cloud & AI-assisted products.",
  location: "Brest, France",
  summary:
    "I build reliable backend systems and cloud-native platforms — from Go APIs and Kubernetes workloads to AI-assisted product workflows. Currently at OVHcloud; previously Orness, Ekumen Labs, and Ideamatic.",
  availability: "Open to conversations about senior engineering roles.",
  cvPath: "/cv.pdf",
  headshot: "/headshot.jpg",
  social: {
    email: "tula.patricio@gmail.com",
    github: "https://github.com/tul1",
    linkedin: "https://linkedin.com/in/patricio-alejandro-tula",
    website: "https://patriciotula.com",
  },
  stack: [
    "Go",
    "Kubernetes",
    "Cloud",
    "AI/LLM",
    "TypeScript",
    "PostgreSQL",
    "Docker",
    "CI/CD",
  ],
  focus: [
    {
      label: "systems",
      text: "Design and ship production Go services with clear boundaries, solid data models, and operational ownership end to end.",
    },
    {
      label: "platform",
      text: "Cloud and Kubernetes delivery — containers, CI/CD, observability — so teams can move fast without fragile deploys.",
    },
    {
      label: "ai-products",
      text: "Wire LLMs and automation into real workflows where correctness and reviewability matter more than demos.",
    },
  ],
  projects: [
    {
      name: "LegalFlow",
      role: "Full-stack · AI-assisted legal ops",
      description:
        "Operational intelligence platform for labor-law workflows: bulk data ingest, opportunity detection, case prioritization, and draft document generation under professional review.",
      stack: ["Next.js", "TypeScript", "AI/LLM"],
      links: {
        // Local demo — update when published
        github: undefined as string | undefined,
        live: undefined as string | undefined,
      },
    },
    {
      name: "surfBZH",
      role: "Full-stack · trip sharing",
      description:
        "Trip-sharing platform for surfers in Brittany: React frontend, Go API, PostgreSQL, Docker Compose locally and Helm charts for Kubernetes production.",
      stack: ["Go", "React", "PostgreSQL", "Kubernetes"],
      links: {
        github: undefined as string | undefined,
        live: undefined as string | undefined,
      },
    },
    {
      name: "candhis_api",
      role: "Go API",
      description:
        "Go service around coastal / surf buoy data (CANDHIS) — clean API boundaries for consuming oceanographic observations.",
      stack: ["Go"],
      links: {
        github: "https://github.com/tul1/candhis_api",
        live: undefined as string | undefined,
      },
    },
    {
      name: "avalon-rs",
      role: "Open source · Rust",
      description:
        "Implementation of the Avalon social deduction game in Rust — systems thinking applied to game rules and concurrency.",
      stack: ["Rust"],
      links: {
        github: "https://github.com/tul1/avalon-rs",
        live: undefined as string | undefined,
      },
    },
  ],
  experience: [
    {
      company: "OVHcloud",
      role: "Software Engineer",
      period: "Present",
      location: "Brest, France",
      bullets: [
        "Build and operate cloud platform software in a large-scale European public cloud environment.",
        "Focus on reliable services, automation, and production ownership.",
      ],
      stack: ["Go", "Cloud", "Kubernetes", "CI/CD"],
    },
    {
      company: "Orness",
      role: "Software Engineer",
      period: "Previous",
      location: "France",
      bullets: [
        "Delivered backend and platform engineering for client systems.",
        "Worked across services, cloud infrastructure, and delivery pipelines.",
      ],
      stack: ["Go", "Cloud", "DevOps"],
    },
    {
      company: "Ekumen Labs",
      role: "Software Engineer",
      period: "Previous",
      location: "Remote",
      bullets: [
        "Developed robotics and systems software in a distributed engineering culture.",
        "Collaborated on complex technical products with strong engineering standards.",
      ],
      stack: ["C++", "Python", "Systems"],
    },
    {
      company: "Ideamatic",
      role: "Software Engineer",
      period: "Previous",
      location: "Argentina",
      bullets: [
        "Built product features across the stack for early-stage software products.",
      ],
      stack: ["Web", "APIs"],
    },
  ],
} as const;

export type Profile = typeof profile;
