"use client";

import { useEffect, useRef, useState } from "react";
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

const TOE_POSITIONS: [number, number, number][] = [
  [-0.62, 0.62, 0],
  [-0.22, 0.86, 0.05],
  [0.22, 0.86, 0.05],
  [0.62, 0.62, 0],
];

function PawPrint({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current && !reducedMotion) {
      group.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.4} rotationIntensity={reducedMotion ? 0 : 0.3} floatIntensity={reducedMotion ? 0 : 0.8}>
      <group ref={group}>
        <mesh position={[0, -0.35, 0]} scale={[1, 0.72, 0.55]} castShadow receiveShadow>
          <sphereGeometry args={[0.68, 48, 48]} />
          <meshStandardMaterial color="#14523f" roughness={0.35} metalness={0.1} />
        </mesh>
        {TOE_POSITIONS.map((pos, i) => (
          <mesh key={i} position={pos} scale={[0.85, 0.85, 0.6]} castShadow receiveShadow>
            <sphereGeometry args={[0.28, 32, 32]} />
            <meshStandardMaterial color="#14523f" roughness={0.35} metalness={0.1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function AccentBall({ reducedMotion }: { reducedMotion: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current && !reducedMotion) {
      mesh.current.position.y = 1.6 + Math.sin(state.clock.elapsedTime * 1.2) * 0.15;
      mesh.current.rotation.x += 0.006;
      mesh.current.rotation.y += 0.008;
    }
  });
  return (
    <mesh ref={mesh} position={[1.3, 1.6, -0.6]} castShadow>
      <sphereGeometry args={[0.22, 32, 32]} />
      <meshStandardMaterial color="#e2621c" roughness={0.3} metalness={0.15} />
    </mesh>
  );
}

export function PetScene() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 4.2], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 4]} intensity={1.4} castShadow />
      <directionalLight position={[-3, -1, -2]} intensity={0.35} color="#5fd6b0" />
      <PawPrint reducedMotion={reducedMotion} />
      <AccentBall reducedMotion={reducedMotion} />
    </Canvas>
  );
}
