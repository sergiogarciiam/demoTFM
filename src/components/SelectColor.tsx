import { useState } from "react";

export function SelectColor({ colors, setColors }) {
  const [color, setColor] = useState<[string, string]>(["#000", ""]);

  return (
    <div>
      <input
        type="color"
        onChange={(e) => setColor([e.target.value, color[1]])}
      ></input>
      <input
        type="text"
        onChange={(e) => setColor([color[0], e.target.value])}
      ></input>
      <button
        onClick={() => {
          const nextIndex = Object.keys(colors).length;
          setColors({ ...colors, [nextIndex]: color });
        }}
      >
        Save color
      </button>
    </div>
  );
}
