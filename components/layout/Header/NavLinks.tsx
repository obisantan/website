import Link from 'next/link';
import { siteConfig } from '@/config/site';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function NavItem({ href, children, onClick, className = "" }: NavItemProps) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`hover:underline ${className}`}
    >
      {children}
    </Link>
  );
}

interface NavLinksProps {
  onNavClick?: () => void;
  vertical?: boolean;
}

export function NavLinks({ onNavClick, vertical = false }: NavLinksProps) {
  return (
    <div className={vertical ? "flex flex-col gap-3" : "flex items-center gap-6"}>
      {siteConfig.navigation.map(({ label, href }) => (
        <NavItem 
          key={href}
          href={href}
          onClick={onNavClick}
          className={vertical ? "py-2" : "text-sm opacity-90"}
        >
          {label}
        </NavItem>
      ))}
    </div>
  );
}
