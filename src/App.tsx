import { useEffect, useState } from "react";
import pokemonData from "./data.json";
import PokemonSelect from "./Components/PokemonSelect/PokemonSelect";
import { Pokemon } from "./types/Pokemon";
import PokemonTable from "./Components/PokemonTable/PokemonTable";
import Confetti from 'react-confetti'
import "./App.css";
import Dialog from "./Components/Dialog/Dialog";

function App() {
  const [attemptedPokemons, setAttemptedPokemons] = useState<Pokemon[]>([]);
  const [won, setWon] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [pokemonAleatorio, setPokemonAleatorio] = useState<Pokemon>(
    {} as Pokemon
  );

  function reset() {
    setAttemptedPokemons([]);
    generarPokemon();
    setWon(false);
  }

  function generarPokemon() {
    const indiceAleatorio = Math.floor(Math.random() * pokemonData.length);
    const pokemonAleatorio = pokemonData[indiceAleatorio];
    console.log(pokemonAleatorio.name)
    setPokemonAleatorio(pokemonAleatorio);
  }

  useEffect(() => {
    generarPokemon();
  }, []);

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

      <button
        disabled={won}
        onClick={reset}
        className="nes-btn is-error btn-reset"
      >
        <img src="/refresh.png" width="100%" alt="reset" height="100%" />
      </button>

      <PokemonSelect data={pokemonData} compearePokemon={compearePokemon} />
      <PokemonTable
        attemptedPokemons={attemptedPokemons}
        pokemonAleatorio={pokemonAleatorio}
      />
    </div>
  );
}

export default App;
