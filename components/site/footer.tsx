import { Mail, Instagram, MapPin } from "lucide-react";

import { CONTACT_EMAIL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/site-data";

const QUICK_LINKS = [
  { name: "Nosotros", href: "#nosotros" },
  { name: "Productos", href: "#productos" },
  { name: "Contacto", href: "#contacto" },
  { name: "Distribuidor", href: "#distribuidor" },
];

export function Footer() {
  return (
    <footer className="bg-foreground py-12 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/wipup-logo-_H8_HDtR.png"
              alt="Logo de WIPuP"
              className="h-16 w-auto invert"
            />
            <p className="mt-4 text-sm text-primary-foreground/70">
              Más de 15 años dedicados con pasión al cuidado y bienestar de las mascotas.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Enlaces Rápidos</h4>
            <nav className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-light"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Contacto</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-primary-light"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-primary-light"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                {INSTAGRAM_HANDLE}
              </a>
              <p className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Buenos Aires, Argentina
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} WIPuP. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
