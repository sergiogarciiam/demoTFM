export function Layers({ layers }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Capas</h2>
      {layers.map((layer, index) => (
        <label key={index}>
          <input type="checkbox" />
          {layer}
        </label>
      ))}
    </div>
  );
}
