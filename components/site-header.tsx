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
      <div className="shell flex items-baseline justify-between gap-6 py-7">
        <Link href="/" className="chrome text-muted transition-colors hover:text-accent">
          {SITE.domain}
        </Link>

        <nav className="flex items-baseline gap-6 sm:gap-10">
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
                    ? "chrome border-b border-accent pb-1 text-accent"
                    : "chrome pb-1 text-muted transition-colors hover:text-accent"
                }
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
