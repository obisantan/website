import type { Project } from '@/types';

export const siteConfig = {
  name: "Florian Obermayr",
  role: "Senior Fullstack Developer",
  title: "Senior Fullstack Developer & Team Lead | Branch Manager",
  description:
    "Currently based in Barcelona, I lead a talented team at a software development company. Outside of work, I enjoy video game development and other creative projects.",
  social: {
    linkedin: "https://www.linkedin.com/in/florian-obermayr/",
    email: "fmobermayr@gmail.com",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Recipes", href: "/recipes" },
    { label: "Favorite Dles", href: "/dles" },
  ],
  initials: "FO",
} as const;

export const defaultProjects = [
  {
    title: "Lingo Loop",
    summary:
      "a chill puzzle game about connecting words — My entry for the GMTK Game Jam 2025",
    tags: ["game", "game jam entry"],
    url: "https://ob-studios.itch.io/lingo-loop",
  },
  {
    title: "TBA",
    summary: "Unannounced Geography Tool",
    tags: ["geography", "tool"],
  },
  {
    title: "TBA",
    summary: "Daily Puzzle Game in the style of Wordle",
    tags: ["daily", "game"],
  },
] satisfies Project[];
