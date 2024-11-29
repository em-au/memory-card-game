import { useState, useEffect } from "react";
import "./App.css";
import { Card } from "../components/Card.jsx";

function App() {
  const allPokemon = [
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
    "mimikyu",
    "charmander",
    "bulbasaur",
    "turtwig",
    "cyndaquil",
    "psyduck",
  ];

  useEffect(() => {
    let pokemon = [];
    let index;
    for (let i = 0; i < 16; i++) {
      do {
        index = Math.floor(Math.random() * allPokemon.length);
      } while (pokemon.includes(allPokemon[index]));
      pokemon.push(allPokemon[index]);
    }
    console.log(pokemon);
  });
  return (
    <>
      <Card />
      <p>test</p>
    </>
  );
}

export default App;
