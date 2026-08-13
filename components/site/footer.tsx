import { Facebook, Instagram, Mail, MapPin, MessageCircle, PawPrint } from "lucide-react";

import { Reveal, RevealItem } from "@/components/motion/reveal";
import {
  CONTACT_EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_URL,
} from "@/lib/site-data";

const QUICK_LINKS = [
  { name: "Nosotros", href: "#nosotros" },
  { name: "Productos", href: "#productos" },
  { name: "Experiencia", href: "#experiencia" },
  { name: "Distribuidor", href: "#distribuidor" },
  { name: "Contacto", href: "#contacto" },
];

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: INSTAGRAM_URL },
  { icon: Facebook, label: "Facebook", href: FACEBOOK_URL },
  { icon: MessageCircle, label: "WhatsApp", href: WHATSAPP_URL },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-16 text-ink-foreground">
      <div className="container relative">
        <Reveal as="div" stagger staggerAmount={0.1} className="mb-12 grid gap-10 md:grid-cols-3">
          <RevealItem>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/wipup-logo-_H8_HDtR.png" alt="Logo de WIPuP" className="h-16 w-auto invert" />
            <p className="mt-4 max-w-xs text-sm text-ink-foreground/70">
              Más de 15 años dedicados con pasión al cuidado y bienestar de las mascotas de toda
              Argentina.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-primary"
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </RevealItem>

          <RevealItem>
            <h4 className="mb-4 font-semibold">Enlaces Rápidos</h4>
            <nav className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group flex w-fit items-center gap-2 text-sm text-ink-foreground/70 transition-colors hover:text-primary-light"
                >
                  <PawPrint className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true" />
                  {link.name}
                </a>
              ))}
            </nav>
          </RevealItem>

          <RevealItem>
            <h4 className="mb-4 font-semibold">Contacto</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2 text-sm text-ink-foreground/70 transition-colors hover:text-primary-light"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-ink-foreground/70 transition-colors hover:text-primary-light"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                {INSTAGRAM_HANDLE}
              </a>
              <p className="flex items-center gap-2 text-sm text-ink-foreground/70">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Buenos Aires, Argentina
              </p>
            </div>
          </RevealItem>
        </Reveal>

        <div className="flex flex-col items-center gap-2 border-t border-ink-foreground/10 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-ink-foreground/50">
            © {new Date().getFullYear()} WIPuP. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-ink-foreground/50">
            Hecho con dedicación para tu mascota
            <PawPrint className="h-3.5 w-3.5 text-primary-light" aria-hidden="true" />
          </p>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none block select-none pb-2 text-center font-display text-[19vw] font-bold leading-none tracking-tight text-ink-foreground/[0.05] sm:text-[16vw]"
      >
        WIPUP
      </span>
    </footer>
  );
}
