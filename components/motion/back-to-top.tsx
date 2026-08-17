"use client";

import { ArrowUp } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const CIRCUMFERENCE = 119.4;

export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 260, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.08, 1], [0, 1, 1]);
  const dashOffset = useTransform(smooth, (v) => CIRCUMFERENCE * (1 - v));

  return (
    <motion.button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{ opacity }}
      className="group fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-card text-foreground shadow-elevated transition-transform duration-300 hover:scale-105 cursor-pointer sm:bottom-8 sm:left-8"
      aria-label="Volver arriba"
    >
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="19" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
        <motion.circle
          cx="22"
          cy="22"
          r="19"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeDasharray={CIRCUMFERENCE}
          style={{ strokeDashoffset: dashOffset }}
          strokeLinecap="round"
        />
      </svg>
      <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
    </motion.button>
  );
}
