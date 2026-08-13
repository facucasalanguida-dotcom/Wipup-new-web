"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Download, Ruler } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { EditorialBadge } from "@/components/motion/editorial-badge";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { PRODUCT_CATEGORIES, type Product } from "@/lib/site-data";

function ProductCard({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 220, damping: 22 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div variants={fadeUp} className="group" style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-card transition-shadow duration-300 hover:shadow-elevated"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) => `radial-gradient(220px circle at ${gx} ${gy}, hsl(var(--primary) / 0.16), transparent 70%)`
            ),
          }}
          aria-hidden="true"
        />
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            width={480}
            height={360}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="relative p-6" style={{ transform: "translateZ(30px)" }}>
          <h4 className="mb-2 font-semibold text-ink">{product.name}</h4>
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
      </motion.div>
    </motion.div>
  );
}

export function Products() {
  const [activeId, setActiveId] = useState(PRODUCT_CATEGORIES[0].id);
  const active = PRODUCT_CATEGORIES.find((c) => c.id === activeId) ?? PRODUCT_CATEGORIES[0];

  return (
    <section id="productos" className="bg-secondary/40 py-20 lg:py-32">
      <div className="container">
        <div className="mb-16 text-center">
          <EditorialBadge index="N°04" label="Nuestros productos" align="center" className="mb-6" />
          <Reveal>
            <h2 className="text-4xl font-bold leading-[1.02] text-ink sm:text-5xl lg:text-6xl">
              Una línea completa para el bienestar de tu mascota
            </h2>
          </Reveal>
        </div>

        <Reveal className="mb-12 flex flex-wrap justify-center gap-3" variants={fadeUp}>
          {PRODUCT_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveId(category.id)}
              aria-pressed={category.id === activeId}
              className={cn(
                "relative isolate flex items-center gap-3 rounded-full border-2 px-5 py-3 font-semibold transition-colors duration-300 cursor-pointer",
                category.id === activeId
                  ? "border-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              )}
            >
              {category.id === activeId && (
                <motion.span
                  layoutId="active-category-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary shadow-glow"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
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
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <div className="relative mb-10 overflow-hidden rounded-3xl border border-border/50 bg-card p-6 shadow-card sm:p-8">
              <div className="absolute inset-0 bg-craft-grid opacity-50" aria-hidden="true" />
              <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Image
                  src={active.categoryImage}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 flex-shrink-0 object-contain"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-xl font-bold text-ink sm:text-2xl">{active.title}</h3>
                  <p className="mt-1 text-muted-foreground">{active.description}</p>
                </div>
              </div>
            </div>

            <motion.div
              initial="hidden"
              animate="show"
              viewport={viewportOnce}
              variants={staggerContainer(0.08)}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {active.products.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <Reveal variants={fadeUp} className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-muted-foreground">¿Querés ver el catálogo completo con todas las presentaciones?</p>
          <Button variant="hero" size="lg" asChild className="transition-transform duration-300 hover:scale-105">
            <a href="/catalogo-wipup-2025.pdf" download="Catalogo_WIPUP_2025.pdf">
              <Download className="h-5 w-5" aria-hidden="true" />
              Descargar Catálogo Completo
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
