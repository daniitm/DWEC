import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const INITIAL_LIMIT = 8;

function Pokemons() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    loadPokemonData();
  }, []);

  const loadPokemonData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?offset=${offset}&limit=${INITIAL_LIMIT}`);
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      setPokemonList(prev => [...prev, ...pokemonDetails]);
      setOffset(prev => prev + INITIAL_LIMIT);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchPokemon = async () => {
    if (!searchTerm.trim()) {
      resetSearch();
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}${searchTerm.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokémon no encontrado");
      const data = await response.json();
      setSearchedPokemon(data);
      setSearchError(null);
    } catch (error) {
      setSearchedPokemon(null);
      setSearchError("Pokémon no encontrado.");
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    setSearchedPokemon(null);
    setSearchError(null);
    if (pokemonList.length === 0) {
      setOffset(0);
      loadPokemonData();
    }
  };

  const renderPokemonCard = (pokemon) => (
    <div key={pokemon.id} className="pokemon-card">
      <Link to={`/pokemons/${pokemon.id}`}>   
        <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
      </Link>
      <h3 className="text-capitalize">{pokemon.name}</h3>
      <p>#{pokemon.id.toString().padStart(3, '0')}</p>
      <div className="types">
        {pokemon.types.map(typeInfo => (
          <span key={typeInfo.type.name} className="type">{typeInfo.type.name}</span>
        ))}
      </div>
      <Link to={`/pokemons/${pokemon.id}`} className="btn">Ver Detalles</Link>
    </div>
  );

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Explorador todos los Pokemons</h1>
          <p>Descubre tu Pokémon favorito y todos sus detalles, características y estadísticas.</p>
        </div>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Busca un Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchPokemon()}
          />
          <button className="search-button" onClick={searchPokemon}>Buscar</button>
          <button className="reset-button" onClick={resetSearch}>X</button>
        </div>
      </div>

      <div className="pokemon-container">
        {searchedPokemon && (
          <div className="search-result">
            <h3>Resultado de la búsqueda:</h3>
            {renderPokemonCard(searchedPokemon)}
          </div>
        )}

        {searchError && (
          <div className="error-message">
            <p>{searchError}</p>
          </div>
        )}

        {!searchedPokemon && !searchError && (
          <>
            <div className="pokemon-list">
              {pokemonList.map(renderPokemonCard)}
            </div>

            {loading && (
              <div className="spinner-container">
                <div className="spinner-border custom-yellow-spinner" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            )}

            <div className="load-more-container">
              <button onClick={loadPokemonData} className="custom-load-btn">Cargar más</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Pokemons;