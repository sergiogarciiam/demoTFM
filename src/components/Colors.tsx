type ColorsProps = {
  colors: Record<string, [string, string]>;
};

export function Colors({ colors, setColors, selectedColor, setSelectedColor }) {
  const handleDeleteColor = (key: string) => {
    const colorToRemove = colors[key][0];
    const updatedColors = { ...colors };

    delete updatedColors[key];
    setColors(updatedColors);

    if (colorToRemove === selectedColor) {
      setSelectedColor("");
    }
  };

  return (
    <div>
      <h2>Colores</h2>
      {Object.keys(colors).map((key) => (
        <div
          style={{
            border: `1px solid ${
              selectedColor === colors[key][0] ? "red" : "black"
            }`,
            margin: "10px 0",
            cursor: "pointer",
          }}
          key={key}
          onClick={() => setSelectedColor(colors[key][0])}
        >
          <input
            type="color"
            value={colors[key][0]}
            readOnly
            disabled
            style={{ pointerEvents: "none" }}
          />
          <input
            type="text"
            defaultValue={colors[key][1]}
            readOnly
            disabled
            style={{ pointerEvents: "none" }}
          />
          <button onClick={() => handleDeleteColor(key)}>X</button>
        </div>
      ))}
      <button
        style={{
          border: `1px solid ${selectedColor === "#fff" ? "red" : "black"}`,
        }}
        onClick={() => {
          setSelectedColor("#fff");
        }}
      >
        Borrador
      </button>
    </div>
  );
}
