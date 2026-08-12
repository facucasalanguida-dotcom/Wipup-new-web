import Image from "next/image";
import { Dog, Cat, PawPrint, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { STATS } from "@/lib/site-data";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-hero-gradient pt-20">
      <div className="absolute top-20 left-10 h-64 w-64 animate-pulse rounded-full bg-primary/5 blur-3xl" />
      <div
        className="absolute bottom-20 right-10 h-96 w-96 animate-pulse rounded-full bg-accent/5 blur-3xl"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in">
            <span className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors duration-300 hover:bg-primary/20">
              +15 años cuidando mascotas
            </span>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Todo lo que <span className="text-gradient">tu mascota</span> necesita
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Más de 15 años brindando productos de calidad para el bienestar de las mascotas y sus
              dueños en Argentina, impulsados por la confianza y el vínculo único que los une.
            </p>
            <div className="mb-12 flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild className="transition-transform duration-300 hover:scale-105">
                <a href="#productos">Ver Productos</a>
              </Button>
              <Button
                variant="heroOutline"
                size="lg"
                asChild
                className="transition-transform duration-300 hover:scale-105"
              >
                <a href="#nosotros">Conocenos</a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 border-t border-border/50 pt-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="transition-all duration-300 hover:-translate-y-1">
                  <p className="text-3xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-slide-up">
            <div className="absolute -top-4 right-8 z-20 animate-float rounded-full bg-card p-3 shadow-elevated lg:right-16">
              <Dog className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
            <div className="absolute bottom-32 -left-4 z-20 animate-float-delayed rounded-full bg-card p-3 shadow-elevated">
              <Cat className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
            <div className="group relative">
              <div className="absolute inset-0 rotate-6 rounded-3xl bg-primary/20 transition-transform duration-500 group-hover:rotate-3" />
              <Image
                src="/images/hero-pets-cW53GTuj.png"
                alt="Perro y gato felices, mascotas cuidadas con productos WIPuP"
                width={900}
                height={900}
                priority
                className="relative h-[400px] w-full rounded-3xl object-cover shadow-elevated transition-transform duration-500 group-hover:scale-[1.02] lg:h-[500px]"
              />
              <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-card p-4 shadow-elevated transition-transform duration-300 hover:scale-105">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <PawPrint className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Calidad Premium</p>
                  <p className="text-sm text-muted-foreground">Certificada</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#nosotros"
          className="group mt-12 flex flex-col items-center justify-center gap-1 pb-10 text-muted-foreground transition-colors hover:text-primary lg:mt-20"
          aria-label="Bajar a la sección Nosotros"
        >
          <span className="text-sm">Descubrí más</span>
          <ChevronDown className="h-5 w-5 animate-bounce-slow" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
