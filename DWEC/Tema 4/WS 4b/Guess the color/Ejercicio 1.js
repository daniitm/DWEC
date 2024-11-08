const colorDisplay = document.getElementById('colorDisplay');
const colorContainer = document.getElementById('colorContainer');
const messageDisplay = document.getElementById('message');
const livesDisplay = document.getElementById('livesDisplay');

let targetColor, lives, numColors = 3;
const colors = [];

const getRandomColor = () => `rgb(${rand256()}, ${rand256()}, ${rand256()})`;
const rand256 = () => Math.floor(Math.random() * 256);
const setDifficulty = level => { numColors = level; play(); };

function play() {
    lives = 3;
    colors.length = 0;
    colorContainer.innerHTML = '';
    messageDisplay.textContent = '';
    livesDisplay.textContent = `Vidas: ${lives}`;

    for (let i = 0; i < numColors; i++) colors.push(getRandomColor());
    targetColor = colors[Math.floor(Math.random() * numColors)];
    colorDisplay.textContent = targetColor;

    colors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = color;
        colorBox.onclick = () => checkGuess(color);
        colorContainer.appendChild(colorBox);
    });
}

function checkGuess(color) {
    if (color === targetColor) {
        endGame('¡Correcto!');
    } else if (--lives > 0) {
        livesDisplay.textContent = `Vidas: ${lives}`;
        messageDisplay.textContent = '¡Respuesta incorrecta! Intentalo de nuevo.';
    } else {
        endGame('¡Juego terminado!');
    }
}

const endGame = message => {
    messageDisplay.textContent = message;
    setTimeout(play, 2000);
};

play();