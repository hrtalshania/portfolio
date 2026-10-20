// ============================================================================
// PORTFOLIO DATA — Harshit Talshania
// All "#" links / "TODO" fields are placeholders. Fill them one by one.
// ============================================================================

const portfolioData = {
  meta: {
    title: "Harshit Talshania | Software Developer — .NET",
    description: "Software Developer focused on .NET: ASP.NET Core Minimal APIs, Angular and Blazor. Full-stack systems — APIs, databases, real-time apps."
  },

  nav: {
    logo: "HT",
    links: [
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Skills", href: "#technology" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" }
    ],
    // TODO: place your real resume PDF at resume/Harshit_Talshania_Resume.pdf
    resume: "resume/Harshit_Talshania_Resume.pdf"
  },

  hero: {
    title: "Software Developer",
    subtitle: ".NET · ASP.NET Core · Angular · Blazor",
    description: "I build complete systems — APIs, databases, and the UIs that use them. Currently focused on the .NET ecosystem: ASP.NET Core Minimal APIs, Angular frontends, and Blazor for client products.",
    tagline: "Working at Sky9 IT Craft Private Limited, Rajkot",
    ctaPrimary: "View Projects",
    ctaSecondary: "Contact Me"
  },

  services: [
    {
      title: "Full-Stack .NET Development",
      description: "End-to-end features: ASP.NET Core APIs, database layer, and an Angular or Blazor frontend wired to them.",
      icon: "code"
    },
    {
      title: "API & Backend Systems",
      description: "Minimal APIs with authentication (Google, JWT, refresh tokens), clean data flow, and proper error handling.",
      icon: "api"
    },
    {
      title: "Database Design",
      description: "Relational schema design and querying with PostgreSQL and SQL Server via EF Core — modeled before code is written.",
      icon: "database"
    },
    {
      title: "Real-Time & Integrations",
      description: "WebSocket-driven live data UIs, payment gateways (Razorpay), object storage (Azure Blob, Cloudflare R2), and broker APIs.",
      icon: "architecture"
    }
  ],

  approach: {
    title: "How I Work",
    subtitle: "Understand first, then build — with verification at every step",
    steps: [
      {
        title: "Understand the Problem",
        description: "Get the domain right before the code. What should actually work when this is done?"
      },
      {
        title: "Model the Data",
        description: "I design the database and API contracts first — most architecture problems are data-modeling problems in disguise."
      },
      {
        title: "Build in Vertical Slices",
        description: "UI → API → validation → business logic → data, one working slice at a time instead of layers built blind."
      },
      {
        title: "Verify, Don't Assume",
        description: "Run the app, test the failure paths, check the actual output. Generated code is not finished code until it's tested."
      },
      {
        title: "Use AI as Leverage, Not Judgment",
        description: "I work daily with coding agents — I direct them with clear scope and context, review everything, and keep engineering decisions mine."
      }
    ]
  },

  philosophy: {
    title: "Engineering Philosophy",
    content: "Understand the problem before choosing the tool.",
    principles: [
      "Systems as simple as the requirements allow — no microservices before the problem asks for one",
      "Evidence over confidence: tests, logs, and screenshots beat assumptions",
      "Maintainable structure over clever fixes",
      "A finished, demonstrable project beats ten prototypes"
    ]
  },

  projects: [
    {
      title: "ArenaHub",
      featured: true,
      problem: "On-demand sports turf booking is still done over phone calls and Instagram DMs — no availability view, no payments, no booking history.",
      solution: "A full booking platform: map-based venue discovery, Google authentication, slot selection, and online payments — designed and built by me, from the PostgreSQL schema to the Angular UI.",
      features: [
        "Leaflet map with venue locations and geolocation search",
        "Google authentication with server-side token verification",
        "Razorpay payment gateway integration",
        "File uploads (venue images) to Cloudflare R2",
        "Deployed: frontend on Netlify, API on Render",
        "PostgreSQL with spatial data queries"
      ],
      tech: ["ASP.NET Core Minimal API", "Angular", "PostgreSQL", "Razorpay", "Cloudflare R2", "Leaflet"],
      links: {
        // TODO: fill real URLs
        github: "#",
        demo: "#",
        githubLabel: "Code (on request)" // use "Code" if repo is public
      }
    },
    {
      title: "Trading Dashboard",
      featured: true,
      problem: "Manual trading means watching multiple broker screens for signals that last seconds — and no single view of positions and market data.",
      solution: "A real-time trading dashboard: Python backend consuming broker APIs and market data over WebSocket, streamed to an Angular UI with live updating charts and order handling.",
      features: [
        "Real-time WebSocket connection to broker market feeds",
        "Live positions, orders, and market depth in one view",
        "Strategy signal alerts delivered to the UI",
        "Python/FastAPI service layer between broker APIs and frontend"
      ],
      tech: ["Python", "FastAPI", "Angular", "WebSocket", "Broker APIs"],
      links: {
        // TODO: fill real URLs
        github: "#",
        demo: "#",
        githubLabel: "Code (on request)"
      }
    },
    {
      title: "BlazingAuth",
      featured: true,
      problem: "Most demos stop at a login page with zero real security — no token lifecycle, no refresh handling, no role separation.",
      solution: "A complete authentication/authorization system built from scratch: registration, login, refresh-token rotation, role-based access, and protected API endpoints — the way it should actually be done.",
      features: [
        "Login / signup with proper password hashing",
        "JWT access tokens with refresh-token rotation",
        "Role-based authorization policies",
        "Protected frontend routes and API endpoints"
      ],
      tech: ["ASP.NET Core", "JWT", "Blazor", "SQL Server"],
      links: {
        // TODO: fill real URLs
        github: "#",
        demo: "#",
        githubLabel: "Code (on request)"
      }
    }
  ],

  // Compact secondary projects — one-liners, no big cards.
  moreProjects: [
    {
      title: "Bridge Messaging",
      description: "Slack ↔ Discord ↔ Telegram bridge in Python: replies, reactions, threads, documents, and message sync across all three platforms.",
      tech: "Python",
      // TODO:
      github: "#"
    },
    {
      title: "Ayurbeat",
      description: "E-commerce platform in PHP — storefront, product catalog, and admin dashboard.",
      tech: "PHP",
      // TODO:
      github: "#"
    },
    {
      title: "Student Management System",
      description: "MERN-stack CRUD system — my early dive into the full JavaScript stack.",
      tech: "MongoDB · Express · React · Node",
      // TODO:
      github: "#"
    },
    {
      title: "Capacitor Mobile App",
      description: "Cross-platform mobile app built on web tech with Capacitor JS, tested with Android build tooling.",
      tech: "Angular · Capacitor",
      // TODO:
      github: "#"
    }
  ],

  technologies: {
    "Primary — .NET Stack": ["C#", "ASP.NET Core (Minimal APIs)", "Blazor", "EF Core", "LINQ", "SQL Server", "PostgreSQL"],
    "Frontend": ["Angular", "TypeScript", "Blazor", "JavaScript", "HTML/CSS", "Leaflet"],
    "Real-Time & Integrations": ["WebSocket", "Razorpay", "Google Auth", "Azure Blob Storage", "Cloudflare R2", "Broker APIs"],
    "Earlier & Auxiliary": ["Python", "FastAPI", "PHP", "Node.js", "React", "MongoDB", "Capacitor"],
    "Tools & DevOps": ["Git", "GitHub", "Postman", "Docker", "Netlify", "Render", "Visual Studio", "VS Code"]
  },

  experience: [
    {
      company: "Sky9 IT Craft Private Limited, Rajkot",
      role: "Software Developer",
      period: "TODO: fill dates",
      companyUrl: "https://sky9itcraft.com/",
      responsibilities: [
        "Development on DownWind Aviation — a Blazor-based client product built with C#/.NET, domain-driven design, EF Core, and SQL Server",
        "Implemented file storage with Azure Blob Storage and payment gateway flows",
        "Full-stack contribution: backend services and Blazor UI, following the company's .NET practices"
      ],
      note: "DownWind is a company product for a client, so I show the technology and my role — not the codebase."
    },
    {
      company: "Freelance / Personal Projects",
      role: "Developer",
      period: "Ongoing",
      responsibilities: [
        "ArenaHub — built solo end to end and deployed for live testing",
        "Trading dashboard — real-time market data pipeline and UI",
        "Earlier work: PHP e-commerce, MERN-stack applications, mobile apps with Capacitor"
      ]
    }
  ],

  education: {
    degree: {
      title: "Diploma in Computer Engineering",
      field: "Government Engineering College (GEC), Rajkot",
      // TODO: add years
      details: "TODO: years"
    },
    diploma: {
      title: "AVPTI Rajkot",
      // TODO: confirm exact program name
      details: "TODO: program name and years"
    }
  },

  about: {
    title: "About Me",
    content: "I'm a software developer from Rajkot, Gujarat, currently working with the .NET ecosystem — ASP.NET Core APIs, Angular frontends, and Blazor on real client products.\n\nI got into programming through web development — PHP, then MERN — which is why I feel at home on both sides of an API. These days I go deep on .NET: how the pieces work under the hood, not just how to wire them up.\n\nWhat I care about most is making systems that actually work end to end — schema, service, screen — and being able to explain every decision in them. I also work closely with coding agents daily, treating them as powerful tools to direct and review, never as a substitute for judgment.",
    interests: ["Full-Stack .NET", "Real-Time Systems", "Database Design", "AI-Assisted Development"]
  },

  contact: {
    title: "Get In Touch",
    subtitle: "Have a project or a role where .NET matters? Let's talk.",
    description: "Open to remote jobs, freelance work, and interesting systems problems.",
    email: "TODO@your.email", // TODO: real email
    socials: [
      { platform: "GitHub", url: "#", icon: "github" },      // TODO: real URL
      { platform: "LinkedIn", url: "#", icon: "linkedin" },  // TODO: real URL
      { platform: "Email", url: "mailto:TODO@your.email", icon: "mail" } // TODO: real email
    ],
    form: {
      enabled: false,
      endpoint: "#"
    }
  },

  footer: {
    copyright: "© 2026 Harshit Talshania",
    tagline: "Software Developer · .NET · Angular · Blazor"
  }
};
