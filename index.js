const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const road = new Image()
road.src = '.images/roadmap.png'

const car = new Image()
car.src = '.images/car.png'

const player = {
    x: canvas.width, 
    y: canvas.height,
    width: 50,
    height: 100,
    draw() {
        ctx.drawImage(car, this.x, this.y, this.width, this.height)
    }
}


//FUNCTIONS=====================
function startGame() {
  
    if (!gameOn) {
      
      animationId = setInterval(animationLoop, 16)
    //   obstacleId = setInterval(()=> {
    //     obstaclesArr.push(new Obstacle())
    //   }, 2000)
      gameOn = true
      console.log("starting...")
    }
  
}

function animationLoop() {

    ctx.clearRect(0, 0, 1200, 1500)
    ctx.drawImage(road, 0, 0, 1200, 1500)
    player.draw()
}
window.onload = () => {
    document.getElementById('btn').onclick = () => {

        // let container = document.getElementById('game-road')
        // container.style.visibility = 'visible'
        // container.style.height = '600px'
    
        // let gameBoard = document.getElementById('canvas')
        // gameBoard.height = '1500'
        // gameBoard.width = '1200'
        
        
      startGame();
    }

    document.addEventListener('keydown', ((e) => {
        switch(e.keyCode){
          case 38: // up arrow
          player.y -= 5;
          break;
        case 40: // down arrow
          player.y += 5;
          break;
        case 37: // left arrow
          if(player.x <= 0) {
            player.x += 10
          }
          player.x -= 5;
          break;
        case 39: // right arrow
        if(player.x >= canvas.width - 50) {
          player.x -= 10
        }
          player.x += 5;
          break;
        }
      }))
}