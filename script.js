const clickButton = document.getElementById('click-button');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');

let score = 0;
let timeLeft = 10;
let highScore = localStorage.getItem('highScore') || 0;
let timer;
let gameStarted = false;

highScoreDisplay.textContent = highScore;

clickButton.addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        clickButton.textContent = 'Click Me!';
        timer = setInterval(updateTimer, 1000);
    }

    if (timeLeft > 0) {
        score++;
        scoreDisplay.textContent = score;
    }
});

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
        clearInterval(timer);
        clickButton.disabled = true;
        clickButton.textContent = 'Game Over!';
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = highScore;
            localStorage.setItem('highScore', highScore);
        }
    }
}
