
let canvasWidth = 400;
let canvasHeight = 600;
let ballXPos = canvasWidth / 2;
let ballYPos = canvasHeight - 100;
let ballXSpeed = 5;
let ballYSpeed = 5;
let paddleWidth = 100;
let paddleXPos = (canvasWidth - paddleWidth)/2;
let paddleYPos = canvasHeight - 50;
let lives = 3;
let bricks = [];
let brick;
let numOfRows = 10;
let bricksPerRow = 10;
let brickWidth = canvasWidth / bricksPerRow;
let colors;
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(0);
  colors = createColors();
  bricks = createBricks();
}


function draw() 
{
    gameOver();
    background(0);  //reset background so old ellipse doesnt show up
    fill(255);
    ellipse(ballXPos, ballYPos, 20,20);
    rect(paddleXPos, paddleYPos, paddleWidth, 10);

    bounceOffWalls(); 
    movePaddle();   
    ballCollidesWithPaddle();
    moveBall();
    respawn();
    ballCollidesWithBrick();
}

function moveBall(){
    ballYPos += ballYSpeed;
    ballXPos += ballXSpeed;
}


function movePaddle() 
{
  if (keyIsDown(LEFT_ARROW)) 
  {
    if(paddleXPos >= 0)
    {
      paddleXPos -= 10;
    }
  }
  else if (keyIsDown(RIGHT_ARROW)) 
  {
    //paddleXPos is the top left of the rectangle, so if you want to check the collision with the right side you need to add the width of the paddle so you get the right side edge. 
    if(paddleXPos + paddleWidth <= canvasWidth)  
    {
      paddleXPos += 10;
    }
  }
}


function bounceOffWalls()
{
    if(ballYPos <= 0 || ballYPos >= canvasHeight) //crossed the top of the canvas
    {
      ballYSpeed *= -1;   //swap y direction
    }
    else if(ballXPos <= 0 || ballXPos >= canvasWidth)
    {
      ballXSpeed *= -1;      
    }

}    


function ballCollidesWithPaddle(){ 
  
  if(ballYPos === paddleYPos && (ballXPos <=  paddleXPos + paddleWidth && ballXPos >=paddleXPos)){
    
    ballYSpeed *= -1;
  }
}

function ballCollidesWithBrick(){
  for(let i = bricks.length -1; i >=0; i--){
    brick = bricks[i];
    if(brick.colliding(ballXPos,ballYPos)){
      console.log("collision");
      bricks.splice(i,1);
      ballXSpeed *= -1
      ballYSpeed *= -1;
    }else{
      brick.display();
    }
  }
}

function respawn(){
  if(ballYPos > paddleYPos)
  {
    ballXPos = canvasWidth / 2;
    ballYPos = canvasHeight - 100;
    ballXSpeed = 5;
    ballYSpeed = 5;
    paddleXPos = (canvasWidth - paddleWidth)/2;
    paddleYPos = canvasHeight - 50;
    lives--;
    console.log(lives, "Lives Remaining");
  }
  
}

function gameOver(){
  if(lives <= 0){
    text('Game Over' , 0, 0);
    ballXSpeed = 0;
    ballYSpeed = 0;
  };
}


function createBricks(){
  for(let i = 0; i < numOfRows; i++){
    for(let j  = 0; j < bricksPerRow; j++){
      brick = new Brick(brickWidth * j, 25 * i, 40,25, colors[floor(random(0,colors.length))]);
      bricks.push(brick);
    }
  } 
  return bricks;
}

function createColors() {
  const colors = [];
  colors.push(color(265, 165, 0))
  colors.push(color(135, 206, 250))
  colors.push(color(147, 112, 219))
  for (let i = 0; i < 10; i++) {
    colors.push(color(random(0, 255), random(0, 255), random(0, 255)))
  }
  return colors;
}
