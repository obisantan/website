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

type Palette = {
  primary: string;
  accent: string;
  surface: string;
  bg: string;
  text: string;
  mode: "dark" | "light";
};

const DEFAULT_PALETTE: Palette = {
  primary: "#06b6d4", // cyan-400
  accent: "#a78bfa", // violet-400
  surface: "#0b1220",
  bg: "#0f172a",
  text: "#e6eef8",
  mode: "dark",
};

const LIGHT_PALETTE: Palette = {
  primary: "#0ea5a4",
  accent: "#7c3aed",
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
    { title: "Word Loop (prototype)", summary: "A puzzle game built with Godot — create loops by connecting words.", tags: ["game", "godot", "puzzle"] },
    { title: "Dev Utilities", summary: "Small webtools to speed up everyday dev tasks.", tags: ["tools", "productivity"] },
    { title: "Portfolio Site Boilerplate", summary: "Minimal Next.js + Tailwind starter with theme switching.", tags: ["nextjs", "tailwind"] },
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
            OBI
          </div>
          <div>
            <div className="text-lg font-semibold">Florian Obermayr</div>
            <div className="text-xs text-[color:var(--color-accent)]">Lead Fullstack Developer</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm opacity-90">
          <a className="hover:underline" href="#projects">About</a>
          <a className="hover:underline" href="#about">Projects</a>
          <a className="hover:underline" href="#contact">Contact</a>
          <button
            aria-label="Open settings"
            className="p-2 rounded-md hover:bg-[color:var(--color-surface)]"
            onClick={() => setSettingsOpen(true)}
            title="Theme & settings"
          >
            <Settings size={16} />
          </button>
        </nav>

        <div className="md:hidden flex items-center gap-2">
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
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2">About</a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="py-2">Projects</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2">Contact</a>
              <button className="py-2 text-left" onClick={() => { setSettingsOpen(true); setMobileMenuOpen(false); }}>Theme</button>
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
            className="grid gap-8 md:grid-cols-2 items-center"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Sleek, minimalist web & game work.</h1>
              <p className="mt-4 max-w-xl text-sm opacity-90">I'm a professional fullstack web developer who builds webtools and indie games. This site is a minimal, responsive playground — tweak the palette in the Theme panel to make it yours.</p>

              <div className="mt-6 flex gap-3">
                <a href="#projects" className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium" style={{ background: "var(--color-primary)", color: "var(--color-surface)" }}>View Projects</a>
                <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm border" style={{ borderColor: "rgba(255,255,255,0.06)" }}>Contact</a>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="p-6 rounded-2xl" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)" }}>
                <div className="text-xs uppercase opacity-70 mb-3">Featured</div>
                <div className="grid gap-3">
                  <div className="p-4 rounded-xl" style={{ background: "var(--color-surface)" }}>
                    <div className="font-semibold">Word Loop — prototype</div>
                    <div className="text-sm opacity-80">Minimal puzzle mechanics, smooth drag & drop, Godot prototype.</div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: "var(--color-surface)" }}>
                    <div className="font-semibold">Developer Utilities</div>
                    <div className="text-sm opacity-80">Tiny tools I use daily to speed up work.</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* About */}
        <section id="about" className="mt-12">
          <h2 className="text-2xl font-semibold">About</h2>
          <div className="mt-4 text-sm max-w-2xl">I split my time between building production web apps and small indie projects (games, tools, prototypes). I prefer clean, minimal interfaces, and I like to keep animation subtle, purposeful and performant.</div>
        </section>

        {/* Projects */}
        <section id="projects" className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Selected Projects</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <motion.article
                key={p.title}
                whileHover={{ scale: reducedMotion ? 1 : 1.02 }}
                transition={{ duration: 0.18 }}
                className="p-4 rounded-xl"
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
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-12 pb-12">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <div className="mt-4 text-sm">Interested in working together? Email me at <a href="mailto:hello@example.com" className="underline">hello@example.com</a> or connect on your preferred network.</div>
        </section>
      </main>

      {/* Floating Settings Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          aria-label="Open theme settings"
          onClick={() => setSettingsOpen(true)}
          className="p-3 rounded-full shadow-lg"
          style={{ background: "var(--color-surface)", color: "var(--color-text)" }}
        >
          <Settings size={18} />
        </button>
      </div>

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
