const canvas =  document.getElementById("game");
const ctx = canvas.getContext('2d');

//tracking parts to ensure that the snake grows on the tails
class snakePart{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
let speed=7;//The interval will be seven times a second.   

//defining the snake
let tileCount=20;
let tileSize= canvas.clientWidth/tileCount-2;
let headX=10;
let headY=10;

//snake parts array
const snakeParts=[];
let snakeSize = 2;

//initializing the snake speed
let xVelocity=0;
let yVelocity = 0;

//set score
let score = 0;

//adding the food
let appleX = 5;
let appleY = 5;

//adding a event listener to the snake
document.body.addEventListener('keydown', keyDown);

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}


function drawGame(){
    changeSnakePosition();
   
    let result = TheGameOver();
    if(result){
        return;
    }

    clearScreen();
    drawSnake();
    drawApple();

    checkCollision();
    drawScore();
    // setTimeout(drawGame, 1000/speed);
}

function TheGameOver(){
    let gameOver = false;


    if(yVelocity === 0 && xVelocity=== 0){
        return false;
    }
    if(headX<0){
        gameOver = true;
    }
    else if(headX === tileCount){
        gameOver = true
    }
    else if(headY<0){
        gameOver = true
    }
    else if(headY === tileCount){
        gameOver = true
    }

    for(let i=0; i<snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break
        }      
    }

    if(gameOver == true){
        ctx.fillStyle="white";
        ctx.font="50px verdana";
        ctx.fillText("Game Over!", canvas.clientWidth/6.5, canvas.clientHeight/2)
    }
    return gameOver;


}


//setting the score
function drawScore(){
    ctx.fillStyle="white"
    ctx.font="10px verdena"
    ctx.fillText("Score: " +score, canvas.clientWidth-50,10);

    }


function checkCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random()*tileCount);
        appleY = Math.floor(Math.random()*tileCount);
        snakeSize++;
        console.log(snakeSize)
        console.log(snakeParts)
        score++;
    }
}

function drawSnake(){
    // ctx.fillStyle = "orange";
    // ctx.fillRect(headX* tileCount, headY* tileCount, tileSize, tileSize)
    ctx.fillStyle="green";
    for(let i=0; i<snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x *tileCount, part.y *tileCount, tileSize,tileSize)
    }
    snakeParts.push(new snakePart(headX, headY));
    if(snakeParts.length>snakeSize){
        snakeParts.shift()
    }
    ctx.fillStyle="orange";
    ctx.fillRect(headX* tileCount,headY* tileCount, tileSize,tileSize)
}


function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize);
}


function clearScreen() {
    ctx.fillStyle= 'black'
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight)
}


function keyDown(event){
    
        //up movement
        if(event.keyCode === 38){
            if(yVelocity == 1)
            return;
            yVelocity = -1;
            xVelocity = 0;
        }
        
        //down movement
        if(event.keyCode === 40){
            if(yVelocity == -1)
            return;
            yVelocity = 1;
            xVelocity = 0;
        }

        //left movement
        if(event.keyCode === 37){
            if(xVelocity == 1)
            return;
            yVelocity = 0;
            xVelocity = -1;
        }
        
        //right movement
        if(event.keyCode === 39){
            if(xVelocity == -1)
            return;
            yVelocity = 0;
            xVelocity = 1;
        }
    }






drawGame();