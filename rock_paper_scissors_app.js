// rock_paper_scissors_app.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const messageEl = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

const choices = document.querySelectorAll('.choices button');

// Game state
let playerScore = 0;
let computerScore = 0;
let lastPlayerChoice = null;
let lastComputerChoice = null;
let lastResult = '';

// Emojis for choices
const icons = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

const choicesArray = ['rock', 'paper', 'scissors'];

// -----------------------------
// Canvas drawing functions
// -----------------------------
function clearCanvas() {
    ctx.fillStyle = '#000814';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawCenteredText(text, y, fontSize = 28, color = '#e0e0ff') {
    ctx.font = `${fontSize}px system-ui, sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, y);
}

function drawChoice(choice, x, y, size = 120, color = '#60a5fa') {
    ctx.font = `${size}px system-ui, sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icons[choice], x, y);
}

function drawGame() {
    clearCanvas();

    // Title / instruction if no round played yet
    if (!lastResult) {
        drawCenteredText("Choose your move!", canvas.height / 2 - 20, 36, '#a78bfa');
        return;
    }

    // Show choices side by side
    drawCenteredText('You', canvas.height / 4, 28, '#60a5fa');
    drawChoice(lastPlayerChoice, canvas.width / 4, canvas.height / 2, 100);

    drawCenteredText('VS', canvas.height / 2, 48, '#f87171');

    drawCenteredText('Computer', (canvas.height / 4) * 3, 28, '#60a5fa');
    drawChoice(lastComputerChoice, (canvas.width / 4) * 3, canvas.height / 2, 100);

    // Result message at bottom
    let resultColor = '#c4b5fd';
    if (lastResult.includes('You win')) resultColor = '#34d399';
    if (lastResult.includes('Computer wins')) resultColor = '#f87171';

    drawCenteredText(lastResult, canvas.height - 60, 32, resultColor);
}

// -----------------------------
// Game logic
// -----------------------------
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choicesArray[randomIndex];
}

function determineWinner(player, computer) {
    if (player === computer) return "It's a tie!";

    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        playerScore++;
        playerScoreEl.textContent = playerScore;
        return "You win! 🎉";
    } else {
        computerScore++;
        computerScoreEl.textContent = computerScore;
        return "Computer wins 😢";
    }
}

function playRound(playerChoice) {
    const computerChoice = getComputerChoice();

    lastPlayerChoice = playerChoice;
    lastComputerChoice = computerChoice;
    lastResult = determineWinner(playerChoice, computerChoice);

    messageEl.textContent = lastResult;
    drawGame();
}

// -----------------------------
// Event listeners
// -----------------------------
choices.forEach(button => {
    button.addEventListener('click', () => {
        const choice = button.getAttribute('data-choice');
        playRound(choice);
    });
});

resetBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    messageEl.textContent = 'Click a choice to play!';

    lastPlayerChoice = null;
    lastComputerChoice = null;
    lastResult = '';

    drawGame();
});

// Initial draw
drawGame();