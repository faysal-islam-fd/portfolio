-- =====================================================================
-- 0004 — Remove placeholder content that came from 0002_seed.sql
-- ---------------------------------------------------------------------
-- The seed shipped example claims (Kaggle Master tier, an NVIDIA
-- hackathon win, a 100k-document RAG pipeline, Jetson edge deployments,
-- "15+ agents shipped", skill percentages) that are not backed by the CV
-- or public work. The public site no longer reads these tables, but the
-- rows still show up in the admin panel and could be re-surfaced later.
--
-- Review each block before running. Run in the Supabase SQL editor.
-- =====================================================================

begin;

-- Achievements: both rows are seed examples.
delete from public.achievements
where title in ('Top 0.3% Kaggle Competitor', 'NVIDIA AI Hackathon Winner');

-- Hero: drop the example metrics.
update public.hero set metrics = '[]'::jsonb;

-- About: drop example highlights and align role with the CV.
update public.about
set highlights = '[]'::jsonb,
    "current_role" = 'Full-stack AI engineer',
    short_bio = 'Full-stack AI engineer building LLM features, agents, RAG systems and ML models end to end.';

-- Experience: match the CV (Backend Developer, Sep 2025 – May 2026).
update public.experience
set role = 'Backend Developer',
    start_date = '2025-09-01',
    end_date = '2026-05-31',
    description = 'Built and supported e-commerce application features aligned with real-world business requirements.',
    highlights = array[
      'Integrated RESTful APIs for product listings, category management, cart functionality and dynamic content delivery',
      'Collaborated on responsive, performance-conscious application workflows'
    ],
    technologies = array['Node.js', 'Express', 'REST APIs']
where organization = 'Rangpur IT';

-- Contact links: placeholder Upwork URL and a Hugging Face profile that 404s.
delete from public.contact_links
where href like '%placeholder%'
   or href = 'https://huggingface.co/faysal-islam-fd';

-- Blog: the seed post ends with "edit or expand it in the admin panel".
-- Move it to draft until it is rewritten.
update public.posts
set status = 'draft'
where slug = 'building-reliable-ai-agents-with-langgraph'
  and content_mdx like '%edit or expand it in the admin panel%';

commit;
