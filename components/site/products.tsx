"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Ruler } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/lib/site-data";

export function Products() {
  const [activeId, setActiveId] = useState(PRODUCT_CATEGORIES[0].id);
  const active = PRODUCT_CATEGORIES.find((c) => c.id === activeId) ?? PRODUCT_CATEGORIES[0];

  return (
    <section id="productos" className="bg-secondary/30 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="font-medium text-primary">Nuestros Productos</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Una línea completa para el bienestar de tu mascota
          </h2>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {PRODUCT_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveId(category.id)}
              aria-pressed={category.id === activeId}
              className={cn(
                "flex items-center gap-3 rounded-full border-2 px-5 py-3 font-medium transition-all duration-300 cursor-pointer",
                category.id === activeId
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              )}
            >
              <Image
                src={category.categoryImage}
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
                aria-hidden="true"
              />
              {category.shortTitle}
            </button>
          ))}
        </div>

        <div className="mb-10 rounded-3xl border border-border/50 bg-card p-6 shadow-card sm:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Image
              src={active.categoryImage}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 flex-shrink-0 object-contain"
              aria-hidden="true"
            />
            <div>
              <h3 className="text-xl font-bold text-foreground sm:text-2xl">{active.title}</h3>
              <p className="mt-1 text-muted-foreground">{active.description}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {active.products.map((product) => (
            <Card
              key={product.name}
              className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={480}
                  height={360}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h4 className="mb-2 font-semibold text-foreground">{product.name}</h4>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                {product.sizes && (
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Badge key={size} variant="secondary" className="gap-1">
                        <Ruler className="h-3 w-3" aria-hidden="true" />
                        {size}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-muted-foreground">¿Querés ver el catálogo completo con todas las presentaciones?</p>
          <Button variant="hero" size="lg" asChild className="transition-transform duration-300 hover:scale-105">
            <a href="/catalogo-wipup-2025.pdf" download="Catalogo_WIPUP_2025.pdf">
              <Download className="h-5 w-5" aria-hidden="true" />
              Descargar Catálogo Completo
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
