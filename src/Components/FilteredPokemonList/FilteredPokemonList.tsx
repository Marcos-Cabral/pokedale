import React from "react";
import { FilteredPokemonListProps } from "../../types/FilteredPokemonListProps";
import './FilteredPokemonList.css'

const FilteredPokemonList: React.FC<FilteredPokemonListProps> = ({
  filteredData,
  onSelectOption,
}: FilteredPokemonListProps) => {
  return (
    <section className="pokemon-list">
      <div className="nes-container nes-search-container">
        {filteredData.map((pokemon) => (
          <button
            className="pokemon-item"
            onClick={() => onSelectOption(pokemon)}
            key={pokemon.id}
          >
            <img
              className="pokemon-image"
              src={`/imagenes/${pokemon.name}.png`}
              alt={pokemon.name}
            />
            {pokemon.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default FilteredPokemonList;
