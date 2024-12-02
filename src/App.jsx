import { useState, useEffect } from "react";
//import "./App.css";
import "./styles/style.css";
import { Card } from "./components/Card.jsx";

//TODO: implement current and best score

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  async function getImage(name) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + name;
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    return data.sprites.other["official-artwork"]["front_default"];
  }

  useEffect(() => {
    const allPokemonNames = [
      "eevee",
      "bellibolt",
      "miltank",
      "torkoal",
      "pachirisu",
      "snom",
      "litten",
      "squirtle",
      "rhydon",
      "altaria",
      "camerupt",
      "azumarill",
      "espurr",
      "togepi",
      "slowpoke",
      "magcargo",
      "ditto",
      "mew",
      "gardevoir",
      "snorlax",
      "pikachu",
      "arcanine",
      "wobbuffet",
      "blissey",
      "lickitung",
      "charmander",
      "bulbasaur",
      "turtwig",
      "cyndaquil",
      "psyduck",
    ];
    let chosenPokemon = [];
    let index;
    (async function () {
      for (let i = 0; i < 16; i++) {
        do {
          index = Math.floor(Math.random() * allPokemonNames.length);
        } while (chosenPokemon.some((p) => p.name === allPokemonNames[index]));
        let imageUrl = await getImage(allPokemonNames[index]);
        let onePokemon = {
          name: allPokemonNames[index],
          imageUrl: imageUrl,
          wasClicked: false,
        };
        chosenPokemon.push(onePokemon);
      }
      console.log(chosenPokemon);
      setPokemon(chosenPokemon);
    })();
  }, []);

  function handleClick(pokemonName) {
    for (let i = 0; i < pokemon.length; i++) {
      if (pokemon[i].name === pokemonName) {
        if (!pokemon[i].wasClicked) {
          const pCopy = { ...pokemon[i], wasClicked: true };
          let pokemonCopy = pokemon.with(i, pCopy);
          if (!checkWin(pokemonCopy)) {
            shuffle(pokemonCopy);
            setPokemon(pokemonCopy);
            setCurrentScore(currentScore + 1);
          } else {
            winGame();
          }
        } else {
          loseGame();
        }
      }
    }
  }

  function loseGame() {
    alert("you lose");
    endGame();
  }

  function winGame() {
    alert("you win");
    endGame();
  }

  function endGame() {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }
    setCurrentScore(0);
    setGameOver(true);
  }

  function checkWin(array) {
    for (let p of array) {
      if (!p.wasClicked) return false;
    }
    return true;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  return (
    <>
      <div className="header">
        <h1>MEMORY CARD</h1>
        <div className="scores">
          <p>Best Score: {bestScore}</p>
          <p>Current Score: {currentScore}</p>
        </div>
      </div>
      <div className="grid">
        {pokemon.map((p) => {
          return (
            <div className="card" key={p.name}>
              <Card pokemon={p} onClick={!gameOver ? handleClick : null} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
