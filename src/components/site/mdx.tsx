import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";

const components = {
  a: ({ href = "", children, ...rest }: ComponentProps<"a">) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} {...(rest as any)}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  },
  img: (props: ComponentProps<"img">) => (
    <span className="block my-8">
      <Image
        src={(props.src as string) ?? ""}
        alt={props.alt ?? ""}
        width={1200}
        height={675}
        className="rounded-xl border border-white/10 w-full h-auto"
      />
    </span>
  ),
};

export function MDX({ source }: { source: string }) {
  return (
    <article className="prose-research max-w-none">
      <MDXRemote source={source} components={components} />
    </article>
  );
}
