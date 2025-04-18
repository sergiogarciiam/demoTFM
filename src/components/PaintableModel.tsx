import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import * as THREE from "three";
import { RefObject, useEffect, useRef } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { Stroke } from "../utils/types";

export function PaintableModel({
  texture,
  strokesRef,
  paint,
  isDrawing,
  selectedColor,
}: {
  texture: THREE.Texture;
  strokesRef: RefObject<Stroke[]>;
  paint: (u: number, v: number, color: string) => void;
  isDrawing: boolean;
  selectedColor: string;
}) {
  const { scene } = useGLTF("/male.glb");
  const mesh = scene.children[0] as Mesh;

  mesh.material = new THREE.MeshStandardMaterial({ map: texture });

  const isPainting = useRef(false);

  // Habilitamos pintar continuo al mover el mouse mientras está presionado
  useEffect(() => {
    const handleMouseUp = () => {
      isPainting.current = false;
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [strokesRef]);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    localStorage.setItem("backPaint", JSON.stringify(strokesRef.current));
    isPainting.current = true;
    if (e.uv) {
      const { x: u, y: v } = e.uv;
      paint(u, v, selectedColor);
    }
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isPainting.current || !e.uv) return;
    const { x: u, y: v } = e.uv;
    paint(u, v, selectedColor);
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
