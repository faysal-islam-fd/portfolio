import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
import { PageIntro } from "@/components/brand/section";
import { getPosts } from "@/lib/queries";
import { absoluteUrl, formatDate } from "@/lib/utils";

export const revalidate = 60;

const DESCRIPTION =
  "Notes by Faysal Islam Fahad on building LLM features, agents and ML systems that hold up in production.";

export const metadata: Metadata = {
  title: "Writing",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: {
    title: "Writing — Faysal Islam Fahad",
    description: DESCRIPTION,
    url: absoluteUrl("/blog"),
  },
};

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Writing", href: "/blog" }]} />
      <PageIntro label="Writing" title="Notes from the build." intro={DESCRIPTION} />

      <section className="wrap pb-24">
        {posts.length === 0 ? (
          <p className="border-t border-line pt-8 text-fg-3">Nothing published yet.</p>
        ) : (
          <ul className="border-t border-line">
            {posts.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group grid grid-cols-1 gap-2 border-b border-line py-8 sm:grid-cols-12 sm:gap-6"
                >
                  <span className="font-mono text-xs text-fg-3 sm:col-span-3 sm:pt-2">
                    {p.published_at && formatDate(p.published_at, { year: "numeric", month: "short", day: "numeric" })}
                    {" · "}
                    {p.reading_minutes} min
                  </span>
                  <span className="sm:col-span-9">
                    <span className="display block text-3xl group-hover:text-signal transition-colors">{p.title}</span>
                    {p.excerpt && <span className="mt-2 block max-w-2xl leading-relaxed text-fg-2">{p.excerpt}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
