import Image from "next/image";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { EditorialBadge } from "@/components/motion/editorial-badge";
import { PRODUCT_CATEGORIES } from "@/lib/site-data";

export function Showcase() {
  return (
    <section className="relative overflow-hidden bg-background pt-8">
      <div className="absolute inset-0 bg-soft-dots opacity-45" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/4 h-[30rem] w-[30rem] -translate-x-1/2 animate-blob rounded-full bg-accent-light/35 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <ContainerScroll
          titleComponent={
            <>
              <EditorialBadge index="N°02" label="Nuestra línea" align="center" className="mb-6" />
              <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                Un mundo de cuidado <br />
                <span className="text-gradient-fresh">para tu mascota</span>
              </h2>
            </>
          }
        >
          <Reveal
            as="div"
            stagger
            staggerAmount={0.08}
            className="grid h-full grid-cols-2 gap-px bg-border"
          >
            {PRODUCT_CATEGORIES.map((category) => (
              <RevealItem
                key={category.id}
                as="a"
                href="#productos"
                className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden bg-card p-4 transition-colors duration-300 hover:bg-accent-light/40 sm:gap-4 sm:p-8"
              >
                <div
                  className="pointer-events-none absolute inset-0 origin-center scale-0 rounded-full bg-accent-light opacity-0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-60"
                  aria-hidden="true"
                />
                <Image
                  src={category.categoryImage}
                  alt=""
                  width={96}
                  height={96}
                  aria-hidden="true"
                  className="relative h-16 w-16 object-contain drop-shadow-[0_8px_14px_rgba(47,125,111,0.18)] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3 sm:h-24 sm:w-24"
                />
                <span className="relative text-center text-sm font-semibold text-foreground sm:text-base">
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
      </div>
    </section>
  );
}
