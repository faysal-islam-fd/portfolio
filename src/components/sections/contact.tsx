import { Mail, ArrowRight } from "lucide-react";

import { Reveal } from "@/components/fx/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { ContactIcon } from "@/components/site/contact-icon";
import { SectionHeading } from "@/components/sections/section-heading";
import type { ContactLink } from "@/lib/types";

export function ContactSection({ links }: { links: ContactLink[] }) {
  return (
    <section id="contact" className="section">
      <div className="container-prose">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="08 — Contact"
              title="Let's build something intelligent."
              description="Whether it's a research collaboration, a hard CV problem, or a deep learning hire — I'd love to hear about it."
            />

            {links?.length > 0 && (
              <Reveal delay={2}>
                <div className="mt-10 space-y-1.5">
                  {links.map((l) => (
                    <a
                      key={l.id}
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3.5 transition-all hover:border-accent-blue/30 hover:bg-white/[0.04]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-zinc-300 group-hover:text-accent-blue transition-colors">
                          <ContactIcon name={l.icon} />
                        </span>
                        <div>
                          <div className="text-sm font-medium text-white">
                            {l.label}
                          </div>
                          <div className="text-xs text-zinc-500 truncate max-w-[260px]">
                            {l.href.replace(/^https?:\/\//, "").replace(/^mailto:/, "")}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-accent-blue group-hover:translate-x-0.5 transition-all" />
                    </a>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={1} className="lg:col-span-7">
            <div className="relative rounded-2xl border border-white/[0.06] bg-ink-900/50  p-7 sm:p-9 glow-border">
              <div className="flex items-center gap-3 mb-7">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-indigo/10 border border-accent-blue/30 text-accent-blue">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Send a message
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">
                    Typical reply within 24h
                  </div>
                </div>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
