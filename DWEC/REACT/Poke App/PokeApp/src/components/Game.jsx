import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, query, orderBy, limit, onSnapshot, setDoc, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon/';
const CARD_PAIRS = 5;

function Game() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lockBoard, setLockBoard] = useState(false);
  const [showVictoryMessage, setShowVictoryMessage] = useState(false);
  const [topPlayers, setTopPlayers] = useState([]);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    initializeGame();
    const unsubscribe = fetchTopPlayers();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (showVictoryMessage && auth.currentUser) {
      const updateRanking = async () => {
        try {
          const userEmail = auth.currentUser.email;
          const userDocRef = doc(db, 'ranking', userEmail);
          const userDoc = await getDoc(userDocRef);
          
          if (!userDoc.exists() || userDoc.data().tiempo > time) {
            await setDoc(userDocRef, {
              email: userEmail,
              tiempo: time
            }, { merge: true });
          }
        } catch (error) {
          console.error("Error al actualizar el ranking:", error);
        }
      };
      updateRanking();
    }
  }, [showVictoryMessage, auth, db, time]);

  const initializeGame = async () => {
    setCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setTime(0);
    setIsPlaying(true);
    setLockBoard(false);
    setShowVictoryMessage(false);

    const pokemonIds = Array.from({ length: CARD_PAIRS }, () => Math.floor(Math.random() * 898) + 1);
    const pokemonData = await Promise.all(pokemonIds.map(fetchPokemon));
    const gameCards = [...pokemonData, ...pokemonData]
      .sort(() => Math.random() - 0.5)
      .map((pokemon, index) => ({
        id: index,
        pokemonId: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        isFlipped: false,
        isMatched: false
      }));
    setCards(gameCards);
  };

  const fetchPokemon = async (id) => {
    const response = await fetch(`${POKEMON_API}${id}`);
    return response.json();
  };

  const handleCardClick = (clickedCard) => {
    if (lockBoard || clickedCard.isFlipped || clickedCard.isMatched) return;

    const newCards = cards.map(card => 
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    setFlippedCards(prev => [...prev, clickedCard]);

    if (flippedCards.length === 1) {
      setLockBoard(true);
      checkForMatch(clickedCard);
    }
  };

  const checkForMatch = (secondCard) => {
    const [firstCard] = flippedCards;
    if (firstCard.pokemonId === secondCard.pokemonId) {
      setMatchedCards(prev => [...prev, firstCard.id, secondCard.id]);
      resetBoard();
    } else {
      setTimeout(() => {
        setCards(prevCards => prevCards.map(card => 
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, isFlipped: false }
            : card
        ));
        resetBoard();
      }, 1000);
    }
  };

  const resetBoard = () => {
    setFlippedCards([]);
    setLockBoard(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setIsPlaying(false);
      setShowVictoryMessage(true);
    }
  }, [matchedCards, cards]);

  const fetchTopPlayers = () => {
    try {
      const rankingRef = collection(db, 'ranking');
      const q = query(rankingRef, orderBy('tiempo'), limit(3));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const players = querySnapshot.docs.map(doc => ({
          email: doc.data().email,
          tiempo: formatTime(doc.data().tiempo)
        }));
        setTopPlayers(players);
      });
      return unsubscribe;
    } catch (error) {
      console.error("Error al obtener el ranking:", error);
    }
  };

  return (
    <div className="game-container">
      <h1>Juego de Memoria Pokémon</h1>
      <div className="timer">Tiempo: {formatTime(time)}</div>
      {showVictoryMessage && (
        <div className="victory-message">
          ¡Has ganado! Tiempo total: {formatTime(time)}
        </div>
      )}
      <div className="cards-container">
        {cards.map(card => (
          <div
            key={card.id}
            className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            {card.isFlipped && <img src={card.image} alt={card.name} />}
          </div>
        ))}
      </div>
      <button onClick={initializeGame}>Reiniciar Juego</button>

      <div className="ranking-table">
        <h2>Top 3 Jugadores</h2>
        <table>
          <thead>
            <tr>
              <th>Posición</th>
              <th>Email</th>
              <th>Mejor Tiempo</th>
            </tr>
          </thead>
          <tbody>
            {topPlayers.map((player, index) => (
              <tr key={player.email}>
                <td>{index + 1}</td>
                <td>{player.email}</td>
                <td>{player.tiempo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Game;