import { Pokemon } from "./Pokemon";
export interface PokemonTableProps {
  attemptedPokemons: Pokemon[];
  pokemonAleatorio: Pokemon;
  typesMatch: (type: string, types: string[], position: number) => string;
}
