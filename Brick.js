class Brick {
  constructor(brickXPos, brickYPos, width, height, color){
    this.brickXPos = brickXPos;
    this.brickYPos = brickYPos;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  display()
  {
    fill(this.color);
    rect(this.brickXPos, this.brickYPos, this.width, this.height);
  }

  colliding(ballPosX, ballPosY)
  {
    if(ballPosY - 10 <= this.brickYPos + this.height 
    && ballPosY + 10 >= this.brickYPos 
    && ballPosX + 10 >= this.brickXPos
    && ballPosX - 10 <= this.brickXPos + this.width)
    {
      return true;
    }

  }

}