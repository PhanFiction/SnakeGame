import Snake from "./snake.js";
let snake;
let rez = 30;
new p5(function(p5)
{
  p5.setup = function()
  {
    p5.createCanvas(900, 600);
    p5.frameRate(5)
    snake = new Snake(p5);
    snake.foodLocation()
  }

  p5.draw = function()
  {
    p5.background(51);
    snake.update();
    snake.show();
    if(snake.eat())
    {
      snake.foodLocation();
      snake.grow();
    }

    if(snake.gameOver())
    {
      p5.background(255, 0, 0);
    }
  }

  p5.keyPressed = function()
  {
    if(p5.keyCode === p5.UP_ARROW)
    {
      snake.dir(0,-rez);
    }else if(p5.keyCode === p5.DOWN_ARROW)
    {
      snake.dir(0,rez);
    }else if(p5.keyCode === p5.LEFT_ARROW)
    {
      snake.dir(-rez,0);
    }else{
      snake.dir(rez,0);
    }
  }
});

