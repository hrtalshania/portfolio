// ============================================================================
// PORTFOLIO DATA — Harshit Talshania
// All content renders from this one file (see js/render.js).
// Featured projects and more-projects share the same shape: each has a slug
// and full detail content, rendered on projects/index.html?id=<slug>.
// ============================================================================

const portfolioData = {
  meta: {
    title: "Harshit Talshania | Software Engineer",
    description:
      "Software engineer building complete systems: APIs, databases, real-time apps, and the UIs that use them. Working daily with .NET, Angular, and Blazor.",
  },

  nav: {
    logo: "HRT",
    links: [
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Skills", href: "#technology" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    resume: "resume/Harshit_Talshania_Resume.pdf",
  },

  hero: {
    title: "Software Engineer",
    name: "Harshit Talshania",
    subtitle: "Clean UI · Backend Systems · APIs · Databases · Real-Time Apps",
    description:
      "I build complete systems, from the database schema up to the screen. I like knowing how each piece works under the hood, and I hold myself to one rule: it is not done until it runs and I have seen it work. I also enjoy the UI side: building clean, responsive interfaces in Angular and Blazor that people actually like using.",
    tagline: "Working at Sky9 IT Craft Private Limited, Rajkot",
    taglineUrl: "https://sky9itcraft.com/",
    image: "assets/HRT_image4.jpg",
    monogram: "HRT",
    ctaPrimary: "View Projects",
    ctaSecondary: "Contact Me",
  },

  services: [
    {
      title: "Ship a feature end to end",
      description:
        "I take features from idea to done: the API, the database layer, and the frontend that uses them, whether that is Angular or Blazor. One person, one working feature.",
      icon: "code",
    },
    {
      title: "APIs that behave predictably",
      description:
        "Clean backend systems with proper authentication, predictable error handling, and data flow you can trace with your eyes closed.",
      icon: "api",
    },
    {
      title: "A data model that survives growth",
      description:
        "Relational schemas in PostgreSQL and SQL Server, designed before a single line of code. Most hard problems turn out to be data modeling problems.",
      icon: "database",
    },
    {
      title: "Get it live, keep it live",
      description:
        "Deployment and hosting that holds up: I have shipped on Netlify and Render, self hosted a full platform on an Oracle free tier VM, and worked with Azure storage in production.",
      icon: "cloud",
    },
    {
      title: "AI features that actually ship",
      description:
        "Chat applications, AI agents, and messaging bridges. I build practical AI powered features and treat the agents as tools I direct, review, and hold to a standard.",
      icon: "robot",
    },
    {
      title: "Tests that run without me",
      description:
        "Playwright flows that run on their own and capture screenshots automatically, plus unit tests where they matter. If it is not tested, I do not call it done.",
      icon: "test",
    },
    {
      title: "Learning & Problem Solving",
      description:
        "The part I enjoy most: picking up new topics, doing the research, and sitting with a problem until it makes sense. Every project ends with lessons I write down and reuse.",
      icon: "compass",
    },
  ],

  approach: {
    title: "How I Work",
    subtitle: "The same loop on every project, big or small",
    steps: [
      {
        title: "Understand the Problem",
        description:
          "Before any code, I make sure I know what the feature should actually do and for whom. Most bad code traces back to a problem that was never really understood.",
      },
      {
        title: "Model the Data Early",
        description:
          "I design the database and API contracts first. Time and again, what looks like an architecture problem turns out to be a data modeling problem.",
      },
      {
        title: "Build in Working Slices",
        description:
          "UI, API, validation, business logic, data. One vertical slice at a time, so there is always something runnable instead of half finished layers that never meet.",
      },
      {
        title: "Verify, Don't Assume",
        description:
          "I run the app, hit the failure paths, and check the real output. Code is not finished because it was written. Mine or generated, it has to prove itself.",
      },
      {
        title: "Use AI as Leverage, Not Judgment",
        description:
          "I work with coding agents daily and they genuinely make me faster. But scope, context, and review stay with me. The engineering decisions are mine to own.",
      },
    ],
  },

  // Featured projects: summary card on the home page, full case study on
  // projects/index.html?id=<slug>.
  projects: [
    {
      slug: "arenahub",
      title: "ArenaHub",
      featured: true,
      summary:
        "A turf booking platform: find venues on a map, pick a slot, pay online. Built solo, from the schema to the UI.",
      problem:
        "Booking a sports turf where I live still happens over phone calls and Instagram DMs. Nobody can see which slots are free, there is no booking history, and payments are a mess of UPI screenshots.",
      solution:
        "I designed and built the whole platform myself. Venue owners list their grounds, players find them on a map, pick an open slot, and pay online. It covers the full journey: PostgreSQL schema, API, authentication, payments, and the Angular UI. It runs as an Angular frontend on Netlify with the ASP.NET Core API and PostgreSQL database on Render.",
      features: [
        "Map based venue discovery with Leaflet and location search",
        "Google sign in, verified on the server before a session is issued",
        "Slot selection with live availability",
        "Online payments through Razorpay",
        "Venue images uploaded to Cloudflare R2",
        "PostgreSQL with spatial queries for nearby venues",
      ],
      tech: [
        "ASP.NET Core Minimal API",
        "Angular",
        "PostgreSQL",
        "Razorpay",
        "Cloudflare R2",
        "Leaflet",
      ],
      gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg","7.jpg","8.jpg"],
      links: {
        live: "https://staging-arenahub.netlify.app/",
        liveNote:
          "Hosted on free plans, so the backend sleeps when idle. If it does not respond right away, give it 5 to 10 minutes to boot and try again.",
        github: "#",
        githubLabel: "Code on request",
      },
      learnings:
        "This was the first project where I carried every layer alone, and it changed how I estimate work. The schema, auth, and payments went smoothly. What actually ate the time was everything around the happy path: failed payments, expired sessions, half filled venue profiles, and the quirks of free tier hosting.",
    },
    {
      slug: "algo-trade",
      title: "Algo Trade Dashboard",
      featured: true,
      summary:
        "A real-time trading dashboard that streams broker market data over WebSocket into one live view.",
      problem:
        "Manual trading means juggling multiple broker screens while signals last for seconds. There is no single view of positions, orders, and market depth, and reacting by hand is simply too slow.",
      solution:
        "I built a dashboard where a Python backend connects to broker APIs and market data feeds over WebSocket and streams everything to an Angular UI. Positions, orders, depth, and signal alerts update live in one place. The Angular frontend is on Netlify and the Python API on Render, both on free tiers.",
      features: [
        "Live WebSocket connection to broker market feeds",
        "Positions, orders, and market depth in a single view",
        "Strategy signal alerts pushed straight to the UI",
        "A FastAPI service layer sitting between the broker and the frontend",
      ],
      tech: ["Python", "FastAPI", "Angular", "WebSocket", "Broker APIs"],
      gallery: [],
      links: {
        live: "https://algo-trade-by-hrt.netlify.app",
        liveNote:
          "Hosted on free plans, so the backend sleeps when idle. If it does not respond right away, give it 5 to 10 minutes to boot and try again.",
        github: "#",
        githubLabel: "Code on request",
      },
      learnings:
        "The hard part was not the charts. It was treating the feed as unreliable: reconnects, out of order ticks, and stale data all had to be handled. Working with live market data taught me to be suspicious of anything that looks too smooth.",
    },
    {
      slug: "blazingauth",
      title: "BlazingAuth",
      featured: true,
      summary:
        "A complete authentication system built from scratch: tokens, refresh rotation, roles, and protected routes.",
      problem:
        "Most auth demos stop at a login page. There is no token lifecycle, no refresh handling, and no role separation, which is exactly where real applications get burned.",
      solution:
        "I built the full thing myself: registration and login with proper password hashing, JWT access tokens with refresh token rotation, role based policies, and protected routes on both the API and the frontend. Nothing borrowed, so I understand every moving part.",
      features: [
        "Login and signup with proper password hashing",
        "JWT access tokens paired with refresh token rotation",
        "Role based authorization policies",
        "Protected frontend routes and API endpoints",
      ],
      tech: ["ASP.NET Core", "JWT", "Blazor", "SQL Server"],
      gallery: [],
      links: {
        github: "#",
        githubLabel: "Code on request",
      },
      learnings:
        "Building auth once, properly, beats reading ten articles about it. I now know exactly what a refresh token is doing, why rotation matters, and where a shortcut taken today becomes a security hole next year.",
    },
    {
      slug: "cab-booking",
      title: "Cab Booking Platform",
      featured: true,
      summary:
        "A cab booking platform I self host on my own Oracle VM, with a DuckDNS domain and WhatsApp driven customer flows.",
      problem:
        "Local cab booking runs on phone calls and memory. Bookings, driver assignments, and customer history all live in someone's head or a notebook, and nothing scales that way.",
      solution:
        "I built a booking platform with .NET APIs and an Angular frontend, then went a step further and self hosted the whole thing. It runs on an Oracle Cloud free tier VM that I set up and maintain myself, with DNS handled through a free DuckDNS domain. That gave me end to end ownership, from the code to the server it runs on.",
      features: [
        "Booking flow with ride details and driver assignment",
        "WhatsApp oriented CRM flows for customer communication",
        "Self hosted on an Oracle Cloud free tier VM I configured myself",
        "DuckDNS free domain with DNS and HTTPS set up by hand",
        "Angular frontend and .NET APIs running on the same server",
      ],
      tech: ["ASP.NET Core", "Angular", "Oracle Cloud", "DuckDNS", "Linux"],
      gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"],
      links: {
        live: "https://ruhicabs.duckdns.org/",
        liveNote:
          "This runs on my own free tier VM, so it is usually up and running. If it is briefly unreachable, give it a minute and reload.",
        github: "#",
        githubLabel: "Code on request",
      },
      learnings:
        "Running my own server taught me things no tutorial covers: SSH hardening, firewall rules, keeping services alive after I close the terminal, and what it feels like when your own site goes down with no support team to call. It is a different kind of responsibility, and I like it.",
    },
  ],

  // Compact secondary projects on the home page. Each also has a full
  // detail page via projects/index.html?id=<slug>.
  moreProjects: [
    {
      slug: "bridge-messaging",
      title: "Bridge Messaging",
      summary:
        "A Slack, Discord, and Telegram bridge built by vibe coding with AI agents. Now growing into a Slack client in .NET MAUI.",
      tech: "Python · AI Agents",
      problem:
        "I wanted my messages from Slack, Discord, and Telegram in one place. Existing tools did not handle replies, reactions, threads, and files the way I needed, so I set out to build my own bridge.",
      solution:
        "I built the entire thing by vibe coding with AI agents, and it turned into my best lesson in directing them well. I started with a simple Telegram bot to learn how tokens, webhooks, and message flow actually work. Telegram's UI constraints pushed me to Discord, and once that worked I bridged the two platforms. When the server doing most of the heavy lifting started to cost money, I decided to flip the model: build a proper client for Slack as a .NET MAUI app so more of the work happens on the device. That part is still in progress.",
      features: [
        "Started with a Telegram bot to learn tokens and message flow from the inside",
        "Moved to Discord after hitting Telegram's UI layout limits",
        "Bridged the two platforms: replies, reactions, threads, and documents stay in sync",
        "Learned how Slack tokens and scopes actually work along the way",
        "Slack client in .NET MAUI, vibe coded with agents, currently in progress",
      ],
      techList: [
        "Python",
        "Slack API",
        "Discord API",
        "Telegram API",
        ".NET MAUI",
      ],
      gallery: [],
      learnings:
        "This project taught me two things at once. On the technical side, how different messaging platform APIs really are. On the working side, how to use AI agents as collaborators: give them one small step at a time, verify every result, and keep the architectural decisions for myself.",
      github: "#",
    },
    {
      slug: "ayurbeat",
      title: "Ayurbeat",
      summary:
        "An Ayurvedic multi-vendor e-commerce platform in PHP, with a storefront and an admin dashboard.",
      tech: "PHP · MySQL",
      problem:
        "This was my final year project, and my goal was to understand how a complete e-commerce flow works end to end: catalog, cart, orders, and the admin side that manages it all.",
      solution:
        "I built a multi vendor e-commerce site in PHP where customers shop for Ayurvedic products and retailers list and sell their own. Building it in plain PHP, before I knew frameworks well, forced me to handle routing, sessions, and queries myself.",
      features: [
        "Storefront with a product catalog",
        "Cart and order flow for customers",
        "Multi vendor setup: retailers manage their own listings",
        "Admin dashboard for products and orders",
      ],
      techList: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
      gallery: [],
      learnings:
        "Working in plain PHP first gave me a real feel for the problems that frameworks like ASP.NET MVC solve every day. I understand what a framework gives me now because I once paid that cost by hand.",
      github: "#",
    },
    {
      slug: "student-management",
      title: "Student Management System",
      summary:
        "A MERN stack CRUD system, my first full dive into the JavaScript ecosystem.",
      tech: "MongoDB · Express · React · Node",
      problem:
        "I wanted one project that touches everything a web application needs: forms, validation, related data, and a clean API, all in a stack I had not used before.",
      solution:
        "I built a student management system with MongoDB, Express, React, and Node. Records, courses, and results all live behind a REST API with proper validation, and the React frontend consumes it.",
      features: [
        "Full CRUD over student records and results",
        "REST API with validation and error handling",
        "React frontend wired to the API",
      ],
      techList: ["MongoDB", "Express", "React", "Node.js"],
      gallery: [],
      learnings:
        "It showed me something useful: the patterns I now use in .NET, like routing, validation, and data modeling, show up in every stack. Learning a second stack made the first one make more sense.",
      github: "#",
    },
    {
      slug: "capacitor-mobile-app",
      title: "Capacitor Mobile App",
      summary:
        "A cross platform mobile app built from web tech with Capacitor, tested through the Android build tooling.",
      tech: "Angular · Capacitor",
      problem:
        "I wanted to ship a web app to Android without starting over in a native language, and I wanted to know how far web code can go on a real device.",
      solution:
        "I packaged an Angular application as a mobile app with Capacitor JS, built it with the Android tooling, and tested it on real devices to see how web code behaves next to native features.",
      features: [
        "Angular web app wrapped with Capacitor",
        "Android build pipeline and device testing",
        "Native plugin access from regular web code",
      ],
      techList: ["Angular", "Capacitor", "Android"],
      gallery: [],
      learnings:
        "Mobile testing always surprises you: screen sizes, permissions, and lifecycle events behave differently than in the browser. It taught me where the web ends and the device begins.",
      github: "#",
    },
  ],

  technologies: {
    "Primary Stack": [
      "C#",
      "ASP.NET Core (Minimal APIs)",
      "Blazor",
      "EF Core",
      "LINQ",
      "SQL Server",
      "PostgreSQL",
    ],
    Frontend: [
      "Angular",
      "TypeScript",
      "Blazor",
      "JavaScript",
      "HTML/CSS",
      "Leaflet",
    ],
    "Real-Time & Integrations": [
      "WebSocket",
      "Razorpay",
      "Google Auth",
      "Azure Blob Storage",
      "Cloudflare R2",
      "Broker APIs",
    ],
    "Earlier & Auxiliary": [
      "Python",
      "FastAPI",
      "PHP",
      "Node.js",
      "React",
      "MongoDB",
      "Capacitor",
    ],
    "Tools & DevOps": [
      "Git",
      "GitHub",
      "Postman",
      "Docker",
      "Playwright",
      "Netlify",
      "Render",
      "Oracle Cloud",
      "Visual Studio",
      "VS Code",
    ],
  },

  technologiesNote:
    "In today's AI era, memorizing a specific stack matters less than it used to. AI can already write good code in almost any language. What still separates engineers is understanding the core principles and building blocks underneath: how HTTP actually works, how databases store and retrieve data, how auth flows hold together, and how the pieces of a system talk to each other.",

  experience: [
    {
      company: "Sky9 IT Craft Private Limited",
      location: "Rajkot, Gujarat, India · On-site",
      role: "Software Engineer (Full-Stack .NET)",
      period: "Aug 2024 · Present",
      companyUrl: "https://sky9itcraft.com/",
      responsibilities: [
        "Started with a 6 month internship on a live project, contributing to backend development and Blazor UI",
        "Now work across the full development lifecycle, from building and debugging to APIs, databases, cloud, and deployment",
      ],
      clientProjects: [
        {
          name: "DownWind Aviation",
          description:
            "A complete solution for aircraft ownership and flight record management. Pilots, aircraft owners, and other authorized users book aircraft, and every flight's details are logged in the pilot techlog for record keeping. Includes document uploads, expense tracking, and multi factor authentication, with GoCardless payment integration.",
          tech: "Blazor · SQL Server · Azure Storage · Radzen",
        },
        {
          name: "Presort EMS",
          description:
            "An enterprise mailing platform used by some of the largest mailing services organizations in the US. Worked on legacy RDLC PDF generation and the payment, invoice, and reconciliation management flows.",
          tech: "Blazor · RDLC · SQL Server · FileZilla · Radzen · Ant Design Blazor",
        },
        {
          name: "Country Style",
          description:
            "A UK waste management company. Built a dedicated admin panel with secure authentication and a multi tab interface covering bookings, invoices, reports, and analysis, plus an interactive site map using latitude and longitude. Chart and graph views across garbage collection, sorting, material waste, and disposables, running on multiple SQL servers with Azure functionality.",
          tech: "Blazor · SQL Server · Radzen",
        },
      ],
      note: "All three are client products, so I describe my role and the technology, not the codebase.",
    },
    {
      company: "Freelance & Personal Projects",
      location: "",
      role: "Developer",
      period: "Ongoing",
      responsibilities: [
        "ArenaHub, a turf booking platform built solo end to end and deployed live",
        "Algo Trade, a real time market data dashboard with WebSocket feeds",
        "Cab booking platform, self hosted on my own Oracle VM",
        "Bridge Messaging, a Slack, Discord, and Telegram bridge built with AI agents",
        "Earlier work: PHP e-commerce, MERN applications, and mobile apps with Capacitor",
      ],
    },
  ],

  education: {
    degree: {
      title: "Bachelor of Engineering, Computer Engineering",
      field: "Gujarat Technological University (GTU)",
      details: "2022 to 2025",
    },
    diploma: {
      title: "Diploma in Computer Engineering",
      field: "A.V. Parekh Technical Institute, Rajkot",
      details: "2019 to 2022 · Grade A",
    },
  },

  about: {
    title: "About Me",
    content:
      "I'm a software engineer from Rajkot, Gujarat, currently working at Sky9 IT Craft on real client products. My day to day is mostly .NET services, Angular frontends, and Blazor UIs.\n\nI got into programming through web development, first with PHP and then the MERN stack. That path is why I feel at home on both sides of an API. These days I like going deep: how the pieces work under the hood, not just how to wire them up.\n\nI work with AI coding agents every day and get real leverage from them, but I keep the judgment on my side. Scope, review, and decisions stay with me. And I stay curious: new topics, research, and problem solving are the parts of this job I genuinely enjoy.",
    interests: [
      "Backend Systems",
      "Real-Time Apps",
      "Database Design",
      "Self Hosting",
      "AI Assisted Development",
    ],
    principles: [
      "Keep systems as simple as the requirements allow. Complexity has to earn its place.",
      "Write code the next person can read, including future me.",
      "A finished, working project beats ten promising prototypes.",
      "Stay curious: research new topics, sit with hard problems, and write down what they teach.",
    ],
  },

  contact: {
    title: "Get In Touch",
    subtitle: "Looking for a software engineer? Let's talk.",
    description:
      "Open to full time roles, freelance work, and interesting systems problems. Email is the fastest way to reach me.",
    email: "hrtalshania@gmail.com",
    socials: [
      {
        platform: "GitHub",
        url: "https://github.com/hrtalshania",
        icon: "github",
      },
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/harshit-talshania/",
        icon: "linkedin",
      },
      { platform: "Email", url: "mailto:hrtalshania@gmail.com", icon: "mail" },
    ],
    form: {
      enabled: false,
      endpoint: "#",
    },
  },

  footer: {
    copyright: "© 2026 Harshit Talshania",
    tagline: "Software Engineer · Rajkot, India",
  },
};
