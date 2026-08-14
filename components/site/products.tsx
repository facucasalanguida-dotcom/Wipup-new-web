"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Download, Ruler } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MagicCard } from "@/components/ui/magic-card";
import { Reveal } from "@/components/motion/reveal";
import { EditorialBadge } from "@/components/motion/editorial-badge";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { PRODUCT_CATEGORIES, type Product } from "@/lib/site-data";

function ProductCard({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 220, damping: 22 });

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
      >
        <MagicCard
          gradientSize={260}
          gradientFrom="#2DD4BF"
          gradientTo="#6EE7B7"
          gradientOpacity={0.22}
          className="overflow-hidden rounded-2xl border border-foreground/10 bg-card/70 p-0 shadow-card backdrop-blur-sm transition-shadow duration-300 hover:shadow-glow"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-secondary/60">
            <Image
              src={product.image}
              alt={product.name}
              width={480}
              height={360}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
          <div className="relative p-6" style={{ transform: "translateZ(30px)" }}>
            <h4 className="mb-2 font-semibold text-foreground">{product.name}</h4>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            {product.sizes && (
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Badge
                    key={size}
                    variant="secondary"
                    className="gap-1 border border-aqua/25 bg-aqua/10 text-aqua"
                  >
                    <Ruler className="h-3 w-3" aria-hidden="true" />
                    {size}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </MagicCard>
      </motion.div>
    </motion.div>
  );
}

export function Products() {
  const [activeId, setActiveId] = useState(PRODUCT_CATEGORIES[0].id);
  const active = PRODUCT_CATEGORIES.find((c) => c.id === activeId) ?? PRODUCT_CATEGORIES[0];

  return (
    <section id="productos" className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="absolute inset-0 bg-tech-grid opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 animate-blob rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="mb-16 text-center">
          <EditorialBadge index="N°04" label="Nuestros productos" tone="dark" align="center" className="mb-6" />
          <Reveal>
            <h2 className="text-4xl font-bold leading-[1.02] text-foreground sm:text-5xl lg:text-6xl">
              Una línea completa para el{" "}
              <span className="text-gradient-neon">bienestar</span> de tu mascota
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
                "relative isolate flex items-center gap-3 rounded-full border px-5 py-3 font-semibold transition-colors duration-300 cursor-pointer",
                category.id === activeId
                  ? "border-primary text-primary-foreground"
                  : "border-foreground/15 bg-card/60 text-foreground backdrop-blur-sm hover:border-primary/60 hover:text-primary"
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
            <div className="relative mb-10 overflow-hidden rounded-3xl glass p-6 shadow-card sm:p-8">
              <div className="absolute inset-0 bg-tech-grid opacity-50" aria-hidden="true" />
              <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Image
                  src={active.categoryImage}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 flex-shrink-0 object-contain drop-shadow-[0_0_18px_rgba(45,212,191,0.45)]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-xl font-bold text-foreground sm:text-2xl">{active.title}</h3>
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
          <Button
            variant="hero"
            size="lg"
            asChild
            className="shadow-glow transition-transform duration-300 hover:scale-105"
          >
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
