import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="pt-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-8 md:grid-cols-[1fr_auto] items-center"
      >
        <div>
          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl font-extrabold leading-tight"
          >
            Florian Obermayr
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-1 max-w-xl text-lg opacity-90"
          >
            Senior Fullstack Developer & Team Lead | Branch Manager
          </motion.p>
          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-sm opacity-90"
          >
            Currently based in Barcelona, I lead a talented team at a software
            development company. Outside of work, I enjoy video game development
            and other creative projects.
          </motion.p>
          <motion.p
            variants={item}
            className="mt-3 max-w-xl text-sm opacity-90"
          >
            When I'm not working on something, I am passionate about travel,
            cooking and learning new languages.
          </motion.p>

          <motion.div variants={item} className="my-6 flex gap-3">
            <motion.div
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium"
                style={{
                  background: "var(--color-primary)",
                  color: "var(--color-surface)",
                }}
              >
                View Projects
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={item} className="mt-4 text-sm">
            Interested in working together? Email me at{" "}
            <motion.a
              href="mailto:fmobermayr@gmail.com"
              className="underline"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
            >
              fmobermayr@gmail.com
            </motion.a>{" "}
            or reach out on{" "}
            <motion.a
              href="https://www.linkedin.com/in/florian-obermayr/"
              className="underline"
              target="_blank"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
            >
              LinkedIn
            </motion.a>
            .
          </motion.div>
        </div>

        <motion.div variants={item} className="block">
          <motion.div
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
            className="p-6 rounded-2xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)",
            }}
          >
            <Image
              src="/images/headshot.jpeg"
              alt="my headshot"
              width={300}
              height={300}
              className="rounded-lg shadow-lg"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
