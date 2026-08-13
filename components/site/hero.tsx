"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Cat, ChevronDown, Dog, PawPrint, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Counter } from "@/components/motion/counter";
import { cn } from "@/lib/utils";
import { STATS } from "@/lib/site-data";

const HEADLINE = [
  { text: "Todo lo que ", accent: false },
  { text: "tu mascota", accent: true },
  { text: " necesita", accent: false },
];

const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};
const wordItem = {
  hidden: { opacity: 0, y: "110%" },
  show: { opacity: 1, y: "0%", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function AnimatedHeadline() {
  return (
    <h1 className="mb-6 text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-[3.75rem]">
      {HEADLINE.map((chunk, chunkIndex) => {
        const words = chunk.text.trim().split(" ");
        return (
          <span key={chunkIndex}>
            {words.map((word, i) => (
              <span key={i}>
                <span className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span
                    variants={wordItem}
                    className={cn("inline-block", chunk.accent && "text-gradient")}
                  >
                    {word}
                  </motion.span>
                </span>
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
            {chunkIndex < HEADLINE.length - 1 ? " " : ""}
          </span>
        );
      })}
    </h1>
  );
}

export function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = imageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mvX.set(0);
    mvY.set(0);
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-hero-gradient pt-16 lg:pt-20">
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-[26rem] w-[26rem] animate-blob rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[30rem] w-[30rem] animate-blob rounded-full bg-accent/20 blur-3xl [animation-delay:-6s]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 right-1/4 h-40 w-40 animate-blob rounded-full bg-ink/5 blur-2xl [animation-delay:-3s]"
        aria-hidden="true"
      />

      <div className="container relative pt-14 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary-dark"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              +15 años cuidando mascotas en Argentina
            </motion.span>

            <motion.div initial="hidden" animate="show" variants={wordContainer}>
              <AnimatedHeadline />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              Más de 15 años brindando productos de calidad para el bienestar de las mascotas y sus
              dueños, impulsados por la confianza y el vínculo único que los une.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-12 flex flex-wrap gap-4"
            >
              <Magnetic strength={0.3}>
                <Button variant="hero" size="lg" asChild className="shadow-glow">
                  <a href="#productos">
                    Ver Productos
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </Button>
              </Magnetic>
              <Button
                variant="heroOutline"
                size="lg"
                asChild
                className="transition-transform duration-300 hover:scale-105"
              >
                <a href="#nosotros">Conocenos</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex flex-wrap gap-8 border-t border-border/60 pt-8"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="transition-transform duration-300 hover:-translate-y-1">
                  <p className="text-3xl font-bold text-ink">
                    <Counter value={stat.value} />
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ perspective: 1000 }}
          >
            <motion.div
              className="absolute -top-4 right-8 z-20 animate-float rounded-full bg-card p-3 shadow-elevated lg:right-16"
              aria-hidden="true"
            >
              <Dog className="h-8 w-8 text-primary" aria-hidden="true" />
            </motion.div>
            <motion.div
              className="absolute bottom-32 -left-4 z-20 animate-float-delayed rounded-full bg-card p-3 shadow-elevated"
              aria-hidden="true"
            >
              <Cat className="h-8 w-8 text-primary" aria-hidden="true" />
            </motion.div>

            <motion.div
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="group relative"
            >
              <div className="absolute inset-0 rotate-6 rounded-[2.5rem] bg-primary-gradient opacity-90 transition-transform duration-500 group-hover:rotate-3" />
              <Image
                src="/images/hero-pets-cW53GTuj.png"
                alt="Perro y gato felices, mascotas cuidadas con productos WIPuP"
                width={900}
                height={900}
                priority
                className="relative h-[400px] w-full rounded-[2.5rem] object-cover shadow-elevated lg:h-[500px]"
              />
              <div
                style={{ transform: "translateZ(40px)" }}
                className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-card/95 p-4 shadow-elevated backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <PawPrint className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-ink">Calidad Premium</p>
                  <p className="text-sm text-muted-foreground">Certificada</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.a
          href="#nosotros"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="group mx-auto mt-12 flex w-fit flex-col items-center justify-center gap-1 pb-8 text-muted-foreground transition-colors hover:text-primary lg:mt-16"
          aria-label="Bajar a la sección Nosotros"
        >
          <span className="text-sm">Descubrí más</span>
          <ChevronDown className="h-5 w-5 animate-bounce-slow" aria-hidden="true" />
        </motion.a>
      </div>
    </section>
  );
}
