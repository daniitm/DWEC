import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import { PrivRoutes } from './PrivRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/Landing';
import Login from './components/Login';
import Pokemons from './components/Pokemons';
import Details from './components/Details';
import Game from './components/Game';
import Error404 from './components/Error404';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <nav>
          <Link to="/"> Inicio </Link>
          <Link to="/pokemons"> Pokemons </Link>
          <Link to="/game">Juego</Link>
          <Link to="/login"> Iniciar Sesión </Link>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pokemons" element={<Pokemons />} /> 
            <Route path="/pokemons/:id" element={<Details />} />
            <Route element={<PrivRoutes />}>
              <Route path="/game" element={<Game />} />         
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App
