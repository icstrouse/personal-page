import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://icstrouse.com"),
  title: {
    default: "Ian Strouse",
    template: "%s — Ian Strouse",
  },
  description:
    "Software engineer. Writing and projects.",
};

/**
 * Sets the theme before first paint so a light-theme visitor never sees a
 * dark flash. Dark is the default when nothing has been chosen.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "light") document.documentElement.setAttribute("data-theme", "light");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plexMono.variable} ${newsreader.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <div className="flex-grow">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
