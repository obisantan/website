import { motion, AnimatePresence } from "framer-motion";
import { NavLinks } from "./NavLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onNavClick: () => void;
}

export function MobileMenu({ isOpen, onNavClick }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="md:hidden px-6 pb-4"
          style={{ color: "var(--color-text)" }}
        >
          <NavLinks onNavClick={onNavClick} vertical />
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
