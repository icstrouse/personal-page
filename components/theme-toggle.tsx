/**
 * Deliberately has no hooks, no onClick and no client directive of its own.
 *
 * The button is plain server-rendered markup. Which icon shows is decided by
 * CSS from [data-theme] on <html>, and the click is handled by a delegated
 * listener in the inline script in app/layout.tsx. That script runs while the
 * document is still parsing, so the toggle works from first paint and keeps
 * working even if React never hydrates.
 *
 * Both icons are always in the DOM; only one is displayed. The sun offers the
 * light theme, so it shows while the dark theme is active, and vice versa.
 */
export default function ThemeToggle() {
  return (
    <button
      type="button"
      data-theme-toggle
      aria-label="Toggle colour theme"
      className="flex min-h-11 cursor-pointer items-center text-muted transition-colors hover:text-accent"
    >
      <span className="flex items-center pb-1">
        <svg
          className="theme-to-light"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.2v2.3M12 19.5v2.3M4.1 4.1l1.6 1.6M18.3 18.3l1.6 1.6M2.2 12h2.3M19.5 12h2.3M4.1 19.9l1.6-1.6M18.3 5.7l1.6-1.6" />
        </svg>
        <svg
          className="theme-to-dark"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a8.5 8.5 0 1 0 10.8 10.8z" />
        </svg>
      </span>
    </button>
  );
}
