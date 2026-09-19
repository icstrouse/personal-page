---
title: "A Placeholder Entry"
date: "2026-09-18"
excerpt: "Placeholder content that exercises every element the prose styles support — headings, lists, quotes, code, and tables."
tags: ["placeholder", "typography"]
draft: false
---

This is placeholder copy. It exists so the blog template can be judged on its
typography before any real writing goes in. Replace the whole file when there is
something true to say here.

The body face is Newsreader, set at a measure of roughly sixty-six characters.
Everything structural around it — the date above, the headings below, the
navigation — is IBM Plex Mono. The two faces are doing different jobs on
purpose: one carries the writing, the other carries the machine.

## A second-level heading

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.

### A third-level heading

An unordered list, which uses an em dash rather than a bullet:

- The first item in the list
- A second item, somewhat longer, to show how a wrapped line sits against the
  marker in the margin
- A third item

And an ordered list, whose numbers are set in the mono face:

1. Step one
2. Step two
3. Step three

> A block quote sits against a hairline rule in the accent colour. It is set in
> italic and stepped back from the body colour, so it reads as a different voice
> without shouting.

Inline code looks like `const measure = "66ch"` inside a sentence. A fenced
block gets its own panel:

```ts
export function formatDate(iso: string): string {
  const parsed = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", { timeZone: "UTC" }).format(parsed);
}
```

---

A horizontal rule sits above this paragraph. Links are set in the accent colour
with a hairline underline, like [this one](https://example.com).

| Layer | Typeface | Job |
| --- | --- | --- |
| Chrome | IBM Plex Mono | Navigation, labels, metadata |
| Body | Newsreader | The writing itself |

That is every element the stylesheet currently handles.
