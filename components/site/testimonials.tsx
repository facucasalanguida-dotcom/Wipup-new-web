import { Quote, Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/site-data";

export function Testimonials() {
  return (
    <section className="bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="font-medium text-primary">Testimonios</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Nuestros clientes
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
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
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
