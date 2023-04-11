const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


let speed = 0;
let obstacles = [];


const road = new Image();
road.src = "./images/roadMap.png";

const potholeObst = new Image();
potholeObst.src = "./images/Pothole.png";

//CLASS CAR=======================================================================================
class Car {
  //class constructor
  constructor() {
    this.x = 385;
    this.y = 530;
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
    ctx.drawImage(this.car, this.x, this.y, 60, 66);
  }
}

// CLASS POTHOLES OBSTACLES=======================================================================

class Potholes {
  constructor() {
    this.x = Math.floor(Math.random() * 500);
    this.y = 0;
    this.width = 0;
    this.height = 20;
  }

  //methods

  moveDown() {
    this.y += 1;
  }
  
  draw() {
    ctx.drawImage(potholeObst, this.x, this.y);
  }


}

const gameObstacle = new Potholes();
const playerCar = new Car();
//FUNCTIONS=======================================================================

function startGame() {
  ctx.drawImage(road, 0, 0, 800, 600);
  playerCar.draw();

  setInterval(() => {
    speed += 1;
    updateCanvas();
  }, 20);

  setInterval(() => {
    obstacles.push(new Potholes());
  }, 1000);


}
//===================================================================
function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(road, 0, 0, 800, 600);
  playerCar.draw();
  for (let i = 0; i < obstacles.length; i++) {
    // obstacles[i].update();
    // obstacles[i].moveDown()
  }
}

//===================================================================
function newObstacles() {
  obstacles.push(new Potholes());
}

//event listeners=======================================================================
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
  updateCanvas();
});

window.onload = () => {
  document.getElementById("btn").onclick = () => {
    startGame();
  };
};
