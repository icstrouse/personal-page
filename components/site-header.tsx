"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/lib/nav";
import ThemeToggle from "./theme-toggle";

export default function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const links = NAV.filter((link) => !link.hidden);

  return (
    <header className="border-b border-rule">
      {/*
        Two rules keep this robust on small screens:
        1. The nav (which holds the theme toggle) is shrink-0, and the wordmark
           is min-w-0 + truncate — so if anything ever runs out of room it is
           the wordmark that clips, never a control that gets pushed off-screen.
        2. Every control is a 44px tap target, with pb-1 on all three inner
           spans so their baselines agree whether or not one is underlined.
      */}
      <div className="shell flex items-center justify-between gap-4 py-2 sm:gap-6 sm:py-4">
        <Link
          href="/"
          className="flex min-h-11 min-w-0 items-center text-muted transition-colors hover:text-accent"
        >
          <span className="chrome min-w-0 truncate pb-1">{SITE.domain}</span>
        </Link>

        <nav className="flex shrink-0 items-center gap-4 sm:gap-10">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "flex min-h-11 items-center text-accent"
                    : "flex min-h-11 items-center text-muted transition-colors hover:text-accent"
                }
              >
                <span
                  className={
                    active ? "chrome border-b border-accent pb-1" : "chrome pb-1"
                  }
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
