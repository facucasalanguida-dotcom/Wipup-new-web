import { Quote, Star } from "lucide-react";

import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/motion/reveal";
import { EditorialBadge } from "@/components/motion/editorial-badge";
import { TESTIMONIALS } from "@/lib/site-data";

function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[number] }) {
  return (
    <figure className="group relative flex w-[320px] flex-shrink-0 flex-col overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow sm:w-[380px]">
      <div
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <Quote className="mb-3 h-6 w-6 text-primary/60" aria-hidden="true" />
      <div className="mb-3 flex gap-0.5" aria-label="Calificación 5 de 5 estrellas">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
        {testimonial.review}
      </blockquote>
      <figcaption>
        <p className="font-semibold text-foreground">{testimonial.name}</p>
        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const firstRow = TESTIMONIALS.slice(0, half);
  const secondRow = TESTIMONIALS.slice(half);

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="absolute inset-0 bg-tech-grid opacity-60" aria-hidden="true" />

      <div className="container relative mb-16 text-center">
        <EditorialBadge index="N°07" label="Testimonios" tone="dark" align="center" className="mb-6" />
        <Reveal>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Nuestros <span className="text-gradient-neon">clientes</span>
          </h2>
        </Reveal>
      </div>

      {/* Two rows scrolling in opposite directions for depth */}
      <div className="relative flex w-full flex-col gap-5">
        <Marquee className="[--duration:52s] [--gap:1.25rem]" pauseOnHover>
          {firstRow.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </Marquee>
        <Marquee className="[--duration:58s] [--gap:1.25rem]" pauseOnHover reverse>
          {secondRow.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </Marquee>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
