import { useState, useEffect } from "react";
import "./App.css";
import sonido from "./assets/musica.mp3"; 

export default function App() {
  const [tablero, setTablero] = useState(Array(9).fill(""));
  const [turnoX, setTurnoX] = useState(true);

  // Crea el audio una sola vez
  const [audio] = useState(new Audio(sonido));

  // Configurar loop (solo una vez)
  useEffect(() => {
    audio.loop = true;
  }, [audio]);

  function clickCasilla(i) {
    if (tablero[i] !== "") return;

    //Reproducir música
    audio.play();

    const nuevo = [...tablero];
    nuevo[i] = turnoX ? "X" : "O";

    setTablero(nuevo);
    setTurnoX(!turnoX);
  }

  function reiniciar() {
    setTablero(Array(9).fill(""));
    setTurnoX(true);
  }

  const ganador = calcularGanador(tablero);
  const empate = !ganador && tablero.every(c => c !== "");

  return (
    <div className="app">
      <h1>3 en Raya RD</h1>

      <h2>
        {ganador
          ? "Ganó " + (ganador === "X" ? "Quisqueya 🥁" : "Caribe 🌴")
          : empate
          ? "Empate"
          : "Turno de " + (turnoX ? "Quisqueya (X)" : "Caribe (O)")}
      </h2>

      <div className="grid">
        {tablero.map((v, i) => (
          <button key={i} onClick={() => clickCasilla(i)}>
            {v}
          </button>
        ))}
      </div>

      <button onClick={reiniciar}>Reiniciar</button>
    </div>
  );
}

//Función para detectar ganador
function calcularGanador(t) {
  const c = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let i = 0; i < c.length; i++) {
    const [a, b, c1] = c[i];
    if (t[a] && t[a] === t[b] && t[a] === t[c1]) {
      return t[a];
    }
  }
  return null;
}