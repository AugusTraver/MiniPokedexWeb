import {
  capitalizarTexto,
  formatearAltura,
  formatearPeso,
} from "../utils/formateadores";

function TarjetaPokemon({ pokemon }) {
  if (!pokemon) return null;

  return (
    <div className="tarjeta-pokemon">
      <h2>{capitalizarTexto(pokemon.name)}</h2>

      <img src={pokemon.sprites.front_default} alt={pokemon.name} />

      <p><strong>ID:</strong> {pokemon.id}</p>

      <p>
        <strong>Tipo(s):</strong>{" "}
        {pokemon.types.map((tipo) => capitalizarTexto(tipo.type.name)).join(", ")}
      </p>

      <p><strong>Peso:</strong> {formatearPeso(pokemon.weight)}</p>
      <p><strong>Altura:</strong> {formatearAltura(pokemon.height)}</p>
    </div>
  );
}

export default TarjetaPokemon;