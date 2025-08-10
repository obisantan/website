import React from 'react';
import { Sun, Moon } from "lucide-react";
import { useTheme } from '@/context/ThemeContext';
import { LIGHT_PALETTE, DEFAULT_PALETTE } from '@/context/ThemeContext';

export default function Footer() {
  const { palette, setPalette } = useTheme();

  return (
    <footer className="max-w-5xl mx-auto px-6 py-6 text-xs opacity-80">
      <div className="flex items-center justify-between">
        <div>© {new Date().getFullYear()} Florian Obermayr</div>
        <div className="flex items-center gap-4">
          <button 
            className="p-1 rounded" 
            title="Toggle color mode" 
            onClick={() => setPalette((p) => (p.mode === "dark" ? LIGHT_PALETTE : DEFAULT_PALETTE))}
          >
            {palette.mode === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </div>
    </footer>
  );
}
