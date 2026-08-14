"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { viewportOnce } from "@/lib/motion";

type EditorialBadgeProps = {
  /** Section index, e.g. "01". Purely decorative editorial numbering. */
  index?: string;
  label: string;
  detail?: string;
  /** "dark" = sitting on a dark surface (the default across this site). */
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

export function EditorialBadge({
  index,
  label,
  detail,
  tone = "dark",
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
          isDark ? "bg-primary/50" : "bg-background/25"
        )}
        aria-hidden="true"
      />
      <div className={cn(align === "center" && "text-center")}>
        <p
          className={cn(
            "flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]",
            isDark ? "text-foreground/75" : "text-background/70"
          )}
        >
          {index && (
            <span className={isDark ? "text-primary text-glow" : "text-primary"}>{index}</span>
          )}
          {label}
        </p>
        {detail && (
          <p
            className={cn(
              "mt-1 max-w-[16rem] text-xs leading-relaxed",
              isDark ? "text-muted-foreground" : "text-background/50"
            )}
          >
            {detail}
          </p>
        )}
      </div>
    </motion.div>
  );
}
