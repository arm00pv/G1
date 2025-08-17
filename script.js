const clickButton = document.getElementById('click-button');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset-button');
const usernameInput = document.getElementById('username-input');
const saveUsernameButton = document.getElementById('save-username-button');
const highscoreTableBody = document.querySelector('#highscore-table-daily tbody');
const registerButton = document.getElementById('register-button');
const registerModal = document.getElementById('register-modal');
const closeButton = document.querySelector('#register-modal .close-button');
const registerForm = document.getElementById('register-form');
const changeEmojiButton = document.getElementById('change-emoji-button');
const emojiModal = document.getElementById('emoji-modal');
const emojiSelection = document.getElementById('emoji-selection');
const emojiModalCloseButton = document.querySelector('#emoji-modal .close-button');
const tabsContainer = document.querySelector('.tabs');

let score = 0;
let timeLeft = 10;
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
let username = localStorage.getItem('username') || 'Player';
let selectedEmoji = '🚀';
let timer;
let gameStarted = false;

usernameInput.value = username;

function saveUsername() {
    username = usernameInput.value;
    localStorage.setItem('username', username);
    alert('Username saved!');
}

function renderHighScores() {
    // This function will need to be updated to handle different tabs
    // For now, it will render to the daily tab
    const dailyTableBody = document.querySelector('#highscore-table-daily tbody');
    dailyTableBody.innerHTML = '';
    highScores.forEach((score, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.username}</td>
            <td>${score.score}</td>
        `;
        dailyTableBody.appendChild(row);
    });
}

function resetGame() {
    score = 0;
    timeLeft = 10;
    gameStarted = false;
    clearInterval(timer);
    clickButton.disabled = false;
    clickButton.textContent = selectedEmoji;
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

// Register Modal functionality
registerButton.addEventListener('click', () => {
    registerModal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    registerModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == registerModal) {
        registerModal.style.display = 'none';
    }
    if (event.target == emojiModal) {
        emojiModal.style.display = 'none';
    }
});

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Registration functionality is not yet implemented.');
    registerModal.style.display = 'none';
});

// Emoji Modal functionality
changeEmojiButton.addEventListener('click', () => {
    emojiModal.style.display = 'block';
});

emojiModalCloseButton.addEventListener('click', () => {
    emojiModal.style.display = 'none';
});

emojiSelection.addEventListener('click', (event) => {
    if (event.target.classList.contains('emoji')) {
        selectedEmoji = event.target.textContent;
        clickButton.textContent = selectedEmoji;
        document.querySelectorAll('.emoji').forEach(emoji => emoji.classList.remove('selected'));
        event.target.classList.add('selected');
        emojiModal.style.display = 'none';
    }
});

// Tabs functionality
tabsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('tab-button')) {
        const tab = event.target.dataset.tab;
        document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
        event.target.classList.add('active');
        document.querySelectorAll('.tab-pane').forEach(pane => {
            if (pane.id === tab) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    }
});

// Initial setup
renderHighScores();
resetGame();
