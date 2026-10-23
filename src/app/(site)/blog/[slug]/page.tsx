import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MDX } from "@/components/site/mdx";
import { ArticleJsonLd } from "@/components/site/article-json-ld";
import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
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
    keywords: p.tags?.length ? p.tags : undefined,
    alternates: {
      canonical: absoluteUrl(`/blog/${p.slug}`),
    },
    openGraph: {
      title: p.title,
      description: p.excerpt ?? undefined,
      images: p.cover_image_url ? [{ url: p.cover_image_url }] : undefined,
      url: absoluteUrl(`/blog/${p.slug}`),
      type: "article",
      publishedTime: p.published_at ?? undefined,
      modifiedTime: p.updated_at ?? undefined,
      authors: ["MD. Faysal Islam Fahad"],
      section: "Technology",
      tags: p.tags?.length ? p.tags : undefined,
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
      <ArticleJsonLd post={p} />
      <BreadcrumbJsonLd
        items={[
          { name: "Writing", href: "/blog" },
          { name: p.title, href: `/blog/${p.slug}` },
        ]}
      />

      <header className="wrap pt-12 pb-12 sm:pt-16">
        <Link href="/blog" className="kicker hover:text-fg transition-colors">
          ← All writing
        </Link>
        <p className="kicker rise mt-10">
          {p.published_at && (
            <time dateTime={p.published_at}>
              {formatDate(p.published_at, { year: "numeric", month: "long", day: "numeric" })}
            </time>
          )}
          {" · "}
          {p.reading_minutes} min read
        </p>
        <h1 className="display rise rise-1 mt-5 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] text-balance">
          {p.title}
        </h1>
        {p.excerpt && <p className="lede rise rise-2 mt-6 max-w-3xl">{p.excerpt}</p>}
      </header>

      {p.cover_image_url && (
        <div className="wrap">
          <div className="relative aspect-[16/8] overflow-hidden rounded-md border border-line bg-paper-2">
            <Image
              src={p.cover_image_url}
              alt={p.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width:1240px) 100vw, 1240px"
            />
          </div>
        </div>
      )}

      <article className="wrap max-w-3xl py-14">
        <MDX source={p.content_mdx} />
      </article>
    </>
  );
}
