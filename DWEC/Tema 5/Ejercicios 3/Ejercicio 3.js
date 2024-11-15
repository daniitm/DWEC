let cards = document.querySelectorAll('.card');
let timer = document.getElementById('time');
let flippedCards = [];
let matchedCards = [];
let gameTimer;
let seconds = 0;
let lockBoard = false;  

function shuffle() {
  const values = ['1', '2', '3', '4', '5', '1', '2', '3', '4', '5'];
  values.sort(() => Math.random() - 0.5);
  
  cards.forEach((card, index) => {
    card.setAttribute('data-card', values[index]);
  });
}

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const remainingSeconds = sec % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function startTimer() {
  gameTimer = setInterval(() => {
    seconds++;
    timer.textContent = formatTime(seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(gameTimer);
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.getAttribute('data-card') === card2.getAttribute('data-card')) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    }, 1000);  
  }

  flippedCards = [];

  if (matchedCards.length === cards.length) {
    stopTimer();
    alert(`¡Has ganado! Tiempo total: ${formatTime(seconds)}`);
  }
}

cards.forEach(card => {
  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) {
      return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      lockBoard = true;  
      checkMatch();
      
      setTimeout(() => {
        lockBoard = false;
      }, 1000);
    }
  });
});

function startGame() {
  shuffle();
  startTimer();
}

startGame();