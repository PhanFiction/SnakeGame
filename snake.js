/**
 * Todo
 * 1. Create background of the board (Done)
 * 2. Generate food for the snake (Done)
 * 3. Add snake tail (Done)
 * 4. Add Score Board
 * 5. Add Game over scene
 */
let foodX;
let foodY;
export default class Snake
{
    // Create a linked List. Need to add the head and keep track of the head
    // add the body to the end of the head

    // Also need to figure out how to keep track of the position of x and y for the snake
    constructor(p5)
    {
        this.x = 450;
        this.y = 300;
        this.speedX = 0;
        this.speedY = 0;
        this.body = [];
        this.p5 = p5;
        this.body[0] = p5.createVector(this.x, this.y); // create object vector of x,y,z
    }

    // change the snake position when arrow keys are pressed
    dir(x, y)
    {
        this.speedX = x;
        this.speedY = y;
    }

    foodLocation()
    {
        foodX = Math.floor(Math.random() * 29) * 30;
        foodY = Math.floor(Math.random() * 19) * 30;
    }

    // return true if the apple is eaten 
    eat()
    {
        if(this.body[0].x == foodX && this.body[0].y == foodY)
        {
            return true;
        }
        return false;
    }

    // update function to update snake as it moves around the board
    update()
    {
        // create a head of the copied array of objects. [{x,y}] -> [{x,y},{x,y}] -> [{x,y},{x,y},{x,y}] 
        let head = {x: this.body[0].x + this.speedX, y: this.body[0].y + this.speedY}; // doesnt mutate the array

        // Add head to the front
        this.body.unshift(head);

        // remove the end of the array item 
        this.body.pop();
    }

    // grows the snake's body when it eats an apple
    grow()
    {
        let head = this.body[0];
        this.body.unshift(this.p5.createVector(head.x + this.speedX, head.y + this.speedY));
    }

    gameOver()
    {
        let x = this.body[0].x;
        let y = this.body[0].y;

        // collides with body gives game over
        for(let i = 0; i < this.body.length-1; i++)
        {
            if(this.body[i].x == this.body[this.body.length-1].x && this.body[i].y == this.body[this.body.length-1].y)
            {
                this.body[0].x = -10;
                this.body[0].y = -10;
                return true;
            }
        }

        // hits the edge of the wall: Left, Right, Top, Bot, game
        if(x > 900-2 || x < 0 || y > 600-2 || y < 0)
        {
            this.body[0].x = -10;
            this.body[0].y = -10;
            return true;
        }

        return false;
    }

    show()
    {
        this.p5.fill(255,0,0);
        this.p5.rect(foodX, foodY, 30, 30);

        for(let i = 0; i < this.body.length; i++)
        {
            this.p5.fill(255);
            this.p5.rect(this.body[i].x, this.body[i].y, 30, 30);
        }
    }
}
