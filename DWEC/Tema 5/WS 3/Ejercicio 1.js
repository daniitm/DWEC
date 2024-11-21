let interval;
let seconds = 0;
let isRunning = false;

const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const remainingSeconds = sec % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function startTimer() {
    interval = setInterval(() => {
        seconds++;
        timeDisplay.textContent = formatTime(seconds);
    }, 1000);
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTimer();
        isRunning = true;
        pauseBtn.disabled = false;
    }
});

pauseBtn.addEventListener('click', () => {
    clearInterval(interval);
    isRunning = false;
    pauseBtn.disabled = true;
});

resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    isRunning = false;
    seconds = 0;
    timeDisplay.textContent = '00:00';
    pauseBtn.disabled = true;
});