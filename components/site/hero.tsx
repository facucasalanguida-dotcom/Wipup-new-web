"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, PawPrint, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/ui/aurora-text";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Magnetic } from "@/components/motion/magnetic";
import { EditorialBadge } from "@/components/motion/editorial-badge";
import { STATS } from "@/lib/site-data";

/** Splits "15+" / "10K+" into the numeric part the ticker animates and its suffix. */
function splitStat(value: string) {
  const match = value.match(/^([\d.,]+)(.*)$/);
  if (!match) return { value: 0, suffix: value };
  return { value: parseFloat(match[1].replace(",", ".")), suffix: match[2] };
}

const HEADLINE_LEAD = ["Todo", "lo", "que"];
const HEADLINE_TAIL = ["necesita"];

const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } },
};
const wordItem = {
  hidden: { opacity: 0, y: "110%" },
  show: { opacity: 1, y: "0%", transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

function Word({ children }: { children: string }) {
  return (
    <span className="inline-block overflow-hidden pb-1 align-bottom">
      <motion.span variants={wordItem} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

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
    <section
      id="inicio"
      className="relative isolate min-h-screen overflow-hidden bg-hero-gradient pt-16 lg:pt-20"
    >
      {/* Soft backdrop: dotted paper trama + three slow pastel washes */}
      <div className="absolute inset-0 z-0 bg-soft-dots opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 top-0 h-[26rem] w-[26rem] animate-blob rounded-full bg-primary-light/40 blur-3xl" />
        <div className="absolute -right-16 top-24 h-[22rem] w-[22rem] animate-float rounded-full bg-accent-light/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[20rem] w-[20rem] animate-float-delayed rounded-full bg-aqua-light/45 blur-3xl" />
      </div>

      {/* Ghost wordmark anchoring the composition */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[4vw] left-1/2 z-0 block -translate-x-1/2 select-none whitespace-nowrap text-outline font-display text-[24vw] font-bold leading-none text-primary/[0.09] sm:text-[20vw]"
      >
        WIPUP
      </span>

      <div className="container relative z-10 pt-14 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <EditorialBadge
              index="N°01"
              label="+15 años cuidando mascotas"
              detail="Calidad certificada en toda Argentina"
              className="mb-8"
            />

            <motion.h1
              initial="hidden"
              animate="show"
              variants={wordContainer}
              className="mb-6 text-[clamp(2.75rem,5.4vw,5.25rem)] font-bold leading-[0.98] tracking-tight text-foreground"
            >
              {HEADLINE_LEAD.map((w) => (
                <span key={w}>
                  <Word>{w}</Word>{" "}
                </span>
              ))}
              <span className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span variants={wordItem} className="inline-block">
                  <AuroraText
                    colors={["#2F7D6F", "#4E9B74", "#3C8A99", "#2F7D6F"]}
                    speed={1}
                  >
                    tu mascota
                  </AuroraText>
                </motion.span>
              </span>{" "}
              {HEADLINE_TAIL.map((w) => (
                <Word key={w}>{w}</Word>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              Más de 15 años brindando productos de calidad para el bienestar de las mascotas y sus
              dueños, impulsados por la confianza y el vínculo único que los une.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="mb-12 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.3}>
                <Button
                  size="lg"
                  className="group rounded-full bg-primary px-8 font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:bg-primary-dark hover:shadow-elevated"
                  onClick={() => document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Ver Productos
                  <ArrowRight
                    className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </Magnetic>
              <Button
                variant="heroOutline"
                size="lg"
                asChild
                className="border-aqua/40 text-aqua transition-all duration-300 hover:scale-105 hover:bg-aqua hover:text-aqua-foreground"
              >
                <a href="#nosotros">Conocenos</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-wrap gap-8 border-t border-border/60 pt-8"
            >
              {STATS.map((stat) => {
                const { value, suffix } = splitStat(stat.value);
                return (
                  <div key={stat.label} className="transition-transform duration-300 hover:-translate-y-1">
                    <p className="text-3xl font-bold text-foreground">
                      <NumberTicker value={value} className="text-foreground" />
                      {suffix}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ perspective: 1000 }}
          >
            <div
              className="absolute -top-4 right-8 z-20 animate-float rounded-full glass p-3 shadow-halo lg:right-16"
              aria-hidden="true"
            >
              <Sparkles className="h-8 w-8 text-accent" aria-hidden="true" />
            </div>
            <div
              className="absolute bottom-32 -left-4 z-20 animate-float-delayed rounded-full glass p-3 shadow-halo-aqua"
              aria-hidden="true"
            >
              <PawPrint className="h-8 w-8 text-aqua" aria-hidden="true" />
            </div>

            <motion.div
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="group relative rounded-[2.5rem]"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] border border-foreground/10">
                <Image
                  src="/images/hero-pets-cW53GTuj.png"
                  alt="Perro y gato felices, mascotas cuidadas con productos WIPuP"
                  width={900}
                  height={900}
                  priority
                  className="h-[400px] w-full object-cover lg:h-[500px]"
                />
                {/* Fade into the paper, plus a whisper of mint so the photo sits in the palette */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(146 50% 78% / 0.45) 0%, transparent 50%, hsl(190 48% 80% / 0.4) 100%)",
                  }}
                  aria-hidden="true"
                />
              </div>

              <div
                style={{ transform: "translateZ(45px)" }}
                className="absolute bottom-6 left-6 right-6 rounded-2xl glass p-4 shadow-halo sm:right-auto"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15">
                    <PawPrint className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-aqua">
                      Certificación
                    </p>
                    <p className="font-semibold text-foreground">Calidad Premium</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.a
          href="#nosotros"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
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
