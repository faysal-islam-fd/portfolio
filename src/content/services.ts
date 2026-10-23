// =====================================================================
// Services. Each one is tied to a case study that proves it — if there
// is no proof, it is not offered here.
// =====================================================================

export type Service = {
  slug: string;
  name: string;
  /** Short outcome-oriented line used on cards. */
  promise: string;
  /** Who this is for, in their words. */
  forWho: string;
  problem: string;
  deliverables: string[];
  stack: string[];
  /** Case study slug that proves this service. */
  proof: string;
};

export const SERVICES: Service[] = [
  {
    slug: "ai-copilots-and-agents",
    name: "AI copilots & agents for operations",
    promise:
      "Assistants that read the request, pull the data, propose the next step — and hand anything risky to a human.",
    forWho:
      "Teams buried in repetitive triage: support tickets, inbound leads, back-office checks, internal requests.",
    problem:
      "A chatbot that only talks doesn't remove work. The useful version reads your systems, takes structured actions and knows exactly when not to act — which is an engineering problem, not a prompt.",
    deliverables: [
      "Workflow mapping: which steps are rules, which need a model, which need a person",
      "Integrations with your tools and APIs (including MCP servers where useful)",
      "Deterministic decision logic with a model for reading and drafting",
      "Output guardrails, schema validation and a fallback path for every model call",
      "A test suite built from your real cases",
      "Deployed service, documentation and a short handover session",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "LangChain", "MCP", "OpenRouter"],
    proof: "queuestorm-support-copilot",
  },
  {
    slug: "document-ai-rag",
    name: "Answers from your own documents",
    promise:
      "Search and chat grounded in your PDFs, wikis and drives — with citations people can check.",
    forWho:
      "Organisations whose knowledge lives in documents, and teams that answer the same questions every week.",
    problem:
      "Generic chatbots don't know your policies and confidently make things up. Retrieval fixes that only when chunking, retrieval and prompting are tuned to your documents — and every answer points back to its source.",
    deliverables: [
      "Ingestion pipeline for your formats (PDF, DOCX, web pages, exports)",
      "Chunking and embedding strategy tuned to your content",
      "Vector store setup — Pinecone, ChromaDB or FAISS",
      "Answers with source citations, and a clear “I don't know” path",
      "An evaluation set built from questions your team actually asks",
      "Chat or search UI, or an API for your existing product",
    ],
    stack: ["LangChain", "Pinecone", "ChromaDB", "FAISS", "FastAPI", "Next.js"],
    proof: "university-rag-assistant",
  },
  {
    slug: "predictive-analytics",
    name: "Forecasts & customer intelligence",
    promise:
      "Demand forecasts, customer segments and churn risk from the sales data you already have.",
    forWho:
      "E-commerce and small businesses with a few years of orders and no data team.",
    problem:
      "Your sales history already knows what will sell next month and which customers are drifting away. Getting that out takes clean data, explainable models and a dashboard people will actually open.",
    deliverables: [
      "Data audit and cleanup of your orders, customers and products",
      "Sales forecasting at the horizons you plan around",
      "RFM segmentation and churn-risk scoring",
      "Models served from an API you can retrain on new data",
      "A dashboard — or the numbers wired into the tools you use",
    ],
    stack: ["Python", "Prophet", "scikit-learn", "pandas", "FastAPI", "PostgreSQL"],
    proof: "sellwise-business-intelligence",
  },
  {
    slug: "ai-native-mvps",
    name: "AI-native MVPs, end to end",
    promise:
      "The whole product — interface, backend, database and AI features — from one engineer who owns all of it.",
    forWho:
      "Founders who need a working product to put in front of users, not a model in a notebook.",
    problem:
      "Splitting an AI product between a “model person” and a “web person” creates seams where things break: data contracts, latency, error states, cost. One owner across the stack removes the seams.",
    deliverables: [
      "Product scoping: the smallest version worth launching",
      "Frontend in Next.js or React",
      "Backend in Node.js or FastAPI with PostgreSQL",
      "LLM features with structured output, validation and cost controls",
      "Deployment, analytics hooks and documentation",
    ],
    stack: ["Next.js", "React", "Node.js", "FastAPI", "PostgreSQL", "Supabase"],
    proof: "axo-ai-product-planning-blueprint-generator",
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug) ?? null;
}
