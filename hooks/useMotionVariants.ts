import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Variants } from "framer-motion";
import { useMemo } from "react";

interface UseMotionOptions {
  staggerChildren?: boolean;
  delay?: number;
  duration?: number;
}

export const useMotionVariants = (
  variant: "fadeIn" | "scaleIn" | "slideIn",
  direction: "up" | "down" | "left" | "right" = "up",
  options: UseMotionOptions = {}
): {
  variants: Variants;
  shouldReduceMotion: boolean;
  transition: any;
} => {
  const shouldReduceMotion = useReducedMotion();

  const variants = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        show: { 
          opacity: 1,
          transition: {
            duration: 0.3,
            ...(options.staggerChildren && { staggerChildren: 0 }),
          }
        }
      };
    }

    const baseTransition = {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: options.delay,
      duration: options.duration,
      ...(options.staggerChildren && { staggerChildren: 0.2 }),
    };

    switch (variant) {
      case "fadeIn":
        return {
          hidden: {
            opacity: 0,
            y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
            x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
          },
          show: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: baseTransition,
          },
        };
      case "scaleIn":
        return {
          hidden: { opacity: 0, scale: 0.9 },
          show: {
            opacity: 1,
            scale: 1,
            transition: baseTransition,
          },
        };
      case "slideIn":
        return {
          hidden: {
            x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
            y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
          },
          show: {
            x: 0,
            y: 0,
            transition: {
              ...baseTransition,
              damping: 20,
              stiffness: 100,
            },
          },
        };
      default:
        return {};
    }
  }, [variant, direction, shouldReduceMotion, options]);

  const transition = useMemo(() => ({
    type: "spring",
    stiffness: 100,
    damping: 15,
    duration: options.duration,
    delay: options.delay,
  }), [options]);

  return { variants, shouldReduceMotion, transition };
};
