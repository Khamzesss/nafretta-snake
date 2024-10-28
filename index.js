let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let scoreDisplay = document.getElementById("score");
let recordDisplay = document.getElementById("record");

let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let direction = "right";
let score = 0;
let record = localStorage.getItem("record") || 0;

function drawSnake() {
ctx.fillStyle = "green";
snake.forEach(segment => {
ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
});
}

function drawFood() {
ctx.fillStyle = "red";
ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

function moveSnake() {
let head = {x: snake[0].x, y: snake[0].y};
if (direction === "right") head.x++;
if (direction === "left") head.x--;
if (direction === "up") head.y--;
if (direction === "down") head.y++;

snake.unshift(head);

if (head.x === food.x && head.y === food.y) {
score++;
scoreDisplay.textContent = `Очки: ${score}`;
if (score > record) {
record = score;
recordDisplay.textContent = `Рекорд: ${record}`;
localStorage.setItem("record", record);
}
food.x = Math.floor(Math.random() * 20);
food.y = Math.floor(Math.random() * 20);
} else {
snake.pop();
}
}

function checkCollision() {
let head = snake[0];
if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
gameOver();
}
if (snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
gameOver();
}
}

function gameOver() {
snake = [{x: 10, y: 10}];
direction = "right";
score = 0;
scoreDisplay.textContent = `Очки: ${score}`;
}

function gameLoop() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawSnake();
drawFood();
moveSnake();
checkCollision();
setTimeout(gameLoop, 100);
}

document.addEventListener("keydown", event => {
if (event.key === "ArrowRight" && direction !== "left") {
direction = "right";
}
if (event.key === "ArrowLeft" && direction !== "right") {
direction = "left";
}
if (event.key === "ArrowUp" && direction !== "down") {
direction = "up";
}
if (event.key === "ArrowDown" && direction !== "up") {
direction = "down";
}
});

document.getElementById("upButton").addEventListener("click", () => {
if (direction !== "down") {
direction = "up";
}
});

document.getElementById("downButton").addEventListener("click", () => {
if (direction !== "up") {
direction = "down";
}
});

document.getElementById("leftButton").addEventListener("click", () => {
if (direction !== "right") {
direction = "left";
}
});

document.getElementById("rightButton").addEventListener("click", () => {
if (direction !== "left") {
direction = "right";
}
});

gameLoop();