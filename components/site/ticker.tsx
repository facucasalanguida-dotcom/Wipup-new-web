import { PawPrint } from "lucide-react";

import { Marquee } from "@/components/ui/marquee";

const ITEMS = [
  "CALIDAD PREMIUM",
  "+15 AÑOS DE EXPERIENCIA",
  "ENVÍOS A TODO EL PAÍS",
  "100% PENSADO PARA MASCOTAS",
  "DISTRIBUIDORES EN TODA ARGENTINA",
];

export function Ticker() {
  return (
    <div className="relative z-10 -mt-6 -rotate-1 border-y border-primary/30 bg-gradient-to-r from-primary/15 via-accent/10 to-aqua/15 py-4 shadow-glow backdrop-blur-sm sm:-mt-8 sm:py-5">
      <Marquee className="[--duration:42s] [--gap:2.5rem]" pauseOnHover>
        {ITEMS.map((item) => (
          <span
            key={item}
            className="flex items-center gap-3 whitespace-nowrap text-sm font-bold uppercase tracking-[0.15em] text-foreground sm:text-base"
          >
            <PawPrint className="h-4 w-4 text-primary" aria-hidden="true" />
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
