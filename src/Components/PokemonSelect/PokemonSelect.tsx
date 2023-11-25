import React, { useState } from "react";
import "./pokemonSelect.css";
import { PokemonSelectProps } from "../../types/PokemonSelectProps";
import { Pokemon } from "../../types/Pokemon";
import FilteredPokemonList from "../FilteredPokemonList/FilteredPokemonList";

const PokemonSelect: React.FC<PokemonSelectProps> = ({
  data,
  compearePokemon,
}: PokemonSelectProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const onSelectOption = (pokemon: Pokemon) => {
    setSearchTerm("");
    compearePokemon(pokemon);
  };

  const filteredData = data.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="pokemon-select">
      <input
        type="text"
        className="filter-input nes-input"
        placeholder="Nombre de pokemon"
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && filteredData.length > 0 && (
        <FilteredPokemonList
          filteredData={filteredData}
          onSelectOption={onSelectOption}
        />
      )}
    </div>
  );
};

export default PokemonSelect;
