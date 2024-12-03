import { useState, useEffect } from "react";
import "./styles/style.css";
import { Card } from "./components/Card.jsx";
import { Message } from "./components/Message.jsx";
import { Instruction } from "./components/Instruction.jsx";

function App() {
  const [showInstruction, setShowInstruction] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [plays, setPlays] = useState(0);

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
    const SIZE = 16;
    let chosenPokemon = [];
    let index;
    (async function () {
      for (let i = 0; i < SIZE; i++) {
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
      setPokemon(chosenPokemon);
    })();
  }, [plays]);

  function closeInstruction() {
    setShowInstruction(false);
  }

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
          setCurrentScore(currentScore + 1);
          if (currentScore >= bestScore) {
            setBestScore(currentScore + 1);
          }
        } else {
          loseGame();
        }
      }
    }
  }

  function handlePlayAgain() {
    setGameOver(false);
    setWin(false);
    setCurrentScore(0);
    setPlays(plays + 1);
  }

  function loseGame() {
    setGameOver(true);
  }

  function winGame() {
    setWin(true);
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
        <button type="button" onClick={() => setShowInstruction(true)}>
          <i
            className="fa-regular fa-circle-question fa-xl"
            alt="instructions"
          ></i>
        </button>
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

      {gameOver ? (
        win ? (
          <Message
            outcome="win"
            header="You win!"
            text="You clicked on all the cards"
            onClick={handlePlayAgain}
          />
        ) : (
          <Message
            outcome="lose"
            header="Game over!"
            text="You clicked on the same card twice"
            onClick={handlePlayAgain}
          />
        )
      ) : null}

      {showInstruction && <Instruction onClick={closeInstruction} />}
    </>
  );
}

export default App;
