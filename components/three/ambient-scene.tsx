"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);
  return reduced;
}

const BLOBS = [
  { position: [-2.6, 0.9, -1] as [number, number, number], scale: 0.85, color: "#F2683A", speed: 1.1 },
  { position: [2.3, -0.7, -0.6] as [number, number, number], scale: 1.25, color: "#F6B93B", speed: 0.8 },
  { position: [1.5, 1.5, -2.2] as [number, number, number], scale: 0.55, color: "#0D3A34", speed: 1.4 },
  { position: [-1.7, -1.3, -1.6] as [number, number, number], scale: 0.7, color: "#F9CB6E", speed: 1.0 },
  { position: [0.1, 0.3, -2.6] as [number, number, number], scale: 0.45, color: "#F2683A", speed: 1.6 },
];

function Blob({
  position,
  scale,
  color,
  speed,
  reducedMotion,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  reducedMotion: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (mesh.current && !reducedMotion) {
      mesh.current.rotation.x += delta * 0.08 * speed;
      mesh.current.rotation.y += delta * 0.12 * speed;
    }
  });

  return (
    <Float
      speed={reducedMotion ? 0 : speed}
      rotationIntensity={reducedMotion ? 0 : 0.4}
      floatIntensity={reducedMotion ? 0 : 1.2}
    >
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.15} />
      </mesh>
    </Float>
  );
}

function MouseParallaxGroup({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y += (mouse.current.x * 0.18 - group.current.rotation.y) * 0.03;
    group.current.rotation.x += (mouse.current.y * 0.12 - group.current.rotation.x) * 0.03;
  });

  return <group ref={group}>{children}</group>;
}

export function AmbientScene() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: false }}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 4, 4]} intensity={1.1} />
      <directionalLight position={[-3, -2, -2]} intensity={0.45} color="#F6B93B" />
      <MouseParallaxGroup>
        {BLOBS.map((b, i) => (
          <Blob key={i} {...b} reducedMotion={reducedMotion} />
        ))}
      </MouseParallaxGroup>
    </Canvas>
  );
}
