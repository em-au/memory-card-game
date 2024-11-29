import { useState, useEffect } from "react";
export { Card };

function Card({ pokemon }) {
  return (
    <>
      <img src={pokemon.imageUrl} alt={pokemon.name} />
    </>
  );
}
