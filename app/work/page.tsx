import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
};

/**
 * Reachable, but deliberately not in the nav yet — see `hidden` in lib/nav.ts.
 * Unhide it by deleting that flag once there is something here worth linking to.
 */
export default function WorkPage() {
  return (
    <main className="shell flex flex-col gap-14 pt-16 sm:pt-[5.25rem]">
      <section className="flex flex-col gap-4">
        <h1 className="font-mono text-[2.375rem] leading-[1.05] font-medium tracking-[-0.035em] text-ink-strong sm:text-[3.25rem]">
          Work
        </h1>
        <p className="font-mono text-[0.8125rem] tracking-[0.24em] text-accent">
          IN PROGRESS
        </p>
      </section>

      <section className="row">
        <h2 className="label row-label">STATUS</h2>
        <p className="prose max-w-[41rem]">
          This page isn&rsquo;t linked from the navigation yet. It exists so the
          route is ready when there is something here worth sending people to.
        </p>
      </section>
    </main>
  );
}
