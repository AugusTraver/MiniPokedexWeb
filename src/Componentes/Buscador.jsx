import { useState } from "react";

function Buscador({ onBuscar }) {
  const [valor, setValor] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (valor.trim() === "") {
      onBuscar("");
      return;
    }

    onBuscar(valor.trim());
  };

  return (
    <form className="buscador" onSubmit={manejarSubmit}>
      <input
        type="text"
        placeholder="Ingresá nombre o ID"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default Buscador;