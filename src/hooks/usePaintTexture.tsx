// usePaintTexture.js
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Stroke } from "../utils/types";

export function usePaintTexture({ size = 1024, initialColor = "#ffffff" }) {
  const canvasRef = useRef(document.createElement("canvas"));
  const strokesRef = useRef<Stroke[]>([]);

  const texture = useMemo(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = initialColor;
      ctx.fillRect(0, 0, size, size);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [initialColor, size]);

  const paint = (u: number, v: number, color = "red", size = 10) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const x = u * canvas.width;
    const y = (1 - v) * canvas.height; // invert Y
    if (ctx) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    texture.needsUpdate = true;
    strokesRef.current.push({ u, v, color, size });
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = initialColor;
      ctx.fillRect(0, 0, size, size);
    }
    strokesRef.current = [];
    texture.needsUpdate = true;
  };

  const save = () => {
    localStorage.setItem("paintData", JSON.stringify(strokesRef.current));
  };

  const load = () => {
    clear();
    const data = JSON.parse(localStorage.getItem("paintData") || "[]");
    data.forEach(({ u, v, color, size }: Stroke) => paint(u, v, color, size));
  };

  const back = () => {
    clear();
    const data = JSON.parse(localStorage.getItem("backPaint") || "[]");
    data.forEach(({ u, v, color, size }: Stroke) => paint(u, v, color, size));
  };

  return { texture, strokesRef, paint, clear, save, load, back };
}
