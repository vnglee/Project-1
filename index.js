const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let updateId
let obstacleId

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
  constructor(){
    this.x = Math.floor(Math.random() * 500);
    this.y = 0;
    this.width = 50;
    this.height = 50;
  }

  //methods

  // moveDown() {
  //   console.log('this string moving down')
  //   this.y += 1;
  // }
  
  draw(){
    console.log('this is line 71')
    ctx.drawImage(potholeObst, this.x, this.y, this.width, this.height);
  }


}
//================================================
//const gameObstacle = new Potholes();
const playerCar = new Car();


//UPDATE GAME===================================================================
// function updateGame() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.drawImage(road, 0, 0, 800, 600);
//   playerCar.draw();
//   for (let i = 0; i < obstacles.length; i++) {
//     obstacles[i].update();
//     obstacles[i].draw();
//   }
// }

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(road, 0, 0, 800, 600);
  playerCar.draw();
  // ctx.drawImage(potholeObst, 0, 0, 80, 50)
  // gameObstacle.draw()
  if (obstacles.length > 0) {
    for (let i = 0; i < obstacles.length; i++) {
      // console.log('obstacles', obstacles)
      // obstacles.moveDown();
      obstacles.draw();
    }
  }
  
}
//START GAME FUNCTION=======================================================================

function startGame() {
  ctx.drawImage(road, 0, 0, 800, 600);
  playerCar.draw();

  updateId = setInterval(() => {
    speed += 1;
    updateGame();
  }, 20);

  obstacleId = setInterval(() => {
    obstacles.push(new Potholes());
  }, 1000);

}

//GAME OVER FUNCTION=======================================================================
//COLLISION FUNCTION=======================================================================
//SCORE FUNCTION=======================================================================

//EVENT LISTENER=======================================================================
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
  updateGame();
});

window.onload = () => {
  document.getElementById("btn").onclick = () => {
    startGame();
  };
};
