import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import { Logo } from './Header/Logo';
import { NavLinks } from './Header/NavLinks';
import { ThemeToggle } from './Header/ThemeToggle';
import { MobileMenu } from './Header/MobileMenu';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />
          <ThemeToggle />
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen((s) => !s)}
            className="p-2 rounded-md"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onNavClick={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
