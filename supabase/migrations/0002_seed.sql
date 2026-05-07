-- =====================================================================
-- AI Researcher Portfolio - Example seed data
-- Replace with your real content via the /admin panel after deployment.
-- =====================================================================

-- ---------- admin allowlist ----------
insert into public.admins (email)
values ('admin@example.com')
on conflict (email) do nothing;

-- ---------- hero ----------
insert into public.hero (
  eyebrow, headline, subheadline, rotating_titles,
  cta_primary_label, cta_primary_href,
  cta_secondary_label, cta_secondary_href, metrics
) values (
  'Deep Learning Engineer · AI Researcher',
  'Building intelligent systems that see, reason, and learn.',
  'I research vision transformers, multimodal learning, and large-scale model training. I turn cutting-edge papers into shipped, production-grade AI.',
  array[
    'Computer Vision Researcher',
    'Vision Transformer Engineer',
    'Multimodal AI Architect',
    'Deep Learning Practitioner'
  ],
  'View Research', '/research',
  'Read CV', '/about',
  '[
    {"label":"Models trained","value":"40+","unit":""},
    {"label":"GPU hours","value":"12k","unit":"+"},
    {"label":"Papers","value":"7","unit":""},
    {"label":"SOTA tasks","value":"3","unit":""}
  ]'::jsonb
)
on conflict do nothing;

-- ---------- about ----------
insert into public.about (
  full_name, short_bio, long_bio, research_focus, "current_role",
  location, highlights
) values (
  'MD. Faysal Islam Fahad',
  'Deep Learning Engineer & AI researcher focused on vision transformers and multimodal learning.',
  'I am a Deep Learning Engineer and AI researcher working at the intersection of computer vision, multimodal learning, and large-scale model training. My work focuses on pushing transformer architectures into resource-constrained, real-world settings — from medical imaging to autonomous perception. I enjoy turning recent papers into production systems, and shipping models that survive contact with real data.',
  'Vision Transformers · Self-Supervised Learning · Multimodal Reasoning',
  'Senior AI Researcher',
  'Remote · Worldwide',
  '[
    "Trained ViT-B/16 from scratch on a custom 5M image dataset",
    "Published at top-tier vision conferences (CVPR / ICCV workshop track)",
    "Led on-device CV inference on Jetson Orin (sub-30ms latency)",
    "Open-source contributor with 1.5k+ GitHub stars across repos"
  ]'::jsonb
)
on conflict do nothing;

-- ---------- skills ----------
insert into public.skills (name, category, proficiency, display_order, is_featured) values
  ('PyTorch',         'ml_frameworks',     95,  1, true),
  ('TensorFlow',      'ml_frameworks',     85,  2, true),
  ('JAX',             'ml_frameworks',     75,  3, false),
  ('Hugging Face',    'ml_frameworks',     90,  4, true),
  ('Vision Transformers','deep_learning',  92,  5, true),
  ('Diffusion Models','deep_learning',     85,  6, true),
  ('Self-Supervised Learning','deep_learning', 88, 7, true),
  ('CNN Architectures','computer_vision',  93,  8, true),
  ('Object Detection','computer_vision',   90,  9, true),
  ('Image Segmentation','computer_vision', 88, 10, true),
  ('Multimodal Models','nlp',              82, 11, false),
  ('LLM Fine-tuning', 'nlp',               80, 12, false),
  ('Python',          'languages',         96, 13, true),
  ('CUDA',            'languages',         70, 14, false),
  ('TypeScript',      'languages',         82, 15, false),
  ('Docker',          'tools',             86, 16, false),
  ('Weights & Biases','tools',             88, 17, false),
  ('AWS',             'cloud',             80, 18, false),
  ('Next.js',         'web',               80, 19, false),
  ('FastAPI',         'web',               85, 20, false)
on conflict do nothing;

-- ---------- projects ----------
insert into public.projects (
  slug, title, tagline, description, problem, approach, results,
  tags, datasets, models, metrics, project_type, status, is_featured,
  display_order, published_at, github_url
) values
(
  'vit-medical-imaging',
  'ViT for Medical Imaging',
  'A vision transformer that detects pathology in chest X-rays at radiologist-level accuracy.',
  'A research project applying Vision Transformer (ViT-B/16) to large-scale chest X-ray analysis, with self-supervised pre-training on unlabeled scans before downstream fine-tuning on disease classification.',
  'CNNs underperform on long-range pathologies in chest X-rays. Labeled medical data is scarce.',
  'Self-supervised MAE pre-training on 500k unlabeled chest X-rays, followed by supervised fine-tuning with class-balanced focal loss.',
  'Beat the ResNet-50 baseline by 6.2 AUC points on CheXpert and reached radiologist-level F1 on three out of fourteen findings.',
  array['vision-transformer','medical-imaging','self-supervised','classification'],
  array['CheXpert','MIMIC-CXR','NIH ChestX-ray14'],
  array['ViT-B/16','MAE','ResNet-50'],
  '[
    {"label":"AUC (CheXpert)","value":"0.912"},
    {"label":"F1 (Pneumonia)","value":"0.86"},
    {"label":"GPU hours","value":"1,200"}
  ]'::jsonb,
  'computer_vision', 'published', true, 1, now(),
  'https://github.com/faysal-islam-fd/vit-medical'
),
(
  'multimodal-retrieval',
  'CLIP-Style Multimodal Retrieval',
  'A from-scratch CLIP-style model trained on 4M image-text pairs for fast cross-modal search.',
  'Implementation of a contrastive image-text model, trained on a custom curated dataset and benchmarked against OpenAI CLIP on retrieval tasks.',
  'Public CLIP weights are biased toward web data. Domain-specific retrieval needs custom training.',
  'Two-tower contrastive architecture, mixed-precision training across 8×A100, and learned temperature scaling.',
  'Reached 71.4% R@1 on a held-out test set, only 3 points behind a 6× larger baseline.',
  array['multimodal','clip','contrastive-learning','retrieval'],
  array['LAION-400M (subset)','Custom curated 4M pairs'],
  array['CLIP','ViT-B/32','GPT-2 text encoder'],
  '[
    {"label":"R@1 (test)","value":"71.4%"},
    {"label":"Params","value":"190M"},
    {"label":"Train time","value":"38h"}
  ]'::jsonb,
  'multimodal', 'published', true, 2, now(),
  null
),
(
  'realtime-edge-detection',
  'Real-time Object Detection on Edge',
  'YOLOv8 distilled to a 6MB student that runs at 38 FPS on Jetson Orin Nano.',
  'Knowledge distillation pipeline that compresses a YOLOv8-L teacher into a tiny student model deployed to embedded hardware.',
  'Edge hardware cannot run the full teacher network in real-time, but accuracy must remain useful.',
  'Feature-level + response-level distillation, INT8 quantization, and TensorRT graph optimization.',
  'mAP@0.5 dropped only 2.1 points while throughput went from 9 FPS → 38 FPS on Orin Nano.',
  array['edge-ai','object-detection','distillation','quantization'],
  array['COCO 2017','Custom warehouse dataset'],
  array['YOLOv8-L','YOLOv8-N (student)'],
  '[
    {"label":"mAP@0.5","value":"0.683"},
    {"label":"Latency","value":"26ms"},
    {"label":"Model size","value":"6MB"}
  ]'::jsonb,
  'computer_vision', 'published', true, 3, now(),
  'https://github.com/faysal-islam-fd/edge-detection'
)
on conflict (slug) do nothing;

-- ---------- research ----------
insert into public.research (
  slug, title, abstract, problem_statement, methodology, results,
  collaborators, keywords, status, is_featured, display_order
) values
(
  'thesis-efficient-vit',
  'Efficient Vision Transformers for Resource-Constrained Inference',
  'My ongoing thesis investigates token-pruning, hierarchical attention and dynamic computation graphs to make Vision Transformers practical on edge hardware while preserving accuracy on dense prediction tasks.',
  'Vision Transformers achieve state-of-the-art accuracy but their quadratic attention cost is prohibitive on edge devices.',
  'I combine learnable token pruning with a Mixture-of-Experts router, then evaluate on ImageNet-1k, ADE20K segmentation, and a custom robotics dataset.',
  'Preliminary results show 2.3× speedup on ImageNet-1k with only 0.4% top-1 drop.',
  array['Advisor: Dr. Smith','Lab partner: A. Chen'],
  array['vision transformer','efficiency','edge','token pruning','MoE'],
  'in_progress', true, 1
),
(
  'self-supervised-medical',
  'Self-Supervised Pretraining for Medical Imaging',
  'A workshop paper exploring how MAE-style pre-training generalises across imaging modalities.',
  'Medical imaging suffers from severe label scarcity, which limits supervised performance.',
  'We pretrain a ViT with masked autoencoder objective on a multi-modality unlabeled corpus (CT, MRI, X-ray) and study transfer.',
  'Workshop paper accepted; 4.1 AUC point average improvement over supervised baselines.',
  array['Co-authors: 3'],
  array['MAE','medical imaging','transfer learning'],
  'accepted', true, 2
)
on conflict (slug) do nothing;

-- ---------- publications ----------
insert into public.publications (
  title, authors, venue, publication_type, year,
  abstract, arxiv_url, doi, is_featured, display_order
) values
(
  'Token-Aware Vision Transformers for Efficient Inference',
  'MD. Faysal Islam Fahad, A. Chen, J. Smith',
  'CVPR Workshop on Efficient Deep Learning',
  'workshop', 2025,
  'We present a learnable token-pruning module that adapts the computation graph of a Vision Transformer at inference.',
  'https://arxiv.org/abs/0000.00000', null, true, 1
),
(
  'MAE Pretraining Across Medical Modalities',
  'MD. Faysal Islam Fahad, R. Patel',
  'MICCAI Workshop',
  'workshop', 2024,
  'Cross-modality masked autoencoder pretraining for medical image classification.',
  'https://arxiv.org/abs/0000.00001', null, false, 2
),
(
  'Distilling YOLO for Edge Robotics',
  'MD. Faysal Islam Fahad',
  'arXiv preprint', 'preprint', 2024,
  'A study of distillation strategies for compact object detectors targeting embedded hardware.',
  'https://arxiv.org/abs/0000.00002', null, false, 3
)
on conflict do nothing;

-- ---------- experience ----------
insert into public.experience (
  organization, role, experience_type, location,
  start_date, end_date, is_current, description, highlights, technologies, display_order
) values
(
  'Frontier AI Lab', 'Senior AI Researcher', 'research', 'Remote',
  '2024-01-01', null, true,
  'Leading research on efficient multimodal models and edge deployment.',
  array['Architected the lab''s ViT distillation pipeline','Mentored 3 junior researchers'],
  array['PyTorch','Triton','CUDA','Weights & Biases'], 1
),
(
  'Vision Robotics Inc.', 'Deep Learning Engineer', 'work', 'Berlin / Remote',
  '2022-03-01', '2023-12-31', false,
  'Shipped real-time perception models for warehouse robotics.',
  array['Reduced detection latency 3.5×','Owned the on-device CV stack on Jetson Orin'],
  array['TensorRT','ONNX','C++','Python'], 2
),
(
  'Tech University', 'M.Sc. in Artificial Intelligence', 'education', 'Munich',
  '2020-09-01', '2022-02-01', false,
  'Master''s degree with thesis on self-supervised learning for medical imaging.',
  array['Graduated with distinction','Published a workshop paper'],
  array['PyTorch','Pandas','LaTeX'], 3
)
on conflict do nothing;

-- ---------- achievements ----------
insert into public.achievements (title, organization, date, description, display_order) values
('Best Paper - Workshop Track', 'CVPR Workshop on Efficient DL', '2025-06-18',
 'Awarded best paper for our work on token-aware Vision Transformers.', 1),
('Top 0.3% Kaggle Competitor', 'Kaggle', '2023-08-01',
 'Ranked Master tier across image classification competitions.', 2),
('NVIDIA AI Hackathon Winner', 'NVIDIA', '2024-03-15',
 'Won first place for an autonomous drone perception stack.', 3)
on conflict do nothing;

-- ---------- posts ----------
insert into public.posts (
  slug, title, excerpt, content_mdx, tags, reading_minutes,
  status, is_featured, published_at
) values (
  'why-vision-transformers-matter',
  'Why Vision Transformers Matter (and where they don''t)',
  'A pragmatic look at when ViTs beat ConvNets, when they don''t, and how to choose between them in production.',
  E'# Why Vision Transformers Matter\n\nVision Transformers (ViTs) have moved from research curiosity to production default in many computer-vision pipelines. Here is how I think about them.\n\n## TL;DR\n\n- ViTs scale better with data and compute than ConvNets.\n- ConvNets still win on small datasets and tight latency budgets.\n- The interesting space is hybrid (ConvNeXt, Swin, MaxViT).\n\n## Where ViTs win\n\n1. Long-range dependencies\n2. Multimodal tasks\n3. Self-supervised pretraining\n\n*This is a placeholder MDX post — edit it from the admin panel.*',
  array['vision-transformer','deep-learning','architecture'], 6,
  'published', true, now()
)
on conflict (slug) do nothing;

-- ---------- contact links ----------
insert into public.contact_links (label, href, icon, display_order) values
  ('Email',           'mailto:hello@yourdomain.com', 'mail',     1),
  ('GitHub',          'https://github.com/faysal-islam-fd', 'github',   2),
  ('Google Scholar',  'https://scholar.google.com',  'scholar',  3),
  ('LinkedIn',        'https://linkedin.com/in/faysal-islam-fd', 'linkedin', 4),
  ('Twitter / X',     'https://x.com/faysal-islam-fd',      'twitter',  5),
  ('Hugging Face',    'https://huggingface.co/faysal-islam-fd', 'hf',   6)
on conflict do nothing;

-- ---------- site config ----------
insert into public.site_config (key, value) values
  ('seo', '{
    "title":"AI Researcher Portfolio",
    "description":"Deep Learning Engineer & AI Researcher specializing in Vision Transformers, multimodal learning, and edge AI.",
    "ogImage":"/og.png"
  }'::jsonb),
  ('navigation', '[
    {"label":"About","href":"/about"},
    {"label":"Research","href":"/research"},
    {"label":"Projects","href":"/projects"},
    {"label":"Publications","href":"/publications"},
    {"label":"Blog","href":"/blog"},
    {"label":"Contact","href":"/contact"}
  ]'::jsonb)
on conflict (key) do nothing;
