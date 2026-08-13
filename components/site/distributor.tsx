import Image from "next/image";
import { Mail, MessageCircle, PawPrint, Phone } from "lucide-react";

import { Reveal, RevealItem } from "@/components/motion/reveal";
import { EditorialBadge } from "@/components/motion/editorial-badge";
import { scaleIn } from "@/lib/motion";
import {
  DISTRIBUTOR_EMAIL,
  PHONE_DISPLAY,
  PHONE_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/site-data";

const CHANNELS = [
  { icon: MessageCircle, label: "Soporte WhatsApp", value: WHATSAPP_DISPLAY, href: WHATSAPP_URL, external: true },
  { icon: Phone, label: "Atención Telefónica", value: PHONE_DISPLAY, href: PHONE_URL, external: false },
  { icon: Mail, label: "Contáctanos por Email", value: DISTRIBUTOR_EMAIL, href: `mailto:${DISTRIBUTOR_EMAIL}`, external: false },
];

export function Distributor() {
  return (
    <section id="distribuidor" className="relative overflow-hidden bg-ink-gradient py-20 lg:py-32">
      <div className="absolute inset-0 bg-craft-grid bg-craft-grid-dark opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true">
        <PawPrint className="absolute top-12 left-[8%] h-20 w-20 rotate-12 text-ink-foreground" />
        <PawPrint className="absolute bottom-16 right-[10%] h-24 w-24 -rotate-12 text-ink-foreground" />
        <PawPrint className="absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rotate-45 text-ink-foreground" />
      </div>
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 animate-blob rounded-full bg-primary/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="mb-12 text-center">
          <EditorialBadge index="N°08" label="Trabajá con nosotros" tone="dark" align="center" className="mb-6" />
          <Reveal variants={scaleIn}>
            <h2 className="text-3xl font-bold text-ink-foreground sm:text-4xl lg:text-5xl">
              Distribuidor Oficial de WIPuP
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-16">
          <Reveal variants={scaleIn}>
            <div className="rounded-2xl bg-white p-6 shadow-elevated transition-all duration-500 hover:scale-105">
              <Image
                src="/images/daniel-lerman-logo-BUgqba-5.jpg"
                alt="Daniel Lerman S.R.L."
                width={280}
                height={160}
                className="h-32 w-auto object-contain lg:h-40"
              />
            </div>
          </Reveal>

          <Reveal as="div" stagger staggerAmount={0.1} className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-10">
            {CHANNELS.map((channel) => (
              <RevealItem key={channel.label} variants={scaleIn}>
                <a
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                  className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary/30">
                    <channel.icon className="h-8 w-8 text-ink-foreground" aria-hidden="true" />
                  </div>
                  <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-ink-foreground">
                    {channel.label}
                  </p>
                  <p className="break-all text-ink-foreground/70">{channel.value}</p>
                </a>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
