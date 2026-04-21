import { capitalizarTexto } from "../utils/formateadores";

function ListaPokemon({ lista }) {
  return (
    <div className="lista-pokemon">
      {lista.map((pokemon) => (
        <div className="item-pokemon" key={pokemon.name}>
          <p>{capitalizarTexto(pokemon.name)}</p>
        </div>
      ))}
    </div>
  );
}

export default ListaPokemon;