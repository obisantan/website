import { siteConfig } from '@/config/site';

export type Project = {
  title: string;
  summary: string;
  tags: string[];
  url?: string;
  href?: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type Palette = {
  primary: string;
  accent: string;
  surface: string;
  bg: string;
  text: string;
  mode: "dark" | "light";
};

export type SiteConfig = typeof siteConfig;
