import Image from "next/image";
import { Award, PiggyBank, Leaf, Lightbulb, Target } from "lucide-react";

import { VALUE_PROPS } from "@/lib/site-data";

const ICONS = [Award, PiggyBank, Leaf, Lightbulb];

export function About() {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <span className="absolute top-10 left-10 text-6xl">🐾</span>
        <span className="absolute top-40 right-20 text-4xl">🐾</span>
        <span className="absolute bottom-20 left-1/4 text-5xl">🐾</span>
        <span className="absolute bottom-40 right-1/3 text-3xl">🐾</span>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="font-medium text-primary">Sobre Nosotros</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Más de 15 años dedicados con pasión
          </h2>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              En WIPuP, llevamos más de 15 años dedicados con pasión al cuidado y bienestar de las
              mascotas. Lo que comenzó como una pequeña empresa de productos de higiene, ha crecido
              gracias al amor incondicional que sentimos por esos compañeros que llenan de luz y
              alegría nuestros hogares.
            </p>
            <div className="space-y-6">
              {VALUE_PROPS.map((prop, i) => {
                const Icon = ICONS[i];
                return (
                  <div key={prop.title} className="flex gap-4 transition-all duration-500 hover:translate-x-2">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 hover:rotate-6 hover:scale-110">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">{prop.title}</h3>
                      <p className="text-sm text-muted-foreground">{prop.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-border/50 bg-card-gradient p-8 shadow-elevated transition-transform duration-500 hover:scale-[1.02] lg:p-10">
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 hover:rotate-12 hover:bg-primary/20">
                    <Target className="h-7 w-7 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-foreground">Nuestra Misión</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Brindar productos de la más alta calidad para cuidar y proteger a las mascotas,
                    contribuyendo a su felicidad y a la de sus dueños. Cada compra nos cuenta una
                    historia de cariño y confianza que nos conmueve e inspira a seguir mejorando.
                  </p>
                </div>
                <div className="h-40 w-full flex-shrink-0 overflow-hidden rounded-2xl transition-transform duration-500 hover:scale-105 lg:w-40">
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
          </div>
        </div>

        <div className="mt-20 text-center">
          <span className="inline-block cursor-default rounded-full bg-primary/10 px-6 py-3 font-medium text-primary transition-colors duration-300 hover:bg-primary/20">
            🐾 Miles de mascotas felices 🐾
          </span>
        </div>
      </div>
    </section>
  );
}
