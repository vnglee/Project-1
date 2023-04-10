const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let animationId
let obstacleId
let obstacles = []
const road = new Image();
road.src = "./images/roadMap.png";

const potholeObst = new Image();
potholeObst.src = "./images/Pothole.png"


//CLASSES================
class Car {
  //class constructor
  constructor() {
    this.x = 385;
    this.y = 510;
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
    if (this.y < canvas.height - 100) {
      this.y += 10;
    }
  }
  draw() {
    ctx.drawImage(this.car, this.x, this.y, 60, 66);
  }
}

// CLASS POTHOLES OBSTACLES


class Potholes {
    constructor() {
      this.x = Math.floor(Math.random() * 600);
      this.y = 0;
      this.width = Math.floor(Math.random() * 100);
      this.height = 20;
  
    }
    update() {
        this.y +=1
    }
    //methods
    draw() {
      ctx.drawImage(potholeObst, this.x, this.y)
    }
  
    // moveDown() {
    //   this.y +=1;
    // }
  
}

const gameObstacle = new Potholes()
const playerCar = new Car()
//FUNCTIONS=====================

function startGame() {

  ctx.drawImage(road, 0, 0, 800, 600);
  playerCar.draw();

  setInterval(()=>{
      speed += 1;
      updateCanvas();
    }, 20)

    setInterval(()=>{
        obstacles.push(new Potholes) 
      },1000)
// animationId = setInterval(animationLoop, 16)
// obstacleId = setInterval(()=> {
//   obstacles.push(new Potholes())
// }, 2000)
}


function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(road, 0, 0, 800, 600);
  playerCar.draw();
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].update();
    obstacles[i].moveDown();
  }
}

function animationLoop() {

    ctx.clearRect(0, 0, 800, 600)
    ctx.drawImage(road, 0, 0, 800, 600)
    playerCar.draw()
  
    
    obstacles.forEach((obstacle, i, arr) => {
      checkCollision(obstacle)
      obstacle.y += 1
      if (obstacle.y > canvas.height) {
        score += 1
        arr.splice(i, 1)
      }
      obstacle.draw()
    })
    showScore()
    
    if (score > 1) {
      gameOver()
    }
  }

function newObstacles () {
  
    obstacles.push(new Potholes())
    
  }

//   event listeners
document.addEventListener('keydown', e => {
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
  updateCanvas();
})

window.onload = () => {
  document.getElementById("btn").onclick = () => {
    startGame();
  };
}
