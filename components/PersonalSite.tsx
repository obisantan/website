"use client";

/*
PersonalSite.tsx
A single-file, Next.js-ready React component (TypeScript) that implements a sleek, minimalist personal website.

Prerequisites & notes:
- Tailwind CSS installed and configured (this component uses Tailwind utility classes).
- Install dependencies: `npm add framer-motion lucide-react`.
- Drop this file into `app/page.tsx` (Next.js app router) or `pages/index.tsx` (pages router).
- The component uses CSS variables for theming and persists choices in localStorage.
- Accessibility: respects `prefers-reduced-motion`.

This file is intentionally self-contained so you can use it as a jumping-off point. Tweak content, layout, fonts, or add pages as you like.
*/

import React, { JSX, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Settings, Sun, Moon, X } from "lucide-react";
import Image from "next/image";

type Palette = {
  primary: string;
  accent: string;
  surface: string;
  bg: string;
  text: string;
  mode: "dark" | "light";
};

const DEFAULT_PALETTE: Palette = {
  primary: "#7f34bc",
  accent: "#32c3b9", 
  surface: "#0f0a1e",
  bg: "#130f29",
  text: "#e6eef8",
  mode: "dark",
};

const LIGHT_PALETTE: Palette = {
  primary: "#520EA4",
  accent: "#19a49b",
  surface: "#ffffff",
  bg: "#f8fafc",
  text: "#0f172a",
  mode: "light",
};

function applyPalette(p: Palette) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", p.primary);
  root.style.setProperty("--color-accent", p.accent);
  root.style.setProperty("--color-surface", p.surface);
  root.style.setProperty("--color-bg", p.bg);
  root.style.setProperty("--color-text", p.text);
  root.style.setProperty("--site-mode", p.mode);
}

export default function PersonalSite(): JSX.Element {
  const [palette, setPalette] = useState<Palette>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("site:palette") : null;
      return raw ? JSON.parse(raw) : DEFAULT_PALETTE;
    } catch (e) {
      return DEFAULT_PALETTE;
    }
  });

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // apply palette client-side
    applyPalette(palette);
    try {
      localStorage.setItem("site:palette", JSON.stringify(palette));
    } catch (e) {
      // ignore
    }
  }, [palette]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange as any);
      else mq.removeListener(onChange as any);
    };
  }, []);

  const projects = [
    { title: "Lingo Loop", summary: "a chill puzzle game about connecting words — My entry for the GMTK Game Jam 2025", tags: ["game", "game jam entry"] , url: "https://ob-studios.itch.io/lingo-loop"},
    { title: "TBA", summary: "Unannounced Geography Tool", tags: ["geography", "tool"] },
    { title: "TBA", summary: "Minimal Next.js + Tailwind starter with theme switching.", tags: ["game"] },
  ];

  function updateColor(key: keyof Palette, value: string) {
    setPalette((p) => ({ ...p, [key]: value }));
  }

  function setPreset(preset: Palette) {
    setPalette(preset);
  }

  function resetPalette() {
    setPalette(DEFAULT_PALETTE);
  }

  const containerTransition = reducedMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 120, damping: 18 };

  return (
    <div
      className="min-h-screen font-sans smooth-antialiased"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      {/* Global CSS variables & small helper styles */}
      <style jsx global>{`
        :root {
          --color-primary: ${DEFAULT_PALETTE.primary};
          --color-accent: ${DEFAULT_PALETTE.accent};
          --color-surface: ${DEFAULT_PALETTE.surface};
          --color-bg: ${DEFAULT_PALETTE.bg};
          --color-text: ${DEFAULT_PALETTE.text};
        }
        .smooth-antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        /* keep UI transitions subtle and respect reduced-motion */
        @media (prefers-reduced-motion: no-preference) {
          .smooth-transition * { transition: background-color 220ms ease, color 220ms ease, border-color 220ms ease, box-shadow 220ms ease; }
        }
      `}</style>

      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-md flex items-center justify-center text-sm font-semibold"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))", color: "var(--color-surface)" }}
          >
            FO
          </div>
          <div>
            <div className="text-lg font-semibold">Florian Obermayr</div>
            <div className="text-xs text-[color:var(--color-accent)]">Senior Fullstack Developer</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm opacity-90">
          <a className="hover:underline" href="#projects">Projects</a>
          <a className="hover:underline" href="#contact">Contact</a>
          <button className="p-1 rounded" title="Toggle color mode" onClick={() => setPalette((p) => (p.mode === "dark" ? LIGHT_PALETTE : DEFAULT_PALETTE))}>
            {palette.mode === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          { /* Settings button 
          <button
            aria-label="Open settings"
            className="p-2 rounded-md hover:bg-[color:var(--color-surface)]"
            onClick={() => setSettingsOpen(true)}
            title="Theme & settings"
          >
            <Settings size={16} />
          </button>
          */}
        </nav>

        <div className="md:hidden flex items-center gap-2">
            <button className="p-1 rounded" title="Toggle color mode" onClick={() => setPalette((p) => (p.mode === "dark" ? LIGHT_PALETTE : DEFAULT_PALETTE))}>
              {palette.mode === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          <button
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen((s) => !s)}
            className="p-2 rounded-md"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden px-6 pb-4"
            style={{ color: "var(--color-text)" }}
          >
            <div className="flex flex-col gap-3">
              <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="py-2">Projects</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2">Contact</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-6 pb-12">
        <section className="pt-6">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={containerTransition}
            className="grid gap-8 md:grid-cols-[1fr_auto] items-center"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Florian Obermayr
              </h1>
              <p className="mt-1 max-w-xl text-lg opacity-90">
                Senior Fullstack Developer & Team Lead | Branch Manager
              </p>
              <p className="mt-5 max-w-xl text-sm opacity-90">
                Currently based in Barcelona, I lead a talented team at a software development company.
                Outside of work, I enjoy video game development and other creative projects.
              </p>
              <p className="mt-3 max-w-xl text-sm opacity-90">
                When I'm not working on something, I am passionate about travel, cooking and learning new languages.
              </p>


              <div className="mt-6 flex gap-3">
                <a href="#projects" className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium" style={{ background: "var(--color-primary)", color: "var(--color-surface)" }}>View Projects</a>
                <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm border" style={{ borderColor: "rgba(255,255,255,0.06)" }}>Contact</a>
              </div>
            </div>

            <div className="block">
              <div className="p-6 rounded-2xl" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)" }}>
                <Image
                  src="/images/headshot.jpeg"
                  alt="my headshot"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg"
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))" }}
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Projects */}
        <section id="projects" className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Recent Projects</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => {
              const card = (
                <motion.article
                  key={p.title}
                  whileHover={{ scale: reducedMotion ? 1 : 1.02 }}
                  transition={{ duration: 0.18 }}
                  className="p-4 rounded-xl cursor-pointer"
                  style={{ background: "var(--color-surface)" }}
                >
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm opacity-80 mt-2">{p.summary}</div>
                  <div className="mt-3 flex gap-2 text-xs opacity-90">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-1 rounded-full text-[0.65rem]" style={{ background: "rgba(255,255,255,0.02)" }}>{t}</span>
                    ))}
                  </div>
                </motion.article>
              );
              return p.url ? (
                <a
                  key={p.title}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  {card}
                </a>
              ) : card;
            })}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-12 pb-12">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <div className="mt-4 text-sm">Interested in working together? Email me at <a href="mailto:fmobermayr@gmail.com" className="underline">fmobermayr@gmail.com</a> or find me on <a href="https://www.linkedin.com/in/florian-obermayr/" className="underline" target="_blank">LinkedIn</a>.</div>
        </section>
      </main>

      {/* Floating Settings Button
      <div className="fixed bottom-6 right-6 z-50">
        <button className="p-1 rounded" title="Toggle color mode" onClick={() => setPalette((p) => (p.mode === "dark" ? LIGHT_PALETTE : DEFAULT_PALETTE))}>
           {palette.mode === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div> */}

      {/* Settings / Theme Panel */}
      <AnimatePresence>
        {settingsOpen && (
          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.18 }}
            className="fixed right-6 top-6 z-50 w-80 max-w-[92vw] rounded-xl p-4"
            style={{ background: "var(--color-surface)", color: "var(--color-text)" }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold">Appearance</div>
              <button onClick={() => setSettingsOpen(false)} aria-label="Close settings" className="p-1">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs mb-1">Primary</label>
                <input
                  aria-label="Primary color"
                  type="color"
                  value={palette.primary}
                  onChange={(e) => updateColor("primary", e.target.value)}
                  className="w-full h-10 p-0 border-0"
                />
              </div>

              <div>
                <label className="block text-xs mb-1">Accent</label>
                <input type="color" value={palette.accent} onChange={(e) => updateColor("accent", e.target.value)} className="w-full h-10 p-0 border-0" />
              </div>

              <div>
                <label className="block text-xs mb-1">Surface</label>
                <input type="color" value={palette.surface} onChange={(e) => updateColor("surface", e.target.value)} className="w-full h-10 p-0 border-0" />
              </div>

              <div>
                <label className="block text-xs mb-1">Background</label>
                <input type="color" value={palette.bg} onChange={(e) => updateColor("bg", e.target.value)} className="w-full h-10 p-0 border-0" />
              </div>

              <div>
                <label className="block text-xs mb-1">Text</label>
                <input type="color" value={palette.text} onChange={(e) => updateColor("text", e.target.value)} className="w-full h-10 p-0 border-0" />
              </div>

              <div className="flex gap-2 mt-2">
                <button onClick={() => setPreset(DEFAULT_PALETTE)} className="flex-1 py-2 rounded-md text-sm" style={{ background: "rgba(255,255,255,0.03)" }}>Dark</button>
                <button onClick={() => setPreset(LIGHT_PALETTE)} className="flex-1 py-2 rounded-md text-sm" style={{ background: "rgba(255,255,255,0.03)" }}>Light</button>
              </div>

              <div className="flex gap-2">
                <button onClick={resetPalette} className="flex-1 py-2 rounded-md text-sm" style={{ background: "rgba(255,255,255,0.03)" }}>Reset</button>
                <button onClick={() => setSettingsOpen(false)} className="flex-1 py-2 rounded-md text-sm" style={{ background: "var(--color-primary)", color: "var(--color-surface)" }}>Done</button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Small footer */}
      <footer className="max-w-5xl mx-auto px-6 py-6 text-xs opacity-80">
        <div className="flex items-center justify-between">
          <div>© {new Date().getFullYear()} Florian Obermayr</div>
          <div className="flex items-center gap-4">
            <button className="p-1 rounded" title="Toggle color mode" onClick={() => setPalette((p) => (p.mode === "dark" ? LIGHT_PALETTE : DEFAULT_PALETTE))}>
              {palette.mode === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            {/* <button className="p-1 rounded" onClick={() => { navigator.clipboard?.writeText("hello@example.com"); }} title="Copy email">Copy email</button> */}        </div>
        </div>
      </footer>
    </div>
  );
}
