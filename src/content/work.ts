// =====================================================================
// Case studies. Every fact below is taken from the project's public
// repository README, its live site, or the CV. When a detail is not
// public (team size, client names, traffic), it is left out rather
// than guessed.
// =====================================================================

/**
 * The visual grammar used in every "anatomy" diagram:
 * - code   → deterministic logic (solid outline)
 * - model  → probabilistic model output (dashed, signal colour)
 * - guard  → validation / safety layer (filled)
 * - data   → storage or inputs at rest (tinted)
 * - io     → what goes in and what comes out (plain)
 */
export type StageKind = "io" | "code" | "model" | "guard" | "data";

export type Stage = {
  kind: StageKind;
  label: string;
  detail?: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  /** One-line, plain-language description of what it is. */
  title: string;
  summary: string;
  year: string;
  status: "Live" | "Open source" | "Hackathon build";
  context?: string;
  links: { label: string; href: string }[];
  stack: string[];
  image?: { src: string; alt: string; width: number; height: number };
  anatomy: Stage[];
  problem: string;
  built: string[];
  decisions: { title: string; body: string }[];
  limits?: string[];
  /** Slug of the service this case study proves. */
  service: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "queuestorm-support-copilot",
    name: "QueueStorm Investigator",
    title: "A support copilot for digital finance that can't make promises it shouldn't.",
    summary:
      "Investigates customer complaints against transaction history and returns a structured, routable decision. Rules decide; the model only writes.",
    year: "2026",
    status: "Hackathon build",
    context: "SUST CSE Carnival 2026 — Codex Community Hackathon (team entry)",
    links: [
      {
        label: "Source on GitHub",
        href: "https://github.com/faysal-islam-fd/sust-cse-curnival",
      },
    ],
    stack: ["Python", "FastAPI", "Pydantic v2", "OpenRouter", "Gemini 2.5 Flash", "pytest", "Docker"],
    anatomy: [
      { kind: "io", label: "Ticket + transactions", detail: "Bangla, English or Banglish" },
      { kind: "guard", label: "Request validation", detail: "Pydantic v2 schemas" },
      { kind: "code", label: "Reasoning engine", detail: "Match, dedupe, route, set severity" },
      { kind: "model", label: "LLM drafting", detail: "Agent summary + customer reply only" },
      { kind: "guard", label: "Safety post-processor", detail: "No PIN/OTP asks, no refund promises" },
      { kind: "io", label: "Structured decision", detail: "Verdict, department, human-review flag" },
    ],
    problem:
      "In digital finance, support agents triage complaints like “I sent 5,000 taka to the wrong number” by hand: find the transaction, check whether the story matches it, set severity, route it. A language model can read the complaint well — but letting it decide refunds or escalations in a money product is a liability, and a single reply asking for an OTP is a phishing incident.",
    built: [
      "A FastAPI service with one endpoint, POST /analyze-ticket, returning a typed decision: matched transaction, evidence verdict, case type, severity, department, human-review flag, confidence and reason codes.",
      "A deterministic reasoning engine in Python for everything that has to be correct: transaction matching with Bangla-digit normalisation, duplicate-payment detection, established-recipient patterns, routing and severity.",
      "An LLM layer, called through OpenRouter, that is limited to drafting the agent summary and the customer reply.",
      "A safety post-processor that overwrites any draft that requests credentials, promises a refund or reversal, or points to unofficial support channels — plus prompt-injection checks on the incoming complaint.",
      "A pytest suite covering malformed input, Bangla and Banglish complaints, duplicate payments, merchant disputes, phishing reports and injection attempts; shipped as a multi-stage Docker image.",
    ],
    decisions: [
      {
        title: "The model never decides.",
        body:
          "Verdict, routing and severity come from rules that can be unit-tested and audited. The LLM only writes prose, so a bad generation costs tone, not money.",
      },
      {
        title: "Guardrails run after generation.",
        body:
          "Prompt instructions ask the model to behave; the post-processor makes sure it did. Unsafe drafts are replaced with safe templates before they leave the service.",
      },
      {
        title: "It works without the model.",
        body:
          "With no API key or an unreachable provider, the service falls back to rule-based templates and still returns a complete, valid decision.",
      },
      {
        title: "Built for how customers actually write.",
        body:
          "Complaints arrive in Bangla, English and mixed Banglish with Bangla numerals. Input is normalised before matching, so amounts and phone numbers line up with transaction records.",
      },
    ],
    limits: [
      "Evaluated against the hackathon's sample cases, not live support traffic.",
      "Transaction histories longer than about 100 entries are truncated to fit the context window.",
      "Offline-mode replies are safe but templated, so they read less naturally.",
    ],
    service: "ai-copilots-and-agents",
  },
  {
    slug: "axo-ai-product-planning-blueprint-generator",
    name: "Axo",
    title: "An AI product architect that turns an idea into a blueprint and build-ready prompts.",
    summary:
      "Describe a product in plain language; get a structured blueprint — features, user flows, stack, architecture — and prompts tuned for Lovable, Claude, Cursor and Bolt.",
    year: "2026",
    status: "Live",
    links: [{ label: "heyaxo.dev", href: "https://www.heyaxo.dev" }],
    stack: ["LLMs", "Prompt engineering", "Structured generation", "Agentic workflow"],
    image: {
      src: "https://zffkskrumcjlglvwohbp.supabase.co/storage/v1/object/public/projects/1792367443949-ab9776f0-47d1-4673-a966-3e269ef1594a.png",
      alt: "Axo interface: an idea prompt, a generated product blueprint with application architecture, and prompt export for AI coding tools.",
      width: 1448,
      height: 1086,
    },
    anatomy: [
      { kind: "io", label: "Product idea", detail: "Free text, any level of detail" },
      { kind: "model", label: "Blueprint", detail: "Features, user flows, stack, architecture" },
      { kind: "data", label: "Saved blueprint", detail: "The reviewable source of truth" },
      { kind: "model", label: "Builder prompts", detail: "Generated from the blueprint" },
      { kind: "io", label: "Export", detail: "Lovable · Claude · Cursor · Bolt" },
    ],
    problem:
      "AI app builders are fast but literal. A vague prompt produces a vague app, and every regeneration drifts further from what the founder meant. Most people starting with these tools don't have the product and architecture vocabulary to brief them well.",
    built: [
      "A planning workflow that turns a free-text idea into a structured blueprint: overview, features, user flows, tech stack and application architecture.",
      "Prompt generation per target tool, so one blueprint can be exported to Lovable, Claude, Cursor or Bolt.",
      "A public product with its own site and onboarding, live at heyaxo.dev.",
    ],
    decisions: [
      {
        title: "Plan first, prompt second.",
        body:
          "Prompts are generated from the blueprint, not from the raw idea. The blueprint is the artifact a founder reviews, so the decisions in it survive every regeneration.",
      },
      {
        title: "Meet builders where they are.",
        body:
          "Each AI coding tool responds to different prompt shapes. Exporting per tool keeps the blueprint neutral and the output specific.",
      },
    ],
    service: "ai-native-mvps",
  },
  {
    slug: "sellwise-business-intelligence",
    name: "SellWise",
    title: "Forecasts and customer intelligence for small online shops.",
    summary:
      "A business-intelligence dashboard with three ML modules — sales forecasting, customer segmentation and churn prediction — served from an independent Python microservice.",
    year: "2026",
    status: "Live",
    links: [
      { label: "Live app", href: "https://sellwise-one.vercel.app" },
      { label: "Source on GitHub", href: "https://github.com/faysal-islam-fd/sellwise" },
    ],
    stack: ["React", "Node.js", "Express", "PostgreSQL", "FastAPI", "Prophet", "Logistic regression"],
    anatomy: [
      { kind: "data", label: "Orders, customers, stock", detail: "PostgreSQL · CSV import" },
      { kind: "code", label: "Node.js REST API", detail: "Orders, inventory, invoices, reports" },
      { kind: "model", label: "Demand forecast", detail: "Prophet · 7 / 14 / 30 days" },
      { kind: "model", label: "Segments & churn", detail: "RFM · logistic regression" },
      { kind: "io", label: "Dashboard", detail: "Forecasts, customer risk, stock alerts" },
    ],
    problem:
      "Small online sellers keep their sales history in a spreadsheet or a basic shop backend, but have no way to answer the questions that decide cash flow: what will sell next month, which customers are slipping away, and what to reorder now.",
    built: [
      "An operations app for the day-to-day: products, orders, quick sell, invoices, expenses, CSV import and reports.",
      "Demand forecasting with Facebook Prophet over 7, 14 and 30-day windows, alongside reorder suggestions and inventory alerts.",
      "RFM-based customer segmentation and churn prediction with logistic regression.",
      "The ML layer as an independent FastAPI microservice, called from the Node.js API and backed by the same PostgreSQL database.",
    ],
    decisions: [
      {
        title: "ML as its own service.",
        body:
          "Python where the ML ecosystem is, Node.js where the product logic is. Models can be retrained or replaced without touching the app's API.",
      },
      {
        title: "Models a shop owner can trust.",
        body:
          "Prophet, RFM and logistic regression are explainable and work on the small datasets small shops actually have. No deep model where a simple one is enough.",
      },
    ],
    service: "predictive-analytics",
  },
  {
    slug: "university-rag-assistant",
    name: "BUBT AI Assistant",
    title: "A university chatbot that answers from official documents — and cites them.",
    summary:
      "Retrieval-augmented generation over university PDFs: upload a handbook, ask a question, get an answer with the source documents listed.",
    year: "2025",
    status: "Open source",
    links: [
      {
        label: "Source on GitHub",
        href: "https://github.com/faysal-islam-fd/BUBT-AI-assistant",
      },
    ],
    stack: ["TypeScript", "Node.js", "Express", "React", "Gemini", "FAISS"],
    anatomy: [
      { kind: "io", label: "University PDFs", detail: "Handbooks, admission guides" },
      { kind: "code", label: "Parse & chunk", detail: "1,000 chars · 200 overlap" },
      { kind: "model", label: "Embed", detail: "Gemini text-embedding-004" },
      { kind: "data", label: "FAISS index", detail: "Cosine similarity · persisted" },
      { kind: "model", label: "Grounded answer", detail: "Top-5 chunks → Gemini" },
      { kind: "io", label: "Answer + sources", detail: "Cited documents" },
    ],
    problem:
      "Admission rules, course policies and handbooks are spread across dozens of PDFs. Students ask the same questions again and again, and keyword search over PDFs rarely finds the paragraph that actually answers them.",
    built: [
      "An ingestion endpoint: upload a PDF, extract text, split it into overlapping chunks, embed each chunk and add it to a FAISS index saved to disk.",
      "A chat endpoint that embeds the question, retrieves the five most similar chunks and asks Gemini to answer from that context only — returning the answer, the source documents and the number of chunks used.",
      "A health endpoint that reports the vector count, and a React chat interface.",
    ],
    decisions: [
      {
        title: "Every answer shows its sources.",
        body:
          "Students can open the handbook the answer came from. A cited answer is checkable; an uncited one is a rumour.",
      },
      {
        title: "Overlapping chunks.",
        body:
          "A 200-character overlap keeps answers that straddle a chunk boundary retrievable.",
      },
      {
        title: "Index on disk.",
        body:
          "The FAISS index is persisted, so restarts don't mean re-embedding every document.",
      },
    ],
    limits: ["PDF upload is API-only; an admin upload screen is still on the roadmap."],
    service: "document-ai-rag",
  },
];

/** Smaller builds shown as a compact index — breadth, not headline proof. */
export const ALSO_BUILT: {
  name: string;
  description: string;
  stack: string;
  year: string;
  href: string;
}[] = [
  {
    name: "Smart Study",
    description: "Turns lecture PDFs, DOCX and notes into summaries, flashcards, quizzes and mind maps.",
    stack: "React · Node.js · MongoDB · Gemini",
    year: "2025",
    href: "https://smart-study-pi.vercel.app",
  },
  {
    name: "Aethelgard Capital",
    description: "Investor platform and admin dashboard for an investment firm, deployable with Docker Compose.",
    stack: "Next.js · Express · Prisma · PostgreSQL",
    year: "2026",
    href: "https://hedge-fund-one.vercel.app",
  },
  {
    name: "Dengue Sentinel",
    description: "Mobile app mapping dengue outbreak risk across Bangladesh's 64 districts from weather and case data.",
    stack: "Flutter · LSTM · Random Forest · XGBoost",
    year: "2025",
    href: "https://github.com/faysal-islam-fd/dengue-sentinel",
  },
  {
    name: "RideSync",
    description: "Ride-sharing system on regionally fragmented MongoDB databases with central analytics and live updates.",
    stack: "Node.js · MongoDB · WebSockets",
    year: "2025",
    href: "https://github.com/faysal-islam-fd/ride-sync",
  },
  {
    name: "Sheba Electronics",
    description: "Server-rendered e-commerce storefront built to real business requirements.",
    stack: "Next.js · TypeScript · Tailwind CSS",
    year: "2026",
    href: "https://github.com/faysal-islam-fd/seba-electronics",
  },
  {
    name: "Tailor My Style",
    description: "Custom apparel platform with a step-by-step garment designer and local payment methods.",
    stack: "Next.js · TypeScript",
    year: "2025",
    href: "https://tailor-my-style.vercel.app",
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug) ?? null;
}
