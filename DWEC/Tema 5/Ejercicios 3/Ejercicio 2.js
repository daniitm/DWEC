const wordList = ['kanye', 'travis', 'cudi', 'kendrick', 'jahseh'];
let word = wordList[Math.floor(Math.random() * wordList.length)]; 
let displayedWord = Array(word.length).fill('_'); 
let lives = 10; 

const wordDisplay = document.getElementById('wordDisplay');
const livesDisplay = document.getElementById('livesDisplay');
const lettersContainer = document.getElementById('lettersContainer');

function updateWordDisplay() {
    wordDisplay.textContent = displayedWord.join(' ');
}

function updateLives() {
    livesDisplay.textContent = `You have ${lives} lives`;
}

function handleLetterClick(letter) {
    const button = document.querySelector(`#button-${letter}`);
    button.disabled = true;
    let isCorrect = false;

    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            displayedWord[i] = letter;
            isCorrect = true;
        }
    }

    if (!isCorrect) {
        lives--;
        updateLives();
    }
    updateWordDisplay();

    if (lives <= 0) {
        alert('¡You Lose! The word was: ' + word);
        resetGame();
    } else if (!displayedWord.includes('_')) {
        alert('¡You Win!');
        resetGame();
    }
}

// Función para reiniciar el juego
function resetGame() {
    word = wordList[Math.floor(Math.random() * wordList.length)]; // Nueva palabra aleatoria
    displayedWord = Array(word.length).fill('_'); // Restablecer la palabra oculta
    lives = 10; // Restablecer las vidas
    updateWordDisplay();
    updateLives();
    enableAllButtons();
}

// Función para habilitar todos los botones de las letras
function enableAllButtons() {
    const buttons = document.querySelectorAll('.letters button');
    buttons.forEach(button => {
        button.disabled = false;
    });
}

// Crear los botones de las letras
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
alphabet.forEach(letter => {
    const button = document.createElement('button');
    button.textContent = letter;
    button.id = `button-${letter}`;
    button.addEventListener('click', () => handleLetterClick(letter));
    lettersContainer.appendChild(button);
});

// Inicializar la visualización del juego
updateWordDisplay();
updateLives();