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
      setPokemonList([]);
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
    setPokemonList([]);
    setSearchedPokemon(null);
    setSearchError(null);
    setOffset(0);
    loadPokemonData();
  };

  const renderPokemonCard = (pokemon) => (
    <div key={pokemon.name} className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
      <div className="card shadow-sm border-2" style={{ width: "100%" }}>
        <div className="card-img-top text-center p-3">
          <Link to={`/pokemons/${pokemon.id}`}>   
            <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} className="img-fluid" style={{ width: "150px", height: "150px" }} />
          </Link>
        </div>
        <div className="card-body text-center">
          <span className="badge bg-custom text-uppercase">{pokemon.types[0].type.name}</span>
          <h5 className="card-title mt-2 text-capitalize">{pokemon.name}</h5>
          <Link to={`/pokemons/${pokemon.id}`} className="btn btn-outline-primary custom-primary-btn">Ver Detalles</Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="page-header py-4 bg-light text-center">
        <div className="container">
          <h1 className="display-5">Explorador Pokémon</h1>
          <p className="lead">Descubre tu Pokémon favorito y sus detalles.</p>
        </div>
        <input
          className="px-2 py-1 border-custom border-input"
          type="text"
          placeholder="Busca un Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchPokemon()}
        />
        <span className="p-2 mx-1 rounded custom-search" onClick={searchPokemon}>Buscar</span>
        <span className="p-2 mx-1 rounded custom-search" onClick={resetSearch}>X</span>
      </div>

      <div className="section py-5">
        <div className="container">
          {searchedPokemon && (
            <div className="row mb-4">
              <h3 className="text-center">Resultado de la búsqueda:</h3>
              {renderPokemonCard(searchedPokemon)}
            </div>
          )}

          {searchError && <p className="text-center text-danger">{searchError}</p>}

          <div className="row">
            {pokemonList.map(renderPokemonCard)}
          </div>

          {loading && (
            <div className="d-flex justify-content-center align-items-center my-5">
              <div className="spinner-border custom-yellow-spinner" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-12 text-center">
              <button onClick={loadPokemonData} className="btn custom-load-btn">Cargar más</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pokemons;