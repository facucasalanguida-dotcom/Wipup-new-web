"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: ReactNode;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = (): [number, number] => (isMobile ? [0.85, 0.95] : [1.05, 1]);

  const rotate = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <div
      className="relative flex h-[50rem] items-center justify-center p-2 md:h-[62rem] md:p-10"
      style={{ position: "relative" }}
      ref={containerRef}
    >
      <div className="relative w-full py-8 md:py-16" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: ReactNode;
}) {
  return (
    <motion.div style={{ translateY: translate }} className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
      {titleComponent}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow: "0 30px 80px -20px hsl(14 95% 50% / 0.35)",
      }}
      className="mx-auto h-[24rem] w-full max-w-5xl rounded-[2rem] border-4 border-primary/25 bg-card/60 p-2 shadow-2xl backdrop-blur-sm md:h-[32rem] md:p-4"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-muted">{children}</div>
    </motion.div>
  );
}
