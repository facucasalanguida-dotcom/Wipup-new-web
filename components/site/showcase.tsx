import Image from "next/image";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { PRODUCT_CATEGORIES } from "@/lib/site-data";

export function Showcase() {
  return (
    <section className="overflow-hidden bg-background">
      <ContainerScroll
        titleComponent={
          <>
            <span className="mb-4 inline-block font-medium text-primary">Nuestra línea</span>
            <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Un mundo de cuidado <br />
              <span className="text-gradient">para tu mascota</span>
            </h2>
          </>
        }
      >
        <div className="grid h-full grid-cols-2 gap-px bg-border/50">
          {PRODUCT_CATEGORIES.map((category) => (
            <a
              key={category.id}
              href={`#productos`}
              className="group relative flex flex-col items-center justify-center gap-3 bg-card p-4 transition-colors duration-300 hover:bg-primary/5 sm:gap-4 sm:p-8"
            >
              <Image
                src={category.categoryImage}
                alt=""
                width={96}
                height={96}
                aria-hidden="true"
                className="h-16 w-16 object-contain transition-transform duration-500 group-hover:scale-110 sm:h-24 sm:w-24"
              />
              <span className="text-center text-sm font-semibold text-foreground sm:text-base">
                {category.shortTitle}
              </span>
            </a>
          ))}
        </div>
      </ContainerScroll>
    </section>
  );
}
