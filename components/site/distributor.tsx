import Image from "next/image";
import { Phone, Mail, MessageCircle } from "lucide-react";

import {
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
  PHONE_URL,
  PHONE_DISPLAY,
  DISTRIBUTOR_EMAIL,
} from "@/lib/site-data";

const CHANNELS = [
  { icon: MessageCircle, label: "Soporte WhatsApp", value: WHATSAPP_DISPLAY, href: WHATSAPP_URL, external: true },
  { icon: Phone, label: "Atención Telefónica", value: PHONE_DISPLAY, href: PHONE_URL, external: false },
  { icon: Mail, label: "Contáctanos por Email", value: DISTRIBUTOR_EMAIL, href: `mailto:${DISTRIBUTOR_EMAIL}`, external: false },
];

export function Distributor() {
  return (
    <section id="distribuidor" className="overflow-hidden bg-primary py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
          Distribuidor Oficial de WIPuP
        </h2>

        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-16">
          <div className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl">
            <Image
              src="/images/daniel-lerman-logo-BUgqba-5.jpg"
              alt="Daniel Lerman S.R.L."
              width={280}
              height={160}
              className="h-32 w-auto object-contain lg:h-40"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
            {CHANNELS.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary-foreground/20">
                  <channel.icon className="h-8 w-8 text-primary-foreground" aria-hidden="true" />
                </div>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-primary-foreground">
                  {channel.label}
                </p>
                <p className="break-all text-primary-foreground/80">{channel.value}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
