"use client";

import { useState, type FormEvent } from "react";
import { Facebook, Instagram, Mail, MapPin, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { EditorialBadge } from "@/components/motion/editorial-badge";
import { scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import {
  CONTACT_EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_URL,
} from "@/lib/site-data";

const CONTACT_CARDS = [
  { icon: Mail, label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: Instagram, label: "Instagram", value: INSTAGRAM_HANDLE, href: INSTAGRAM_URL },
  { icon: Facebook, label: "Facebook", value: "WIPuP Hogar", href: FACEBOOK_URL },
  { icon: MapPin, label: "Ubicación", value: "Buenos Aires, Argentina", href: undefined },
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = [
      `Hola WIPuP! Soy ${name || "-"}.`,
      email && `Email: ${email}`,
      phone && `Teléfono: ${phone}`,
      message && `Mensaje: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");
    const url = `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contacto" className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="absolute inset-0 bg-tech-grid opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] animate-blob rounded-full bg-cyan/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="mb-16 text-center">
          <EditorialBadge index="N°09" label="Contacto" tone="dark" align="center" className="mb-6" />
          <Reveal>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              ¿Tenés una consulta? <span className="text-gradient-neon">Escribinos</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal as="div" stagger staggerAmount={0.1} variants={slideInLeft} className="space-y-4">
            {CONTACT_CARDS.map((card) => {
              const content = (
                <>
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <card.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{card.label}</p>
                    <p className="text-muted-foreground">{card.value}</p>
                  </div>
                </>
              );
              const className =
                "group flex items-center gap-4 rounded-2xl glass p-6 shadow-card transition-all duration-300 hover:translate-x-2 hover:border-primary/40 hover:shadow-glow";

              return card.href ? (
                <RevealItem
                  key={card.label}
                  as="a"
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={className}
                >
                  {content}
                </RevealItem>
              ) : (
                <RevealItem key={card.label} className={className}>
                  {content}
                </RevealItem>
              );
            })}
          </Reveal>

          <Reveal
            variants={slideInRight}
            as="form"
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-2xl glass p-6 shadow-card sm:p-8"
          >
            <h3 className="mb-6 text-lg font-semibold text-foreground">Formulario de Contacto</h3>
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Opcional" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Contanos en qué te podemos ayudar"
                />
              </div>
              <Magnetic strength={0.15} className="w-full">
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Enviar por WhatsApp
                </Button>
              </Magnetic>
              <p className="text-center text-xs text-muted-foreground">
                Se abrirá WhatsApp con tu mensaje listo para enviar a nuestro equipo.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
