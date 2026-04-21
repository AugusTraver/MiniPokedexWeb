const BASE_URL = "https://pokeapi.co/api/v2";

export async function obtenerPokemonPorNombreOId(valor) {
  const respuesta = await fetch(`${BASE_URL}/pokemon/${valor.toLowerCase()}`);

  if (!respuesta.ok) {
    throw new Error("No se encontró el Pokémon.");
  }

  return await respuesta.json();
}

export async function obtenerListaPokemon(limit = 20, offset = 0) {
  const respuesta = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener la lista de Pokémon.");
  }

  return await respuesta.json();
}

export async function obtenerPokemonPorTipo(tipo) {
  const respuesta = await fetch(`${BASE_URL}/type/${tipo.toLowerCase()}`);

  if (!respuesta.ok) {
    throw new Error("No se encontró el tipo indicado.");
  }

  return await respuesta.json();
}

export async function generarErrorIntencional() {
  const respuesta = await fetch(`${BASE_URL}/pokemon/pokemon-inexistente-123456`);

  if (!respuesta.ok) {
    throw new Error("Error intencional: recurso inexistente.");
  }

  return await respuesta.json();
}