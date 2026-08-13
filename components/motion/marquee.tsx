"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
};

const SPEED_CLASS = {
  slow: "animate-marquee-slow",
  normal: "animate-marquee",
  fast: "animate-marquee [animation-duration:16s]",
};

/** Seamless infinite marquee: the track holds two copies of the content and
 * scrolls exactly one copy-width so the loop point is invisible. */
export function Marquee({
  children,
  className,
  reverse = false,
  speed = "normal",
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div className={cn("group relative overflow-hidden mask-fade-x", className)}>
      <div
        className={cn(
          "flex w-max items-center gap-8",
          reverse ? "animate-marquee-reverse" : SPEED_CLASS[speed],
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        <div className="flex shrink-0 items-center gap-8">{children}</div>
        <div className="flex shrink-0 items-center gap-8" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
