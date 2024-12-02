import { useState, useEffect } from "react";
import "./App.css";
import { Card } from "./components/Card.jsx";

function App() {
  const [pokemon, setPokemon] = useState([]);

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
      for (let i = 0; i < 4; i++) {
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
    // remove click handler
    // win or lose
  }

  function winGame() {
    alert("you win");
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
      {pokemon.map((p) => {
        return (
          <>
            <Card key={p.name} pokemon={p} onClick={handleClick} />
          </>
        );
      })}
    </>
  );
}

export default App;
