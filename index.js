const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let gameOn = false;
let updateId;
let obstacleId;
let explosionId;
let speedId;
let score = 0;
let obstacles = [];
let startSpeed = 0;
let gamesPlayed = 0;
let currentLoopIndex = 0;
let frameCount = 0;
let animationCount = 0;
let obstacleSpeed = 2000;
let potholeSpeed = 1;

const road = new Image();
road.src = "./images/map2.png";

const potholeObst = new Image();
potholeObst.src = "./images/newpothole.png";

const car = new Image();
car.src = "./images/car.png";

const bg = new Audio();
bg.src = "./sounds/car_chase.mp3";

const explodeBg = new Audio();
explodeBg.src = "./sounds/explosion.ogg";

//CLASS CAR=======================================================================================
class Car {
  //class constructor
  constructor() {
    this.x = 440;
    this.y = 450;
    this.width = 47;
    this.height = 57;
    const car = new Image();
    car.addEventListener("load", () => {
      this.car = car;
    });
    car.src = "./images/car.png";
  }
  //classMethods
  moveLeft() {
    if (this.x > 265) {
      this.x -= 10;
    }
  }
  moveRight() {
    if (this.x < canvas.width - 307) {
      this.x += 10;
    }
  }
  moveUp() {
    if (this.y > 10) {
      this.y -= 10;
    }
  }
  moveDown() {
    if (this.y < canvas.height - 70) {
      this.y += 10;
    }
  }
  draw() {
    ctx.drawImage(this.car, this.x, this.y, this.width, this.height);
  }
}

// CLASS POTHOLES OBSTACLES=======================================================================

class Potholes {
  constructor() {
    this.x = Math.floor(Math.random() * 380) + 230;
    this.y = 0;
    this.width = 10 + Math.floor(Math.random() * 100);
    this.height = 10 + Math.floor(Math.random() * 100);
  }

  //methods

  moveDown() {
    this.y += potholeSpeed;
  }

  draw() {
    ctx.drawImage(potholeObst, this.x, this.y, this.width, this.height);
  }
}
//================================================

const playerCar = new Car();

//UPDATE GAME FUNCTION===================================================================
function updateGame() {
  animationCount++;
  if (animationCount % 500 === 0) {
    obstacleSpeed /= 1.3;
    potholeSpeed *= 1.3;
    clearInterval(obstacleId);
    obstacleId = setInterval(generateObstacles, obstacleSpeed);
    console.log("increasing obstacle speed", obstacleSpeed, potholeSpeed);
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(road, 0, 0, 900, 517);
  playerCar.draw();
  bg.play();
  if (obstacles.length > 0) {
    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].moveDown();
      obstacles[i].draw();
      if (obstacles[i].y > canvas.height) {
        score += 1;
        obstacles.splice(i, 1);
      }
      carCollision(obstacles[i]);
    }
  }
  gameScore();
}
//GENERATE OBSTACLES FUNCTION===============================================================
function generateObstacles() {
  obstacles.push(new Potholes());
}
//START GAME FUNCTION=======================================================================
function startGame() {
  gameOn = true;

  explodeBg.load();
  updateId = setInterval(updateGame, 20);
  obstacleId = setInterval(generateObstacles, 2000);
}
//GAME OVER FUNCTION======================================================
function gameOver() {
  clearInterval(explosionId);
  currentLoopIndex = 0;
  frameCount = 0;
  stopGameAudio();
  stopExplosionAudio();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";

  ctx.fillText("You died!", 370, 250);
  ctx.font = "32px Arial";
  ctx.fillText(`Final Score: ${score}`, 340, 300);
  ctx.fillText("Press the START button to play again", 170, 380);

  obstacles = [];
  playerCar.x = 440;
  playerCar.y = 450;
  score = 0;
  obstacleSpeed = 2000;
  potholeSpeed = 1;
  gameOn = false;
}

//STOP AUDIO FUNCTIONS========================================================
function stopGameAudio() {
  bg.pause();
  bg.currentTime = 0;
}

function stopExplosionAudio() {
  explodeBg.currentTime = 0;
  explodeBg.pause();
}
//COLLISION FUNCTION==========================================================
function carCollision(obst) {
  if (
    playerCar.x < obst.x + obst.width &&
    playerCar.x + playerCar.width > obst.x &&
    playerCar.y < obst.y + obst.height &&
    playerCar.y + playerCar.height > obst.y
  ) {
    clearInterval(updateId);
    clearInterval(obstacleId);
    bg.pause();
    bg.currentTime = 0;
    explodeBg.play();
    explosionId = setInterval(() => {
      step(playerCar.x, playerCar.y);
    }, 160);
  }
}
//SCORE FUNCTION===========================================================
function gameScore() {
  ctx.fillStyle = "black";
  ctx.fillRect(118, 15, 120, 35);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 136, 40);
}

//EXPLOSION ANIMATION====================================================
const explosion = new Image();
explosion.src = "./images/explosion.png";
//==============================
const scale = 2;
const width = 32;
const height = 32;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(
    explosion,
    frameX * width,
    frameY * height,
    width,
    height,
    canvasX,
    canvasY,
    scaledWidth,
    scaledHeight
  );
}

const cycleLoop = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];

function step(x, y) {
  frameCount++;
  if (frameCount < 12) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawFrame(cycleLoop[currentLoopIndex], 0, x, y);
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
      currentLoopIndex = 0;
    }
  } else {
    gameOver();
  }
}

//EVENT LISTENER==========================================================
document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 37:
      playerCar.moveLeft();
      break;
    case 39:
      playerCar.moveRight();
      break;
    case 38:
      playerCar.moveUp();
      break;
    case 40:
      playerCar.moveDown();
  }
});

window.onload = () => {
  document.getElementById("btn").onclick = () => {
    if (!gameOn) {
      startGame();
    }
  };
};
