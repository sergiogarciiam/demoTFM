import { useState } from "react";

export function CreateLayers({ setLayers }) {
  const [layer, setLayer] = useState("");

  const handleCreateLayer = () => {
    if (layer.trim()) {
      setLayers((prevLayers) => [...prevLayers, layer]);
      setLayer("");
    }
  };

  return (
    <label>
      Capa
      <input
        type="text"
        value={layer}
        onChange={(e) => setLayer(e.target.value)}
      />
      <button onClick={handleCreateLayer}>Crear capa</button>
    </label>
  );
}
