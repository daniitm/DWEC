import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

function Details() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`${API_URL}${id}`);
        if (!response.ok) {
          throw new Error('Pokémon no encontrado');
        }
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="pokemon-details">
      <Link to="/pokemons" className="back-button">Volver a la lista</Link>
      <br></br>
      {pokemon && (
        <>
          <img 
            src={pokemon.sprites.other["official-artwork"].front_default} 
            alt={pokemon.name} 
          />
          <h2 className="text-capitalize">{pokemon.name}</h2>
          <div className="info">
            <p><strong>Número:</strong> #{pokemon.id}</p>
            <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
            <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
            <div className="types">
              {pokemon.types.map(type => (
                <span key={type.type.name} className="type">{type.type.name}</span>
              ))}
            </div>
            <p><strong>Habilidades:</strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
          </div>
          <div className="stats">
            <h3>Estadísticas:</h3>
            {pokemon.stats.map(stat => (
              <div key={stat.stat.name} className="stat-item">
                <strong>{stat.stat.name}:</strong> {stat.base_stat}
                <div className="progress">
                  <div 
                    className="progress-bar" 
                    style={{width: `${(stat.base_stat / 255) * 100}%`}}
                    aria-valuenow={stat.base_stat} 
                    aria-valuemin="0" 
                    aria-valuemax="255"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Details;