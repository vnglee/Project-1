const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let gameOn = false;
let updateId;
let obstacleId;

let score = 0;
let obstacles = [];
let startSpeed = 0;

const road = new Image();
road.src = "./images/map2.png";

const potholeObst = new Image();
potholeObst.src = "./images/newpothole.png";

const car = new Image();
car.src = "./images/car.png";

const bg = new Audio();
bg.src = "./sounds/car_chase.mp3";

// const explodeBg = new Audio();
// explodeBg.src = "./sounds/explosion1.mp3";

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
    this.x = Math.floor(Math.random() * 280) + 300;
    this.y = 0;
    this.width = 10 + Math.floor(Math.random() * 100);
    this.height = 10 + Math.floor(Math.random() * 100);
  }

  //methods

  moveDown() {
    this.y += 1;
  }

  draw() {
    ctx.drawImage(potholeObst, this.x, this.y, this.width, this.height);
  }
}
//================================================

const playerCar = new Car();
// console.log(playerCar)

//UPDATE GAME FUNCTION===================================================================
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(road, 0, 0, 900, 517);
  playerCar.draw();
  bg.play()
  if (obstacles.length > 0) {
    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].moveDown();
      obstacles[i].draw();
      carCollision(obstacles[i]);
      if (obstacles[i].y > canvas.height) {
        score += 1;
        obstacles.splice(i, 1);
      }
    }
  }
  gameScore();
}
//GENERATE OBSTACLES FUNCTION===============================================================
function generateObstacles() {
  obstacles.push(new Potholes());
}
//INCREASE OBSTACLE SPEED FUNCTION================================================
function increaseSpeed() {
  startSpeed = startSpeed + 1;
  // setInterval(updateGame, 20)
}
//START GAME FUNCTION=======================================================================
function startGame() {
  gameOn = true;
  stopExplosionAudio(explodeBg)
  updateId = setInterval(updateGame, 20);

  obstacleId = setInterval(generateObstacles, 1000);
}
//GAME OVER FUNCTION======================================================
function gameOver() {
  explodeBg.play()
  stopGameAudio(bg);
  clearInterval(updateId);
  clearInterval(obstacleId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";

  // if () {
  ctx.fillText("You died!", 370, 250);
  ctx.font = "32px Arial";
  ctx.fillText(`Final Score: ${score}`, 340, 300);
  ctx.fillText("Press the START button to play again", 170, 380);
  // } else {
  //   ctx.fillText("You win!", 380, 250);
  //   ctx.font = "32px Arial";
  //   ctx.fillText(`Final Score: ${score}`, 300, 320);
  // }

  obstacles = [];
  playerCar.x = 440;
  playerCar.y = 450;
  score = 0;
  gameOn = false;
}


function stopGameAudio() {
  bg.pause();
  bg.currentTime = 0;
}

function stopExplosionAudio() {
  explodeBg.pause();
  explodeBg.currentTime = 0;
}
//COLLISION FUNCTION==========================================================
function carCollision(obst) {
  if (
    playerCar.x < obst.x + obst.width &&
    playerCar.x + playerCar.width > obst.x &&
    playerCar.y < obst.y + obst.height &&
    playerCar.y + playerCar.height > obst.y
  ) {
    gameOver();
    // console.log("game over");
  }
}
//SCORE FUNCTION===========================================================
function gameScore() {
  ctx.fillStyle = "black";
  ctx.fillRect(128, 15, 100, 35);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 141, 40);
}

//EXPLOSION ANIMATION====================================================
// const explosion = new Image();
// explosion.src = "./images/explosion.png";

// explosion.addEventListener('load', loadImage, false)
// function loadImage(e) {
//   animate()
// }

// let shift = 0
// let frameWidth = 32
// let frameHeight = 32
// let totalFrames = 6
// let currentFrame = 0

// function animate() {
//   ctx.clearRect(0, 0, 32, 32)

//   ctx.drawImage(explosion, shift, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight)

//   shift += frameWidth + 1

//   if (currentFrame == totalFrames) {
//     shift = 0
//     currentFrame = 0
//   }
//   currentFrame++

//   requestAnimationFrame(animate)

// }


//==============================
explosion.onload = function() {
  init();
};
const scale = 2;
const width = 32;
const height = 32;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(explosion,
                frameX * width, frameY * height, width, height,
                canvasX, canvasY, scaledWidth, scaledHeight);
}

const cycleLoop = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
let currentLoopIndex = 0;
let frameCount = 0;

function step() {
  frameCount++;
  if (frameCount < 15) {
    window.requestAnimationFrame(step);
    return;
  }
  frameCount = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(cycleLoop[currentLoopIndex], 0, 0, 0);
  currentLoopIndex++;
  if (currentLoopIndex >= cycleLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(step);
}

function init() {
  window.requestAnimationFrame(step);
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
