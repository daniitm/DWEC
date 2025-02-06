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
    <div className="container mt-5">
      <Link to="/" className="btn btn-primary mb-3">Volver a la lista</Link>
      {pokemon && (
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 text-center">
                <img 
                  src={pokemon.sprites.other["official-artwork"].front_default} 
                  alt={pokemon.name} 
                  className="img-fluid"
                  style={{ maxWidth: '300px' }}
                />
              </div>
              <div className="col-md-6">
                <h2 className="card-title text-capitalize">{pokemon.name}</h2>
                <p><strong>Número:</strong> #{pokemon.id}</p>
                <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
                <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
                <p><strong>Tipos:</strong> {pokemon.types.map(type => type.type.name).join(', ')}</p>
                <p><strong>Habilidades:</strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <h3>Estadísticas</h3>
                {pokemon.stats.map(stat => (
                  <div key={stat.stat.name} className="mb-2">
                    <strong>{stat.stat.name}:</strong> {stat.base_stat}
                    <div className="progress">
                      <div 
                        className="progress-bar" 
                        role="progressbar" 
                        style={{width: `${(stat.base_stat / 255) * 100}%`}}
                        aria-valuenow={stat.base_stat} 
                        aria-valuemin="0" 
                        aria-valuemax="255"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;