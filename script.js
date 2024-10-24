const gameBoard = document.getElementById('gameBoard');
const startButton = document.getElementById('startGame');

const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = { x: 1, y: 0 };  // Start moving right by default
let gameInterval;
let gameSpeed = 200;
let isGameRunning = false;
let snakeColor = '#00ff00'; // Initial color for the snake

// Generate random food position
function randomFoodPosition() {
    return {
        x: Math.floor(Math.random() * boardSize) + 1,
        y: Math.floor(Math.random() * boardSize) + 1
    };
}

// Function to generate a random hex color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Create the game board
function createBoard() {
    gameBoard.innerHTML = '';
    // Render the snake
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.backgroundColor = snakeColor; // Use dynamic snake color
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });

    // Render the food
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.backgroundColor = '#ff0000'; // Keep the food color constant
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

// Move the snake based on the current direction
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check collision with walls
    if (head.x < 1 || head.x > boardSize || head.y < 1 || head.y > boardSize || isSnakeCollision(head)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    // Check if the snake eats food
    if (head.x === food.x && head.y === food.y) {
        food = randomFoodPosition();
        snakeColor = getRandomColor(); // Change snake color after eating food
    } else {
        snake.pop(); // Remove the last segment if no food is eaten
    }
}

// Check for collision with snake body
function isSnakeCollision(position) {
    return snake.some(segment => segment.x === position.x && segment.y === position.y);
}

// Game over
function gameOver() {
    clearInterval(gameInterval);
    isGameRunning = false;
    alert('Game Over! Press "Start Game" to play again.');
}

// Update game state and re-render board
function updateGame() {
    moveSnake();
    createBoard();
}

// Control snake direction
function changeDirection(event) {
    const key = event.key;

    if (key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (key === 'ArrowRight' && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
}

// Start the game
function startGame() {
    if (isGameRunning) return;
    isGameRunning = true;
    snake = [{ x: 10, y: 10 }];
    food = randomFoodPosition();
    direction = { x: 1, y: 0 }; // Reset direction (start moving right)
    snakeColor = '#00ff00'; // Reset snake color when the game starts
    gameInterval = setInterval(updateGame, gameSpeed);
}

// Event listeners
window.addEventListener('keydown', changeDirection);
startButton.addEventListener('click', startGame);

// Initial rendering of the board
createBoard();
