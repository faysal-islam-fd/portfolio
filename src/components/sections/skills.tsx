import { Reveal, StaggerContainer, StaggerItem } from "@/components/fx/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { SKILL_CATEGORY_LABELS } from "@/lib/utils";
import type { Skill, SkillCategory } from "@/lib/types";

const CATEGORY_ORDER: SkillCategory[] = [
  "deep_learning",
  "computer_vision",
  "nlp",
  "ml_frameworks",
  "languages",
  "tools",
  "cloud",
  "web",
];

export function SkillsSection({ skills }: { skills: Skill[] }) {
  if (!skills?.length) return null;

  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: skills
      .filter((s) => s.category === category)
      .sort((a, b) => b.proficiency - a.proficiency),
  })).filter((g) => g.items.length > 0);

  return (
    <section id="skills" className="section">
      <div className="container-prose">
        <SectionHeading
          eyebrow="04 — Skills"
          title="The deep learning toolbox."
          description="Frameworks, models, and ops I use daily — calibrated by years of training, debugging and shipping."
        />

        <StaggerContainer className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {grouped.map((g) => (
            <StaggerItem key={g.category}>
              <SkillCategoryCard
                category={g.category}
                items={g.items}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function SkillCategoryCard({
  category,
  items,
}: {
  category: SkillCategory;
  items: Skill[];
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.06] bg-ink-900/90  p-6 transition-colors hover:border-white/[0.12]">
      <div className="flex items-baseline justify-between">
        <h3 className="text-base font-semibold text-white tracking-tight">
          {SKILL_CATEGORY_LABELS[category]}
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          {items.length} {items.length === 1 ? "skill" : "skills"}
        </span>
      </div>

      <ul className="mt-5 space-y-3.5">
        {items.map((s) => (
          <li key={s.id} className="group/skill">
            <div className="flex items-center justify-between gap-4 mb-1.5">
              <span className="text-sm text-zinc-200 font-medium">{s.name}</span>
              <span className="font-mono text-[10px] text-zinc-500 tabular-nums">
                {s.proficiency}%
              </span>
            </div>
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/[0.04]">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-indigo shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-all duration-700"
                style={{ width: `${s.proficiency}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
