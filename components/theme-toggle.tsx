"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

/**
 * The theme lives on <html data-theme>, set before first paint by the inline
 * script in the root layout. This component reads it rather than owning it, so
 * there is a single source of truth and no effect-driven state sync.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem("theme", next);
    } catch {
      /* private mode or blocked storage — the toggle still works for this visit */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      suppressHydrationWarning
      className="chrome cursor-pointer text-muted transition-colors hover:text-accent"
    >
      {next.toUpperCase()}
    </button>
  );
}
