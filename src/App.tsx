import { useState } from "react";
import { usePaintTexture } from "./hooks/usePaintTexture";
import { Buttons } from "./components/Buttons";
import { ColorsList } from "./components/ColorsList";
import { CanvasComponent } from "./components/Canvas";
import { ModeSelector } from "./components/ModeSelector";
import { ROTATE_MODE } from "./utils/constants";

function App() {
  const [mode, setMode] = useState<string>(ROTATE_MODE);
  const [colors, setColors] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
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
        mode={mode}
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
        <ModeSelector mode={mode} setMode={setMode}></ModeSelector>
        <Buttons clear={clear} save={save} load={load} back={back}></Buttons>
        <ColorsList
          colors={colors}
          setColors={setColors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        ></ColorsList>
      </div>
    </main>
  );
}

export default App;
