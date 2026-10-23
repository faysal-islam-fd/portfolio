import Image from "next/image";
import Link from "next/link";

import { getAbout } from "@/lib/queries";
import { Anatomy, AnatomyLegend } from "@/components/brand/anatomy";
import { ClosingCta, SectionHead } from "@/components/brand/section";
import { WorkList } from "@/components/brand/work-list";
import { PRINCIPLES, PROCESS, PROFILE } from "@/content/profile";
import { SERVICES } from "@/content/services";
import { CASE_STUDIES, getCaseStudy } from "@/content/work";

export const revalidate = 60;

const SHIPPED = [
  { label: "Axo", note: "heyaxo.dev", href: "https://www.heyaxo.dev" },
  { label: "SellWise", note: "live app", href: "https://sellwise-one.vercel.app" },
  { label: "QueueStorm", note: "source", href: "https://github.com/faysal-islam-fd/sust-cse-curnival" },
  { label: "GitHub", note: "60+ public repos", href: "https://github.com/faysal-islam-fd" },
];

export default async function HomePage() {
  const about = await getAbout();
  const queuestorm = getCaseStudy("queuestorm-support-copilot");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="wrap pt-14 pb-16 sm:pt-20 lg:pt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <p className="kicker rise">
              {PROFILE.role} — LLMs · agents · RAG · applied ML
            </p>
            <h1 className="display rise rise-1 mt-6 text-[clamp(3.25rem,9vw,8.25rem)]">
              AI products,
              <br />
              engineered <em className="text-signal">end&nbsp;to&nbsp;end.</em>
            </h1>
            <p className="lede rise rise-2 mt-8 max-w-2xl">{PROFILE.intro}</p>
            <div className="rise rise-3 mt-9 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn btn-solid h-12 px-6">
                Start a project <span aria-hidden>→</span>
              </Link>
              <Link href="#work" className="btn btn-line h-12 px-6">
                See the work
              </Link>
            </div>
            <p className="rise rise-4 mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fg-3">
              <span className="inline-flex items-center gap-2 text-fg-2">
                <span aria-hidden className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-600/70 motion-safe:animate-ping" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-600" />
                </span>
                {PROFILE.availability}
              </span>
              <span aria-hidden>·</span>
              <span>{PROFILE.location} ({PROFILE.timezone})</span>
              <span aria-hidden>·</span>
              <span>{PROFILE.responseTime}</span>
            </p>
          </div>

          {about?.profile_image_url && (
            <figure className="rise rise-2 lg:col-span-4 lg:pt-4">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-md border border-line bg-paper-2 lg:ml-auto">
                <Image
                  src={about.profile_image_url}
                  alt={`Portrait of ${PROFILE.name}`}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width:1024px) 340px, 340px"
                />
              </div>
              <figcaption className="kicker mx-auto mt-3 max-w-[340px] lg:ml-auto">
                Faysal — Dhaka, working worldwide
              </figcaption>
            </figure>
          )}
        </div>

        <div className="mt-16 border-t border-line pt-5">
          <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <li className="kicker">Shipped &amp; public</li>
            {SHIPPED.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group text-[15px] text-fg">
                  <span className="font-medium group-hover:text-signal transition-colors">{s.label}</span>
                  <span className="text-fg-3"> — {s.note} ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Principle ────────────────────────────────────── */}
      <section className="border-y border-line bg-paper-2/60">
        <div className="wrap grid grid-cols-1 gap-12 py-20 sm:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker">How I think about AI systems</p>
            <blockquote className="display mt-6 text-[clamp(2.4rem,5vw,4.25rem)] text-balance">
              Models where they help. <span className="italic text-signal">Code where it has to be right.</span>
            </blockquote>
            <p className="lede mt-7 max-w-md">
              Most AI features don&apos;t fail at the model. They fail at the seams — the
              unchecked output, the missing fallback, the decision that should never
              have been left to a probability. I design those seams first.
            </p>
            <AnatomyLegend className="mt-8" />
          </div>
          {queuestorm && (
            <div className="lg:col-span-7">
              <p className="kicker mb-4">
                Example — {queuestorm.name}, a finance support copilot
              </p>
              <Anatomy stages={queuestorm.anatomy} className="lg:grid-cols-2" />
              <Link href={`/projects/${queuestorm.slug}`} className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium ulink">
                Why the model never makes the decision <span aria-hidden>→</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Work ─────────────────────────────────────────── */}
      <section id="work" className="wrap scroll-mt-20 py-24 sm:py-32">
        <SectionHead
          index="01"
          label="Selected work"
          title="Systems I've designed, built and shipped."
          intro="Each one is public — live, or with its source open. No invented metrics; the links are the evidence."
          action={{ label: "All work", href: "/projects" }}
        />
        <div className="mt-14">
          <WorkList items={CASE_STUDIES} />
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="wrap py-24 sm:py-32">
          <SectionHead
            index="02"
            label="What I build for clients"
            title="Four things I do well — each with proof."
            action={{ label: "Services in detail", href: "/services" }}
          />
          <ul className="mt-14 grid grid-cols-1 border-t border-line md:grid-cols-2">
            {SERVICES.map((s, i) => {
              const proof = getCaseStudy(s.proof);
              return (
                <li
                  key={s.slug}
                  className="flex flex-col border-b border-line py-10 md:px-8 md:odd:border-r md:odd:pl-0 md:even:pr-0"
                >
                  <span className="kicker text-signal">{String.fromCharCode(65 + i)}</span>
                  <h3 className="display mt-3 text-3xl sm:text-[2.1rem]">
                    <Link href={`/services/${s.slug}`} className="hover:text-signal transition-colors">
                      {s.name}
                    </Link>
                  </h3>
                  <p className="mt-3 text-fg-2 leading-relaxed">{s.promise}</p>
                  <p className="mt-2 text-sm text-fg-3 leading-relaxed">For: {s.forWho}</p>
                  {proof && (
                    <p className="mt-auto pt-6 text-sm">
                      <span className="kicker">Proof</span>{" "}
                      <Link href={`/projects/${proof.slug}`} className="ulink text-fg">
                        {proof.name}
                      </Link>
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── How I work ───────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="wrap py-24 sm:py-32">
          <SectionHead
            index="03"
            label="How I work"
            title="Engineering habits you can hold me to."
          />
          <ol className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title} className="border-t border-fg pt-6">
                <span className="kicker">Principle {i + 1}</span>
                <h3 className="mt-3 text-xl font-medium text-fg">{p.title}</h3>
                <p className="mt-3 text-fg-2 leading-relaxed">{p.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-12">
            <p className="kicker md:col-span-3 md:pt-1">Working together</p>
            <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4 md:col-span-9">
              {PROCESS.map((p) => (
                <li key={p.step} className="bg-paper p-6">
                  <span className="font-mono text-xs text-signal">{p.step}</span>
                  <h3 className="mt-3 font-medium text-fg">{p.title}</h3>
                  <p className="mt-2 text-sm text-fg-2 leading-relaxed">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── About (short) ────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="wrap grid grid-cols-1 gap-6 py-24 sm:py-32 md:grid-cols-12">
          <p className="kicker md:col-span-3 md:pt-3">
            <span className="text-signal">04</span> — About
          </p>
          <div className="md:col-span-9">
            <p className="display text-[clamp(1.9rem,3.6vw,3rem)] text-balance">
              I&apos;m Faysal, a full-stack AI engineer in Dhaka. I write the retrieval
              pipeline, the API, the database schema and the interface — so there&apos;s
              nobody to hand the hard parts to but me.
            </p>
            <p className="lede mt-7 max-w-2xl">
              B.Sc. in Computer Science &amp; Engineering at BUBT, former backend developer
              at Rangpur IT, and builder of Axo and SellWise. I work remotely with clients worldwide —
              async-first, with overlap into European business hours.
            </p>
            <Link href="/about" className="mt-7 inline-flex items-center gap-2 text-[15px] font-medium ulink">
              More about me <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
