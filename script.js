const clickButton = document.getElementById('click-button');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset-button');
const usernameInput = document.getElementById('username-input');
const saveUsernameButton = document.getElementById('save-username-button');
const highscoreTableBody = document.querySelector('#highscore-table tbody');

let score = 0;
let timeLeft = 10;
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
let username = localStorage.getItem('username') || 'Player';
let timer;
let gameStarted = false;

usernameInput.value = username;

function saveUsername() {
    username = usernameInput.value;
    localStorage.setItem('username', username);
    alert('Username saved!');
}

function renderHighScores() {
    highscoreTableBody.innerHTML = '';
    highScores.forEach((score, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.username}</td>
            <td>${score.score}</td>
        `;
        highscoreTableBody.appendChild(row);
    });
}

function resetGame() {
    score = 0;
    timeLeft = 10;
    gameStarted = false;
    clearInterval(timer);
    clickButton.disabled = false;
    clickButton.textContent = '🚀';
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
}

clickButton.addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        timer = setInterval(updateTimer, 1000);
    }

    if (timeLeft > 0) {
        score++;
        scoreDisplay.textContent = score;
    }
});

resetButton.addEventListener('click', resetGame);
saveUsernameButton.addEventListener('click', saveUsername);

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
        clearInterval(timer);
        clickButton.disabled = true;
        clickButton.textContent = 'Game Over!';
        checkHighScore();
    }
}

function checkHighScore() {
    const newScore = { username, score };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5); // Keep only top 5
    localStorage.setItem('highScores', JSON.stringify(highScores));
    renderHighScores();
}

// Initial setup
renderHighScores();
resetGame();
