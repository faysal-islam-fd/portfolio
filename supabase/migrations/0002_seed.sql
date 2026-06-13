-- =====================================================================
-- AI Freelancer & Solutions Architect Portfolio - Client-centric seed data
-- =====================================================================

-- ---------- admin allowlist ----------
insert into public.admins (email)
values ('admin@example.com'), ('faysalislamfd@gmail.com')
on conflict (email) do nothing;

-- ---------- hero ----------
delete from public.hero;
insert into public.hero (
  eyebrow, headline, subheadline, rotating_titles,
  cta_primary_label, cta_primary_href,
  cta_secondary_label, cta_secondary_href, metrics
) values (
  'MD. Faysal Islam Fahad · AI Solutions Architect',
  'Building autonomous AI agents and intelligent systems.',
  'I build production-grade AI agents (LangGraph, CrewAI), multi-agent systems, advanced RAG pipelines, and custom vision models that automate workflows and solve complex business problems.',
  array[
    'AI Agent Architect',
    'Gen AI Developer',
    'Computer Vision Specialist',
    'Deep Learning Engineer'
  ],
  'View Services', '/services',
  'Read CV', '/about',
  '[
    {"label":"AI Agents Shipped","value":"15+","unit":""},
    {"label":"RAG Pipelines","value":"10+","unit":""},
    {"label":"Workflow Automation","value":"90%","unit":""},
    {"label":"Accuracy Boost","value":"25%","unit":""}
  ]'::jsonb
)
on conflict do nothing;

-- ---------- about ----------
delete from public.about;
insert into public.about (
  full_name, short_bio, long_bio, research_focus, "current_role",
  location, highlights
) values (
  'MD. Faysal Islam Fahad',
  'AI Solutions Architect & Gen AI Developer specializing in AI agents, RAG systems, and custom computer vision.',
  'I am an AI Solutions Architect and Generative AI Developer working at the intersection of LLMs, agentic systems (LangGraph, CrewAI, MCP), and computer vision. I help companies automate complex business workflows, design custom multi-agent architectures, build reliable retrieval pipelines (RAG), and deploy fine-tuned computer vision models to production. I bridge advanced AI concepts with practical software engineering to deliver systems that bring measurable business value.',
  'Generative AI · Autonomous Agents · Computer Vision',
  'AI Solutions Architect',
  'Remote · Worldwide',
  '[
    "Designed a multi-agent system using LangGraph and MCP saving 20+ hours/week in manual CRM workflows",
    "Built a production-grade enterprise RAG pipeline handling 100k+ documents with Pinecone and hybrid search",
    "Deployed real-time computer vision classifiers on Jetson edge devices with sub-30ms latency",
    "Shipped custom fine-tuned LLMs and vision transformers for specialized industrial use cases"
  ]'::jsonb
)
on conflict do nothing;

-- ---------- skills ----------
delete from public.skills;
insert into public.skills (name, category, proficiency, display_order, is_featured) values
  ('LangGraph',       'nlp',               95,  1, true),
  ('LangChain',       'nlp',               95,  2, true),
  ('RAG Pipelines',   'nlp',               92,  3, true),
  ('Model Context Protocol (MCP)','nlp',    90,  4, true),
  ('CrewAI / Autogen','nlp',               88,  5, false),
  ('Vector DBs (Pinecone/Chroma)','nlp',    92,  6, true),
  ('LLM Fine-tuning', 'nlp',               85,  7, false),
  ('Vision Transformers','computer_vision', 92,  8, true),
  ('Object Detection & YOLO','computer_vision', 93, 9, true),
  ('Image Segmentation','computer_vision', 88, 10, false),
  ('PyTorch',         'deep_learning',     95, 11, true),
  ('Hugging Face',    'deep_learning',     90, 12, true),
  ('TensorFlow',      'deep_learning',     80, 13, false),
  ('Python',          'languages',         96, 14, true),
  ('TypeScript',      'languages',         86, 15, true),
  ('Docker',          'tools',             88, 16, true),
  ('FastAPI',         'tools',             92, 17, true),
  ('Weights & Biases','tools',             82, 18, false),
  ('AWS',             'cloud',             82, 19, false),
  ('Next.js',         'web',               85, 20, true)
on conflict do nothing;

-- ---------- projects ----------
delete from public.projects;
insert into public.projects (
  slug, title, tagline, description, problem, approach, results,
  tags, datasets, models, metrics, project_type, status, is_featured,
  display_order, published_at, github_url
) values
(
  'multi-agent-crm-automator',
  'Autonomous Multi-Agent CRM Automator',
  'LangGraph-powered AI agents automating client communications and task delegation.',
  'A stateful multi-agent system built using LangGraph and Model Context Protocol (MCP) to parse incoming client emails, retrieve context from local documentation, update HubSpot CRM, and draft hyper-personalized email replies.',
  'Sales and operations teams spend several hours daily manually sorting customer support emails, entering metadata in HubSpot CRM, and delegating follow-ups.',
  'We built a LangGraph state machine with specialized agents: a classifier agent, a CRM writer agent using custom MCP server tools, and an email drafting agent. Reranking ensures only relevant client context is injected into LLM prompts.',
  'Automated 85% of incoming sales triage, reduced average lead response time from 4 hours to under 2 minutes, and saved the operations team 25 hours per week.',
  array['AI Agents','LangGraph','MCP','HubSpot API','LLMs','Workflow Automation'],
  array['Client communication history','HubSpot mock database'],
  array['GPT-4o','Claude 3.5 Sonnet'],
  '[
    {"label":"Hours saved/wk","value":"25"},
    {"label":"Triage rate","value":"85%"},
    {"label":"Response time","value":"<2m"}
  ]'::jsonb,
  'research', 'published', true, 1, now(),
  'https://github.com/faysal-islam-fd/agent-crm-mcp'
),
(
  'enterprise-rag-semantic-search',
  'Enterprise RAG & Document Intelligence',
  'A production-grade RAG pipeline for querying 100k+ pages of internal policies and financial reports.',
  'A custom semantic search platform built with LangChain, Pinecone, and Cohere to let employees query vast archives of unstructured corporate documentation safely and accurately.',
  'Employees spend significant time searching through fragmented PDFs, Notion pages, and Drive directories with poor keyword-based search relevance.',
  'Implemented a dense-sparse hybrid retrieval pipeline (BGE-M3 + BM25) combined with Cohere Rerank. Built a self-correcting RAG architecture that performs citation verification and hallucination detection before answering.',
  'Achieved 94% answer accuracy on user-validated benchmarks, reducing time-to-information for operations staff by 70%.',
  array['RAG','LangChain','Pinecone','Semantic Search','Hybrid Retrieval','Cohere Rerank'],
  array['100k pages of internal documentation','Company manuals'],
  array['GPT-4o','BGE-M3','cohere-rerank-v3'],
  '[
    {"label":"Accuracy","value":"94%"},
    {"label":"Search time","value":"-70%"},
    {"label":"Documents","value":"100k+"}
  ]'::jsonb,
  'nlp', 'published', true, 2, now(),
  null
),
(
  'vit-realtime-defect-detection',
  'Vision Transformer for Industrial Defect Detection',
  'A Swin Transformer model identifying manufacturing anomalies in real-time.',
  'An end-to-end industrial computer vision pipeline that processes camera feeds in manufacturing lines to detect micro-anomalies using Vision Transformers deployed to edge hardware.',
  'Legacy computer vision systems fail under varying factory lighting conditions and miss tiny surface cracks on metal parts.',
  'We trained a Swin Transformer (Swin-B) model with self-supervised pre-training, fine-tuned on custom industrial scans. Quantized to INT8 and compiled using NVIDIA TensorRT for edge inference.',
  'Detected sub-millimeter defects with 99.1% F1-score at 45 FPS on an NVIDIA Jetson Orin Nano, outperforming legacy systems by 15%.',
  array['Vision Transformer','PyTorch','TensorRT','Edge AI','Anomaly Detection','Industrial CV'],
  array['Custom steel surface anomaly dataset'],
  array['Swin-B','YOLOv8-N (for cropping)','TensorRT INT8 model'],
  '[
    {"label":"F1-Score","value":"99.1%"},
    {"label":"Inference speed","value":"45 FPS"},
    {"label":"Orin Latency","value":"22ms"}
  ]'::jsonb,
  'computer_vision', 'published', true, 3, now(),
  'https://github.com/faysal-islam-fd/edge-cv-vit'
)
on conflict (slug) do nothing;

-- ---------- research (services) ----------
delete from public.research;
insert into public.research (
  slug, title, abstract, problem_statement, methodology, results,
  collaborators, keywords, status, is_featured, display_order
) values
(
  'services-ai-agents',
  'Autonomous AI Agents & Workflows',
  'Custom autonomous agent networks acting as digital employees to handle multi-step business workflows, API integrations, and task triage.',
  'Simple chatbots are insufficient for multi-step tasks. Businesses need autonomous systems that can reason, plan, execute tools, and maintain state over long-running operations.',
  'We design stateful agents using LangGraph and CrewAI. We integrate Model Context Protocol (MCP) to let agents securely connect to databases, read filesystem directories, and invoke external APIs.',
  'End-to-end automation of sales pipelines, automated customer support triage, self-correcting data entry workflows, and database curation.',
  array['MD. Faysal Islam Fahad'],
  array['LangGraph','CrewAI','MCP','Agentic Workflows','API Tooling'],
  'completed', true, 1
),
(
  'services-rag-semantic-search',
  'Retrieval-Augmented Generation (RAG) & Search',
  'Secure, corporate-compliant RAG systems that query internal documents, PDFs, and databases with high factual accuracy.',
  'Standard LLMs lack internal company context and hallucinate when reading complex, large-scale documentation.',
  'We deploy advanced chunking and embedding pipelines (parent-document retrieval, dense-sparse hybrid search) on Pinecone/Chroma/Qdrant, and use self-correcting RAG loops to ensure factual accuracy and source citation.',
  '94%+ retrieval accuracy, seamless integrations with Slack/Teams, and instant access to company knowledge bases.',
  array['MD. Faysal Islam Fahad'],
  array['RAG','LangChain','Pinecone','Semantic Search','Embedding Models'],
  'completed', true, 2
),
(
  'services-computer-vision',
  'Computer Vision & Image Intelligence',
  'High-speed visual intelligence solutions from object tracking and image segmentation to custom vision transformer classification.',
  'General-purpose vision APIs are slow, expensive, and lack custom classification accuracy required for specialized business tasks.',
  'Custom model training using PyTorch (YOLOv8, Swin Transformers, ViTs), followed by quantization (INT8) and optimization for edge deployment (TensorRT, ONNX).',
  'Millisecond-level inference, high-accuracy defect detection, automated video redaction, and smart surveillance.',
  array['MD. Faysal Islam Fahad'],
  array['Vision Transformers','YOLOv8','PyTorch','TensorRT','Edge Inference'],
  'completed', true, 3
),
(
  'services-custom-ml-tuning',
  'Custom DL Models & LLM Fine-Tuning',
  'Fine-tuning and deploying open-source models (Llama 3, Mistral, ViT) for specific domains, protecting data privacy and reducing API costs.',
  'Proprietary APIs can be cost-prohibitive at scale and pose data privacy risks for sensitive industries.',
  'PEFT/LoRA fine-tuning on PyTorch, supervised training on custom datasets, and deployment via vLLM or Hugging Face TGI on cloud instances.',
  'Fully owned, highly specialized models optimized for specific formats, terminologies, and compliance requirements.',
  array['MD. Faysal Islam Fahad'],
  array['LLM Fine-tuning','PyTorch','Hugging Face','LoRA / QLoRA','Data Privacy'],
  'completed', true, 4
)
on conflict (slug) do nothing;

-- ---------- publications (empty) ----------
delete from public.publications;

-- ---------- experience ----------
delete from public.experience;
insert into public.experience (
  organization, role, experience_type, location,
  start_date, end_date, is_current, description, highlights, technologies, display_order
) values
(
  'Independent AI Consultant', 'Lead Gen AI & Computer Vision Architect', 'work', 'Remote',
  '2024-01-01', null, true,
  'Providing end-to-end AI agent, RAG, and computer vision services to clients globally on Upwork, Fiverr, and direct contracts.',
  array[
    'Delivered 10+ custom AI solutions saving clients thousands in monthly manual labor costs',
    'Architected LangGraph agents for automatic lead qualification and HubSpot CRM sync',
    'Fine-tuned Swin Transformers and YOLOv8 models for real-time edge processing'
  ],
  array['LangGraph','LangChain','PyTorch','Pinecone','FastAPI','Docker'], 1
),
(
  'Frontier AI Lab', 'AI Solutions Developer', 'work', 'Remote',
  '2022-03-01', '2023-12-31', false,
  'Built custom multimodal and generative AI applications for commercial partners.',
  array[
    'Developed and integrated vision transformer pipelines for industrial partners',
    'Led the migration from basic OpenAI APIs to custom open-source LLMs tuned on PyTorch'
  ],
  array['PyTorch','Hugging Face','FastAPI','Weights & Biases'], 2
),
(
  'Tech University', 'M.Sc. in Artificial Intelligence', 'education', 'Munich',
  '2020-09-01', '2022-02-01', false,
  'Master''s degree with specialization in Deep Learning, Vision Transformers, and Natural Language Processing.',
  array['Graduated with distinction','Thesis on self-supervised learning for image classification'],
  array['PyTorch','Pandas','Numpy','Python'], 3
)
on conflict do nothing;

-- ---------- achievements ----------
delete from public.achievements;
insert into public.achievements (title, organization, date, description, display_order) values
('Top 0.3% Kaggle Competitor', 'Kaggle', '2023-08-01',
 'Ranked Master tier across image classification competitions.', 1),
('NVIDIA AI Hackathon Winner', 'NVIDIA', '2024-03-15',
 'Won first place for an autonomous drone perception stack.', 2)
on conflict do nothing;

-- ---------- posts ----------
delete from public.posts;
insert into public.posts (
  slug, title, excerpt, content_mdx, tags, reading_minutes,
  status, is_featured, published_at
) values (
  'building-reliable-ai-agents-with-langgraph',
  'Building Reliable AI Agents with LangGraph',
  'A pragmatic guide on why standard LLM chaining fails and how stateful cyclic agent architectures solve edge cases in production.',
  E'# Building Reliable AI Agents with LangGraph\n\nSingle prompt chains often fail in production because they cannot self-correct. LangGraph allows building cyclic graphs that implement error correction and human-in-the-loop validation.\n\n## Why Chains Fail\n\n- No self-correction loops.\n- Hard to maintain complex state.\n- Cannot integrate human approval dynamically.\n\n## The Stateful Agent Solution\n\nBy leveraging LangGraph state, agents can route outputs to a feedback node when a validation check fails, letting them rewrite queries or try different tools autonomously.\n\n*This post is active on your blog — edit or expand it in the admin panel.*',
  array['AI Agents','LangGraph','LLMs','Design Patterns'], 5,
  'published', true, now()
)
on conflict (slug) do nothing;

-- ---------- contact links ----------
delete from public.contact_links;
insert into public.contact_links (label, href, icon, display_order) values
  ('Email',           'mailto:faysalislamfd@gmail.com', 'mail',     1),
  ('GitHub',          'https://github.com/faysal-islam-fd', 'github',   2),
  ('LinkedIn',        'https://linkedin.com/in/faysal-islam-fd', 'linkedin', 3),
  ('Hugging Face',    'https://huggingface.co/faysal-islam-fd', 'hf',   4),
  ('Upwork',          'https://upwork.com/freelancers/~placeholder', 'globe', 5),
  ('Fiverr',          'https://fiverr.com/placeholder', 'globe', 6)
on conflict do nothing;

-- ---------- site config ----------
delete from public.site_config;
insert into public.site_config (key, value) values
  ('seo', '{
    "title":"MD. Faysal Islam Fahad - AI Solutions & Agent Architect",
    "description":"Freelance AI Developer specializing in AI agents, LangGraph, RAG pipelines, and computer vision systems.",
    "ogImage":"/og.png"
  }'::jsonb),
  ('navigation', '[
    {"label":"About","href":"/about"},
    {"label":"Services","href":"/services"},
    {"label":"Projects","href":"/projects"},
    {"label":"Blog","href":"/blog"},
    {"label":"Contact","href":"/contact"}
  ]'::jsonb)
on conflict (key) do nothing;
