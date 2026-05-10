import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, BookText } from "lucide-react";

import { PageHeader } from "@/components/site/page-header";
import { Spotlight } from "@/components/fx/spotlight";
import { StaggerContainer, StaggerItem } from "@/components/fx/reveal";
import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
import { getPosts } from "@/lib/queries";
import { absoluteUrl, formatDate } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Essays and tutorials on deep learning, computer vision, and research engineering by MD. Faysal Islam Fahad.",
  alternates: {
    canonical: absoluteUrl("/blog"),
  },
  openGraph: {
    title: "Blog — MD. Faysal Islam Fahad",
    description:
      "Essays and tutorials on deep learning, computer vision, and research engineering.",
    url: absoluteUrl("/blog"),
  },
};

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Blog", href: "/blog" }]} />
      <PageHeader
        eyebrow="Blog"
        title="Notes from the lab."
        description="Long-form writing on training, debugging and shipping deep learning systems."
      />
      <section className="section">
        <div className="container-prose">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-16 text-center">
              <p className="text-zinc-400">No posts yet. Add one from the admin panel.</p>
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((p) => (
                <StaggerItem key={p.id}>
                  <Spotlight
                    size={400}
                    className="group h-full rounded-2xl border border-white/[0.06] bg-ink-900/50  overflow-hidden lift"
                  >
                    <Link href={`/blog/${p.slug}`} className="block h-full">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {p.cover_image_url ? (
                          <Image
                            src={p.cover_image_url}
                            alt={p.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width:1024px) 100vw, 400px"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-ink-800 via-ink-900 to-black">
                            <div className="absolute inset-0 neural-grid opacity-50" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <BookText className="h-12 w-12 text-accent-blue/40" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
                          {p.published_at && (
                            <span>
                              {formatDate(p.published_at, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {p.reading_minutes} min
                          </span>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold text-white tracking-tight text-balance group-hover:text-gradient-accent transition-all line-clamp-2">
                          {p.title}
                        </h3>
                        {p.excerpt && (
                          <p className="mt-2 text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                            {p.excerpt}
                          </p>
                        )}
                        {p.tags?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {p.tags.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 border border-white/10 rounded-md px-2 py-0.5"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </Spotlight>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
  );
}
