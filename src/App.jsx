import { useEffect, useState } from "react";
import "./App.css";

import Buscador from "./Componentes/Buscador";
import TarjetaPokemon from "./Componentes/TarjetaPokemon";
import ListaPokemon from "./Componentes/ListaPokemon";
import Filtros from "./Componentes/Filtros";
import Cargando from "./Componentes/Cargando";
import ErrorMensaje from "./Componentes/ErrorMensaje";

import {
  obtenerListaPokemon,
  obtenerPokemonPorNombreOId,
  obtenerPokemonPorTipo,
  generarErrorIntencional,
} from "./servicios/pokeapi";

function App() {
  const [pokemonBuscado, setPokemonBuscado] = useState(null);
  const [listaPokemon, setListaPokemon] = useState([]);
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarListaInicial();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [filtroNombre, filtroTipo, listaPokemon]);

  const cargarListaInicial = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await obtenerListaPokemon(20, 0);

      const listaConTipos = await Promise.all(
        data.results.map(async (pokemon) => {
          const respuesta = await fetch(pokemon.url);
          const detalle = await respuesta.json();

          return {
            name: detalle.name,
            types: detalle.types.map((t) => t.type.name),
          };
        })
      );

      setListaPokemon(listaConTipos);
      setListaFiltrada(listaConTipos);
    } catch (error) {
      setError("No se pudo cargar la lista de Pokémon.");
    } finally {
      setLoading(false);
    }
  };

  const buscarPokemon = async (valor) => {
    if (valor === "") {
      setError("Por favor, ingresá un nombre o ID.");
      setPokemonBuscado(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setPokemonBuscado(null);

      const data = await obtenerPokemonPorNombreOId(valor);
      setPokemonBuscado(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = async () => {
    try {
      let resultado = [...listaPokemon];

      if (filtroTipo !== "") {
        const dataTipo = await obtenerPokemonPorTipo(filtroTipo);
        const nombresDelTipo = dataTipo.pokemon.map((item) => item.pokemon.name);

        resultado = resultado.filter((pokemon) =>
          nombresDelTipo.includes(pokemon.name)
        );
      }

      if (filtroNombre.trim() !== "") {
        resultado = resultado.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(filtroNombre.toLowerCase())
        );
      }

      setListaFiltrada(resultado);
    } catch (error) {
      setError("No se pudieron aplicar los filtros.");
    }
  };

  const probarError = async () => {
    try {
      setLoading(true);
      setError("");
      await generarErrorIntencional();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contenedor">
      <h1>Mini Pokédex</h1>

      <section className="seccion">
        <h2>Búsqueda de Pokémon</h2>
        <Buscador onBuscar={buscarPokemon} />
        <button className="boton-error" onClick={probarError}>
          Probar error intencional
        </button>
      </section>

      {loading && <Cargando />}
      <ErrorMensaje mensaje={error} />
      <TarjetaPokemon pokemon={pokemonBuscado} />

      <section className="seccion">
        <h2>Lista de Pokémon</h2>
        <Filtros
          filtroNombre={filtroNombre}
          setFiltroNombre={setFiltroNombre}
          filtroTipo={filtroTipo}
          setFiltroTipo={setFiltroTipo}
        />
        <ListaPokemon lista={listaFiltrada} />
      </section>
    </div>
  );
}

export default App;