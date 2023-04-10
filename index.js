const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// let gameOn = false
// let animationId
let obstacles = []



const road = new Image();
road.src = "./images/roadMap.png";

const potholeObst = new Image();
potholeObst.src = "./images/Pothole.png"

// const car = new Image()
// car.src = '.images/car.png'

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
    if (this.x > 10) {
      this.x -= 10;
    }
  }
  moveRight() {
    if (this.x < canvas.width - 50) {
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
      this.x = Math.random() * canvas.width;
      this.y = 0;
      this.width = Math.floor(Math.random() * 100);
      this.height = 20;
  
    }
    //methods
    draw() {
      ctx.drawImage(potholeObst, this.x, this.y)
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
  //   moveDown() {
  //     this.y +=1;
  //   }
  

// const player = {
//     x: canvas.width,
//     y: canvas.height,
//     width: 50,
//     height: 100,
//     draw() {
//         ctx.drawImage(playerCar, this.x, this.y, this.width, this.height)
//     }
// }


const playerCar = new Car()
//FUNCTIONS=====================
function startGame() {
  // if (!gameOn) {
  ctx.drawImage(road, 0, 0, 800, 600);
  playerCar.draw();

  // setInterval(()=>{
  //     //iterate through array of rectangles and update y positions
  //     speed += 1;
  //     updateCanvas();
  //   }, 20)
  //  // animationId = setInterval(animationLoop, 16)
  // //   obstacleId = setInterval(()=> {
  // //     obstaclesArr.push(new Obstacle())
  // //   }, 2000)
  // //   gameOn = true
  //   console.log("starting...")
  // // }
}

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(road, 0, 0, 800, 600);
  playerCar.draw();
  for (let i = 0; i < rectangles.length; i++) {
    rectangles[i].update();
    rectangles[i].moveDown();
  }


  
}


function generateObstacles () {
  
    obstacles.push(new Obstacle())
    
  }
// function updateCanvas() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(road, 0, 0, 800, 500);
//     playerCar.draw();
// }

// function animationLoop() {

//     ctx.clearRect(0, 0, 800, 500)
//     ctx.drawImage(road, 0, 0, 800, 500)
//     player.draw()
// }
window.onload = () => {
  document.getElementById("btn").onclick = () => {
    startGame();
  };
}
//   event listeners
  document.addEventListener("keydown", (event) => {
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
  })