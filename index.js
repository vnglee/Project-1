const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let gameOn = false;
let updateId;
let obstacleId;
let explosionId;
let frameCount = 0;
let score = 0;
let obstacles = [];

const road = new Image();
road.src = "./images/roadMap.png";

const potholeObst = new Image();
potholeObst.src = "./images/Pothole.png";

const car = new Image()
car.src = "./images/car.png";

const explosion = new Image()
explosion.src = "./images/explosion.png";


//CLASS CAR=======================================================================================
class Car {
  //class constructor
  constructor() {
    this.x = 385;
    this.y = 530;
    this.width = 55;
    this.height = 61;
    const car = new Image();
    car.addEventListener("load", () => {
      this.car = car;
    });
    car.src = "./images/car.png";
  }
  //classMethods
  moveLeft() {
    if (this.x > 200) {
      this.x -= 10;
    }
  }
  moveRight() {
    if (this.x < canvas.width - 247) {
      this.x += 10;
    }
  }
  moveUp() {
    if (this.y > 0) {
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
    this.x = Math.floor(Math.random() * 400) + 180;
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
  // speed += 1
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(road, 0, 0, 800, 600);
  playerCar.draw();
  if (obstacles.length > 0) {
    for (let i = 0; i < obstacles.length; i++) {
      // console.log('obstacles', obstacles)
      obstacles[i].moveDown();
      obstacles[i].draw();
      carCollision(obstacles[i]);
      if (obstacles[i].y > canvas.height) {
        score += 1
        obstacles.splice(i, 1);
        // console.log('detected')
      }
    }
  }
  gameScore()
}
//GENERATE OBSTACLES FUNCTION===============================================================
function generateObstacles() {
  obstacles.push(new Potholes());
}
//START GAME FUNCTION=======================================================================
function startGame() {
  gameOn = true;
  updateId = setInterval(updateGame, 20);

  obstacleId = setInterval(generateObstacles, 1500);
}
//GAME OVER FUNCTION======================================================
function gameOver() {

  clearInterval(updateId);
  clearInterval(obstacleId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";

  if (score < 5) {
    ctx.fillText("You died", 380, 250);
    ctx.font = "32px Arial";
    ctx.fillText(`Final Score: ${score}`, 300, 300);
  } else {
    ctx.fillText("You win!", 380, 250);
    ctx.font = "32px Arial";
    ctx.fillText(`Final Score: ${score}`, 300, 320);
  }
  obstacles = []
  playerCar.x = 385;
  playerCar.y = 530;
  score = 0;
  gameOn = false;
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
  ctx.fillStyle = 'black'
  ctx.fillRect(48,15,100,35)
  ctx.fillStyle = 'white'
  ctx.font = '20px Arial'
  ctx.fillText(`Score: ${score}`, 60, 40)
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
