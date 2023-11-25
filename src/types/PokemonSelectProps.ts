import { Pokemon } from "./Pokemon";

export type PokemonSelectProps = {
  data: Pokemon[];
  compearePokemon: (pokemon: Pokemon) => void;
};
