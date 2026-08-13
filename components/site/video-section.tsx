"use client";

import { motion } from "framer-motion";
import { PlayCircle, Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { EditorialBadge } from "@/components/motion/editorial-badge";
import { scaleIn } from "@/lib/motion";

export function VideoSection() {
  return (
    <section id="videos" className="relative overflow-hidden bg-secondary/40 py-20 lg:py-32">
      <div className="absolute inset-0 bg-craft-grid opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 animate-blob rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="mb-12 text-center">
          <EditorialBadge index="N°06" label="Mirá WIPuP en acción" align="center" className="mb-6" />
          <Reveal>
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">Nuestros productos en video</h2>
          </Reveal>
        </div>

        <div className="flex justify-center">
          <Reveal variants={scaleIn} className="relative">
            <motion.div
              whileHover={{ rotate: 0, scale: 1.015 }}
              initial={{ rotate: -1.5 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[300px] rounded-[2.75rem] border-[10px] border-ink bg-ink p-1.5 shadow-elevated"
            >
              <div className="absolute left-1/2 top-3 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-ink-light/60" />
              <div className="overflow-hidden rounded-[2rem] bg-card">
                <video
                  src="/videos/wipup-demo.mp4"
                  className="aspect-[9/16] w-full object-cover"
                  controls
                  preload="metadata"
                  playsInline
                >
                  Tu navegador no soporta videos.
                </video>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12, x: "-50%" }}
              whileInView={{ opacity: 1, y: 0, x: "-50%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -top-5 left-1/2 flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-ink shadow-elevated"
            >
              <PlayCircle className="h-4 w-4 text-primary" aria-hidden="true" />
              Producto real, resultados reales
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="absolute -bottom-4 -right-6 hidden items-center gap-2 rounded-2xl bg-accent px-4 py-3 text-sm font-bold text-ink shadow-elevated sm:flex"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              +10K clientes felices
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
