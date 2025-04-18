import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PaintableModel } from "./PaintableModel";

export function CanvasComponent({
  texture,
  strokesRef,
  paint,
  isDrawing,
  selectedColor,
}) {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid black",
      }}
      camera={{ position: [0, 150, 300], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <directionalLight position={[-5, -5, -5]} />
      <PaintableModel
        texture={texture}
        strokesRef={strokesRef}
        paint={paint}
        isDrawing={isDrawing}
        selectedColor={selectedColor}
      />
      <OrbitControls
        enableDamping={false}
        rotateSpeed={isDrawing ? 0 : 1}
        target={[0, 100, 0]}
      />
    </Canvas>
  );
}
