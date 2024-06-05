let tileSize = 25;
let numRows = 21;
let numCols = 21;
let Game_Floor;
let drawContext;

let playerX = tileSize * 5;
let playerY = tileSize * 5;

let velocityY = 0;
let velocityX = 0;

let playerBody = [];

let foodPosX;
let foodPosY;

let isGameOver = false;

window.onload = function () {
    Game_Floor = document.getElementById("Game_Floor");
    Game_Floor.height = numRows * tileSize;
    Game_Floor.width = numCols * tileSize;
    drawContext = Game_Floor.getContext("2d");

    generateFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(updateGame, 320 / 2);
}

function updateGame() {
    if (isGameOver) {
        return;
    }

    drawContext.fillStyle = "#00ff99";
    drawContext.fillRect(0, 0, Game_Floor.width, Game_Floor.height);

    drawContext.fillStyle = "#999900";
    drawContext.fillRect(foodPosX, foodPosY, tileSize, tileSize);

    if (playerX == foodPosX && playerY == foodPosY) {
        playerBody.push([foodPosX, foodPosY]);
        generateFood();
    }

    for (let i = playerBody.length - 1; i > 0; i--) {
        playerBody[i] = playerBody[i - 1];
    }
    if (playerBody.length) {
        playerBody[0] = [playerX, playerY];
    }

    drawContext.fillStyle = "white";
    playerX += velocityX * tileSize;
    playerY += velocityY * tileSize;
    drawContext.fillRect(playerX, playerY, tileSize, tileSize);
    for (let i = 0; i < playerBody.length; i++) {
        drawContext.fillRect(playerBody[i][0], playerBody[i][1], tileSize, tileSize);
    }

    if (playerX < 0 || playerX >= numCols * tileSize || playerY < 0 || playerY >= numRows * tileSize) {
        isGameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < playerBody.length; i++) {
        if (playerX == playerBody[i][0] && playerY == playerBody[i][1]) 
        {
            isGameOver = true;
            alert("Game Over");
        }
    }
}

function handlekeyUp(e){
    if(isGameOver && (e.code == "KeyR" || e.code == "Escape"))
    {
        restartGame();
    } else {
        changeDirection(e);
    }
}

function changeDirection(e) {
    if ((e.code == "ArrowUp" || e.code == "KeyW") && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if ((e.code == "ArrowDown" || e.code == "KeyS") && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if ((e.code == "ArrowLeft" || e.code == "KeyA") && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if ((e.code == "ArrowRight" || e.code == "KeyD") && velocityX != -1) {
        velocityY = 0;
        velocityX = 1;
    }
}

function restartGame() {
    playerX = tileSize * 5;
    playerY = tileSize * 5;
    velocityY = 0;
    velocityX = 0;
    playerBody = [];
    isGameOver = false;
    generateFood();
}

function generateFood() {
    foodPosX = Math.floor(Math.random() * numCols) * tileSize;
    foodPosY = Math.floor(Math.random() * numRows) * tileSize;
}