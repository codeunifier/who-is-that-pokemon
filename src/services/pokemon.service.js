import { getRandomizedList } from "./helper.service";

/**
 * Can get the total number of pokemon from the API through the /pokemon-species endpoint
 * and looking at the `count` property in the response.
 * */
const TOTAL_POKEMON_COUNT = 1025;

// Number of pokemon to fetch
const POKEMON_TO_FETCH = 24;

export function fetchRandomPokemon() {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  const randomPokemonIds = getRandomizedList(TOTAL_POKEMON_COUNT, POKEMON_TO_FETCH);

  const pokemonPromises = randomPokemonIds.map((id) => {
    return fetch(baseUrl + id).then((res) => res.json());
  });

  return Promise.all(pokemonPromises);
}