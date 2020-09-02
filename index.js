const grid 			 = document.querySelector('.grid')
const scoreDisplay 	 = document.getElementById('score')
const startButton    = document.getElementById('start')
const overlay        = document.getElementById('overlay')
const modal          = document.getElementById('modal')
const modalContainer = document.querySelector('.modal')
let timerId = 0
let squares = []
let snake = []
let appleIndex = 0
const width = 20
const height = 20
let direction = 1
let timeInterval = 400
let score = 0
const speed = 0.9

function check(){
	overlay.style.display = 'none'
	startGame()
}

modal.addEventListener('click',check)

function createGrid(){
	for(let i = 0;i < width*height; i++){
		const square = document.createElement('div')
		square.classList.add('square')	
		grid.appendChild(square)
		squares.push(square)
	}
}
createGrid()


 function startGame() {
    //remove the snake
    snake.forEach(index => squares[index].classList.remove('snake'))
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    timeInterval = 400
    clearInterval(timerId)
    snake = [2,1,0]
    snake.forEach(index => squares[index].classList.add('snake'))
    score = 0
    //re add new score to browser
    scoreDisplay.textContent = score
    direction = 1
    appleGenerator()
    //readd the class of snake to our new currentSnake
    
    timerId = setInterval(move,timeInterval)
}
		



function move(){
		
		 if (snake[0] + width >= width*height && direction === width ||
			 snake[0] - width < 0 && direction === -width || 
			 snake[0] % width === 0 && direction === -1 ||
		     squares[snake[0] + direction].classList.contains('snake')||
		     snake[0] == (width*height)-1 && direction === 1||
		     snake[0] == 0 && direction === -1){
            {
				overlay.style.display = "block"
				modalContainer.classList.add('animate')
        			return clearInterval(timerId)
            }

    		}
    	/* else if(snake[0] == (width*width)-1 && direction === 1){
    	 	   window.alert("game not over")
    	 	   snake.unshift(0)
    	 }
    	 else if(snake[0] == 0 && direction === -1){
    	 		window.alert("game not over")
    	 	   snake.unshift((width*width)-1)
    	 }*/
	     else{
        	snake.unshift(snake[0] + direction)
         }

    	squares[snake[0]].classList.add('snake')
    	const tail = snake.pop()
		squares[tail].classList.remove('snake')
    	if (squares[snake[0]].classList.contains('apple')) {
                squares[snake[0]].classList.remove('apple')
				squares[tail].classList.add('snake')
           		snake.push(tail)
   	    		appleGenerator()
	       		score++
        		scoreDisplay.textContent = score
        		clearInterval(timerId)
        		timeInterval = timeInterval * speed
        		timerId = setInterval(move,timeInterval)
   	}
}

function nextDirection(e){
     if(e.keyCode===37){
         direction = -1
     }
     else if(e.keyCode===38){
         direction = -width
     }
     else if(e.keyCode===39){
         direction = 1 
     }
     else if(e.keyCode===40){
         direction = width
     }
     else
     	 direction = 0
}
document.addEventListener('keyup',nextDirection)

function appleGenerator(){
	do{
        appleIndex = Math.floor(Math.random() * width*height) 

	}while(squares[appleIndex].classList.contains('snake'))
	squares[appleIndex].classList.add('apple')
}

startButton.addEventListener('click',startGame)
