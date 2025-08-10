import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/context/ThemeContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div
        className="min-h-screen font-sans smooth-antialiased"
        style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
      >
        {/* Global CSS variables & small helper styles */}
        <style jsx global>{`
          :root {
            --color-primary: #7f34bc;
            --color-accent: #32c3b9;
            --color-surface: #0f0a1e;
            --color-bg: #130f29;
            --color-text: #e6eef8;
          }
          .smooth-antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
          /* keep UI transitions subtle and respect reduced-motion */
          @media (prefers-reduced-motion: no-preference) {
            .smooth-transition * { transition: background-color 220ms ease, color 220ms ease, border-color 220ms ease, box-shadow 220ms ease; }
          }
        `}</style>

        <Header />
        <main className="max-w-5xl mx-auto px-6 pb-12">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
