import type { Metadata } from "next";
import { Press_Start_2P, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oscar Ramos",
  description: "Showcase of my web development projects and skills",
};

// Apply the saved/preferred theme before first paint to avoid a flash.
// An optional ?theme=dark|light query param wins (and is persisted).
const themeScript = `
(function () {
  try {
    var q = new URLSearchParams(window.location.search).get('theme');
    if (q === 'dark' || q === 'light') {
      localStorage.setItem('theme', q);
    }
    var t = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (t === 'dark' || (!t && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pixel.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex flex-col min-h-screen bg-background text-foreground font-mono antialiased">
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
