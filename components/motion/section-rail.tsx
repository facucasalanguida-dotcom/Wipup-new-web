"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "productos", label: "Productos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "juego", label: "Juego" },
  { id: "distribuidor", label: "Distribuidor" },
  { id: "contacto", label: "Contacto" },
];

export function SectionRail() {
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      aria-label="Índice de secciones"
    >
      <div className="flex flex-col items-center gap-4 rounded-full border border-border/50 bg-card/70 px-2.5 py-5 shadow-elevated backdrop-blur-md">
        {SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <a key={section.id} href={`#${section.id}`} className="group relative flex items-center">
              <span
                className={cn(
                  "pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-xs font-semibold text-background opacity-0 shadow-elevated transition-all duration-200",
                  "translate-x-1 group-hover:translate-x-0 group-hover:opacity-100"
                )}
              >
                {section.label}
              </span>
              <span
                className={cn(
                  "relative flex h-3 w-3 items-center justify-center rounded-full border-2 transition-colors duration-300",
                  isActive ? "border-primary" : "border-foreground/25 group-hover:border-primary/60"
                )}
                aria-label={section.label}
              >
                {isActive && (
                  <motion.span
                    layoutId="section-rail-dot"
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
