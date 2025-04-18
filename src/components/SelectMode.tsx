export function SelectMode({ isDrawing, setIsDrawing }) {
  return (
    <label>
      <input type="checkbox" onChange={() => setIsDrawing(!isDrawing)}></input>{" "}
      Modo Dibujo
    </label>
  );
}
