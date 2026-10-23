// =====================================================================
// Brand content — the single source of truth for who Faysal is and
// what he offers. Everything here must be verifiable: it is sourced
// from the CV, public GitHub repositories and live product URLs.
// Do not add metrics or claims that cannot be backed by a link.
// =====================================================================

export const PROFILE = {
  name: "Faysal Islam Fahad",
  legalName: "MD. Faysal Islam Fahad",
  firstName: "Faysal",
  role: "Full-stack AI engineer",
  location: "Dhaka, Bangladesh",
  timezone: "GMT+6",
  email: "faysalislamfd@gmail.com",
  /** The one line the brand is built on. */
  principle: "Models where they help. Code where it has to be right.",
  headline: "AI products, engineered end to end.",
  intro:
    "I build LLM features, agents and ML models together with the backend and interface they live in — so you get one working product, not a demo and a handoff.",
  availability: "Taking on new projects",
  responseTime: "Replies within 24h",
  /** Used for meta descriptions and structured data. */
  description:
    "Faysal Islam Fahad is a full-stack AI engineer who builds LLM features, AI agents, RAG systems and ML models end to end — with the backend and interface around them. Based in Dhaka, working with clients worldwide.",
} as const;

export type Channel = {
  label: string;
  href: string;
  handle: string;
  icon: "mail" | "github" | "linkedin" | "x" | "fiverr";
};

export const CHANNELS: Channel[] = [
  {
    label: "Email",
    href: `mailto:${PROFILE.email}`,
    handle: PROFILE.email,
    icon: "mail",
  },
  {
    label: "GitHub",
    href: "https://github.com/faysal-islam-fd",
    handle: "faysal-islam-fd",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/faysal-islam-fd",
    handle: "in/faysal-islam-fd",
    icon: "linkedin",
  },
  {
    label: "X",
    href: "https://x.com/faysal_islam_fd",
    handle: "@faysal_islam_fd",
    icon: "x",
  },
  {
    label: "Fiverr",
    href: "https://www.fiverr.com/faysalislamfd",
    handle: "faysalislamfd",
    icon: "fiverr",
  },
];

export const PRINCIPLES: { title: string; body: string }[] = [
  {
    title: "Deterministic where it must be right.",
    body:
      "Money, permissions, routing and anything with consequences is decided by plain code that can be tested and audited. Models read, interpret and draft — they don't get the final say.",
  },
  {
    title: "Guardrails are code, not prompts.",
    body:
      "A system prompt is a request. Validation, schema checks and post-processing are guarantees. Every model output is checked before a user or a database sees it.",
  },
  {
    title: "It keeps working when the model doesn't.",
    body:
      "Providers time out, keys expire, outputs drift. I design a safe fallback path for each model call so the product degrades gracefully instead of failing loudly.",
  },
  {
    title: "You own all of it.",
    body:
      "Code in your repository, prompts in version control, keys in your accounts, and no lock-in to a single model vendor. Swap providers without rewriting the product.",
  },
];

export const PROCESS: { step: string; title: string; body: string }[] = [
  {
    step: "01",
    title: "Intro call",
    body:
      "30 minutes, free. You walk me through the workflow; I ask about your data, your systems and what “done” means.",
  },
  {
    step: "02",
    title: "Written scope",
    body:
      "A short document: what gets built, what's explicitly out, milestones, and a price. No surprises later.",
  },
  {
    step: "03",
    title: "Build in the open",
    body:
      "A demo on a live staging URL every week. You see working software, not status reports.",
  },
  {
    step: "04",
    title: "Handover",
    body:
      "Your repository, deployment, documentation and tests. Support after launch if you want it.",
  },
];

export const EXPERIENCE: {
  period: string;
  title: string;
  org: string;
  body: string;
}[] = [
  {
    period: "2025 — now",
    title: "Independent AI engineer",
    org: "Self-directed products",
    body:
      "Designing and shipping AI products end to end, including Axo and SellWise, both live.",
  },
  {
    period: "Sep 2025 — May 2026",
    title: "Backend developer",
    org: "Rangpur IT",
    body:
      "Built and supported e-commerce features: REST APIs for product listings, categories, cart and dynamic content, with responsive, performance-conscious workflows.",
  },
  {
    period: "Education",
    title: "B.Sc. Computer Science & Engineering",
    org: "Bangladesh University of Business & Technology",
    body: "CGPA 3.75 / 4.",
  },
];

export const STACK: { group: string; items: string[] }[] = [
  {
    group: "LLM & agents",
    items: [
      "LangChain",
      "LangGraph",
      "RAG",
      "Model Context Protocol",
      "OpenRouter",
      "Gemini API",
      "Prompt engineering",
    ],
  },
  {
    group: "Machine learning",
    items: ["scikit-learn", "TensorFlow / Keras", "Prophet", "pandas", "NumPy"],
  },
  {
    group: "Backend",
    items: [
      "Python",
      "FastAPI",
      "Pydantic",
      "Node.js",
      "Express",
      "TypeScript",
      "REST APIs",
    ],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Flutter"],
  },
  {
    group: "Data",
    items: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Prisma",
      "Supabase",
      "Pinecone",
      "ChromaDB",
      "FAISS",
    ],
  },
  {
    group: "Delivery",
    items: ["Docker", "pytest", "Git", "Linux", "Vercel"],
  },
];
