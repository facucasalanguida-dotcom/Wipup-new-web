"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Gamepad2, RotateCcw, Trophy } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { EditorialBadge } from "@/components/motion/editorial-badge";
import { PRODUCT_CATEGORIES } from "@/lib/site-data";

/* ---- Logical play-field. Everything is drawn in this coordinate space and
   scaled to the container, so physics stay identical on every screen. ---- */
const W = 900;
const H = 280;
const GROUND_Y = 228;

const CAT_X = 76;
const CAT_W = 54;
const CAT_H = 44;
const CAT_DUCK_H = 28;

const GRAVITY = 0.86;
const JUMP_V = -16;
const FAST_FALL = 1.9;

const START_SPEED = 7;
const MAX_SPEED = 15.5;
const SPEED_RAMP = 0.0016;

/** Horizontal distance covered by a full jump — obstacle gaps are derived from
 * this so a jump always has room to land, at any speed. */
const jumpSpan = (speed: number) => ((2 * Math.abs(JUMP_V)) / GRAVITY) * speed;

/** Drones sit low enough to clip a standing cat but clear a ducking one. */
const DRONE_Y = 166;
const DRONE_H = 30;

const BEST_KEY = "wipup-cat-runner-best";

const COLORS = {
  primary: "#5EEAD4",
  accent: "#6EE7B7",
  aqua: "#14B8A6",
  ground: "#17403C",
  text: "#EAF6F3",
};

type Obstacle = { x: number; w: number; h: number; flying: boolean };
type Item = { x: number; y: number; r: number; img: number; taken: boolean };

type Phase = "idle" | "playing" | "over";

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/** Slightly inset AABB so near-misses read as misses, not hits. */
function hits(
  ax: number, ay: number, aw: number, ah: number,
  bx: number, by: number, bw: number, bh: number,
  pad = 5
) {
  return (
    ax + pad < bx + bw &&
    ax + aw - pad > bx &&
    ay + pad < by + bh &&
    ay + ah - pad > by
  );
}

export function CatRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [phase, setPhase] = useState<Phase>("idle");
  const [best, setBest] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [collected, setCollected] = useState(0);

  // All per-frame state lives in a ref so the animation loop never re-renders.
  const g = useRef({
    phase: "idle" as Phase,
    y: GROUND_Y - CAT_H,
    vy: 0,
    onGround: true,
    ducking: false,
    speed: START_SPEED,
    score: 0,
    picked: 0,
    obstacles: [] as Obstacle[],
    items: [] as Item[],
    nextObstacle: 60,
    nextItem: 140,
    t: 0,
    bgOffset: 0,
    visible: true,
  });

  /* ---------- assets ---------- */
  useEffect(() => {
    imagesRef.current = PRODUCT_CATEGORIES.map((c) => {
      const img = new Image();
      img.src = c.categoryImage;
      return img;
    });
  }, []);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(BEST_KEY);
      if (stored) setBest(parseInt(stored, 10) || 0);
    } catch {
      /* localStorage can be unavailable (private mode) — the game still works. */
    }
  }, []);

  /* ---------- game control ---------- */
  const reset = useCallback(() => {
    const s = g.current;
    s.y = GROUND_Y - CAT_H;
    s.vy = 0;
    s.onGround = true;
    s.ducking = false;
    s.speed = START_SPEED;
    s.score = 0;
    s.picked = 0;
    s.obstacles = [];
    s.items = [];
    s.nextObstacle = 60;
    s.nextItem = 140;
    s.t = 0;
  }, []);

  const start = useCallback(() => {
    reset();
    g.current.phase = "playing";
    setPhase("playing");
    setCollected(0);
  }, [reset]);

  const endGame = useCallback(() => {
    const s = g.current;
    s.phase = "over";
    const score = Math.floor(s.score);
    setPhase("over");
    setFinalScore(score);
    setCollected(s.picked);
    setBest((prev) => {
      if (score <= prev) return prev;
      try {
        window.localStorage.setItem(BEST_KEY, String(score));
      } catch {
        /* ignore */
      }
      return score;
    });
  }, []);

  const jump = useCallback(() => {
    const s = g.current;
    if (s.phase === "idle") {
      start();
      return;
    }
    if (s.phase === "over") {
      start();
      return;
    }
    if (s.onGround) {
      s.vy = JUMP_V;
      s.onGround = false;
    }
  }, [start]);

  const setDuck = useCallback((on: boolean) => {
    const s = g.current;
    if (s.phase !== "playing") return;
    s.ducking = on;
    if (on && !s.onGround) s.vy += FAST_FALL;
  }, []);

  /* ---------- input ---------- */
  useEffect(() => {
    function isTyping(target: EventTarget | null) {
      const el = target as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
    }

    function onKeyDown(e: KeyboardEvent) {
      // Never steal keys from the contact form, even if the game is on screen.
      if (!g.current.visible || isTyping(e.target)) return;
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        // Only swallow the page scroll when the game is actually on screen.
        e.preventDefault();
        jump();
      } else if (e.code === "ArrowDown" || e.code === "KeyS") {
        e.preventDefault();
        setDuck(true);
      }
    }
    function onKeyUp(e: KeyboardEvent) {
      if (e.code === "ArrowDown" || e.code === "KeyS") setDuck(false);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [jump, setDuck]);

  /* ---------- pause when off-screen or tab hidden ---------- */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        g.current.visible = entry.isIntersecting;
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ---------- main loop ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    let scale = 1;

    function resize() {
      const el = canvasRef.current;
      if (!el) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = el.clientWidth || W;
      const cssH = (cssW * H) / W;
      el.style.height = `${cssH}px`;
      el.width = Math.round(cssW * dpr);
      el.height = Math.round(cssH * dpr);
      scale = (cssW * dpr) / W;
    }
    resize();
    window.addEventListener("resize", resize);

    function spawnObstacle() {
      const s = g.current;
      const flying = s.score > 260 && Math.random() < 0.28;
      if (flying) {
        s.obstacles.push({ x: W + 40, w: 46, h: DRONE_H, flying: true });
      } else {
        const tall = Math.random() < 0.35;
        s.obstacles.push({
          x: W + 40,
          w: tall ? 26 : rand(28, 42),
          h: tall ? rand(40, 52) : rand(26, 36),
          flying: false,
        });
      }
      // Always leave at least one full jump of room, plus slack.
      s.nextObstacle = jumpSpan(s.speed) * rand(1.25, 2.1) + 48;
    }

    function spawnItem() {
      const s = g.current;
      s.items.push({
        x: W + 30,
        y: rand(96, 176),
        r: 21,
        img: Math.floor(Math.random() * Math.max(imagesRef.current.length, 1)),
        taken: false,
      });
      s.nextItem = rand(420, 900);
    }

    function update(step: number) {
      const s = g.current;
      if (s.phase !== "playing") return;

      s.t += step;
      s.speed = Math.min(MAX_SPEED, s.speed + SPEED_RAMP * step);
      s.score += step * 0.14;
      s.bgOffset = (s.bgOffset + s.speed * step * 0.35) % 64;

      // cat physics
      s.vy += GRAVITY * step;
      s.y += s.vy * step;
      const h = s.ducking && s.onGround ? CAT_DUCK_H : CAT_H;
      if (s.y >= GROUND_Y - h) {
        s.y = GROUND_Y - h;
        s.vy = 0;
        s.onGround = true;
      }

      // spawns
      s.nextObstacle -= s.speed * step;
      if (s.nextObstacle <= 0) spawnObstacle();
      s.nextItem -= s.speed * step;
      if (s.nextItem <= 0) spawnItem();

      const catH = s.ducking && s.onGround ? CAT_DUCK_H : CAT_H;
      const catY = s.y;

      // obstacles
      for (const o of s.obstacles) o.x -= s.speed * step;
      s.obstacles = s.obstacles.filter((o) => o.x + o.w > -20);
      for (const o of s.obstacles) {
        const oy = o.flying ? DRONE_Y : GROUND_Y - o.h;
        if (hits(CAT_X, catY, CAT_W, catH, o.x, oy, o.w, o.h)) {
          endGame();
          return;
        }
      }

      // collectibles
      for (const it of s.items) it.x -= s.speed * step;
      s.items = s.items.filter((it) => it.x + it.r > -20 && !it.taken);
      for (const it of s.items) {
        if (hits(CAT_X, catY, CAT_W, catH, it.x - it.r, it.y - it.r, it.r * 2, it.r * 2, 2)) {
          it.taken = true;
          s.picked += 1;
          s.score += 50;
        }
      }
    }

    /* ---------- drawing ---------- */
    function drawBackground(c: CanvasRenderingContext2D) {
      const s = g.current;
      c.fillStyle = "#08201D";
      c.fillRect(0, 0, W, H);

      // scrolling tech grid
      c.strokeStyle = "rgba(234,246,243,0.05)";
      c.lineWidth = 1;
      for (let x = -((s.bgOffset | 0) % 64); x < W; x += 64) {
        c.beginPath();
        c.moveTo(x, 0);
        c.lineTo(x, GROUND_Y);
        c.stroke();
      }
      for (let y = 28; y < GROUND_Y; y += 48) {
        c.beginPath();
        c.moveTo(0, y);
        c.lineTo(W, y);
        c.stroke();
      }

      // neon ground
      c.save();
      c.shadowColor = COLORS.aqua;
      c.shadowBlur = 14;
      c.strokeStyle = COLORS.aqua;
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(0, GROUND_Y);
      c.lineTo(W, GROUND_Y);
      c.stroke();
      c.restore();

      // ground speckles
      c.fillStyle = "rgba(123,232,238,0.35)";
      for (let i = 0; i < 26; i++) {
        const x = (i * 71 - s.bgOffset * 2) % W;
        c.fillRect(x < 0 ? x + W : x, GROUND_Y + 10 + (i % 3) * 9, 12, 2);
      }
    }

    function drawCat(c: CanvasRenderingContext2D) {
      const s = g.current;
      const ducking = s.ducking && s.onGround;
      const h = ducking ? CAT_DUCK_H : CAT_H;
      const x = CAT_X;
      const y = s.y;
      const dead = s.phase === "over";

      c.save();
      c.shadowColor = dead ? "#EF4444" : COLORS.primary;
      c.shadowBlur = 16;
      c.fillStyle = dead ? "#EF4444" : COLORS.primary;

      const bodyH = ducking ? h * 0.82 : h * 0.6;
      const bodyY = y + h - bodyH;

      // body
      c.beginPath();
      c.roundRect(x, bodyY, CAT_W - 8, bodyH, 10);
      c.fill();

      // head
      const headR = ducking ? 11 : 13;
      const headX = x + CAT_W - 12;
      const headY = ducking ? bodyY + 8 : y + 12;
      c.beginPath();
      c.arc(headX, headY, headR, 0, Math.PI * 2);
      c.fill();

      // ears
      c.beginPath();
      c.moveTo(headX - 9, headY - 8);
      c.lineTo(headX - 4, headY - 20);
      c.lineTo(headX + 1, headY - 9);
      c.closePath();
      c.fill();
      c.beginPath();
      c.moveTo(headX + 3, headY - 9);
      c.lineTo(headX + 9, headY - 19);
      c.lineTo(headX + 12, headY - 7);
      c.closePath();
      c.fill();

      // tail — swishes while running
      c.strokeStyle = dead ? "#EF4444" : COLORS.primary;
      c.lineWidth = 5;
      c.lineCap = "round";
      const swish = Math.sin(s.t * 0.25) * 6;
      c.beginPath();
      c.moveTo(x + 2, bodyY + 8);
      c.quadraticCurveTo(x - 20, bodyY + swish, x - 12, bodyY - 14 + swish);
      c.stroke();

      // legs
      if (!ducking) {
        const phase2 = Math.floor(s.t / 6) % 2;
        const legY = y + h;
        c.lineWidth = 5;
        c.beginPath();
        c.moveTo(x + 12, legY - 4);
        c.lineTo(x + 12 + (phase2 ? 7 : -5), legY + 8);
        c.stroke();
        c.beginPath();
        c.moveTo(x + 32, legY - 4);
        c.lineTo(x + 32 + (phase2 ? -5 : 7), legY + 8);
        c.stroke();
      }
      c.restore();

      // eye
      c.fillStyle = "#08201D";
      c.beginPath();
      c.arc(headX + 4, headY - 2, 2.6, 0, Math.PI * 2);
      c.fill();
    }

    function drawObstacles(c: CanvasRenderingContext2D) {
      const s = g.current;
      for (const o of s.obstacles) {
        const oy = o.flying ? DRONE_Y : GROUND_Y - o.h;
        c.save();
        c.shadowColor = o.flying ? COLORS.accent : COLORS.aqua;
        c.shadowBlur = 12;
        c.fillStyle = o.flying ? COLORS.accent : COLORS.aqua;
        if (o.flying) {
          // drone: body + flapping wings
          const flap = Math.sin(s.t * 0.5) * 5;
          c.beginPath();
          c.roundRect(o.x, oy + 8, o.w, 13, 6);
          c.fill();
          c.beginPath();
          c.moveTo(o.x + 6, oy + 10);
          c.lineTo(o.x - 8, oy + flap);
          c.lineTo(o.x + 16, oy + 10);
          c.closePath();
          c.fill();
          c.beginPath();
          c.moveTo(o.x + o.w - 6, oy + 10);
          c.lineTo(o.x + o.w + 8, oy + flap);
          c.lineTo(o.x + o.w - 16, oy + 10);
          c.closePath();
          c.fill();
        } else {
          c.beginPath();
          c.roundRect(o.x, oy, o.w, o.h, 5);
          c.fill();
          c.fillStyle = "#08201D";
          c.fillRect(o.x + 5, oy + o.h * 0.35, o.w - 10, 3);
        }
        c.restore();
      }
    }

    function drawItems(c: CanvasRenderingContext2D) {
      const s = g.current;
      for (const it of s.items) {
        const imgs = imagesRef.current;
        const img = imgs[it.img];
        const bob = Math.sin((s.t + it.x) * 0.12) * 4;
        c.save();
        c.shadowColor = COLORS.accent;
        c.shadowBlur = 16;
        // halo
        c.strokeStyle = "rgba(110,231,183,0.55)";
        c.lineWidth = 2;
        c.beginPath();
        c.arc(it.x, it.y + bob, it.r + 5, 0, Math.PI * 2);
        c.stroke();
        c.restore();

        if (img && img.complete && img.naturalWidth > 0) {
          c.drawImage(img, it.x - it.r, it.y - it.r + bob, it.r * 2, it.r * 2);
        } else {
          c.fillStyle = COLORS.accent;
          c.beginPath();
          c.arc(it.x, it.y + bob, it.r, 0, Math.PI * 2);
          c.fill();
        }
      }
    }

    function drawHud(c: CanvasRenderingContext2D) {
      const s = g.current;
      c.fillStyle = COLORS.text;
      c.font = "700 20px ui-sans-serif, system-ui, sans-serif";
      c.textAlign = "right";
      c.fillText(String(Math.floor(s.score)).padStart(5, "0"), W - 20, 34);
      c.textAlign = "left";
      c.fillStyle = "rgba(234,246,243,0.55)";
      c.font = "600 13px ui-sans-serif, system-ui, sans-serif";
      c.fillText(`PRODUCTOS: ${s.picked}`, 20, 33);
    }

    function draw() {
      const c = ctx;
      if (!c) return;
      c.setTransform(scale, 0, 0, scale, 0, 0);
      drawBackground(c);
      drawItems(c);
      drawObstacles(c);
      drawCat(c);
      drawHud(c);
    }

    function frame(now: number) {
      const s = g.current;
      const dt = Math.min(now - last, 50);
      last = now;
      // Freeze the simulation while scrolled away, but keep painting the scene.
      if (s.visible) update(dt / (1000 / 60));
      draw();
      raf = requestAnimationFrame(frame);
    }

    function onVisibility() {
      // Avoid a huge dt jump when the tab comes back.
      last = performance.now();
    }
    document.addEventListener("visibilitychange", onVisibility);

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [endGame]);

  return (
    <section id="juego" className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="absolute inset-0 bg-tech-grid opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/4 top-10 h-[26rem] w-[26rem] animate-blob rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="mb-10 text-center">
          <EditorialBadge index="N°07" label="Zona de juego" tone="dark" align="center" className="mb-6" />
          <Reveal>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Ayudá al gato a juntar <span className="text-gradient-neon">productos WIPuP</span>
            </h2>
          </Reveal>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Saltá los obstáculos, agachate bajo los drones y juntá todos los productos que puedas.
            Cada uno suma 50 puntos.
          </p>
        </div>

        <Reveal>
          <div
            ref={wrapRef}
            className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-primary/25 shadow-glow"
          >
            <canvas
              ref={canvasRef}
              className="block w-full cursor-pointer touch-none"
              onPointerDown={(e) => {
                e.preventDefault();
                jump();
              }}
              role="img"
              aria-label={
                phase === "playing"
                  ? "Juego en curso: gato corriendo y esquivando obstáculos"
                  : "Mini juego del gato WIPuP. Presioná espacio o tocá para empezar."
              }
            />

            {phase !== "playing" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/75 backdrop-blur-sm">
                {phase === "over" ? (
                  <>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                      Game over
                    </p>
                    <p className="text-4xl font-bold text-foreground text-glow">{finalScore}</p>
                    <p className="text-sm text-muted-foreground">
                      {collected} producto{collected === 1 ? "" : "s"} recolectado
                      {collected === 1 ? "" : "s"}
                    </p>
                    <button
                      type="button"
                      onClick={start}
                      className="mt-1 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow transition-transform duration-300 hover:scale-105"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      Jugar de nuevo
                    </button>
                  </>
                ) : (
                  <>
                    <Gamepad2 className="h-9 w-9 text-primary" aria-hidden="true" />
                    <button
                      type="button"
                      onClick={start}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow transition-transform duration-300 hover:scale-105"
                    >
                      Empezar a jugar
                    </button>
                    <p className="text-xs text-muted-foreground">
                      Espacio o ↑ para saltar · ↓ para agacharte · o tocá la pantalla
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </Reveal>

        <div className="mx-auto mt-6 flex max-w-4xl items-center justify-center gap-2 text-sm text-muted-foreground">
          <Trophy className="h-4 w-4 text-accent" aria-hidden="true" />
          <span aria-live="polite">Tu récord: <strong className="text-foreground">{best}</strong></span>
        </div>
      </div>
    </section>
  );
}
