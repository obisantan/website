import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from "lucide-react";
import { LIGHT_PALETTE, DEFAULT_PALETTE } from '@/context/ThemeContext';

export function ThemeToggle() {
  const { palette, setPalette } = useTheme();
  
  return (
    <button 
      className="p-1 rounded" 
      title="Toggle color mode" 
      onClick={() => setPalette((p) => (p.mode === "dark" ? LIGHT_PALETTE : DEFAULT_PALETTE))}
    >
      {palette.mode === "dark" ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}
