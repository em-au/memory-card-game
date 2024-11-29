import { useState, useEffect } from "react";
import "./App.css";
import { Card } from "../components/Card.jsx";

function App() {
  const [pokemon, setPokemon] = useState([]);
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

  async function getImage(name) {
    //const pokemon = "eevee";
    const url = "https://pokeapi.co/api/v2/pokemon/" + name;
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    //setImageUrl(data.sprites.other["official-artwork"]["front_default"]);
    return data.sprites.other["official-artwork"]["front_default"];
  }

  useEffect(() => {
    let chosenPokemon = [];
    let index;
    for (let i = 0; i < 16; i++) {
      do {
        index = Math.floor(Math.random() * allPokemonNames.length);
      } while (chosenPokemon.some((p) => p.name === allPokemonNames[index]));
      let onePokemon = {
        name: allPokemonNames[index],
        imageUrl: getImage(allPokemonNames[index]),
      };
      chosenPokemon.push(onePokemon);
    }
    console.log(chosenPokemon);
    setPokemon(chosenPokemon);
    //console.log(pokemon);
  }, []);
  return (
    <>
      <Card />
      {pokemon.map((p) => (
        <p key={p.name}>{p.name}</p>
      ))}
    </>
  );
}

export default App;
