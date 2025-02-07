import React from 'react';
import pokemonImage from '../img/landing.png';

function Landing() {
  return (
    <div className="landing">
      <h2>Bienvenido a la App de Pokémon</h2>
      <p>Aquí podrás encontrar información sobre tus pokemons favoritos. ¡Encuentra a tu Pokemon favorito ahora!</p>
      <br></br>
      <img src={pokemonImage} alt="Pokémon" />
      <br></br>
      <p>¡Inicia sesión para jugar al juego de las parejas pokémon!</p>
    </div>
  );
}

export default Landing;