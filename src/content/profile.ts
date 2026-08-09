export const profile = {
  name: "Patricio Tula",
  fullName: "Patricio Alejandro Tula",
  title: "Senior Software Engineer",
  tagline:
    "Distributed systems and high-performance infrastructure — real-time, low-latency services at scale.",
  location: "Brest, France",
  summary:
    "Senior Software Engineer specialized in distributed systems and high-performance infrastructure. Experienced in designing and operating real-time, low-latency services at scale (up to Tbps traffic), with a focus on reliability, observability, and production excellence. Strong contributor to technical leadership, team maturity, and cross-functional execution in fast-growth environments.",
  availability: "Open to conversations about senior engineering roles.",
  cvPath: "/cv.pdf",
  headshot: "/headshot.jpg",
  social: {
    email: "tula.patricio@gmail.com",
    github: "https://github.com/tul1",
    linkedin: "https://linkedin.com/in/patricio-alejandro-tula",
    website: "https://patriciotula.com",
  },
  languages: [
    { name: "Spanish", level: "Native" },
    { name: "French", level: "Bilingual" },
    { name: "English", level: "B2" },
  ],
  stack: [
    "Go",
    "Python",
    "Perl",
    "Kubernetes",
    "Docker",
    "Helm",
    "gRPC",
    "TemporalIO",
    "PostgreSQL",
    "MongoDB",
    "Prometheus",
    "Grafana",
  ],
  focus: [
    {
      label: "distributed-systems",
      text: "Event-driven and streaming architectures for real-time ingestion, analysis, and orchestration across large production fleets.",
    },
    {
      label: "high-throughput",
      text: "Low-latency services under heavy load — including anti-DDoS orchestration and network systems operating at multi-Tbit/s scale.",
    },
    {
      label: "reliability",
      text: "Observability, fault tolerance, and production ownership: metrics, incident readiness, and measurable performance improvements.",
    },
  ],
  highlights: [
    {
      name: "Anti-DDoS orchestration",
      role: "OVHcloud · Network Defense",
      description:
        "Designed and deployed a low-latency gRPC streaming orchestration service for real-time traffic analysis and mitigation. Built distributed data pipelines and a high-performance rule-processing engine protecting edge, backbone, and datacenter infrastructure up to 1.3 Tbit/s.",
      stack: ["Go", "gRPC", "Kubernetes", "MongoDB", "PostgreSQL", "Helm"],
      links: {
        github: undefined as string | undefined,
        live: undefined as string | undefined,
        label: undefined as string | undefined,
      },
    },
    {
      name: "Baremetal network systems",
      role: "OVHcloud · Baremetal System Network",
      description:
        "Modernizing legacy network management for reliability and operational performance. Built and optimized batch processes in Perl and Go, designed Kubernetes architectures with Docker and KEDA, and improved stability through validation, observability, and SRE collaboration.",
      stack: ["Go", "Perl", "Kubernetes", "Docker", "KEDA"],
      links: {
        github: undefined as string | undefined,
        live: undefined as string | undefined,
        label: undefined as string | undefined,
      },
    },
    {
      name: "Network overlay automation",
      role: "OVHcloud · Network Automation",
      description:
        "APIs and TemporalIO workflows to manage OVHcloud network overlays with Go, PostgreSQL, and Domain-Driven Design. Contributed to BYOIP and Additional IP for flexible IPv4/IPv6 allocation, while maintaining high-traffic Python underlay tooling and vendor automation (Arista EOS, Juniper Junos).",
      stack: ["Go", "TemporalIO", "PostgreSQL", "Python", "DDD"],
      links: {
        github: undefined as string | undefined,
        live: undefined as string | undefined,
        label: undefined as string | undefined,
      },
    },
    {
      name: "LegalOps",
      role: "Side project · AI-assisted legal ops",
      description:
        "Operational intelligence platform for labor-law workflows: bulk data ingest, opportunity detection, case prioritization, and draft document generation under professional review. Full-stack product work on top of domain-heavy operations.",
      stack: ["Next.js", "TypeScript", "AI/LLM", "Tailwind"],
      links: {
        github: undefined as string | undefined,
        live: "https://legal-ops-five.vercel.app",
        label: "live →",
      },
    },
    {
      name: "Deudas UOM",
      role: "Side project · Go API + React",
      description:
        "Tooling for calculating and pursuing employer debt owed to the metalworkers’ union (UOM). Go backend with clean architecture (domain, adapters, httpapi), React SPA, and deploy on Vercel (SPA + Go Function) with local sqlite or Turso/Blob adapters.",
      stack: ["Go", "React", "TypeScript", "SQLite", "Turso", "Vercel"],
      links: {
        github: undefined as string | undefined,
        live: "https://deudas-uom.vercel.app",
        label: "live →",
      },
    },
    {
      name: "LeapTower",
      role: "Personal · frontend / interactive",
      description:
        "Experimental video game (with Federico Marino) exhibited at Centro Cultural San Martín for Game On — over 1,000 visitors. Older work, kept here as a signal of frontend craft and shipping interactive UI beyond backend systems.",
      stack: ["Frontend", "Interactive", "Game"],
      links: {
        github: undefined as string | undefined,
        live: "http://www.fedemarino.com.ar/leaptower-2/",
        label: "write-up →",
      },
    },
  ],
  experience: [
    {
      company: "OVHcloud",
      role: "Senior Software Engineer — Baremetal System Network",
      period: "Jul 2025 — Present",
      location: "Brest, France",
      bullets: [
        "Modernizing and scaling legacy network management systems for reliability, maintainability, and operational performance.",
        "Built and optimized batch processes in Perl and Go to automate configuration and management of network overlays.",
        "Implemented observability metrics that exposed bottlenecks and enabled measurable performance improvements.",
        "Designed Kubernetes architectures, containerized services with Docker/KEDA, and supported production operations with SRE teams.",
      ],
      stack: ["Go", "Perl", "Kubernetes", "Docker", "KEDA"],
    },
    {
      company: "OVHcloud",
      role: "Software Engineer — Network Defense Orchestration",
      period: "Feb 2024 — Sep 2025",
      location: "Brest, France",
      bullets: [
        "Built gRPC-based, event-driven applications to orchestrate OVHcloud’s anti-DDoS infrastructure.",
        "Designed a low-latency gRPC streaming orchestration service for real-time traffic analysis under high load.",
        "Developed a high-performance rule-processing engine for threat mitigation across infrastructure up to 1.3 Tbit/s.",
        "Operated Kubernetes microservices and data models in MongoDB/PostgreSQL for high-throughput ingestion and querying.",
      ],
      stack: ["Go", "gRPC", "Kubernetes", "MongoDB", "PostgreSQL", "Helm"],
    },
    {
      company: "OVHcloud",
      role: "Software Engineer — Network Automation",
      period: "Sep 2021 — Feb 2024",
      location: "Paris, France",
      bullets: [
        "Designed APIs to manage the overlay network layer using Go, TemporalIO, PostgreSQL, Kubernetes, and Domain-Driven Design.",
        "Maintained and optimized high-traffic Python applications supporting the network underlay.",
        "Automated Arista EOS and Juniper Junos configurations; contributed to BYOIP and Additional IP workflows.",
        "Advocated Agile and DDD practices and coordinated delivery across product and engineering stakeholders.",
      ],
      stack: ["Go", "TemporalIO", "PostgreSQL", "Python", "Kubernetes", "DDD"],
    },
    {
      company: "ORNESS",
      role: "DevOps Engineer",
      period: "Jul 2019 — Sep 2021",
      location: "Paris, France",
      bullets: [
        "Ran performance tests with Prometheus and Grafana to isolate bottlenecks and guide improvements.",
        "Built infrastructure automation with Terraform and Kubernetes; maintained Python/Flask backends and Jenkins CI/CD.",
        "Contributed to OpenStack source code in a Scrum environment.",
      ],
      stack: ["Python", "Terraform", "Kubernetes", "Jenkins", "Prometheus", "Grafana"],
    },
    {
      company: "Ekumen (InOrbit)",
      role: "Full Stack Engineer",
      period: "Jan 2018 — Dec 2018",
      location: "Buenos Aires, Argentina",
      bullets: [
        "Designed and developed a robotic fleet control cloud application using ROS, ReactJS, Node.js, and Jest.",
        "Improved CI/CD with Jenkins, Docker, and AWS ECS; built simulations and testbenches for robotic navigation in Python.",
      ],
      stack: ["ROS", "React", "Node.js", "Python", "Docker", "AWS ECS"],
    },
    {
      company: "IMT Atlantique",
      role: "R&D Software Intern",
      period: "Jul 2017 — Jan 2018",
      location: "Brest, France",
      bullets: [
        "Built a production-like cloud application for CHRU Brest under a European-funded research program.",
        "Published “An implementation of an imitation game with ASD children to learn nursery rhymes.”",
      ],
      stack: ["JavaScript", "Python", "Node.js", "gRPC", "C++"],
    },
    {
      company: "Ideamatic",
      role: "Junior Full Stack Developer",
      period: "Jul 2015 — Jan 2017",
      location: "Buenos Aires, Argentina",
      bullets: [
        "Designed and implemented a 3D graphics rendering application with ReactJS and PHP/CakePHP.",
      ],
      stack: ["JavaScript", "React", "PHP"],
    },
  ],
  education: [
    {
      school: "IMT Atlantique (Telecom Bretagne)",
      degree: "Telecom Engineer",
      period: "2019",
      location: "Brest, France",
      detail: "Telecommunications, networking, and software systems.",
    },
    {
      school: "Universidad de Buenos Aires",
      degree: "Electronic Engineer",
      period: "2017",
      location: "Buenos Aires, Argentina",
      detail: "Networking, distributed systems, and embedded development.",
    },
  ],
} as const;

export type Profile = typeof profile;
