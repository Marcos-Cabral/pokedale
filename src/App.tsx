import { useEffect, useState } from "react";
import pokemonData from "./data.json";
import PokemonSelect from "./Components/PokemonSelect/PokemonSelect";
import { Pokemon } from "./types/Pokemon";
import PokemonTable from "./Components/PokemonTable/PokemonTable";
import Confetti from 'react-confetti'
import "./App.css";

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
    setPokemonAleatorio(pokemonAleatorio);
  }

  useEffect(() => {
    generarPokemon();

    /* codigo automatizado para exportar la informacion a json 
    const fetchData = async () => {
      try {
        const response = await fetch(
          //"https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
          //"https://pokeapi.co/api/v2/pokemon?limit=100&offset=151"
          //"https://pokeapi.co/api/v2/pokemon?limit=135&offset=251"
          //"https://pokeapi.co/api/v2/pokemon?limit=107&offset=386"
          //"https://pokeapi.co/api/v2/pokemon?limit=156&offset=493"
          //"https://pokeapi.co/api/v2/pokemon?limit=72&offset=649"
          //"https://pokeapi.co/api/v2/pokemon?limit=88&offset=721"
          //"https://pokeapi.co/api/v2/pokemon?limit=89&offset=809"
          //"https://pokeapi.co/api/v2/pokemon?limit=95&offset=905"
        );
        const data = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();

            const types = pokemonData.types.map(
              (typeObject) => typeObject.type.name
            );

            return {
              id: pokemonData.id,
              name: pokemonData.name,
              image: pokemonData.sprites.front_default,
              types: types.length === 2 ? [types[0], types[1]] : [types[0]],
              faseEvolution: 1,
              generation: 8
            };
          })
        );

        setPokemonData(pokemonDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

   // fetchData();*/
  }, []);
  /*const handleDownloadJSON = () => {
    const jsonData = JSON.stringify(pokemonData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "pokemonData.json";
    a.click();

    URL.revokeObjectURL(url);
  };*/

  function typesMatch(type: string, types: string[], position: number) {
    if (!types[position] && !type) {
      return "#92cc41";
    } else if (!types.includes(type)) {
      return "#e76e55";
    } else if (types[position] && types[position] == type) {
      return "#92cc41";
    } else {
      return "#f7d51d";
    }
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

  /*const handleDownload = async () => {
    const zip = new JSZip();
    const promises:any = [];

    pokemonData.forEach((pokemon) => {
      const filename = `${pokemon.name}.png`;
      const url = pokemon.image;

      promises.push(
        axios
          .get(url, { responseType: "arraybuffer" })
          .then((response) => {
            zip.file(filename, response.data, { binary: true });
          })
          .catch((error) => {
            console.error(`Failed to fetch image ${filename}:`, error);
          })
      );
    });

    Promise.all(promises)
      .then(() => {
        zip.generateAsync({ type: "blob" }).then((content) => {
          const zipFile = new Blob([content]);
          const zipUrl = URL.createObjectURL(zipFile);

          const link = document.createElement("a");
          link.href = zipUrl;
          link.download = "pokemon_images.zip";
          link.click();
        });
      })
      .catch((error) => {
        console.error("Error creating zip file:", error);
      });
  };*/

  return (
    <div className="game-container">
      {showConfetti && <Confetti   width={window.innerWidth} height={window.innerHeight} />}
      {won && (
        <dialog className="nes-dialog" id="dialog-default" open>
          <form method="dialog">
            <p className="dialog-title">Has Acertado</p>
            <p>El pokemon era {pokemonAleatorio.name}</p>
            <menu className="dialog-menu">
              <button
                onClick={() => {
                  setWon(false);
                }}
                className="nes-btn nes-btn-close"
              >
                Cerrar
              </button>
              <button onClick={reset} className="nes-btn is-primary">
                Volver a Jugar
              </button>
            </menu>
          </form>
        </dialog>
      )}
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
        typesMatch={typesMatch}
      />
    </div>
  );
}

export default App;
