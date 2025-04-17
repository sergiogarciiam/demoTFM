import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { ThreeEvent } from "@react-three/fiber";

export function PaintableModel({
  texture,
  paint,
  isDrawing,
}: {
  texture: THREE.Texture;
  paint: (u: number, v: number, color: string) => void;
  isDrawing: boolean;
}) {
  const { scene } = useGLTF("/male.glb");
  const mesh = scene.children[0] as Mesh;

  mesh.material = new THREE.MeshStandardMaterial({ map: texture });

  const isPainting = useRef(false);

  // Habilitamos pintar continuo al mover el mouse mientras está presionado
  useEffect(() => {
    const handleMouseUp = () => (isPainting.current = false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isPainting.current = true;
    if (e.uv) {
      const { x: u, y: v } = e.uv;
      paint(u, v, "red");
    }
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isPainting.current || !e.uv) return;
    const { x: u, y: v } = e.uv;
    paint(u, v, "red");
  };

  return (
    <>
      <primitive
        object={scene}
        onPointerDown={isDrawing && handlePointerDown}
        onPointerMove={isDrawing && handlePointerMove}
      />
    </>
  );
}
