import { useState } from "react";
import { usePaintTexture } from "./hooks/usePaintTexture";
import { Buttons } from "./components/Buttons";
import { Colors } from "./components/Colors";
import { CanvasComponent } from "./components/Canvas";
import { SelectColor } from "./components/SelectColor";
import { SelectMode } from "./components/SelectMode";
import { CreateLayers } from "./components/CreateLayers";
import { Layers } from "./components/Layers";

function App() {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [colors, setColors] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [layers, setLayers] = useState(["Capa 0"]);
  const { texture, strokesRef, paint, clear, save, load, back } =
    usePaintTexture({});

  return (
    <main
      style={{ width: "100vw", height: "100vh", display: "flex", gap: "20px" }}
    >
      <CanvasComponent
        texture={texture}
        strokesRef={strokesRef}
        paint={paint}
        isDrawing={isDrawing}
        selectedColor={selectedColor}
      ></CanvasComponent>
      <div
        style={{
          margin: "10px auto",
          width: "fit-content",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <SelectMode
          isDrawing={isDrawing}
          setIsDrawing={setIsDrawing}
        ></SelectMode>
        <Buttons clear={clear} save={save} load={load} back={back}></Buttons>
        <SelectColor colors={colors} setColors={setColors}></SelectColor>
        <CreateLayers setLayers={setLayers}></CreateLayers>
        <Layers layers={layers}></Layers>
        <Colors
          colors={colors}
          setColors={setColors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        ></Colors>
      </div>
    </main>
  );
}

export default App;
