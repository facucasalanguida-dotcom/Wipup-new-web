"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Mounts its WebGL children only while the wrapper is near the viewport,
 * so off-screen Canvas scenes stop burning GPU/battery on an endless render loop. */
export function InViewCanvas({
  children,
  className,
  fallback = null,
}: {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "200px 0px",
      threshold: 0.01,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {inView ? children : fallback}
    </div>
  );
}
