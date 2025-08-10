import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export function MotionCard({ children, className, scale = 1.02 }: MotionCardProps) {
  return (
    <motion.div
      className={cn("p-4 rounded-xl bg-[var(--color-surface)]", className)}
      whileHover={{ scale }}
      transition={{ duration: 0.18 }}
    >
      {children}
    </motion.div>
  );
}
