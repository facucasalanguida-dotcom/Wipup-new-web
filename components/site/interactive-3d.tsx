"use client";

import { Suspense, lazy } from "react";
import { PawPrint } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";

const PetScene = lazy(() => import("@/components/ui/pet-scene").then((m) => ({ default: m.PetScene })));

export function Interactive3D() {
  return (
    <section id="experiencia" className="bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="relative h-[560px] w-full overflow-hidden border-0 bg-black/[0.96] sm:h-[500px]">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={300} />

          <div className="flex h-full flex-col lg:flex-row">
            <div className="relative z-10 flex flex-1 flex-col justify-center p-8 lg:p-12">
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
                <PawPrint className="h-4 w-4" aria-hidden="true" />
                Experiencia WIPuP
              </span>
              <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl">
                Cuidado que se nota, mascotas que lo agradecen
              </h2>
              <p className="mt-4 max-w-lg text-neutral-300">
                Detrás de cada bolsa de WIPuP hay más de 15 años de dedicación al bienestar de tu
                mascota. Diseñamos productos pensados para que el cuidado diario sea simple, limpio
                y placentero para vos y tu compañero.
              </p>
              <div className="mt-8">
                <Button variant="hero" size="lg" asChild>
                  <a href="#productos">Descubrir productos</a>
                </Button>
              </div>
            </div>

            <div className="relative flex-1">
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
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
