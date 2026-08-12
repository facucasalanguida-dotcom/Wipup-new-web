"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WHOLESALE_FORM_URL } from "@/lib/site-data";

const NAV_LINKS = [
  { name: "Nosotros", href: "#nosotros" },
  { name: "Productos", href: "#productos" },
  { name: "Contacto", href: "#contacto" },
  { name: "Distribuidor", href: "#distribuidor" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href="#" className="flex items-center" aria-label="WIPuP - Inicio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/wipup-logo-_H8_HDtR.png"
              alt="Logo de WIPuP"
              className="h-14 w-auto lg:h-16"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button variant="hero" asChild>
              <a href={WHOLESALE_FORM_URL} target="_blank" rel="noopener noreferrer">
                Sumate a WIPuP
              </a>
            </Button>
          </div>

          <button
            className="p-2 md:hidden cursor-pointer"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border/50 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2 font-medium text-muted-foreground transition-colors duration-300 hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
              <Button variant="hero" className="mt-2" asChild>
                <a href={WHOLESALE_FORM_URL} target="_blank" rel="noopener noreferrer">
                  Sumate a WIPuP
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
