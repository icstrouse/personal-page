export type NavLink = {
  href: string;
  label: string;
  /** Hidden links still resolve — the page exists, it just isn't advertised yet. */
  hidden?: boolean;
};

export const NAV: NavLink[] = [
  { href: "/", label: "HOME" },
  { href: "/work", label: "WORK", hidden: true },
  { href: "/blog", label: "BLOG" },
];

export const SITE = {
  name: "Ian Strouse",
  domain: "ICSTROUSE.COM",
  role: "FULL STACK ENGINEER",
  location: "BOULDER, COLORADO",
} as const;
