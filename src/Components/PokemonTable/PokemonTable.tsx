import React, { useEffect, useState } from "react";
import { PokemonTableProps } from "../../types/PokemonTableProps";
import "./PokemonTable.css";
import { typesMatch } from "../../Helpers";

const PokemonTable: React.FC<PokemonTableProps> = ({
  attemptedPokemons,
  pokemonAleatorio,
}: PokemonTableProps) => {
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  useEffect(() => {
    if (attemptedPokemons.length == 1) {
      setTriggerAnimation(true);
    }

    if (attemptedPokemons.length > 0) {
      setTriggerAnimation(true);

      const timer = setTimeout(() => {
        setTriggerAnimation(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [attemptedPokemons]);
  return (
    <div className="table-container">
      <table className="pokemon-table">
        <thead>
          <tr className="table-header ">
            <th>Pokémon</th>
            <th>Tipo 1</th>
            <th>Tipo 2</th>
            <th>Fase</th>
            <th>Full evo</th>
            <th>Gen</th>
          </tr>
        </thead>
        <tbody>
          {attemptedPokemons
            .slice()
            .reverse()
            .map((pokemon, index) => (
              <tr
                key={index}
                className={
                  index === 0 && triggerAnimation ? "show-with-delay" : ""
                }
              >
                <td className="nes-container">
                  <img
                    title={pokemon.name}
                    alt={pokemon.name}
                    src={"/imagenes/" + pokemon.name + ".png"}
                    className="pokemon-container"
                  />
                </td>
                <td
                  className="nes-container"
                  style={{
                    backgroundColor: typesMatch(
                      pokemon.types[0],
                      pokemonAleatorio.types,
                      0
                    ),
                  }}
                >
                  {pokemon.types[0]}
                </td>
                <td
                  className="nes-container"
                  style={{
                    backgroundColor: typesMatch(
                      pokemon.types[1],
                      pokemonAleatorio.types,
                      1
                    ),
                  }}
                >
                  {pokemon.types[1] || "-"}
                </td>
                <td
                  className="nes-container"
                  style={{
                    backgroundColor:
                      pokemon.faseEvolution === pokemonAleatorio.faseEvolution
                        ? "#92cc41"
                        : "#e76e55",
                  }}
                >
                  {pokemon.faseEvolution ===
                    pokemonAleatorio.faseEvolution ? null : (
                    <img
                      className={
                        pokemonAleatorio.faseEvolution > pokemon.faseEvolution
                          ? "arrowTop"
                          : "arrowBot"
                      }
                      src="/flecha.png"
                      width="50px"
                      height="50px"
                    />
                  )}
                  {pokemon.faseEvolution}
                </td>

                <td
                  className="nes-container"
                  style={{
                    backgroundColor:
                      pokemon.fullEnvolved === pokemonAleatorio.fullEnvolved
                        ? "#92cc41"
                        : "#e76e55",
                  }}
                >
                  {pokemon.fullEnvolved ? "Si" : "No"}
                </td>

                <td
                  className="nes-container"
                  style={{
                    backgroundColor:
                      pokemon.generation === pokemonAleatorio.generation
                        ? "#92cc41"
                        : "#e76e55",
                  }}
                >
                  {pokemon.generation === pokemonAleatorio.generation ? null : (
                    <img
                      className={
                        pokemonAleatorio.generation > pokemon.generation
                          ? "arrowTop"
                          : "arrowBot"
                      }
                      src="/flecha.png"
                      width="50px"
                      height="50px"
                    />
                  )}
                  {pokemon.generation}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonTable;
