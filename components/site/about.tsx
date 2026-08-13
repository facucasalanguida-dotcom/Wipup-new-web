import Image from "next/image";
import { Award, Leaf, Lightbulb, PawPrint, PiggyBank, Target } from "lucide-react";

import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { EditorialBadge } from "@/components/motion/editorial-badge";
import { fadeUp, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { STATS, VALUE_PROPS } from "@/lib/site-data";

const ICONS = [Award, PiggyBank, Leaf, Lightbulb];

export function About() {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" aria-hidden="true">
        <PawPrint className="absolute top-10 left-10 h-16 w-16 rotate-12" />
        <PawPrint className="absolute top-40 right-20 h-10 w-10 -rotate-12" />
        <PawPrint className="absolute bottom-20 left-1/4 h-12 w-12 rotate-45" />
        <PawPrint className="absolute bottom-40 right-1/3 h-8 w-8" />
      </div>

      <div className="container">
        <div className="mb-16 text-center">
          <EditorialBadge index="N°03" label="Sobre nosotros" align="center" className="mb-6" />
          <Reveal variants={fadeUp}>
            <h2 className="text-4xl font-bold leading-[1.02] text-ink sm:text-5xl lg:text-6xl">
              Más de 15 años dedicados con pasión
            </h2>
          </Reveal>
        </div>

        <div className="grid items-start gap-16 lg:grid-cols-2">
          <Reveal variants={slideInLeft}>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              En WIPuP, llevamos más de 15 años dedicados con pasión al cuidado y bienestar de las
              mascotas. Lo que comenzó como una pequeña empresa de productos de higiene, ha crecido
              gracias al amor incondicional que sentimos por esos compañeros que llenan de luz y
              alegría nuestros hogares.
            </p>
            <Reveal as="div" stagger staggerAmount={0.12} className="space-y-6">
              {VALUE_PROPS.map((prop, i) => {
                const Icon = ICONS[i];
                return (
                  <RevealItem
                    key={prop.title}
                    className="group flex gap-4 rounded-2xl p-2 transition-all duration-500 hover:translate-x-2 hover:bg-primary/5"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-ink">{prop.title}</h3>
                      <p className="text-sm text-muted-foreground">{prop.description}</p>
                    </div>
                  </RevealItem>
                );
              })}
            </Reveal>
          </Reveal>

          <Reveal variants={slideInRight} className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card-gradient p-8 shadow-elevated transition-transform duration-500 hover:scale-[1.01] lg:p-10">
              <div className="absolute inset-0 bg-craft-grid opacity-60" aria-hidden="true" />
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex-1">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 hover:rotate-12 hover:bg-primary/20">
                    <Target className="h-7 w-7 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-ink">Nuestra Misión</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Brindar productos de la más alta calidad para cuidar y proteger a las mascotas,
                    contribuyendo a su felicidad y a la de sus dueños. Cada compra nos cuenta una
                    historia de cariño y confianza que nos conmueve e inspira a seguir mejorando.
                  </p>
                </div>
                <div className="h-40 w-full flex-shrink-0 overflow-hidden rounded-2xl transition-transform duration-500 hover:scale-105 sm:w-40">
                  <Image
                    src="/images/hero-pets-cW53GTuj.png"
                    alt="Perro y gato juntos"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            <Reveal as="div" stagger staggerAmount={0.1} className="grid grid-cols-3 gap-4">
              {STATS.map((stat, i) => (
                <RevealItem
                  key={stat.label}
                  variants={scaleIn}
                  className={
                    "rounded-2xl p-5 text-center shadow-card transition-transform duration-300 hover:-translate-y-1 " +
                    (i === 1 ? "bg-ink text-ink-foreground" : "bg-card")
                  }
                >
                  <p className={"text-2xl font-bold sm:text-3xl " + (i === 1 ? "text-accent" : "text-primary")}>
                    <Counter value={stat.value} />
                  </p>
                  <p className={"mt-1 text-xs " + (i === 1 ? "text-ink-foreground/70" : "text-muted-foreground")}>
                    {stat.label}
                  </p>
                </RevealItem>
              ))}
            </Reveal>
          </Reveal>
        </div>

        <Reveal variants={scaleIn} className="mt-20 flex justify-center">
          <span className="inline-flex cursor-default items-center gap-2 rounded-full bg-primary/10 px-6 py-3 font-semibold text-primary transition-colors duration-300 hover:bg-primary/20">
            <PawPrint className="h-4 w-4" aria-hidden="true" />
            Miles de mascotas felices
            <PawPrint className="h-4 w-4" aria-hidden="true" />
          </span>
        </Reveal>
      </div>
    </section>
  );
}
