const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const playAgainButton = document.getElementById('play-again');
const boardSize = 20;
const cellSize = 20;

let snake = [
    { x: 10, y: 10 }
];
let food = getRandomFood();
let direction = { x: 0, y: 0 };
let gameOver = false;
let score = 0;

function drawBoard() {
    board.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (isSnake(i, j)) {
                cell.classList.add('snake');
            } else if (i === food.y && j === food.x) {
                cell.classList.add('food');
            }
            board.appendChild(cell);
        }
    }
}

function isSnake(row, col) {
    return snake.some(segment => segment.x === col && segment.y === row);
}

function getRandomFood() {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);
    if (isSnake(y, x)) {
        return getRandomFood();
    }
    return { x, y };
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = getRandomFood();
        score += 10;
        updateScore();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
        gameOver = true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
        }
    }
}

function gameLoop() {
    if (!gameOver) {
        moveSnake();
        checkCollision();
        drawBoard();
        setTimeout(gameLoop, 100);
    } else {
        playAgainButton.disabled = false;
    }
}

function startGame() {
    snake = [{ x: 10, y: 10 }];
    food = getRandomFood();
    direction = { x: 0, y: 0 };
    gameOver = false;
    score = 0;
    updateScore();
    gameLoop();
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y !== 1) {
                direction = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
            if (direction.y !== -1) {
                direction = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
            if (direction.x !== 1) {
                direction = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (direction.x !== -1) {
                direction = { x: 1, y: 0 };
            }
            break;
    }
});

playAgainButton.addEventListener('click', startGame);

startGame();