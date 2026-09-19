import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPostSlugs, formatDate } from "@/lib/posts";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main className="shell pt-16 sm:pt-[5.25rem]">
      <article className="mx-auto max-w-[41rem]">
        <header className="flex flex-col gap-5 border-b border-rule pb-10">
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <time
              dateTime={post.date}
              className="font-mono text-xs tracking-[0.16em] text-faint"
            >
              {formatDate(post.date)}
            </time>
            <span className="font-mono text-xs tracking-[0.16em] text-fainter">
              {post.readingMinutes} MIN
            </span>
            {post.draft ? (
              <span className="font-mono text-xs tracking-[0.16em] text-accent">
                DRAFT
              </span>
            ) : null}
          </div>

          <h1 className="font-mono text-[2rem] leading-[1.15] font-medium tracking-[-0.025em] text-ink-strong sm:text-[2.6rem]">
            {post.title}
          </h1>

          {post.excerpt ? (
            <p className="font-serif text-xl leading-relaxed text-muted">
              {post.excerpt}
            </p>
          ) : null}
        </header>

        <div
          className="prose pt-10"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <footer className="mt-16 border-t border-rule pt-8">
          <Link
            href="/blog"
            className="chrome text-muted transition-colors hover:text-accent"
          >
            &#8592; ALL ENTRIES
          </Link>
        </footer>
      </article>
    </main>
  );
}
