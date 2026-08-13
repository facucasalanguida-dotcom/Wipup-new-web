"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

type CounterProps = {
  /** e.g. "15+", "10K+", "20+" — the leading number is animated, the rest is kept as suffix. */
  value: string;
  className?: string;
  duration?: number;
};

export function Counter({ value, className, duration = 1.6 }: CounterProps) {
  const match = value.match(/^([\d.,]+)(.*)$/);
  const target = match ? parseFloat(match[1].replace(",", ".")) : 0;
  const suffix = match ? match[2] : "";
  const prefix = match ? "" : value;

  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (isInView) motionValue.set(target);
  }, [isInView, motionValue, target]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (!ref.current) return;
      const rounded = Number.isInteger(target) ? Math.round(latest) : Math.round(latest * 10) / 10;
      ref.current.textContent = `${prefix}${rounded}${suffix}`;
    });
  }, [spring, prefix, suffix, target]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
