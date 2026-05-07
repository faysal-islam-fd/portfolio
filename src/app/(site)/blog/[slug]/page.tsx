import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";

import { MDX } from "@/components/site/mdx";
import { Reveal } from "@/components/fx/reveal";
import { GridBackdrop } from "@/components/fx/grid-backdrop";
import { getPostBySlug, getPosts } from "@/lib/queries";
import { absoluteUrl, formatDate } from "@/lib/utils";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPostBySlug(slug);
  if (!p) return { title: "Not found" };
  return {
    title: p.title,
    description: p.excerpt ?? undefined,
    openGraph: {
      title: p.title,
      description: p.excerpt ?? undefined,
      images: p.cover_image_url ? [{ url: p.cover_image_url }] : undefined,
      url: absoluteUrl(`/blog/${p.slug}`),
      type: "article",
      publishedTime: p.published_at ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.excerpt ?? undefined,
      images: p.cover_image_url ? [p.cover_image_url] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getPostBySlug(slug);
  if (!p) notFound();

  return (
    <>
      <header className="relative overflow-hidden border-b border-white/[0.06]">
        <GridBackdrop />
        <div className="container-prose relative pt-12 pb-16">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All posts
            </Link>
          </Reveal>
          <Reveal delay={1}>
            <div className="mt-8 flex items-center gap-3 text-xs text-zinc-500 font-mono">
              {p.published_at && (
                <span>
                  {formatDate(p.published_at, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {p.reading_minutes} min read
              </span>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <h1 className="mt-4 text-balance text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gradient">
              {p.title}
            </h1>
          </Reveal>
          {p.excerpt && (
            <Reveal delay={3}>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
                {p.excerpt}
              </p>
            </Reveal>
          )}
        </div>
      </header>

      {p.cover_image_url && (
        <div className="container-prose mt-10">
          <div className="relative aspect-[16/8] rounded-2xl overflow-hidden border border-white/[0.06]">
            <Image
              src={p.cover_image_url}
              alt={p.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width:1280px) 100vw, 1280px"
            />
          </div>
        </div>
      )}

      <article className="container-prose mt-16 max-w-3xl">
        <MDX source={p.content_mdx} />
      </article>
      <div className="h-32" />
    </>
  );
}
