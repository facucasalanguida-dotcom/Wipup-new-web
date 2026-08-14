"use client";

import { Suspense, lazy } from "react";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { EditorialBadge } from "@/components/motion/editorial-badge";
import { InViewCanvas } from "@/components/motion/in-view-canvas";
import { slideInLeft } from "@/lib/motion";

const PetScene = lazy(() => import("@/components/ui/pet-scene").then((m) => ({ default: m.PetScene })));

export function Interactive3D() {
  return (
    <section id="experiencia" className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="absolute inset-0 bg-tech-grid opacity-50" aria-hidden="true" />
      <div className="container relative">
        <Reveal variants={slideInLeft}>
          <Card className="relative h-[600px] w-full overflow-hidden border border-primary/20 bg-secondary/60 shadow-glow backdrop-blur-sm sm:h-[500px]">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={340} />

            <div className="flex h-full flex-col lg:flex-row">
              <div className="relative z-10 flex flex-1 flex-col justify-center p-8 lg:p-12">
                <EditorialBadge index="N°05" label="Experiencia WIPuP" tone="dark" className="mb-6" />
                <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl">
                  Cuidado que se nota, mascotas que lo agradecen
                </h2>
                <p className="mt-4 max-w-lg text-muted-foreground">
                  Detrás de cada bolsa de WIPuP hay más de 15 años de dedicación al bienestar de tu
                  mascota. Diseñamos productos pensados para que el cuidado diario sea simple, limpio
                  y placentero para vos y tu compañero.
                </p>
                <div className="mt-8">
                  <Magnetic strength={0.25}>
                    <Button variant="hero" size="lg" asChild className="shadow-glow">
                      <a href="#productos">
                        Descubrir productos
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </Button>
                  </Magnetic>
                </div>
              </div>

              <InViewCanvas
                className="relative flex-1"
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <span
                      className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-primary-light"
                      role="status"
                      aria-label="Cargando escena 3D"
                    />
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="flex h-full w-full items-center justify-center">
                      <span
                        className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-primary-light"
                        role="status"
                        aria-label="Cargando escena 3D"
                      />
                    </div>
                  }
                >
                  <PetScene />
                </Suspense>
              </InViewCanvas>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
