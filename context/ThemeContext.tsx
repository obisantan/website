import React, { createContext, useContext, useState, useEffect } from 'react';

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

type ThemeContextType = {
  palette: Palette;
  setPalette: React.Dispatch<React.SetStateAction<Palette>>;
  setPreset: (preset: Palette) => void;
  resetPalette: () => void;
  updateColor: (key: keyof Palette, value: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyPalette(p: Palette) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty("--color-primary", p.primary);
  root.style.setProperty("--color-accent", p.accent);
  root.style.setProperty("--color-surface", p.surface);
  root.style.setProperty("--color-bg", p.bg);
  root.style.setProperty("--color-text", p.text);
  root.style.setProperty("--site-mode", p.mode);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPalette] = useState<Palette>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("site:palette") : null;
      return raw ? JSON.parse(raw) : DEFAULT_PALETTE;
    } catch (e) {
      return DEFAULT_PALETTE;
    }
  });

  useEffect(() => {
    applyPalette(palette);
    try {
      localStorage.setItem("site:palette", JSON.stringify(palette));
    } catch (e) {
      // ignore
    }
  }, [palette]);

  const updateColor = (key: keyof Palette, value: string) => {
    setPalette((p) => ({ ...p, [key]: value }));
  };

  const setPreset = (preset: Palette) => {
    setPalette(preset);
  };

  const resetPalette = () => {
    setPalette(DEFAULT_PALETTE);
  };

  return (
    <ThemeContext.Provider value={{ palette, setPalette, setPreset, resetPalette, updateColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { DEFAULT_PALETTE, LIGHT_PALETTE };
export type { Palette };
