"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How strongly the element follows the pointer. Keep low so it never leaves its hit box. */
  strength?: number;
};

const spring = { stiffness: 200, damping: 16, mass: 0.4 };

export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
