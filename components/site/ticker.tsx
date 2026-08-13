import { PawPrint } from "lucide-react";

import { Marquee } from "@/components/motion/marquee";

const ITEMS = [
  "CALIDAD PREMIUM",
  "+15 AÑOS DE EXPERIENCIA",
  "ENVÍOS A TODO EL PAÍS",
  "100% PENSADO PARA MASCOTAS",
  "DISTRIBUIDORES EN TODA ARGENTINA",
];

export function Ticker() {
  return (
    <div className="relative z-10 -mt-6 -rotate-1 bg-ink py-4 shadow-elevated sm:-mt-8 sm:py-5">
      <Marquee speed="slow">
        {ITEMS.map((item) => (
          <span
            key={item}
            className="flex items-center gap-3 whitespace-nowrap text-sm font-bold uppercase tracking-wide text-ink-foreground sm:text-base"
          >
            <PawPrint className="h-4 w-4 text-primary-light" aria-hidden="true" />
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
