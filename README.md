# icstrouse.com

Personal site and writing archive. Live at **[icstrouse.com](https://icstrouse.com)**.

Next 16 (App Router) · React 19 · Tailwind v4 · TypeScript · no database

---

## Decisions worth knowing

A few things here are deliberate and would look like mistakes otherwise.

### Nothing essential depends on hydration

The theme toggle is a plain server-rendered `<button>` with no hooks and no
`onClick`. Which icon it shows is decided by CSS from `[data-theme]` on `<html>`,
and the click is caught by a delegated listener in the same inline script that
prevents the theme flash. That script runs while the document is still parsing,
so the control works from first paint and keeps working if React never hydrates.

It started as a client component using `useSyncExternalStore`. On mobile it
rendered perfectly and did nothing when tapped, because the handler only existed
once hydration completed. The rule that came out of it: anything that *must*
work — theme, navigation, reading the writing — works from the server-rendered
HTML, with JavaScript as enhancement.

### Design tokens live in exactly one place

`app/globals.css` defines the palette as custom properties on `:root`, with a
`[data-theme="light"]` block overriding the same names. Tailwind v4's `@theme
inline` maps them to utility classes, so theming is one attribute swap and no
component knows which theme is active.

### Posts are plain markdown

`content/posts/*.md` with frontmatter, rendered by `remark` + `remark-gfm` at
build time. No database, no admin UI, no CMS. The site is an archive its author
has to keep adding to, so publishing friction was the thing most worth
minimising.

Drafts are visible in `next dev` and excluded from production builds.

### Dates are formatted by hand

`lib/posts.ts` uses a fixed month table rather than `Intl.DateTimeFormat`. With
`month: "short"` current ICU renders September as **Sept** while every other
month is three letters, which broke the alignment of the monospace date column.
A fixed table is also immune to the host's ICU version.

### Routes can exist without being advertised

`lib/nav.ts` carries a `hidden` flag. `/work` resolves but is kept out of the
navigation until there is something there worth linking to.

---

## Structure

```
app/
  layout.tsx            fonts, theme script, header and footer
  globals.css           tokens, prose styles
  page.tsx              home
  blog/page.tsx         index
  blog/[slug]/page.tsx  entry
  work/page.tsx         hidden from nav
components/             site-header · site-footer · theme-toggle
lib/
  nav.ts                navigation and site constants
  posts.ts              markdown loading, frontmatter, date formatting
content/posts/          the writing
```

## Running it

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # every route prerenders static
```

## Adding a post

Create `content/posts/<slug>.md`:

```markdown
---
title: "Charlie's Gardens"
date: "2012-09-13"
excerpt: "A line from the piece, shown on the index and as the meta description."
tags: ["Boulder"]
draft: false
---

Body copy.
```

`tags` names the era of the author's life rather than the subject of the piece —
`Boulder`, `Peace Corps`, `gooWee`, `Discovery Genie`, `Featherwork`. One per
entry. Dates are when a piece was written, not when it was published here, so
the archive reads as a timeline.

## Type

IBM Plex Mono carries the chrome — navigation, labels, metadata, headings.
Newsreader carries body prose. The split is the point: every piece of interface
is machine, every piece of writing is literature.
