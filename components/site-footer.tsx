import { SITE } from "@/lib/nav";

export default function SiteFooter() {
  return (
    <footer className="mt-24">
      <div className="shell flex justify-between py-8">
        <span className="font-mono text-xs tracking-[0.14em] text-fainter">
          {SITE.location}
        </span>
        <span className="font-mono text-xs tracking-[0.14em] text-fainter">
          &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
