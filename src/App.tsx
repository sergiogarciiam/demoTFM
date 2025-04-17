import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PaintableModel } from "./PaintableModel";
import { useState } from "react";
import { usePaintTexture } from "./usePaintTexture";

function App() {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const { texture, paint, clear, save, load } = usePaintTexture({});

  return (
    <>
      <label>
        <input
          type="checkbox"
          onChange={() => setIsDrawing(!isDrawing)}
        ></input>
        Drawing Mode
      </label>
      <div>
        <button onClick={save}>💾 Save</button>
        <button onClick={load}>📥 Load</button>
        <button onClick={clear}>♻️ Reset</button>
      </div>
      <Canvas
        style={{
          width: "90vw",
          height: "90vh",
          border: "1px solid black",
          borderRadius: "15px",
          margin: "10px auto",
        }}
        camera={{ position: [0, 150, 300], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <directionalLight position={[-5, -5, -5]} />
        <PaintableModel texture={texture} paint={paint} isDrawing={isDrawing} />
        <OrbitControls
          enableDamping={false}
          rotateSpeed={isDrawing ? 0 : 1}
          target={[0, 100, 0]}
        />
      </Canvas>
    </>
  );
}

export default App;
