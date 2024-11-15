let cards = document.querySelectorAll('.card');
let timer = document.getElementById('time');
let flippedCards = [];
let matchedCards = [];
let gameTimer;
let seconds = 0;
let lockBoard = false;  // Para bloquear el tablero mientras se verifica si las cartas coinciden

// Mezclar las cartas
function shuffle() {
  const values = ['1', '2', '3', '4', '5', '1', '2', '3', '4', '5'];
  values.sort(() => Math.random() - 0.5);
  
  cards.forEach((card, index) => {
    card.setAttribute('data-card', values[index]);
  });
}

// Formato de tiempo
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const remainingSeconds = sec % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Iniciar el cronómetro
function startTimer() {
  gameTimer = setInterval(() => {
    seconds++;
    timer.textContent = formatTime(seconds);
  }, 1000);
}

// Detener el cronómetro
function stopTimer() {
  clearInterval(gameTimer);
}

// Verificar si las cartas coinciden
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.getAttribute('data-card') === card2.getAttribute('data-card')) {
    // Si coinciden, añadir la clase 'matched' para dejarlas boca arriba
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
  } else {
    // Si no coinciden, darles la vuelta después de un retraso
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    }, 1000);  // Retardo de 1 segundo
  }

  flippedCards = [];

  // Verificar si todas las cartas han sido emparejadas
  if (matchedCards.length === cards.length) {
    stopTimer();
    alert(`¡Has ganado! Tiempo total: ${formatTime(seconds)}`);
  }
}

// Manejo de eventos para las cartas
cards.forEach(card => {
  card.addEventListener('click', () => {
    // Si la carta ya está volteada, emparejada, o el tablero está bloqueado, no hacer nada
    if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) {
      return;
    }

    // Voltear la carta
    card.classList.add('flipped');
    flippedCards.push(card);

    // Cuando hay dos cartas volteadas, verificar si son una pareja
    if (flippedCards.length === 2) {
      lockBoard = true;  // Bloquear el tablero mientras se verifica
      checkMatch();
      
      // Desbloquear el tablero después de 1 segundo (para dar tiempo a las animaciones)
      setTimeout(() => {
        lockBoard = false;
      }, 1000);
    }
  });
});

// Comenzar el juego
function startGame() {
  shuffle();
  startTimer();
}

startGame();