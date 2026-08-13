import { Quote, Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { TESTIMONIALS } from "@/lib/site-data";

export function Testimonials() {
  return (
    <section className="bg-background py-20 lg:py-32">
      <div className="container mb-16 text-center">
        <Reveal>
          <span className="font-semibold text-primary">Testimonios</span>
          <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">Nuestros clientes</h2>
        </Reveal>
      </div>

      <Reveal className="w-full">
        <Marquee speed="slow">
          {TESTIMONIALS.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="flex w-[320px] flex-shrink-0 flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated sm:w-[380px]"
            >
              <Quote className="mb-3 h-6 w-6 text-primary/40" aria-hidden="true" />
              <div className="mb-3 flex gap-0.5" aria-label="Calificación 5 de 5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
                ))}
              </div>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                {testimonial.review}
              </p>
              <div>
                <p className="font-semibold text-ink">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
