import { useState, useEffect } from "react";
export { Card };

function Card({ pokemon, onClick }) {
  return (
    <>
      <img
        src={pokemon.imageUrl}
        alt={pokemon.name}
        onClick={() => onClick(pokemon.name)}
      />
    </>
  );
}
