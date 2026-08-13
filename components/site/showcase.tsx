import Image from "next/image";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { PRODUCT_CATEGORIES } from "@/lib/site-data";

export function Showcase() {
  return (
    <section className="overflow-hidden bg-background pt-8">
      <ContainerScroll
        titleComponent={
          <>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 font-semibold text-primary">
              Nuestra línea
            </span>
            <h2 className="text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
              Un mundo de cuidado <br />
              <span className="text-gradient">para tu mascota</span>
            </h2>
          </>
        }
      >
        <Reveal
          as="div"
          stagger
          staggerAmount={0.08}
          className="grid h-full grid-cols-2 gap-px bg-border/60"
        >
          {PRODUCT_CATEGORIES.map((category) => (
            <RevealItem
              key={category.id}
              as="a"
              href="#productos"
              className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden bg-card p-4 transition-colors duration-300 hover:bg-primary/5 sm:gap-4 sm:p-8"
            >
              <div
                className="pointer-events-none absolute inset-0 origin-center scale-0 rounded-full bg-primary-gradient opacity-0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-10"
                aria-hidden="true"
              />
              <Image
                src={category.categoryImage}
                alt=""
                width={96}
                height={96}
                aria-hidden="true"
                className="relative h-16 w-16 object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3 sm:h-24 sm:w-24"
              />
              <span className="relative text-center text-sm font-semibold text-ink sm:text-base">
                {category.shortTitle}
              </span>
              <span
                className="pointer-events-none absolute left-1/2 top-3 h-1 w-6 -translate-x-1/2 rounded-full bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
            </RevealItem>
          ))}
        </Reveal>
      </ContainerScroll>
    </section>
  );
}
