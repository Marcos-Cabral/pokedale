import { useEffect, useState } from "react";
import pokemonData from "./data.json";
import PokemonSelect from "./Components/PokemonSelect/PokemonSelect";
import { Pokemon } from "./types/Pokemon";
import PokemonTable from "./Components/PokemonTable/PokemonTable";
import Confetti from 'react-confetti'
import "./App.css";
import Dialog from "./Components/Dialog/Dialog";
import { useGameContext } from "./Context/GameContext";
const GENERATIONS_TOTAL = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const generationRanges = {
  1: { startIndex: 0, endIndex: 150 },
  2: { startIndex: 151, endIndex: 251 },
  3: { startIndex: 251, endIndex: 385 },
  4: { startIndex: 386, endIndex: 492 },
  5: { startIndex: 386, endIndex: 648 },
  6: { startIndex: 649, endIndex: 720 },
  7: { startIndex: 721, endIndex: 808 },
  8: { startIndex: 809, endIndex: 897 },
  9: { startIndex: 898, endIndex: 980 },
};
function App() {
  const { selectedGenerations, handleGenerations } = useGameContext();
  const [generations, setGenerations] = useState<number[]>(selectedGenerations);
  const [attemptedPokemons, setAttemptedPokemons] = useState<Pokemon[]>([]);
  const [won, setWon] = useState<boolean>(false);
  const [reseted, setReseted] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [pokemonAleatorio, setPokemonAleatorio] = useState<Pokemon>(
    {} as Pokemon
  );
  function showResetedModal() {
    setReseted(true);
  }
  function reset() {
    setAttemptedPokemons([]);
    generarPokemon();
    setWon(false);
  }

  function handleChangeGenerations() {
    if (!generations.length) return;

    if (!areArraysEqual(generations, selectedGenerations)) {
      handleGenerations(generations);
    }
  }

  useEffect(() => {
    setAttemptedPokemons([]);
    generarPokemon();
    setWon(false);
  }, [selectedGenerations]);

  const areArraysEqual = (arr1: number[], arr2: number[]) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    return arr1.every((element, index) => element === arr2[index]);
  };
  function generarPokemon() {
    console.log(selectedGenerations.map(i => i));
    var generationRandomIndex = Math.floor(Math.random() * selectedGenerations.length);
    var generationRandomGenerated = selectedGenerations[generationRandomIndex];
    var { startIndex, endIndex } = generationRanges[generationRandomGenerated];
    const indiceAleatorio = Math.floor(Math.random() * (endIndex - startIndex + 1)) + startIndex;
    const pokemonAleatorio = pokemonData[indiceAleatorio];
    console.log(pokemonAleatorio)
    setPokemonAleatorio(pokemonAleatorio);
  }

  function compearePokemon(pokemon: Pokemon) {
    if (pokemon.id === pokemonAleatorio.id) {
      setAttemptedPokemons([...attemptedPokemons, pokemon]);
      setShowConfetti(true);
      setTimeout(() => {
        setWon(true);
      }, 1500);
      setTimeout(() => {
        setShowConfetti(false);
      }, 4500);
      return;
    }
    if (!attemptedPokemons.find((p) => p.id === pokemon.id)) {
      setAttemptedPokemons([...attemptedPokemons, pokemon]);
    }
  }

  const handleClose = () => {
    setWon(false);
  }
  const handleCloseResetAndReset = () => {
    setReseted(false);
    setAttemptedPokemons([]);
    generarPokemon();
    setWon(false);
  }
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const generationNum = parseInt(e.target.value, 10);
    const updatedGenerations = e.target.checked
      ? [...generations, generationNum]
      : generations.filter((gen) => gen !== generationNum);

    setGenerations(updatedGenerations);
  };
  return (
    <div className="game-container">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <Dialog visible={won} onClose={handleClose} onSuccess={reset}>
        <>
          <p className="dialog-title">Has Acertado</p>
          <p>El Pokémon era {pokemonAleatorio.name}</p>
          <img src={`/imagenes/${pokemonAleatorio.name}.png`} height={100} width={100} />
        </>
      </Dialog>
      <h1 className="title">PokeDaLE</h1>
      <div className="checkbox-container">
        GEN:
        {GENERATIONS_TOTAL.map((gen) => (
          <label key={gen.toString()} className="checkbox-label">
            <input
              type="checkbox"
              className="nes-checkbox is-dark"
              value={gen}
              checked={generations.includes(gen)}
              onChange={handleCheckboxChange}
            />
            <span>{gen}</span>
          </label>
        ))}
        <button
          onClick={handleChangeGenerations}
          className="nes-btn is-success btn-play"
        >
          <img src="/play.png" width="100%" alt="play" height="100%" />
        </button>
      </div>
      <button
        disabled={won}
        onClick={showResetedModal}
        className="nes-btn is-error btn-reset"
      >
        <img src="/refresh.png" width="100%" alt="reset" height="100%" />
      </button>
      <Dialog visible={reseted} onClose={handleCloseResetAndReset} onSuccess={handleCloseResetAndReset}>
        <>
          <p>El Pokémon era {pokemonAleatorio.name}</p>
          <img src={`/imagenes/${pokemonAleatorio.name}.png`} height={100} width={100} />
        </>
      </Dialog>
      <PokemonSelect data={pokemonData} compearePokemon={compearePokemon} />
      <PokemonTable
        attemptedPokemons={attemptedPokemons}
        pokemonAleatorio={pokemonAleatorio}
      />
    </div >
  );
}

export default App;
