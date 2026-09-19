import Link from "next/link";
import { SITE } from "@/lib/nav";

const CONNECT = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ian-strouse/" },
  { label: "GitHub", href: "https://github.com/icstrouse" },
  { label: "LeetCode", href: "https://leetcode.com/u/icstrouse/" },
];

export default function Home() {
  return (
    <main className="shell flex flex-col gap-14 pt-16 sm:gap-[3.75rem] sm:pt-[5.25rem]">
      <section className="flex flex-col gap-4">
        <h1 className="font-mono text-[2.375rem] leading-[1.05] font-medium tracking-[-0.035em] text-ink-strong sm:text-[3.25rem] lg:text-[4.25rem]">
          {SITE.name}
        </h1>
        <p className="font-mono text-[0.8125rem] tracking-[0.24em] text-accent">
          {SITE.role}
        </p>
      </section>

      <section className="row">
        <h2 className="label row-label">ABOUT ME</h2>
        <p className="prose max-w-[41rem]">
          I&rsquo;m a software engineer with 9 years of experience, primarily in
          backend engineering. Coming from a liberal arts background, I began my
          journey with a focus on people, but quickly developed my technical
          chops, learning IT and software development. I am now an experienced
          engineer specializing in the design and development of APIs, SQL
          databases, and systems architecture. My passion has always been
          bridging the divide between people and tech.
        </p>
      </section>

      <hr className="border-0 border-t border-rule" />

      <section className="row">
        <h2 className="label row-label">CONNECT</h2>
        <ul className="flex flex-col gap-1 md:gap-3.5">
          {CONNECT.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex min-h-11 items-center gap-3.5 font-mono text-[0.9375rem] text-ink-body md:min-h-0 md:items-baseline"
              >
                <span className="text-fainter">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-grow border-b border-rule-soft pb-0.5 transition-colors group-hover:border-accent md:flex-grow-0">
                  {link.label}
                </span>
                <span className="text-accent" aria-hidden="true">
                  &#8599;
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="row">
        <div className="row-label hidden md:block" />
        <Link
          href="/Ian_Strouse_Resume.pdf"
          className="inline-flex min-h-12 items-center justify-between gap-3 border border-accent px-5 py-3 font-mono text-[0.8125rem] tracking-[0.18em] text-accent transition-colors hover:bg-accent hover:text-bg sm:px-6"
        >
          RESUME
          <span aria-hidden="true">&#8594;</span>
        </Link>
      </section>
    </main>
  );
}
