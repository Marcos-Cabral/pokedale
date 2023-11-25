import { Pokemon } from "./Pokemon";

export interface FilteredPokemonListProps {
  filteredData: Pokemon[];
  onSelectOption: (pokemon: Pokemon) => void;
}
