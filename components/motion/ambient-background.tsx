"use client";

import dynamic from "next/dynamic";

import { InViewCanvas } from "@/components/motion/in-view-canvas";
import { cn } from "@/lib/utils";

const AmbientScene = dynamic(() => import("@/components/three/ambient-scene").then((m) => m.AmbientScene), {
  ssr: false,
});

export function AmbientBackground({ className }: { className?: string }) {
  return (
    <InViewCanvas className={cn("pointer-events-none", className)} fallback={<div aria-hidden="true" />}>
      <div className="h-full w-full" aria-hidden="true">
        <AmbientScene />
      </div>
    </InViewCanvas>
  );
}
