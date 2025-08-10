import { NextPage } from 'next';
import Link from 'next/link';
import { motion } from "framer-motion";
import { useMotionVariants } from '@/hooks/useMotionVariants';

const Custom404: NextPage = () => {
  const { variants: containerVariants, shouldReduceMotion } = useMotionVariants(
    "fadeIn",
    "up",
    { staggerChildren: true }
  );
  
  const { variants: childVariants } = useMotionVariants("fadeIn", "up");
  const { variants: buttonVariants } = useMotionVariants("scaleIn");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center text-center px-4 min-h-[60vh]"
    >
      <motion.h1 
        variants={childVariants}
        className="text-6xl font-bold mb-4"
      >
        404
      </motion.h1>
      <motion.h2 
        variants={childVariants}
        className="text-2xl font-semibold mb-6"
      >
        Can I help you?
      </motion.h2>
      <motion.p 
        variants={childVariants}
        className="text-lg mb-8 max-w-md text-gray-600 dark:text-gray-400"
      >
        It seems you have lost your way.
      </motion.p>
      <motion.div
        variants={buttonVariants}
        whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
        whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium"
          style={{
            background: "var(--color-primary)",
            color: "var(--color-surface)",
          }}
        >
          Go Back
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Custom404;
