export function Buttons({ save, load, clear, back }: ButtonsProps) {
  return (
    <div>
      <button onClick={save}>Guardar</button>
      <button onClick={load}>Cargar</button>
      <button onClick={clear}>Resetear</button>
      <button onClick={back}>Atrás</button>
    </div>
  );
}

type ButtonsProps = {
  save: () => void;
  load: () => void;
  clear: () => void;
  back: () => void;
};
