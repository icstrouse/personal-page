/**
 * Deliberately has no hooks, no onClick and no "use client" of its own.
 *
 * The button is plain server-rendered markup. Which label shows is decided by
 * CSS from [data-theme] on <html>, and the click is handled by a delegated
 * listener in the inline script in app/layout.tsx. That script runs while the
 * document is still parsing, so the toggle works from first paint and keeps
 * working even if React never hydrates — which a hook-driven version cannot
 * promise on a flaky mobile connection.
 */
export default function ThemeToggle() {
  return (
    <button
      type="button"
      data-theme-toggle
      aria-label="Toggle colour theme"
      className="flex min-h-11 cursor-pointer items-center text-muted transition-colors hover:text-accent"
    >
      <span className="chrome pb-1">
        <span className="theme-to-light">LIGHT</span>
        <span className="theme-to-dark">DARK</span>
      </span>
    </button>
  );
}
