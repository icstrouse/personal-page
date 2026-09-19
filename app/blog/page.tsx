import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Essays and notes by Ian Strouse.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="shell flex flex-col gap-14 pt-16 sm:gap-[3.75rem] sm:pt-[5.25rem]">
      <section className="flex flex-col gap-4">
        <h1 className="font-mono text-[2.375rem] leading-[1.05] font-medium tracking-[-0.035em] text-ink-strong sm:text-[3.25rem]">
          Blog
        </h1>
        <p className="font-mono text-[0.8125rem] tracking-[0.24em] text-accent">
          {posts.length} {posts.length === 1 ? "ENTRY" : "ENTRIES"}
        </p>
      </section>

      {posts.length === 0 ? (
        <p className="prose max-w-[41rem]">Nothing published yet.</p>
      ) : (
        <ul className="flex flex-col">
          {posts.map((post) => (
            <li key={post.slug} className="border-t border-rule last:border-b">
              <Link href={`/blog/${post.slug}`} className="group block py-8">
                <article className="row">
                  <div className="row-label flex items-baseline gap-3 md:block">
                    <time
                      dateTime={post.date}
                      className="font-mono text-xs tracking-[0.16em] text-faint"
                    >
                      {formatDate(post.date)}
                    </time>
                    {post.draft ? (
                      <span className="font-mono text-xs tracking-[0.16em] text-accent md:mt-2 md:block">
                        DRAFT
                      </span>
                    ) : null}
                  </div>

                  <div className="flex max-w-[41rem] flex-col gap-2">
                    <h2 className="font-mono text-xl leading-snug font-medium text-ink-strong transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    {post.excerpt ? (
                      <p className="font-serif text-[1.0625rem] leading-relaxed text-ink-body">
                        {post.excerpt}
                      </p>
                    ) : null}
                    {post.tags.length > 0 ? (
                      <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                        {post.tags.map((tag) => (
                          <li
                            key={tag}
                            className="font-mono text-[0.6875rem] tracking-[0.16em] text-fainter"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
