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
    alert(pokemonName);
    for (let i = 0; i < pokemon.length; i++) {
      if (pokemon[i].name === pokemonName) {
        if (!pokemon[i].wasClicked) {
          const pCopy = { ...pokemon[i], wasClicked: true };
          const pokemonCopy = pokemon.with(i, pCopy);
          setPokemon(pokemonCopy);
        } else endGame();
      }
    }
  }

  function endGame() {
    alert("game over");
    // remove click handler
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
