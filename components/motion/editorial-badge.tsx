"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { viewportOnce } from "@/lib/motion";

type EditorialBadgeProps = {
  /** Section index, e.g. "01". Purely decorative editorial numbering. */
  index?: string;
  label: string;
  detail?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

export function EditorialBadge({
  index,
  label,
  detail,
  tone = "light",
  align = "left",
  className,
}: EditorialBadgeProps) {
  const isDark = tone === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex items-start gap-3",
        align === "center" && "mx-auto w-fit items-center",
        className
      )}
    >
      <span
        className={cn(
          "mt-0.5 h-9 w-px shrink-0 self-stretch",
          align === "center" && "hidden",
          isDark ? "bg-ink-foreground/25" : "bg-ink/20"
        )}
        aria-hidden="true"
      />
      <div className={cn(align === "center" && "text-center")}>
        <p
          className={cn(
            "flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]",
            isDark ? "text-ink-foreground/70" : "text-ink/60"
          )}
        >
          {index && (
            <span className={isDark ? "text-primary-light" : "text-primary"}>{index}</span>
          )}
          {label}
        </p>
        {detail && (
          <p
            className={cn(
              "mt-1 max-w-[16rem] text-xs leading-relaxed",
              isDark ? "text-ink-foreground/45" : "text-ink/40"
            )}
          >
            {detail}
          </p>
        )}
      </div>
    </motion.div>
  );
}
