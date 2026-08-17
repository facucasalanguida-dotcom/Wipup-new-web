"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { viewportOnce } from "@/lib/motion";

type EditorialBadgeProps = {
  /** Section index, e.g. "01". Purely decorative editorial numbering. */
  index?: string;
  label: string;
  detail?: string;
  /** Which surface the badge sits on: the light "paper" ground or a dark "ink" block. */
  surface?: "paper" | "ink";
  align?: "left" | "center";
  className?: string;
};

export function EditorialBadge({
  index,
  label,
  detail,
  surface = "paper",
  align = "left",
  className,
}: EditorialBadgeProps) {
  const onPaper = surface === "paper";

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
          onPaper ? "bg-primary/40" : "bg-ink-foreground/30"
        )}
        aria-hidden="true"
      />
      <div className={cn(align === "center" && "text-center")}>
        <p
          className={cn(
            "flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]",
            onPaper ? "text-foreground/70" : "text-ink-foreground/80"
          )}
        >
          {index && (
            <span className={onPaper ? "text-primary" : "text-primary-light"}>{index}</span>
          )}
          {label}
        </p>
        {detail && (
          <p
            className={cn(
              "mt-1 max-w-[16rem] text-xs leading-relaxed",
              onPaper ? "text-muted-foreground" : "text-ink-foreground/55"
            )}
          >
            {detail}
          </p>
        )}
      </div>
    </motion.div>
  );
}
