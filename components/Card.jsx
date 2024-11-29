import { useState, useEffect } from "react";
export { Card };

// TODO: randomly select pokemon from an array and then fetch all the image urls at once
// instead of fetching url when rendering card

function Card() {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    async function getPokemon() {
      const pokemon = "eevee";
      const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
      const response = await fetch(url, { mode: "cors" });
      const data = await response.json();
      setImageUrl(data.sprites.other["official-artwork"]["front_default"]);
    }
    getPokemon();
    console.log(imageUrl);
  }, [imageUrl]);

  return (
    <>
      <p>tets</p>
      <img src={imageUrl} />
    </>
  );
}
