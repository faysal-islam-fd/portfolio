import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, BookText } from "lucide-react";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/fx/reveal";
import { Spotlight } from "@/components/fx/spotlight";
import { SectionHeading } from "@/components/sections/section-heading";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/types";

export function BlogPreviewSection({ posts }: { posts: Post[] }) {
  if (!posts?.length) return null;

  return (
    <section id="blog" className="section">
      <div className="container-prose">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <SectionHeading
            eyebrow="09 — Writing"
            title="Notes from the lab."
            description="Essays on deep learning, research engineering, and the messy reality of training models."
          />
          <Reveal>
            <Link
              href="/blog"
              className="hidden md:inline-flex group items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-white transition-colors"
            >
              View all posts
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <StaggerContainer className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.slice(0, 3).map((p) => (
            <StaggerItem key={p.id}>
              <BlogCard post={p} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: Post }) {
  return (
    <Spotlight
      size={400}
      className="group h-full rounded-2xl border border-white/[0.06] bg-ink-900/50  overflow-hidden lift"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative aspect-[16/10] overflow-hidden">
          {post.cover_image_url ? (
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width:1024px) 100vw, 400px"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-ink-800 via-ink-900 to-black">
              <div className="absolute inset-0 neural-grid opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BookText className="h-12 w-12 text-accent-blue/40" strokeWidth={1.2} />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
            {post.published_at && (
              <span>
                {formatDate(post.published_at, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.reading_minutes} min
            </span>
          </div>

          <h3 className="mt-3 text-base sm:text-lg font-semibold text-white tracking-tight text-balance group-hover:text-gradient-accent transition-all line-clamp-2">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-2 text-sm text-zinc-400 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {post.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((t) => (
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
  );
}
