"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { WHOLESALE_FORM_URL } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Nosotros", href: "#nosotros" },
  { name: "Productos", href: "#productos" },
  { name: "Experiencia", href: "#experiencia" },
  { name: "Juego", href: "#juego" },
  { name: "Distribuidor", href: "#distribuidor" },
  { name: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-b border-border bg-background/80 shadow-soft backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href="#" className="group flex items-center" aria-label="WIPuP - Inicio">
            <motion.span
              whileHover={{ rotate: -4, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              className="inline-flex"
            >
              <Image
                src="/images/wipup-logo-_H8_HDtR.png"
                alt="Logo de WIPuP"
                width={160}
                height={160}
                priority
                className="h-12 w-auto lg:h-14"
              />
            </motion.span>
          </Link>

          <div
            className="hidden items-center gap-1 rounded-full border border-border bg-card/70 p-1 backdrop-blur-md md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHovered(link.name)}
                className="relative rounded-full px-4 py-2 text-sm font-semibold text-foreground/70 transition-colors duration-200 hover:text-foreground"
              >
                {hovered === link.name && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 rounded-full bg-accent-light/70"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Magnetic strength={0.25}>
              <Button variant="hero" asChild className="shadow-soft">
                <a href={WHOLESALE_FORM_URL} target="_blank" rel="noopener noreferrer">
                  Sumate a WIPuP
                </a>
              </Button>
            </Magnetic>
          </div>

          <button
            className="relative z-10 p-2 md:hidden cursor-pointer"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <motion.div
              className="container flex flex-col gap-1 py-4"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                  className="rounded-xl px-3 py-3 font-semibold text-foreground/80 transition-colors hover:bg-accent-light/60 hover:text-primary"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }} className="mt-2">
                <Button variant="hero" className="w-full" asChild>
                  <a href={WHOLESALE_FORM_URL} target="_blank" rel="noopener noreferrer">
                    Sumate a WIPuP
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
