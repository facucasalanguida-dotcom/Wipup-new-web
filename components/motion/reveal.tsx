"use client";

import type { ElementType, ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const motionTags = motion as any;

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variants?: Variants;
  delay?: number;
  /** Treat direct children as a stagger group instead of animating this node as one block. */
  stagger?: boolean;
  staggerAmount?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export function Reveal({
  children,
  as = "div",
  className,
  variants = fadeUp,
  delay = 0,
  stagger = false,
  staggerAmount = 0.12,
  ...rest
}: RevealProps) {
  const MotionTag = motionTags[as as string] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger ? staggerContainer(staggerAmount, delay) : variants}
      transition={stagger ? undefined : { delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  as = "div",
  className,
  variants = fadeUp,
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variants?: Variants;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) {
  const MotionTag = motionTags[as as string] ?? motion.div;
  return (
    <MotionTag className={className} variants={variants} {...rest}>
      {children}
    </MotionTag>
  );
}
