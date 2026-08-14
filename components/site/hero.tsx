"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, PawPrint, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Particles } from "@/components/ui/particles";
import { Meteors } from "@/components/ui/meteors";
import { AuroraText } from "@/components/ui/aurora-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
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
      {/* Layered futuristic backdrop: scan grid → spotlight sweep → particles → meteors */}
      <div className="absolute inset-0 z-0 bg-tech-grid" aria-hidden="true" />
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(14, 95%, 62%, .12) 0, hsla(14, 95%, 55%, .04) 50%, transparent 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(42, 100%, 62%, .09) 0, hsla(42, 100%, 55%, .03) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(175, 90%, 55%, .07) 0, hsla(175, 90%, 45%, .03) 80%, transparent 100%)"
      />
      <Particles
        className="absolute inset-0 z-0"
        quantity={90}
        ease={70}
        color="#F97316"
        size={0.5}
        staticity={40}
      />
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <Meteors number={14} />
      </div>

      {/* Ghost wordmark anchoring the composition */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[4vw] left-1/2 z-0 block -translate-x-1/2 select-none whitespace-nowrap text-outline font-display text-[24vw] font-bold leading-none text-foreground/[0.04] sm:text-[20vw]"
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
              tone="dark"
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
                    colors={["#F97316", "#FBBF24", "#22D3C5", "#F97316"]}
                    speed={1.2}
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
                <ShimmerButton
                  shimmerColor="#FBBF24"
                  background="linear-gradient(135deg, hsl(14 95% 55%), hsl(30 100% 55%))"
                  className="font-semibold shadow-glow"
                  onClick={() => document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <span className="flex items-center gap-2">
                    Ver Productos
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </ShimmerButton>
              </Magnetic>
              <Button
                variant="heroOutline"
                size="lg"
                asChild
                className="border-cyan/40 text-cyan transition-all duration-300 hover:scale-105 hover:bg-cyan hover:text-cyan-foreground"
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
                    <p className="text-3xl font-bold text-foreground text-glow">
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
              className="absolute -top-4 right-8 z-20 animate-float rounded-full glass p-3 shadow-glow lg:right-16"
              aria-hidden="true"
            >
              <Sparkles className="h-8 w-8 text-accent" aria-hidden="true" />
            </div>
            <div
              className="absolute bottom-32 -left-4 z-20 animate-float-delayed rounded-full glass p-3 shadow-glow-cyan"
              aria-hidden="true"
            >
              <PawPrint className="h-8 w-8 text-cyan" aria-hidden="true" />
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
                {/* Neon rim + scanline wash so the photo sits in the dark scene */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-overlay"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(14 95% 55% / 0.25) 0%, transparent 45%, hsl(175 90% 45% / 0.2) 100%)",
                  }}
                  aria-hidden="true"
                />
              </div>

              <div
                style={{ transform: "translateZ(45px)" }}
                className="absolute bottom-6 left-6 right-6 rounded-2xl glass p-4 shadow-glow sm:right-auto"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15">
                    <PawPrint className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-cyan">
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
