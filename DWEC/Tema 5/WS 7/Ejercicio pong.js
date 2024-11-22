const gameArea = document.getElementById("gameArea");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const ball = document.getElementById("ball");
const scoreboard = document.getElementById("scoreboard");

const paddleWidth = 10, paddleHeight = 100, ballSize = 10;
let ballSpeedX = 5, ballSpeedY = 5;
let playerSpeed = 0;
let computerSpeed = 0;

let player1Y = gameArea.clientHeight / 2 - paddleHeight / 2;
let player2Y = gameArea.clientHeight / 2 - paddleHeight / 2;
let ballX = gameArea.clientWidth / 2 - ballSize / 2;
let ballY = gameArea.clientHeight / 2 - ballSize / 2;

let player1Speed = 0;
let player2Speed = 0;

function draw() {
    player1.style.top = player1Y + "px";
    player2.style.top = player2Y + "px";
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ballSize >= gameArea.clientHeight) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= paddleWidth) {
        if (ballY + ballSize > player1Y && ballY < player1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            resetBall();
        }
    }

    if (ballX + ballSize >= gameArea.clientWidth - paddleWidth) {
        if (ballY + ballSize > player2Y && ballY < player2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            resetBall();
        }
    }

    if (ballX <= 0 || ballX + ballSize >= gameArea.clientWidth) {
        resetBall();
    }
}

function resetBall() {
    ballX = gameArea.clientWidth / 2 - ballSize / 2;
    ballY = gameArea.clientHeight / 2 - ballSize / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 5 * (Math.random() < 0.5 ? 1 : -1);
}

function movePaddles() {
    player1Y += player1Speed;
    player2Y += player2Speed;

    if (player1Y < 0) player1Y = 0;
    if (player1Y + paddleHeight > gameArea.clientHeight) player1Y = gameArea.clientHeight - paddleHeight;

    if (player2Y < 0) player2Y = 0;
    if (player2Y + paddleHeight > gameArea.clientHeight) player2Y = gameArea.clientHeight - paddleHeight;
}

function keyDownHandler(e) {
    if (e.key == "ArrowUp") {
        player2Speed = -6;
    } else if (e.key == "ArrowDown") {
        player2Speed = 6;
    }

    if (e.key == "w") {
        player1Speed = -6;
    } else if (e.key == "s") {
        player1Speed = 6;
    }
}

function keyUpHandler(e) {
    if (e.key == "ArrowUp" || e.key == "ArrowDown") {
        player2Speed = 0;
    }

    if (e.key == "w" || e.key == "s") {
        player1Speed = 0;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function update() {
    moveBall();
    movePaddles();
    draw();
    requestAnimationFrame(update);
}

update();